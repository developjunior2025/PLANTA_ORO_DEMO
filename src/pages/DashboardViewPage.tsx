import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { ChevronRight, CircleHelp, Download, RefreshCw, Star } from "lucide-react";
import "./DashboardPage.css";
import { fetchDashboardKpis, fetchHealth, logDashboardExport, type DashboardKpis } from "../shared/api";
import { useCurrentRole } from "../shared/sessionStore";
import { useFavorites } from "../shared/favoritesStore";
import { getDashboard, type DashboardSpec } from "../dashboards/spec";
import { Widget } from "../dashboards/widgets";
import { KpiCard } from "../dashboards/KpiCard";
import { readKpi } from "../dashboards/kpiReading";
import { KpiDrawer } from "../dashboards/KpiDrawer";
import { GlobalFilterBar } from "../dashboards/GlobalFilterBar";
import { WidgetErrorBoundary } from "../dashboards/WidgetErrorBoundary";
import { ActionsPanel, AlertRules, EmptySection, HelpPanel, TracePanel } from "../dashboards/SectionPanels";
import { COMMON_SECTIONS, widgetsForSection } from "../dashboards/sectionRules";
import { matchDefinition } from "../dashboards/kpiMatch";
import { filtersKey, useDashboardFilters } from "../dashboards/filters";
import { useDashboardMeta } from "../dashboards/useDashboardMeta";
import "../dashboards/widgets.css";
import "../dashboards/DashboardShell.css";

export function DashboardViewPage({ fixedSlug }: { fixedSlug?: string }) {
  const { slug } = useParams();
  const { search } = useLocation();
  const requested = fixedSlug ?? slug;
  const spec = requested ? getDashboard(requested) : undefined;
  if (!spec) return <Navigate to="/app/dashboards" replace />;
  // Slugs abreviados de la primera versión → nombre oficial, conservando filtros.
  if (!fixedSlug && slug !== spec.slug) return <Navigate to={`/app/dashboards/${spec.slug}${search}`} replace />;
  // key remonta la vista al cambiar de dashboard.
  return <DashboardView key={spec.slug} spec={spec} />;
}

interface KpiState {
  key: string;
  kpis: DashboardKpis;
  prev: DashboardKpis | null;
}

