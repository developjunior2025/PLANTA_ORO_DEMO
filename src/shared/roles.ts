/**
 * Roles funcionales del ecosistema (sección 12.2 del plan + megadocumento
 * REV.01 §63 RBAC por rol × dominio). `quickLinks` reconstruye el panel
 * "PERFILES DE USUARIO — Dashboards por rol (Privados)" del mapa del sitio
 * (material visual del proyecto), enlazando cada foco a la página real que
 * ya existe en el prototipo en vez de a un dashboard por rol aparte.
 */
export interface RoleQuickLink {
  label: string;
  to: string;
}

export interface Role {
  id: string;
  label: string;
  scope: string;
  access: string;
  quickLinks: RoleQuickLink[];
  /** Dashboard inicial del rol (megadocumento §64.2), slug de /app/dashboards/:slug. */
  dashboardSlug: string;
  /** Dashboards secundarios del rol (megadocumento §64.2). Vacío = ninguno; "*" = todos. */
  secondarySlugs: string[];
}

export const ROLES: Role[] = [
  {
    id: "admin-fur",
    dashboardSlug: "auditoria",
    secondarySlugs: ["*"],
    label: "Administrador FUR",
    scope: "Todos los dominios",
    access: "Lectura/escritura total, configuración del sistema",
    quickLinks: [
      { label: "Usuarios, roles y permisos", to: "/app/admin" },
      { label: "Auditoría", to: "/app/admin" },
      { label: "Dashboards", to: "/app/dashboards" },
    ],
  },
  {
    id: "direccion",
    dashboardSlug: "ejecutivo",
    secondarySlugs: ["planta", "costos", "hse"],
    label: "Gerencia General / Dirección",
    scope: "Todos los dominios (lectura)",
    access: "Dashboards ejecutivos, KPIs, auditoría",
    quickLinks: [
      { label: "Dashboards ejecutivos", to: "/app/dashboards" },
      { label: "Presupuestos y costos", to: "/app/presupuestos" },
      { label: "Auditoría", to: "/app/admin" },
    ],
  },
  {
    id: "gerente-planta",
    dashboardSlug: "planta",
    secondarySlugs: ["procesos", "mantenimiento", "potencia", "calidad"],
    label: "Gerente de Planta",
    scope: "Operación, mantenimiento, calidad",
    access: "Lectura/escritura operativa, aprobaciones",
    quickLinks: [
      { label: "Producción y recuperación", to: "/app/dashboards" },
      { label: "Estado de procesos y equipos", to: "/app/procesos" },
      { label: "Alarmas y desempeño", to: "/app/dashboards" },
    ],
  },
  {
    id: "metalurgista",
    dashboardSlug: "procesos",
    secondarySlugs: ["iot", "calidad", "laboratorio"],
    label: "Metalurgista / Procesos",
    scope: "FUR-PROC, FUR-IOT",
    access: "Lectura/escritura en procesos y variables",
    quickLinks: [
      { label: "Variables de proceso", to: "/app/procesos" },
      { label: "Recuperación y calidad", to: "/app/laboratorio" },
      { label: "Ensayos y metalurgia", to: "/app/laboratorio" },
    ],
  },
  {
    id: "jefe-mantenimiento",
    dashboardSlug: "mantenimiento",
    secondarySlugs: ["wms", "iot"],
    label: "Jefe de Mantenimiento",
    scope: "FUR-MNT, WMS",
    access: "Lectura/escritura en OT, planes, repuestos",
    quickLinks: [
      { label: "Estado de activos", to: "/app/mantenimiento" },
      { label: "Órdenes y planes", to: "/app/mantenimiento" },
      { label: "Costos e indicadores", to: "/app/dashboards" },
    ],
  },
  {
    id: "almacen",
    dashboardSlug: "wms",
    secondarySlugs: ["mantenimiento", "compras"],
    label: "Almacén / Logística",
    scope: "WMS/Inventario",
    access: "Movimientos, recepciones, reservas",
    quickLinks: [
      { label: "Inventarios y movimientos", to: "/app/inventario" },
      { label: "Recepciones y despachos", to: "/app/inventario" },
      { label: "Trazabilidad", to: "/app/inventario" },
    ],
  },
  {
    id: "compras",
    dashboardSlug: "compras",
    secondarySlugs: ["wms", "costos"],
    label: "Compras / Proveedores",
    scope: "FUR-RQ, FUR-OF, proveedores",
    access: "Gestión de requisiciones y ofertas",
    quickLinks: [
      { label: "Órdenes de compra", to: "/app/requisiciones" },
      { label: "Proveedores y cotizaciones", to: "/app/proveedores" },
      { label: "Entregas y facturas", to: "/app/requisiciones" },
    ],
  },
  {
    id: "presupuesto",
    dashboardSlug: "costos",
    secondarySlugs: ["compras", "ejecutivo"],
    label: "Presupuesto / Costos",
    scope: "Presupuestos LULO",
    access: "Creación y valuación de presupuestos",
    quickLinks: [
      { label: "Presupuestos LULO", to: "/app/presupuestos" },
      { label: "Valuaciones y control", to: "/app/presupuestos" },
      { label: "Costos y análisis", to: "/app/dashboards" },
    ],
  },
  {
    id: "laboratorio",
    dashboardSlug: "laboratorio",
    secondarySlugs: ["calidad", "procesos"],
    label: "Laboratorio / Calidad",
    scope: "FUR-CC, FUR-LAB",
    access: "Muestras, análisis, resultados, certificados",
    quickLinks: [
      { label: "Ensayos y resultados", to: "/app/laboratorio" },
      { label: "Control de calidad", to: "/app/laboratorio" },
      { label: "Certificados", to: "/app/documentos" },
    ],
  },
  {
    id: "operador",
    dashboardSlug: "operacion",
    secondarySlugs: ["procesos"],
    label: "Operador de Planta",
    scope: "Dashboards operativos",
    access: "Lectura de variables, registro de turno",
    quickLinks: [
      { label: "Panel de operador", to: "/app/dashboards" },
      { label: "Variables y alarmas", to: "/app/dashboards" },
      { label: "Mapa de planta", to: "/app/mapas" },
    ],
  },
  {
    id: "instrumentista",
    dashboardSlug: "iot",
    secondarySlugs: ["procesos", "potencia"],
    label: "Técnico / Instrumentista",
    scope: "FUR-IOT",
    access: "Calibración, conectividad, diagnósticos",
    quickLinks: [
      { label: "Instrumentos y señales", to: "/app/redes/iot" },
      { label: "Redes IoT/SCADA", to: "/app/redes/iot" },
      { label: "Activos físicos", to: "/app/activos" },
    ],
  },
  {
    id: "telecom",
    dashboardSlug: "gpon",
    secondarySlugs: ["camaras", "iot"],
    label: "Telecom / GPON",
    scope: "FUR-GPON",
    access: "Topología, puertos, potencia óptica",
    quickLinks: [
      { label: "Red GPON", to: "/app/redes/gpon" },
      { label: "Documentos técnicos", to: "/app/documentos" },
      { label: "Activos físicos", to: "/app/activos" },
    ],
  },
  {
    id: "potencia",
    dashboardSlug: "potencia",
    secondarySlugs: ["mantenimiento", "iot"],
    label: "Potencia eléctrica",
    scope: "FUR-PTE",
    access: "Placa, protecciones, mediciones, unifilar",
    quickLinks: [
      { label: "Red de Potencia Eléctrica", to: "/app/redes/pte" },
      { label: "Mantenimiento", to: "/app/mantenimiento" },
      { label: "Documentos técnicos", to: "/app/documentos" },
    ],
  },
  {
    id: "hse",
    dashboardSlug: "hse",
    secondarySlugs: ["camaras", "planta"],
    label: "HSE / SSOMA",
    scope: "Seguridad, cámaras",
    access: "Incidentes, reportes, indicadores HSE",
    quickLinks: [
      { label: "Cámaras / seguridad", to: "/app/redes/cam" },
      { label: "Indicadores HSE", to: "/app/dashboards" },
      { label: "Documentos", to: "/app/documentos" },
    ],
  },
  {
    id: "instructor",
    dashboardSlug: "lms",
    secondarySlugs: [],
    label: "Instructor / Docente",
    scope: "LMS",
    access: "Gestión de cursos y evaluaciones",
    quickLinks: [
      { label: "Gestión de cursos", to: "/app/cursos" },
      { label: "Contenidos y materiales", to: "/app/documentos" },
      { label: "Dashboards", to: "/app/dashboards" },
    ],
  },
  {
    id: "estudiante",
    dashboardSlug: "lms",
    secondarySlugs: [],
    label: "Estudiante",
    scope: "LMS (propio)",
    access: "Cursos, progreso, certificaciones",
    quickLinks: [
      { label: "Mis cursos", to: "/app/cursos" },
      { label: "Biblioteca de conocimiento", to: "/app/documentos" },
      { label: "Catálogo", to: "/app/catalogo" },
    ],
  },
  {
    id: "proveedor",
    dashboardSlug: "proveedor",
    secondarySlugs: [],
    label: "Proveedor / Vendedor",
    scope: "Marketplace, ofertas propias",
    access: "Tienda, ventas, facturación",
    quickLinks: [
      { label: "Marketplace", to: "/app/marketplace" },
      { label: "Directorio de proveedores", to: "/app/proveedores" },
      { label: "Requisiciones/ofertas", to: "/app/requisiciones" },
    ],
  },
  {
    id: "ingenieria",
    dashboardSlug: "ingenieria",
    secondarySlugs: ["procesos", "mantenimiento", "calidad"],
    label: "Ingeniería / Proyectos",
    scope: "Ingeniería, MOC, documentos",
    access: "MOC, documentos, revisiones, madurez y TBC/HOLD",
    quickLinks: [
      { label: "Dashboard de Ingeniería", to: "/app/dashboards/ingenieria" },
      { label: "Documentos", to: "/app/documentos" },
      { label: "Fichas con HOLD", to: "/app/alertas" },
    ],
  },
  {
    id: "seguridad",
    dashboardSlug: "camaras",
    secondarySlugs: ["hse"],
    label: "Seguridad / CCTV",
    scope: "FUR-CAM, seguridad física",
    access: "Cámaras, eventos, cobertura y evidencia",
    quickLinks: [
      { label: "Dashboard de Seguridad / CCTV", to: "/app/dashboards/camaras" },
      { label: "Red de cámaras", to: "/app/redes/cam" },
      { label: "Dashboard HSE", to: "/app/dashboards/hse" },
    ],
  },
  {
    id: "auditor",
    dashboardSlug: "auditoria",
    secondarySlugs: ["*"],
    label: "Auditor",
    scope: "Lectura de todos los dominios",
    access: "Cambios, aprobaciones, calidad D0-D5 y evidencias",
    quickLinks: [
      { label: "Dashboard de Auditoría y Gobierno", to: "/app/dashboards/auditoria" },
      { label: "Catálogo de dashboards", to: "/app/dashboards" },
      { label: "Administración", to: "/app/admin" },
    ],
  },
  {
    id: "visitante",
    dashboardSlug: "tiempo-real",
    secondarySlugs: [],
    label: "Visitante",
    scope: "Área pública",
    access: "Solo lectura de contenido público",
    quickLinks: [
      { label: "Catálogo", to: "/app/catalogo" },
      { label: "Marketplace", to: "/app/marketplace" },
      { label: "Cursos", to: "/app/cursos" },
    ],
  },
];

export const DEFAULT_ROLE_ID = "gerente-planta";

export function getRole(id: string): Role {
  return ROLES.find((r) => r.id === id) ?? ROLES[0];
}
