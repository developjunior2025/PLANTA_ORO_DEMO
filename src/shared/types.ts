export type DomainCode =
  | "PROC"
  | "PTE"
  | "IOT"
  | "GPON"
  | "CC"
  | "LAB"
  | "MNT"
  | "RQ"
  | "OF"
  | "CAM";

export type DataCondition =
  | "CONFIRMADO"
  | "REFERENCIAL"
  | "TBC"
  | "HOLD"
  | "OBSOLETO";

export type DataMaturity = "D0" | "D1" | "D2" | "D3" | "D4" | "D5";

export type AssetStatus = "Operativo" | "En mantenimiento" | "Fuera de servicio" | "En proyecto";

export type Criticality = "Alta" | "Media" | "Baja";

export interface DomainMeta {
  code: DomainCode;
  label: string;
  shortLabel: string;
  color: string;
  icon: string;
  description: string;
  /** Lista completa de pestañas objetivo para esta red según el megadocumento
   * REV.01 (§9.3-10.3). El prototipo implementa el núcleo común (Resumen,
   * Técnico, Relaciones, Documentos, Calidad del Dato, Historial); estas son
   * las pestañas específicas de dominio pendientes de construir por oleada. */
  fullTabs?: string[];
}

export interface TechnicalField {
  label: string;
  value: string;
  unit?: string;
  condition: DataCondition;
  maturity: DataMaturity;
}

export interface FurRelation {
  type: string;
  target: string;
  targetLabel: string;
  cardinality: string;
  description: string;
}

export interface FurDocument {
  type: string;
  name: string;
  version: string;
  status: "Vigente" | "En revisión" | "Obsoleto";
}

export interface FurHold {
  level: "TBC" | "HOLD";
  description: string;
}

export interface FurRecord {
  furCode: string;
  uuid: string;
  domain: DomainCode;
  name: string;
  family: string;
  status: AssetStatus;
  criticality: Criticality;
  maturity: DataMaturity;
  dataQualityPercent: number;
  zone: string;
  area: string;
  process: string;
  coordinates: string;
  manufacturer: string;
  model: string;
  serial: string;
  supplier: string;
  createdAt: string;
  version: string;
  image: string;
  technicalFields: TechnicalField[];
  relations: FurRelation[];
  documents: FurDocument[];
  holds: FurHold[];
}

export interface CatalogEntity {
  furCode: string;
  entityType: string;
  domain?: DomainCode;
  title: string;
  subtitle: string;
  meta: string[];
  status: AssetStatus | "Disponible" | "Activo" | "Certificado";
  image: string;
  price?: string;
  rating?: number;
}
