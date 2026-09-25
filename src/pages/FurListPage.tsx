import { useEffect, useMemo, useState } from "react";
import "./FurListPage.css";
import { fetchFurList } from "../shared/api";
import { FurCard } from "../components/ui/FurCard";
import type { DomainCode, FurRecord } from "../shared/types";

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
  const [records, setRecords] = useState<FurRecord[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchFurList(domains).then((r) => {
      if (active) setRecords(r);
    });
    return () => {
      active = false;
    };
    // domains array identity changes per render on inline literals; join() keeps the effect stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domains.join(",")]);

  const filtered = useMemo(
    () =>
      (records ?? []).filter(
        (r) =>
          !query ||
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.furCode.toLowerCase().includes(query.toLowerCase())
      ),
    [records, query]
  );

  return (
    <div className="fur-list container">
      <div className="fur-list__head">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <input
          className="fur-list__search"
          placeholder="Buscar por FUR o nombre…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

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
          No hay fichas FUR de ejemplo para esta búsqueda en el prototipo. En la
          implementación real, esta vista lista todas las fichas del dominio desde la API.
        </div>
      ) : (
        <div className="fur-list__grid">
          {filtered.map((r) => (
            <FurCard record={r} key={r.furCode} />
          ))}
        </div>
      )}
    </div>
  );
}
