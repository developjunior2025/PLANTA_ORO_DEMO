import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Map as MapIcon, Network, SlidersHorizontal } from "lucide-react";
import "./CatalogPage.css";
import { fetchCatalog } from "../shared/api";
import { EntityCard } from "../components/ui/EntityCard";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { DOMAIN_LIST } from "../shared/domains";
import type { CatalogEntity, DomainCode } from "../shared/types";

const TABS = ["Todos", "Activos Físicos", "Procesos", "Servicio", "Documentos", "Laboratorio", "Dashboards", "Redes", "Mapas"];

export function CatalogPage() {
  const [params] = useSearchParams();
  // key remonta el catálogo cuando cambia la búsqueda desde el header (?q=, ?tipo=, ?red=).
  return (
    <CatalogInner
      key={params.toString()}
      initialQuery={params.get("q") ?? ""}
      initialType={params.get("tipo")}
      initialDomain={params.get("red") as DomainCode | null}
    />
  );
}

function CatalogInner({
  initialQuery,
  initialType,
  initialDomain,
}: {
  initialQuery: string;
  initialType: string | null;
  initialDomain: DomainCode | null;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("Todos");
  const [activeTypes, setActiveTypes] = useState<string[]>(initialType ? [initialType] : []);
  // Red transversal activa: filtra por el dominio FUR de la entidad (megadocumento §3: 10 redes).
  const [activeDomain, setActiveDomain] = useState<DomainCode | null>(
    initialDomain && DOMAIN_LIST.some((d) => d.code === initialDomain) ? initialDomain : null
  );
  const [status, setStatus] = useState("Todos");
  const [sort, setSort] = useState("relevancia");
  const [entities, setEntities] = useState<CatalogEntity[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchCatalog().then((r) => active && setEntities(r));
    return () => {
      active = false;
    };
  }, []);

  const statuses = useMemo(() => ["Todos", ...Array.from(new Set((entities ?? []).map((e) => e.status))).sort()], [entities]);
  const countByType = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of entities ?? []) m.set(e.entityType, (m.get(e.entityType) ?? 0) + 1);
    return m;
  }, [entities]);
  const countByDomain = useMemo(() => {
    const m = new Map<string, number>();
    for (const e of entities ?? []) if (e.domain) m.set(e.domain, (m.get(e.domain) ?? 0) + 1);
    return m;
  }, [entities]);

  const results = useMemo(() => {
    const filtered = (entities ?? []).filter((e) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.furCode.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q);
      const matchesTab =
        activeTab === "Todos" ||
        e.entityType === activeTab ||
        (activeTab === "Redes" && e.entityType === "Red Transversal") ||
        (activeTab === "Mapas" && e.entityType === "Sitio / Mapa") ||
        (activeTab === "Documentos" && e.entityType === "Documento") ||
        (activeTab === "Dashboards" && e.entityType === "Dashboard");
      const matchesType = activeTypes.length === 0 || activeTypes.includes(e.entityType);
      const matchesDomain = !activeDomain || e.domain === activeDomain;
      const matchesStatus = status === "Todos" || e.status === status;
      return matchesQuery && matchesTab && matchesType && matchesDomain && matchesStatus;
    });
    if (sort === "nombre") return [...filtered].sort((a, b) => a.title.localeCompare(b.title, "es"));
    if (sort === "calificacion") return [...filtered].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return filtered;
  }, [entities, query, activeTab, activeTypes, activeDomain, status, sort]);

  return (
    <div className="catalog">
      <div className="catalog-hero">
        <div className="container">
          <h1>Catálogo del Ecosistema FUR</h1>
          <p>
            Explora, encuentra y gestiona todos los activos, servicios, conocimiento y recursos de
            la planta de beneficio de oro, conectados por la Ficha Única de Registro (FUR).
          </p>
        </div>
      </div>

      <div className="container catalog-body">
        <div className="catalog-summary panel">
          <div>
            <strong>{(entities?.length ?? 0).toLocaleString()}</strong>
            <span>Entidades</span>
          </div>
          <div>
            <strong>{results.length.toLocaleString()}</strong>
            <span>Resultados</span>
          </div>
          <div>
            <strong>{countByType.get("Proveedor") ?? 0}</strong>
            <span>Proveedores</span>
          </div>
          <div>
            <strong>{countByType.get("Documento") ?? 0}</strong>
            <span>Documentos</span>
          </div>
          <Link to="/app/mapas" className="btn btn--navy">
            <MapIcon size={15} /> Ver mapa interactivo
          </Link>
        </div>

        <div className="catalog-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={"catalog-tab" + (activeTab === t ? " catalog-tab--active" : "")}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
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
                  setActiveTypes([]);
                  setActiveDomain(null);
                  setQuery("");
                  setStatus("Todos");
                  setActiveTab("Todos");
                }}
              >
                Limpiar
              </button>
            </div>

            <input
              className="catalog-filters__search"
              placeholder="Buscar por palabra clave, FUR, código…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            {activeTypes.length > 0 && (
              <div className="catalog-filters__active-type">
                Buscando en: <strong>{activeTypes[0]}</strong>
                <button type="button" onClick={() => setActiveTypes([])} aria-label={`Quitar filtro ${activeTypes[0]}`}>
                  ×
                </button>
              </div>
            )}

            <div className="catalog-filters__group">
              <h4>
                <Network size={14} /> 10 Redes Transversales
              </h4>
              <p className="catalog-filters__hint">A qué red pertenece cada activo, proceso o entidad.</p>
              <div className="catalog-filters__networks">
                {DOMAIN_LIST.map((d) => (
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
                      <span className="network-card__desc">{d.description}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="catalog-filters__group">
              <h4>Estado</h4>
              {statuses.map((s) => (
                <label key={s} className="catalog-filters__checkbox">
                  <input type="radio" name="estado" checked={status === s} onChange={() => setStatus(s)} />
                  {s}
                </label>
              ))}
            </div>
          </aside>

          <div className="catalog-results">
            <div className="catalog-results__head">
              <span>
                Mostrando {results.length} de {entities?.length ?? 0} resultados
              </span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar por">
                <option value="relevancia">Ordenar por: Relevancia</option>
                <option value="nombre">Nombre A-Z</option>
                <option value="calificacion">Mejor calificación</option>
              </select>
            </div>

            {!entities ? (
              <div className="catalog-results__grid" aria-busy="true" aria-live="polite">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="catalog-skeleton-card skeleton-block" />
                ))}
              </div>
            ) : results.length === 0 ? (
              <div className="catalog-empty panel">No se encontraron resultados para tu búsqueda.</div>
            ) : (
              <div className="catalog-results__grid">
                {results.map((e) => (
                  <EntityCard entity={e} key={e.furCode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
