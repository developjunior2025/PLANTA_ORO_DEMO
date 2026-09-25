import { useEffect, useMemo, useState } from "react";
import "./EntityListPage.css";
import { fetchCatalog } from "../shared/api";
import { EntityCard } from "../components/ui/EntityCard";
import type { CatalogEntity } from "../shared/types";

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

  // entityTypes is a fresh array per render on inline literals; joining keeps the memo below stable.
  const entityTypesKey = entityTypes.join(",");

  const filtered = useMemo(
    () =>
      (entities ?? [])
        .filter((e) => entityTypes.includes(e.entityType))
        .filter((e) => !query || e.title.toLowerCase().includes(query.toLowerCase())),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [entities, query, entityTypesKey]
  );

  return (
    <div className="entity-list container">
      <div className="entity-list__head">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <input
          className="entity-list__search"
          placeholder="Buscar…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!entities ? (
        <div className="entity-list__grid" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="entity-list__skeleton skeleton-block" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="panel entity-list__empty">
          No hay elementos de ejemplo para esta categoría en el prototipo.
        </div>
      ) : (
        <div className="entity-list__grid">
          {filtered.map((e) => (
            <EntityCard entity={e} key={e.furCode} />
          ))}
        </div>
      )}
    </div>
  );
}
