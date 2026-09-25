import "./Badges.css";
import type { AssetStatus, DataCondition, DataMaturity, Criticality } from "../../shared/types";

const STATUS_TONE: Record<string, "success" | "warning" | "danger" | "inactive"> = {
  Operativo: "success",
  Activo: "success",
  Disponible: "success",
  Certificado: "success",
  "En mantenimiento": "warning",
  "En proyecto": "warning",
  "Fuera de servicio": "danger",
};

export function StatusBadge({ status }: { status: AssetStatus | string }) {
  const tone = STATUS_TONE[status] ?? "inactive";
  return (
    <span className={`badge badge--${tone}`}>
      <span className="badge__dot" />
      {status}
    </span>
  );
}

const CONDITION_TONE: Record<DataCondition, "success" | "warning" | "danger" | "inactive"> = {
  CONFIRMADO: "success",
  REFERENCIAL: "warning",
  TBC: "warning",
  HOLD: "danger",
  OBSOLETO: "inactive",
};

export function ConditionBadge({ condition }: { condition: DataCondition }) {
  const tone = CONDITION_TONE[condition];
  return <span className={`badge badge--sm badge--${tone}`}>{condition}</span>;
}

export function MaturityBadge({ maturity }: { maturity: DataMaturity }) {
  return <span className="badge badge--sm badge--maturity">{maturity}</span>;
}

const CRIT_TONE: Record<Criticality, "danger" | "warning" | "inactive"> = {
  Alta: "danger",
  Media: "warning",
  Baja: "inactive",
};

export function CriticalityBadge({ criticality }: { criticality: Criticality }) {
  const tone = CRIT_TONE[criticality];
  return <span className={`badge badge--sm badge--${tone}`}>Criticidad: {criticality}</span>;
}
