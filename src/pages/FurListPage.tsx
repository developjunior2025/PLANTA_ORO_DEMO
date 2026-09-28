import { useEffect, useMemo, useState } from "react";
import { Layers, Network, SlidersHorizontal } from "lucide-react";
import "./FurListPage.css";
import { fetchFurList } from "../shared/api";
import { FurCard } from "../components/ui/FurCard";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { DOMAIN_LIST } from "../shared/domains";
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
  // Zona/etapa: se filtra por el valor real que la planta registró en cada ficha FUR (campo `zone`),
  // no por una lista fija — si un área todavía no tiene fichas cargadas, no aparece como opción.
  const [activeZone, setActiveZone] = useState<string | null>(null);
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

  const networks = useMemo(() => DOMAIN_LIST.filter((d) => domains.includes(d.code)), [domains]);
  const countByDomain = useMemo(() => {
    const m = new Map<string, number>();
    for (const r of records ?? []) m.set(r.domain, (m.get(r.domain) ?? 0) + 1);
    return m;
  }, [records]);
  const zones = useMemo(
    () => Array.from(new Set((records ?? []).map((r) => r.zone))).sort(),
    [records]
  );
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
        const matchesZone = !activeZone || r.zone === activeZone;
        const matchesStatus = status === "Todos" || r.status === status;
        return matchesQuery && matchesDomain && matchesZone && matchesStatus;
      }),
    [records, query, activeDomain, activeZone, status]
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
                setActiveZone(null);
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

          {networks.length > 1 && (
            <div className="catalog-filters__group">
              <h4>
                <Network size={14} /> Red transversal
              </h4>
              <p className="catalog-filters__hint">Solo lo que la planta tiene registrado en fichas FUR.</p>
              <div className="catalog-filters__networks">
                {networks.map((d) => (
                  <button
                    key={d.code}
                    type="button"
                    className={"network-card" + (activeDomain === d.code ? " network-card--active" : "")}
                    style={{ ["--net-color" as string]: d.color }}
                    onClick={() => setActiveDomain((cur) => (cur === d.code ? null : d.code))}
                    aria-pressed={activeDomain === d.code}
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
          )}

          {zones.length > 0 && (
            <div className="catalog-filters__group">
              <h4>
                <Layers size={14} /> Zona / etapa
              </h4>
              <p className="catalog-filters__hint">Valor registrado en la ficha FUR de cada activo.</p>
              <select
                className="catalog-filters__select"
                value={activeZone ?? ""}
                onChange={(e) => setActiveZone(e.target.value || null)}
              >
                <option value="">Todas las zonas</option>
                {zones.map((z) => (
                  <option key={z} value={z}>
                    {z} ({(records ?? []).filter((r) => r.zone === z).length})
                  </option>
                ))}
              </select>
            </div>
          )}

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
