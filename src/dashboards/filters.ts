import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { DashboardFilters } from "../shared/api";

export const FILTER_KEYS = ["domain", "area", "stage", "criticality", "status", "condition", "maturity", "q", "from", "to"] as const;

/**
 * Filtros globales de dashboard (documento maestro de dashboards §4.2 y §16). Viven en la URL
 * (`?area=Molienda&maturity=D3`), así que un enlace copiado reproduce la misma vista y al volver
 * desde una ficha FUR se conservan. `sec` (sección activa del menú contextual) comparte la query.
 */
export function useDashboardFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo(() => {
    const f: DashboardFilters = {};
    for (const k of FILTER_KEYS) {
      const v = params.get(k);
      if (v) f[k] = v;
    }
    return f;
  }, [params]);

  const setFilter = useCallback(
    (key: (typeof FILTER_KEYS)[number], value: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) next.set(key, value);
          else next.delete(key);
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const clear = useCallback(() => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const k of FILTER_KEYS) next.delete(k);
        return next;
      },
      { replace: true }
    );
  }, [setParams]);

  const setSection = useCallback(
    (id: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set("sec", id);
          return next;
        },
        { replace: false }
      );
    },
    [setParams]
  );

  return { filters, setFilter, clear, setSection, active: Object.keys(filters).length, section: params.get("sec") };
}

/** Claves de filtros como texto estable para dependencias de efectos. */
export const filtersKey = (f: DashboardFilters) => JSON.stringify(f);
