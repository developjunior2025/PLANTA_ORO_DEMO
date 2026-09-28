import { useEffect, useMemo, useState } from "react";
import { Network, SlidersHorizontal } from "lucide-react";
import "./EntityListPage.css";
import { fetchCatalog } from "../shared/api";
import { EntityCard } from "../components/ui/EntityCard";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { DOMAIN_LIST } from "../shared/domains";
import type { CatalogEntity, DomainCode } from "../shared/types";

export function EntityListPage({
  title,
  description,
  entityTypes,
}: {
  title: string;
  description: string;
  entityTypes: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<DomainCode | null>(null);
  const [status, setStatus] = useState("Todos");
  const [sort, setSort] = useState("relevancia");
  const [entities, setEntities] = useState<CatalogEntity[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchCatalog().then((r) => {
      if (active) setEntities(r);
    });
    return () => {
      active = false;
    };
  }, []);

  // entityTypes es un array nuevo por render en literales inline; unirlo mantiene los memos estables.
  const entityTypesKey = entityTypes.join(",");
  const scoped = useMemo(
    () => (entities ?? []).filter((e) => entityTypes.includes(e.entityType)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entities, entityTypesKey]
  );

  const statuses = useMemo(() => Array.from(new Set(scoped.map((e) => e.status))).sort(), [scoped]);
  const countByDomain = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of scoped) if (e.domain) m.set(e.domain, (m.get(e.domain) ?? 0) + 1);
    return m;
  }, [scoped]);
  // La red transversal solo aparece como filtro si al menos una entidad de esta categoría la tiene
  // registrada; en Proveedores/Personas/Cursos/Documentos no aplica y no se muestra.
  const hasDomainData = countByDomain.size > 0;

  const filtered = useMemo(() => {
    const list = scoped.filter((e) => {
      const matchesQuery = !query || e.title.toLowerCase().includes(query.toLowerCase());
      const matchesDomain = !activeDomain || e.domain === activeDomain;
      const matchesStatus = status === "Todos" || e.status === status;
      return matchesQuery && matchesDomain && matchesStatus;
    });
    if (sort === "nombre") return [...list].sort((a, b) => a.title.localeCompare(b.title, "es"));
    if (sort === "calificacion") return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [scoped, query, activeDomain, status, sort]);

  return (
    <div className="entity-list container">
      <div className="entity-list__head">
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
                setStatus("Todos");
              }}
            >
              Limpiar
            </button>
          </div>

          <input
            className="catalog-filters__search"
            placeholder="Buscar…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {hasDomainData && (
            <div className="catalog-filters__group">
              <h4>
                <Network size={14} /> Red transversal
              </h4>
              <p className="catalog-filters__hint">Solo lo que la planta tiene registrado en esta categoría.</p>
              <div className="catalog-filters__networks">
                {DOMAIN_LIST.map((d) => (
                  <button
                    key={d.code}
                    type="button"
                    className={"network-card" + (activeDomain === d.code ? " network-card--active" : "")}
                    style={{ ["--net-color" as string]: d.color }}
                    onClick={() => setActiveDomain((cur) => (cur === d.code ? null : d.code))}
                    aria-pressed={activeDomain === d.code}
                    disabled={!countByDomain.has(d.code)}
                    title={!countByDomain.has(d.code) ? `${d.label}: sin registros en "${title}"` : undefined}
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

        <div className="entity-list__results">
          <div className="catalog-results__head">
            <span>
              Mostrando {filtered.length} de {scoped.length} resultados
            </span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar por">
              <option value="relevancia">Ordenar por: Relevancia</option>
              <option value="nombre">Nombre A-Z</option>
              <option value="calificacion">Mejor calificación</option>
            </select>
          </div>

          {!entities ? (
            <div className="entity-list__grid" aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="entity-list__skeleton skeleton-block" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="panel entity-list__empty">
              {scoped.length === 0
                ? "Todavía no hay elementos registrados en esta categoría."
                : "Ningún resultado cumple los filtros activos."}
            </div>
          ) : (
            <div className="entity-list__grid">
              {filtered.map((e) => (
                <EntityCard entity={e} key={e.furCode} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
