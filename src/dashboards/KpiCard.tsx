import { Link } from "react-router-dom";
import type { DashboardKpis, KpiDefinition } from "../shared/api";
import type { KpiSpec } from "./spec";
import { fmt, PROV_LABEL, readKpi, type Quality } from "./kpiReading";
import "./widgets.css";
import "./DashboardShell.css";

const Q_LABEL: Record<Quality, string> = {
  confirmado: "Confirmado",
  referencial: "Referencial",
  tbc: "TBC",
  hold: "HOLD",
  ejemplo: "Ejemplo",
  "sin-dato": "Sin dato",
};

/** Insignia de condición del dato (§21). */
export function DataQualityBadge({ q }: { q: Quality }) {
  return <span className={`dq-badge dq-badge--${q}`}>{Q_LABEL[q]}</span>;
}

interface Props {
  kpi: KpiSpec;
  kpis: DashboardKpis | null;
  prevKpis: DashboardKpis | null;
  definition?: KpiDefinition;
  onDetail: () => void;
}

/** Tarjeta KPI (§4.3): valor, procedencia, comparación, timestamp, fuente, condición y "Ver detalle". */
export function KpiCard({ kpi, kpis, prevKpis, definition, onDetail }: Props) {
  const r = readKpi(kpi, kpis);
  const prev = r.prov === "real" && prevKpis ? readKpi(kpi, prevKpis).raw : undefined;
  const delta = r.raw !== undefined && prev !== undefined ? r.raw - prev : undefined;

  return (
    <article className={`kpi-card${kpi.tone && r.prov !== "real" ? ` kpi-card--${kpi.tone}` : ""}`}>
      <span className="kpi-tile__label">{kpi.label}</span>
      <span className={`kpi-tile__value kpi-tile__value--${r.prov === "real" ? "default" : (kpi.tone ?? "default")}`}>{r.value}</span>
      {delta !== undefined && (
        <span className={`kpi-card__delta kpi-card__delta--${delta > 0 ? "up" : delta < 0 ? "down" : "flat"}`}>
          {delta > 0 ? "▲" : delta < 0 ? "▼" : "■"} {delta === 0 ? "sin cambio" : `${delta > 0 ? "+" : ""}${fmt(delta)}`} vs lectura anterior
        </span>
      )}
      <span className="kpi-tile__foot">
        <span className={`kpi-tile__prov kpi-tile__prov--${r.prov}`}>{PROV_LABEL[r.prov]}</span>
        {r.prov === "real" && <DataQualityBadge q={r.quality} />}
      </span>
      <span className="kpi-card__meta">
        <span>Fuente: {kpi.source}</span>
        <span>
          {r.prov === "real" && kpis
            ? `Calculado ${new Date(kpis.generated_at).toLocaleTimeString("es")}`
            : "Sin timestamp de origen"}
          {definition ? ` · ${definition.unit ?? "unidad por definir"}` : ""}
        </span>
        <span>Objetivo: por definir</span>
      </span>
      <button type="button" className="kpi-card__detail" onClick={onDetail}>
        Ver detalle
      </button>
      {kpi.to && (
        <Link to={kpi.to} className="kpi-card__detail" title="Ver el registro que explica este número">
          Abrir registro
        </Link>
      )}
    </article>
  );
}
