import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFurList, fetchPlants, type Plant } from "../../shared/api";
import type { FurRecord } from "../../shared/types";
import { DOMAIN_LIST } from "../../shared/domains";
import { StatusBadge, MaturityBadge } from "../../components/ui/Badges";

interface FurTabProps {
  /** Fija la planta y oculta el filtro de planta (uso: pestaña "Fichas FUR" del Panel Planta). */
  lockPlantCode?: string;
  /** Fija la red y oculta el filtro de red (uso: pestaña "Procesos" del Panel de Administración, red PROC). */
  lockDomain?: string;
}

/**
 * Vista de fichas FUR del sistema — sin acotar por red como las páginas públicas
 * (Activos Físicos, Procesos...) — para buscar cualquier ficha y entrar a editarla en su página
 * real. Reutilizada en dos lugares: Administración (todas las plantas, opcionalmente fija una red,
 * p.ej. Procesos) y Panel Planta (todas las redes, fija una planta).
 */
export function FurTab({ lockPlantCode, lockDomain }: FurTabProps = {}) {
  const [records, setRecords] = useState<FurRecord[] | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState(lockDomain ?? "");
  const [plantCode, setPlantCode] = useState(lockPlantCode ?? "");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchFurList()
      .then(setRecords)
      .catch(() => setRecords([]));
    if (!lockPlantCode) fetchPlants().then(setPlants).catch(() => {});
  }, [lockPlantCode]);

  const statuses = useMemo(() => Array.from(new Set((records ?? []).map((r) => r.status))).sort(), [records]);

  const filtered = useMemo(
    () =>
      (records ?? []).filter((r) => {
        const q = query.toLowerCase();
        const matchesQuery = !q || r.name.toLowerCase().includes(q) || r.furCode.toLowerCase().includes(q);
        const matchesDomain = !domain || r.domain === domain;
        const matchesPlant = !plantCode || r.plantCode === plantCode;
        const matchesStatus = !status || r.status === status;
        return matchesQuery && matchesDomain && matchesPlant && matchesStatus;
      }),
    [records, query, domain, plantCode, status]
  );

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <input
          type="search"
          placeholder="Buscar por FUR o nombre…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!lockDomain && (
          <select value={domain} onChange={(e) => setDomain(e.target.value)} aria-label="Red">
            <option value="">Todas las redes</option>
            {DOMAIN_LIST.map((d) => (
              <option key={d.code} value={d.code}>{d.shortLabel}</option>
            ))}
          </select>
        )}
        {!lockPlantCode && (
          <select value={plantCode} onChange={(e) => setPlantCode(e.target.value)} aria-label="Planta">
            <option value="">Todas las plantas</option>
            {plants.map((p) => (
              <option key={p.code} value={p.code}>{p.code} — {p.name}</option>
            ))}
          </select>
        )}
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Estado">
          <option value="">Todos los estados</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="panel">
        {!records ? (
          <div className="skeleton-block" style={{ height: 240 }} aria-busy="true" />
        ) : (
          <>
            <p className="dash-sub" style={{ marginBottom: 8 }}>
              {filtered.length} de {records.length} fichas
            </p>
            {filtered.length === 0 ? (
              <p className="dash-empty">Sin resultados.</p>
            ) : (
              <table className="fur-table">
                <thead>
                  <tr>
                    <th>Ficha FUR</th>
                    {!lockDomain && <th>Red</th>}
                    {!lockPlantCode && <th>Planta</th>}
                    <th>Estado</th>
                    <th>Madurez</th>
                    <th>Calidad</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.furCode}>
                      <td>
                        <Link to={`/app/fur/${r.furCode}`} className="fur-table__link">
                          {r.name}
                        </Link>
                        <div className="dash-sub">{r.furCode}</div>
                      </td>
                      {!lockDomain && <td>{r.domain}</td>}
                      {!lockPlantCode && <td>{r.plantCode}</td>}
                      <td><StatusBadge status={r.status} /></td>
                      <td><MaturityBadge maturity={r.maturity} /></td>
                      <td>{r.dataQualityPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
