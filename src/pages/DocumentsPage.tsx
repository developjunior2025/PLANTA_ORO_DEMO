import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import "./DocumentsPage.css";
import { fetchDocuments, type LibraryDocument } from "../shared/api";
import { DOMAINS } from "../shared/domains";
import { NetworkIcon } from "../components/ui/NetworkIcon";

export function DocumentsPage() {
  const [docs, setDocs] = useState<LibraryDocument[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    fetchDocuments().then((d) => {
      if (active) setDocs(d);
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      (docs ?? []).filter(
        (d) =>
          !query ||
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.type.toLowerCase().includes(query.toLowerCase()) ||
          d.furName.toLowerCase().includes(query.toLowerCase())
      ),
    [docs, query]
  );

  return (
    <div className="documents container">
      <div className="documents__head">
        <h1>Documentos / Biblioteca Técnica</h1>
        <p>
          Manuales, planos, certificados y evidencia vinculada a cada ficha FUR (Etapa 13.5). En
          Odoo 19 nativo corresponde a <code>ir.attachment</code> + <code>documents</code> —
          esta vista agrega lo ya cargado en cada ficha, no duplica el repositorio.
        </p>
        <input
          className="documents__search"
          placeholder="Buscar por nombre, tipo o activo…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {!docs ? (
        <div className="skeleton-block" style={{ height: 320 }} aria-busy="true" />
      ) : (
        <div className="panel">
          <table className="fur-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Tipo</th>
                <th>Versión</th>
                <th>Estado</th>
                <th>Red</th>
                <th>Ficha FUR</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const domain = DOMAINS[d.domain];
                return (
                  <tr key={`${d.furCode}-${d.name}-${i}`}>
                    <td className="documents__name">
                      <FileText size={14} /> {d.name}
                    </td>
                    <td>{d.type}</td>
                    <td>{d.version}</td>
                    <td>
                      <span className={"badge badge--sm " + (d.status === "Vigente" ? "badge--success" : "badge--warning")}>
                        {d.status}
                      </span>
                    </td>
                    <td>
                      <span className="documents__domain" style={{ color: domain.color }}>
                        <NetworkIcon domain={domain.code} size={13} color={domain.color} /> {domain.shortLabel}
                      </span>
                    </td>
                    <td>
                      <Link to={`/app/fur/${d.furCode}`} className="fur-table__link">
                        {d.furName}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
