import type { DomainCode, DomainMeta } from "./types";

export const DOMAINS: Record<DomainCode, DomainMeta> = {
  PROC: {
    code: "PROC",
    label: "Procesos",
    shortLabel: "FUR-PROC",
    color: "var(--net-proc)",
    icon: "cog",
    description: "Etapas, subprocesos y activos de proceso metalúrgico.",
    fullTabs: [
      "Resumen", "General", "Flujo", "Entradas/Salidas", "Variables", "Activos",
      "Potencia", "IoT", "Calidad", "Laboratorio", "Documentos", "KPI", "Historial",
    ],
  },
  PTE: {
    code: "PTE",
    label: "Potencia Eléctrica",
    shortLabel: "FUR-PTE",
    color: "var(--net-pte)",
    icon: "zap",
    description: "Transformadores, MCC, motores, VFD y protecciones.",
    fullTabs: [
      "Resumen", "Placa", "Eléctrico", "Protecciones", "Alimentadores", "Medición",
      "IoT", "Mantenimiento", "Repuestos", "Documentos", "Unifilar", "Historial",
    ],
  },
  IOT: {
    code: "IOT",
    label: "IoT / Instrumentación",
    shortLabel: "FUR-IOT",
    color: "var(--net-iot)",
    icon: "wifi",
    description: "Sensores, transmisores, analizadores y mapeo PLC/SCADA.",
    fullTabs: [
      "Resumen", "Variable", "Metrología", "Señal", "Comunicación", "PLC/SCADA",
      "Historian", "Alarmas", "Calibración", "Activo/Proceso", "Documentos", "Historial",
    ],
  },
  GPON: {
    code: "GPON",
    label: "Comunicaciones",
    shortLabel: "FUR-GPON",
    color: "var(--net-gpon)",
    icon: "network",
    description: "OLT, ODN, splitters, fibra y servicios de red.",
    fullTabs: [
      "Resumen", "Equipo", "Puertos", "ODN", "Fibra", "Potencia Óptica", "Topología",
      "Servicios", "Energía", "Inventario", "Documentos", "Alarmas", "Historial",
    ],
  },
  CC: {
    code: "CC",
    label: "Control de Calidad",
    shortLabel: "FUR-CC",
    color: "var(--net-cc)",
    icon: "flask-conical",
    description: "Muestra física, punto de toma y cadena de custodia.",
    fullTabs: [
      "Resumen", "Muestra", "Punto de Muestreo", "Toma", "Cadena de Custodia",
      "Preparación", "Solicitud", "Resultados Vinculados", "Documentos", "Historial",
    ],
  },
  LAB: {
    code: "LAB",
    label: "Laboratorios",
    shortLabel: "FUR-LAB",
    color: "var(--net-lab)",
    icon: "microscope",
    description: "Análisis, método, equipo y resultado QA/QC.",
    fullTabs: [
      "Resumen", "Solicitud", "Muestra", "Preparación", "Método", "Equipo", "Corrida",
      "Resultados", "QA/QC", "Validación", "Certificado", "Documentos", "Historial",
    ],
  },
  MNT: {
    code: "MNT",
    label: "Mantenimiento",
    shortLabel: "FUR-MNT",
    color: "var(--net-mnt)",
    icon: "wrench",
    description: "Estrategias, planes, OT, fallas, condición y BOM.",
    fullTabs: [
      "Resumen", "Activo", "Estrategia", "Planes", "Órdenes de Trabajo", "Condición",
      "Fallas", "Repuestos/BOM", "Inventario", "Personal", "Documentos", "KPI", "Historial",
    ],
  },
  RQ: {
    code: "RQ",
    label: "Requisiciones",
    shortLabel: "FUR-RQ",
    color: "var(--net-rq)",
    icon: "clipboard-list",
    description: "Necesidad interna, líneas, especificaciones y aprobaciones.",
  },
  OF: {
    code: "OF",
    label: "Ofertas Comerciales",
    shortLabel: "FUR-OF",
    color: "var(--net-of)",
    icon: "handshake",
    description: "Oferta, proveedor, precios, condiciones y comparación.",
  },
  CAM: {
    code: "CAM",
    label: "Cámaras / Seguridad",
    shortLabel: "FUR-CAM",
    color: "var(--net-cam)",
    icon: "camera",
    description: "Cámaras, video, cobertura de red y eventos.",
  },
};

export const DOMAIN_LIST = Object.values(DOMAINS);
