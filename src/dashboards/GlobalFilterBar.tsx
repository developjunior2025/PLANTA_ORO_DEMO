import { useEffect, useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { fetchFilterOptions, type DashboardFilters, type FilterOptions } from "../shared/api";
import { FILTER_KEYS } from "./filters";
import "./DashboardShell.css";

type Key = (typeof FILTER_KEYS)[number];

let optionsPromise: Promise<FilterOptions> | null = null;
function loadOptions() {
  optionsPromise ??= fetchFilterOptions();
  optionsPromise.catch(() => (optionsPromise = null));
  return optionsPromise;
}

const SELECTS: { key: Key; label: string; opt: keyof FilterOptions }[] = [
  { key: "domain", label: "Red transversal", opt: "domain" },
  { key: "area", label: "Área", opt: "area" },
  { key: "stage", label: "Zona / etapa", opt: "stage" },
  { key: "criticality", label: "Criticidad", opt: "criticality" },
  { key: "status", label: "Estado", opt: "status" },
  { key: "condition", label: "Condición del dato", opt: "condition" },
  { key: "maturity", label: "Madurez", opt: "maturity" },
];

interface Props {
  filters: DashboardFilters;
  setFilter: (key: Key, value: string) => void;
  clear: () => void;
  active: number;
}

/** Barra de filtros globales (§4.2): las opciones salen de los valores reales en PostgreSQL. */
export function GlobalFilterBar({ filters, setFilter, clear, active }: Props) {
  const [opts, setOpts] = useState<FilterOptions | null>(null);
  useEffect(() => {
    let alive = true;
    loadOptions()
      .then((o) => alive && setOpts(o))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <form className="filter-bar" role="search" aria-label="Filtros globales del dashboard" onSubmit={(e) => e.preventDefault()}>
      <span className="filter-bar__title">
        <Filter size={14} /> Filtros
      </span>

      {SELECTS.map((s) => (
        <label key={s.key} className="filter-bar__field">
          <span>{s.label}</span>
          <select value={filters[s.key] ?? ""} onChange={(e) => setFilter(s.key, e.target.value)} disabled={!opts}>
            <option value="">Todos</option>
            {(opts?.[s.opt] as string[] | undefined)?.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </label>
      ))}

      <label className="filter-bar__field">
        <span>Desde</span>
        <input type="date" value={filters.from ?? ""} onChange={(e) => setFilter("from", e.target.value)} />
      </label>
      <label className="filter-bar__field">
        <span>Hasta</span>
        <input type="date" value={filters.to ?? ""} onChange={(e) => setFilter("to", e.target.value)} />
      </label>

      <label className="filter-bar__field filter-bar__field--search">
        <span>Buscar FUR / nombre</span>
        <span className="filter-bar__search">
          <Search size={13} />
          <input
            key={filters.q ? "set" : "empty"}
            type="search"
            defaultValue={filters.q ?? ""}
            placeholder="FUR-PTE-…"
            onBlur={(e) => e.target.value !== (filters.q ?? "") && setFilter("q", e.target.value.trim())}
            onKeyDown={(e) => e.key === "Enter" && setFilter("q", e.currentTarget.value.trim())}
          />
        </span>
      </label>

      {active > 0 && (
        <button type="button" className="chip-btn filter-bar__clear" onClick={clear}>
          <X size={12} /> Limpiar ({active})
        </button>
      )}

      <p className="filter-bar__note">
        Los filtros se aplican a los datos reales de FUR (KPIs reales, tabla de detalle, HOLD/TBC, madurez y eventos por fecha).
        Los valores de ejemplo no responden a filtros. Sin dimensión cargada todavía:{" "}
        {opts ? opts.unsupported.join(", ") : "…"}.
      </p>
    </form>
  );
}
