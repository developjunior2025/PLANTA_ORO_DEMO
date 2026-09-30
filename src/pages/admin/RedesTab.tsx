import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { DOMAIN_LIST } from "../../shared/domains";
import { NetworkIcon } from "../../components/ui/NetworkIcon";

/**
 * Las 10 redes transversales del ecosistema (megadocumento: estructura fija del modelo FUR, no
 * un catálogo editable). Vista honesta de solo lectura — crear una red nueva implicaría extender
 * el modelo de dominios en todo el sistema (fichas FUR, filtros, dashboards, rutas), no es una
 * fila más en una tabla. Cada una enlaza a su página real.
 */
export function RedesTab() {
  return (
    <div className="admin-tab">
      <div className="admin__notice">
        <Info size={15} />
        Las redes son una estructura fija del modelo FUR (10 dominios), no una tabla editable —
        crear una red nueva es un cambio de modelo, no un alta de datos.
      </div>

      <div className="panel">
        <table className="fur-table">
          <thead>
            <tr>
              <th>Red</th>
              <th>Código FUR</th>
              <th>Descripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {DOMAIN_LIST.map((d) => (
              <tr key={d.code}>
                <td>
                  <span className="admin__role" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <NetworkIcon domain={d.code} size={15} color={d.color} /> {d.label}
                  </span>
                </td>
                <td>{d.shortLabel}</td>
                <td className="admin-tab__note-cell">{d.description}</td>
                <td>
                  <Link to={`/app/redes/${d.code.toLowerCase()}`} className="chip-btn">
                    Ver red
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
