/**
 * Cadena productiva maestra: 18 etapas D01–D18 (documento maestro, infografía del mapa del sitio).
 * Solo las fichas FUR y entidades del catálogo que pertenecen a un activo/proceso de planta declaran
 * una etapa; proveedores, personas, servicios, cursos, documentos, etc. no la tienen.
 */
export interface Stage {
  code: string; // "01".."18"
  label: string;
}

export const STAGES: Stage[] = [
  { code: "01", label: "Recepción y Alimentación" },
  { code: "02", label: "Trituración Primaria" },
  { code: "03", label: "Cribado" },
  { code: "04", label: "Trituración Secundaria" },
  { code: "05", label: "Transporte / Silos" },
  { code: "06", label: "Molienda Primaria" },
  { code: "07", label: "Molienda Secundaria" },
  { code: "08", label: "Clasificación" },
  { code: "09", label: "Pre-lixiviación" },
  { code: "10", label: "Espesamiento" },
  { code: "11", label: "Lixiviación / CIL" },
  { code: "12", label: "Adsorción CIP" },
  { code: "13", label: "Manejo de Carbón Cargado" },
  { code: "14", label: "Elución / Desorción" },
  { code: "15", label: "Electrowinning" },
  { code: "16", label: "Calcinación / Secado" },
  { code: "17", label: "Fundición" },
  { code: "18", label: "Producto Final / Reactivación / Colas" },
];

export const stageLabel = (code: string) => STAGES.find((s) => s.code === code)?.label ?? code;
