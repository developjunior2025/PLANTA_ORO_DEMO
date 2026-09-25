import { Link } from "react-router-dom";
import { AlertTriangle, BellRing } from "lucide-react";
import "./AlertsPage.css";
import { useAlerts } from "../shared/alerts";

export function AlertsPage() {
  const alerts = useAlerts();
  return (
    <div className="alerts container">
      <div className="alerts__head">
        <h1>
          <BellRing size={22} /> Alertas
        </h1>
        <p>
          Calculadas en vivo con datos reales de la base: stock bajo el punto de reorden, fichas con HOLD abierto
          y órdenes de trabajo retrasadas.
        </p>
      </div>
      {!alerts ? (
        <div className="skeleton-block" style={{ height: 200 }} aria-busy="true" />
      ) : alerts.length === 0 ? (
        <div className="panel">Sin alertas activas.</div>
      ) : (
        <ul className="alerts__list">
          {alerts.map((a) => (
            <li key={a.id}>
              <Link to={a.to} className={`alerts__item alerts__item--${a.severity}`}>
                <AlertTriangle size={18} />
                <div>
                  <strong>{a.title}</strong>
                  <span>{a.detail}</span>
                </div>
                <em>{a.severity}</em>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
