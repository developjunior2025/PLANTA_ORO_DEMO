import { useEffect, useState } from "react";
import { fetchDashboardMeta, type DashboardMeta } from "../shared/api";

const cache = new Map<string, Promise<DashboardMeta>>();

function load(slug: string) {
  let p = cache.get(slug);
  if (!p) {
    p = fetchDashboardMeta(slug);
    p.catch(() => cache.delete(slug));
    cache.set(slug, p);
  }
  return p;
}

/** Configuración del dashboard desde PostgreSQL (GET /dashboards/:slug): menú contextual, fuentes, alertas, acciones y fichas de KPI. */
export function useDashboardMeta(slug: string | undefined): { meta: DashboardMeta | null; error: boolean } {
  const [state, setState] = useState<{ slug?: string; meta: DashboardMeta | null; error: boolean }>({ meta: null, error: false });
  useEffect(() => {
    if (!slug) return;
    let active = true;
    load(slug)
      .then((meta) => active && setState({ slug, meta, error: false }))
      .catch(() => active && setState({ slug, meta: null, error: true }));
    return () => {
      active = false;
    };
  }, [slug]);
  // Un resultado de otro dashboard no se muestra como propio mientras carga el nuevo.
  return state.slug === slug ? { meta: state.meta, error: state.error } : { meta: null, error: false };
}