function DashboardView({ spec }: { spec: DashboardSpec }) {
  const role = useCurrentRole();
  const isFav = useFavorites((s) => s.dashboards.includes(spec.slug));
  const toggleFav = useFavorites((s) => s.toggleDashboard);
  const { filters, setFilter, clear, setSection, active, section } = useDashboardFilters();
  const { meta } = useDashboardMeta(spec.slug);
  const fk = filtersKey(filters);

  const [state, setState] = useState<KpiState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [detail, setDetail] = useState<number | null>(null);
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  // KPIs reales con los filtros activos; refresco automático cada 60 s. Las peticiones obsoletas se abortan (§19).
  useEffect(() => {
    const ac = new AbortController();
    const run = () =>
      Promise.all([fetchDashboardKpis(spec.slug, filters, ac.signal), fetchHealth()])
        .then(([k, h]) => {
          setState((cur) => ({ key: fk, kpis: k, prev: cur && cur.key === fk ? cur.kpis : null }));
          setLatency(h.ms);
          setError(false);
        })
        .catch((e) => {
          if (e.name === "AbortError") return;
          setError(true);
          setLatency(null);
        })
        .finally(() => setLoading(false));
    run();
    const id = setInterval(run, 60_000);
    return () => {
      ac.abort();
      clearInterval(id);
    };
    // filters se resume en fk.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spec.slug, fk, tick]);

  const kpis = state && state.key === fk ? state.kpis : null;
  const prevKpis = state && state.key === fk ? state.prev : null;

  const sections = [...(meta?.sections ?? []), ...COMMON_SECTIONS];
  const activeId = section && sections.some((s) => s.id === section) ? section : (meta?.sections[0]?.id ?? "");
  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeTitle = sections[activeIndex]?.title ?? "";

  const contentRef = useRef<HTMLDivElement>(null);
  const prevSection = useRef("");
  useEffect(() => {
    // Solo se desplaza cuando el usuario cambia de sección, no cuando el menú termina de cargar.
    if (prevSection.current && prevSection.current !== activeId) {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    prevSection.current = activeId;
  }, [activeId]);

  const realCount = kpis ? spec.kpis.filter((k) => readKpi(k, kpis).prov === "real").length : 0;
  const isMine = role.dashboardSlug === spec.slug;
  const ctx = { slug: spec.slug, kpis, filters };
  const dq = kpis?.data_quality.condition;

  const exportCsv = async () => {
    const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const lines = [["KPI", "Valor", "Procedencia", "Condición", "Fuente", "Calculado"].map(esc).join(",")];
    for (const k of spec.kpis) {
      const r = readKpi(k, kpis);
      lines.push([k.label, r.value, r.prov, r.quality, k.source, r.prov === "real" && kpis ? kpis.generated_at : ""].map(esc).join(","));
    }
    const blob = new Blob(["﻿" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${spec.code}-kpis.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    try {
      await logDashboardExport(spec.slug, "KPIs del dashboard", filters, role.label);
      setExportMsg("CSV descargado y registrado en auditoría.");
    } catch {
      setExportMsg("CSV descargado, pero no se pudo registrar en auditoría (backend sin conexión).");
    }
  };

  const period = filters.from || filters.to ? `${filters.from ?? "…"} → ${filters.to ?? "…"}` : "Sin rango (todo el histórico)";

  let content: React.ReactNode;
  if (activeIndex <= 0 || !meta) {
    content = (
      <div className="dash-widgets">
        {spec.widgets.map((w) => (
          <WidgetErrorBoundary key={w.title} title={w.title}>
            <Widget w={w} ctx={ctx} />
          </WidgetErrorBoundary>
        ))}
      </div>
    );
  } else if (activeId === "c-tabla") {
    content = <Widget w={{ kind: "records", title: "Fichas FUR del alcance del dashboard", domains: [] }} ctx={ctx} />;
  } else if (activeId === "c-eventos") {
    content = (
      <>
        <AlertRules meta={meta} kpis={kpis} />
        <Widget w={{ kind: "audit", title: "Eventos de auditoría (reales)" }} ctx={ctx} />
      </>
    );
  } else if (activeId === "c-trazabilidad") {
    content = <TracePanel spec={spec} meta={meta} kpis={kpis} />;
  } else if (activeId === "c-acciones") {
    content = <ActionsPanel meta={meta} onExport={exportCsv} onSection={setSection} />;
  } else if (activeId === "c-ayuda") {
    content = <HelpPanel spec={spec} meta={meta} />;
  } else {
    const ws = widgetsForSection(spec.slug, activeTitle);
    content = ws ? (
      <div className="dash-widgets">
        {ws.map((w) => (
          <WidgetErrorBoundary key={w.title} title={w.title}>
            <Widget w={w} ctx={ctx} />
          </WidgetErrorBoundary>
        ))}
      </div>
    ) : (
      <EmptySection title={activeTitle} meta={meta} />
    );
  }

  return (
    <div className="dashboard container">
      <nav className="dashboard__crumbs" aria-label="Ruta de navegación">
        <Link to="/app/inicio">Inicio</Link>
        <ChevronRight size={12} />
        <Link to="/app/dashboards">Dashboards</Link>
        <ChevronRight size={12} />
        <span aria-current="page">{spec.title}</span>
        {meta && activeIndex > 0 && (
          <>
            <ChevronRight size={12} />
            <span>{activeTitle}</span>
          </>
        )}
      </nav>

      <div className="dashboard__head">
        <span className="dashboard__code">{spec.code}</span>
        <h1>{spec.title}</h1>
        <p>{meta?.objective ?? spec.visualization}</p>

        <div className="dash-head__facts">
          <span className="fact-chip">Período: {period}</span>
          <span className="fact-chip">Planta: PB01 · Planta de Beneficio de Oro</span>
          {filters.area && <span className="fact-chip">Área: {filters.area}</span>}
          {filters.stage && <span className="fact-chip">Zona: {filters.stage}</span>}
          <span className={`fact-chip ${error ? "fact-chip--bad" : latency !== null ? "fact-chip--ok" : ""}`}>
            {error ? "Backend sin conexión" : latency !== null ? `Conectado · ${latency} ms` : "Conectando…"}
          </span>
          <span className="fact-chip">
            Actualizado: {kpis ? new Date(kpis.generated_at).toLocaleTimeString("es") : "—"} · refresco objetivo {spec.refresh}
          </span>
          <span className={`fact-chip ${dq === "HOLD" ? "fact-chip--bad" : dq === "TBC" ? "fact-chip--warn" : ""}`}>
            Calidad del dato FUR: {dq === "Referential" ? "Referencial" : (dq ?? "—")}
          </span>
          <span className="fact-chip">
            Datos reales: {realCount} de {spec.kpis.length} KPIs
          </span>
        </div>

        <div className="dashboard__actions">
          {isMine && <span className="dashboard__role-badge">Tu dashboard inicial — {role.label}</span>}
          <button
            type="button"
            className={"dashboard__refresh" + (isFav ? " dashboard__refresh--fav" : "")}
            onClick={() => toggleFav(spec.slug)}
            aria-pressed={isFav}
          >
            <Star size={13} fill={isFav ? "currentColor" : "none"} /> {isFav ? "En favoritos" : "Marcar favorito"}
          </button>
          <button
            type="button"
            className="dashboard__refresh"
            onClick={() => {
              setLoading(true);
              setTick((t) => t + 1);
            }}
            disabled={loading}
          >
            <RefreshCw size={13} className={loading ? "fur-spin" : undefined} /> Actualizar
          </button>
          <button type="button" className="dashboard__refresh" onClick={exportCsv}>
            <Download size={13} /> Exportar CSV
          </button>
          <button type="button" className="dashboard__refresh" onClick={() => setSection("c-ayuda")}>
            <CircleHelp size={13} /> Ayuda
          </button>
        </div>
        {exportMsg && (
          <p className="dashboard__meta" role="status">
            {exportMsg}
          </p>
        )}
        {error && <p className="dashboard__error">No se pudo consultar el backend: los KPIs reales no están disponibles.</p>}
      </div>

      <GlobalFilterBar filters={filters} setFilter={setFilter} clear={clear} active={active} />

      <div className="kpi-grid">
        {spec.kpis.map((k, i) => (
          <WidgetErrorBoundary key={k.label} title={k.label}>
            <KpiCard
              kpi={k}
              kpis={kpis}
              prevKpis={prevKpis}
              definition={meta ? matchDefinition(k.label, meta.kpiDefinitions) : undefined}
              onDetail={() => setDetail(i)}
            />
          </WidgetErrorBoundary>
        ))}
      </div>

      <div ref={contentRef} className="section-panel" style={{ scrollMarginTop: 120 }}>
        {activeIndex > 0 && activeTitle && <h2>{activeTitle}</h2>}
        {content}
      </div>

      <div className="panel dashboard__note">
        Cada KPI indica su procedencia: <strong>Real</strong> se calcula ahora mismo sobre PostgreSQL; <strong>Ejemplo</strong> es un
        valor ilustrativo porque su fuente de autoridad (SCADA/Historian, NMS, LIMS, Odoo…) aún no está conectada;{" "}
        <strong>Sin fuente</strong> no puede calcularse todavía. Los dashboards no son sistema de autoridad.
      </div>

      {detail !== null && (
        <KpiDrawer
          kpi={spec.kpis[detail]}
          kpis={kpis}
          definition={meta ? matchDefinition(spec.kpis[detail].label, meta.kpiDefinitions) : undefined}
          filters={filters}
          dashboardCode={spec.code}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}
