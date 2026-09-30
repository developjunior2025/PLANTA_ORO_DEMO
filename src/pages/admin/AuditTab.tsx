import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchAudit, type AuditEvent } from "../../shared/api";

/** Feed de auditoría consolidado y filtrable — el mismo dato real que ya usan los dashboards y la ficha FUR. */
export function AuditTab() {
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<AuditEvent[] | null>(null);
  const [eventTypes, setEventTypes] = useState<string[]>([]);

  useEffect(() => {
    let active = true;
    searchAudit({ type, from, to, q, limit: 100 })
      .then((r) => {
        if (!active) return;
        setRows(r.rows);
        setEventTypes(r.eventTypes);
      })
      .catch(() => active && setRows([]));
    return () => {
      active = false;
    };
  }, [type, from, to, q]);

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Tipo de evento">
          <option value="">Todos los tipos</option>
          {eventTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Desde" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Hasta" />
        <input
          type="search"
          placeholder="Buscar por ficha o descripción…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {(type || from || to || q) && (
          <button
            type="button"
            className="chip-btn"
            onClick={() => {
              setType("");
              setFrom("");
              setTo("");
              setQ("");
            }}
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="panel">
        {!rows ? (
          <div className="skeleton-block" style={{ height: 240 }} aria-busy="true" />
        ) : rows.length === 0 ? (
          <p className="dash-empty">Ningún evento cumple los filtros activos.</p>
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Ficha / sujeto</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id}>
                  <td>{new Date(e.createdAt).toLocaleString("es")}</td>
                  <td>{e.eventType}</td>
                  <td>
                    {e.subjectCode.startsWith("FUR-") ? (
                      <Link to={`/app/fur/${e.subjectCode}`} className="fur-table__link">
                        {e.subjectCode}
                      </Link>
                    ) : (
                      e.subjectCode
                    )}
                  </td>
                  <td>{e.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
