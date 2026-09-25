/**
 * Copia autocontenida de los datos de ejemplo del frontend (src/shared/mockData.ts,
 * wmsData.ts, budgetData.ts, chartData.ts), usada solo para el seed de la base
 * real. No se importa desde src/ para evitar el choque ESM (frontend) / CommonJS
 * (backend Nest) al correr con ts-node. Si cambian los datos de ejemplo del
 * frontend, este archivo debe actualizarse a mano para mantenerlos alineados.
 */

// Las fotos reales de cada activo no existen todavía (AS-BUILT pendiente); seed.ts asigna /placeholders/<red>.svg.
const placeholderImg = (_seed: string) => "";

export const FUR_RECORDS = [
  {
    furCode: "FUR-PROC-00123",
    uuid: "a3f9c6e2-7b4e-4c2d-8f1e-9d2a7f1e0001",
    domain: "PROC",
    name: "Molino de Bolas MB-01",
    family: "Equipo de proceso / Molienda",
    status: "Operativo",
    criticality: "Alta",
    maturity: "D4",
    dataQualityPercent: 82,
    zone: "03 - Molienda",
    area: "Molienda",
    process: "Conminución",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "Metso",
    model: "MB-3600",
    serial: "SN-78345",
    supplier: "Metso Perú S.A.",
    createdAt: "2025-09-14",
    version: "1.0",
    image: placeholderImg("photo-1581093458791-9d09f9f43c8f"),
    technicalFields: [
      { label: "Capacidad nominal", value: "450", unit: "t/h", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Potencia instalada", value: "3,500", unit: "kW", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Velocidad", value: "11.5", unit: "rpm", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Diámetro x Longitud", value: "3.6 x 4.8", unit: "m", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tipo de descarga", value: "Rejilla", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tipo de liners", value: "Acero al manganeso", unit: "", condition: "CONFIRMADO", maturity: "D3" },
      { label: "Flujo de alimentación", value: "400", unit: "t/h", condition: "REFERENCIAL", maturity: "D3" },
      { label: "P80 alimentación", value: "10", unit: "mm", condition: "REFERENCIAL", maturity: "D2" },
      { label: "P80 producto", value: "150", unit: "µm", condition: "REFERENCIAL", maturity: "D3" },
    ],
    relations: [
      { type: "Pertenece a", target: "FUR-PROC-00050", targetLabel: "Línea Molienda", cardinality: "N:1", description: "Parte de sistema" },
      { type: "Alimenta a", target: "FUR-PROC-00130", targetLabel: "Clasificador", cardinality: "1:1", description: "Flujo de mineral" },
      { type: "Consume energía", target: "FUR-PTE-PB01-TRF-0001", targetLabel: "Transformador T-01", cardinality: "N:1", description: "Potencia eléctrica" },
      { type: "Instrumentado por", target: "FUR-IOT-001045", targetLabel: "Sensor Vibración", cardinality: "1:N", description: "Monitoreo IoT" },
      { type: "Mantenido por", target: "OT-000567", targetLabel: "Orden de trabajo", cardinality: "1:N", description: "Órdenes de trabajo" },
    ],
    documents: [
      { type: "Manual de operación", name: "MB3600_Manual.pdf", version: "v1.2", status: "Vigente" },
      { type: "Plano eléctrico", name: "MB3600_Elec.pdf", version: "v1.0", status: "Vigente" },
      { type: "Lista de repuestos", name: "MB3600_Spares.xlsx", version: "v3.0", status: "Vigente" },
      { type: "Certificado CE", name: "CE_Certificado.pdf", version: "v1.0", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar tipo y vida útil de liners" },
      { level: "TBC", description: "Validar consumo real de energía (kWh/t)" },
      { level: "TBC", description: "Levantar curva granulométrica histórica" },
      { level: "HOLD", description: "Confirmar lista de repuestos críticos" },
    ],
  },
  {
    furCode: "FUR-PTE-PB01-TRF-0001",
    uuid: "b1c8d7f3-8c5f-5d3e-9f2f-ae3b8g2f1102",
    domain: "PTE",
    name: "Transformador de Potencia 5 MVA",
    family: "Transformador / Potencia",
    status: "Operativo",
    criticality: "Alta",
    maturity: "D4",
    dataQualityPercent: 78,
    zone: "PB01 - Planta de Beneficio",
    area: "Eléctrica",
    process: "Distribución de Potencia",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "ABB",
    model: "ABB T5",
    serial: "SN-TRF-2022-001",
    supplier: "ABB Perú S.A.",
    createdAt: "2025-09-14",
    version: "1.0",
    image: placeholderImg("photo-1581092160607-ee22621dd758"),
    technicalFields: [
      { label: "Potencia nominal", value: "5", unit: "MVA", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tensión primaria", value: "34.5", unit: "kV", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tensión secundaria", value: "4.16", unit: "kV", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Frecuencia", value: "60", unit: "Hz", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tipo de enfriamiento", value: "ONAN/ONAF", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Impedancia", value: "6", unit: "%", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Nivel de aislamiento", value: "170", unit: "kV BIL", condition: "REFERENCIAL", maturity: "D3" },
    ],
    relations: [
      { type: "Alimenta a", target: "FUR-PTE-PB01-TAB-01", targetLabel: "Tablero principal", cardinality: "1:N", description: "Distribución" },
      { type: "Monitoreado por", target: "FUR-IOT-PB01-SEN-01", targetLabel: "Sensores temp/carga", cardinality: "1:N", description: "Condición" },
      { type: "Tiene repuestos", target: "FUR-RQ-PB01-RQ-01", targetLabel: "Requisiciones", cardinality: "1:N", description: "Repuestos críticos" },
    ],
    documents: [
      { type: "Ficha técnica", name: "ABB_T5_Datasheet.pdf", version: "v2.1", status: "Vigente" },
      { type: "Plano dimensional", name: "TRF01_Dimen.pdf", version: "v1.0", status: "Vigente" },
      { type: "Resultados de pruebas", name: "TRF01_Test_Report.pdf", version: "v1.1", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar impedancia real" },
      { level: "HOLD", description: "Validar nivel de aislamiento" },
      { level: "TBC", description: "Levantar curva de carga histórica" },
    ],
  },
  {
    furCode: "FUR-IOT-001045",
    uuid: "a31f9ce2-7b4e-4c2d-8f1e-9d2a71fe0001",
    domain: "IOT",
    name: "Sensor de Presión PT-100",
    family: "Sensor de campo / Presión",
    status: "Operativo",
    criticality: "Alta",
    maturity: "D4",
    dataQualityPercent: 86,
    zone: "03 - Molienda",
    area: "Molienda",
    process: "Clasificación / Impulsión",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "Endress+Hauser",
    model: "Cerabar PMC51",
    serial: "SN-PT100-4587",
    supplier: "Endress+Hauser (res.partner)",
    createdAt: "2026-09-16",
    version: "1.0",
    image: placeholderImg("photo-1581094794329-c8112a89af12"),
    technicalFields: [
      { label: "Variable medida", value: "Presión de pulpa", unit: "bar", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Rango de medición", value: "0 - 10", unit: "bar", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Señal de salida", value: "4-20 mA + HART", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Protocolo de integración", value: "HART / OPC UA Gateway", unit: "", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Alimentación", value: "24", unit: "VDC", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Precisión", value: "±0.1", unit: "% FS", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Última calibración", value: "2026-08-15", unit: "fecha", condition: "CONFIRMADO", maturity: "D4" },
    ],
    relations: [
      { type: "Pertenece a", target: "FUR-PROC-00050", targetLabel: "Línea de molienda", cardinality: "N:1", description: "Punto del sistema" },
      { type: "Mide", target: "FUR-PROC-00131", targetLabel: "Bomba de descarga", cardinality: "N:1", description: "Presión de descarga" },
      { type: "Comunica a", target: "GW-05", targetLabel: "Gateway GW-05", cardinality: "N:1", description: "Envío de datos HART" },
      { type: "Historizado por", target: "SCADA-HIS-01", targetLabel: "Historian", cardinality: "N:1", description: "Tendencias y eventos" },
    ],
    documents: [
      { type: "Datasheet", name: "PT100_Datasheet.pdf", version: "v1.2", status: "Vigente" },
      { type: "Loop diagram", name: "LD_IOT_PT100.dwg", version: "v1.0", status: "Vigente" },
      { type: "Certificado de calibración", name: "CAL_PT100_0815.pdf", version: "v1.0", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar latencia extremo a extremo del lazo" },
      { level: "TBC", description: "Verificar redundancia del gateway asociado" },
      { level: "TBC", description: "Levantar checksum y versión de firmware" },
      { level: "HOLD", description: "Confirmar política de recalibración anual" },
    ],
  },
  {
    furCode: "FUR-GPON-0231",
    uuid: "a8b1ff23d6-40c1-91ea-74bd8b120231",
    domain: "GPON",
    name: "OLT Huawei MA5800",
    family: "Equipo de red GPON",
    status: "Operativo",
    criticality: "Alta",
    maturity: "D4",
    dataQualityPercent: 84,
    zone: "Sala de Comunicaciones",
    area: "Telecomunicaciones",
    process: "Infraestructura digital",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "Huawei",
    model: "Huawei MA5800",
    serial: "GPON-OLT-82345",
    supplier: "Huawei Enterprise / Integrador local",
    createdAt: "2025-09-14",
    version: "1.0",
    image: placeholderImg("photo-1544197150-b99a580bb7a8"),
    technicalFields: [
      { label: "Tipo de equipo", value: "OLT GPON", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Capacidad", value: "32 puertos GPON", unit: "puertos", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tarjetas activas", value: "8", unit: "uds", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Uplink", value: "10GE", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Split ratio de diseño", value: "1:8", unit: "", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Presupuesto óptico objetivo", value: "28", unit: "dB", condition: "REFERENCIAL", maturity: "D3" },
    ],
    relations: [
      { type: "Pertenece a", target: "SITE-SALA-TELECOM", targetLabel: "Sala Telecom", cardinality: "N:1", description: "Parte de infraestructura digital" },
      { type: "Soporta", target: "ONU-034", targetLabel: "ONU 034", cardinality: "1:N", description: "Servicio PON hacia campo" },
      { type: "Soporta", target: "CCTV-CAM-12", targetLabel: "Cámara 12", cardinality: "1:N", description: "Transporte de video IP" },
    ],
    documents: [
      { type: "Manual de operación", name: "MA5800_Manual.pdf", version: "v1.4", status: "Vigente" },
      { type: "Plano de red", name: "GPON_Backbone_GA.pdf", version: "v1.1", status: "Vigente" },
      { type: "Prueba OTDR", name: "OTDR_Troncal01.pdf", version: "v1.0", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar niveles de potencia óptica por puerto" },
      { level: "TBC", description: "Validar topología final de splitters por área" },
      { level: "TBC", description: "Levantar inventario completo de ONUs instaladas" },
      { level: "HOLD", description: "Confirmar fecha de última actualización de capacidad" },
    ],
  },
  {
    furCode: "FUR-CC-A03-MP-001",
    uuid: "c2d9e814-3f6a-4b5c-8e21-7a1b9c3d4501",
    domain: "CC",
    name: "Muestra Pulpa Molienda M-245",
    family: "Muestra física / Pulpa",
    status: "Operativo",
    criticality: "Media",
    maturity: "D3",
    dataQualityPercent: 74,
    zone: "03 - Molienda",
    area: "Molienda",
    process: "Conminución",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "—",
    model: "—",
    serial: "M-245",
    supplier: "Toma interna (planta)",
    createdAt: "2026-08-25",
    version: "1.0",
    image: placeholderImg("photo-1582719478250-c89cae4dc85c"),
    technicalFields: [
      { label: "Punto de muestreo", value: "Descarga molino MB-01", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tipo de muestra", value: "Pulpa compuesta", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Método de toma", value: "Manual - cortador", unit: "", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Volumen tomado", value: "2", unit: "L", condition: "CONFIRMADO", maturity: "D3" },
      { label: "Custodia", value: "Cadena iniciada", unit: "", condition: "REFERENCIAL", maturity: "D2" },
    ],
    relations: [
      { type: "Analizada por", target: "FUR-LAB-A12-AU-001", targetLabel: "Análisis de Oro por AAS", cardinality: "1:N", description: "Solicitud de laboratorio" },
      { type: "Mide", target: "FUR-PROC-00123", targetLabel: "Molino de Bolas MB-01", cardinality: "N:1", description: "Punto de control de proceso" },
    ],
    documents: [
      { type: "Cadena de custodia", name: "COC_M245.pdf", version: "v1.0", status: "Vigente" },
      { type: "Plan de muestreo", name: "Plan_Muestreo_Molienda.pdf", version: "v2.0", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar plan maestro de muestreo definitivo" },
      { level: "TBC", description: "Validar responsable de custodia en turno noche" },
      { level: "HOLD", description: "Confirmar tiempo máximo de conservación de la muestra" },
    ],
  },
  {
    furCode: "FUR-LAB-A12-AU-001",
    uuid: "d3e0f925-4a7b-5c6d-9f32-8b2c0d4e5602",
    domain: "LAB",
    name: "Análisis de Oro por AAS",
    family: "Análisis / Ensayo químico",
    status: "Operativo",
    criticality: "Alta",
    maturity: "D4",
    dataQualityPercent: 88,
    zone: "Laboratorio QA/QC",
    area: "Laboratorio",
    process: "Control de calidad",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "PerkinElmer",
    model: "AAnalyst 800",
    serial: "SN-AAS-2231",
    supplier: "Laboratorio interno QA/QC Planta",
    createdAt: "2026-08-26",
    version: "1.0",
    image: placeholderImg("photo-1582719478250-c89cae4dc85d"),
    technicalFields: [
      { label: "Método", value: "Absorción atómica (AAS)", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Variable analizada", value: "Ley de oro", unit: "g/t", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Tiempo de respuesta", value: "24", unit: "h", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Incertidumbre", value: "±2", unit: "%", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Estado QA/QC", value: "Validado", unit: "", condition: "CONFIRMADO", maturity: "D4" },
    ],
    relations: [
      { type: "Analiza", target: "FUR-CC-A03-MP-001", targetLabel: "Muestra Pulpa Molienda M-245", cardinality: "N:1", description: "Muestra de origen" },
      { type: "Asociado a", target: "FUR-PROC-00123", targetLabel: "Molino de Bolas MB-01", cardinality: "N:1", description: "Activo/proceso correlacionado" },
    ],
    documents: [
      { type: "Certificado de resultado", name: "CERT_M245_AU.pdf", version: "v1.0", status: "Vigente" },
      { type: "Método validado", name: "Metodo_AAS_Au.pdf", version: "v3.1", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar certificación vigente del equipo AAS" },
      { level: "TBC", description: "Validar trazabilidad de patrones de calibración" },
    ],
  },
  {
    furCode: "FUR-MNT-A03-MB01-001",
    uuid: "e4f1a036-5b8c-6d7e-a043-9c3d1e5f6703",
    domain: "MNT",
    name: "Plan de Mantenimiento Molino MB-01",
    family: "Estrategia / Plan preventivo",
    status: "Operativo",
    criticality: "Alta",
    maturity: "D3",
    dataQualityPercent: 70,
    zone: "03 - Molienda",
    area: "Molienda",
    process: "Conminución",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "—",
    model: "—",
    serial: "PLAN-MB01-PM",
    supplier: "Equipo interno de mantenimiento",
    createdAt: "2026-08-20",
    version: "1.0",
    image: placeholderImg("photo-1581094651181-35942459ef63"),
    technicalFields: [
      { label: "Estrategia", value: "Preventiva + predictiva", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Frecuencia liners", value: "180", unit: "días", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Frecuencia lubricación", value: "30", unit: "días", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Última OT ejecutada", value: "OT-000567", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Confiabilidad (MTBF)", value: "1,240", unit: "h", condition: "REFERENCIAL", maturity: "D2" },
    ],
    relations: [
      { type: "Mantiene", target: "FUR-PROC-00123", targetLabel: "Molino de Bolas MB-01", cardinality: "1:1", description: "Activo mantenido" },
      { type: "Tiene repuesto", target: "FUR-RQ-PB01-RQ-01", targetLabel: "Requisición liners", cardinality: "1:N", description: "Repuestos críticos" },
    ],
    documents: [
      { type: "Plan de mantenimiento", name: "PM_MB01_Plan.pdf", version: "v2.0", status: "Vigente" },
      { type: "Historial de OT", name: "Hist_MNT_MB01.xlsx", version: "v1.3", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar taxonomía de fallas final del activo" },
      { level: "TBC", description: "Validar BOM completo de repuestos críticos" },
      { level: "HOLD", description: "Confirmar MTBF con datos históricos reales" },
    ],
  },
  {
    furCode: "FUR-RQ-PB01-RQ-01",
    uuid: "f502b147-6c9d-7e8f-b154-0d4e2f607804",
    domain: "RQ",
    name: "Requisición Liners Molino MB-01",
    family: "Requisición / Repuesto crítico",
    status: "En proyecto",
    criticality: "Alta",
    maturity: "D2",
    dataQualityPercent: 58,
    zone: "03 - Molienda",
    area: "Compras",
    process: "Abastecimiento",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "—",
    model: "—",
    serial: "RQ-2025-0045",
    supplier: "Por adjudicar",
    createdAt: "2026-08-18",
    version: "1.0",
    image: placeholderImg("photo-1581091870621-1d6a5a3f0e70"),
    technicalFields: [
      { label: "Ítem solicitado", value: "Liners acero al manganeso", unit: "", condition: "CONFIRMADO", maturity: "D3" },
      { label: "Cantidad", value: "24", unit: "uds", condition: "CONFIRMADO", maturity: "D3" },
      { label: "Prioridad", value: "Alta", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Estado de aprobación", value: "Pendiente jefatura", unit: "", condition: "REFERENCIAL", maturity: "D2" },
    ],
    relations: [
      { type: "Solicita", target: "FUR-MNT-A03-MB01-001", targetLabel: "Plan de Mantenimiento MB-01", cardinality: "N:1", description: "Origen de la necesidad" },
      { type: "Ofertada por", target: "FUR-OF-PB01-OF-01", targetLabel: "Oferta Metso Perú", cardinality: "1:N", description: "Cotización recibida" },
    ],
    documents: [
      { type: "Especificación técnica", name: "RQ_2025_0045_Spec.pdf", version: "v1.0", status: "Vigente" },
      { type: "Aprobación", name: "RQ_2025_0045_Approval.pdf", version: "v0.1", status: "En revisión" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar presupuesto disponible del centro de costo" },
      { level: "HOLD", description: "Cerrar aprobación de jefatura de mantenimiento" },
    ],
  },
  {
    furCode: "FUR-OF-PB01-OF-01",
    uuid: "06139258-7dae-8f90-c265-1e5f30719a05",
    domain: "OF",
    name: "Oferta Comercial Metso Perú — Liners MB-01",
    family: "Oferta / Cotización proveedor",
    status: "En proyecto",
    criticality: "Media",
    maturity: "D2",
    dataQualityPercent: 62,
    zone: "PB01 - Planta de Beneficio",
    area: "Compras",
    process: "Abastecimiento",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "Metso",
    model: "—",
    serial: "OF-2025-0023",
    supplier: "Metso Perú S.A.",
    createdAt: "2026-08-22",
    version: "1.0",
    image: placeholderImg("photo-1560179707-f14e90ef3624"),
    technicalFields: [
      { label: "Precio unitario", value: "3,200", unit: "USD", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Plazo de entrega", value: "16-20", unit: "semanas", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Validez de oferta", value: "30", unit: "días", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Condición de pago", value: "50% anticipo / 50% contra entrega", unit: "", condition: "REFERENCIAL", maturity: "D3" },
    ],
    relations: [
      { type: "Oferta", target: "FUR-RQ-PB01-RQ-01", targetLabel: "Requisición Liners MB-01", cardinality: "N:1", description: "Requisición de origen" },
    ],
    documents: [
      { type: "Cotización", name: "OF_2025_0023_Quote.pdf", version: "v1.0", status: "Vigente" },
      { type: "Ficha comercial", name: "Metso_Comercial.pdf", version: "v1.0", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar comparación con oferta alternativa" },
      { level: "TBC", description: "Validar condiciones de garantía extendida" },
    ],
  },
  {
    furCode: "FUR-CAM-SC01-CAM-01",
    uuid: "1724a369-8ebf-9001-d376-2f6041820b06",
    domain: "CAM",
    name: "Cámara PTZ Molienda CAM-01",
    family: "Cámara / Seguridad",
    status: "Operativo",
    criticality: "Media",
    maturity: "D3",
    dataQualityPercent: 76,
    zone: "03 - Molienda",
    area: "Seguridad",
    process: "Monitoreo de video",
    coordinates: "-12.0467, -76.9381",
    manufacturer: "Hikvision",
    model: "DS-2DE7A425",
    serial: "SN-CAM-01-2245",
    supplier: "Integrador local de seguridad",
    createdAt: "2026-08-10",
    version: "1.0",
    image: placeholderImg("photo-1518709268805-4e9042af2177"),
    technicalFields: [
      { label: "Tipo", value: "PTZ IP", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Resolución", value: "4", unit: "MP", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Retención de video", value: "30", unit: "días", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Transporte", value: "Video IP sobre GPON", unit: "", condition: "CONFIRMADO", maturity: "D3" },
    ],
    relations: [
      { type: "Comunica con", target: "FUR-GPON-0231", targetLabel: "OLT Huawei MA5800", cardinality: "N:1", description: "Transporte de video IP" },
      { type: "Monitorea", target: "FUR-PROC-00123", targetLabel: "Molino de Bolas MB-01", cardinality: "N:1", description: "Cobertura de zona" },
    ],
    documents: [
      { type: "Ficha técnica", name: "CAM01_Datasheet.pdf", version: "v1.0", status: "Vigente" },
      { type: "Plano de cobertura", name: "CAM_Cobertura_Molienda.pdf", version: "v1.0", status: "Vigente" },
    ],
    holds: [
      { level: "TBC", description: "Confirmar política de retención según normativa" },
      { level: "TBC", description: "Validar cobertura ciega en zona de carga" },
    ],
  },
];

export const CATALOG_ENTITIES = [
  { furCode: "FUR-ACT-000123", entityType: "Activos Físicos", domain: "PTE", title: "Bomba de Pulpa Warman 6/4", subtitle: "FUR-ACT-000123", meta: ["Área: Molienda", "Planta: REVMIN II"], status: "Operativo", image: placeholderImg("photo-1518709268805-4e9042af2176") },
  { furCode: "FUR-PRO-000045", entityType: "Procesos", domain: "PROC", title: "Proceso de Lixiviación con Carbón Activado", subtitle: "FUR-PRO-000045", meta: ["Planta: REVMIN II"], status: "Operativo", image: placeholderImg("photo-1581093588401-fbb62a02f120") },
  { furCode: "FUR-SER-000078", entityType: "Servicio", domain: null, title: "Servicio de Mantenimiento Predictivo", subtitle: "Proveedor: Tecnomin C.A.", meta: ["Desde USD 1,500"], status: "Disponible", image: placeholderImg("photo-1581091870621-1d6a5a3f0e6f"), price: "Desde USD 1,500", rating: 4.8 },
  { furCode: "FUR-CUR-000210", entityType: "Curso (LMS)", domain: null, title: "Operación de Planta de Beneficio de Oro", subtitle: "Proveedor: FUR Academy", meta: ["USD 49", "120 estudiantes"], status: "Disponible", image: placeholderImg("photo-1523240795612-9a054b0db644"), price: "USD 49", rating: 4.9 },
  { furCode: "FUR-DOC-000567", entityType: "Documento", domain: null, title: "Plano P&ID - Área de Molienda", subtitle: "Tipo: Plano / Formato: PDF", meta: ["v2.1", "12-09-2026"], status: "Certificado", image: placeholderImg("photo-1581092335878-02b3b2b2e7f2") },
  { furCode: "FUR-PROV-000034", entityType: "Proveedor", domain: null, title: "Weir Minerals", subtitle: "Productos: Bombas, Hidrociclones", meta: ["4.7 (36)", "12 productos"], status: "Certificado", image: placeholderImg("photo-1560179707-f14e90ef3623"), rating: 4.7 },
  { furCode: "FUR-INV-000890", entityType: "Inventario (WMS)", domain: null, title: "Carbón Activado - Alta Pureza", subtitle: "Almacén: Principal", meta: ["12,500 kg"], status: "Operativo", image: placeholderImg("photo-1581093458791-9d09f9f43c8f") },
  { furCode: "FUR-LAB-000345", entityType: "Laboratorio", domain: null, title: "Análisis de Oro por AAS", subtitle: "Laboratorio: QA/QC Planta", meta: ["Tiempo de respuesta: 24h"], status: "Disponible", image: placeholderImg("photo-1582719478250-c89cae4dc85b") },
  { furCode: "FUR-DASH-000012", entityType: "Dashboard", domain: null, title: "Producción en Tiempo Real", subtitle: "Área: Planta General", meta: ["Público"], status: "Activo", image: placeholderImg("photo-1551288049-bebda4e38f71") },
  { furCode: "FUR-RED-000009", entityType: "Red Transversal", domain: "MNT", title: "Red de Mantenimiento", subtitle: "Miembros: 86", meta: ["Mantenimiento", "Confiabilidad", "OEE"], status: "Activo", image: placeholderImg("photo-1581094651181-35942459ef62") },
  { furCode: "FUR-SIT-000001", entityType: "Sitio / Mapa", domain: null, title: "Planta REVMIN II", subtitle: "Ubicación: Zacate, Colombia", meta: ["Mapa", "3D", "GIS"], status: "Activo", image: placeholderImg("photo-1500534623283-312aade485b7") },
  { furCode: "FUR-PER-000678", entityType: "Personas", domain: null, title: "Jorge Martínez", subtitle: "Rol: Ingeniero de Procesos", meta: ["Procesos", "Metalurgia", "Optimización"], status: "Activo", image: placeholderImg("photo-1560250097-0b93528c311a") },
  { furCode: "FUR-SER-000091", entityType: "Servicio", domain: null, title: "Ingeniería de Detalle Eléctrica", subtitle: "Proveedor: ABB Perú S.A.", meta: ["Desde USD 4,500"], status: "Disponible", image: placeholderImg("photo-1581092160607-ee22621dd75a"), price: "Desde USD 4,500", rating: 4.6 },
  { furCode: "FUR-SER-000102", entityType: "Servicio", domain: null, title: "Auditoría OTDR de Red GPON", subtitle: "Proveedor: Integrador local de telecom", meta: ["Desde USD 900"], status: "Disponible", image: placeholderImg("photo-1544197150-b99a580bb7a9"), price: "Desde USD 900", rating: 4.5 },
  { furCode: "FUR-PROV-000041", entityType: "Proveedor", domain: null, title: "ABB Perú S.A.", subtitle: "Productos: Transformadores, protecciones, VFD", meta: ["4.8 (52)", "9 productos"], status: "Certificado", image: placeholderImg("photo-1581092160607-ee22621dd75b"), rating: 4.8 },
  { furCode: "FUR-PROV-000058", entityType: "Proveedor", domain: null, title: "Endress+Hauser Perú", subtitle: "Productos: Instrumentación, sensores, calibración", meta: ["4.9 (41)", "15 productos"], status: "Certificado", image: placeholderImg("photo-1581094794329-c8112a89af13"), rating: 4.9 },
  { furCode: "FUR-PER-000691", entityType: "Personas", domain: null, title: "Andrea Salazar", subtitle: "Rol: Especialista en Confiabilidad y Mantenimiento", meta: ["Mantenimiento", "RCM", "Vibraciones"], status: "Activo", image: placeholderImg("photo-1580489944761-15a19d654956") },
  { furCode: "FUR-PER-000705", entityType: "Personas", domain: null, title: "Luis Fernández", subtitle: "Rol: Instrumentista Senior", meta: ["IoT", "SCADA", "Calibración"], status: "Activo", image: placeholderImg("photo-1568602471122-7832951cc4c5") },
  { furCode: "FUR-CUR-000223", entityType: "Curso (LMS)", domain: null, title: "Fundamentos de Control de Calidad y Cadena de Custodia", subtitle: "Proveedor: FUR Academy", meta: ["USD 39", "85 estudiantes"], status: "Disponible", image: placeholderImg("photo-1582719478250-c89cae4dc85e"), price: "USD 39", rating: 4.7 },
  { furCode: "FUR-CUR-000231", entityType: "Curso (LMS)", domain: null, title: "Mantenimiento Predictivo con IoT Industrial", subtitle: "Proveedor: FUR Academy", meta: ["USD 59", "210 estudiantes"], status: "Disponible", image: placeholderImg("photo-1581094651181-35942459ef64"), price: "USD 59", rating: 4.8 },
  { furCode: "FUR-DOC-000589", entityType: "Documento", domain: null, title: "Manual de Operación Molino de Bolas MB-01", subtitle: "Tipo: Manual / Formato: PDF", meta: ["v1.2", "14-09-2025"], status: "Certificado", image: placeholderImg("photo-1581093588401-fbb62a02f121") },
  { furCode: "FUR-DOC-000602", entityType: "Documento", domain: null, title: "Diagrama Unifilar Subestación Principal", subtitle: "Tipo: Unifilar / Formato: PDF", meta: ["v1.0", "14-09-2025"], status: "Certificado", image: placeholderImg("photo-1581092335878-02b3b2b2e7f3") },
];

export const STOCK_ITEMS = [
  { sku: "REP-LIN-MB01", name: "Liner acero al manganeso MB-01", category: "Repuestos críticos", warehouse: "Almacén Principal", location: "A-03-04", qty: 6, uom: "uds", reorderPoint: 12, linkedFur: "FUR-MNT-A03-MB01-001", lastMovement: "2026-09-10" },
  { sku: "REP-TRF-BUSH", name: "Buje pasatapa transformador 5 MVA", category: "Repuestos críticos", warehouse: "Almacén Principal", location: "A-01-02", qty: 2, uom: "uds", reorderPoint: 2, linkedFur: "FUR-PTE-PB01-TRF-0001", lastMovement: "2026-08-22" },
  { sku: "CONS-CARB-ACT", name: "Carbón Activado - Alta Pureza", category: "Consumibles de proceso", warehouse: "Almacén Principal", location: "B-02-01", qty: 12500, uom: "kg", reorderPoint: 4000, linkedFur: null, lastMovement: "2026-09-18" },
  { sku: "CONS-NACN", name: "Cianuro de sodio (NaCN)", category: "Consumibles de proceso", warehouse: "Almacén Reactivos", location: "R-01-01", qty: 3200, uom: "kg", reorderPoint: 1500, linkedFur: null, lastMovement: "2026-09-15" },
  { sku: "REP-SEN-PT100", name: "Sensor de presión PT-100 (repuesto)", category: "Instrumentación", warehouse: "Almacén Principal", location: "C-04-02", qty: 4, uom: "uds", reorderPoint: 3, linkedFur: "FUR-IOT-001045", lastMovement: "2026-07-30" },
  { sku: "REP-OLT-SFP", name: "Módulo SFP GPON (repuesto)", category: "Comunicaciones", warehouse: "Almacén Telecom", location: "T-01-01", qty: 5, uom: "uds", reorderPoint: 4, linkedFur: "FUR-GPON-0231", lastMovement: "2026-08-05" },
  { sku: "EPP-CASCO", name: "Casco de seguridad dieléctrico", category: "EPP / Seguridad", warehouse: "Almacén Principal", location: "D-01-01", qty: 180, uom: "uds", reorderPoint: 40, linkedFur: null, lastMovement: "2026-09-05" },
];

export const BUDGET_PROJECT = {
  code: "LW-PROY-001",
  name: "Mantenimiento Mayor Molienda 2026 — Planta REVMIN II",
  currency: "USD",
  chapters: [
    {
      code: "CAP-01",
      name: "Reposición de Liners — Molino MB-01",
      items: [
        {
          code: "PART-01.01",
          name: "Suministro e instalación de liners acero al manganeso MB-01",
          unit: "uds",
          quantity: 24,
          factor: 1.28,
          linkedFur: "FUR-MNT-A03-MB01-001",
          resources: [
            { type: "Materiales", name: "Liner acero al manganeso", unit: "und", quantity: 1, unitPrice: 3200 },
            { type: "Mano de Obra", name: "Cuadrilla mecánica (turno)", unit: "hh", quantity: 6, unitPrice: 28 },
            { type: "Equipos", name: "Grúa telescópica 20t", unit: "hh", quantity: 3, unitPrice: 85 },
            { type: "Otros", name: "EPP y consumibles de montaje", unit: "glb", quantity: 1, unitPrice: 60 },
          ],
        },
        {
          code: "PART-01.02",
          name: "Alineamiento y balanceo post-instalación",
          unit: "servicio",
          quantity: 1,
          factor: 1.22,
          linkedFur: "FUR-MNT-A03-MB01-001",
          resources: [
            { type: "Mano de Obra", name: "Técnico especialista vibraciones", unit: "hh", quantity: 8, unitPrice: 35 },
            { type: "Equipos", name: "Equipo de alineación láser", unit: "día", quantity: 1, unitPrice: 180 },
            { type: "Otros", name: "Informe técnico y certificación", unit: "glb", quantity: 1, unitPrice: 120 },
          ],
        },
      ],
    },
    {
      code: "CAP-02",
      name: "Mantenimiento Transformador de Potencia PB01",
      items: [
        {
          code: "PART-02.01",
          name: "Prueba de aislamiento y reemplazo de buje pasatapa",
          unit: "servicio",
          quantity: 1,
          factor: 1.25,
          linkedFur: "FUR-PTE-PB01-TRF-0001",
          resources: [
            { type: "Materiales", name: "Buje pasatapa 34.5 kV", unit: "und", quantity: 1, unitPrice: 4100 },
            { type: "Mano de Obra", name: "Ingeniero eléctrico senior", unit: "hh", quantity: 10, unitPrice: 42 },
            { type: "Equipos", name: "Equipo de prueba de aislamiento", unit: "día", quantity: 1, unitPrice: 210 },
            { type: "Otros", name: "Aceite dieléctrico de reposición", unit: "gal", quantity: 15, unitPrice: 9 },
          ],
        },
      ],
    },
  ],
};

export const PRODUCTION_TREND_24H = [
  { hour: "00:00", tonPerHour: 138 }, { hour: "02:00", tonPerHour: 142 }, { hour: "04:00", tonPerHour: 135 },
  { hour: "06:00", tonPerHour: 149 }, { hour: "08:00", tonPerHour: 158 }, { hour: "10:00", tonPerHour: 162 },
  { hour: "12:00", tonPerHour: 155 }, { hour: "14:00", tonPerHour: 160 }, { hour: "16:00", tonPerHour: 164 },
  { hour: "18:00", tonPerHour: 157 }, { hour: "20:00", tonPerHour: 151 }, { hour: "22:00", tonPerHour: 144 },
];

const FAILURE_CAUSES = [
  { cause: "Desgaste de liners", count: 14 },
  { cause: "Falla eléctrica", count: 9 },
  { cause: "Falla de instrumentación", count: 6 },
  { cause: "Fuga hidráulica", count: 4 },
  { cause: "Desalineación", count: 3 },
  { cause: "Otras", count: 2 },
];

export const FAILURE_PARETO = (() => {
  const total = FAILURE_CAUSES.reduce((s, c) => s + c.count, 0);
  let acc = 0;
  return FAILURE_CAUSES.map((c) => {
    acc += c.count;
    return { ...c, cumulativePct: Math.round((acc / total) * 100) };
  });
})();

export const UPCOMING_WORK_ORDERS = [
  { code: "OT-000567", title: "Cambio de liners MB-01", startOffsetPct: 5, durationPct: 20, status: "En ejecución" },
  { code: "OT-000571", title: "Inspección transformador PB01", startOffsetPct: 15, durationPct: 10, status: "Programada" },
  { code: "OT-000560", title: "Calibración PT-100", startOffsetPct: 0, durationPct: 12, status: "Retrasada" },
  { code: "OT-000575", title: "Mantenimiento OLT MA5800", startOffsetPct: 40, durationPct: 15, status: "Programada" },
];

export const POWER_DEMAND_24H = [
  { hour: "00:00", kv: 5.8 }, { hour: "02:00", kv: 5.6 }, { hour: "04:00", kv: 5.5 },
  { hour: "06:00", kv: 6.1 }, { hour: "08:00", kv: 6.6 }, { hour: "10:00", kv: 6.9 },
  { hour: "12:00", kv: 6.7 }, { hour: "14:00", kv: 6.8 }, { hour: "16:00", kv: 7.0 },
  { hour: "18:00", kv: 6.6 }, { hour: "20:00", kv: 6.2 }, { hour: "22:00", kv: 5.9 },
];

export const TONNAGE_LAST_7_DAYS = [
  { day: "Lun", tons: 3210, recoveryPct: 87.9 },
  { day: "Mar", tons: 3340, recoveryPct: 88.2 },
  { day: "Mié", tons: 3180, recoveryPct: 87.5 },
  { day: "Jue", tons: 3402, recoveryPct: 88.6 },
  { day: "Vie", tons: 3450, recoveryPct: 88.6 },
  { day: "Sáb", tons: 3300, recoveryPct: 88.0 },
  { day: "Dom", tons: 3120, recoveryPct: 87.1 },
];

export const LAB_SAMPLES_BY_STATUS = [
  { status: "Validado", count: 31, color: "#1f9d55" },
  { status: "En análisis", count: 24, color: "#f5a623" },
  { status: "Pendiente", count: 9, color: "#9aa5b4" },
  { status: "Desviación QA/QC", count: 1, color: "#d64545" },
];

/** Fichas referenciadas desde las relaciones de otras fichas (antes eran enlaces rotos). */
function mkFur(p: {
  furCode: string; uuid: string; domain: string; name: string; family: string;
  criticality: string; maturity: string; dataQualityPercent: number;
  zone: string; area: string; process: string; manufacturer?: string; model?: string;
  technicalFields: { label: string; value: string; unit: string; condition: string; maturity: string }[];
  relations: { type: string; target: string; targetLabel: string; cardinality: string; description: string }[];
  holds: { level: string; description: string }[];
}) {
  return {
    status: "Operativo",
    coordinates: "-12.0467, -76.9381",
    manufacturer: p.manufacturer ?? "—",
    model: p.model ?? "—",
    serial: "—",
    supplier: "Por confirmar",
    createdAt: "2026-09-01",
    version: "1.0",
    image: placeholderImg(p.furCode),
    documents: [],
    ...p,
  };
}

export const EXTRA_FUR_RECORDS = [
  mkFur({
    furCode: "FUR-PROC-00050", uuid: "7a1c0d50-0050-4b1e-9c11-0000000000a1", domain: "PROC",
    name: "Línea de Molienda", family: "Sistema / Línea de proceso", criticality: "Alta", maturity: "D3",
    dataQualityPercent: 68, zone: "03 - Molienda", area: "Molienda", process: "Conminución",
    technicalFields: [
      { label: "Etapa", value: "Molienda primaria y clasificación", unit: "", condition: "CONFIRMADO", maturity: "D3" },
      { label: "Capacidad de diseño", value: "450", unit: "t/h", condition: "REFERENCIAL", maturity: "D3" },
      { label: "Activos principales", value: "MB-01, clasificador, bomba de descarga", unit: "", condition: "REFERENCIAL", maturity: "D2" },
    ],
    relations: [
      { type: "Contiene", target: "FUR-PROC-00123", targetLabel: "Molino de Bolas MB-01", cardinality: "1:N", description: "Activo de proceso" },
      { type: "Contiene", target: "FUR-PROC-00130", targetLabel: "Clasificador", cardinality: "1:N", description: "Activo de proceso" },
      { type: "Contiene", target: "FUR-PROC-00131", targetLabel: "Bomba de descarga", cardinality: "1:N", description: "Activo de proceso" },
    ],
    holds: [{ level: "TBC", description: "Validar diagrama de flujo (PFD) vigente de la línea" }],
  }),
  mkFur({
    furCode: "FUR-PROC-00130", uuid: "7a1c0d50-0130-4b1e-9c11-0000000000a2", domain: "PROC",
    name: "Clasificador (Hidrociclones)", family: "Equipo de proceso / Clasificación", criticality: "Media", maturity: "D2",
    dataQualityPercent: 52, zone: "03 - Molienda", area: "Molienda", process: "Clasificación",
    manufacturer: "Weir Minerals", model: "Cavex (por confirmar)",
    technicalFields: [
      { label: "Tipo", value: "Batería de hidrociclones", unit: "", condition: "REFERENCIAL", maturity: "D2" },
      { label: "P80 producto objetivo", value: "150", unit: "µm", condition: "REFERENCIAL", maturity: "D3" },
    ],
    relations: [
      { type: "Recibe de", target: "FUR-PROC-00123", targetLabel: "Molino de Bolas MB-01", cardinality: "1:1", description: "Descarga del molino" },
      { type: "Pertenece a", target: "FUR-PROC-00050", targetLabel: "Línea de Molienda", cardinality: "N:1", description: "Parte del sistema" },
    ],
    holds: [{ level: "TBC", description: "Confirmar número de ciclones y modelo" }, { level: "HOLD", description: "Levantar curva de partición real" }],
  }),
  mkFur({
    furCode: "FUR-PROC-00131", uuid: "7a1c0d50-0131-4b1e-9c11-0000000000a3", domain: "PROC",
    name: "Bomba de Descarga de Molino", family: "Equipo de proceso / Bombeo de pulpa", criticality: "Alta", maturity: "D2",
    dataQualityPercent: 55, zone: "03 - Molienda", area: "Molienda", process: "Impulsión",
    manufacturer: "Weir Minerals", model: "Warman 6/4 (por confirmar)",
    technicalFields: [
      { label: "Servicio", value: "Pulpa de descarga de molino", unit: "", condition: "CONFIRMADO", maturity: "D3" },
      { label: "Presión de descarga", value: "0 - 10", unit: "bar", condition: "REFERENCIAL", maturity: "D2" },
    ],
    relations: [
      { type: "Medida por", target: "FUR-IOT-001045", targetLabel: "Sensor de Presión PT-100", cardinality: "1:N", description: "Presión de descarga" },
      { type: "Pertenece a", target: "FUR-PROC-00050", targetLabel: "Línea de Molienda", cardinality: "N:1", description: "Parte del sistema" },
    ],
    holds: [{ level: "TBC", description: "Confirmar curva de la bomba y punto de operación" }],
  }),
  mkFur({
    furCode: "FUR-PTE-PB01-TAB-01", uuid: "7a1c0d50-0201-4b1e-9c11-0000000000a4", domain: "PTE",
    name: "Tablero Principal 4.16 kV", family: "Tablero / Distribución MT", criticality: "Alta", maturity: "D3",
    dataQualityPercent: 64, zone: "PB01 - Planta de Beneficio", area: "Eléctrica", process: "Distribución de Potencia",
    manufacturer: "ABB", model: "por confirmar",
    technicalFields: [
      { label: "Tensión nominal", value: "4.16", unit: "kV", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Alimentado por", value: "Transformador 5 MVA", unit: "", condition: "CONFIRMADO", maturity: "D4" },
      { label: "Protecciones", value: "Por levantar en unifilar", unit: "", condition: "TBC", maturity: "D1" },
    ],
    relations: [
      { type: "Alimentado por", target: "FUR-PTE-PB01-TRF-0001", targetLabel: "Transformador de Potencia 5 MVA", cardinality: "N:1", description: "Distribución" },
    ],
    holds: [{ level: "HOLD", description: "Validar unifilar y ajustes de protecciones vigentes" }],
  }),
  mkFur({
    furCode: "FUR-IOT-PB01-SEN-01", uuid: "7a1c0d50-0301-4b1e-9c11-0000000000a5", domain: "IOT",
    name: "Sensores de Temperatura y Carga TRF-01", family: "Sensor de campo / Temperatura", criticality: "Media", maturity: "D2",
    dataQualityPercent: 48, zone: "PB01 - Planta de Beneficio", area: "Eléctrica", process: "Monitoreo de condición",
    technicalFields: [
      { label: "Variable medida", value: "Temperatura de aceite / devanado", unit: "°C", condition: "REFERENCIAL", maturity: "D2" },
      { label: "Señal", value: "4-20 mA", unit: "", condition: "REFERENCIAL", maturity: "D2" },
    ],
    relations: [
      { type: "Monitorea", target: "FUR-PTE-PB01-TRF-0001", targetLabel: "Transformador de Potencia 5 MVA", cardinality: "N:1", description: "Condición del transformador" },
    ],
    holds: [{ level: "TBC", description: "Confirmar TAGs, rangos y mapeo a SCADA" }],
  }),
];

/**
 * Series de EJEMPLO para dashboards cuyo dato real depende de sistemas aún no conectados
 * (SCADA/Historian, NMS GPON, LIMS, CCTV, HSE…). La UI las rotula "Ejemplo".
 */
const months = ["Abr", "May", "Jun", "Jul", "Ago", "Sep"];
const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const hours = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"];

export const EXTRA_SERIES: Record<string, unknown> = {
  exe_trend: months.map((label, i) => ({ label, costPerTon: [18.4, 18.1, 17.9, 18.3, 17.6, 17.4][i], recoveryPct: [87.2, 87.6, 88.0, 87.8, 88.4, 88.6][i] })),
  met_process_24h: hours.map((label, i) => ({ label, solidsPct: [38, 39, 41, 40, 39, 38][i], ph: [10.6, 10.7, 10.9, 10.8, 10.7, 10.6][i] })),
  pte_pf_24h: hours.map((label, i) => ({ label, pf: [0.91, 0.92, 0.94, 0.93, 0.93, 0.92][i], thd: [3.1, 3.3, 3.9, 3.6, 3.4, 3.2][i] })),
  iot_health: ["PT-100", "TT-201", "LT-305", "FT-410", "AT-511 (pH)", "PT-102", "TT-204", "ZT-330", "VT-611", "WIT-701", "LT-308", "FT-412"].map((label, i) => ({ label, status: [0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0][i] === 0 ? "ok" : [0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0][i] === 1 ? "warn" : "fail" })),
  gpon_rx: ["ONU-001", "ONU-012", "ONU-023", "ONU-034", "ONU-045", "ONU-056", "ONU-067", "ONU-078"].map((label, i) => ({ label, value: [-19.2, -20.5, -22.1, -23.8, -18.7, -24.6, -21.0, -19.9][i], color: [-19.2, -20.5, -22.1, -23.8, -18.7, -24.6, -21.0, -19.9][i] < -23 ? "#d64545" : [-19.2, -20.5, -22.1, -23.8, -18.7, -24.6, -21.0, -19.9][i] < -21.5 ? "#f5a623" : "#1f9d55" })),
  cc_pipeline: [{ label: "Tomadas", value: 64 }, { label: "Preparadas", value: 58 }, { label: "En análisis", value: 24 }, { label: "Validadas", value: 31 }],
  lab_tat: days.map((label, i) => ({ label, tat: [21, 23, 22, 25, 20, 19, 22][i] })),
  wms_abc: [{ label: "A (críticos)", value: 12, color: "#d64545" }, { label: "B", value: 38, color: "#f5a623" }, { label: "C", value: 130, color: "#9aa5b4" }],
  scurve: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago"].map((label, i) => ({ label, planned: [8, 20, 34, 50, 64, 78, 90, 100][i], real: [6, 17, 30, 45, 58, 70, 0, 0][i] || null })),
  hse_incidents: months.map((label, i) => ({ label, incidents: [2, 1, 0, 1, 0, 1][i], unsafe: [14, 11, 9, 12, 8, 7][i] })),
  cam_health: ["CAM-01", "CAM-02", "CAM-03", "CAM-04", "CAM-05", "CAM-06", "CAM-07", "CAM-08"].map((label, i) => ({ label, status: [0, 0, 0, 1, 0, 2, 0, 0][i] === 0 ? "ok" : [0, 0, 0, 1, 0, 2, 0, 0][i] === 1 ? "warn" : "fail" })),
  lms_progress: [{ label: "Operación de Planta", value: 78 }, { label: "Control de Calidad y Custodia", value: 64 }, { label: "Mantenimiento Predictivo IoT", value: 52 }, { label: "HSE Fundamentos", value: 91 }],
  sup_funnel: [{ label: "RFQ recibidas", value: 18 }, { label: "Ofertas enviadas", value: 12 }, { label: "PO emitidas", value: 7 }, { label: "Entregas cumplidas", value: 5 }],
  eng_moc: [{ label: "MOC solicitados", value: 9 }, { label: "En revisión", value: 6 }, { label: "Aprobados", value: 4 }, { label: "Implementados", value: 3 }],
  opr_shift: [{ label: "Turno A", value: 1180 }, { label: "Turno B", value: 1235 }, { label: "Turno C", value: 1104 }],
  mnt_backlog: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"].map((label, i) => ({ label, open: [22, 20, 19, 21, 18, 18][i], closed: [9, 11, 12, 10, 13, 14][i] })),
  gpl_oee: days.map((label, i) => ({ label, oee: [74.2, 75.8, 73.9, 77.1, 78.0, 76.4, 72.8][i], availability: [94.0, 95.1, 93.6, 96.0, 96.4, 95.2, 92.9][i] })),
  buy_leadtime: months.map((label, i) => ({ label, days: [92, 88, 95, 84, 86, 81][i] })),
};
