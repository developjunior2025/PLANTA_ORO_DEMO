import { useEffect, useMemo, useState } from "react";
import { Layers, Network, SlidersHorizontal } from "lucide-react";
import "./FurListPage.css";
import { fetchFurList } from "../shared/api";
import { FurCard } from "../components/ui/FurCard";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { DOMAIN_LIST } from "../shared/domains";
import { STAGES } from "../shared/stages";
import type { AssetStatus, DomainCode, FurRecord } from "../shared/types";

export function FurListPage({
  title,
  description,
  domains,
}: {
  title: string;
  description: string;
  domains: DomainCode[];
}) {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<DomainCode | null>(null);
  // Etapa de la cadena productiva maestra (D01–D18, igual que en el catálogo): lista fija de 18,
  // con el conteo real de fichas FUR de esta vista que la planta ya clasificó en cada una.
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [status, setStatus] = useState<AssetStatus | "Todos">("Todos");
  const [records, setRecords] = useState<FurRecord[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchFurList(domains).then((r) => {
      if (active) setRecords(r);
    });
    return () => {
      active = false;
    };
    // domains array identity changes por render en literales inline; join() mantiene el efecto estable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains.join(",")]);

  // Las 10 redes siempre se listan, aunque esta vista solo traiga fichas de algunas: el conteo real
  // de las demás es 0 aquí porque sus fichas viven en otra página (Procesos, Laboratorio, Requisiciones…).
  const countByDomain = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of records ?? []) m.set(r.domain, (m.get(r.domain) ?? 0) + 1);
    return m;
  }, [records]);
  const countByStage = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of records ?? []) if (r.stage) m.set(r.stage, (m.get(r.stage) ?? 0) + 1);
    return m;
  }, [records]);
  const statuses = useMemo(
    () => Array.from(new Set((records ?? []).map((r) => r.status))).sort() as AssetStatus[],
    [records]
  );

  const filtered = useMemo(
    () =>
      (records ?? []).filter((r) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.furCode.toLowerCase().includes(q);
        const matchesDomain = !activeDomain || r.domain === activeDomain;
        const matchesStage = !activeStage || r.stage === activeStage;
        const matchesStatus = status === "Todos" || r.status === status;
        return matchesQuery && matchesDomain && matchesStage && matchesStatus;
      }),
    [records, query, activeDomain, activeStage, status]
  );

  return (
    <div className="fur-list container">
      <div className="fur-list__head">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="catalog-layout">
        <aside className="catalog-filters panel">
          <div className="catalog-filters__head">
            <h3>
              <SlidersHorizontal size={15} /> Filtros de búsqueda
            </h3>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveDomain(null);
                setActiveStage(null);
                setStatus("Todos");
              }}
            >
              Limpiar
            </button>
          </div>

          <input
            className="catalog-filters__search"
            placeholder="Buscar por FUR o nombre…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="catalog-filters__group">
            <h4>
              <Network size={14} /> 10 Redes Transversales
            </h4>
            <p className="catalog-filters__hint">
              El conteo es de fichas dentro de esta vista; una red en 0 puede tener fichas en otra página.
            </p>
            <div className="catalog-filters__networks">
              {DOMAIN_LIST.map((d) => (
                <button
                  key={d.code}
                  type="button"
                  className={"network-card" + (activeDomain === d.code ? " network-card--active" : "")}
                  style={{ ["--net-color" as string]: d.color }}
                  onClick={() => setActiveDomain((cur) => (cur === d.code ? null : d.code))}
                  aria-pressed={activeDomain === d.code}
                  disabled={!domains.includes(d.code)}
                  title={!domains.includes(d.code) ? `${d.label}: fuera del alcance de "${title}"` : undefined}
                >
                  <span className="network-card__icon" style={{ background: d.color }}>
                    <NetworkIcon domain={d.code} size={16} color="#fff" />
                  </span>
                  <span className="network-card__body">
                    <strong>
                      {d.shortLabel} <span className="network-card__count">{countByDomain.get(d.code) ?? 0}</span>
                    </strong>
                    <span className="network-card__label">{d.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-filters__group">
            <h4>
              <Layers size={14} /> Etapa (cadena productiva)
            </h4>
            <p className="catalog-filters__hint">
              Las 18 etapas D01–D18. Solo cuenta lo que ya está clasificado en las fichas de esta vista.
            </p>
            <select
              className="catalog-filters__select"
              value={activeStage ?? ""}
              onChange={(e) => setActiveStage(e.target.value || null)}
            >
              <option value="">Todas las etapas</option>
              {STAGES.map((s) => (
                <option key={s.code} value={s.code}>
                  D{s.code} — {s.label} ({countByStage.get(s.code) ?? 0})
                </option>
              ))}
            </select>
          </div>

          {statuses.length > 0 && (
            <div className="catalog-filters__group">
              <h4>Estado</h4>
              <label className="catalog-filters__checkbox">
                <input type="radio" name="estado" checked={status === "Todos"} onChange={() => setStatus("Todos")} />
                Todos
              </label>
              {statuses.map((s) => (
                <label key={s} className="catalog-filters__checkbox">
                  <input type="radio" name="estado" checked={status === s} onChange={() => setStatus(s)} />
                  {s}
                </label>
              ))}
            </div>
          )}
        </aside>

        <div className="fur-list__results">
          {records && (
            <span className="fur-list__count">
              {filtered.length} de {records.length} fichas FUR
            </span>
          )}

          {!records ? (
            <div className="fur-list__grid" aria-busy="true" aria-live="polite">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="fur-list__skeleton-card skeleton-block" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="panel fur-list__empty">
              {records.length === 0
                ? "La planta todavía no tiene fichas FUR registradas en esta red."
                : "Ninguna ficha FUR cumple los filtros activos."}
            </div>
          ) : (
            <div className="fur-list__grid">
              {filtered.map((r) => (
                <FurCard record={r} key={r.furCode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
