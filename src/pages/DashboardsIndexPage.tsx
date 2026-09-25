import { Link } from "react-router-dom";
import { Clock, LayoutDashboard, UserCircle2 } from "lucide-react";
import "./DashboardsIndexPage.css";
import { DASHBOARDS, dashboardPath } from "../dashboards/spec";
import { useCurrentRole } from "../shared/sessionStore";

export function DashboardsIndexPage() {
  const role = useCurrentRole();
  return (
    <div className="dash-index container">
      <div className="dash-index__head">
        <h1>
          <LayoutDashboard size={22} /> Catálogo de dashboards
        </h1>
        <p>
          Los 20 dashboards del catálogo maestro (megadocumento §64), cada uno con su FUR, audiencia, propietario y
          frecuencia de refresco. Tu rol actual (<strong>{role.label}</strong>) abre por defecto en el resaltado.
        </p>
      </div>

      <div className="dash-index__grid">
        {DASHBOARDS.map((d) => (
          <Link
            key={d.code}
            to={dashboardPath(d.slug)}
            className={"dash-card" + (d.slug === role.dashboardSlug ? " dash-card--mine" : "")}
          >
            <span className="dash-card__code">{d.code}</span>
            <strong>{d.title}</strong>
            <p>{d.visualization}</p>
            <div className="dash-card__meta">
              <span><UserCircle2 size={13} /> {d.audience}</span>
              <span><Clock size={13} /> {d.refresh}</span>
              <span>{d.kpis.length} KPIs</span>
            </div>
            {d.slug === role.dashboardSlug && <em>Tu dashboard inicial</em>}
          </Link>
        ))}
      </div>
    </div>
  );
}
