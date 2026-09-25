import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Heart, Bell, Mountain } from "lucide-react";
import "./AppShell.css";
import { UserMenu } from "./UserMenu";
import { EcosystemMenu } from "./EcosystemMenu";
import { useFavorites } from "../../shared/favoritesStore";
import { useAlerts } from "../../shared/alerts";

const SEARCH_CATEGORIES = [
  { value: "", label: "Todas las categorías" },
  { value: "Activos Físicos", label: "Activos Físicos" },
  { value: "Procesos", label: "Procesos" },
  { value: "Proveedor", label: "Proveedores" },
  { value: "Documento", label: "Documentos" },
  { value: "Curso (LMS)", label: "Cursos" },
];

const NAV_LINKS = [
  { to: "/app/catalogo", label: "Catálogo" },
  { to: "/app/activos", label: "Activos Físicos" },
  { to: "/app/procesos", label: "Procesos" },
  { to: "/app/marketplace", label: "Marketplace" },
  { to: "/app/proveedores", label: "Proveedores" },
  { to: "/app/profesionales", label: "Servicios Profesionales" },
  { to: "/app/cursos", label: "Cursos (LMS)" },
  { to: "/app/redes", label: "Redes Transversales" },
  { to: "/app/mantenimiento", label: "Mantenimiento" },
  { to: "/app/inventario", label: "WMS / Inventario" },
  { to: "/app/presupuestos", label: "Presupuestos (LULO)" },
  { to: "/app/documentos", label: "Documentos" },
  { to: "/app/dashboards", label: "Dashboards" },
];

export function AppShell() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const favoriteCount = useFavorites((s) => s.codes.length);
  const alerts = useAlerts();

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (category) params.set("tipo", category);
    const qs = params.toString();
    navigate(qs ? `/app/catalogo?${qs}` : "/app/catalogo");
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <Link to="/app/inicio" className="app-header__brand">
            <span className="app-header__brand-icon">
              <Mountain size={22} strokeWidth={2.4} />
            </span>
            <span className="app-header__brand-text">
              FUR
              <small>Ecosistema Digital · Planta de Beneficio de Oro</small>
            </span>
          </Link>

          <form className="app-header__search" onSubmit={onSearch}>
            <select aria-label="Categoría" value={category} onChange={(e) => setCategory(e.target.value)}>
              {SEARCH_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Buscar activos, procesos, servicios, cursos, proveedores, documentos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" aria-label="Buscar">
              <Search size={18} />
            </button>
          </form>

          <div className="app-header__actions">
            <Link to="/app/favoritos" className="app-header__icon-btn">
              <Heart size={19} />
              <span>Favoritos{favoriteCount > 0 ? ` (${favoriteCount})` : ""}</span>
            </Link>
            <Link
              to="/app/alertas"
              className={"app-header__icon-btn" + (alerts && alerts.length > 0 ? " app-header__icon-btn--dot" : "")}
            >
              <Bell size={19} />
              <span>Alertas{alerts && alerts.length > 0 ? ` (${alerts.length})` : ""}</span>
            </Link>
            <UserMenu />
          </div>
        </div>

        <nav className="app-subnav">
          <div className="app-subnav__inner">
            <EcosystemMenu />
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  "app-subnav__link" + (isActive ? " app-subnav__link--active" : "")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="app-footer__inner">
          <div className="app-footer__brand">
            <strong>FUR — Ecosistema Digital</strong>
            <span>Planta de Beneficio de Oro</span>
          </div>
          <div className="app-footer__links">
            <Link to="/app/terminos">Términos</Link>
            <Link to="/app/privacidad">Privacidad</Link>
            <Link to="/app/soporte">Soporte</Link>
            <Link to="/app/api">API / Integraciones</Link>
            <Link to="/app/sistema">Estado del Sistema</Link>
          </div>
        </div>
        <div className="app-footer__bar">
          Minería digital, más oro, mayor eficiencia · Operación sostenible para un mejor mañana
        </div>
      </footer>
    </div>
  );
}
