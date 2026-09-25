import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Star } from "lucide-react";
import "./DashboardsLayout.css";
import "./DashboardShell.css";
import { DASHBOARDS, dashboardPath, type DashboardSpec } from "./spec";
import { COMMON_SECTIONS } from "./sectionRules";
import { FILTER_KEYS } from "./filters";
import { useDashboardMeta } from "./useDashboardMeta";
import { useCurrentRole } from "../shared/sessionStore";
import { useFavorites } from "../shared/favoritesStore";

/** Agrupación por área para el menú lateral (afinidad temática de los dashboards del §6). */
const GROUPS: { title: string; slugs: string[] }[] = [
  { title: "Ejecutivo y público", slugs: ["ejecutivo", "tiempo-real"] },
  { title: "Planta y proceso", slugs: ["planta", "procesos", "operacion"] },
  { title: "Activos y redes", slugs: ["mantenimiento", "potencia", "iot", "gpon", "wms", "camaras"] },
  { title: "Calidad y laboratorio", slugs: ["calidad", "laboratorio"] },
  { title: "Abastecimiento y costos", slugs: ["compras", "costos", "proveedor"] },
  { title: "Ingeniería, HSE y formación", slugs: ["ingenieria", "hse", "lms"] },
  { title: "Gobierno", slugs: ["auditoria"] },
];

/** Los filtros globales viajan entre dashboards (§2.4: sin perder filtros ni rango temporal); la sección activa no. */
function carryFilters(search: string) {
  const src = new URLSearchParams(search);
  const out = new URLSearchParams();
  for (const k of FILTER_KEYS) {
    const v = src.get(k);
    if (v) out.set(k, v);
  }
  const s = out.toString();
  return s ? `?${s}` : "";
}

function Item({ d, search }: { d: DashboardSpec; search: string }) {
  return (
    <NavLink
      to={dashboardPath(d.slug) + carryFilters(search)}
      className={({ isActive }) => "dash-side__item" + (isActive ? " dash-side__item--active" : "")}
      title={`${d.code} · ${d.audience} · refresco ${d.refresh}`}
    >
      <span className="dash-side__short">{d.short}</span>
      {d.title}
    </NavLink>
  );
}

/** Nivel 3 del §3.3: secciones del dashboard abierto (menú contextual de cada §8.x.2 + secciones comunes). */
function ContextMenu({ spec, pathname, search }: { spec: DashboardSpec; pathname: string; search: string }) {
  const { meta } = useDashboardMeta(spec.slug);
  const params = new URLSearchParams(search);
  const sections = meta?.sections ?? [];
  const activeId = params.get("sec") ?? sections[0]?.id;
  const to = (id: string) => {
    const p = new URLSearchParams(search);
    p.set("sec", id);
    return `${pathname}?${p.toString()}`;
  };
  const link = (s: { id: string; title: string }) => (
    <Link key={s.id} to={to(s.id)} className={"dash-side__section" + (s.id === activeId ? " dash-side__section--active" : "")}>
      {s.title}
    </Link>
  );
  return (
    <nav className="dash-side__context" aria-label={`Secciones de ${spec.title}`}>
      <h3 className="dash-side__context-title">{spec.title}</h3>
      {meta ? sections.map(link) : <div className="skeleton-block" style={{ height: 120 }} aria-busy="true" />}
      <div className="dash-side__sep">Común</div>
      {COMMON_SECTIONS.map(link)}
    </nav>
  );
}

export function DashboardsLayout() {
  const role = useCurrentRole();
  const { pathname, search } = useLocation();
  const favSlugs = useFavorites((s) => s.dashboards);
  const bySlug = new Map(DASHBOARDS.map((d) => [d.slug, d]));

  const current = DASHBOARDS.find((d) => dashboardPath(d.slug) === pathname);
  const mine = bySlug.get(role.dashboardSlug);
  const allAccess = role.secondarySlugs.includes("*");
  const secondary = allAccess ? [] : role.secondarySlugs.map((s) => bySlug.get(s)).filter((d): d is DashboardSpec => !!d);
  const favorites = DASHBOARDS.filter((d) => favSlugs.includes(d.slug));

  return (
    <div className="dash-layout">
      <aside className="dash-side" aria-label="Navegación de dashboards">
        <NavLink to="/app/dashboards" end className={({ isActive }) => "dash-side__all" + (isActive ? " dash-side__all--active" : "")}>
          <LayoutDashboard size={15} /> Catálogo de dashboards
        </NavLink>

        {current && <ContextMenu key={current.slug} spec={current} pathname={pathname} search={search} />}

        {mine && (
          <section>
            <h3>Tu dashboard inicial</h3>
            <Item d={mine} search={search} />
          </section>
        )}

        {secondary.length > 0 && (
          <section>
            <h3>Secundarios de tu rol</h3>
            {secondary.map((d) => (
              <Item key={d.slug} d={d} search={search} />
            ))}
          </section>
        )}

        {favorites.length > 0 && (
          <section>
            <h3>
              <Star size={11} fill="currentColor" /> Favoritos
            </h3>
            {favorites.map((d) => (
              <Item key={d.slug} d={d} search={search} />
            ))}
          </section>
        )}

        <details className="dash-side__all-list" open={!current}>
          <summary>Todos los dashboards ({DASHBOARDS.length})</summary>
          {GROUPS.map((g) => (
            <section key={g.title}>
              <h3>{g.title}</h3>
              {g.slugs.map((s) => {
                const d = bySlug.get(s);
                return d ? <Item key={s} d={d} search={search} /> : null;
              })}
            </section>
          ))}
        </details>
      </aside>

      <div className="dash-layout__main">
        <Outlet />
      </div>
    </div>
  );
}
