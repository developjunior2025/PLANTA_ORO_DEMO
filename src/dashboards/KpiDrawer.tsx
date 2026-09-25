import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import type { DashboardKpis, DashboardFilters, KpiDefinition } from "../shared/api";
import type { KpiSpec } from "./spec";
import { DataQualityBadge } from "./KpiCard";
import { PROV_LABEL, readKpi } from "./kpiReading";
import "./DashboardShell.css";

interface Props {
  kpi: KpiSpec;
  kpis: DashboardKpis | null;
  definition?: KpiDefinition;
  filters: DashboardFilters;
  dashboardCode: string;
  onClose: () => void;
}

/** Panel de detalle de un KPI (§2.1: propietario, definición, fórmula, unidad, fuente, versión, trazabilidad). */
export function KpiDrawer({ kpi, kpis, definition, filters, dashboardCode, onClose }: Props) {
  const r = readKpi(kpi, kpis);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const applied = Object.entries(filters).filter(([, v]) => v);

  return createPortal(
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label={`Detalle de ${kpi.label}`} onClick={(e) => e.stopPropagation()}>
        <header>
          <div>
            <h2>{kpi.label}</h2>
            <span className={`kpi-tile__prov kpi-tile__prov--${r.prov}`}>{PROV_LABEL[r.prov]}</span>
          </div>
          <button ref={closeRef} type="button" className="chip-btn" onClick={onClose} aria-label="Cerrar detalle">
            <X size={14} />
          </button>
        </header>

        <div className="drawer__value">{r.value}</div>
        <DataQualityBadge q={r.quality} />

        <dl>
          <dt>Ficha KPI</dt>
          <dd>{definition ? definition.code : "Sin ficha equivalente en el catálogo del documento (§15)"}</dd>
          {definition && (
            <>
              <dt>Definición</dt>
              <dd>{definition.name}</dd>
              <dt>Unidad</dt>
              <dd>{definition.unit ?? "Por definir"}</dd>
              <dt>Fórmula</dt>
              <dd>{definition.formula ?? "Pendiente de aprobación por el propietario del proceso (§24, HOLD #2)"}</dd>
              <dt>Propietario</dt>
              <dd>{definition.owner}</dd>
              <dt>Versión</dt>
              <dd>
                {definition.version} · {definition.approvalStatus}
              </dd>
            </>
          )}
          <dt>Fuente de autoridad</dt>
          <dd>{kpi.source}</dd>
          <dt>Dashboard</dt>
          <dd>{dashboardCode}</dd>
          <dt>Timestamp</dt>
          <dd>{r.prov === "real" && kpis ? new Date(kpis.generated_at).toLocaleString("es") : "Sin timestamp: el sistema fuente no está conectado"}</dd>
          <dt>Filtros aplicados</dt>
          <dd>{applied.length ? applied.map(([k, v]) => `${k}=${v}`).join(" · ") : "Ninguno"}</dd>
          <dt>Objetivo / límites</dt>
          <dd>Por definir (§24, HOLD #3)</dd>
        </dl>

        <p className="drawer__note">
          {r.prov === "real"
            ? "Este número se calcula ahora mismo sobre las fichas FUR de PostgreSQL. El dashboard no es sistema de autoridad: la evidencia está en el registro enlazado."
            : r.prov === "ejemplo"
              ? "Valor ilustrativo: su fuente de autoridad (SCADA/Historian, NMS, LIMS, Odoo…) todavía no está conectada, así que no debe usarse para decidir."
              : "Este indicador no puede calcularse todavía porque no existe fuente ni autenticación real que lo alimente."}
        </p>

        {kpi.to && (
          <Link to={kpi.to} className="btn btn--navy" onClick={onClose}>
            Abrir el registro que explica este número
          </Link>
        )}
      </aside>
    </div>,
    document.body
  );
}
