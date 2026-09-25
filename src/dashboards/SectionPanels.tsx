import { Link } from "react-router-dom";
import type { DashboardKpis, DashboardMeta } from "../shared/api";
import { resolvePath, type DashboardSpec } from "./spec";
import { DataQualityBadge } from "./KpiCard";
import { PROV_LABEL, readKpi } from "./kpiReading";
import { matchDefinition } from "./kpiMatch";
import { ACTION_RULES } from "./sectionRules";
import "./DashboardShell.css";

export function EmptySection({ title, meta }: { title: string; meta: DashboardMeta | null }) {
  return (
    <div className="empty-section">
      <div>
        <DataQualityBadge q="sin-dato" />
      </div>
      <strong>«{title}» todavía no tiene datos.</strong>
      <p>
        Su fuente de autoridad no está conectada al ecosistema, así que no se muestran números inventados (documento de
        dashboards §21: <em>Sin dato — explicar la ausencia</em>). Cuando la integración exista, esta sección se alimentará
        desde:
      </p>
      {meta ? (
        <ul>
          {meta.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      ) : (
        <p>Cargando fuentes…</p>
      )}
    </div>
  );
}

const isFurSource = (s: string) => /^FUR|FUR-/i.test(s) && !/Odoo|SCADA|Historian/i.test(s);

/** §4.6 Panel de datos y trazabilidad. */
export function TracePanel({ spec, meta, kpis }: { spec: DashboardSpec; meta: DashboardMeta | null; kpis: DashboardKpis | null }) {
  return (
    <div className="section-panel">
      <h2>Trazabilidad de {spec.title}</h2>

      <section className="dash-widget">
        <header>
          <h4>Fuentes de autoridad (§8.x.6)</h4>
        </header>
        <table className="fur-table">
          <thead>
            <tr>
              <th>Fuente</th>
              <th>Estado de integración</th>
            </tr>
          </thead>
          <tbody>
            {(meta?.sources ?? []).map((s) => (
              <tr key={s}>
                <td>{s}</td>
                <td>
                  {isFurSource(s) ? (
                    <span className="state-chip state-chip--clear">Parcial · fichas FUR en PostgreSQL</span>
                  ) : (
                    <span className="state-chip state-chip--none">No conectada</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dash-widget">
        <header>
          <h4>Indicadores mostrados y su procedencia</h4>
        </header>
        <table className="fur-table">
          <thead>
            <tr>
              <th>KPI</th>
              <th>Procedencia</th>
              <th>Condición</th>
              <th>Fuente</th>
              <th>Ficha</th>
            </tr>
          </thead>
          <tbody>
            {spec.kpis.map((k) => {
              const r = readKpi(k, kpis);
              const def = meta ? matchDefinition(k.label, meta.kpiDefinitions) : undefined;
              return (
                <tr key={k.label}>
                  <td>{k.label}</td>
                  <td>{PROV_LABEL[r.prov]}</td>
                  <td>
                    <DataQualityBadge q={r.quality} />
                  </td>
                  <td>{k.source}</td>
                  <td>{def?.code ?? "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <p className="drawer__note">
        <strong>Drill-down definido:</strong> {meta?.drilldown ?? "…"} Hoy el recorrido real llega hasta la ficha FUR y su
        historial de auditoría.
      </p>
    </div>
  );
}

interface ActionsProps {
  meta: DashboardMeta | null;
  onExport: () => void;
  onSection: (id: string) => void;
}

/** §4.7 Acciones rápidas: nunca hay un botón muerto; si falta el sistema, se dice cuál. */
export function ActionsPanel({ meta, onExport, onSection }: ActionsProps) {
  return (
    <div className="section-panel">
      <h2>Acciones rápidas</h2>
      <div className="action-list">
        {(meta?.actions ?? []).map((a) => {
          const rule = ACTION_RULES.find((r) => r.test.test(a));
          if (rule?.action === "export")
            return (
              <button key={a} type="button" className="action-btn" onClick={onExport}>
                {a}
                <small>Descarga CSV de los KPIs y queda en auditoría.</small>
              </button>
            );
          if (rule?.action?.startsWith("section:"))
            return (
              <button key={a} type="button" className="action-btn" onClick={() => onSection(rule.action!.slice(8))}>
                {a}
                <small>Abre la sección de ayuda de este dashboard.</small>
              </button>
            );
          if (rule?.to)
            return (
              <Link key={a} to={rule.to} className="action-btn">
                {a}
                <small>Abre {rule.to}</small>
              </Link>
            );
          return (
            <span key={a} className="action-btn" aria-disabled="true" role="button" tabIndex={-1}>
              {a}
              <small>{rule?.reason ?? "Requiere un sistema fuente que aún no está conectado."}</small>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function evaluateAlert(text: string, kpis: DashboardKpis | null): { state: "live" | "clear" | "none"; label: string } {
  if (!kpis) return { state: "none", label: "Cargando" };
  if (/stockout|repuesto cr|stock cr/i.test(text)) {
    const n = Number(resolvePath(kpis, "stock.criticalBelow") ?? 0);
    return n > 0 ? { state: "live", label: `Activa · ${n} ítem(s)` } : { state: "clear", label: "Sin excepción" };
  }
  if (/hold|tbc/i.test(text)) {
    const n = Number(resolvePath(kpis, "fur.recordsWithHold") ?? 0);
    return n > 0 ? { state: "live", label: `Activa · ${n} ficha(s)` } : { state: "clear", label: "Sin excepción" };
  }
  return { state: "none", label: "Sin fuente conectada" };
}

/** Excepciones que vigila el dashboard (§8.x.7), evaluadas solo cuando hay dato real. */
export function AlertRules({ meta, kpis }: { meta: DashboardMeta | null; kpis: DashboardKpis | null }) {
  return (
    <section className="dash-widget">
      <header>
        <h4>Excepciones que vigila este dashboard</h4>
      </header>
      <table className="fur-table">
        <tbody>
          {(meta?.alerts ?? []).map((a) => {
            const r = evaluateAlert(a, kpis);
            return (
              <tr key={a}>
                <td>{a}</td>
                <td>
                  <span className={`state-chip state-chip--${r.state}`}>{r.label}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

const QUALITY_LEGEND: [string, string][] = [
  ["Confirmado D4/D5", "Verde. Uso operacional y analítico autorizado."],
  ["Referencial D1–D3", "Azul. Mostrar advertencia contextual."],
  ["TBC", "Ámbar. Requiere evidencia pendiente."],
  ["HOLD", "Rojo. Bloquea promoción de la ficha según regla."],
  ["Ejemplo", "Gris punteado. Valor ilustrativo: fuente no conectada."],
  ["Sin dato", "Gris. La fuente no existe o no responde."],
];

/** Sección 10: ayuda y definiciones de KPI. */
export function HelpPanel({ spec, meta }: { spec: DashboardSpec; meta: DashboardMeta | null }) {
  return (
    <div className="section-panel">
      <h2>Ayuda y definiciones</h2>
      <p className="drawer__note">
        <strong>Objetivo del dashboard:</strong> {meta?.objective ?? spec.visualization}
        <br />
        Un dashboard no es sistema de autoridad: agrega, contextualiza y enlaza hacia el FUR y la evidencia de origen.
      </p>

      <section className="dash-widget">
        <header>
          <h4>Catálogo de KPIs de {spec.code} (ficha §15)</h4>
        </header>
        <table className="fur-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>KPI</th>
              <th>Unidad</th>
              <th>Fórmula</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {(meta?.kpiDefinitions ?? []).map((d) => (
              <tr key={d.code}>
                <td>{d.code}</td>
                <td>{d.name}</td>
                <td>{d.unit ?? "—"}</td>
                <td>{d.formula ?? "Por aprobar"}</td>
                <td>
                  {d.version} · {d.approvalStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dash-widget">
        <header>
          <h4>Estados de calidad del dato (§21)</h4>
        </header>
        <table className="fur-table">
          <tbody>
            {QUALITY_LEGEND.map(([k, v]) => (
              <tr key={k}>
                <td>
                  <strong>{k}</strong>
                </td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
