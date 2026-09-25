# PLAN TÉCNICO MAESTRO PARA EL DESARROLLO DEL ECOSISTEMA DIGITAL FUR
## Frontend React.js + TypeScript · Backend NestJS · Odoo 19 · PostgreSQL · Redes Transversales · OT/IT · Motor presupuestario tipo LuloWin

**Código documental:** `PTD-FUR-REACT-001`  
**Revisión:** `REV.01`  
**Fecha:** `2026-09-24`  
**Estado:** Plan técnico de desarrollo / arquitectura objetivo / base de ejecución  
**Proyecto:** Ecosistema Digital FUR — Planta de Beneficio de Oro  
**Documento base principal:** Catálogo maestro FUR-IOT, documentos maestros FUR/Odoo 19, tesis REV.01, componentes React.js y material visual del proyecto  
**Condición:** Arquitectura de desarrollo. No constituye AS-BUILT, IFC ni AFC. Las decisiones que dependan de la instancia real de Odoo 19, de LuloWin, de la red OT o de información de planta permanecen TBC/HOLD hasta validación.

---

# 0. RESUMEN EJECUTIVO

Este plan organiza la construcción del **Ecosistema Digital FUR** como una plataforma web industrial, modular y trazable para una planta de beneficio de oro. El frontend se desarrollará en **React.js + TypeScript**, con una experiencia de usuario inspirada en las pantallas e infografías del proyecto: Home tipo marketplace/discovery, catálogo unificado, fichas FUR técnicas, dashboards en tiempo real, mapas, filtros facetados, vistas por red transversal y navegación contextual.

La arquitectura objetivo adopta los siguientes principios:

1. **FUR como identidad digital maestra:** cada activo, proceso o entidad relevante tiene una identidad única, versionada, auditable y relacionable.
2. **Odoo 19 nativo primero:** los maestros y transacciones que Odoo ya resuelve se reutilizan o extienden; no se duplican sin necesidad.
3. **Especialización FUR por dominio:** la lógica industrial que Odoo no representa de forma natural se modela en módulos y tablas FUR especializadas.
4. **Frontend desacoplado:** React nunca consulta tablas físicas directamente; consume APIs versionadas.
5. **NestJS como capa de aplicación/BFF/API:** concentra contratos, seguridad, composición de datos, reglas de aplicación y conexión controlada con Odoo/FUR/OT.
6. **PostgreSQL como motor relacional:** soporta Odoo y las extensiones FUR, manteniendo integridad, índices, auditoría y relaciones normalizadas.
7. **Autoridad del dato en el sistema de origen:** FUR conserva identidad, contexto, relaciones, calidad y trazabilidad; SCADA/Historian conserva series temporales; Odoo conserva las transacciones ERP; WMS conserva stock; LIMS/QA-QC conserva resultados cuando exista.
8. **UX/UI parametrizable:** una plantilla FUR común se especializa por `dominio + familia + subtipo`, evitando construir una pantalla rígida por activo.
9. **Calidad del dato visible:** cada dato crítico puede expresar condición `CONFIRMADO`, `REFERENCIAL`, `TBC`, `HOLD` u `OBSOLETO` y madurez `D0–D5`.
10. **Entrega incremental:** primero se construye el núcleo FUR y la experiencia común; luego se incorporan redes técnicas y módulos empresariales por oleadas.

El plan está dividido en **etapas y fases**, desde gobierno, levantamiento y UX/UI hasta arquitectura, frontend, APIs, Odoo, modelo de datos, integración OT/IT, pruebas FAT/SAT/UAT, despliegue y operación.

---

# 1. OBJETIVO DEL PLAN

Definir una ruta de ejecución suficientemente detallada para que un equipo de desarrollo pueda construir el Ecosistema Digital FUR manteniendo coherencia entre:

- arquitectura de información;
- diseño UX/UI;
- componentes React.js;
- contratos API;
- modelo de dominio;
- modelos y módulos Odoo 19;
- tablas FUR comunes y especializadas;
- PostgreSQL;
- seguridad y permisos;
- WMS/inventarios;
- mantenimiento;
- requisiciones y ofertas;
- presupuesto tipo LuloWin;
- documentos y conocimiento;
- dashboards;
- OT/SCADA/Historian/IoT;
- calidad, laboratorio y trazabilidad;
- pruebas, auditoría y gobierno del dato.

---

# 2. ALCANCE FUNCIONAL DEL ECOSISTEMA

## 2.1 Áreas funcionales principales

El software contempla, como arquitectura de referencia:

- Home / Inicio del Ecosistema.
- Catálogo global de entidades.
- Activos físicos.
- Procesos.
- Diez redes transversales FUR.
- Marketplace industrial.
- Proveedores.
- Servicios profesionales.
- Cursos / LMS.
- WMS / Inventarios.
- Presupuestos tipo LuloWin.
- Documentos / biblioteca técnica.
- Dashboards / BI.
- Mapas / sitios / geolocalización.
- Mantenimiento.
- Laboratorios.
- Control de calidad.
- Requisiciones.
- Ofertas comerciales.
- Cámaras / seguridad.
- Administración, usuarios, roles y auditoría.

## 2.2 Diez redes transversales

| Código | Red / dominio | Objeto principal |
|---|---|---|
| `FUR-PROC` | Procesos | proceso, etapa, subproceso, activo de proceso |
| `FUR-PTE` | Potencia Eléctrica | transformadores, MCC, motores, VFD, protecciones |
| `FUR-IOT` | IoT / Instrumentación | sensores, transmisores, analizadores, edge, PLC mapping |
| `FUR-GPON` | Comunicaciones | OLT, ODN, splitters, fibra, ONU/ONT, servicios |
| `FUR-CC` | Control de Calidad | muestra física, toma, punto, custodia |
| `FUR-LAB` | Laboratorios | análisis, método, equipo, resultado, QA/QC |
| `FUR-MNT` | Mantenimiento | estrategias, planes, OT, fallas, condición, BOM |
| `FUR-RQ` | Requisiciones | necesidad interna, líneas, especificaciones, aprobaciones |
| `FUR-OF` | Ofertas Comerciales | oferta, proveedor, precios, condiciones, comparación |
| `FUR-CAM` | Cámaras / Seguridad | cámaras, video, cobertura, red, eventos |

## 2.3 Cadena de valor principal

```text
HOME / CATÁLOGO
      ↓
FUR / ACTIVO / PROCESO
      ↓
RELACIONES TRANSVERSALES
      ↓
PROC ↔ PTE ↔ IOT ↔ GPON ↔ CC ↔ LAB ↔ MNT
      ↓                       ↓
     CAM                    WMS
      ↓                       ↓
DOCUMENTOS ← RQ ← OF ← COMPRAS ODOO
      ↓
PRESUPUESTO / LULOWIN-TIPO
      ↓
DASHBOARDS / KPI / AUDITORÍA
```

---

# 3. PRINCIPIOS UX/UI DERIVADOS DEL MATERIAL VISUAL DEL PROYECTO

Las imágenes adjuntas definen una dirección visual y de interacción clara. El desarrollo debe convertir esa dirección en un **Design System**, no replicar cada pantalla como una imagen estática.

## 3.1 Lenguaje visual

- Paleta principal: **azul marino industrial + amarillo/oro + blanco**, con colores funcionales por red transversal.
- Fotografías industriales de alta calidad en cabeceras y tarjetas.
- Jerarquía visual fuerte mediante títulos grandes, indicadores, chips y bloques técnicos.
- Tarjetas con bordes suaves, información compacta y acciones visibles.
- Iconografía consistente para activos, procesos, redes, documentos, mantenimiento, inventario, laboratorio y datos.
- Estados operacionales con semántica visual: verde activo/confirmado, amarillo advertencia/TBC, rojo HOLD/alarma, gris inactivo/obsoleto.
- Densidad de información alta en escritorio, pero organizada por niveles de lectura.

## 3.2 Patrones principales de experiencia

### A. Home / Discovery

La Home debe combinar:

- buscador global;
- selector de categorías;
- accesos rápidos por dominio;
- banner/hero industrial;
- estado general de planta;
- servicios del ecosistema;
- ofertas destacadas;
- dashboards en tiempo real;
- mapa interactivo;
- actividad reciente;
- accesos rápidos operativos.

### B. Catálogo global

El catálogo debe ofrecer:

- filtros laterales facetados;
- pestañas por entidad;
- tarjetas consistentes;
- ordenamiento;
- paginación;
- favoritos;
- vista mapa cuando aplique;
- búsqueda por FUR, TAG, nombre, ubicación, proveedor, documento, proceso o palabra clave;
- acciones contextuales por tipo de entidad.

### C. Ficha FUR técnica

La vista FUR debe seguir un patrón reutilizable:

```text
CABECERA FUR
├── Código / UUID / TAG
├── Estado / criticidad / madurez
├── Imagen técnica o fotografía
├── Ubicación / mapa
└── Acciones rápidas

RESUMEN / CADENA FUNCIONAL

BLOQUES COMUNES
├── Identidad
├── Jerarquía y ubicación
├── Clasificación
├── Responsabilidad
├── Ciclo de vida
├── Documentación
├── Relaciones
├── Auditoría
└── Búsqueda / alias

BLOQUE ESPECIALIZADO POR DOMINIO

RELACIONES TRANSVERSALES
DOCUMENTOS Y EVIDENCIA
CALIDAD DEL DATO
TBC / HOLD
CHECKLIST DE VALIDACIÓN
```

### D. Vistas de red transversal

Cada red debe tener:

- resumen/KPI;
- topología o cadena funcional;
- catálogo de activos/entidades;
- filtros propios;
- actividad/eventos;
- documentos relacionados;
- navegación hacia FUR individuales.

### E. Mapa / Sitio

Debe permitir navegación:

```text
Planta → Área → Etapa → Sistema → Activo / FUR
```

con capas configurables para activos, procesos, sensores, cámaras, laboratorio, WMS, alarmas, documentos y redes.

## 3.3 Diseño responsive

Prioridades:

- **Desktop:** operación principal y vistas técnicas densas.
- **Tablet:** inspecciones, mantenimiento, inventario y consulta de FUR.
- **Móvil:** búsqueda, identificación por QR/barcode, checklist, fotos, documentos, estados y acciones rápidas.

No se debe intentar mostrar todas las tablas técnicas en móvil. Se usará progressive disclosure, tabs, accordions y vistas resumidas.

## 3.4 Accesibilidad

Objetivo recomendado: WCAG 2.2 AA en elementos web aplicables.

- contraste verificable;
- navegación por teclado;
- foco visible;
- etiquetas accesibles;
- no depender únicamente del color;
- soporte de zoom;
- estados y validaciones legibles por lector de pantalla.

---

# 4. ARQUITECTURA TÉCNICA OBJETIVO

## 4.1 Vista por capas

```text
┌───────────────────────────────────────────────────────────────┐
│ FRONTEND WEB                                                  │
│ React.js + TypeScript + Vite + Design System                 │
│ Catálogo · FUR · Mapas · Dashboards · Marketplace · LMS      │
└──────────────────────────────┬────────────────────────────────┘
                               │ HTTPS / REST / SSE / WebSocket
┌──────────────────────────────▼────────────────────────────────┐
│ API / BFF / APPLICATION LAYER                                │
│ NestJS                                                        │
│ Auth · Policies · DTO · Orquestación · Search · Reporting    │
└───────────────┬──────────────────┬───────────────────┬────────┘
                │                  │                   │
        Odoo service/ORM      FUR repositories      OT adapters
                │                  │                   │
┌───────────────▼──────────────────▼──────────────┐  ┌▼──────────────┐
│ ODOO 19 + POSTGRESQL                           │  │ OT / IT        │
│ ERP nativo + módulos FUR propios               │  │ SCADA          │
│ res.* product.* stock.* purchase.* maintenance │  │ Historian      │
│ quality.* ir.attachment + fur_*                │  │ OPC UA/MQTT    │
└─────────────────────────────────────────────────┘  │ GPON/NMS       │
                                                     └───────────────┘
```

## 4.2 Regla fundamental de persistencia

```text
¿Odoo ya representa correctamente la entidad/transacción?
        ├── Sí → reutilizar/extender modelo nativo mediante ORM
        └── No → modelo propio FUR especializado
```

Reglas:

- no escribir SQL directo sobre tablas nativas Odoo;
- no duplicar proveedores, productos, unidades, stock o compras si Odoo ya es autoridad;
- no guardar series temporales OT en `product.template` ni en campos maestros FUR;
- usar referencias a Historian/SCADA para series de alta frecuencia;
- conservar claves externas auditables;
- toda API debe operar por contratos de dominio, no por nombres de tabla expuestos al navegador.

---

# 5. STACK TECNOLÓGICO PROPUESTO

## 5.1 Frontend

- React.js.
- TypeScript en modo estricto.
- Vite para build y desarrollo.
- React Router para enrutamiento.
- TanStack Query para server state, cache e invalidación.
- React Hook Form + Zod para formularios y validación de contratos.
- Zustand o Context para estado local/global de UI; evitar duplicar server state.
- React Flow para grafos de relaciones, topologías y mapas lógicos.
- ECharts o Recharts para KPI, series resumidas y dashboards.
- i18next para internacionalización si se activa ES/EN.
- Testing Library para pruebas de componentes.
- Playwright para E2E.
- ESLint + Prettier + TypeScript checks.

**Decisiones a cerrar mediante ADR:** librería visual base, librería GIS, estrategia de tablas de alta densidad y librería de gráficos definitiva.

## 5.2 Backend/API

- NestJS.
- OpenAPI/Swagger como contrato vivo.
- REST versionado `/api/v1/...`.
- SSE/WebSocket para eventos y actualizaciones en tiempo real cuando aplique.
- jobs/colas internas para sincronizaciones y procesos pesados.
- adaptadores específicos para Odoo, Historian, SCADA, LIMS, GPON/NMS y documentos.

## 5.3 Datos

- PostgreSQL.
- ORM de Odoo para lógica ERP/FUR implementada dentro de Odoo.
- repositorios en NestJS únicamente para esquemas/servicios autorizados.
- índices B-tree, GIN/GiST cuando corresponda.
- búsqueda inicial con PostgreSQL full-text + trigram; motor externo solo si el volumen/latencia lo justifica.

## 5.4 Observabilidad

- logging estructurado con correlation ID;
- métricas de API;
- trazas distribuidas cuando aplique;
- auditoría funcional FUR separada del log técnico;
- health checks;
- monitoreo de errores frontend y backend;
- tableros de disponibilidad, latencia y errores.

---

# 6. ARQUITECTURA DEL FRONTEND REACT

## 6.1 Estructura lógica recomendada

```text
src/
├── app/
│   ├── providers/
│   ├── router/
│   ├── auth/
│   └── config/
├── design-system/
│   ├── tokens/
│   ├── primitives/
│   ├── components/
│   └── patterns/
├── shared/
│   ├── api/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── permissions/
├── entities/
│   ├── fur/
│   ├── asset/
│   ├── process/
│   ├── document/
│   ├── partner/
│   └── user/
├── features/
│   ├── global-search/
│   ├── filters/
│   ├── relations/
│   ├── documents/
│   ├── data-quality/
│   ├── audit/
│   └── quick-actions/
├── domains/
│   ├── proc/
│   ├── pte/
│   ├── iot/
│   ├── gpon/
│   ├── quality/
│   ├── laboratory/
│   ├── maintenance/
│   ├── requisition/
│   ├── offer/
│   └── camera/
└── pages/
    ├── public/
    ├── catalog/
    ├── fur/
    ├── dashboards/
    ├── maps/
    └── admin/
```

## 6.2 Componentes maestros

```text
AppShell
├── GlobalHeader
├── GlobalSearch
├── MainNavigation
├── ContextSelector
├── NotificationCenter
├── UserMenu
├── Breadcrumbs
├── FilterPanel
├── KPIGrid
├── DataTable
├── EntityCard
├── StatusBadge
├── DataMaturityBadge
├── FURHeader
├── FURTabs
├── TechnicalImage
├── RelationGraph
├── AssetMap
├── ProcessMap
├── NetworkMap
├── DashboardWidget
├── DocumentViewer
├── AuditTimeline
├── HoldTbcPanel
└── QuickActions
```

## 6.3 Motor de ficha FUR parametrizable

Se recomienda no construir diez páginas completamente independientes. Debe existir un **FUR Page Engine**:

```text
FURPageEngine
├── schema común
├── configuración por dominio
├── configuración por familia
├── configuración por subtipo
├── permisos por bloque
├── layout por breakpoint
├── validadores
├── relaciones permitidas
└── acciones contextuales
```

Cada dominio registra:

- tabs disponibles;
- campos;
- unidad;
- condición/madurez;
- reglas de validación;
- origen de datos;
- componentes especializados;
- acciones permitidas;
- documentos requeridos;
- KPI aplicables.

## 6.4 Contrato de UI de una FUR

Toda ficha debe poder representar:

- identidad;
- jerarquía;
- ubicación;
- clasificación;
- estado;
- criticidad;
- propietarios/responsables;
- imagen/fotografía/esquema;
- datos técnicos;
- relaciones;
- documentos;
- historial/auditoría;
- calidad del dato;
- TBC/HOLD;
- acciones.

---

# 7. MAPA DEL SITIO Y RUTAS FRONTEND

## 7.1 Área pública

```text
/
/catalogo
/marketplace
/profesionales
/proveedores
/cursos
/planta-tiempo-real/publico
/conocimiento
/nosotros
/ayuda
/login
/registro
```

## 7.2 Área autenticada

```text
/app
/app/inicio
/app/perfil
/app/organizacion
/app/catalogo
/app/fur
/app/fur/:furCode
/app/activos
/app/procesos
/app/redes
/app/redes/:domain
/app/mantenimiento
/app/inventario
/app/laboratorio
/app/calidad
/app/requisiciones
/app/ofertas
/app/presupuestos
/app/documentos
/app/dashboard
/app/mapas
/app/reportes
/app/admin
```

## 7.3 Rutas de ficha por dominio

```text
/app/fur/proc/:furCode
/app/fur/pte/:furCode
/app/fur/iot/:furCode
/app/fur/gpon/:furCode
/app/fur/cc/:furCode
/app/fur/lab/:furCode
/app/fur/mnt/:furCode
/app/fur/rq/:furCode
/app/fur/of/:furCode
/app/fur/cam/:furCode
```

Internamente todas pueden resolver a un mismo `FURPageEngine`, configurado por dominio.

---

# 8. MODELO DE DATOS — REGLAS Y NOMENCLATURA

## 8.1 Convenciones

### Odoo ORM

- nombres de modelo con punto: `fur.record`, `fur.iot.variable`;
- nombres físicos PostgreSQL orientativos con guion bajo: `fur_record`, `fur_iot_variable`;
- los nombres reales se verifican contra `ir.model` e `ir.model.fields` de la instancia objetivo.

### FUR

Convención funcional recomendada:

```text
FUR-{DOMINIO}-{AREA/ETAPA}-{TIPO}-{SECUENCIA}
```

Ejemplos:

- `FUR-PROC-A03-MOL-001`;
- `FUR-PTE-A10-TR-001`;
- `FUR-IOT-A03-PT-001`;
- `FUR-GPON-A11-OLT-001`;
- `FUR-CC-A03-MP-001`;
- `FUR-LAB-A12-AU-001`;
- `FUR-MNT-A03-MB01-001`.

La nomenclatura definitiva queda HOLD hasta reconciliar TAG Register, Equipment Register, Instrument Index, PFD/P&ID, unifilares, WMS/CMMS y política corporativa.

## 8.2 Modelos/tablas nativas Odoo 19 a reutilizar

| Dominio | Modelo ORM | Tabla orientativa | Uso |
|---|---|---|---|
| Empresa | `res.company` | `res_company` | compañía |
| Usuario | `res.users` | `res_users` | acceso/responsabilidad |
| Partner | `res.partner` | `res_partner` | proveedor/OEM/persona |
| Producto | `product.template` | `product_template` | catálogo maestro |
| Variante | `product.product` | `product_product` | variante/instancia cuando aplique |
| Categoría | `product.category` | `product_category` | clasificación |
| Unidad | `uom.uom` | `uom_uom` | unidades |
| Almacén | `stock.warehouse` | `stock_warehouse` | WMS |
| Ubicación | `stock.location` | `stock_location` | ubicación física/lógica |
| Existencia | `stock.quant` | `stock_quant` | stock actual |
| Movimiento | `stock.move` | `stock_move` | movimiento |
| Detalle movimiento | `stock.move.line` | `stock_move_line` | trazabilidad |
| Lote/serial | `stock.lot` | `stock_lot` | serie/lote |
| Compra | `purchase.order` | `purchase_order` | RFQ/PO |
| Línea compra | `purchase.order.line` | `purchase_order_line` | detalle compra |
| Equipo mantenible | `maintenance.equipment` | `maintenance_equipment` | activo mantenible |
| Solicitud/OT | `maintenance.request` | `maintenance_request` | mantenimiento |
| Punto de calidad | `quality.point` | `quality_point` | QA/QC operativo |
| Control calidad | `quality.check` | `quality_check` | resultado/check |
| Alerta calidad | `quality.alert` | `quality_alert` | no conformidad |
| Documento | `ir.attachment` | `ir_attachment` | binarios |
| Mensaje | `mail.message` | `mail_message` | historial/chatter |
| Actividad | `mail.activity` | `mail_activity` | tareas/aprobaciones |
| Proyecto | `project.project` | `project_project` | proyectos |
| Tarea | `project.task` | `project_task` | ejecución |
| Analítica | `account.analytic.account` | `account_analytic_account` | costos/centros |

## 8.3 Núcleo FUR común

Modelo lógico propuesto:

```text
fur_record
fur_status_history
fur_relation
fur_document_link
fur_data_quality
fur_audit_event
fur_lifecycle_event
fur_external_link
fur_external_key
fur_search_alias
fur_geo_location
fur_tag
fur_responsibility
fur_approval
fur_kpi
fur_kpi_value
fur_hold_point
```

## 8.4 Especialización por red

### FUR-PROC

```text
fur_proc_nameplate
fur_proc_operating
fur_proc_efficiency
fur_proc_media
fur_proc_liner
fur_proc_inspection
fur_process_stream
fur_process_parameter
```

### FUR-PTE

```text
fur_power_nameplate
fur_power_rating
fur_power_winding
fur_power_impedance
fur_power_insulation
fur_power_cooling
fur_power_tap
fur_power_protection
fur_power_feeder
fur_power_test
fur_power_oil_test
fur_power_condition
fur_power_measurement
fur_power_grounding
```

### FUR-IOT

```text
fur_iot_nameplate
fur_iot_variable
fur_iot_range
fur_iot_tag
fur_iot_calibration
fur_iot_connectivity
fur_iot_alarm
fur_iot_scada_mapping
fur_iot_historian_ref
fur_iot_cyber_profile
fur_iot_asset_rel
```

### FUR-GPON

```text
fur_gpon_nameplate
fur_gpon_port
fur_gpon_splitter
fur_gpon_optical_budget
fur_gpon_onu_link
fur_gpon_otdr_test
fur_gpon_fiber_segment
fur_gpon_splice
fur_gpon_service
fur_gpon_nms_alarm
```

### FUR-CC

```text
fur_quality_sample
fur_quality_sample_point
fur_quality_collection
fur_quality_custody
fur_quality_preparation
fur_quality_request
fur_quality_qaqc_control
```

### FUR-LAB

```text
fur_lab_analysis
fur_lab_request
fur_lab_method
fur_lab_run
fur_lab_result
fur_lab_qaqc
fur_lab_validation
fur_lab_certificate
fur_lab_equipment_link
```

### FUR-MNT

```text
fur_maintenance_asset
fur_maintenance_strategy
fur_maintenance_plan
fur_maintenance_failure
fur_maintenance_condition
fur_maintenance_bom
fur_maintenance_inspection
fur_maintenance_reliability
```

### FUR-RQ

```text
fur_request_header
fur_request_line
fur_request_spec
fur_request_approval
fur_request_budget
fur_request_asset_link
fur_request_supplier_suggestion
fur_request_document_requirement
fur_request_status_history
fur_request_conversion
```

### FUR-OF

```text
fur_offer_header
fur_offer_line
fur_offer_term
fur_offer_supplier_link
fur_offer_comparison
fur_offer_attachment
fur_offer_status_history
fur_offer_award_link
```

### FUR-CAM

```text
fur_camera_nameplate
fur_camera_stream_ref
fur_camera_zone
fur_camera_event_ref
fur_camera_retention_policy
fur_camera_network_link
fur_camera_health
```

---

# 9. MÓDULOS ODOO 19

## 9.1 Módulos nativos mínimos

| Grupo | Módulos |
|---|---|
| Núcleo | `base`, `contacts`, `product`, `uom`, `mail` |
| Inventario | `stock`, `purchase_stock`, Barcode si se instala/licencia |
| Compras | `purchase`, `account`, analítica según alcance |
| Mantenimiento | `maintenance`, `repair` cuando aplique |
| Calidad | `quality` y funciones disponibles en la edición instalada |
| Documentos | `documents` si está disponible/licenciado + `mail`/`ir.attachment` |
| Proyectos | `project` |
| Personas | `hr` si se requiere |
| Formación | eLearning/LMS si forma parte de la instancia |
| Analítica | dashboards/spreadsheet según edición y licenciamiento |

## 9.2 Módulos propios FUR

```text
fur_core
fur_product_bridge
fur_catalogs
fur_documents
fur_audit
fur_security
fur_kpi
fur_dashboard
fur_process
fur_power
fur_iot
fur_gpon
fur_quality
fur_laboratory
fur_maintenance
fur_requisition
fur_commercial_offer
fur_camera
```

## 9.3 Regla de implementación Odoo

- extender con `_inherit` cuando la entidad ya sea la misma;
- usar `_inherits`/delegación solo cuando exista razón semántica clara;
- evitar mezclar semántica técnica especializada dentro de modelos nativos si complica upgrades;
- auditar cambios de modelos propios;
- verificar migración y compatibilidad con la edición real de Odoo 19.

---

# 10. MOTOR PRESUPUESTARIO TIPO LULOWIN

## 10.1 Alcance lógico

```text
PROYECTO → PRESUPUESTO → CAPÍTULO → PARTIDA → APU → RECURSOS
                                                ├── Materiales
                                                ├── Mano de obra
                                                ├── Equipos
                                                └── Otros
```

## 10.2 Entidades lógicas propuestas

```text
lw_project
lw_budget
lw_budget_chapter
lw_budget_item
lw_apu
lw_apu_resource
lw_material
lw_labor
lw_equipment
lw_other_resource
lw_yield
lw_price
lw_currency
lw_tax
lw_valuation
lw_valuation_item
lw_reconsideration
lw_formula
lw_measurement
eco_fur_budget_link
eco_fur_lulowin_map
```

**Regla:** los nombres `lw_*` son convenciones lógicas de la tesis/arquitectura. No deben presentarse como tablas físicas reales de LuloWin hasta inspeccionar y documentar la instalación/licencia real.

## 10.3 Integración frontend

Módulos UI:

- dashboard de presupuesto;
- árbol proyecto/capítulo/partida;
- editor APU;
- recursos;
- rendimientos;
- precios;
- valuaciones;
- comparación presupuesto vs real;
- vínculo con FUR/activo/proyecto;
- requisiciones y compras derivadas.

---

# 11. CONTRATO API Y BFF

## 11.1 Principios

- API versionada.
- DTO explícitos.
- OpenAPI generado automáticamente.
- idempotencia en operaciones sensibles.
- paginación consistente.
- filtros normalizados.
- errores con códigos funcionales.
- correlation ID.
- autorización en backend, nunca solo en frontend.

## 11.2 Endpoints núcleo sugeridos

```text
GET    /api/v1/fur
POST   /api/v1/fur
GET    /api/v1/fur/:furCode
PATCH  /api/v1/fur/:furCode
GET    /api/v1/fur/:furCode/relations
POST   /api/v1/fur/:furCode/relations
GET    /api/v1/fur/:furCode/documents
GET    /api/v1/fur/:furCode/audit
GET    /api/v1/fur/:furCode/data-quality
GET    /api/v1/fur/:furCode/holds

GET    /api/v1/catalog
GET    /api/v1/search
GET    /api/v1/assets
GET    /api/v1/processes
GET    /api/v1/networks
GET    /api/v1/maintenance
GET    /api/v1/inventory
GET    /api/v1/laboratory
GET    /api/v1/dashboards
GET    /api/v1/maps
```

## 11.3 API por dominio

Cada dominio tendrá endpoints especializados, pero debe conservar la identidad común FUR. Ejemplo:

```text
/api/v1/iot/instruments
/api/v1/iot/instruments/:furCode/calibrations
/api/v1/iot/instruments/:furCode/connectivity
/api/v1/iot/instruments/:furCode/scada-mapping
```

## 11.4 Tiempo real

- SSE para indicadores y eventos simples;
- WebSocket para dashboards interactivos cuando realmente se requiera;
- no usar WebSocket como sustituto de API CRUD;
- no enviar series de alta frecuencia completas al navegador; aplicar agregación y ventanas.

---

# 12. SEGURIDAD Y CONTROL DE ACCESO

## 12.1 Modelo

```text
USUARIO → PERFIL → ROL → PERMISO → DOMINIO → ACCIÓN → REGISTRO
```

## 12.2 Roles funcionales de referencia

- Administrador FUR.
- Gerencia General / Dirección.
- Gerente de Planta.
- Metalurgista / Procesos.
- Jefe de Mantenimiento.
- Almacén / Logística.
- Compras / Proveedores.
- Presupuesto / Costos.
- Laboratorio / Calidad.
- Operador de Planta.
- Técnico / Instrumentista.
- Telecom / GPON.
- Potencia eléctrica.
- HSE / SSOMA.
- Instructor / Docente.
- Estudiante.
- Proveedor / Vendedor.
- Visitante.

## 12.3 Controles

- mínimo privilegio;
- segregación de funciones;
- permisos por acción y registro;
- información pública separada de privada;
- sesiones seguras;
- cookies HttpOnly/Secure cuando aplique;
- CSRF/CORS controlados;
- rate limiting;
- sanitización de archivos;
- revisión de dependencias;
- secretos fuera del repositorio;
- no exponer credenciales, IP, NodeId, rutas OT sensibles o configuraciones de seguridad sin autorización;
- auditoría de operaciones críticas.

---

# 13. CALIDAD, CONDICIÓN Y MADUREZ DEL DATO

## 13.1 Condición

```text
CONFIRMADO
REFERENCIAL
TBC
HOLD
OBSOLETO
```

## 13.2 Madurez D0–D5

| Nivel | Significado |
|---|---|
| D0 | hipótesis / sin datos |
| D1 | referencial / estimado |
| D2 | preliminar / levantamiento |
| D3 | validado / en revisión |
| D4 | operacional / con evidencia |
| D5 | histórico completo y trazable |

## 13.3 Reglas UI

- condición y madurez visibles en campos críticos;
- TBC/HOLD no pueden ocultarse por estilo;
- no promover D1 a D4 sin evidencia;
- los valores de catálogo/prototipo no deben mostrarse como valores reales de operación;
- las imágenes conceptuales no sustituyen evidencia de campo.

---

# 14. ETAPA 0 — GOBIERNO, ALCANCE Y PREPARACIÓN

**Objetivo:** congelar las reglas de proyecto antes de desarrollar pantallas o modelos.

## Fase 0.1 — Gobierno del producto

Actividades:

- designar Product Owner;
- definir comité técnico;
- identificar owners de PROC/PTE/IOT/GPON/CC/LAB/MNT/WMS/Compras/Presupuesto;
- definir RACI;
- acordar Definition of Ready y Definition of Done;
- definir proceso de ADR;
- definir control de cambios.

Entregables:

- charter del producto;
- RACI;
- backlog macro;
- matriz de dependencias;
- catálogo inicial de HOLD/TBC.

Criterio de salida:

- responsables aprobados;
- alcance MVP aprobado;
- fuentes de autoridad documentadas.

## Fase 0.2 — Inventario de fuentes

Levantar:

- Odoo 19 instalado y módulos reales;
- `ir.model` / `ir.model.fields`;
- Equipment Register;
- TAG Register;
- Instrument Index;
- I/O List;
- PFD/P&ID;
- unifilares;
- WMS/CMMS;
- catálogo de proveedores;
- documentos técnicos;
- SCADA/Historian;
- GPON/NMS;
- LIMS/QA-QC;
- LuloWin o documentación de presupuesto.

Criterio de salida:

- fuente autoritativa asignada por dominio.

---

# 15. ETAPA 1 — INVESTIGACIÓN UX, ARQUITECTURA DE INFORMACIÓN Y PROTOTIPADO

**Objetivo:** convertir las imágenes del proyecto en un sistema de interacción coherente y validable.

## Fase 1.1 — Personas y journeys

Documentar journeys mínimos:

- operador busca un activo;
- mantenedor recibe alarma y abre OT;
- instrumentista consulta FUR-IOT y calibración;
- almacén reserva un repuesto;
- comprador procesa una requisición;
- laboratorio recibe muestra y emite resultado;
- gerente consulta dashboard;
- proveedor consulta RFQ/oferta autorizada;
- auditor revisa historial de cambios.

## Fase 1.2 — Information Architecture

Construir:

- sitemap público;
- sitemap privado;
- taxonomía de entidades;
- estructura de navegación;
- búsqueda global;
- rutas profundas a FUR;
- breadcrumbs;
- relación Home → Catálogo → Entidad → FUR → Relacionados.

## Fase 1.3 — Wireframes

Prototipos a validar:

1. Home.
2. Catálogo global.
3. FUR genérica.
4. FUR-PROC.
5. FUR-PTE.
6. FUR-IOT.
7. FUR-GPON.
8. Dashboard.
9. Mapa.
10. WMS.
11. Mantenimiento.
12. Requisiciones/ofertas.
13. Presupuesto.

## Fase 1.4 — Pruebas UX tempranas

- 5–8 usuarios representativos por ronda cuando sea posible;
- escenarios reales;
- medir tiempo para encontrar FUR, documento, OT, stock y KPI;
- eliminar duplicidad de navegación;
- revisar densidad y legibilidad.

Criterio de salida:

- prototipo aprobado por producto + especialistas.

---

# 16. ETAPA 2 — DESIGN SYSTEM Y COMPONENTES BASE

**Objetivo:** asegurar coherencia visual, accesibilidad y velocidad de desarrollo.

## Fase 2.1 — Tokens

Definir:

- colores;
- tipografía;
- espaciados;
- sombras;
- radios;
- breakpoints;
- z-index;
- tamaños de iconos;
- semántica de estados;
- colores por red transversal.

## Fase 2.2 — Primitivas

- Button;
- Input;
- Select;
- Checkbox;
- Radio;
- Tabs;
- Badge;
- Tooltip;
- Dialog;
- Drawer;
- Table;
- Pagination;
- Card;
- Accordion;
- Toast;
- Skeleton;
- EmptyState;
- ErrorState.

## Fase 2.3 — Patrones FUR

- FURHeader;
- TechnicalHero;
- MetadataGrid;
- TechnicalDataTable;
- RelationCard;
- RelationGraph;
- DocumentList;
- DataQualityRing;
- HoldTbcPanel;
- AuditTimeline;
- QuickActionGrid;
- KPIGrid.

Criterio de salida:

- Storybook o catálogo equivalente de componentes;
- accesibilidad básica validada;
- componentes principales aprobados.

---

# 17. ETAPA 3 — FUNDACIÓN DE REPOSITORIO, CI/CD Y ENTORNOS

**Objetivo:** crear una plataforma de ingeniería reproducible.

## Fase 3.1 — Repositorios

Opción recomendada: monorepo o repos coordinados.

```text
/apps/web
/apps/api
/packages/design-system
/packages/contracts
/packages/fur-schema
/packages/eslint-config
/packages/tsconfig
/odoo-addons/fur_*
/infra
/docs/adr
/docs/openapi
```

## Fase 3.2 — Entornos

```text
local → dev → qa → staging → production
```

Cada entorno debe tener:

- variables separadas;
- base de datos separada;
- credenciales separadas;
- datos sintéticos en no-producción;
- observabilidad;
- backups según política.

## Fase 3.3 — CI

Por pull request:

- lint;
- typecheck;
- unit tests;
- component tests;
- build;
- SAST/dependency scan;
- OpenAPI contract check;
- migraciones verificadas.

## Fase 3.4 — CD

- despliegue automático a dev;
- promoción controlada a QA/staging;
- producción con aprobación;
- rollback probado.

Criterio de salida:

- pipeline reproducible y documentado.

---

# 18. ETAPA 4 — BASE ODOO 19 Y NÚCLEO FUR

**Objetivo:** implementar identidad, relaciones y gobierno antes de especialidades.

## Fase 4.1 — Verificación de instancia

- edición y versión exacta;
- módulos instalados;
- licencias;
- modelos disponibles;
- campos custom existentes;
- seguridad y grupos actuales;
- volumen de datos.

## Fase 4.2 — `fur_core`

Implementar conceptualmente:

- registro FUR;
- código único;
- UUID interno;
- dominio;
- estado;
- madurez;
- condición;
- relaciones;
- documentos;
- auditoría;
- external keys;
- alias;
- ubicación;
- responsables;
- HOLD/TBC.

## Fase 4.3 — `fur_product_bridge`

Definir estrategia exacta entre:

- `product.template`;
- `product.product`;
- `maintenance.equipment`;
- `fur.record`.

La decisión debe quedar registrada en un ADR y probarse con upgrades.

Criterio de salida:

- crear, consultar, relacionar y auditar una FUR sin dominio especializado.

---

# 19. ETAPA 5 — API CORE Y SEGURIDAD

**Objetivo:** entregar un contrato backend estable para el frontend.

## Fase 5.1 — Auth y sesión

- login;
- logout;
- refresh/session;
- permisos;
- perfil;
- organización;
- roles.

## Fase 5.2 — API FUR

- CRUD controlado;
- relaciones;
- documentos;
- historial;
- calidad;
- búsqueda;
- catálogos.

## Fase 5.3 — Autorización

- policy por endpoint;
- filtros de registro;
- dominios permitidos;
- acciones permitidas;
- permisos de campo cuando sea necesario.

## Fase 5.4 — Auditoría

Eventos mínimos:

```text
FUR_CREATED
FUR_UPDATED
STATUS_CHANGED
RELATION_CREATED
RELATION_ENDED
DOCUMENT_LINKED
DOCUMENT_VERSIONED
DATA_QUALITY_CHANGED
HOLD_CREATED
HOLD_CLOSED
```

Criterio de salida:

- frontend puede navegar FUR genéricas sin acceso directo a Odoo/PostgreSQL.

---

# 20. ETAPA 6 — FRONTEND SHELL, HOME Y CATÁLOGO

**Objetivo:** entregar la experiencia transversal del ecosistema.

## Fase 6.1 — App Shell

- header;
- navegación principal;
- búsqueda global;
- selector de contexto;
- notificaciones;
- usuario/rol;
- breadcrumbs;
- responsive.

## Fase 6.2 — Home

Implementar:

- hero industrial;
- categorías;
- accesos rápidos;
- estado de planta;
- servicios;
- ofertas;
- dashboards;
- mapa;
- actividad;
- accesos operativos.

## Fase 6.3 — Catálogo

- facetas;
- filtros por dominio;
- filtros por estado/criticidad/madurez;
- tarjetas;
- lista;
- mapa;
- paginación;
- favoritos;
- deep links.

## Fase 6.4 — Búsqueda global

Indexar como mínimo:

- código FUR;
- TAG;
- nombre;
- alias;
- fabricante/modelo;
- ubicación;
- proceso;
- documento;
- proveedor;
- palabras clave autorizadas.

Criterio de salida:

- usuario puede encontrar una entidad en ≤3 pasos desde Home en escenarios críticos.

---

# 21. ETAPA 7 — MOTOR DE FICHAS FUR

**Objetivo:** construir una sola base de ficha reutilizable.

## Fase 7.1 — Bloques comunes

Desarrollar:

- identidad;
- jerarquía;
- clasificación;
- responsabilidad;
- ciclo de vida;
- documentos;
- relaciones;
- auditoría;
- calidad del dato;
- HOLD/TBC;
- quick actions.

## Fase 7.2 — Configuración por dominio

Contrato de configuración:

```text
DomainFurConfig
├── domain
├── title
├── icon
├── colorToken
├── tabs
├── fieldGroups
├── validations
├── relations
├── documentRequirements
├── actions
└── kpiDefinitions
```

## Fase 7.3 — Editor / modo lectura

Separar:

- modo consulta;
- modo edición;
- modo aprobación;
- historial;
- comparación de versiones.

Criterio de salida:

- una nueva familia de activo puede configurarse sin crear una página React desde cero.

---

# 22. ETAPA 8 — IMPLEMENTACIÓN DE REDES TÉCNICAS

Se recomienda trabajar por oleadas para reducir acoplamiento.

## Oleada A — FUR-PROC + FUR-IOT

Razón: son la columna vertebral de proceso y variables.

### FUR-PROC

Tabs sugeridos:

`Resumen | General | Flujo | Entradas/Salidas | Variables | Activos | Potencia | IoT | Calidad | Laboratorio | Documentos | KPI | Historial`

### FUR-IOT

Tabs sugeridos:

`Resumen | Variable | Metrología | Señal | Comunicación | PLC/SCADA | Historian | Alarmas | Calibración | Activo/Proceso | Documentos | Historial`

Validar el patrón contra el catálogo FUR-IOT de 18 etapas × 10 ejemplos por etapa, manteniendo la distinción entre ejemplos referenciales y datos operacionales.

## Oleada B — FUR-PTE + FUR-GPON

### FUR-PTE

`Resumen | Placa | Eléctrico | Protecciones | Alimentadores | Medición | IoT | Mantenimiento | Repuestos | Documentos | Unifilar | Historial`

### FUR-GPON

`Resumen | Equipo | Puertos | ODN | Fibra | Potencia Óptica | Topología | Servicios | Energía | Inventario | Documentos | Alarmas | Historial`

## Oleada C — FUR-CC + FUR-LAB

Regla fundamental:

- `FUR-CC` = muestra física y cadena de custodia;
- `FUR-LAB` = análisis/estudio/resultado sobre una muestra.

No mezclar muestra con resultado.

## Oleada D — FUR-MNT

Integrar:

- activo;
- estrategia;
- planes;
- OT;
- condición;
- fallas;
- BOM;
- inventario;
- personal;
- documentos;
- KPI.

## Oleada E — FUR-RQ + FUR-OF + FUR-CAM

Cerrar procesos comerciales y seguridad/cámaras.

Criterio de salida de cada oleada:

- modelo de datos aprobado;
- API OpenAPI;
- UI lectura/edición;
- relaciones;
- documentos;
- auditoría;
- calidad del dato;
- pruebas E2E.

---

# 23. ETAPA 9 — WMS, MANTENIMIENTO, REQUISICIONES Y COMPRAS

## 23.1 WMS

Reutilizar Odoo:

- almacén;
- ubicación;
- lote/serial;
- quant;
- movimientos;
- picking;
- recepción;
- transferencia.

Frontend:

- dashboard de inventario;
- stock por almacén;
- stock por ubicación;
- movimientos;
- recepción;
- reserva;
- trazabilidad;
- condiciones de almacenamiento;
- repuestos asociados a FUR.

## 23.2 Mantenimiento

Flujo:

```text
ALARMA/HALLAZGO → FUR → DIAGNÓSTICO → OT → BOM → STOCK
→ RESERVA → RQ SI APLICA → COMPRA → RECEPCIÓN
→ EJECUCIÓN → CIERRE → HISTORIAL → KPI
```

## 23.3 Compras

Flujo:

```text
NECESIDAD → FUR-RQ → APROBACIÓN → RFQ → FUR-OF
→ COMPARACIÓN → ADJUDICACIÓN → PURCHASE.ORDER ODOO
→ RECEPCIÓN → WMS → ACTIVO/OT/PROYECTO
```

---

# 24. ETAPA 10 — CALIDAD, LABORATORIO Y CORRELACIÓN IoT

## 24.1 Flujo maestro

```text
PROCESS / ASSET
      ↓
FUR-IOT — medición online + timestamp + calidad
      ↓ correlación por punto / variable / unidad / ventana temporal
FUR-CC — muestra física + punto + toma + custodia
      ↓ 1:N según solicitud
FUR-LAB — método + equipo + QA/QC + resultado validado
      ↓
RECONCILIACIÓN / BIAS / TENDENCIA / KPI / ALERTA
```

## 24.2 Reglas

- resultado LAB no sobrescribe lectura IoT;
- muestra no se convierte en resultado;
- toda comparación conserva fuente, unidad, timestamp, calidad y método;
- desviaciones generan eventos trazables;
- cálculos de bias/diferencia requieren base técnica aprobada.

---

# 25. ETAPA 11 — INTEGRACIÓN OT/IT Y TIEMPO REAL

**Objetivo:** conectar contexto industrial sin convertir FUR en Historian.

## Fase 11.1 — Catálogo de endpoints OT

Por variable:

- activo/proceso origen;
- instrumento FUR;
- TAG PLC/SCADA;
- gateway;
- protocolo;
- historian reference;
- frecuencia/ventana;
- calidad;
- unidad;
- estado de conectividad.

## Fase 11.2 — Adaptadores

Conectores internos según autorización:

- OPC UA;
- MQTT;
- Modbus a través de gateway/controlador autorizado;
- SCADA API;
- Historian API;
- NMS GPON.

## Fase 11.3 — Frontend realtime

- estado Online/Offline;
- latest value;
- timestamp;
- calidad;
- min/max/avg por ventana;
- tendencia reducida;
- alarmas autorizadas;
- enlaces al sistema fuente.

Criterio de salida:

- latencia, carga y seguridad validadas;
- segregación OT/IT revisada.

---

# 26. ETAPA 12 — DASHBOARDS, KPI Y REPORTES

## 26.1 Niveles

- público;
- operativo;
- técnico por red;
- mantenimiento;
- calidad/laboratorio;
- inventario;
- compras;
- presupuesto;
- gerencia;
- auditoría.

## 26.2 Regla de KPI

Todo KPI debe registrar:

- código;
- nombre;
- definición;
- fórmula;
- unidad;
- fuente;
- frecuencia;
- owner;
- alcance;
- calidad;
- meta;
- versión.

No codificar fórmulas críticas solo en el frontend.

---

# 27. ETAPA 13 — MARKETPLACE, PROVEEDORES, PROFESIONALES, LMS Y CONOCIMIENTO

## 27.1 Marketplace

Separar claramente:

- catálogo técnico interno;
- productos/servicios comerciales;
- proveedores;
- ofertas;
- solicitudes/RFQ;
- compras ERP.

## 27.2 Proveedores

Perfil:

- identidad `res.partner`;
- categorías;
- productos/servicios;
- certificaciones;
- documentos;
- historial autorizado;
- ofertas;
- evaluación.

## 27.3 Servicios profesionales

- perfiles;
- especialidades;
- disponibilidad;
- calificaciones autorizadas;
- contratación;
- documentos.

## 27.4 LMS

- catálogo;
- rutas;
- cursos;
- instructores;
- progreso;
- certificaciones;
- vínculo curso ↔ activo/proceso/red.

## 27.5 Biblioteca técnica

- manuales;
- SOP;
- PFD/P&ID;
- unifilares;
- datasheets;
- certificados;
- informes;
- fotografías;
- videos;
- versiones.

---

# 28. ETAPA 14 — PRESUPUESTOS TIPO LULOWIN

## Fase 14.1 — Modelo lógico

Validar proyecto, presupuesto, capítulos, partidas, APU y recursos.

## Fase 14.2 — Cálculo

```text
CD_i = Σ(Materiales) + Σ(ManoObra) + Σ(Equipos) + Σ(Otros)
PU_i = CD_i × factores_aplicables
TOTAL_i = Cantidad_i × PU_i
PRESUPUESTO = Σ(TOTAL_i)
```

Los factores son parametrizables.

## Fase 14.3 — Integración FUR

```text
FUR PROYECTO → PRESUPUESTO → PARTIDA/APU → ACTIVO/OBRA
→ REQUISICIÓN → COMPRA → RECEPCIÓN → WMS → INSTALACIÓN
```

## Fase 14.4 — Validación LuloWin

HOLD hasta confirmar:

- licencia;
- versión;
- esquema físico;
- exportaciones;
- APIs si existen;
- reglas de cálculo;
- monedas/impuestos;
- seguridad.

---

# 29. ETAPA 15 — PRUEBAS

## 29.1 Pirámide de pruebas

- unitarias;
- validadores/schema;
- componentes;
- integración API;
- contratos;
- Odoo integration;
- E2E;
- seguridad;
- rendimiento;
- accesibilidad;
- resiliencia;
- FAT/SAT/UAT.

## 29.2 Casos mínimos E2E

1. Home → búsqueda → FUR.
2. Catálogo → filtro → FUR.
3. FUR → relación → otra FUR.
4. FUR → documento.
5. Activo → mantenimiento → OT.
6. OT → repuesto → stock.
7. RQ → oferta → compra.
8. Muestra → laboratorio → resultado.
9. IoT → SCADA/Historian reference.
10. Usuario sin permiso no ve datos restringidos.
11. Cambio crítico aparece en auditoría.
12. TBC/HOLD visible.
13. Dashboard respeta calidad y permisos.
14. Presupuesto calcula APU con casos controlados.
15. Mapa abre entidad correcta.

## 29.3 FAT

Validación funcional en entorno controlado.

## 29.4 SAT

Validación con datos/infraestructura de sitio autorizada.

## 29.5 UAT

Aceptación por usuarios de negocio y técnicos.

Criterio para producción:

- defectos críticos = 0;
- plan de rollback probado;
- backups validados;
- permisos revisados;
- observabilidad activa;
- documentación entregada.

---

# 30. ETAPA 16 — MIGRACIÓN Y CALIDAD DE DATOS

## Fase 16.1 — Perfilamiento

- duplicados;
- códigos faltantes;
- unidades inconsistentes;
- ubicaciones ambiguas;
- TAG duplicados;
- documentos sin revisión;
- activos sin owner;
- relaciones incompletas.

## Fase 16.2 — Mapeo

Por cada fuente:

```text
campo origen → transformación → campo destino → condición → evidencia
```

## Fase 16.3 — Carga

- dry run;
- validación;
- reconciliación;
- checksum/conteo;
- reporte de excepciones;
- aprobación.

## Fase 16.4 — Promoción de madurez

No convertir automáticamente datos migrados a D4. La madurez se asigna según evidencia.

---

# 31. ETAPA 17 — DESPLIEGUE Y OPERACIÓN

## 31.1 Topología

Separar:

- frontend;
- API;
- Odoo;
- PostgreSQL;
- reverse proxy;
- almacenamiento de documentos;
- observabilidad;
- gateways OT.

## 31.2 Estrategia de release

- feature flags;
- canary o piloto por grupo;
- rollback;
- migraciones reversibles cuando sea posible;
- mantenimiento programado.

## 31.3 Backups y continuidad

Definir:

- RPO;
- RTO;
- backup de base;
- backup documental;
- restore test;
- retención;
- DR.

---

# 32. ETAPA 18 — PILOTO Y ESCALAMIENTO

## Fase 18.1 — Piloto recomendado

Área sugerida: una zona bien documentada, por ejemplo Molienda/Clasificación, porque permite probar:

- proceso;
- activos;
- potencia;
- IoT;
- mantenimiento;
- WMS;
- documentos;
- dashboards;
- laboratorio/calidad si aplica.

## Fase 18.2 — Criterios del piloto

- búsqueda;
- FUR completas;
- relaciones;
- permisos;
- documentos;
- OT;
- stock;
- indicadores;
- auditoría;
- calidad del dato;
- aceptación de usuarios.

## Fase 18.3 — Escalamiento

Desplegar por área/etapa, no por cantidad arbitraria de pantallas.

---

# 33. ROADMAP PROPUESTO POR INCREMENTOS

> Las duraciones son **referenciales de planificación**. Deben estimarse con el equipo real después del discovery y del inventario de integraciones.

| Incremento | Alcance | Resultado |
|---|---|---|
| I0 | Gobierno + UX + arquitectura + CI/CD | base ejecutable y backlog validado |
| I1 | Auth + AppShell + Home + Catálogo + FUR Core | navegación end-to-end |
| I2 | FUR-PROC + FUR-IOT + documentos + relaciones | núcleo técnico inicial |
| I3 | FUR-PTE + FUR-GPON + mapa + tiempo real básico | infraestructura técnica conectada |
| I4 | FUR-MNT + WMS + OT + repuestos | ciclo mantenimiento-stock |
| I5 | FUR-CC + FUR-LAB + correlación IoT | trazabilidad de calidad |
| I6 | FUR-RQ + FUR-OF + compras | ciclo comercial/procurement |
| I7 | Presupuesto tipo LuloWin | costos/APU/presupuesto |
| I8 | Marketplace + proveedores + LMS + conocimiento | ecosistema ampliado |
| I9 | Dashboards ejecutivos + optimización + hardening | preparación producción |

Con trabajo paralelo de equipos especializados, una planificación inicial podría organizarse en **28–36 sprints de dos semanas**, a recalcular después de la Etapa 0.

---

# 34. BACKLOG MAESTRO POR ÉPICAS

## Épica A — Plataforma

- autenticación;
- shell;
- navegación;
- permisos;
- configuración;
- notificaciones.

## Épica B — FUR Core

- identidad;
- relaciones;
- estados;
- auditoría;
- calidad;
- HOLD/TBC;
- documentos;
- versionado.

## Épica C — Catálogo y búsqueda

- indexación;
- filtros;
- tarjetas;
- listas;
- favoritos;
- exportaciones autorizadas.

## Épica D — Redes técnicas

PROC, PTE, IOT, GPON, CC, LAB, MNT.

## Épica E — Enterprise

RQ, OF, WMS, compras, proveedores, presupuesto.

## Épica F — Conocimiento

Documentos, LMS, manuales, SOP, cursos.

## Épica G — Visualización

mapas, grafos, dashboards, KPI.

## Épica H — OT/IT

SCADA, Historian, gateways, NMS.

## Épica I — Seguridad y auditoría

RBAC, record rules, eventos, evidencias.

---

# 35. MATRIZ DE PRIORIDAD MVP

## MVP-A — Identidad y consulta

Debe incluir:

- login;
- Home básica;
- catálogo;
- búsqueda;
- FUR Core;
- FUR-PROC;
- FUR-IOT;
- documentos;
- relaciones;
- calidad del dato;
- auditoría.

## MVP-B — Operación de activos

Añadir:

- mantenimiento;
- WMS;
- PTE;
- GPON;
- mapas;
- dashboards operativos.

## MVP-C — Calidad y abastecimiento

Añadir:

- CC;
- LAB;
- RQ;
- OF;
- compras;
- proveedores.

## Release ampliada

- marketplace;
- profesionales;
- LMS;
- presupuestos;
- cámaras;
- BI avanzado.

---

# 36. EQUIPO DE DESARROLLO PROPUESTO

Equipo base de referencia:

- 1 Product Owner;
- 1 arquitecto de solución;
- 1 líder UX/UI;
- 2–4 frontend React/TypeScript;
- 2–3 backend NestJS;
- 1–2 desarrolladores Odoo/Python;
- 1 data engineer/DBA;
- 1 DevOps/SRE;
- 1–2 QA automation;
- especialistas parciales de procesos, eléctrica, instrumentación, telecom, mantenimiento, WMS, laboratorio/calidad y presupuesto.

Para un programa grande, separar squads por plataforma y dominios.

---

# 37. DEFINICIÓN DE DONE

Una historia no está terminada si solo “se ve bien”. Como mínimo:

- requisitos aceptados;
- diseño UX aprobado;
- código revisado;
- types sin errores;
- pruebas unitarias/integración pertinentes;
- permisos implementados;
- errores y loading states;
- accesibilidad básica;
- telemetría/logs;
- auditoría si aplica;
- OpenAPI actualizado;
- documentación técnica;
- TBC/HOLD visibles;
- datos de demo identificados como referenciales;
- criterios E2E satisfechos.

---

# 38. REQUISITOS NO FUNCIONALES

## 38.1 Rendimiento

Objetivos iniciales a validar:

- LCP páginas principales < 2.5–3.0 s en red corporativa razonable;
- interacción principal < 200 ms cuando no dependa de red;
- endpoints comunes p95 < 500 ms cuando sea técnicamente viable;
- paginación obligatoria para conjuntos grandes;
- virtualización para tablas extensas.

## 38.2 Disponibilidad

SLA/SLO queda TBC. Debe definirse según criticidad y uso operacional.

## 38.3 Escalabilidad

- stateless frontend/API cuando sea posible;
- cache controlada;
- jobs asíncronos;
- índices;
- partición/retención para eventos si el volumen lo requiere.

## 38.4 Mantenibilidad

- bajo acoplamiento por dominio;
- contracts compartidos;
- ADR;
- migraciones versionadas;
- componentes reutilizables;
- lint/format/test automatizados.

---

# 39. ESTRATEGIA DE DOCUMENTACIÓN

Mantener en repositorio:

```text
/docs/architecture
/docs/adr
/docs/api
/docs/data-model
/docs/ux
/docs/runbooks
/docs/security
/docs/testing
/docs/migration
/docs/operations
```

Documentos mínimos:

- C4/arquitectura;
- modelo ER;
- diccionario de datos;
- OpenAPI;
- catálogo de eventos;
- matriz de roles;
- sitemap;
- catálogo de componentes;
- catálogo FUR;
- plan de pruebas;
- runbook;
- rollback;
- backup/restore;
- manual de usuario.

---

# 40. GOBIERNO DE CAMBIOS

Toda decisión estructural debe usar ADR, por ejemplo:

- ADR-001 identidad `product.template` vs `maintenance.equipment` vs `fur.record`;
- ADR-002 auth/session;
- ADR-003 librería UI;
- ADR-004 GIS;
- ADR-005 búsqueda;
- ADR-006 realtime;
- ADR-007 estrategia Odoo API/ORM;
- ADR-008 documentos;
- ADR-009 series temporales;
- ADR-010 integración LuloWin.

---

# 41. RIESGOS PRINCIPALES

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Duplicar maestros Odoo | alto | “nativo primero” + revisión ER |
| Exceso de tablas FUR | alto | justificar semántica propia |
| Frontend excesivamente denso | alto | UX progressive disclosure |
| Pantallas distintas por activo | alto | FUR Page Engine parametrizable |
| Datos demo confundidos con reales | crítico | condición/madurez obligatorias |
| Exponer OT | crítico | segregación + allowlist + gateway |
| Modelo LuloWin inventado | alto | mantener nombres físicos HOLD |
| Permisos incompletos | crítico | RBAC + reglas de registro + pruebas |
| Documentos sin versión | alto | metadata y workflow obligatorio |
| Series temporales en ERP | alto | references a Historian |
| KPI inconsistentes | alto | catálogo de KPI gobernado |
| Upgrades Odoo complejos | alto | extensiones desacopladas y tests |

---

# 42. HOLD / TBC PARA CIERRE DE INGENIERÍA

1. Versión/edición exacta de Odoo 19.
2. Módulos instalados/licenciados.
3. Modelos/campos reales de la instancia.
4. Estrategia final `product.template` / `maintenance.equipment` / `fur.record`.
5. Jerarquía Planta → Área → Proceso → Sistema → Activo.
6. Nomenclatura FUR definitiva.
7. Equipment Register.
8. TAG Register.
9. Instrument Index.
10. I/O List.
11. PFD/P&ID.
12. Unifilares.
13. Arquitectura PLC/SCADA/Historian.
14. OPC UA namespaces/NodeIds autorizados.
15. MQTT topics autorizados si aplica.
16. GPON AS-BUILT y OTDR.
17. Plan maestro de muestreo.
18. Métodos LAB y QA/QC.
19. Equipos de laboratorio/calibración.
20. Taxonomía de fallas y criticidad.
21. BOM y repuestos críticos.
22. Política de documentos/versiones.
23. RACI definitivo.
24. Ciberseguridad OT/IT.
25. Retención/RPO/RTO.
26. KPI oficiales y fórmulas.
27. Datos reales para reemplazar prototipos.
28. APIs autorizadas.
29. Esquema/licencia LuloWin real.
30. FAT/SAT/UAT antes de producción.

---

# 43. CHECKLIST PREVIO AL INICIO DE CÓDIGO DE PRODUCCIÓN

- [ ] alcance MVP firmado;
- [ ] sitemap aprobado;
- [ ] prototipo UX validado;
- [ ] design tokens definidos;
- [ ] identidad FUR congelada a nivel lógico;
- [ ] estrategia Odoo aprobada;
- [ ] API conventions aprobadas;
- [ ] roles iniciales definidos;
- [ ] datos de prueba disponibles;
- [ ] CI/CD operativo;
- [ ] entornos listos;
- [ ] política de secretos;
- [ ] ADR iniciales;
- [ ] plan de pruebas;
- [ ] catálogo HOLD/TBC.

---

# 44. CHECKLIST PREVIO A PRODUCCIÓN

- [ ] reconciliación AS-FOUND/AS-BUILT aplicable;
- [ ] permisos revisados;
- [ ] datos sensibles clasificados;
- [ ] auditoría activa;
- [ ] backups y restore probados;
- [ ] observabilidad activa;
- [ ] dependencias actualizadas y revisadas;
- [ ] rendimiento validado;
- [ ] pruebas de seguridad;
- [ ] FAT completado;
- [ ] SAT completado;
- [ ] UAT aprobado;
- [ ] plan de rollback;
- [ ] manuales y runbooks;
- [ ] soporte y ownership operacional;
- [ ] inventario de TBC/HOLD residuales aprobado.

---

# 45. ANEXO A — PANTALLAS PRIORITARIAS

1. Home pública.
2. Home autenticada.
3. Catálogo global.
4. Filtros avanzados.
5. Resultado de búsqueda.
6. FUR genérica.
7. FUR-PROC.
8. FUR-PTE.
9. FUR-IOT.
10. FUR-GPON.
11. FUR-CC.
12. FUR-LAB.
13. FUR-MNT.
14. FUR-RQ.
15. FUR-OF.
16. FUR-CAM.
17. Activos físicos.
18. Mapa de planta.
19. Red transversal.
20. Dashboard de planta.
21. Dashboard técnico.
22. WMS.
23. Mantenimiento.
24. Documentos.
25. Presupuesto.
26. Marketplace.
27. Proveedor.
28. Servicio profesional.
29. Curso.
30. Administración.

---

# 46. ANEXO B — MATRIZ DE COMPONENTES REUTILIZABLES

| Componente | Reutilización |
|---|---|
| `FURHeader` | 10 redes |
| `MetadataGrid` | 10 redes |
| `HierarchyBreadcrumb` | 10 redes |
| `StatusBadge` | global |
| `DataMaturityBadge` | global |
| `TechnicalDataTable` | 10 redes |
| `RelationGraph` | global |
| `DocumentPanel` | global |
| `AuditTimeline` | global |
| `HoldTbcPanel` | global |
| `KPIGrid` | global |
| `EntityCard` | catálogo |
| `FacetFilter` | catálogo/redes |
| `GlobalSearch` | global |
| `MapPanel` | activos/procesos/redes |
| `QuickActionGrid` | fichas/dashboards |
| `RealtimeValue` | IOT/PTE/GPON/MNT |
| `CalibrationPanel` | IOT/LAB |
| `CustodyTimeline` | CC/LAB |
| `StockAvailability` | MNT/RQ/WMS |

---

# 47. ANEXO C — PATRÓN DE RELACIONES FUR

Tipos de relación controlados:

```text
PERTENECE_A
ALIMENTA
DESCARGA_A
MIDE
INSTRUMENTADO_POR
COMUNICA_CON
PROTEGE
MANTIENE
TIENE_REPUESTO
SOLICITA
OFERTA
ANALIZA
ASOCIADO_A
SOPORTA
MONITOREA
UBICADO_EN
DOCUMENTADO_POR
```

Toda relación debe conservar:

- FUR origen;
- FUR destino;
- tipo;
- vigencia;
- cardinalidad;
- fuente;
- condición/madurez;
- evidencia;
- auditoría.

---

# 48. ANEXO D — ESTRATEGIA DE DATOS PARA FUR-IOT

El catálogo FUR-IOT sirve como caso de diseño para el frontend parametrizado.

Cada registro debe poder mostrar:

- código FUR-IOT;
- alias/fuente;
- TAG;
- instrumento;
- variable;
- rango;
- unidad;
- señal;
- protocolo;
- alimentación;
- calibración;
- conectividad;
- PLC/SCADA mapping;
- Historian reference;
- alarmas;
- activo/proceso asociado;
- documentos;
- condición;
- madurez;
- HOLD/TBC.

Para el catálogo por 18 etapas:

```text
Etapa D01 ... D18
    ↓
10 FUR-IOT referenciales por etapa
    ↓
180 registros de diseño funcional
```

Estos registros no deben tratarse automáticamente como activos AS-BUILT.

---

# 49. ANEXO E — ENTREGABLES POR DISCIPLINA

## UX/UI

- research;
- sitemap;
- user flows;
- wireframes;
- prototipos;
- design system;
- especificaciones responsive;
- accesibilidad.

## Frontend

- app shell;
- design system implementado;
- FUR Page Engine;
- catálogo;
- mapas;
- dashboards;
- módulos de dominio;
- pruebas.

## Backend

- auth;
- API core;
- APIs de dominio;
- search;
- documents;
- events;
- reporting;
- OT adapters.

## Odoo

- módulos propios;
- seguridad;
- modelos;
- vistas administrativas;
- bridges;
- workflows;
- migraciones.

## Datos

- ERD;
- diccionario;
- reglas de integridad;
- migraciones;
- calidad;
- auditoría.

## DevOps

- entornos;
- CI/CD;
- observabilidad;
- backup;
- seguridad;
- runbooks.

---

# 50. CRITERIO FINAL DE ARQUITECTURA

La solución no debe convertirse en una colección de páginas separadas ni en una réplica visual de las infografías. Las imágenes son la referencia de **lenguaje UX/UI y organización de información**. La implementación debe consolidar un sistema reutilizable:

```text
UNA IDENTIDAD FUR
+ UNA ARQUITECTURA DE DATOS
+ UN MOTOR DE FICHAS PARAMETRIZABLE
+ UN CATÁLOGO GLOBAL
+ RELACIONES TRANSVERSALES
+ ODOO 19 COMO ERP NATIVO
+ POSTGRESQL COMO BASE RELACIONAL
+ NESTJS COMO CAPA DE APLICACIÓN
+ REACT.JS COMO EXPERIENCIA DIGITAL
+ OT/HISTORIAN COMO AUTORIDAD DE TIEMPO REAL
+ GOBIERNO, AUDITORÍA Y CALIDAD DEL DATO
```

El resultado esperado es un ecosistema que permita navegar desde un proceso o activo hasta su potencia, instrumentación, comunicaciones, calidad, laboratorio, mantenimiento, stock, documentos, proveedores, compras, presupuesto, formación y KPI sin perder identidad, fuente ni trazabilidad.

---

# 51. FUENTES INTERNAS DEL PROYECTO UTILIZADAS COMO BASE

- Tesis de grado — Documento Maestro del Ecosistema FUR — REV.01.
- Documento Maestro — Ecosistema FUR 10 Redes Transversales × Odoo 19 × PostgreSQL × React.js.
- Documento Maestro — Modelo de Datos FUR por Red Transversal con Odoo 19.
- Documento Maestro — Componentes React.js de las FUR por Red Transversal.
- Catálogo Maestro FUR-IOT — Activos IoT / Instrumentación por Etapa de Proceso — 18 × 10 = 180 ejemplos referenciales.
- Documentos maestros FUR-PROC, FUR-PTE, FUR-IOT y FUR-GPON.
- Material visual adjunto: Home, catálogo, fichas FUR, arquitectura FUR y mapa de sitio.

---

# 52. CONTROL DE REVISIÓN — BASE REV.00

| Rev. | Fecha | Descripción |
|---|---|---|
| REV.00 | 2026-09-24 | Emisión inicial del plan técnico detallado para desarrollo frontend React + arquitectura Odoo 19/PostgreSQL/FUR, incorporando UX/UI, fases, datos, módulos, API, seguridad, OT/IT, pruebas y despliegue. |

---

**FIN — PLAN TÉCNICO MAESTRO REV.00**


---

# PARTE II — EXPANSIÓN MAESTRA REV.01: COBERTURA INTEGRAL DEL PROYECTO


Esta revisión amplía deliberadamente el plan base para convertirlo en un **megadocumento de arquitectura, desarrollo, datos, UX/UI y operación del Ecosistema Digital FUR**. La ampliación responde a cuatro vacíos que no podían quedar resumidos: (1) catálogo de entidades/activos por red y por etapa; (2) datos mínimos y especializados de cada red; (3) roles, permisos y responsabilidades; y (4) catálogo completo de dashboards, pantallas, módulos, APIs y entregables.

**Regla de interpretación:** los catálogos FUR-PROC, FUR-PTE y FUR-IOT incluidos como anexos provienen de documentos maestros del proyecto. Los catálogos adicionales FUR-GPON, FUR-CC, FUR-LAB, FUR-MNT, FUR-RQ, FUR-OF y FUR-CAM que se desarrollan aquí son **propuestas referenciales para diseño de software y base de datos**; no deben confundirse con inventarios AS-BUILT ni datos operacionales confirmados. Todo registro nuevo nace D1/Referencial y debe pasar por validación de campo/documental antes de promoverse.


# 53. MATRIZ DE COBERTURA DEL MEGADOCUMENTO

| Bloque | Cobertura REV.01 | Detalle |
| --- | --- | --- |
| Arquitectura React/TypeScript | Sí | App shell, rutas, design system, FUR engine, estado, formularios, mapas, BI |
| Backend/API NestJS | Sí | BFF, REST/OpenAPI, autorización, auditoría, eventos, adaptadores OT/IT |
| Odoo 19 | Sí | Módulos, modelos nativos, extensión FUR, autoridad del dato, compras/WMS/MNT/Quality/Documents/LMS |
| PostgreSQL | Sí | Nomenclatura, tablas FUR, relaciones, índices, calidad, auditoría |
| 10 redes FUR | Sí | Objetivo, familias, datos, componentes, flujos y relaciones |
| 18 etapas de proceso | Sí | Matriz maestra y catálogos por etapa |
| Activos/entidades por red y etapa | Sí | PROC/PTE/IOT fuente + 7 redes adicionales referenciales |
| Roles y RBAC/ABAC | Sí | Perfiles, permisos por dominio y funciones |
| Dashboards | Sí | Públicos, ejecutivos, operativos, técnicos y por rol |
| UX/UI | Sí | Sitemap, pantallas, estados, responsive, accesibilidad, design system |
| Integración OT/IT | Sí | SCADA/Historian, OPC UA/MQTT/Modbus, gateway, calidad temporal |
| Marketplace/LMS/WMS/LULO | Sí | Flujos, pantallas, modelos, APIs y roles |
| Pruebas y puesta en producción | Sí | Unit/E2E/FAT/SAT/UAT, migración, seguridad, observabilidad, releases |

# 54. MATRIZ MAESTRA 18 ETAPAS × 10 REDES

| Etapa | Proceso | Contexto físico | PROC | PTE | IOT | GPON | CC | LAB | MNT | RQ | OF | CAM |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| D01 | Recepción y Alimentación | Tolva ROM / balanza / alimentador / cinta | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D02 | Trituración Primaria | Chancadora primaria / lubricación / descarga | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D03 | Cribado | Criba vibratoria / sprays / chutes | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D04 | Trituración Secundaria | Chancadora secundaria / CSS / recirculación | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D05 | Transporte / Silos | Cintas / transferencias / silos | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D06 | Molienda Primaria | Molino primario / alimentación / lubricación | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D07 | Molienda Secundaria | Molino secundario / sump / bombas | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D08 | Clasificación | Ciclones / bombas / overflow / underflow | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D09 | Pre-lixiviación | Tanques / agitación / acondicionamiento | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D10 | Espesamiento | Espesador / rastras / underflow / floculante | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D11 | Lixiviación / CIL | Tanques CIL / agitación / cianuración / aireación | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D12 | Adsorción CIP | Tanques CIP / carbón / transferencia | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D13 | Manejo de Carbón Cargado | Tolvas / bombas / cribas de carbón / transferencia | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D14 | Elución / Desorción | Columnas / calentamiento / circulación / elución | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D15 | Electrowinning | Celdas EW / rectificador / electrolito | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D16 | Calcinación / Secado | Horno / secador / combustión / extracción | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D17 | Fundición | Horno de fusión / colada / gases / pesaje | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |
| D18 | Producto Final / Reactivación / Colas | Doré / reactivación de carbón / relaves / agua | 10 PROC | 10 PTE | 10 IOT | 10 GPON | 10 CC | 10 LAB | 10 MNT | 10 RQ | 10 OF | 10 CAM |

**Volumen referencial máximo de diseño:** 18 etapas × 10 redes × 10 registros = **1.800 FUR/entidades de ejemplo**. En producción, la cardinalidad real será distinta por red y deberá provenir del levantamiento AS-FOUND/AS-BUILT.


# 55. DICCIONARIO DE DATOS ESPECIALIZADO POR RED

## 55.0 Campos comunes obligatorios a las diez redes

| Campo lógico | Descripción | Regla |
| --- | --- | --- |
| `id/uuid` | Identificador técnico inmutable | UUID único |
| `fur_code` | Código humano FUR | Único, versionado por política |
| `domain` | Dominio FUR | PROC/PTE/IOT/GPON/CC/LAB/MNT/RQ/OF/CAM |
| `name` | Nombre legible | Obligatorio |
| `tag/alias` | TAG o alias externo | TBC cuando no exista |
| `site/area/process/system/location` | Jerarquía y ubicación | Relaciones normalizadas |
| `owner/custodian/technical_responsible` | Responsabilidad | Usuario/equipo/organización |
| `status` | Estado de ciclo de vida | Catálogo controlado |
| `criticality` | Criticidad | Catálogo controlado |
| `data_condition` | Confirmado/Referencial/TBC/HOLD | Visible en UI |
| `maturity` | D0–D5 | Visible y auditable |
| `source_system` | Sistema de autoridad | Odoo/FUR/SCADA/Historian/LIMS/etc. |
| `source_reference` | Clave externa verificable | No perder trazabilidad |
| `effective_from/to` | Vigencia | Historización cuando aplique |
| `created_by/at`, `updated_by/at` | Auditoría | Automático |
| `documents` | Evidencias asociadas | N:M a `fur_document_link` |
| `relations` | Relaciones FUR↔FUR | N:M tipadas |

## 55.1 FUR-PROC — datos técnicos de proceso

| Campo lógico | Descripción | Tipo/UoM | Regla |
| --- | --- | --- | --- |
| `process_stage` | Etapa D01–D18 | FK catálogo | Obligatorio |
| `process_type` | Proceso/subproceso/sistema/equipo | catálogo | Obligatorio |
| `design_capacity` | Capacidad de diseño | t/h, m³/h, etc. | Referencial hasta validación |
| `operating_capacity` | Capacidad operativa | UoM ingeniería | Fuente operación |
| `feed_rate` | Flujo de alimentación | t/h o m³/h | Con timestamp si realtime |
| `product_rate` | Flujo de producto | t/h o m³/h | Con fuente |
| `p80_feed/product` | Granulometría | µm/mm | Relacionable a CC/LAB |
| `density/solids` | Densidad o % sólidos | kg/m³ / % | Según etapa |
| `ph/orp/do/nacn` | Variables metalúrgicas | varias | Según aplicabilidad |
| `temperature/pressure/level` | Condiciones proceso | °C/bar/m | Según aplicabilidad |
| `setpoint/limits` | SP, L/H/HH/LL | unidad variable | Nunca inventar en producción |
| `input_streams/output_streams` | Corrientes materiales | N:M | Balance de proceso |
| `equipment_links` | Activos físicos relacionados | N:M | Navegable |
| `pfd_pid_links` | PFD/P&ID | documentos | Revisión vigente |
| `kpi_links` | Recuperación, throughput, disponibilidad | N:M | Fórmula versionada |

## 55.2 FUR-PTE — datos técnicos eléctricos

| Campo lógico | Descripción | Tipo/UoM | Regla |
| --- | --- | --- | --- |
| `asset_family` | TRF/SWG/MCC/MTR/VFD/CBR/REL/PNL/PMT/UPS/etc. | catálogo | Obligatorio |
| `rated_power` | Potencia nominal | kW/kVA/MVA | Placa/ingeniería |
| `primary_voltage` | Tensión primaria | V/kV | Según activo |
| `secondary_voltage` | Tensión secundaria | V/kV | Según activo |
| `rated_current` | Corriente nominal | A | Según activo |
| `frequency` | Frecuencia | Hz | Según placa |
| `phases` | Nº fases | int | Según placa |
| `vector_group` | Grupo vectorial | texto | Transformadores |
| `impedance` | Impedancia | % | Transformadores |
| `breaker_rating` | Capacidad interruptiva | kA | Switchgear/breaker |
| `protection_functions` | ANSI 50/51/87/etc. | N:M | Relés/protección |
| `ct_pt_ratio` | Relaciones CT/PT | ratio | Medición/protección |
| `cable_section_length` | Cable/sección/longitud | mm²/m | Alimentadores |
| `power_factor` | Factor de potencia | p.u. | Realtime/historian |
| `thd` | Distorsión armónica | % | Power quality |
| `trip_event` | Disparo/evento | evento | Auditable |
| `grounding` | Puesta a tierra | relación/valor | Según estudio |

## 55.3 FUR-IOT — datos técnicos IoT / instrumentación

| Campo lógico | Descripción | Tipo/UoM | Regla |
| --- | --- | --- | --- |
| `instrument_family` | PT/TT/LT/FT/DT/AIT/VT/WT/ST/etc. | catálogo | Obligatorio |
| `measured_variable` | Variable medida | catálogo | Obligatorio |
| `range_low/high` | Rango LRV/URV | numeric+UoM | Certificado/datasheet |
| `accuracy` | Exactitud | %FS/%reading | Según equipo |
| `resolution` | Resolución | unidad | Según equipo |
| `signal_type` | 4–20mA/HART/pulso/digital | catálogo | Obligatorio |
| `power_supply` | Alimentación | VDC/VAC/PoE | Obligatorio |
| `protocol` | HART/Modbus/OPC UA/MQTT/etc. | catálogo | Según arquitectura |
| `gateway` | Gateway asociado | FK | Cuando aplique |
| `plc_channel` | PLC/RIO/canal | FK/texto | Reconciliar con I/O List |
| `scada_tag` | TAG SCADA | clave externa | Autoridad SCADA |
| `historian_tag` | TAG historian | clave externa | Autoridad historian |
| `scan_rate` | Frecuencia de muestreo | s/ms | Según criticidad |
| `data_quality` | Good/Bad/Uncertain u homologado | enum | No ocultar |
| `last_calibration` | Última calibración | date | Metrología |
| `calibration_due` | Próxima calibración | date | Metrología |
| `alarm_limits` | Límites de alarma | 1:N | Fuente control |
| `cyber_profile` | VLAN, zona, política | relación | OT security |



## 55.4 FUR-GPON

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código FUR único | varchar/UUID | Sí |
| tag | TAG / alias del equipo | varchar | Sí |
| equipment_type | OLT/ONU/ONT/switch/ODF/splitter/fibra | catalog | Sí |
| parent_node | Nodo padre / PON / uplink | FK | Sí |
| port_ref | Puerto físico/lógico | varchar | Según tipo |
| fiber_type | OS2/OMx | catalog | Según tipo |
| split_ratio | Relación de división | ratio | Según tipo |
| tx_power_dbm | Potencia Tx | dBm | Según tipo |
| rx_power_dbm | Potencia Rx | dBm | Según tipo |
| optical_loss_db | Pérdida medida/calculada | dB | Según tipo |
| optical_margin_db | Margen óptico | dB | Según tipo |
| vlan | VLAN/servicio | int | Según tipo |
| service_type | SCADA/CCTV/voz/datos/Wi-Fi | catalog | Sí |
| ip_address | Dirección IP administrable | inet | Según tipo |
| firmware | Versión firmware | varchar | Según tipo |
| availability | Disponibilidad | % | No |
| data_condition | Confirmado/Referencial/TBC/HOLD | enum | Sí |
| maturity | D0-D5 | enum | Sí |

## 55.5 FUR-CC

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código único de muestra/punto | varchar/UUID | Sí |
| sample_code | Código de muestra | varchar | Sí |
| sample_type | Puntual/compuesta/duplicado/blanco/MRC | catalog | Sí |
| sampling_point | Punto de muestreo | FK | Sí |
| process_stage | Etapa/proceso | FK | Sí |
| asset_ref | Activo relacionado | FK | No |
| collected_at | Fecha/hora de toma | timestamp | Sí |
| collector | Responsable toma | FK usuario | Sí |
| mass_volume | Masa/volumen | numeric+UoM | Sí |
| container | Contenedor/preservación | catalog | Sí |
| chain_status | Cadena de custodia | enum | Sí |
| requested_analysis | Ensayos solicitados | N:M | Sí |
| priority | Prioridad | enum | Sí |
| lab_destination | Laboratorio destino | FK | Sí |
| qaqc_role | Normal/blank/duplicate/CRM | enum | Sí |
| data_condition | Condición del dato | enum | Sí |
| maturity | D0-D5 | enum | Sí |

## 55.6 FUR-LAB

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código único del análisis | varchar/UUID | Sí |
| sample_fur | FUR-CC de origen | FK | Sí |
| method | Método/SOP/versión | FK | Sí |
| technique | Técnica analítica | catalog | Sí |
| equipment | Equipo analítico | FK | Sí |
| analyte | Analito/propiedad | catalog | Sí |
| result | Resultado | numeric/text | Sí |
| unit | Unidad | UoM | Sí |
| lod | LOD | numeric | Según método |
| loq | LOQ | numeric | Según método |
| uncertainty | Incertidumbre | numeric | Según método |
| qaqc_status | QA/QC | enum | Sí |
| analyst | Analista | FK | Sí |
| reviewer | Revisor | FK | Sí |
| approved_at | Aprobación | timestamp | Sí |
| certificate | Certificado/reporte | document FK | Sí |
| data_condition | Condición | enum | Sí |
| maturity | D0-D5 | enum | Sí |

## 55.7 FUR-MNT

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código FUR mantenimiento | varchar/UUID | Sí |
| asset_fur | Activo intervenido | FK | Sí |
| strategy | Preventivo/Correctivo/Predictivo/Inspección | enum | Sí |
| plan | Plan y frecuencia | FK | Sí |
| work_order | OT Odoo vinculada | FK | Según evento |
| criticality | Criticidad | enum | Sí |
| condition | Condición técnica | enum | Sí |
| failure_mode | Modo de falla | FK | No |
| bom | BOM/repuestos | N:M | Sí |
| stock_location | Almacén/ubicación | FK Odoo | Sí |
| responsible_team | Equipo responsable | FK | Sí |
| planned_duration | Duración planificada | h | Sí |
| actual_duration | Duración real | h | No |
| mtbf | MTBF | h | No |
| mttr | MTTR | h | No |
| availability | Disponibilidad | % | No |
| data_condition | Condición | enum | Sí |
| maturity | D0-D5 | enum | Sí |

## 55.8 FUR-RQ

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código requisición FUR | varchar/UUID | Sí |
| requester | Solicitante | FK usuario | Sí |
| department | Área/centro responsable | FK | Sí |
| asset_fur | Activo/entidad origen | FK | Sí |
| item | Producto/servicio requerido | FK Odoo | Sí |
| qty | Cantidad | numeric | Sí |
| uom | Unidad | FK Odoo | Sí |
| specification | Especificación técnica | text/document | Sí |
| priority | Prioridad | enum | Sí |
| required_date | Fecha requerida | date | Sí |
| estimated_cost | Costo estimado | money | No |
| cost_center | Centro de costo | FK analytic | Sí |
| budget_type | CAPEX/OPEX | enum | Sí |
| approval_state | Estado de aprobación | enum | Sí |
| purchase_request | Vínculo purchase requisition/order | FK | No |
| data_condition | Condición | enum | Sí |
| maturity | D0-D5 | enum | Sí |

## 55.9 FUR-OF

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código oferta FUR | varchar/UUID | Sí |
| rq_fur | Requisición origen | FK | Sí |
| supplier | Proveedor | FK res.partner | Sí |
| offer_ref | Referencia proveedor | varchar | Sí |
| item | Ítem cotizado | FK product | Sí |
| qty | Cantidad | numeric | Sí |
| currency | Moneda | FK res.currency | Sí |
| unit_price | Precio unitario | money | Sí |
| lead_time | Plazo entrega | days/weeks | Sí |
| validity | Vigencia | date/days | Sí |
| warranty | Garantía | months | No |
| incoterm | Incoterm | catalog | No |
| payment_terms | Condiciones pago | FK/text | No |
| technical_compliance | Cumplimiento técnico | % | Sí |
| deviations | Desviaciones | 1:N | No |
| evaluation_state | Evaluación | enum | Sí |
| purchase_order | PO adjudicada | FK | No |
| data_condition | Condición | enum | Sí |
| maturity | D0-D5 | enum | Sí |

## 55.10 FUR-CAM

| Campo lógico | Descripción | Tipo/UoM | Obligatorio |
| --- | --- | --- | --- |
| fur_code | Código cámara FUR | varchar/UUID | Sí |
| tag | TAG de cámara | varchar | Sí |
| camera_type | PTZ/fija/térmica/LPR/proceso | catalog | Sí |
| resolution | Resolución | varchar | Sí |
| fps | Fotogramas/s | numeric | No |
| zoom | Zoom óptico/digital | varchar | No |
| coverage | Cobertura/FOV | varchar | Sí |
| ip_rating | Protección ambiental | varchar | Sí |
| night_vision | IR/low-light | varchar | No |
| compression | H.265/H.264 | catalog | Sí |
| network_node | Nodo GPON/switch | FK | Sí |
| vlan | VLAN | int | Sí |
| storage_policy | Retención/almacenamiento | FK | Sí |
| event_rules | Reglas analíticas/eventos | 1:N | No |
| power | PoE/24VDC | varchar | Sí |
| maintenance_plan | Plan limpieza/inspección | FK | Sí |
| data_condition | Condición | enum | Sí |
| maturity | D0-D5 | enum | Sí |

# 56. CATÁLOGO REFERENCIAL FUR-GPON POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

**Contexto:** Tolva ROM / balanza / alimentador / cinta. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D01-ONT-0001 | ONT-D01-01 | ONT industrial de etapa — Recepción y Alimentación | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D01 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D01-SW-0002 | SW-D01-02 | Switch industrial de acceso — Recepción y Alimentación | 8xGE + 2xSFP | OT/SCADA | NODO-D01 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D01-ODF-0003 | ODF-D01-03 | ODF / patch panel local — Recepción y Alimentación | 12 fibras OS2 | Distribución óptica | NODO-D01 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D01-SPL-0004 | SPL-D01-04 | Splitter óptico de ramal — Recepción y Alimentación | 1:8 | ODN | NODO-D01 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D01-FBR-0005 | FBR-D01-05 | Tramo de fibra de proceso — Recepción y Alimentación | OS2 2 hilos | Backbone/Drop | NODO-D01 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D01-SFP-0006 | SFP-D01-06 | Transceptor SFP industrial — Recepción y Alimentación | 1G/10G LX | Uplink | NODO-D01 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D01-CAB-0007 | CAB-D01-07 | Gabinete de comunicaciones — Recepción y Alimentación | IP55 12U | Alojamiento | NODO-D01 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D01-UPS-0008 | UPS-D01-08 | UPS de comunicaciones — Recepción y Alimentación | 2 kVA / 120-230 VAC | Respaldo | NODO-D01 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D01-GW-0009 | GW-D01-09 | Gateway Ethernet/serial — Recepción y Alimentación | Modbus TCP/RTU | Integración OT | NODO-D01 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D01-END-0010 | END-D01-10 | Punto de servicio OT — Recepción y Alimentación | VLAN dedicada | SCADA/CCTV/Datos | NODO-D01 | N/A | Referencial | D1 |

## D02 — Trituración Primaria

**Contexto:** Chancadora primaria / lubricación / descarga. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D02-ONT-0011 | ONT-D02-01 | ONT industrial de etapa — Trituración Primaria | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D02 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D02-SW-0012 | SW-D02-02 | Switch industrial de acceso — Trituración Primaria | 8xGE + 2xSFP | OT/SCADA | NODO-D02 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D02-ODF-0013 | ODF-D02-03 | ODF / patch panel local — Trituración Primaria | 12 fibras OS2 | Distribución óptica | NODO-D02 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D02-SPL-0014 | SPL-D02-04 | Splitter óptico de ramal — Trituración Primaria | 1:8 | ODN | NODO-D02 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D02-FBR-0015 | FBR-D02-05 | Tramo de fibra de proceso — Trituración Primaria | OS2 2 hilos | Backbone/Drop | NODO-D02 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D02-SFP-0016 | SFP-D02-06 | Transceptor SFP industrial — Trituración Primaria | 1G/10G LX | Uplink | NODO-D02 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D02-CAB-0017 | CAB-D02-07 | Gabinete de comunicaciones — Trituración Primaria | IP55 12U | Alojamiento | NODO-D02 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D02-UPS-0018 | UPS-D02-08 | UPS de comunicaciones — Trituración Primaria | 2 kVA / 120-230 VAC | Respaldo | NODO-D02 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D02-GW-0019 | GW-D02-09 | Gateway Ethernet/serial — Trituración Primaria | Modbus TCP/RTU | Integración OT | NODO-D02 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D02-END-0020 | END-D02-10 | Punto de servicio OT — Trituración Primaria | VLAN dedicada | SCADA/CCTV/Datos | NODO-D02 | N/A | Referencial | D1 |

## D03 — Cribado

**Contexto:** Criba vibratoria / sprays / chutes. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D03-ONT-0021 | ONT-D03-01 | ONT industrial de etapa — Cribado | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D03 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D03-SW-0022 | SW-D03-02 | Switch industrial de acceso — Cribado | 8xGE + 2xSFP | OT/SCADA | NODO-D03 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D03-ODF-0023 | ODF-D03-03 | ODF / patch panel local — Cribado | 12 fibras OS2 | Distribución óptica | NODO-D03 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D03-SPL-0024 | SPL-D03-04 | Splitter óptico de ramal — Cribado | 1:8 | ODN | NODO-D03 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D03-FBR-0025 | FBR-D03-05 | Tramo de fibra de proceso — Cribado | OS2 2 hilos | Backbone/Drop | NODO-D03 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D03-SFP-0026 | SFP-D03-06 | Transceptor SFP industrial — Cribado | 1G/10G LX | Uplink | NODO-D03 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D03-CAB-0027 | CAB-D03-07 | Gabinete de comunicaciones — Cribado | IP55 12U | Alojamiento | NODO-D03 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D03-UPS-0028 | UPS-D03-08 | UPS de comunicaciones — Cribado | 2 kVA / 120-230 VAC | Respaldo | NODO-D03 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D03-GW-0029 | GW-D03-09 | Gateway Ethernet/serial — Cribado | Modbus TCP/RTU | Integración OT | NODO-D03 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D03-END-0030 | END-D03-10 | Punto de servicio OT — Cribado | VLAN dedicada | SCADA/CCTV/Datos | NODO-D03 | N/A | Referencial | D1 |

## D04 — Trituración Secundaria

**Contexto:** Chancadora secundaria / CSS / recirculación. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D04-ONT-0031 | ONT-D04-01 | ONT industrial de etapa — Trituración Secundaria | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D04 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D04-SW-0032 | SW-D04-02 | Switch industrial de acceso — Trituración Secundaria | 8xGE + 2xSFP | OT/SCADA | NODO-D04 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D04-ODF-0033 | ODF-D04-03 | ODF / patch panel local — Trituración Secundaria | 12 fibras OS2 | Distribución óptica | NODO-D04 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D04-SPL-0034 | SPL-D04-04 | Splitter óptico de ramal — Trituración Secundaria | 1:8 | ODN | NODO-D04 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D04-FBR-0035 | FBR-D04-05 | Tramo de fibra de proceso — Trituración Secundaria | OS2 2 hilos | Backbone/Drop | NODO-D04 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D04-SFP-0036 | SFP-D04-06 | Transceptor SFP industrial — Trituración Secundaria | 1G/10G LX | Uplink | NODO-D04 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D04-CAB-0037 | CAB-D04-07 | Gabinete de comunicaciones — Trituración Secundaria | IP55 12U | Alojamiento | NODO-D04 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D04-UPS-0038 | UPS-D04-08 | UPS de comunicaciones — Trituración Secundaria | 2 kVA / 120-230 VAC | Respaldo | NODO-D04 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D04-GW-0039 | GW-D04-09 | Gateway Ethernet/serial — Trituración Secundaria | Modbus TCP/RTU | Integración OT | NODO-D04 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D04-END-0040 | END-D04-10 | Punto de servicio OT — Trituración Secundaria | VLAN dedicada | SCADA/CCTV/Datos | NODO-D04 | N/A | Referencial | D1 |

## D05 — Transporte / Silos

**Contexto:** Cintas / transferencias / silos. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D05-ONT-0041 | ONT-D05-01 | ONT industrial de etapa — Transporte / Silos | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D05 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D05-SW-0042 | SW-D05-02 | Switch industrial de acceso — Transporte / Silos | 8xGE + 2xSFP | OT/SCADA | NODO-D05 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D05-ODF-0043 | ODF-D05-03 | ODF / patch panel local — Transporte / Silos | 12 fibras OS2 | Distribución óptica | NODO-D05 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D05-SPL-0044 | SPL-D05-04 | Splitter óptico de ramal — Transporte / Silos | 1:8 | ODN | NODO-D05 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D05-FBR-0045 | FBR-D05-05 | Tramo de fibra de proceso — Transporte / Silos | OS2 2 hilos | Backbone/Drop | NODO-D05 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D05-SFP-0046 | SFP-D05-06 | Transceptor SFP industrial — Transporte / Silos | 1G/10G LX | Uplink | NODO-D05 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D05-CAB-0047 | CAB-D05-07 | Gabinete de comunicaciones — Transporte / Silos | IP55 12U | Alojamiento | NODO-D05 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D05-UPS-0048 | UPS-D05-08 | UPS de comunicaciones — Transporte / Silos | 2 kVA / 120-230 VAC | Respaldo | NODO-D05 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D05-GW-0049 | GW-D05-09 | Gateway Ethernet/serial — Transporte / Silos | Modbus TCP/RTU | Integración OT | NODO-D05 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D05-END-0050 | END-D05-10 | Punto de servicio OT — Transporte / Silos | VLAN dedicada | SCADA/CCTV/Datos | NODO-D05 | N/A | Referencial | D1 |

## D06 — Molienda Primaria

**Contexto:** Molino primario / alimentación / lubricación. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D06-ONT-0051 | ONT-D06-01 | ONT industrial de etapa — Molienda Primaria | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D06 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D06-SW-0052 | SW-D06-02 | Switch industrial de acceso — Molienda Primaria | 8xGE + 2xSFP | OT/SCADA | NODO-D06 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D06-ODF-0053 | ODF-D06-03 | ODF / patch panel local — Molienda Primaria | 12 fibras OS2 | Distribución óptica | NODO-D06 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D06-SPL-0054 | SPL-D06-04 | Splitter óptico de ramal — Molienda Primaria | 1:8 | ODN | NODO-D06 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D06-FBR-0055 | FBR-D06-05 | Tramo de fibra de proceso — Molienda Primaria | OS2 2 hilos | Backbone/Drop | NODO-D06 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D06-SFP-0056 | SFP-D06-06 | Transceptor SFP industrial — Molienda Primaria | 1G/10G LX | Uplink | NODO-D06 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D06-CAB-0057 | CAB-D06-07 | Gabinete de comunicaciones — Molienda Primaria | IP55 12U | Alojamiento | NODO-D06 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D06-UPS-0058 | UPS-D06-08 | UPS de comunicaciones — Molienda Primaria | 2 kVA / 120-230 VAC | Respaldo | NODO-D06 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D06-GW-0059 | GW-D06-09 | Gateway Ethernet/serial — Molienda Primaria | Modbus TCP/RTU | Integración OT | NODO-D06 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D06-END-0060 | END-D06-10 | Punto de servicio OT — Molienda Primaria | VLAN dedicada | SCADA/CCTV/Datos | NODO-D06 | N/A | Referencial | D1 |

## D07 — Molienda Secundaria

**Contexto:** Molino secundario / sump / bombas. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D07-ONT-0061 | ONT-D07-01 | ONT industrial de etapa — Molienda Secundaria | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D07 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D07-SW-0062 | SW-D07-02 | Switch industrial de acceso — Molienda Secundaria | 8xGE + 2xSFP | OT/SCADA | NODO-D07 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D07-ODF-0063 | ODF-D07-03 | ODF / patch panel local — Molienda Secundaria | 12 fibras OS2 | Distribución óptica | NODO-D07 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D07-SPL-0064 | SPL-D07-04 | Splitter óptico de ramal — Molienda Secundaria | 1:8 | ODN | NODO-D07 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D07-FBR-0065 | FBR-D07-05 | Tramo de fibra de proceso — Molienda Secundaria | OS2 2 hilos | Backbone/Drop | NODO-D07 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D07-SFP-0066 | SFP-D07-06 | Transceptor SFP industrial — Molienda Secundaria | 1G/10G LX | Uplink | NODO-D07 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D07-CAB-0067 | CAB-D07-07 | Gabinete de comunicaciones — Molienda Secundaria | IP55 12U | Alojamiento | NODO-D07 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D07-UPS-0068 | UPS-D07-08 | UPS de comunicaciones — Molienda Secundaria | 2 kVA / 120-230 VAC | Respaldo | NODO-D07 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D07-GW-0069 | GW-D07-09 | Gateway Ethernet/serial — Molienda Secundaria | Modbus TCP/RTU | Integración OT | NODO-D07 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D07-END-0070 | END-D07-10 | Punto de servicio OT — Molienda Secundaria | VLAN dedicada | SCADA/CCTV/Datos | NODO-D07 | N/A | Referencial | D1 |

## D08 — Clasificación

**Contexto:** Ciclones / bombas / overflow / underflow. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D08-ONT-0071 | ONT-D08-01 | ONT industrial de etapa — Clasificación | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D08 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D08-SW-0072 | SW-D08-02 | Switch industrial de acceso — Clasificación | 8xGE + 2xSFP | OT/SCADA | NODO-D08 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D08-ODF-0073 | ODF-D08-03 | ODF / patch panel local — Clasificación | 12 fibras OS2 | Distribución óptica | NODO-D08 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D08-SPL-0074 | SPL-D08-04 | Splitter óptico de ramal — Clasificación | 1:8 | ODN | NODO-D08 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D08-FBR-0075 | FBR-D08-05 | Tramo de fibra de proceso — Clasificación | OS2 2 hilos | Backbone/Drop | NODO-D08 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D08-SFP-0076 | SFP-D08-06 | Transceptor SFP industrial — Clasificación | 1G/10G LX | Uplink | NODO-D08 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D08-CAB-0077 | CAB-D08-07 | Gabinete de comunicaciones — Clasificación | IP55 12U | Alojamiento | NODO-D08 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D08-UPS-0078 | UPS-D08-08 | UPS de comunicaciones — Clasificación | 2 kVA / 120-230 VAC | Respaldo | NODO-D08 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D08-GW-0079 | GW-D08-09 | Gateway Ethernet/serial — Clasificación | Modbus TCP/RTU | Integración OT | NODO-D08 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D08-END-0080 | END-D08-10 | Punto de servicio OT — Clasificación | VLAN dedicada | SCADA/CCTV/Datos | NODO-D08 | N/A | Referencial | D1 |

## D09 — Pre-lixiviación

**Contexto:** Tanques / agitación / acondicionamiento. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D09-ONT-0081 | ONT-D09-01 | ONT industrial de etapa — Pre-lixiviación | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D09 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D09-SW-0082 | SW-D09-02 | Switch industrial de acceso — Pre-lixiviación | 8xGE + 2xSFP | OT/SCADA | NODO-D09 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D09-ODF-0083 | ODF-D09-03 | ODF / patch panel local — Pre-lixiviación | 12 fibras OS2 | Distribución óptica | NODO-D09 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D09-SPL-0084 | SPL-D09-04 | Splitter óptico de ramal — Pre-lixiviación | 1:8 | ODN | NODO-D09 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D09-FBR-0085 | FBR-D09-05 | Tramo de fibra de proceso — Pre-lixiviación | OS2 2 hilos | Backbone/Drop | NODO-D09 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D09-SFP-0086 | SFP-D09-06 | Transceptor SFP industrial — Pre-lixiviación | 1G/10G LX | Uplink | NODO-D09 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D09-CAB-0087 | CAB-D09-07 | Gabinete de comunicaciones — Pre-lixiviación | IP55 12U | Alojamiento | NODO-D09 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D09-UPS-0088 | UPS-D09-08 | UPS de comunicaciones — Pre-lixiviación | 2 kVA / 120-230 VAC | Respaldo | NODO-D09 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D09-GW-0089 | GW-D09-09 | Gateway Ethernet/serial — Pre-lixiviación | Modbus TCP/RTU | Integración OT | NODO-D09 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D09-END-0090 | END-D09-10 | Punto de servicio OT — Pre-lixiviación | VLAN dedicada | SCADA/CCTV/Datos | NODO-D09 | N/A | Referencial | D1 |

## D10 — Espesamiento

**Contexto:** Espesador / rastras / underflow / floculante. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D10-ONT-0091 | ONT-D10-01 | ONT industrial de etapa — Espesamiento | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D10 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D10-SW-0092 | SW-D10-02 | Switch industrial de acceso — Espesamiento | 8xGE + 2xSFP | OT/SCADA | NODO-D10 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D10-ODF-0093 | ODF-D10-03 | ODF / patch panel local — Espesamiento | 12 fibras OS2 | Distribución óptica | NODO-D10 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D10-SPL-0094 | SPL-D10-04 | Splitter óptico de ramal — Espesamiento | 1:8 | ODN | NODO-D10 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D10-FBR-0095 | FBR-D10-05 | Tramo de fibra de proceso — Espesamiento | OS2 2 hilos | Backbone/Drop | NODO-D10 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D10-SFP-0096 | SFP-D10-06 | Transceptor SFP industrial — Espesamiento | 1G/10G LX | Uplink | NODO-D10 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D10-CAB-0097 | CAB-D10-07 | Gabinete de comunicaciones — Espesamiento | IP55 12U | Alojamiento | NODO-D10 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D10-UPS-0098 | UPS-D10-08 | UPS de comunicaciones — Espesamiento | 2 kVA / 120-230 VAC | Respaldo | NODO-D10 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D10-GW-0099 | GW-D10-09 | Gateway Ethernet/serial — Espesamiento | Modbus TCP/RTU | Integración OT | NODO-D10 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D10-END-0100 | END-D10-10 | Punto de servicio OT — Espesamiento | VLAN dedicada | SCADA/CCTV/Datos | NODO-D10 | N/A | Referencial | D1 |

## D11 — Lixiviación / CIL

**Contexto:** Tanques CIL / agitación / cianuración / aireación. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D11-ONT-0101 | ONT-D11-01 | ONT industrial de etapa — Lixiviación / CIL | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D11 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D11-SW-0102 | SW-D11-02 | Switch industrial de acceso — Lixiviación / CIL | 8xGE + 2xSFP | OT/SCADA | NODO-D11 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D11-ODF-0103 | ODF-D11-03 | ODF / patch panel local — Lixiviación / CIL | 12 fibras OS2 | Distribución óptica | NODO-D11 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D11-SPL-0104 | SPL-D11-04 | Splitter óptico de ramal — Lixiviación / CIL | 1:8 | ODN | NODO-D11 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D11-FBR-0105 | FBR-D11-05 | Tramo de fibra de proceso — Lixiviación / CIL | OS2 2 hilos | Backbone/Drop | NODO-D11 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D11-SFP-0106 | SFP-D11-06 | Transceptor SFP industrial — Lixiviación / CIL | 1G/10G LX | Uplink | NODO-D11 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D11-CAB-0107 | CAB-D11-07 | Gabinete de comunicaciones — Lixiviación / CIL | IP55 12U | Alojamiento | NODO-D11 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D11-UPS-0108 | UPS-D11-08 | UPS de comunicaciones — Lixiviación / CIL | 2 kVA / 120-230 VAC | Respaldo | NODO-D11 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D11-GW-0109 | GW-D11-09 | Gateway Ethernet/serial — Lixiviación / CIL | Modbus TCP/RTU | Integración OT | NODO-D11 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D11-END-0110 | END-D11-10 | Punto de servicio OT — Lixiviación / CIL | VLAN dedicada | SCADA/CCTV/Datos | NODO-D11 | N/A | Referencial | D1 |

## D12 — Adsorción CIP

**Contexto:** Tanques CIP / carbón / transferencia. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D12-ONT-0111 | ONT-D12-01 | ONT industrial de etapa — Adsorción CIP | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D12 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D12-SW-0112 | SW-D12-02 | Switch industrial de acceso — Adsorción CIP | 8xGE + 2xSFP | OT/SCADA | NODO-D12 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D12-ODF-0113 | ODF-D12-03 | ODF / patch panel local — Adsorción CIP | 12 fibras OS2 | Distribución óptica | NODO-D12 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D12-SPL-0114 | SPL-D12-04 | Splitter óptico de ramal — Adsorción CIP | 1:8 | ODN | NODO-D12 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D12-FBR-0115 | FBR-D12-05 | Tramo de fibra de proceso — Adsorción CIP | OS2 2 hilos | Backbone/Drop | NODO-D12 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D12-SFP-0116 | SFP-D12-06 | Transceptor SFP industrial — Adsorción CIP | 1G/10G LX | Uplink | NODO-D12 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D12-CAB-0117 | CAB-D12-07 | Gabinete de comunicaciones — Adsorción CIP | IP55 12U | Alojamiento | NODO-D12 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D12-UPS-0118 | UPS-D12-08 | UPS de comunicaciones — Adsorción CIP | 2 kVA / 120-230 VAC | Respaldo | NODO-D12 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D12-GW-0119 | GW-D12-09 | Gateway Ethernet/serial — Adsorción CIP | Modbus TCP/RTU | Integración OT | NODO-D12 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D12-END-0120 | END-D12-10 | Punto de servicio OT — Adsorción CIP | VLAN dedicada | SCADA/CCTV/Datos | NODO-D12 | N/A | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

**Contexto:** Tolvas / bombas / cribas de carbón / transferencia. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D13-ONT-0121 | ONT-D13-01 | ONT industrial de etapa — Manejo de Carbón Cargado | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D13 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D13-SW-0122 | SW-D13-02 | Switch industrial de acceso — Manejo de Carbón Cargado | 8xGE + 2xSFP | OT/SCADA | NODO-D13 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D13-ODF-0123 | ODF-D13-03 | ODF / patch panel local — Manejo de Carbón Cargado | 12 fibras OS2 | Distribución óptica | NODO-D13 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D13-SPL-0124 | SPL-D13-04 | Splitter óptico de ramal — Manejo de Carbón Cargado | 1:8 | ODN | NODO-D13 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D13-FBR-0125 | FBR-D13-05 | Tramo de fibra de proceso — Manejo de Carbón Cargado | OS2 2 hilos | Backbone/Drop | NODO-D13 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D13-SFP-0126 | SFP-D13-06 | Transceptor SFP industrial — Manejo de Carbón Cargado | 1G/10G LX | Uplink | NODO-D13 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D13-CAB-0127 | CAB-D13-07 | Gabinete de comunicaciones — Manejo de Carbón Cargado | IP55 12U | Alojamiento | NODO-D13 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D13-UPS-0128 | UPS-D13-08 | UPS de comunicaciones — Manejo de Carbón Cargado | 2 kVA / 120-230 VAC | Respaldo | NODO-D13 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D13-GW-0129 | GW-D13-09 | Gateway Ethernet/serial — Manejo de Carbón Cargado | Modbus TCP/RTU | Integración OT | NODO-D13 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D13-END-0130 | END-D13-10 | Punto de servicio OT — Manejo de Carbón Cargado | VLAN dedicada | SCADA/CCTV/Datos | NODO-D13 | N/A | Referencial | D1 |

## D14 — Elución / Desorción

**Contexto:** Columnas / calentamiento / circulación / elución. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D14-ONT-0131 | ONT-D14-01 | ONT industrial de etapa — Elución / Desorción | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D14 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D14-SW-0132 | SW-D14-02 | Switch industrial de acceso — Elución / Desorción | 8xGE + 2xSFP | OT/SCADA | NODO-D14 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D14-ODF-0133 | ODF-D14-03 | ODF / patch panel local — Elución / Desorción | 12 fibras OS2 | Distribución óptica | NODO-D14 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D14-SPL-0134 | SPL-D14-04 | Splitter óptico de ramal — Elución / Desorción | 1:8 | ODN | NODO-D14 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D14-FBR-0135 | FBR-D14-05 | Tramo de fibra de proceso — Elución / Desorción | OS2 2 hilos | Backbone/Drop | NODO-D14 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D14-SFP-0136 | SFP-D14-06 | Transceptor SFP industrial — Elución / Desorción | 1G/10G LX | Uplink | NODO-D14 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D14-CAB-0137 | CAB-D14-07 | Gabinete de comunicaciones — Elución / Desorción | IP55 12U | Alojamiento | NODO-D14 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D14-UPS-0138 | UPS-D14-08 | UPS de comunicaciones — Elución / Desorción | 2 kVA / 120-230 VAC | Respaldo | NODO-D14 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D14-GW-0139 | GW-D14-09 | Gateway Ethernet/serial — Elución / Desorción | Modbus TCP/RTU | Integración OT | NODO-D14 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D14-END-0140 | END-D14-10 | Punto de servicio OT — Elución / Desorción | VLAN dedicada | SCADA/CCTV/Datos | NODO-D14 | N/A | Referencial | D1 |

## D15 — Electrowinning

**Contexto:** Celdas EW / rectificador / electrolito. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D15-ONT-0141 | ONT-D15-01 | ONT industrial de etapa — Electrowinning | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D15 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D15-SW-0142 | SW-D15-02 | Switch industrial de acceso — Electrowinning | 8xGE + 2xSFP | OT/SCADA | NODO-D15 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D15-ODF-0143 | ODF-D15-03 | ODF / patch panel local — Electrowinning | 12 fibras OS2 | Distribución óptica | NODO-D15 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D15-SPL-0144 | SPL-D15-04 | Splitter óptico de ramal — Electrowinning | 1:8 | ODN | NODO-D15 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D15-FBR-0145 | FBR-D15-05 | Tramo de fibra de proceso — Electrowinning | OS2 2 hilos | Backbone/Drop | NODO-D15 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D15-SFP-0146 | SFP-D15-06 | Transceptor SFP industrial — Electrowinning | 1G/10G LX | Uplink | NODO-D15 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D15-CAB-0147 | CAB-D15-07 | Gabinete de comunicaciones — Electrowinning | IP55 12U | Alojamiento | NODO-D15 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D15-UPS-0148 | UPS-D15-08 | UPS de comunicaciones — Electrowinning | 2 kVA / 120-230 VAC | Respaldo | NODO-D15 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D15-GW-0149 | GW-D15-09 | Gateway Ethernet/serial — Electrowinning | Modbus TCP/RTU | Integración OT | NODO-D15 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D15-END-0150 | END-D15-10 | Punto de servicio OT — Electrowinning | VLAN dedicada | SCADA/CCTV/Datos | NODO-D15 | N/A | Referencial | D1 |

## D16 — Calcinación / Secado

**Contexto:** Horno / secador / combustión / extracción. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D16-ONT-0151 | ONT-D16-01 | ONT industrial de etapa — Calcinación / Secado | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D16 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D16-SW-0152 | SW-D16-02 | Switch industrial de acceso — Calcinación / Secado | 8xGE + 2xSFP | OT/SCADA | NODO-D16 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D16-ODF-0153 | ODF-D16-03 | ODF / patch panel local — Calcinación / Secado | 12 fibras OS2 | Distribución óptica | NODO-D16 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D16-SPL-0154 | SPL-D16-04 | Splitter óptico de ramal — Calcinación / Secado | 1:8 | ODN | NODO-D16 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D16-FBR-0155 | FBR-D16-05 | Tramo de fibra de proceso — Calcinación / Secado | OS2 2 hilos | Backbone/Drop | NODO-D16 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D16-SFP-0156 | SFP-D16-06 | Transceptor SFP industrial — Calcinación / Secado | 1G/10G LX | Uplink | NODO-D16 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D16-CAB-0157 | CAB-D16-07 | Gabinete de comunicaciones — Calcinación / Secado | IP55 12U | Alojamiento | NODO-D16 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D16-UPS-0158 | UPS-D16-08 | UPS de comunicaciones — Calcinación / Secado | 2 kVA / 120-230 VAC | Respaldo | NODO-D16 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D16-GW-0159 | GW-D16-09 | Gateway Ethernet/serial — Calcinación / Secado | Modbus TCP/RTU | Integración OT | NODO-D16 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D16-END-0160 | END-D16-10 | Punto de servicio OT — Calcinación / Secado | VLAN dedicada | SCADA/CCTV/Datos | NODO-D16 | N/A | Referencial | D1 |

## D17 — Fundición

**Contexto:** Horno de fusión / colada / gases / pesaje. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D17-ONT-0161 | ONT-D17-01 | ONT industrial de etapa — Fundición | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D17 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D17-SW-0162 | SW-D17-02 | Switch industrial de acceso — Fundición | 8xGE + 2xSFP | OT/SCADA | NODO-D17 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D17-ODF-0163 | ODF-D17-03 | ODF / patch panel local — Fundición | 12 fibras OS2 | Distribución óptica | NODO-D17 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D17-SPL-0164 | SPL-D17-04 | Splitter óptico de ramal — Fundición | 1:8 | ODN | NODO-D17 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D17-FBR-0165 | FBR-D17-05 | Tramo de fibra de proceso — Fundición | OS2 2 hilos | Backbone/Drop | NODO-D17 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D17-SFP-0166 | SFP-D17-06 | Transceptor SFP industrial — Fundición | 1G/10G LX | Uplink | NODO-D17 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D17-CAB-0167 | CAB-D17-07 | Gabinete de comunicaciones — Fundición | IP55 12U | Alojamiento | NODO-D17 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D17-UPS-0168 | UPS-D17-08 | UPS de comunicaciones — Fundición | 2 kVA / 120-230 VAC | Respaldo | NODO-D17 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D17-GW-0169 | GW-D17-09 | Gateway Ethernet/serial — Fundición | Modbus TCP/RTU | Integración OT | NODO-D17 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D17-END-0170 | END-D17-10 | Punto de servicio OT — Fundición | VLAN dedicada | SCADA/CCTV/Datos | NODO-D17 | N/A | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

**Contexto:** Doré / reactivación de carbón / relaves / agua. **Condición inicial:** Referencial. **Madurez:** D1.

| # | Código FUR | TAG | Entidad/activo | Dato principal | Servicio | Nodo padre | Dato óptico | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-GPON-D18-ONT-0171 | ONT-D18-01 | ONT industrial de etapa — Producto Final / Reactivación / Colas | 1 puerto PON + 4xGE | SCADA/Datos | NODO-D18 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 2 | FUR-GPON-D18-SW-0172 | SW-D18-02 | Switch industrial de acceso — Producto Final / Reactivación / Colas | 8xGE + 2xSFP | OT/SCADA | NODO-D18 | N/A | Referencial | D1 |
| 3 | FUR-GPON-D18-ODF-0173 | ODF-D18-03 | ODF / patch panel local — Producto Final / Reactivación / Colas | 12 fibras OS2 | Distribución óptica | NODO-D18 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 4 | FUR-GPON-D18-SPL-0174 | SPL-D18-04 | Splitter óptico de ramal — Producto Final / Reactivación / Colas | 1:8 | ODN | NODO-D18 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 5 | FUR-GPON-D18-FBR-0175 | FBR-D18-05 | Tramo de fibra de proceso — Producto Final / Reactivación / Colas | OS2 2 hilos | Backbone/Drop | NODO-D18 | Rx objetivo -18 dBm / margen ≥3 dB | Referencial | D1 |
| 6 | FUR-GPON-D18-SFP-0176 | SFP-D18-06 | Transceptor SFP industrial — Producto Final / Reactivación / Colas | 1G/10G LX | Uplink | NODO-D18 | N/A | Referencial | D1 |
| 7 | FUR-GPON-D18-CAB-0177 | CAB-D18-07 | Gabinete de comunicaciones — Producto Final / Reactivación / Colas | IP55 12U | Alojamiento | NODO-D18 | N/A | Referencial | D1 |
| 8 | FUR-GPON-D18-UPS-0178 | UPS-D18-08 | UPS de comunicaciones — Producto Final / Reactivación / Colas | 2 kVA / 120-230 VAC | Respaldo | NODO-D18 | N/A | Referencial | D1 |
| 9 | FUR-GPON-D18-GW-0179 | GW-D18-09 | Gateway Ethernet/serial — Producto Final / Reactivación / Colas | Modbus TCP/RTU | Integración OT | NODO-D18 | N/A | Referencial | D1 |
| 10 | FUR-GPON-D18-END-0180 | END-D18-10 | Punto de servicio OT — Producto Final / Reactivación / Colas | VLAN dedicada | SCADA/CCTV/Datos | NODO-D18 | N/A | Referencial | D1 |

# 57. CATÁLOGO REFERENCIAL FUR-CC POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D01-CMP-0001 | D01-CMP-01 | Muestra compuesta de proceso | PTO-D01-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D01-GRB-0002 | D01-GRB-02 | Muestra puntual / grab | PTO-D01-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D01-DUP-0003 | D01-DUP-03 | Duplicado de campo | PTO-D01-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D01-BLK-0004 | D01-BLK-04 | Blanco de campo | PTO-D01-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D01-CRM-0005 | D01-CRM-05 | Material de referencia certificado | PTO-D01-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D01-HUM-0006 | D01-HUM-06 | Muestra para humedad | PTO-D01-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D01-PSD-0007 | D01-PSD-07 | Muestra para granulometría | PTO-D01-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D01-MET-0008 | D01-MET-08 | Muestra metalúrgica | PTO-D01-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D01-SOL-0009 | D01-SOL-09 | Muestra de solución/proceso | PTO-D01-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D01-CUS-0010 | D01-CUS-10 | Control de cadena de custodia | PTO-D01-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D02 — Trituración Primaria

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D02-CMP-0011 | D02-CMP-01 | Muestra compuesta de proceso | PTO-D02-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D02-GRB-0012 | D02-GRB-02 | Muestra puntual / grab | PTO-D02-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D02-DUP-0013 | D02-DUP-03 | Duplicado de campo | PTO-D02-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D02-BLK-0014 | D02-BLK-04 | Blanco de campo | PTO-D02-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D02-CRM-0015 | D02-CRM-05 | Material de referencia certificado | PTO-D02-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D02-HUM-0016 | D02-HUM-06 | Muestra para humedad | PTO-D02-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D02-PSD-0017 | D02-PSD-07 | Muestra para granulometría | PTO-D02-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D02-MET-0018 | D02-MET-08 | Muestra metalúrgica | PTO-D02-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D02-SOL-0019 | D02-SOL-09 | Muestra de solución/proceso | PTO-D02-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D02-CUS-0020 | D02-CUS-10 | Control de cadena de custodia | PTO-D02-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D03 — Cribado

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D03-CMP-0021 | D03-CMP-01 | Muestra compuesta de proceso | PTO-D03-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D03-GRB-0022 | D03-GRB-02 | Muestra puntual / grab | PTO-D03-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D03-DUP-0023 | D03-DUP-03 | Duplicado de campo | PTO-D03-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D03-BLK-0024 | D03-BLK-04 | Blanco de campo | PTO-D03-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D03-CRM-0025 | D03-CRM-05 | Material de referencia certificado | PTO-D03-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D03-HUM-0026 | D03-HUM-06 | Muestra para humedad | PTO-D03-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D03-PSD-0027 | D03-PSD-07 | Muestra para granulometría | PTO-D03-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D03-MET-0028 | D03-MET-08 | Muestra metalúrgica | PTO-D03-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D03-SOL-0029 | D03-SOL-09 | Muestra de solución/proceso | PTO-D03-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D03-CUS-0030 | D03-CUS-10 | Control de cadena de custodia | PTO-D03-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D04 — Trituración Secundaria

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D04-CMP-0031 | D04-CMP-01 | Muestra compuesta de proceso | PTO-D04-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D04-GRB-0032 | D04-GRB-02 | Muestra puntual / grab | PTO-D04-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D04-DUP-0033 | D04-DUP-03 | Duplicado de campo | PTO-D04-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D04-BLK-0034 | D04-BLK-04 | Blanco de campo | PTO-D04-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D04-CRM-0035 | D04-CRM-05 | Material de referencia certificado | PTO-D04-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D04-HUM-0036 | D04-HUM-06 | Muestra para humedad | PTO-D04-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D04-PSD-0037 | D04-PSD-07 | Muestra para granulometría | PTO-D04-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D04-MET-0038 | D04-MET-08 | Muestra metalúrgica | PTO-D04-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D04-SOL-0039 | D04-SOL-09 | Muestra de solución/proceso | PTO-D04-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D04-CUS-0040 | D04-CUS-10 | Control de cadena de custodia | PTO-D04-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D05 — Transporte / Silos

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D05-CMP-0041 | D05-CMP-01 | Muestra compuesta de proceso | PTO-D05-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D05-GRB-0042 | D05-GRB-02 | Muestra puntual / grab | PTO-D05-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D05-DUP-0043 | D05-DUP-03 | Duplicado de campo | PTO-D05-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D05-BLK-0044 | D05-BLK-04 | Blanco de campo | PTO-D05-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D05-CRM-0045 | D05-CRM-05 | Material de referencia certificado | PTO-D05-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D05-HUM-0046 | D05-HUM-06 | Muestra para humedad | PTO-D05-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D05-PSD-0047 | D05-PSD-07 | Muestra para granulometría | PTO-D05-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D05-MET-0048 | D05-MET-08 | Muestra metalúrgica | PTO-D05-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D05-SOL-0049 | D05-SOL-09 | Muestra de solución/proceso | PTO-D05-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D05-CUS-0050 | D05-CUS-10 | Control de cadena de custodia | PTO-D05-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D06 — Molienda Primaria

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D06-CMP-0051 | D06-CMP-01 | Muestra compuesta de proceso | PTO-D06-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D06-GRB-0052 | D06-GRB-02 | Muestra puntual / grab | PTO-D06-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D06-DUP-0053 | D06-DUP-03 | Duplicado de campo | PTO-D06-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D06-BLK-0054 | D06-BLK-04 | Blanco de campo | PTO-D06-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D06-CRM-0055 | D06-CRM-05 | Material de referencia certificado | PTO-D06-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D06-HUM-0056 | D06-HUM-06 | Muestra para humedad | PTO-D06-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D06-PSD-0057 | D06-PSD-07 | Muestra para granulometría | PTO-D06-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D06-MET-0058 | D06-MET-08 | Muestra metalúrgica | PTO-D06-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D06-SOL-0059 | D06-SOL-09 | Muestra de solución/proceso | PTO-D06-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D06-CUS-0060 | D06-CUS-10 | Control de cadena de custodia | PTO-D06-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D07 — Molienda Secundaria

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D07-CMP-0061 | D07-CMP-01 | Muestra compuesta de proceso | PTO-D07-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D07-GRB-0062 | D07-GRB-02 | Muestra puntual / grab | PTO-D07-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D07-DUP-0063 | D07-DUP-03 | Duplicado de campo | PTO-D07-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D07-BLK-0064 | D07-BLK-04 | Blanco de campo | PTO-D07-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D07-CRM-0065 | D07-CRM-05 | Material de referencia certificado | PTO-D07-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D07-HUM-0066 | D07-HUM-06 | Muestra para humedad | PTO-D07-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D07-PSD-0067 | D07-PSD-07 | Muestra para granulometría | PTO-D07-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D07-MET-0068 | D07-MET-08 | Muestra metalúrgica | PTO-D07-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D07-SOL-0069 | D07-SOL-09 | Muestra de solución/proceso | PTO-D07-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D07-CUS-0070 | D07-CUS-10 | Control de cadena de custodia | PTO-D07-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D08 — Clasificación

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D08-CMP-0071 | D08-CMP-01 | Muestra compuesta de proceso | PTO-D08-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D08-GRB-0072 | D08-GRB-02 | Muestra puntual / grab | PTO-D08-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D08-DUP-0073 | D08-DUP-03 | Duplicado de campo | PTO-D08-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D08-BLK-0074 | D08-BLK-04 | Blanco de campo | PTO-D08-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D08-CRM-0075 | D08-CRM-05 | Material de referencia certificado | PTO-D08-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D08-HUM-0076 | D08-HUM-06 | Muestra para humedad | PTO-D08-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D08-PSD-0077 | D08-PSD-07 | Muestra para granulometría | PTO-D08-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D08-MET-0078 | D08-MET-08 | Muestra metalúrgica | PTO-D08-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D08-SOL-0079 | D08-SOL-09 | Muestra de solución/proceso | PTO-D08-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D08-CUS-0080 | D08-CUS-10 | Control de cadena de custodia | PTO-D08-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D09 — Pre-lixiviación

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D09-CMP-0081 | D09-CMP-01 | Muestra compuesta de proceso | PTO-D09-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D09-GRB-0082 | D09-GRB-02 | Muestra puntual / grab | PTO-D09-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D09-DUP-0083 | D09-DUP-03 | Duplicado de campo | PTO-D09-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D09-BLK-0084 | D09-BLK-04 | Blanco de campo | PTO-D09-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D09-CRM-0085 | D09-CRM-05 | Material de referencia certificado | PTO-D09-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D09-HUM-0086 | D09-HUM-06 | Muestra para humedad | PTO-D09-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D09-PSD-0087 | D09-PSD-07 | Muestra para granulometría | PTO-D09-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D09-MET-0088 | D09-MET-08 | Muestra metalúrgica | PTO-D09-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D09-SOL-0089 | D09-SOL-09 | Muestra de solución/proceso | PTO-D09-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D09-CUS-0090 | D09-CUS-10 | Control de cadena de custodia | PTO-D09-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D10 — Espesamiento

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D10-CMP-0091 | D10-CMP-01 | Muestra compuesta de proceso | PTO-D10-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D10-GRB-0092 | D10-GRB-02 | Muestra puntual / grab | PTO-D10-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D10-DUP-0093 | D10-DUP-03 | Duplicado de campo | PTO-D10-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D10-BLK-0094 | D10-BLK-04 | Blanco de campo | PTO-D10-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D10-CRM-0095 | D10-CRM-05 | Material de referencia certificado | PTO-D10-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D10-HUM-0096 | D10-HUM-06 | Muestra para humedad | PTO-D10-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D10-PSD-0097 | D10-PSD-07 | Muestra para granulometría | PTO-D10-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D10-MET-0098 | D10-MET-08 | Muestra metalúrgica | PTO-D10-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D10-SOL-0099 | D10-SOL-09 | Muestra de solución/proceso | PTO-D10-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D10-CUS-0100 | D10-CUS-10 | Control de cadena de custodia | PTO-D10-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D11 — Lixiviación / CIL

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D11-CMP-0101 | D11-CMP-01 | Muestra compuesta de proceso | PTO-D11-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D11-GRB-0102 | D11-GRB-02 | Muestra puntual / grab | PTO-D11-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D11-DUP-0103 | D11-DUP-03 | Duplicado de campo | PTO-D11-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D11-BLK-0104 | D11-BLK-04 | Blanco de campo | PTO-D11-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D11-CRM-0105 | D11-CRM-05 | Material de referencia certificado | PTO-D11-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D11-HUM-0106 | D11-HUM-06 | Muestra para humedad | PTO-D11-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D11-PSD-0107 | D11-PSD-07 | Muestra para granulometría | PTO-D11-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D11-MET-0108 | D11-MET-08 | Muestra metalúrgica | PTO-D11-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D11-SOL-0109 | D11-SOL-09 | Muestra de solución/proceso | PTO-D11-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D11-CUS-0110 | D11-CUS-10 | Control de cadena de custodia | PTO-D11-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D12 — Adsorción CIP

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D12-CMP-0111 | D12-CMP-01 | Muestra compuesta de proceso | PTO-D12-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D12-GRB-0112 | D12-GRB-02 | Muestra puntual / grab | PTO-D12-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D12-DUP-0113 | D12-DUP-03 | Duplicado de campo | PTO-D12-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D12-BLK-0114 | D12-BLK-04 | Blanco de campo | PTO-D12-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D12-CRM-0115 | D12-CRM-05 | Material de referencia certificado | PTO-D12-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D12-HUM-0116 | D12-HUM-06 | Muestra para humedad | PTO-D12-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D12-PSD-0117 | D12-PSD-07 | Muestra para granulometría | PTO-D12-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D12-MET-0118 | D12-MET-08 | Muestra metalúrgica | PTO-D12-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D12-SOL-0119 | D12-SOL-09 | Muestra de solución/proceso | PTO-D12-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D12-CUS-0120 | D12-CUS-10 | Control de cadena de custodia | PTO-D12-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D13-CMP-0121 | D13-CMP-01 | Muestra compuesta de proceso | PTO-D13-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D13-GRB-0122 | D13-GRB-02 | Muestra puntual / grab | PTO-D13-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D13-DUP-0123 | D13-DUP-03 | Duplicado de campo | PTO-D13-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D13-BLK-0124 | D13-BLK-04 | Blanco de campo | PTO-D13-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D13-CRM-0125 | D13-CRM-05 | Material de referencia certificado | PTO-D13-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D13-HUM-0126 | D13-HUM-06 | Muestra para humedad | PTO-D13-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D13-PSD-0127 | D13-PSD-07 | Muestra para granulometría | PTO-D13-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D13-MET-0128 | D13-MET-08 | Muestra metalúrgica | PTO-D13-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D13-SOL-0129 | D13-SOL-09 | Muestra de solución/proceso | PTO-D13-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D13-CUS-0130 | D13-CUS-10 | Control de cadena de custodia | PTO-D13-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D14 — Elución / Desorción

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D14-CMP-0131 | D14-CMP-01 | Muestra compuesta de proceso | PTO-D14-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D14-GRB-0132 | D14-GRB-02 | Muestra puntual / grab | PTO-D14-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D14-DUP-0133 | D14-DUP-03 | Duplicado de campo | PTO-D14-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D14-BLK-0134 | D14-BLK-04 | Blanco de campo | PTO-D14-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D14-CRM-0135 | D14-CRM-05 | Material de referencia certificado | PTO-D14-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D14-HUM-0136 | D14-HUM-06 | Muestra para humedad | PTO-D14-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D14-PSD-0137 | D14-PSD-07 | Muestra para granulometría | PTO-D14-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D14-MET-0138 | D14-MET-08 | Muestra metalúrgica | PTO-D14-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D14-SOL-0139 | D14-SOL-09 | Muestra de solución/proceso | PTO-D14-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D14-CUS-0140 | D14-CUS-10 | Control de cadena de custodia | PTO-D14-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D15 — Electrowinning

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D15-CMP-0141 | D15-CMP-01 | Muestra compuesta de proceso | PTO-D15-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D15-GRB-0142 | D15-GRB-02 | Muestra puntual / grab | PTO-D15-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D15-DUP-0143 | D15-DUP-03 | Duplicado de campo | PTO-D15-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D15-BLK-0144 | D15-BLK-04 | Blanco de campo | PTO-D15-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D15-CRM-0145 | D15-CRM-05 | Material de referencia certificado | PTO-D15-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D15-HUM-0146 | D15-HUM-06 | Muestra para humedad | PTO-D15-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D15-PSD-0147 | D15-PSD-07 | Muestra para granulometría | PTO-D15-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D15-MET-0148 | D15-MET-08 | Muestra metalúrgica | PTO-D15-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D15-SOL-0149 | D15-SOL-09 | Muestra de solución/proceso | PTO-D15-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D15-CUS-0150 | D15-CUS-10 | Control de cadena de custodia | PTO-D15-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D16 — Calcinación / Secado

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D16-CMP-0151 | D16-CMP-01 | Muestra compuesta de proceso | PTO-D16-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D16-GRB-0152 | D16-GRB-02 | Muestra puntual / grab | PTO-D16-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D16-DUP-0153 | D16-DUP-03 | Duplicado de campo | PTO-D16-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D16-BLK-0154 | D16-BLK-04 | Blanco de campo | PTO-D16-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D16-CRM-0155 | D16-CRM-05 | Material de referencia certificado | PTO-D16-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D16-HUM-0156 | D16-HUM-06 | Muestra para humedad | PTO-D16-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D16-PSD-0157 | D16-PSD-07 | Muestra para granulometría | PTO-D16-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D16-MET-0158 | D16-MET-08 | Muestra metalúrgica | PTO-D16-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D16-SOL-0159 | D16-SOL-09 | Muestra de solución/proceso | PTO-D16-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D16-CUS-0160 | D16-CUS-10 | Control de cadena de custodia | PTO-D16-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D17 — Fundición

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D17-CMP-0161 | D17-CMP-01 | Muestra compuesta de proceso | PTO-D17-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D17-GRB-0162 | D17-GRB-02 | Muestra puntual / grab | PTO-D17-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D17-DUP-0163 | D17-DUP-03 | Duplicado de campo | PTO-D17-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D17-BLK-0164 | D17-BLK-04 | Blanco de campo | PTO-D17-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D17-CRM-0165 | D17-CRM-05 | Material de referencia certificado | PTO-D17-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D17-HUM-0166 | D17-HUM-06 | Muestra para humedad | PTO-D17-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D17-PSD-0167 | D17-PSD-07 | Muestra para granulometría | PTO-D17-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D17-MET-0168 | D17-MET-08 | Muestra metalúrgica | PTO-D17-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D17-SOL-0169 | D17-SOL-09 | Muestra de solución/proceso | PTO-D17-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D17-CUS-0170 | D17-CUS-10 | Control de cadena de custodia | PTO-D17-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

Los registros representan **muestras y controles de muestreo**, no resultados analíticos. Todo resultado debe residir en FUR-LAB.

| # | Código FUR | Código muestra | Entidad | Punto | Masa/volumen | Tipo | Ensayos solicitados | Cadena de custodia | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CC-D18-CMP-0171 | D18-CMP-01 | Muestra compuesta de proceso | PTO-D18-01 | 500 g | Compuesta | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 2 | FUR-CC-D18-GRB-0172 | D18-GRB-02 | Muestra puntual / grab | PTO-D18-02 | 250 g | Puntual | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 3 | FUR-CC-D18-DUP-0173 | D18-DUP-03 | Duplicado de campo | PTO-D18-03 | 250 g | Duplicado QA/QC | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 4 | FUR-CC-D18-BLK-0174 | D18-BLK-04 | Blanco de campo | PTO-D18-04 | 250 g | Blanco QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 5 | FUR-CC-D18-CRM-0175 | D18-CRM-05 | Material de referencia certificado | PTO-D18-05 | 100 g | CRM QA/QC | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 6 | FUR-CC-D18-HUM-0176 | D18-HUM-06 | Muestra para humedad | PTO-D18-06 | 500 g | Humedad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 7 | FUR-CC-D18-PSD-0177 | D18-PSD-07 | Muestra para granulometría | PTO-D18-07 | 1 kg | PSD/P80 | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 8 | FUR-CC-D18-MET-0178 | D18-MET-08 | Muestra metalúrgica | PTO-D18-08 | 2 kg | Prueba metalúrgica | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 9 | FUR-CC-D18-SOL-0179 | D18-SOL-09 | Muestra de solución/proceso | PTO-D18-09 | 500 mL | Solución según aplicabilidad | Au/Ag + humedad + granulometría | Cadena abierta → recibida → cerrada | Referencial | D1 |
| 10 | FUR-CC-D18-CUS-0180 | D18-CUS-10 | Control de cadena de custodia | PTO-D18-10 | 1 expediente | Custodia | QA/QC / control | Cadena abierta → recibida → cerrada | Referencial | D1 |

# 58. CATÁLOGO REFERENCIAL FUR-LAB POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D01-AU-0001 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D01-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D01-AG-0002 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D01-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D01-ICP-0003 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D01-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D01-HUM-0004 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D01-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D01-PSD-0005 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D01-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D01-PH-0006 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D01-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D01-CN-0007 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D01-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D01-CAR-0008 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D01-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D01-DEN-0009 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D01-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D01-MET-0010 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D01-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D02 — Trituración Primaria

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D02-AU-0011 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D02-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D02-AG-0012 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D02-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D02-ICP-0013 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D02-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D02-HUM-0014 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D02-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D02-PSD-0015 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D02-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D02-PH-0016 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D02-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D02-CN-0017 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D02-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D02-CAR-0018 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D02-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D02-DEN-0019 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D02-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D02-MET-0020 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D02-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D03 — Cribado

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D03-AU-0021 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D03-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D03-AG-0022 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D03-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D03-ICP-0023 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D03-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D03-HUM-0024 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D03-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D03-PSD-0025 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D03-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D03-PH-0026 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D03-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D03-CN-0027 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D03-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D03-CAR-0028 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D03-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D03-DEN-0029 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D03-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D03-MET-0030 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D03-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D04 — Trituración Secundaria

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D04-AU-0031 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D04-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D04-AG-0032 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D04-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D04-ICP-0033 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D04-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D04-HUM-0034 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D04-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D04-PSD-0035 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D04-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D04-PH-0036 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D04-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D04-CN-0037 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D04-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D04-CAR-0038 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D04-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D04-DEN-0039 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D04-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D04-MET-0040 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D04-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D05 — Transporte / Silos

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D05-AU-0041 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D05-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D05-AG-0042 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D05-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D05-ICP-0043 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D05-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D05-HUM-0044 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D05-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D05-PSD-0045 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D05-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D05-PH-0046 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D05-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D05-CN-0047 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D05-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D05-CAR-0048 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D05-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D05-DEN-0049 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D05-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D05-MET-0050 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D05-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D06 — Molienda Primaria

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D06-AU-0051 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D06-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D06-AG-0052 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D06-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D06-ICP-0053 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D06-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D06-HUM-0054 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D06-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D06-PSD-0055 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D06-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D06-PH-0056 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D06-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D06-CN-0057 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D06-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D06-CAR-0058 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D06-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D06-DEN-0059 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D06-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D06-MET-0060 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D06-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D07 — Molienda Secundaria

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D07-AU-0061 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D07-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D07-AG-0062 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D07-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D07-ICP-0063 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D07-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D07-HUM-0064 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D07-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D07-PSD-0065 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D07-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D07-PH-0066 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D07-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D07-CN-0067 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D07-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D07-CAR-0068 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D07-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D07-DEN-0069 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D07-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D07-MET-0070 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D07-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D08 — Clasificación

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D08-AU-0071 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D08-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D08-AG-0072 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D08-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D08-ICP-0073 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D08-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D08-HUM-0074 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D08-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D08-PSD-0075 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D08-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D08-PH-0076 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D08-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D08-CN-0077 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D08-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D08-CAR-0078 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D08-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D08-DEN-0079 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D08-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D08-MET-0080 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D08-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D09 — Pre-lixiviación

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D09-AU-0081 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D09-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D09-AG-0082 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D09-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D09-ICP-0083 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D09-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D09-HUM-0084 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D09-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D09-PSD-0085 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D09-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D09-PH-0086 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D09-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D09-CN-0087 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D09-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D09-CAR-0088 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D09-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D09-DEN-0089 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D09-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D09-MET-0090 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D09-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D10 — Espesamiento

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D10-AU-0091 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D10-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D10-AG-0092 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D10-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D10-ICP-0093 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D10-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D10-HUM-0094 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D10-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D10-PSD-0095 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D10-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D10-PH-0096 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D10-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D10-CN-0097 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D10-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D10-CAR-0098 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D10-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D10-DEN-0099 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D10-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D10-MET-0100 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D10-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D11 — Lixiviación / CIL

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D11-AU-0101 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D11-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D11-AG-0102 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D11-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D11-ICP-0103 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D11-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D11-HUM-0104 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D11-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D11-PSD-0105 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D11-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D11-PH-0106 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D11-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D11-CN-0107 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D11-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D11-CAR-0108 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D11-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D11-DEN-0109 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D11-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D11-MET-0110 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D11-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D12 — Adsorción CIP

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D12-AU-0111 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D12-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D12-AG-0112 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D12-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D12-ICP-0113 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D12-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D12-HUM-0114 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D12-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D12-PSD-0115 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D12-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D12-PH-0116 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D12-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D12-CN-0117 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D12-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D12-CAR-0118 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D12-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D12-DEN-0119 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D12-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D12-MET-0120 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D12-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D13-AU-0121 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D13-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D13-AG-0122 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D13-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D13-ICP-0123 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D13-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D13-HUM-0124 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D13-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D13-PSD-0125 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D13-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D13-PH-0126 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D13-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D13-CN-0127 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D13-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D13-CAR-0128 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D13-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D13-DEN-0129 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D13-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D13-MET-0130 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D13-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D14 — Elución / Desorción

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D14-AU-0131 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D14-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D14-AG-0132 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D14-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D14-ICP-0133 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D14-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D14-HUM-0134 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D14-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D14-PSD-0135 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D14-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D14-PH-0136 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D14-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D14-CN-0137 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D14-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D14-CAR-0138 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D14-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D14-DEN-0139 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D14-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D14-MET-0140 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D14-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D15 — Electrowinning

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D15-AU-0141 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D15-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D15-AG-0142 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D15-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D15-ICP-0143 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D15-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D15-HUM-0144 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D15-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D15-PSD-0145 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D15-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D15-PH-0146 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D15-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D15-CN-0147 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D15-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D15-CAR-0148 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D15-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D15-DEN-0149 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D15-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D15-MET-0150 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D15-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D16 — Calcinación / Secado

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D16-AU-0151 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D16-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D16-AG-0152 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D16-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D16-ICP-0153 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D16-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D16-HUM-0154 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D16-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D16-PSD-0155 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D16-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D16-PH-0156 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D16-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D16-CN-0157 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D16-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D16-CAR-0158 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D16-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D16-DEN-0159 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D16-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D16-MET-0160 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D16-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D17 — Fundición

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D17-AU-0161 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D17-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D17-AG-0162 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D17-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D17-ICP-0163 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D17-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D17-HUM-0164 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D17-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D17-PSD-0165 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D17-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D17-PH-0166 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D17-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D17-CN-0167 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D17-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D17-CAR-0168 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D17-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D17-DEN-0169 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D17-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D17-MET-0170 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D17-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

Cada registro debe vincularse 1:N con una FUR-CC exacta y conservar método, equipo, QA/QC, unidades, fecha y aprobación.

| # | Código FUR | Análisis | Técnica | Método/SOP | FUR-CC origen | Resultado referencial | Unidad | QA/QC | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-LAB-D18-AU-0171 | Ensayo de oro | Fire Assay + AAS/gravimetría | SOP-AU-REV.TBC | FUR-CC-D18-REF-01 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 2 | FUR-LAB-D18-AG-0172 | Ensayo de plata | AAS/ICP | SOP-AG-REV.TBC | FUR-CC-D18-REF-02 | Valor numérico TBC | g/t | QA/QC pendiente validación | Referencial | D1 |
| 3 | FUR-LAB-D18-ICP-0173 | Análisis multielemental | ICP-OES | SOP-ICP-REV.TBC | FUR-CC-D18-REF-03 | Valor numérico TBC | mg/L o % | QA/QC pendiente validación | Referencial | D1 |
| 4 | FUR-LAB-D18-HUM-0174 | Determinación de humedad | Gravimetría | SOP-HUM-REV.TBC | FUR-CC-D18-REF-04 | Valor numérico TBC | % | QA/QC pendiente validación | Referencial | D1 |
| 5 | FUR-LAB-D18-PSD-0175 | Análisis granulométrico | Tamizado/láser | SOP-PSD-REV.TBC | FUR-CC-D18-REF-05 | Valor numérico TBC | µm | QA/QC pendiente validación | Referencial | D1 |
| 6 | FUR-LAB-D18-PH-0176 | Medición pH/ORP | Electroquímica | SOP-PH-REV.TBC | FUR-CC-D18-REF-06 | Valor numérico TBC | pH/mV | QA/QC pendiente validación | Referencial | D1 |
| 7 | FUR-LAB-D18-CN-0177 | Cianuro libre/WAD | Titulación/ISE | SOP-CN-REV.TBC | FUR-CC-D18-REF-07 | Valor numérico TBC | mg/L | QA/QC pendiente validación | Referencial | D1 |
| 8 | FUR-LAB-D18-CAR-0178 | Actividad/carga de carbón | Ensayo carbón | SOP-CAR-REV.TBC | FUR-CC-D18-REF-08 | Valor numérico TBC | %/g/t | QA/QC pendiente validación | Referencial | D1 |
| 9 | FUR-LAB-D18-DEN-0179 | Densidad/sólidos | Picnometría/densidad | SOP-DEN-REV.TBC | FUR-CC-D18-REF-09 | Valor numérico TBC | % sólidos | QA/QC pendiente validación | Referencial | D1 |
| 10 | FUR-LAB-D18-MET-0180 | Prueba metalúrgica | Bottle roll/leach/kinetics | SOP-MET-REV.TBC | FUR-CC-D18-REF-10 | Recuperación/cinética TBC | % rec./h | QA/QC pendiente validación | Referencial | D1 |

# 59. CATÁLOGO REFERENCIAL FUR-MNT POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D01-PM-0001 | Plan preventivo del activo crítico | ACTIVO-D01-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 2 | FUR-MNT-D01-PDM-0002 | Ruta predictiva | ACTIVO-D01-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D01 | Referencial | D1 |
| 3 | FUR-MNT-D01-LUB-0003 | Plan de lubricación | ACTIVO-D01-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 4 | FUR-MNT-D01-INS-0004 | Inspección operacional | ACTIVO-D01-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 5 | FUR-MNT-D01-BOM-0005 | BOM de repuestos | ACTIVO-D01-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 6 | FUR-MNT-D01-SPR-0006 | Repuesto crítico | ACTIVO-D01-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 7 | FUR-MNT-D01-FME-0007 | Modo de falla | ACTIVO-D01-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D01 | Referencial | D1 |
| 8 | FUR-MNT-D01-WOT-0008 | Plantilla de orden de trabajo | ACTIVO-D01-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 9 | FUR-MNT-D01-CAL-0009 | Calibración/alineación técnica | ACTIVO-D01-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D01 | Referencial | D1 |
| 10 | FUR-MNT-D01-REL-0010 | Registro de confiabilidad | ACTIVO-D01-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D01 | Referencial | D1 |

## D02 — Trituración Primaria

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D02-PM-0011 | Plan preventivo del activo crítico | ACTIVO-D02-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 2 | FUR-MNT-D02-PDM-0012 | Ruta predictiva | ACTIVO-D02-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D02 | Referencial | D1 |
| 3 | FUR-MNT-D02-LUB-0013 | Plan de lubricación | ACTIVO-D02-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 4 | FUR-MNT-D02-INS-0014 | Inspección operacional | ACTIVO-D02-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 5 | FUR-MNT-D02-BOM-0015 | BOM de repuestos | ACTIVO-D02-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 6 | FUR-MNT-D02-SPR-0016 | Repuesto crítico | ACTIVO-D02-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 7 | FUR-MNT-D02-FME-0017 | Modo de falla | ACTIVO-D02-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D02 | Referencial | D1 |
| 8 | FUR-MNT-D02-WOT-0018 | Plantilla de orden de trabajo | ACTIVO-D02-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 9 | FUR-MNT-D02-CAL-0019 | Calibración/alineación técnica | ACTIVO-D02-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D02 | Referencial | D1 |
| 10 | FUR-MNT-D02-REL-0020 | Registro de confiabilidad | ACTIVO-D02-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D02 | Referencial | D1 |

## D03 — Cribado

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D03-PM-0021 | Plan preventivo del activo crítico | ACTIVO-D03-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 2 | FUR-MNT-D03-PDM-0022 | Ruta predictiva | ACTIVO-D03-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D03 | Referencial | D1 |
| 3 | FUR-MNT-D03-LUB-0023 | Plan de lubricación | ACTIVO-D03-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 4 | FUR-MNT-D03-INS-0024 | Inspección operacional | ACTIVO-D03-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 5 | FUR-MNT-D03-BOM-0025 | BOM de repuestos | ACTIVO-D03-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 6 | FUR-MNT-D03-SPR-0026 | Repuesto crítico | ACTIVO-D03-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 7 | FUR-MNT-D03-FME-0027 | Modo de falla | ACTIVO-D03-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D03 | Referencial | D1 |
| 8 | FUR-MNT-D03-WOT-0028 | Plantilla de orden de trabajo | ACTIVO-D03-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 9 | FUR-MNT-D03-CAL-0029 | Calibración/alineación técnica | ACTIVO-D03-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D03 | Referencial | D1 |
| 10 | FUR-MNT-D03-REL-0030 | Registro de confiabilidad | ACTIVO-D03-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D03 | Referencial | D1 |

## D04 — Trituración Secundaria

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D04-PM-0031 | Plan preventivo del activo crítico | ACTIVO-D04-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 2 | FUR-MNT-D04-PDM-0032 | Ruta predictiva | ACTIVO-D04-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D04 | Referencial | D1 |
| 3 | FUR-MNT-D04-LUB-0033 | Plan de lubricación | ACTIVO-D04-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 4 | FUR-MNT-D04-INS-0034 | Inspección operacional | ACTIVO-D04-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 5 | FUR-MNT-D04-BOM-0035 | BOM de repuestos | ACTIVO-D04-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 6 | FUR-MNT-D04-SPR-0036 | Repuesto crítico | ACTIVO-D04-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 7 | FUR-MNT-D04-FME-0037 | Modo de falla | ACTIVO-D04-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D04 | Referencial | D1 |
| 8 | FUR-MNT-D04-WOT-0038 | Plantilla de orden de trabajo | ACTIVO-D04-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 9 | FUR-MNT-D04-CAL-0039 | Calibración/alineación técnica | ACTIVO-D04-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D04 | Referencial | D1 |
| 10 | FUR-MNT-D04-REL-0040 | Registro de confiabilidad | ACTIVO-D04-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D04 | Referencial | D1 |

## D05 — Transporte / Silos

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D05-PM-0041 | Plan preventivo del activo crítico | ACTIVO-D05-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 2 | FUR-MNT-D05-PDM-0042 | Ruta predictiva | ACTIVO-D05-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D05 | Referencial | D1 |
| 3 | FUR-MNT-D05-LUB-0043 | Plan de lubricación | ACTIVO-D05-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 4 | FUR-MNT-D05-INS-0044 | Inspección operacional | ACTIVO-D05-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 5 | FUR-MNT-D05-BOM-0045 | BOM de repuestos | ACTIVO-D05-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 6 | FUR-MNT-D05-SPR-0046 | Repuesto crítico | ACTIVO-D05-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 7 | FUR-MNT-D05-FME-0047 | Modo de falla | ACTIVO-D05-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D05 | Referencial | D1 |
| 8 | FUR-MNT-D05-WOT-0048 | Plantilla de orden de trabajo | ACTIVO-D05-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 9 | FUR-MNT-D05-CAL-0049 | Calibración/alineación técnica | ACTIVO-D05-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D05 | Referencial | D1 |
| 10 | FUR-MNT-D05-REL-0050 | Registro de confiabilidad | ACTIVO-D05-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D05 | Referencial | D1 |

## D06 — Molienda Primaria

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D06-PM-0051 | Plan preventivo del activo crítico | ACTIVO-D06-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 2 | FUR-MNT-D06-PDM-0052 | Ruta predictiva | ACTIVO-D06-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D06 | Referencial | D1 |
| 3 | FUR-MNT-D06-LUB-0053 | Plan de lubricación | ACTIVO-D06-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 4 | FUR-MNT-D06-INS-0054 | Inspección operacional | ACTIVO-D06-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 5 | FUR-MNT-D06-BOM-0055 | BOM de repuestos | ACTIVO-D06-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 6 | FUR-MNT-D06-SPR-0056 | Repuesto crítico | ACTIVO-D06-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 7 | FUR-MNT-D06-FME-0057 | Modo de falla | ACTIVO-D06-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D06 | Referencial | D1 |
| 8 | FUR-MNT-D06-WOT-0058 | Plantilla de orden de trabajo | ACTIVO-D06-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 9 | FUR-MNT-D06-CAL-0059 | Calibración/alineación técnica | ACTIVO-D06-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D06 | Referencial | D1 |
| 10 | FUR-MNT-D06-REL-0060 | Registro de confiabilidad | ACTIVO-D06-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D06 | Referencial | D1 |

## D07 — Molienda Secundaria

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D07-PM-0061 | Plan preventivo del activo crítico | ACTIVO-D07-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 2 | FUR-MNT-D07-PDM-0062 | Ruta predictiva | ACTIVO-D07-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D07 | Referencial | D1 |
| 3 | FUR-MNT-D07-LUB-0063 | Plan de lubricación | ACTIVO-D07-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 4 | FUR-MNT-D07-INS-0064 | Inspección operacional | ACTIVO-D07-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 5 | FUR-MNT-D07-BOM-0065 | BOM de repuestos | ACTIVO-D07-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 6 | FUR-MNT-D07-SPR-0066 | Repuesto crítico | ACTIVO-D07-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 7 | FUR-MNT-D07-FME-0067 | Modo de falla | ACTIVO-D07-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D07 | Referencial | D1 |
| 8 | FUR-MNT-D07-WOT-0068 | Plantilla de orden de trabajo | ACTIVO-D07-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 9 | FUR-MNT-D07-CAL-0069 | Calibración/alineación técnica | ACTIVO-D07-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D07 | Referencial | D1 |
| 10 | FUR-MNT-D07-REL-0070 | Registro de confiabilidad | ACTIVO-D07-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D07 | Referencial | D1 |

## D08 — Clasificación

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D08-PM-0071 | Plan preventivo del activo crítico | ACTIVO-D08-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 2 | FUR-MNT-D08-PDM-0072 | Ruta predictiva | ACTIVO-D08-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D08 | Referencial | D1 |
| 3 | FUR-MNT-D08-LUB-0073 | Plan de lubricación | ACTIVO-D08-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 4 | FUR-MNT-D08-INS-0074 | Inspección operacional | ACTIVO-D08-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 5 | FUR-MNT-D08-BOM-0075 | BOM de repuestos | ACTIVO-D08-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 6 | FUR-MNT-D08-SPR-0076 | Repuesto crítico | ACTIVO-D08-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 7 | FUR-MNT-D08-FME-0077 | Modo de falla | ACTIVO-D08-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D08 | Referencial | D1 |
| 8 | FUR-MNT-D08-WOT-0078 | Plantilla de orden de trabajo | ACTIVO-D08-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 9 | FUR-MNT-D08-CAL-0079 | Calibración/alineación técnica | ACTIVO-D08-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D08 | Referencial | D1 |
| 10 | FUR-MNT-D08-REL-0080 | Registro de confiabilidad | ACTIVO-D08-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D08 | Referencial | D1 |

## D09 — Pre-lixiviación

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D09-PM-0081 | Plan preventivo del activo crítico | ACTIVO-D09-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 2 | FUR-MNT-D09-PDM-0082 | Ruta predictiva | ACTIVO-D09-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D09 | Referencial | D1 |
| 3 | FUR-MNT-D09-LUB-0083 | Plan de lubricación | ACTIVO-D09-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 4 | FUR-MNT-D09-INS-0084 | Inspección operacional | ACTIVO-D09-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 5 | FUR-MNT-D09-BOM-0085 | BOM de repuestos | ACTIVO-D09-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 6 | FUR-MNT-D09-SPR-0086 | Repuesto crítico | ACTIVO-D09-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 7 | FUR-MNT-D09-FME-0087 | Modo de falla | ACTIVO-D09-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D09 | Referencial | D1 |
| 8 | FUR-MNT-D09-WOT-0088 | Plantilla de orden de trabajo | ACTIVO-D09-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 9 | FUR-MNT-D09-CAL-0089 | Calibración/alineación técnica | ACTIVO-D09-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D09 | Referencial | D1 |
| 10 | FUR-MNT-D09-REL-0090 | Registro de confiabilidad | ACTIVO-D09-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D09 | Referencial | D1 |

## D10 — Espesamiento

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D10-PM-0091 | Plan preventivo del activo crítico | ACTIVO-D10-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 2 | FUR-MNT-D10-PDM-0092 | Ruta predictiva | ACTIVO-D10-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D10 | Referencial | D1 |
| 3 | FUR-MNT-D10-LUB-0093 | Plan de lubricación | ACTIVO-D10-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 4 | FUR-MNT-D10-INS-0094 | Inspección operacional | ACTIVO-D10-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 5 | FUR-MNT-D10-BOM-0095 | BOM de repuestos | ACTIVO-D10-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 6 | FUR-MNT-D10-SPR-0096 | Repuesto crítico | ACTIVO-D10-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 7 | FUR-MNT-D10-FME-0097 | Modo de falla | ACTIVO-D10-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D10 | Referencial | D1 |
| 8 | FUR-MNT-D10-WOT-0098 | Plantilla de orden de trabajo | ACTIVO-D10-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 9 | FUR-MNT-D10-CAL-0099 | Calibración/alineación técnica | ACTIVO-D10-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D10 | Referencial | D1 |
| 10 | FUR-MNT-D10-REL-0100 | Registro de confiabilidad | ACTIVO-D10-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D10 | Referencial | D1 |

## D11 — Lixiviación / CIL

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D11-PM-0101 | Plan preventivo del activo crítico | ACTIVO-D11-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 2 | FUR-MNT-D11-PDM-0102 | Ruta predictiva | ACTIVO-D11-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D11 | Referencial | D1 |
| 3 | FUR-MNT-D11-LUB-0103 | Plan de lubricación | ACTIVO-D11-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 4 | FUR-MNT-D11-INS-0104 | Inspección operacional | ACTIVO-D11-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 5 | FUR-MNT-D11-BOM-0105 | BOM de repuestos | ACTIVO-D11-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 6 | FUR-MNT-D11-SPR-0106 | Repuesto crítico | ACTIVO-D11-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 7 | FUR-MNT-D11-FME-0107 | Modo de falla | ACTIVO-D11-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D11 | Referencial | D1 |
| 8 | FUR-MNT-D11-WOT-0108 | Plantilla de orden de trabajo | ACTIVO-D11-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 9 | FUR-MNT-D11-CAL-0109 | Calibración/alineación técnica | ACTIVO-D11-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D11 | Referencial | D1 |
| 10 | FUR-MNT-D11-REL-0110 | Registro de confiabilidad | ACTIVO-D11-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D11 | Referencial | D1 |

## D12 — Adsorción CIP

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D12-PM-0111 | Plan preventivo del activo crítico | ACTIVO-D12-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 2 | FUR-MNT-D12-PDM-0112 | Ruta predictiva | ACTIVO-D12-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D12 | Referencial | D1 |
| 3 | FUR-MNT-D12-LUB-0113 | Plan de lubricación | ACTIVO-D12-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 4 | FUR-MNT-D12-INS-0114 | Inspección operacional | ACTIVO-D12-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 5 | FUR-MNT-D12-BOM-0115 | BOM de repuestos | ACTIVO-D12-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 6 | FUR-MNT-D12-SPR-0116 | Repuesto crítico | ACTIVO-D12-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 7 | FUR-MNT-D12-FME-0117 | Modo de falla | ACTIVO-D12-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D12 | Referencial | D1 |
| 8 | FUR-MNT-D12-WOT-0118 | Plantilla de orden de trabajo | ACTIVO-D12-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 9 | FUR-MNT-D12-CAL-0119 | Calibración/alineación técnica | ACTIVO-D12-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D12 | Referencial | D1 |
| 10 | FUR-MNT-D12-REL-0120 | Registro de confiabilidad | ACTIVO-D12-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D12 | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D13-PM-0121 | Plan preventivo del activo crítico | ACTIVO-D13-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 2 | FUR-MNT-D13-PDM-0122 | Ruta predictiva | ACTIVO-D13-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D13 | Referencial | D1 |
| 3 | FUR-MNT-D13-LUB-0123 | Plan de lubricación | ACTIVO-D13-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 4 | FUR-MNT-D13-INS-0124 | Inspección operacional | ACTIVO-D13-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 5 | FUR-MNT-D13-BOM-0125 | BOM de repuestos | ACTIVO-D13-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 6 | FUR-MNT-D13-SPR-0126 | Repuesto crítico | ACTIVO-D13-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 7 | FUR-MNT-D13-FME-0127 | Modo de falla | ACTIVO-D13-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D13 | Referencial | D1 |
| 8 | FUR-MNT-D13-WOT-0128 | Plantilla de orden de trabajo | ACTIVO-D13-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 9 | FUR-MNT-D13-CAL-0129 | Calibración/alineación técnica | ACTIVO-D13-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D13 | Referencial | D1 |
| 10 | FUR-MNT-D13-REL-0130 | Registro de confiabilidad | ACTIVO-D13-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D13 | Referencial | D1 |

## D14 — Elución / Desorción

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D14-PM-0131 | Plan preventivo del activo crítico | ACTIVO-D14-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 2 | FUR-MNT-D14-PDM-0132 | Ruta predictiva | ACTIVO-D14-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D14 | Referencial | D1 |
| 3 | FUR-MNT-D14-LUB-0133 | Plan de lubricación | ACTIVO-D14-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 4 | FUR-MNT-D14-INS-0134 | Inspección operacional | ACTIVO-D14-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 5 | FUR-MNT-D14-BOM-0135 | BOM de repuestos | ACTIVO-D14-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 6 | FUR-MNT-D14-SPR-0136 | Repuesto crítico | ACTIVO-D14-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 7 | FUR-MNT-D14-FME-0137 | Modo de falla | ACTIVO-D14-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D14 | Referencial | D1 |
| 8 | FUR-MNT-D14-WOT-0138 | Plantilla de orden de trabajo | ACTIVO-D14-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 9 | FUR-MNT-D14-CAL-0139 | Calibración/alineación técnica | ACTIVO-D14-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D14 | Referencial | D1 |
| 10 | FUR-MNT-D14-REL-0140 | Registro de confiabilidad | ACTIVO-D14-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D14 | Referencial | D1 |

## D15 — Electrowinning

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D15-PM-0141 | Plan preventivo del activo crítico | ACTIVO-D15-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 2 | FUR-MNT-D15-PDM-0142 | Ruta predictiva | ACTIVO-D15-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D15 | Referencial | D1 |
| 3 | FUR-MNT-D15-LUB-0143 | Plan de lubricación | ACTIVO-D15-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 4 | FUR-MNT-D15-INS-0144 | Inspección operacional | ACTIVO-D15-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 5 | FUR-MNT-D15-BOM-0145 | BOM de repuestos | ACTIVO-D15-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 6 | FUR-MNT-D15-SPR-0146 | Repuesto crítico | ACTIVO-D15-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 7 | FUR-MNT-D15-FME-0147 | Modo de falla | ACTIVO-D15-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D15 | Referencial | D1 |
| 8 | FUR-MNT-D15-WOT-0148 | Plantilla de orden de trabajo | ACTIVO-D15-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 9 | FUR-MNT-D15-CAL-0149 | Calibración/alineación técnica | ACTIVO-D15-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D15 | Referencial | D1 |
| 10 | FUR-MNT-D15-REL-0150 | Registro de confiabilidad | ACTIVO-D15-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D15 | Referencial | D1 |

## D16 — Calcinación / Secado

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D16-PM-0151 | Plan preventivo del activo crítico | ACTIVO-D16-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 2 | FUR-MNT-D16-PDM-0152 | Ruta predictiva | ACTIVO-D16-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D16 | Referencial | D1 |
| 3 | FUR-MNT-D16-LUB-0153 | Plan de lubricación | ACTIVO-D16-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 4 | FUR-MNT-D16-INS-0154 | Inspección operacional | ACTIVO-D16-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 5 | FUR-MNT-D16-BOM-0155 | BOM de repuestos | ACTIVO-D16-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 6 | FUR-MNT-D16-SPR-0156 | Repuesto crítico | ACTIVO-D16-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 7 | FUR-MNT-D16-FME-0157 | Modo de falla | ACTIVO-D16-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D16 | Referencial | D1 |
| 8 | FUR-MNT-D16-WOT-0158 | Plantilla de orden de trabajo | ACTIVO-D16-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 9 | FUR-MNT-D16-CAL-0159 | Calibración/alineación técnica | ACTIVO-D16-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D16 | Referencial | D1 |
| 10 | FUR-MNT-D16-REL-0160 | Registro de confiabilidad | ACTIVO-D16-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D16 | Referencial | D1 |

## D17 — Fundición

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D17-PM-0161 | Plan preventivo del activo crítico | ACTIVO-D17-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 2 | FUR-MNT-D17-PDM-0162 | Ruta predictiva | ACTIVO-D17-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D17 | Referencial | D1 |
| 3 | FUR-MNT-D17-LUB-0163 | Plan de lubricación | ACTIVO-D17-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 4 | FUR-MNT-D17-INS-0164 | Inspección operacional | ACTIVO-D17-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 5 | FUR-MNT-D17-BOM-0165 | BOM de repuestos | ACTIVO-D17-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 6 | FUR-MNT-D17-SPR-0166 | Repuesto crítico | ACTIVO-D17-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 7 | FUR-MNT-D17-FME-0167 | Modo de falla | ACTIVO-D17-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D17 | Referencial | D1 |
| 8 | FUR-MNT-D17-WOT-0168 | Plantilla de orden de trabajo | ACTIVO-D17-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 9 | FUR-MNT-D17-CAL-0169 | Calibración/alineación técnica | ACTIVO-D17-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D17 | Referencial | D1 |
| 10 | FUR-MNT-D17-REL-0170 | Registro de confiabilidad | ACTIVO-D17-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D17 | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

Los registros se relacionan con activos de proceso, potencia, IoT, GPON y cámaras de la etapa.

| # | Código FUR | Registro MNT | Activo relacionado | Estrategia | Frecuencia/dato | KPI | Responsable | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-MNT-D18-PM-0171 | Plan preventivo del activo crítico | ACTIVO-D18-01 | Preventivo | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 2 | FUR-MNT-D18-PDM-0172 | Ruta predictiva | ACTIVO-D18-02 | Vibración/termografía | 7 días | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D18 | Referencial | D1 |
| 3 | FUR-MNT-D18-LUB-0173 | Plan de lubricación | ACTIVO-D18-03 | Lubricación | 30 días | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 4 | FUR-MNT-D18-INS-0174 | Inspección operacional | ACTIVO-D18-04 | Inspección | Turno/diaria | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 5 | FUR-MNT-D18-BOM-0175 | BOM de repuestos | ACTIVO-D18-05 | Repuestos | 10 líneas | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 6 | FUR-MNT-D18-SPR-0176 | Repuesto crítico | ACTIVO-D18-06 | Stock crítico | 1 kit | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 7 | FUR-MNT-D18-FME-0177 | Modo de falla | ACTIVO-D18-07 | RCM/FMEA | 1 registro | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D18 | Referencial | D1 |
| 8 | FUR-MNT-D18-WOT-0178 | Plantilla de orden de trabajo | ACTIVO-D18-08 | OT | 4 h | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 9 | FUR-MNT-D18-CAL-0179 | Calibración/alineación técnica | ACTIVO-D18-09 | Especialidad | 90 días | Cumplimiento plan / backlog | EQUIPO-MNT-D18 | Referencial | D1 |
| 10 | FUR-MNT-D18-REL-0180 | Registro de confiabilidad | ACTIVO-D18-10 | KPI | MTBF/MTTR | MTBF/MTTR/Disponibilidad | EQUIPO-MNT-D18 | Referencial | D1 |

# 60. CATÁLOGO REFERENCIAL FUR-RQ POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D01-SPR-0001 | Requisición de repuesto crítico | ITEM-D01-SPR-01 | 2 und | Alta | CC-D01 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D01-INS-0002 | Requisición de instrumento/sensor | ITEM-D01-INS-02 | 1 und | Alta | CC-D01 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D01-ELE-0003 | Requisición eléctrica | ITEM-D01-ELE-03 | 1 kit | Media | CC-D01 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D01-COM-0004 | Requisición comunicaciones | ITEM-D01-COM-04 | 1 kit | Media | CC-D01 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D01-CON-0005 | Requisición consumible proceso | ITEM-D01-CON-05 | 1 lote | Media | CC-D01 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D01-TOO-0006 | Requisición herramienta/PPE | ITEM-D01-TOO-06 | 1 kit | Media | CC-D01 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D01-SRV-0007 | Requisición servicio técnico | ITEM-D01-SRV-07 | 1 servicio | Alta | CC-D01 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D01-CAL-0008 | Requisición calibración/ensayo | ITEM-D01-CAL-08 | 1 servicio | Media | CC-D01 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D01-DOC-0009 | Requisición licencia/documentación | ITEM-D01-DOC-09 | 1 ítem | Baja | CC-D01 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D01-EMG-0010 | Requisición contingencia | ITEM-D01-EMG-10 | 1 kit | Crítica | CC-D01 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D02 — Trituración Primaria

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D02-SPR-0011 | Requisición de repuesto crítico | ITEM-D02-SPR-01 | 2 und | Alta | CC-D02 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D02-INS-0012 | Requisición de instrumento/sensor | ITEM-D02-INS-02 | 1 und | Alta | CC-D02 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D02-ELE-0013 | Requisición eléctrica | ITEM-D02-ELE-03 | 1 kit | Media | CC-D02 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D02-COM-0014 | Requisición comunicaciones | ITEM-D02-COM-04 | 1 kit | Media | CC-D02 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D02-CON-0015 | Requisición consumible proceso | ITEM-D02-CON-05 | 1 lote | Media | CC-D02 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D02-TOO-0016 | Requisición herramienta/PPE | ITEM-D02-TOO-06 | 1 kit | Media | CC-D02 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D02-SRV-0017 | Requisición servicio técnico | ITEM-D02-SRV-07 | 1 servicio | Alta | CC-D02 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D02-CAL-0018 | Requisición calibración/ensayo | ITEM-D02-CAL-08 | 1 servicio | Media | CC-D02 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D02-DOC-0019 | Requisición licencia/documentación | ITEM-D02-DOC-09 | 1 ítem | Baja | CC-D02 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D02-EMG-0020 | Requisición contingencia | ITEM-D02-EMG-10 | 1 kit | Crítica | CC-D02 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D03 — Cribado

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D03-SPR-0021 | Requisición de repuesto crítico | ITEM-D03-SPR-01 | 2 und | Alta | CC-D03 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D03-INS-0022 | Requisición de instrumento/sensor | ITEM-D03-INS-02 | 1 und | Alta | CC-D03 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D03-ELE-0023 | Requisición eléctrica | ITEM-D03-ELE-03 | 1 kit | Media | CC-D03 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D03-COM-0024 | Requisición comunicaciones | ITEM-D03-COM-04 | 1 kit | Media | CC-D03 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D03-CON-0025 | Requisición consumible proceso | ITEM-D03-CON-05 | 1 lote | Media | CC-D03 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D03-TOO-0026 | Requisición herramienta/PPE | ITEM-D03-TOO-06 | 1 kit | Media | CC-D03 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D03-SRV-0027 | Requisición servicio técnico | ITEM-D03-SRV-07 | 1 servicio | Alta | CC-D03 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D03-CAL-0028 | Requisición calibración/ensayo | ITEM-D03-CAL-08 | 1 servicio | Media | CC-D03 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D03-DOC-0029 | Requisición licencia/documentación | ITEM-D03-DOC-09 | 1 ítem | Baja | CC-D03 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D03-EMG-0030 | Requisición contingencia | ITEM-D03-EMG-10 | 1 kit | Crítica | CC-D03 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D04 — Trituración Secundaria

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D04-SPR-0031 | Requisición de repuesto crítico | ITEM-D04-SPR-01 | 2 und | Alta | CC-D04 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D04-INS-0032 | Requisición de instrumento/sensor | ITEM-D04-INS-02 | 1 und | Alta | CC-D04 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D04-ELE-0033 | Requisición eléctrica | ITEM-D04-ELE-03 | 1 kit | Media | CC-D04 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D04-COM-0034 | Requisición comunicaciones | ITEM-D04-COM-04 | 1 kit | Media | CC-D04 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D04-CON-0035 | Requisición consumible proceso | ITEM-D04-CON-05 | 1 lote | Media | CC-D04 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D04-TOO-0036 | Requisición herramienta/PPE | ITEM-D04-TOO-06 | 1 kit | Media | CC-D04 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D04-SRV-0037 | Requisición servicio técnico | ITEM-D04-SRV-07 | 1 servicio | Alta | CC-D04 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D04-CAL-0038 | Requisición calibración/ensayo | ITEM-D04-CAL-08 | 1 servicio | Media | CC-D04 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D04-DOC-0039 | Requisición licencia/documentación | ITEM-D04-DOC-09 | 1 ítem | Baja | CC-D04 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D04-EMG-0040 | Requisición contingencia | ITEM-D04-EMG-10 | 1 kit | Crítica | CC-D04 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D05 — Transporte / Silos

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D05-SPR-0041 | Requisición de repuesto crítico | ITEM-D05-SPR-01 | 2 und | Alta | CC-D05 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D05-INS-0042 | Requisición de instrumento/sensor | ITEM-D05-INS-02 | 1 und | Alta | CC-D05 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D05-ELE-0043 | Requisición eléctrica | ITEM-D05-ELE-03 | 1 kit | Media | CC-D05 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D05-COM-0044 | Requisición comunicaciones | ITEM-D05-COM-04 | 1 kit | Media | CC-D05 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D05-CON-0045 | Requisición consumible proceso | ITEM-D05-CON-05 | 1 lote | Media | CC-D05 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D05-TOO-0046 | Requisición herramienta/PPE | ITEM-D05-TOO-06 | 1 kit | Media | CC-D05 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D05-SRV-0047 | Requisición servicio técnico | ITEM-D05-SRV-07 | 1 servicio | Alta | CC-D05 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D05-CAL-0048 | Requisición calibración/ensayo | ITEM-D05-CAL-08 | 1 servicio | Media | CC-D05 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D05-DOC-0049 | Requisición licencia/documentación | ITEM-D05-DOC-09 | 1 ítem | Baja | CC-D05 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D05-EMG-0050 | Requisición contingencia | ITEM-D05-EMG-10 | 1 kit | Crítica | CC-D05 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D06 — Molienda Primaria

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D06-SPR-0051 | Requisición de repuesto crítico | ITEM-D06-SPR-01 | 2 und | Alta | CC-D06 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D06-INS-0052 | Requisición de instrumento/sensor | ITEM-D06-INS-02 | 1 und | Alta | CC-D06 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D06-ELE-0053 | Requisición eléctrica | ITEM-D06-ELE-03 | 1 kit | Media | CC-D06 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D06-COM-0054 | Requisición comunicaciones | ITEM-D06-COM-04 | 1 kit | Media | CC-D06 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D06-CON-0055 | Requisición consumible proceso | ITEM-D06-CON-05 | 1 lote | Media | CC-D06 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D06-TOO-0056 | Requisición herramienta/PPE | ITEM-D06-TOO-06 | 1 kit | Media | CC-D06 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D06-SRV-0057 | Requisición servicio técnico | ITEM-D06-SRV-07 | 1 servicio | Alta | CC-D06 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D06-CAL-0058 | Requisición calibración/ensayo | ITEM-D06-CAL-08 | 1 servicio | Media | CC-D06 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D06-DOC-0059 | Requisición licencia/documentación | ITEM-D06-DOC-09 | 1 ítem | Baja | CC-D06 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D06-EMG-0060 | Requisición contingencia | ITEM-D06-EMG-10 | 1 kit | Crítica | CC-D06 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D07 — Molienda Secundaria

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D07-SPR-0061 | Requisición de repuesto crítico | ITEM-D07-SPR-01 | 2 und | Alta | CC-D07 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D07-INS-0062 | Requisición de instrumento/sensor | ITEM-D07-INS-02 | 1 und | Alta | CC-D07 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D07-ELE-0063 | Requisición eléctrica | ITEM-D07-ELE-03 | 1 kit | Media | CC-D07 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D07-COM-0064 | Requisición comunicaciones | ITEM-D07-COM-04 | 1 kit | Media | CC-D07 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D07-CON-0065 | Requisición consumible proceso | ITEM-D07-CON-05 | 1 lote | Media | CC-D07 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D07-TOO-0066 | Requisición herramienta/PPE | ITEM-D07-TOO-06 | 1 kit | Media | CC-D07 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D07-SRV-0067 | Requisición servicio técnico | ITEM-D07-SRV-07 | 1 servicio | Alta | CC-D07 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D07-CAL-0068 | Requisición calibración/ensayo | ITEM-D07-CAL-08 | 1 servicio | Media | CC-D07 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D07-DOC-0069 | Requisición licencia/documentación | ITEM-D07-DOC-09 | 1 ítem | Baja | CC-D07 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D07-EMG-0070 | Requisición contingencia | ITEM-D07-EMG-10 | 1 kit | Crítica | CC-D07 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D08 — Clasificación

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D08-SPR-0071 | Requisición de repuesto crítico | ITEM-D08-SPR-01 | 2 und | Alta | CC-D08 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D08-INS-0072 | Requisición de instrumento/sensor | ITEM-D08-INS-02 | 1 und | Alta | CC-D08 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D08-ELE-0073 | Requisición eléctrica | ITEM-D08-ELE-03 | 1 kit | Media | CC-D08 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D08-COM-0074 | Requisición comunicaciones | ITEM-D08-COM-04 | 1 kit | Media | CC-D08 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D08-CON-0075 | Requisición consumible proceso | ITEM-D08-CON-05 | 1 lote | Media | CC-D08 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D08-TOO-0076 | Requisición herramienta/PPE | ITEM-D08-TOO-06 | 1 kit | Media | CC-D08 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D08-SRV-0077 | Requisición servicio técnico | ITEM-D08-SRV-07 | 1 servicio | Alta | CC-D08 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D08-CAL-0078 | Requisición calibración/ensayo | ITEM-D08-CAL-08 | 1 servicio | Media | CC-D08 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D08-DOC-0079 | Requisición licencia/documentación | ITEM-D08-DOC-09 | 1 ítem | Baja | CC-D08 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D08-EMG-0080 | Requisición contingencia | ITEM-D08-EMG-10 | 1 kit | Crítica | CC-D08 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D09 — Pre-lixiviación

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D09-SPR-0081 | Requisición de repuesto crítico | ITEM-D09-SPR-01 | 2 und | Alta | CC-D09 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D09-INS-0082 | Requisición de instrumento/sensor | ITEM-D09-INS-02 | 1 und | Alta | CC-D09 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D09-ELE-0083 | Requisición eléctrica | ITEM-D09-ELE-03 | 1 kit | Media | CC-D09 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D09-COM-0084 | Requisición comunicaciones | ITEM-D09-COM-04 | 1 kit | Media | CC-D09 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D09-CON-0085 | Requisición consumible proceso | ITEM-D09-CON-05 | 1 lote | Media | CC-D09 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D09-TOO-0086 | Requisición herramienta/PPE | ITEM-D09-TOO-06 | 1 kit | Media | CC-D09 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D09-SRV-0087 | Requisición servicio técnico | ITEM-D09-SRV-07 | 1 servicio | Alta | CC-D09 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D09-CAL-0088 | Requisición calibración/ensayo | ITEM-D09-CAL-08 | 1 servicio | Media | CC-D09 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D09-DOC-0089 | Requisición licencia/documentación | ITEM-D09-DOC-09 | 1 ítem | Baja | CC-D09 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D09-EMG-0090 | Requisición contingencia | ITEM-D09-EMG-10 | 1 kit | Crítica | CC-D09 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D10 — Espesamiento

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D10-SPR-0091 | Requisición de repuesto crítico | ITEM-D10-SPR-01 | 2 und | Alta | CC-D10 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D10-INS-0092 | Requisición de instrumento/sensor | ITEM-D10-INS-02 | 1 und | Alta | CC-D10 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D10-ELE-0093 | Requisición eléctrica | ITEM-D10-ELE-03 | 1 kit | Media | CC-D10 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D10-COM-0094 | Requisición comunicaciones | ITEM-D10-COM-04 | 1 kit | Media | CC-D10 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D10-CON-0095 | Requisición consumible proceso | ITEM-D10-CON-05 | 1 lote | Media | CC-D10 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D10-TOO-0096 | Requisición herramienta/PPE | ITEM-D10-TOO-06 | 1 kit | Media | CC-D10 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D10-SRV-0097 | Requisición servicio técnico | ITEM-D10-SRV-07 | 1 servicio | Alta | CC-D10 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D10-CAL-0098 | Requisición calibración/ensayo | ITEM-D10-CAL-08 | 1 servicio | Media | CC-D10 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D10-DOC-0099 | Requisición licencia/documentación | ITEM-D10-DOC-09 | 1 ítem | Baja | CC-D10 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D10-EMG-0100 | Requisición contingencia | ITEM-D10-EMG-10 | 1 kit | Crítica | CC-D10 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D11 — Lixiviación / CIL

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D11-SPR-0101 | Requisición de repuesto crítico | ITEM-D11-SPR-01 | 2 und | Alta | CC-D11 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D11-INS-0102 | Requisición de instrumento/sensor | ITEM-D11-INS-02 | 1 und | Alta | CC-D11 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D11-ELE-0103 | Requisición eléctrica | ITEM-D11-ELE-03 | 1 kit | Media | CC-D11 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D11-COM-0104 | Requisición comunicaciones | ITEM-D11-COM-04 | 1 kit | Media | CC-D11 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D11-CON-0105 | Requisición consumible proceso | ITEM-D11-CON-05 | 1 lote | Media | CC-D11 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D11-TOO-0106 | Requisición herramienta/PPE | ITEM-D11-TOO-06 | 1 kit | Media | CC-D11 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D11-SRV-0107 | Requisición servicio técnico | ITEM-D11-SRV-07 | 1 servicio | Alta | CC-D11 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D11-CAL-0108 | Requisición calibración/ensayo | ITEM-D11-CAL-08 | 1 servicio | Media | CC-D11 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D11-DOC-0109 | Requisición licencia/documentación | ITEM-D11-DOC-09 | 1 ítem | Baja | CC-D11 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D11-EMG-0110 | Requisición contingencia | ITEM-D11-EMG-10 | 1 kit | Crítica | CC-D11 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D12 — Adsorción CIP

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D12-SPR-0111 | Requisición de repuesto crítico | ITEM-D12-SPR-01 | 2 und | Alta | CC-D12 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D12-INS-0112 | Requisición de instrumento/sensor | ITEM-D12-INS-02 | 1 und | Alta | CC-D12 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D12-ELE-0113 | Requisición eléctrica | ITEM-D12-ELE-03 | 1 kit | Media | CC-D12 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D12-COM-0114 | Requisición comunicaciones | ITEM-D12-COM-04 | 1 kit | Media | CC-D12 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D12-CON-0115 | Requisición consumible proceso | ITEM-D12-CON-05 | 1 lote | Media | CC-D12 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D12-TOO-0116 | Requisición herramienta/PPE | ITEM-D12-TOO-06 | 1 kit | Media | CC-D12 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D12-SRV-0117 | Requisición servicio técnico | ITEM-D12-SRV-07 | 1 servicio | Alta | CC-D12 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D12-CAL-0118 | Requisición calibración/ensayo | ITEM-D12-CAL-08 | 1 servicio | Media | CC-D12 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D12-DOC-0119 | Requisición licencia/documentación | ITEM-D12-DOC-09 | 1 ítem | Baja | CC-D12 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D12-EMG-0120 | Requisición contingencia | ITEM-D12-EMG-10 | 1 kit | Crítica | CC-D12 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D13-SPR-0121 | Requisición de repuesto crítico | ITEM-D13-SPR-01 | 2 und | Alta | CC-D13 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D13-INS-0122 | Requisición de instrumento/sensor | ITEM-D13-INS-02 | 1 und | Alta | CC-D13 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D13-ELE-0123 | Requisición eléctrica | ITEM-D13-ELE-03 | 1 kit | Media | CC-D13 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D13-COM-0124 | Requisición comunicaciones | ITEM-D13-COM-04 | 1 kit | Media | CC-D13 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D13-CON-0125 | Requisición consumible proceso | ITEM-D13-CON-05 | 1 lote | Media | CC-D13 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D13-TOO-0126 | Requisición herramienta/PPE | ITEM-D13-TOO-06 | 1 kit | Media | CC-D13 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D13-SRV-0127 | Requisición servicio técnico | ITEM-D13-SRV-07 | 1 servicio | Alta | CC-D13 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D13-CAL-0128 | Requisición calibración/ensayo | ITEM-D13-CAL-08 | 1 servicio | Media | CC-D13 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D13-DOC-0129 | Requisición licencia/documentación | ITEM-D13-DOC-09 | 1 ítem | Baja | CC-D13 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D13-EMG-0130 | Requisición contingencia | ITEM-D13-EMG-10 | 1 kit | Crítica | CC-D13 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D14 — Elución / Desorción

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D14-SPR-0131 | Requisición de repuesto crítico | ITEM-D14-SPR-01 | 2 und | Alta | CC-D14 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D14-INS-0132 | Requisición de instrumento/sensor | ITEM-D14-INS-02 | 1 und | Alta | CC-D14 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D14-ELE-0133 | Requisición eléctrica | ITEM-D14-ELE-03 | 1 kit | Media | CC-D14 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D14-COM-0134 | Requisición comunicaciones | ITEM-D14-COM-04 | 1 kit | Media | CC-D14 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D14-CON-0135 | Requisición consumible proceso | ITEM-D14-CON-05 | 1 lote | Media | CC-D14 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D14-TOO-0136 | Requisición herramienta/PPE | ITEM-D14-TOO-06 | 1 kit | Media | CC-D14 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D14-SRV-0137 | Requisición servicio técnico | ITEM-D14-SRV-07 | 1 servicio | Alta | CC-D14 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D14-CAL-0138 | Requisición calibración/ensayo | ITEM-D14-CAL-08 | 1 servicio | Media | CC-D14 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D14-DOC-0139 | Requisición licencia/documentación | ITEM-D14-DOC-09 | 1 ítem | Baja | CC-D14 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D14-EMG-0140 | Requisición contingencia | ITEM-D14-EMG-10 | 1 kit | Crítica | CC-D14 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D15 — Electrowinning

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D15-SPR-0141 | Requisición de repuesto crítico | ITEM-D15-SPR-01 | 2 und | Alta | CC-D15 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D15-INS-0142 | Requisición de instrumento/sensor | ITEM-D15-INS-02 | 1 und | Alta | CC-D15 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D15-ELE-0143 | Requisición eléctrica | ITEM-D15-ELE-03 | 1 kit | Media | CC-D15 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D15-COM-0144 | Requisición comunicaciones | ITEM-D15-COM-04 | 1 kit | Media | CC-D15 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D15-CON-0145 | Requisición consumible proceso | ITEM-D15-CON-05 | 1 lote | Media | CC-D15 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D15-TOO-0146 | Requisición herramienta/PPE | ITEM-D15-TOO-06 | 1 kit | Media | CC-D15 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D15-SRV-0147 | Requisición servicio técnico | ITEM-D15-SRV-07 | 1 servicio | Alta | CC-D15 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D15-CAL-0148 | Requisición calibración/ensayo | ITEM-D15-CAL-08 | 1 servicio | Media | CC-D15 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D15-DOC-0149 | Requisición licencia/documentación | ITEM-D15-DOC-09 | 1 ítem | Baja | CC-D15 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D15-EMG-0150 | Requisición contingencia | ITEM-D15-EMG-10 | 1 kit | Crítica | CC-D15 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D16 — Calcinación / Secado

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D16-SPR-0151 | Requisición de repuesto crítico | ITEM-D16-SPR-01 | 2 und | Alta | CC-D16 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D16-INS-0152 | Requisición de instrumento/sensor | ITEM-D16-INS-02 | 1 und | Alta | CC-D16 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D16-ELE-0153 | Requisición eléctrica | ITEM-D16-ELE-03 | 1 kit | Media | CC-D16 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D16-COM-0154 | Requisición comunicaciones | ITEM-D16-COM-04 | 1 kit | Media | CC-D16 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D16-CON-0155 | Requisición consumible proceso | ITEM-D16-CON-05 | 1 lote | Media | CC-D16 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D16-TOO-0156 | Requisición herramienta/PPE | ITEM-D16-TOO-06 | 1 kit | Media | CC-D16 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D16-SRV-0157 | Requisición servicio técnico | ITEM-D16-SRV-07 | 1 servicio | Alta | CC-D16 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D16-CAL-0158 | Requisición calibración/ensayo | ITEM-D16-CAL-08 | 1 servicio | Media | CC-D16 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D16-DOC-0159 | Requisición licencia/documentación | ITEM-D16-DOC-09 | 1 ítem | Baja | CC-D16 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D16-EMG-0160 | Requisición contingencia | ITEM-D16-EMG-10 | 1 kit | Crítica | CC-D16 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D17 — Fundición

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D17-SPR-0161 | Requisición de repuesto crítico | ITEM-D17-SPR-01 | 2 und | Alta | CC-D17 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D17-INS-0162 | Requisición de instrumento/sensor | ITEM-D17-INS-02 | 1 und | Alta | CC-D17 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D17-ELE-0163 | Requisición eléctrica | ITEM-D17-ELE-03 | 1 kit | Media | CC-D17 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D17-COM-0164 | Requisición comunicaciones | ITEM-D17-COM-04 | 1 kit | Media | CC-D17 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D17-CON-0165 | Requisición consumible proceso | ITEM-D17-CON-05 | 1 lote | Media | CC-D17 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D17-TOO-0166 | Requisición herramienta/PPE | ITEM-D17-TOO-06 | 1 kit | Media | CC-D17 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D17-SRV-0167 | Requisición servicio técnico | ITEM-D17-SRV-07 | 1 servicio | Alta | CC-D17 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D17-CAL-0168 | Requisición calibración/ensayo | ITEM-D17-CAL-08 | 1 servicio | Media | CC-D17 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D17-DOC-0169 | Requisición licencia/documentación | ITEM-D17-DOC-09 | 1 ítem | Baja | CC-D17 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D17-EMG-0170 | Requisición contingencia | ITEM-D17-EMG-10 | 1 kit | Crítica | CC-D17 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

| # | Código FUR | Requisición | Ítem | Cantidad | Prioridad | Centro costo | Costo estimado | Flujo | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-RQ-D18-SPR-0171 | Requisición de repuesto crítico | ITEM-D18-SPR-01 | 2 und | Alta | CC-D18 | USD 4,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 2 | FUR-RQ-D18-INS-0172 | Requisición de instrumento/sensor | ITEM-D18-INS-02 | 1 und | Alta | CC-D18 | USD 6,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 3 | FUR-RQ-D18-ELE-0173 | Requisición eléctrica | ITEM-D18-ELE-03 | 1 kit | Media | CC-D18 | USD 7,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 4 | FUR-RQ-D18-COM-0174 | Requisición comunicaciones | ITEM-D18-COM-04 | 1 kit | Media | CC-D18 | USD 9,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 5 | FUR-RQ-D18-CON-0175 | Requisición consumible proceso | ITEM-D18-CON-05 | 1 lote | Media | CC-D18 | USD 11,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 6 | FUR-RQ-D18-TOO-0176 | Requisición herramienta/PPE | ITEM-D18-TOO-06 | 1 kit | Media | CC-D18 | USD 13,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 7 | FUR-RQ-D18-SRV-0177 | Requisición servicio técnico | ITEM-D18-SRV-07 | 1 servicio | Alta | CC-D18 | USD 14,750 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 8 | FUR-RQ-D18-CAL-0178 | Requisición calibración/ensayo | ITEM-D18-CAL-08 | 1 servicio | Media | CC-D18 | USD 16,500 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 9 | FUR-RQ-D18-DOC-0179 | Requisición licencia/documentación | ITEM-D18-DOC-09 | 1 ítem | Baja | CC-D18 | USD 18,250 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |
| 10 | FUR-RQ-D18-EMG-0180 | Requisición contingencia | ITEM-D18-EMG-10 | 1 kit | Crítica | CC-D18 | USD 20,000 referencial | Borrador → aprobación → RFQ → PO | Referencial | D1 |

# 61. CATÁLOGO REFERENCIAL FUR-OF POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D01-SPR-0001 | Oferta repuesto crítico | FUR-RQ-D01-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D01-INS-0002 | Oferta instrumentación | FUR-RQ-D01-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D01-ELE-0003 | Oferta paquete eléctrico | FUR-RQ-D01-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D01-COM-0004 | Oferta comunicaciones | FUR-RQ-D01-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D01-CON-0005 | Oferta consumibles | FUR-RQ-D01-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D01-TOO-0006 | Oferta herramientas/PPE | FUR-RQ-D01-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D01-SRV-0007 | Oferta servicio técnico | FUR-RQ-D01-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D01-CAL-0008 | Oferta calibración/ensayo | FUR-RQ-D01-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D01-DOC-0009 | Oferta licencia/documentación | FUR-RQ-D01-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D01-EMG-0010 | Oferta contingencia | FUR-RQ-D01-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D02 — Trituración Primaria

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D02-SPR-0011 | Oferta repuesto crítico | FUR-RQ-D02-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D02-INS-0012 | Oferta instrumentación | FUR-RQ-D02-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D02-ELE-0013 | Oferta paquete eléctrico | FUR-RQ-D02-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D02-COM-0014 | Oferta comunicaciones | FUR-RQ-D02-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D02-CON-0015 | Oferta consumibles | FUR-RQ-D02-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D02-TOO-0016 | Oferta herramientas/PPE | FUR-RQ-D02-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D02-SRV-0017 | Oferta servicio técnico | FUR-RQ-D02-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D02-CAL-0018 | Oferta calibración/ensayo | FUR-RQ-D02-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D02-DOC-0019 | Oferta licencia/documentación | FUR-RQ-D02-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D02-EMG-0020 | Oferta contingencia | FUR-RQ-D02-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D03 — Cribado

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D03-SPR-0021 | Oferta repuesto crítico | FUR-RQ-D03-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D03-INS-0022 | Oferta instrumentación | FUR-RQ-D03-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D03-ELE-0023 | Oferta paquete eléctrico | FUR-RQ-D03-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D03-COM-0024 | Oferta comunicaciones | FUR-RQ-D03-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D03-CON-0025 | Oferta consumibles | FUR-RQ-D03-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D03-TOO-0026 | Oferta herramientas/PPE | FUR-RQ-D03-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D03-SRV-0027 | Oferta servicio técnico | FUR-RQ-D03-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D03-CAL-0028 | Oferta calibración/ensayo | FUR-RQ-D03-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D03-DOC-0029 | Oferta licencia/documentación | FUR-RQ-D03-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D03-EMG-0030 | Oferta contingencia | FUR-RQ-D03-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D04 — Trituración Secundaria

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D04-SPR-0031 | Oferta repuesto crítico | FUR-RQ-D04-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D04-INS-0032 | Oferta instrumentación | FUR-RQ-D04-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D04-ELE-0033 | Oferta paquete eléctrico | FUR-RQ-D04-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D04-COM-0034 | Oferta comunicaciones | FUR-RQ-D04-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D04-CON-0035 | Oferta consumibles | FUR-RQ-D04-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D04-TOO-0036 | Oferta herramientas/PPE | FUR-RQ-D04-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D04-SRV-0037 | Oferta servicio técnico | FUR-RQ-D04-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D04-CAL-0038 | Oferta calibración/ensayo | FUR-RQ-D04-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D04-DOC-0039 | Oferta licencia/documentación | FUR-RQ-D04-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D04-EMG-0040 | Oferta contingencia | FUR-RQ-D04-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D05 — Transporte / Silos

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D05-SPR-0041 | Oferta repuesto crítico | FUR-RQ-D05-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D05-INS-0042 | Oferta instrumentación | FUR-RQ-D05-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D05-ELE-0043 | Oferta paquete eléctrico | FUR-RQ-D05-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D05-COM-0044 | Oferta comunicaciones | FUR-RQ-D05-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D05-CON-0045 | Oferta consumibles | FUR-RQ-D05-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D05-TOO-0046 | Oferta herramientas/PPE | FUR-RQ-D05-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D05-SRV-0047 | Oferta servicio técnico | FUR-RQ-D05-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D05-CAL-0048 | Oferta calibración/ensayo | FUR-RQ-D05-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D05-DOC-0049 | Oferta licencia/documentación | FUR-RQ-D05-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D05-EMG-0050 | Oferta contingencia | FUR-RQ-D05-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D06 — Molienda Primaria

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D06-SPR-0051 | Oferta repuesto crítico | FUR-RQ-D06-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D06-INS-0052 | Oferta instrumentación | FUR-RQ-D06-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D06-ELE-0053 | Oferta paquete eléctrico | FUR-RQ-D06-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D06-COM-0054 | Oferta comunicaciones | FUR-RQ-D06-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D06-CON-0055 | Oferta consumibles | FUR-RQ-D06-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D06-TOO-0056 | Oferta herramientas/PPE | FUR-RQ-D06-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D06-SRV-0057 | Oferta servicio técnico | FUR-RQ-D06-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D06-CAL-0058 | Oferta calibración/ensayo | FUR-RQ-D06-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D06-DOC-0059 | Oferta licencia/documentación | FUR-RQ-D06-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D06-EMG-0060 | Oferta contingencia | FUR-RQ-D06-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D07 — Molienda Secundaria

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D07-SPR-0061 | Oferta repuesto crítico | FUR-RQ-D07-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D07-INS-0062 | Oferta instrumentación | FUR-RQ-D07-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D07-ELE-0063 | Oferta paquete eléctrico | FUR-RQ-D07-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D07-COM-0064 | Oferta comunicaciones | FUR-RQ-D07-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D07-CON-0065 | Oferta consumibles | FUR-RQ-D07-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D07-TOO-0066 | Oferta herramientas/PPE | FUR-RQ-D07-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D07-SRV-0067 | Oferta servicio técnico | FUR-RQ-D07-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D07-CAL-0068 | Oferta calibración/ensayo | FUR-RQ-D07-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D07-DOC-0069 | Oferta licencia/documentación | FUR-RQ-D07-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D07-EMG-0070 | Oferta contingencia | FUR-RQ-D07-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D08 — Clasificación

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D08-SPR-0071 | Oferta repuesto crítico | FUR-RQ-D08-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D08-INS-0072 | Oferta instrumentación | FUR-RQ-D08-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D08-ELE-0073 | Oferta paquete eléctrico | FUR-RQ-D08-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D08-COM-0074 | Oferta comunicaciones | FUR-RQ-D08-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D08-CON-0075 | Oferta consumibles | FUR-RQ-D08-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D08-TOO-0076 | Oferta herramientas/PPE | FUR-RQ-D08-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D08-SRV-0077 | Oferta servicio técnico | FUR-RQ-D08-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D08-CAL-0078 | Oferta calibración/ensayo | FUR-RQ-D08-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D08-DOC-0079 | Oferta licencia/documentación | FUR-RQ-D08-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D08-EMG-0080 | Oferta contingencia | FUR-RQ-D08-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D09 — Pre-lixiviación

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D09-SPR-0081 | Oferta repuesto crítico | FUR-RQ-D09-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D09-INS-0082 | Oferta instrumentación | FUR-RQ-D09-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D09-ELE-0083 | Oferta paquete eléctrico | FUR-RQ-D09-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D09-COM-0084 | Oferta comunicaciones | FUR-RQ-D09-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D09-CON-0085 | Oferta consumibles | FUR-RQ-D09-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D09-TOO-0086 | Oferta herramientas/PPE | FUR-RQ-D09-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D09-SRV-0087 | Oferta servicio técnico | FUR-RQ-D09-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D09-CAL-0088 | Oferta calibración/ensayo | FUR-RQ-D09-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D09-DOC-0089 | Oferta licencia/documentación | FUR-RQ-D09-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D09-EMG-0090 | Oferta contingencia | FUR-RQ-D09-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D10 — Espesamiento

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D10-SPR-0091 | Oferta repuesto crítico | FUR-RQ-D10-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D10-INS-0092 | Oferta instrumentación | FUR-RQ-D10-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D10-ELE-0093 | Oferta paquete eléctrico | FUR-RQ-D10-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D10-COM-0094 | Oferta comunicaciones | FUR-RQ-D10-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D10-CON-0095 | Oferta consumibles | FUR-RQ-D10-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D10-TOO-0096 | Oferta herramientas/PPE | FUR-RQ-D10-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D10-SRV-0097 | Oferta servicio técnico | FUR-RQ-D10-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D10-CAL-0098 | Oferta calibración/ensayo | FUR-RQ-D10-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D10-DOC-0099 | Oferta licencia/documentación | FUR-RQ-D10-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D10-EMG-0100 | Oferta contingencia | FUR-RQ-D10-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D11 — Lixiviación / CIL

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D11-SPR-0101 | Oferta repuesto crítico | FUR-RQ-D11-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D11-INS-0102 | Oferta instrumentación | FUR-RQ-D11-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D11-ELE-0103 | Oferta paquete eléctrico | FUR-RQ-D11-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D11-COM-0104 | Oferta comunicaciones | FUR-RQ-D11-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D11-CON-0105 | Oferta consumibles | FUR-RQ-D11-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D11-TOO-0106 | Oferta herramientas/PPE | FUR-RQ-D11-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D11-SRV-0107 | Oferta servicio técnico | FUR-RQ-D11-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D11-CAL-0108 | Oferta calibración/ensayo | FUR-RQ-D11-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D11-DOC-0109 | Oferta licencia/documentación | FUR-RQ-D11-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D11-EMG-0110 | Oferta contingencia | FUR-RQ-D11-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D12 — Adsorción CIP

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D12-SPR-0111 | Oferta repuesto crítico | FUR-RQ-D12-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D12-INS-0112 | Oferta instrumentación | FUR-RQ-D12-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D12-ELE-0113 | Oferta paquete eléctrico | FUR-RQ-D12-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D12-COM-0114 | Oferta comunicaciones | FUR-RQ-D12-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D12-CON-0115 | Oferta consumibles | FUR-RQ-D12-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D12-TOO-0116 | Oferta herramientas/PPE | FUR-RQ-D12-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D12-SRV-0117 | Oferta servicio técnico | FUR-RQ-D12-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D12-CAL-0118 | Oferta calibración/ensayo | FUR-RQ-D12-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D12-DOC-0119 | Oferta licencia/documentación | FUR-RQ-D12-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D12-EMG-0120 | Oferta contingencia | FUR-RQ-D12-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D13-SPR-0121 | Oferta repuesto crítico | FUR-RQ-D13-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D13-INS-0122 | Oferta instrumentación | FUR-RQ-D13-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D13-ELE-0123 | Oferta paquete eléctrico | FUR-RQ-D13-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D13-COM-0124 | Oferta comunicaciones | FUR-RQ-D13-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D13-CON-0125 | Oferta consumibles | FUR-RQ-D13-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D13-TOO-0126 | Oferta herramientas/PPE | FUR-RQ-D13-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D13-SRV-0127 | Oferta servicio técnico | FUR-RQ-D13-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D13-CAL-0128 | Oferta calibración/ensayo | FUR-RQ-D13-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D13-DOC-0129 | Oferta licencia/documentación | FUR-RQ-D13-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D13-EMG-0130 | Oferta contingencia | FUR-RQ-D13-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D14 — Elución / Desorción

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D14-SPR-0131 | Oferta repuesto crítico | FUR-RQ-D14-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D14-INS-0132 | Oferta instrumentación | FUR-RQ-D14-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D14-ELE-0133 | Oferta paquete eléctrico | FUR-RQ-D14-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D14-COM-0134 | Oferta comunicaciones | FUR-RQ-D14-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D14-CON-0135 | Oferta consumibles | FUR-RQ-D14-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D14-TOO-0136 | Oferta herramientas/PPE | FUR-RQ-D14-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D14-SRV-0137 | Oferta servicio técnico | FUR-RQ-D14-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D14-CAL-0138 | Oferta calibración/ensayo | FUR-RQ-D14-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D14-DOC-0139 | Oferta licencia/documentación | FUR-RQ-D14-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D14-EMG-0140 | Oferta contingencia | FUR-RQ-D14-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D15 — Electrowinning

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D15-SPR-0141 | Oferta repuesto crítico | FUR-RQ-D15-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D15-INS-0142 | Oferta instrumentación | FUR-RQ-D15-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D15-ELE-0143 | Oferta paquete eléctrico | FUR-RQ-D15-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D15-COM-0144 | Oferta comunicaciones | FUR-RQ-D15-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D15-CON-0145 | Oferta consumibles | FUR-RQ-D15-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D15-TOO-0146 | Oferta herramientas/PPE | FUR-RQ-D15-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D15-SRV-0147 | Oferta servicio técnico | FUR-RQ-D15-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D15-CAL-0148 | Oferta calibración/ensayo | FUR-RQ-D15-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D15-DOC-0149 | Oferta licencia/documentación | FUR-RQ-D15-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D15-EMG-0150 | Oferta contingencia | FUR-RQ-D15-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D16 — Calcinación / Secado

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D16-SPR-0151 | Oferta repuesto crítico | FUR-RQ-D16-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D16-INS-0152 | Oferta instrumentación | FUR-RQ-D16-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D16-ELE-0153 | Oferta paquete eléctrico | FUR-RQ-D16-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D16-COM-0154 | Oferta comunicaciones | FUR-RQ-D16-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D16-CON-0155 | Oferta consumibles | FUR-RQ-D16-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D16-TOO-0156 | Oferta herramientas/PPE | FUR-RQ-D16-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D16-SRV-0157 | Oferta servicio técnico | FUR-RQ-D16-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D16-CAL-0158 | Oferta calibración/ensayo | FUR-RQ-D16-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D16-DOC-0159 | Oferta licencia/documentación | FUR-RQ-D16-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D16-EMG-0160 | Oferta contingencia | FUR-RQ-D16-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D17 — Fundición

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D17-SPR-0161 | Oferta repuesto crítico | FUR-RQ-D17-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D17-INS-0162 | Oferta instrumentación | FUR-RQ-D17-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D17-ELE-0163 | Oferta paquete eléctrico | FUR-RQ-D17-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D17-COM-0164 | Oferta comunicaciones | FUR-RQ-D17-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D17-CON-0165 | Oferta consumibles | FUR-RQ-D17-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D17-TOO-0166 | Oferta herramientas/PPE | FUR-RQ-D17-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D17-SRV-0167 | Oferta servicio técnico | FUR-RQ-D17-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D17-CAL-0168 | Oferta calibración/ensayo | FUR-RQ-D17-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D17-DOC-0169 | Oferta licencia/documentación | FUR-RQ-D17-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D17-EMG-0170 | Oferta contingencia | FUR-RQ-D17-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

| # | Código FUR | Oferta | RQ origen | Proveedor | Tipo | Precio | Plazo | Cumplimiento | Estado | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-OF-D18-SPR-0171 | Oferta repuesto crítico | FUR-RQ-D18-SPR-REF | PROV-REF-02 | Técnico-comercial | USD referencial | 5–9 semanas | 81% ref. | En evaluación | Referencial | D1 |
| 2 | FUR-OF-D18-INS-0172 | Oferta instrumentación | FUR-RQ-D18-INS-REF | PROV-REF-03 | Técnico-comercial | USD referencial | 6–10 semanas | 82% ref. | En evaluación | Referencial | D1 |
| 3 | FUR-OF-D18-ELE-0173 | Oferta paquete eléctrico | FUR-RQ-D18-ELE-REF | PROV-REF-04 | Técnico-comercial | USD referencial | 7–11 semanas | 83% ref. | En evaluación | Referencial | D1 |
| 4 | FUR-OF-D18-COM-0174 | Oferta comunicaciones | FUR-RQ-D18-COM-REF | PROV-REF-05 | Técnico-comercial | USD referencial | 8–12 semanas | 84% ref. | En evaluación | Referencial | D1 |
| 5 | FUR-OF-D18-CON-0175 | Oferta consumibles | FUR-RQ-D18-CON-REF | PROV-REF-01 | Comercial | USD referencial | 9–13 semanas | 85% ref. | En evaluación | Referencial | D1 |
| 6 | FUR-OF-D18-TOO-0176 | Oferta herramientas/PPE | FUR-RQ-D18-TOO-REF | PROV-REF-02 | Comercial | USD referencial | 10–14 semanas | 86% ref. | En evaluación | Referencial | D1 |
| 7 | FUR-OF-D18-SRV-0177 | Oferta servicio técnico | FUR-RQ-D18-SRV-REF | PROV-REF-03 | Servicio | USD referencial | 11–15 semanas | 87% ref. | En evaluación | Referencial | D1 |
| 8 | FUR-OF-D18-CAL-0178 | Oferta calibración/ensayo | FUR-RQ-D18-CAL-REF | PROV-REF-04 | Servicio | USD referencial | 12–16 semanas | 88% ref. | En evaluación | Referencial | D1 |
| 9 | FUR-OF-D18-DOC-0179 | Oferta licencia/documentación | FUR-RQ-D18-DOC-REF | PROV-REF-05 | Servicio | USD referencial | 13–17 semanas | 89% ref. | En evaluación | Referencial | D1 |
| 10 | FUR-OF-D18-EMG-0180 | Oferta contingencia | FUR-RQ-D18-EMG-REF | PROV-REF-01 | Emergencia | USD referencial | 14–18 semanas | 90% ref. | En evaluación | Referencial | D1 |

# 62. CATÁLOGO REFERENCIAL FUR-CAM POR LAS 18 ETAPAS


## D01 — Recepción y Alimentación

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D01-PTZ-0001 | CAM-D01-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D01-FIX-0002 | CAM-D01-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D01-THM-0003 | CAM-D01-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D01-PRC-0004 | CAM-D01-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D01-PER-0005 | CAM-D01-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D01-CAB-0006 | CAM-D01-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D01-LPR-0007 | CAM-D01-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D01-PAN-0008 | CAM-D01-08 | Cámara panorámica | 180° | Área | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D01-MOB-0009 | CAM-D01-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D01-ANA-0010 | CAM-D01-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D01 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D02 — Trituración Primaria

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D02-PTZ-0011 | CAM-D02-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D02-FIX-0012 | CAM-D02-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D02-THM-0013 | CAM-D02-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D02-PRC-0014 | CAM-D02-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D02-PER-0015 | CAM-D02-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D02-CAB-0016 | CAM-D02-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D02-LPR-0017 | CAM-D02-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D02-PAN-0018 | CAM-D02-08 | Cámara panorámica | 180° | Área | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D02-MOB-0019 | CAM-D02-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D02-ANA-0020 | CAM-D02-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D02 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D03 — Cribado

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D03-PTZ-0021 | CAM-D03-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D03-FIX-0022 | CAM-D03-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D03-THM-0023 | CAM-D03-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D03-PRC-0024 | CAM-D03-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D03-PER-0025 | CAM-D03-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D03-CAB-0026 | CAM-D03-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D03-LPR-0027 | CAM-D03-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D03-PAN-0028 | CAM-D03-08 | Cámara panorámica | 180° | Área | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D03-MOB-0029 | CAM-D03-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D03-ANA-0030 | CAM-D03-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D03 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D04 — Trituración Secundaria

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D04-PTZ-0031 | CAM-D04-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D04-FIX-0032 | CAM-D04-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D04-THM-0033 | CAM-D04-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D04-PRC-0034 | CAM-D04-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D04-PER-0035 | CAM-D04-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D04-CAB-0036 | CAM-D04-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D04-LPR-0037 | CAM-D04-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D04-PAN-0038 | CAM-D04-08 | Cámara panorámica | 180° | Área | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D04-MOB-0039 | CAM-D04-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D04-ANA-0040 | CAM-D04-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D04 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D05 — Transporte / Silos

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D05-PTZ-0041 | CAM-D05-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D05-FIX-0042 | CAM-D05-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D05-THM-0043 | CAM-D05-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D05-PRC-0044 | CAM-D05-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D05-PER-0045 | CAM-D05-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D05-CAB-0046 | CAM-D05-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D05-LPR-0047 | CAM-D05-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D05-PAN-0048 | CAM-D05-08 | Cámara panorámica | 180° | Área | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D05-MOB-0049 | CAM-D05-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D05-ANA-0050 | CAM-D05-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D05 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D06 — Molienda Primaria

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D06-PTZ-0051 | CAM-D06-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D06-FIX-0052 | CAM-D06-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D06-THM-0053 | CAM-D06-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D06-PRC-0054 | CAM-D06-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D06-PER-0055 | CAM-D06-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D06-CAB-0056 | CAM-D06-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D06-LPR-0057 | CAM-D06-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D06-PAN-0058 | CAM-D06-08 | Cámara panorámica | 180° | Área | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D06-MOB-0059 | CAM-D06-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D06-ANA-0060 | CAM-D06-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D06 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D07 — Molienda Secundaria

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D07-PTZ-0061 | CAM-D07-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D07-FIX-0062 | CAM-D07-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D07-THM-0063 | CAM-D07-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D07-PRC-0064 | CAM-D07-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D07-PER-0065 | CAM-D07-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D07-CAB-0066 | CAM-D07-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D07-LPR-0067 | CAM-D07-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D07-PAN-0068 | CAM-D07-08 | Cámara panorámica | 180° | Área | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D07-MOB-0069 | CAM-D07-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D07-ANA-0070 | CAM-D07-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D07 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D08 — Clasificación

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D08-PTZ-0071 | CAM-D08-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D08-FIX-0072 | CAM-D08-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D08-THM-0073 | CAM-D08-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D08-PRC-0074 | CAM-D08-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D08-PER-0075 | CAM-D08-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D08-CAB-0076 | CAM-D08-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D08-LPR-0077 | CAM-D08-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D08-PAN-0078 | CAM-D08-08 | Cámara panorámica | 180° | Área | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D08-MOB-0079 | CAM-D08-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D08-ANA-0080 | CAM-D08-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D08 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D09 — Pre-lixiviación

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D09-PTZ-0081 | CAM-D09-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D09-FIX-0082 | CAM-D09-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D09-THM-0083 | CAM-D09-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D09-PRC-0084 | CAM-D09-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D09-PER-0085 | CAM-D09-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D09-CAB-0086 | CAM-D09-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D09-LPR-0087 | CAM-D09-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D09-PAN-0088 | CAM-D09-08 | Cámara panorámica | 180° | Área | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D09-MOB-0089 | CAM-D09-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D09-ANA-0090 | CAM-D09-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D09 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D10 — Espesamiento

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D10-PTZ-0091 | CAM-D10-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D10-FIX-0092 | CAM-D10-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D10-THM-0093 | CAM-D10-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D10-PRC-0094 | CAM-D10-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D10-PER-0095 | CAM-D10-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D10-CAB-0096 | CAM-D10-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D10-LPR-0097 | CAM-D10-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D10-PAN-0098 | CAM-D10-08 | Cámara panorámica | 180° | Área | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D10-MOB-0099 | CAM-D10-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D10-ANA-0100 | CAM-D10-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D10 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D11 — Lixiviación / CIL

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D11-PTZ-0101 | CAM-D11-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D11-FIX-0102 | CAM-D11-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D11-THM-0103 | CAM-D11-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D11-PRC-0104 | CAM-D11-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D11-PER-0105 | CAM-D11-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D11-CAB-0106 | CAM-D11-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D11-LPR-0107 | CAM-D11-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D11-PAN-0108 | CAM-D11-08 | Cámara panorámica | 180° | Área | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D11-MOB-0109 | CAM-D11-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D11-ANA-0110 | CAM-D11-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D11 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D12 — Adsorción CIP

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D12-PTZ-0111 | CAM-D12-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D12-FIX-0112 | CAM-D12-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D12-THM-0113 | CAM-D12-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D12-PRC-0114 | CAM-D12-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D12-PER-0115 | CAM-D12-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D12-CAB-0116 | CAM-D12-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D12-LPR-0117 | CAM-D12-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D12-PAN-0118 | CAM-D12-08 | Cámara panorámica | 180° | Área | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D12-MOB-0119 | CAM-D12-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D12-ANA-0120 | CAM-D12-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D12 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D13 — Manejo de Carbón Cargado

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D13-PTZ-0121 | CAM-D13-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D13-FIX-0122 | CAM-D13-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D13-THM-0123 | CAM-D13-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D13-PRC-0124 | CAM-D13-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D13-PER-0125 | CAM-D13-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D13-CAB-0126 | CAM-D13-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D13-LPR-0127 | CAM-D13-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D13-PAN-0128 | CAM-D13-08 | Cámara panorámica | 180° | Área | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D13-MOB-0129 | CAM-D13-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D13-ANA-0130 | CAM-D13-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D13 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D14 — Elución / Desorción

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D14-PTZ-0131 | CAM-D14-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D14-FIX-0132 | CAM-D14-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D14-THM-0133 | CAM-D14-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D14-PRC-0134 | CAM-D14-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D14-PER-0135 | CAM-D14-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D14-CAB-0136 | CAM-D14-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D14-LPR-0137 | CAM-D14-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D14-PAN-0138 | CAM-D14-08 | Cámara panorámica | 180° | Área | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D14-MOB-0139 | CAM-D14-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D14-ANA-0140 | CAM-D14-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D14 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D15 — Electrowinning

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D15-PTZ-0141 | CAM-D15-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D15-FIX-0142 | CAM-D15-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D15-THM-0143 | CAM-D15-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D15-PRC-0144 | CAM-D15-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D15-PER-0145 | CAM-D15-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D15-CAB-0146 | CAM-D15-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D15-LPR-0147 | CAM-D15-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D15-PAN-0148 | CAM-D15-08 | Cámara panorámica | 180° | Área | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D15-MOB-0149 | CAM-D15-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D15-ANA-0150 | CAM-D15-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D15 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D16 — Calcinación / Secado

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D16-PTZ-0151 | CAM-D16-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D16-FIX-0152 | CAM-D16-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D16-THM-0153 | CAM-D16-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D16-PRC-0154 | CAM-D16-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D16-PER-0155 | CAM-D16-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D16-CAB-0156 | CAM-D16-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D16-LPR-0157 | CAM-D16-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D16-PAN-0158 | CAM-D16-08 | Cámara panorámica | 180° | Área | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D16-MOB-0159 | CAM-D16-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D16-ANA-0160 | CAM-D16-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D16 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D17 — Fundición

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D17-PTZ-0161 | CAM-D17-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D17-FIX-0162 | CAM-D17-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D17-THM-0163 | CAM-D17-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D17-PRC-0164 | CAM-D17-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D17-PER-0165 | CAM-D17-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D17-CAB-0166 | CAM-D17-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D17-LPR-0167 | CAM-D17-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D17-PAN-0168 | CAM-D17-08 | Cámara panorámica | 180° | Área | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D17-MOB-0169 | CAM-D17-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D17-ANA-0170 | CAM-D17-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D17 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

## D18 — Producto Final / Reactivación / Colas

| # | Código FUR | TAG | Cámara/activo | Especificación | Uso | Nodo red | Alimentación | Retención | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-CAM-D18-PTZ-0171 | CAM-D18-01 | Cámara PTZ industrial | 4K / 30x / IP66 | Panorámica | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 2 | FUR-CAM-D18-FIX-0172 | CAM-D18-02 | Cámara fija industrial | 4MP / IP66 | Proceso | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 3 | FUR-CAM-D18-THM-0173 | CAM-D18-03 | Cámara térmica | 640x512 | Condición térmica | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 4 | FUR-CAM-D18-PRC-0174 | CAM-D18-04 | Cámara de proceso | 4MP / 25fps | Observación proceso | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 5 | FUR-CAM-D18-PER-0175 | CAM-D18-05 | Cámara perimetral | 4K / IR | Perímetro | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 6 | FUR-CAM-D18-CAB-0176 | CAM-D18-06 | Cámara de gabinete/sala | 1080p | Infraestructura | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 7 | FUR-CAM-D18-LPR-0177 | CAM-D18-07 | Cámara LPR / acceso | 4MP | Acceso | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 8 | FUR-CAM-D18-PAN-0178 | CAM-D18-08 | Cámara panorámica | 180° | Área | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 9 | FUR-CAM-D18-MOB-0179 | CAM-D18-09 | Cámara móvil/inspección | 1080p | Inspección | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |
| 10 | FUR-CAM-D18-ANA-0180 | CAM-D18-10 | Cámara analítica | 4MP + analytics | Eventos | NODO-GPON-D18 | PoE++ / 24VDC | 30 días TBC | Referencial | D1 |

# 63. ROLES, PERFILES Y MODELO RBAC/ABAC DETALLADO

| Código | Rol | Dominio primario | Responsabilidad |
| --- | --- | --- | --- |
| SYS-ADM | Administrador del sistema | Plataforma | Administración integral, configuración, seguridad, auditoría técnica |
| DIR | Gerencia General / Dirección | Corporativo | KPIs estratégicos, decisiones y aprobaciones mayores |
| GPL | Gerente de Planta | Operaciones | Producción, recuperación, disponibilidad, alarmas y desempeño |
| MET | Metalurgista / Procesos | Proceso | Variables, balances, recuperación, calidad, ensayos y optimización |
| OPR | Operador de Planta | Operación | Panel de operación, variables, alarmas, eventos, rondas |
| MEC | Mantenimiento Mecánico | Mantenimiento | OT, inspecciones, repuestos, condición mecánica |
| ELE | Mantenimiento Eléctrico / Potencia | Eléctrica | PTE, protecciones, motores, MCC, calidad de energía |
| IOT | Instrumentista / Automatización / OT | Automatización | Instrumentos, señales, calibración, PLC/SCADA, historian |
| GPN | GPON / Comunicaciones | Telecom | OLT/ODN/ONU, fibra, OTDR, VLAN, disponibilidad |
| LAB | Laboratorio / QA-QC | Laboratorio | Muestras, métodos, resultados, QA/QC, certificados |
| WMS | Almacén / Logística | Logística | Inventarios, stock, lotes, ubicaciones, movimientos |
| BUY | Compras / Proveedores | Abastecimiento | RQ, RFQ, ofertas, PO, proveedores, homologación |
| CST | Presupuesto / Costos | Finanzas | LULO, APU, costos, CAPEX/OPEX, control presupuestario |
| ENG | Ingeniería / Proyectos | Ingeniería | Diseño, MOC, documentación, proyectos, AS-BUILT |
| HSE | HSE / SSOMA | Seguridad | Riesgos, incidentes, permisos, cámaras, cumplimiento |
| INS | Instructor / Docente | LMS | Cursos, materiales, evaluaciones, certificaciones |
| STD | Estudiante | LMS | Cursos asignados, progreso, evaluaciones, certificados |
| SUP | Proveedor / Vendedor | Externo | Perfil, productos, ofertas, pedidos, facturación habilitada |
| AUD | Auditor | Gobierno | Lectura transversal, evidencias, historial, trazabilidad y exportación |
| VIS | Visitante / Público | Público | Contenido público, catálogos autorizados y dashboards públicos |
| SEC | Seguridad Física / CCTV | Seguridad | Cámaras, eventos, retención y evidencias de video |

## 63.1 Leyenda de permisos

`R` lectura · `C` crear · `U` editar · `A` aprobar · `X` ejecutar acción transaccional · `P` publicar · `M` administrar maestros · `-` sin acceso por defecto. El ABAC debe añadir restricciones por planta, área, organización, criticidad, propietario y clasificación documental.


## 63.2 Matriz de permisos por dominio

| Rol | PROC | PTE | IOT | GPON | CC | LAB | MNT | RQ | OF | CAM | WMS | LULO | LMS | DOC | ADMIN |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| SYS-ADM | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | RCUAMP | M |
| DIR | R | R | R | R | R | R | R | RA | RA | R | R | RA | R | R | - |
| GPL | RU | R | R | R | R | R | RA | RA | R | R | R | R | R | RU | - |
| MET | RCU | R | R | R | RCU | RCU | R | C | R | R | R | R | R | RCU | - |
| OPR | RU | R | R | R | C | R | C | C | - | R | R | - | R | R | - |
| MEC | R | R | R | R | R | R | RCUX | C | R | R | RCU | R | R | RCU | - |
| ELE | R | RCU | R | R | R | R | RCUX | C | R | R | R | R | R | RCU | - |
| IOT | R | R | RCU | R | R | R | RCUX | C | R | R | R | - | R | RCU | - |
| GPN | R | R | R | RCU | R | R | RCUX | C | R | RCU | R | - | R | RCU | - |
| LAB | R | - | R | - | RCUA | RCUA | R | C | R | - | R | - | R | RCU | - |
| WMS | R | R | R | R | R | R | R | C | R | - | RCUX | R | R | R | - |
| BUY | R | R | R | R | R | R | R | RCUA | RCUA | - | R | R | R | RCU | - |
| CST | R | R | R | R | R | R | R | R | R | - | R | RCUA | R | RCU | - |
| ENG | RCU | RCU | RCU | RCU | R | R | RCU | C | R | RCU | R | RCU | R | RCUAP | - |
| HSE | R | R | R | R | R | R | R | C | R | RCU | R | - | R | RCU | - |
| INS | R | - | - | - | - | - | - | - | - | - | - | - | RCUAP | RCU | - |
| STD | R | - | - | - | - | - | - | - | - | - | - | - | R | R | - |
| SUP | R | R | R | R | - | - | - | R | RCU | - | - | - | R | RCU | - |
| AUD | R | R | R | R | R | R | R | R | R | R | R | R | R | R | - |
| VIS | R | R | R | R | - | - | - | - | - | - | - | - | R | R | - |
| SEC | R | R | R | R | - | - | C | C | R | RCUX | - | - | R | RCU | - |

# 64. CATÁLOGO MAESTRO DE DASHBOARDS

| Código | Dashboard | Audiencia | KPI/Contenido | Visualización | Refresco | Rol principal |
| --- | --- | --- | --- | --- | --- | --- |
| FUR-DASH-PUB-001 | Estado Público de Planta | Público | Producción autorizada; disponibilidad; seguridad; sostenibilidad | Tarjetas KPI + tendencia 24h + estado general | 5–15 min | VIS |
| FUR-DASH-EXE-001 | Ejecutivo Corporativo | Dirección | Producción; recuperación; costo/t; disponibilidad; CAPEX/OPEX; seguridad | Scorecards + waterfall + tendencias + semáforos | 15–60 min | DIR |
| FUR-DASH-GPL-001 | Gerencia de Planta | Gerente de Planta | t/d; recuperación; OEE; disponibilidad; alarmas; backlog | KPI + proceso + Pareto + eventos | 1–5 min | GPL |
| FUR-DASH-MET-001 | Metalurgia / Procesos | Metalurgista | Tonelaje; P80; % sólidos; pH; ORP; NaCN; recuperación; Au solución/carbón | Tendencias + balance + correlaciones IoT/CC/LAB | 1–5 min | MET |
| FUR-DASH-OPR-001 | Operación de Planta | Operador | Variables críticas; setpoints; alarmas; estado equipos; producción turno | Mímico resumido + alarmas + trend | 5–30 s | OPR |
| FUR-DASH-PTE-001 | Potencia Eléctrica | Eléctrica | kW/kVA; demanda; PF; THD; V/I; trips; disponibilidad MCC/VFD | Unifilar resumido + tendencias + eventos | 5–30 s | ELE |
| FUR-DASH-IOT-001 | Instrumentación / OT | IOT | Disponibilidad instrumentos; calidad señal; calibraciones; tags offline; latencia | Health matrix + trends + alarmas | 10–60 s | IOT |
| FUR-DASH-GPON-001 | GPON / Comunicaciones | Telecom | ONU online; Rx/Tx; pérdida; margen; latencia; puertos; OTDR pendientes | Topología + heatmap óptico + eventos | 30–60 s | GPN |
| FUR-DASH-CC-001 | Control de Calidad | QA/QC | Muestras tomadas; pendientes; cadena; no conformidades; duplicados/blancos | Pipeline muestras + Pareto + estado custodia | 5–15 min | LAB |
| FUR-DASH-LAB-001 | Laboratorio | Laboratorio | TAT; muestras pendientes; QA/QC; equipos; calibraciones; resultados fuera control | Cola laboratorio + control charts + KPI | 5–15 min | LAB |
| FUR-DASH-MNT-001 | Mantenimiento | Mantenimiento | Disponibilidad; MTBF; MTTR; backlog; cumplimiento PM; criticidad; repuestos | Pareto fallas + Gantt + backlog + condición | 5–15 min | MEC |
| FUR-DASH-WMS-001 | WMS / Inventario | Almacén | Stock crítico; rotación; quiebres; reservas; movimientos; exactitud | KPI + ABC + aging + mapa almacén | 5–15 min | WMS |
| FUR-DASH-BUY-001 | Compras / Abastecimiento | Compras | RQ abiertas; RFQ; lead time; ahorro; OTIF proveedor; PO pendientes | Funnel sourcing + aging + proveedor | 15–60 min | BUY |
| FUR-DASH-CST-001 | Presupuesto / Costos | Costos | Presupuesto base; comprometido; real; variación; APU; CAPEX/OPEX | Curva S + variación + estructura de costos | 15–60 min | CST |
| FUR-DASH-ENG-001 | Ingeniería / Proyectos | Ingeniería | MOC; documentos; revisiones; TBC/HOLD; avance proyectos; punch list | Kanban + matriz madurez + documentos | 15–60 min | ENG |
| FUR-DASH-HSE-001 | HSE / SSOMA | HSE | Incidentes; condiciones inseguras; permisos; cámaras/eventos; inspecciones | Mapa + incidentes + tendencias | 5–15 min | HSE |
| FUR-DASH-CAM-001 | Seguridad / CCTV | Seguridad | Cámaras online; storage; analíticas; eventos; cobertura; mantenimiento | Video wall + mapa + health | 5–30 s | SEC |
| FUR-DASH-LMS-001 | Formación / LMS | Instructor | Cursos; progreso; vencimientos; certificaciones; competencias | KPI + matriz competencias + calendario | 15–60 min | INS |
| FUR-DASH-SUP-001 | Portal Proveedor | Proveedor | RFQ recibidas; ofertas; PO; entregas; documentos; score | Funnel comercial + tareas | 15–60 min | SUP |
| FUR-DASH-AUD-001 | Auditoría y Gobierno | Auditor | Cambios; accesos; aprobaciones; calidad D0-D5; TBC/HOLD; evidencias | Timeline + matrices + excepciones | 15–60 min | AUD |

## 64.1 Reglas comunes de dashboard

Cada dashboard debe tener FUR propio, propietario, audiencia, filtros por planta/área/etapa/turno/activo, definición de KPI versionada, fuente autorizada, frecuencia de refresco, timestamp de datos, indicador de calidad, permisos y enlace hasta el registro FUR que explica cada número. Los dashboards **no son sistema de autoridad**: agregan y contextualizan datos provenientes de Odoo, FUR, SCADA/Historian, laboratorio y otros repositorios autorizados.


## 64.2 Matriz rol → dashboard inicial

| Rol | Dashboard inicial | Dashboards secundarios | Drill-down prioritario |
| --- | --- | --- | --- |
| SYS-ADM | Auditoría/Gobierno | Todos | Configuración, seguridad, logs |
| DIR | Ejecutivo Corporativo | Planta, Costos, HSE | Área → KPI → evidencia |
| GPL | Gerencia de Planta | Procesos, MNT, PTE, Calidad | Etapa → activo → evento |
| MET | Metalurgia / Procesos | IOT, CC, LAB | Variable → muestra → análisis |
| OPR | Operación de Planta | Procesos, alarmas | Etapa → equipo → variable |
| MEC | Mantenimiento | WMS, IOT | Activo → OT → BOM → stock |
| ELE | Potencia Eléctrica | MNT, IOT | Unifilar → activo → protección/evento |
| IOT | Instrumentación / OT | Procesos, PTE | Instrumento → PLC/SCADA → historian |
| GPN | GPON / Comunicaciones | CAM, IOT | OLT → ODN → ONU → servicio |
| LAB | Laboratorio / QA-QC | CC, Procesos | Muestra → método → resultado |
| WMS | WMS / Inventario | MNT, Compras | Ítem → ubicación → movimiento → demanda |
| BUY | Compras / Abastecimiento | WMS, Costos | RQ → OF → PO → recepción |
| CST | Presupuesto / Costos | Compras, Ejecutivo | Proyecto → capítulo → APU → costo |
| ENG | Ingeniería / Proyectos | Procesos, MNT, Calidad | MOC → documento → activo |
| HSE | HSE / SSOMA | CAM, Planta | Evento → ubicación → evidencia |
| INS | Formación / LMS | Competencias | Curso → alumno → certificación |
| STD | Formación personal | — | Curso → unidad → evaluación |
| SUP | Portal Proveedor | Ofertas/PO | RFQ → oferta → orden |
| AUD | Auditoría y Gobierno | Cualquier dashboard en lectura | KPI → fuente → historial |
| VIS | Estado Público | Contenido público | KPI público → contexto |
| SEC | Seguridad / CCTV | HSE | Cámara → evento → evidencia |

## 64.3 Registro de KPIs — fórmulas mínimas gobernadas

| KPI | Fórmula conceptual | Fuente de autoridad | Frecuencia |
| --- | --- | --- | --- |
| Disponibilidad física | Tiempo disponible / tiempo calendario × 100 | MNT/Operación | turno/día |
| Utilización | Tiempo operando / tiempo disponible × 100 | SCADA/Historian | minuto/turno |
| OEE | Disponibilidad × rendimiento × calidad | Operación + Calidad | turno/día |
| Throughput | Masa procesada / tiempo | Historian/WIT | 1–5 min |
| Recuperación Au | Au producto / Au alimentación × 100 | LAB/Balance metalúrgico | campaña/turno |
| Consumo específico energía | kWh / t procesada | PTE + Producción | turno/día |
| MTBF | Horas operativas / número de fallas | MNT | semanal/mensual |
| MTTR | Horas de reparación / número de reparaciones | MNT | semanal/mensual |
| Cumplimiento PM | OT PM completadas / OT PM planificadas × 100 | MNT | semanal |
| Stockout crítico | Ítems críticos sin disponibilidad / ítems críticos × 100 | WMS | hora/día |
| TAT laboratorio | Aprobación − recepción muestra | LAB | muestra/día |
| QA/QC aceptación | Controles aceptados / controles ejecutados × 100 | LAB/CC | lote/corrida |
| Disponibilidad IoT | Tags Good/Online / tags esperados × 100 | SCADA/Historian | minuto |
| Disponibilidad GPON | ONU online / ONU esperadas × 100 | NMS GPON | minuto |
| Completitud FUR | Campos/evidencias obligatorias válidas / total obligatorio × 100 | FUR | evento/día |
| Madurez D4+ | Registros D4/D5 / registros totales × 100 | FUR | diario |
| Lead time compra | Recepción − aprobación RQ | Odoo Purchase | orden |
| Ahorro sourcing | (Baseline − adjudicado) / baseline × 100 | OF/PO | evento |
| Variación presupuesto | (Real − presupuesto) / presupuesto × 100 | LULO/Odoo | mensual |

> Las fórmulas definitivas deben aprobarse por propietario del KPI; esta tabla define la estructura de gobierno, no sustituye el procedimiento corporativo de cálculo.

# 65. INVENTARIO UX/UI DE PANTALLAS Y RUTAS

| Área | Ruta | Pantalla | Contenido/función |
| --- | --- | --- | --- |
| Público | / | Home | Hero industrial, búsqueda global, categorías, ofertas, dashboards, mapa, actividad |
| Público | /catalogo | Catálogo global | Filtros facetados, pestañas, cards, grid/list/map, paginación |
| Público | /marketplace | Marketplace | Productos/servicios/cursos/proveedores, comparación y RFQ |
| Público | /profesionales | Servicios profesionales | Directorio, perfiles, servicios, reseñas, contratación |
| Público | /proveedores | Proveedores | Directorio, certificaciones, productos, score, mapa |
| Público | /cursos | Cursos LMS | Catálogo, rutas, instructores, certificaciones |
| Público | /planta/tiempo-real | Planta pública | KPIs autorizados, estado y producción |
| Público | /conocimiento | Conocimiento | Biblioteca, manuales, guías, noticias técnicas |
| Privado | /app | Mi inicio | Actividad, tareas, alertas, accesos rápidos, KPIs personales |
| Privado | /app/fur | Mis FUR | Búsqueda, favoritos, recientes, pendientes, por dominio |
| Privado | /app/fur/:domain/:id | Ficha FUR | Cabecera, común, técnico, relaciones, docs, calidad, historial |
| Privado | /app/activos | Activos | Catálogo de activos, criticidad, estado, mapas, quick actions |
| Privado | /app/procesos | Procesos | Mapa de procesos, etapas, balances, activos, variables |
| Privado | /app/redes | Redes transversales | Vista de 10 redes, topologías, actividad, filtros |
| Privado | /app/mantenimiento | Mantenimiento | Activos, planes, OT, condición, BOM, KPI |
| Privado | /app/wms | WMS | Stock, almacenes, lotes, movimientos, reservas, RFID |
| Privado | /app/calidad | Calidad | Muestras, puntos, custodia, no conformidades |
| Privado | /app/laboratorio | Laboratorio | Solicitudes, corridas, resultados, QA/QC, certificados |
| Privado | /app/requisiciones | Requisiciones | Crear, aprobar, especificar, convertir a RFQ/PO |
| Privado | /app/ofertas | Ofertas | Comparar, evaluar, desviaciones, recomendación técnica |
| Privado | /app/presupuestos | Presupuestos LULO | Proyecto, capítulos, APU, materiales, MO, equipos, análisis |
| Privado | /app/documentos | Documentos | Repositorio, carpetas, versionado, permisos, búsqueda |
| Privado | /app/mapas | Mapa planta | Capas activos/procesos/IoT/GPON/CAM/WMS/alarmas |
| Privado | /app/dashboards | Dashboards | Galería por rol, favoritos, filtros y drilldown |
| Privado | /app/reportes | Reportes | Operación, producción, calidad, MNT, costos, compras |
| Privado | /app/organizacion | Organización | Empresas, áreas, equipos, usuarios, roles, tiendas |
| Privado | /app/admin | Administración | Catálogos, parámetros, permisos, auditoría, integraciones |
| Privado | /app/perfil | Perfil | Seguridad, preferencias, notificaciones, dispositivos, cuota |

# 66. ESPECIFICACIÓN DEL MOTOR DE FICHAS FUR EN REACT


La aplicación no debe contener una página distinta hard-coded para cada activo. Debe existir un **FUR Rendering Engine** impulsado por metadatos: `dominio → familia → subtipo → versión de plantilla`. La plantilla resuelve secciones, campos, unidades, reglas, componentes, permisos, acciones y relaciones.

**Bloques universales:** Cabecera FUR; hero/imagen; estado; criticidad; madurez; QR; ubicación; resumen; identidad; jerarquía; clasificación; responsabilidad; ciclo de vida; bloque especializado; relaciones transversales; documentos; proveedor/sourcing; calidad del dato; TBC/HOLD; historial; auditoría; checklist; acciones rápidas.

**Estados de UI:** loading, skeleton, empty, no-permission, error parcial, offline, dato desactualizado, dato referencial, TBC, HOLD, confirmado, archivado. Toda pantalla técnica debe mostrar timestamp, fuente y madurez para datos críticos.

| Componente | Responsabilidad |
| --- | --- |
| FurHeader | Código, TAG, nombre, estado, criticidad, madurez, versión |
| FurHero | Imagen técnica/foto + ubicación + acciones |
| FurIdentityPanel | UUID, dominio, familia, clasificación |
| FurHierarchy | Planta > área > proceso > sistema > activo |
| FurTechnicalBlock | Campos dinámicos por dominio/familia |
| FurRelationsGraph | Relaciones FUR↔FUR con tipo y cardinalidad |
| FurDocuments | Documentos, revisiones, estado, evidencia |
| FurDataQuality | D0-D5, condición, fuente, validación |
| FurHoldPanel | Pendientes TBC/HOLD y responsables |
| FurAuditTimeline | Eventos, cambios, usuario, timestamp |
| FurKpiPanel | KPIs por dominio |
| FurMapCard | Ubicación geoespacial / planta |
| FurSupplierBlock | Fabricante/proveedor/garantía/sourcing |
| FurLifecycle | Alta, puesta en servicio, mantenimiento, baja |
| FurQuickActions | OT, RQ, RFQ, documento, mapa, dashboard, curso |

# 67. CATÁLOGO DE APIs POR DOMINIO

| Método | Endpoint | Función |
| --- | --- | --- |
| GET | /api/v1/fur | Lista paginada y filtrable de fur |
| GET | /api/v1/fur/:id | Detalle fur con permisos y calidad |
| POST | /api/v1/fur | Crear fur según rol/workflow |
| PATCH | /api/v1/fur/:id | Editar fur con control de concurrencia |
| GET | /api/v1/proc | Lista paginada y filtrable de proc |
| GET | /api/v1/proc/:id | Detalle proc con permisos y calidad |
| POST | /api/v1/proc | Crear proc según rol/workflow |
| PATCH | /api/v1/proc/:id | Editar proc con control de concurrencia |
| GET | /api/v1/pte | Lista paginada y filtrable de pte |
| GET | /api/v1/pte/:id | Detalle pte con permisos y calidad |
| POST | /api/v1/pte | Crear pte según rol/workflow |
| PATCH | /api/v1/pte/:id | Editar pte con control de concurrencia |
| GET | /api/v1/iot | Lista paginada y filtrable de iot |
| GET | /api/v1/iot/:id | Detalle iot con permisos y calidad |
| POST | /api/v1/iot | Crear iot según rol/workflow |
| PATCH | /api/v1/iot/:id | Editar iot con control de concurrencia |
| GET | /api/v1/gpon | Lista paginada y filtrable de gpon |
| GET | /api/v1/gpon/:id | Detalle gpon con permisos y calidad |
| POST | /api/v1/gpon | Crear gpon según rol/workflow |
| PATCH | /api/v1/gpon/:id | Editar gpon con control de concurrencia |
| GET | /api/v1/cc | Lista paginada y filtrable de cc |
| GET | /api/v1/cc/:id | Detalle cc con permisos y calidad |
| POST | /api/v1/cc | Crear cc según rol/workflow |
| PATCH | /api/v1/cc/:id | Editar cc con control de concurrencia |
| GET | /api/v1/lab | Lista paginada y filtrable de lab |
| GET | /api/v1/lab/:id | Detalle lab con permisos y calidad |
| POST | /api/v1/lab | Crear lab según rol/workflow |
| PATCH | /api/v1/lab/:id | Editar lab con control de concurrencia |
| GET | /api/v1/mnt | Lista paginada y filtrable de mnt |
| GET | /api/v1/mnt/:id | Detalle mnt con permisos y calidad |
| POST | /api/v1/mnt | Crear mnt según rol/workflow |
| PATCH | /api/v1/mnt/:id | Editar mnt con control de concurrencia |
| GET | /api/v1/rq | Lista paginada y filtrable de rq |
| GET | /api/v1/rq/:id | Detalle rq con permisos y calidad |
| POST | /api/v1/rq | Crear rq según rol/workflow |
| PATCH | /api/v1/rq/:id | Editar rq con control de concurrencia |
| GET | /api/v1/of | Lista paginada y filtrable de of |
| GET | /api/v1/of/:id | Detalle of con permisos y calidad |
| POST | /api/v1/of | Crear of según rol/workflow |
| PATCH | /api/v1/of/:id | Editar of con control de concurrencia |
| GET | /api/v1/cam | Lista paginada y filtrable de cam |
| GET | /api/v1/cam/:id | Detalle cam con permisos y calidad |
| POST | /api/v1/cam | Crear cam según rol/workflow |
| PATCH | /api/v1/cam/:id | Editar cam con control de concurrencia |
| GET | /api/v1/wms | Lista paginada y filtrable de wms |
| GET | /api/v1/wms/:id | Detalle wms con permisos y calidad |
| POST | /api/v1/wms | Crear wms según rol/workflow |
| PATCH | /api/v1/wms/:id | Editar wms con control de concurrencia |
| GET | /api/v1/documents | Lista paginada y filtrable de documents |
| GET | /api/v1/documents/:id | Detalle documents con permisos y calidad |
| POST | /api/v1/documents | Crear documents según rol/workflow |
| PATCH | /api/v1/documents/:id | Editar documents con control de concurrencia |
| GET | /api/v1/dashboards | Lista paginada y filtrable de dashboards |
| GET | /api/v1/dashboards/:id | Detalle dashboards con permisos y calidad |
| POST | /api/v1/dashboards | Crear dashboards según rol/workflow |
| PATCH | /api/v1/dashboards/:id | Editar dashboards con control de concurrencia |
| GET | /api/v1/maps | Lista paginada y filtrable de maps |
| GET | /api/v1/maps/:id | Detalle maps con permisos y calidad |
| POST | /api/v1/maps | Crear maps según rol/workflow |
| PATCH | /api/v1/maps/:id | Editar maps con control de concurrencia |
| GET | /api/v1/lulo | Lista paginada y filtrable de lulo |
| GET | /api/v1/lulo/:id | Detalle lulo con permisos y calidad |
| POST | /api/v1/lulo | Crear lulo según rol/workflow |
| PATCH | /api/v1/lulo/:id | Editar lulo con control de concurrencia |
| GET | /api/v1/lms | Lista paginada y filtrable de lms |
| GET | /api/v1/lms/:id | Detalle lms con permisos y calidad |
| POST | /api/v1/lms | Crear lms según rol/workflow |
| PATCH | /api/v1/lms/:id | Editar lms con control de concurrencia |
| GET | /api/v1/suppliers | Lista paginada y filtrable de suppliers |
| GET | /api/v1/suppliers/:id | Detalle suppliers con permisos y calidad |
| POST | /api/v1/suppliers | Crear suppliers según rol/workflow |
| PATCH | /api/v1/suppliers/:id | Editar suppliers con control de concurrencia |
| GET | /api/v1/search | Búsqueda global FUR/TAG/nombre/documento/proveedor |
| GET | /api/v1/fur/:id/relations | Grafo de relaciones |
| POST | /api/v1/fur/:id/relations | Crear relación gobernada |
| GET | /api/v1/fur/:id/history | Historial y auditoría |
| GET | /api/v1/fur/:id/documents | Documentos vinculados |
| POST | /api/v1/fur/:id/quality/promote | Promover madurez con aprobación |
| GET | /api/v1/realtime/subscriptions | Catálogo de variables realtime autorizadas |
| GET | /api/v1/health | Health check plataforma |

# 68. MAPEO MAESTRO ODOO 19 → DOMINIOS FUR

| Módulo Odoo | Modelos principales | Autoridad/uso | Dominios |
| --- | --- | --- | --- |
| Base/Contacts | res.company, res.users, res.partner | Organización, usuarios, proveedores, fabricantes | Todos |
| Products | product.template, product.product, product.category, uom.uom | Catálogo de equipos/materiales/servicios | PTE/IOT/GPON/MNT/RQ/OF/WMS |
| Inventory | stock.warehouse, stock.location, stock.lot, stock.quant, stock.move, stock.picking | Stock, ubicaciones, lotes, movimientos | WMS/MNT/RQ |
| Purchase | purchase.order, purchase.order.line | RFQ, cotización, PO | RQ/OF |
| Maintenance | maintenance.equipment, maintenance.request, maintenance.team | Equipos mantenibles, OT, equipos | MNT |
| Quality | quality.point, quality.check, quality.alert | Puntos/checks/alertas según edición instalada | CC/LAB |
| Documents | ir.attachment + Documents según edición | Archivos, evidencias, revisiones | Todos |
| Project | project.project, project.task | Proyectos, MOC, tareas | ENG/MNT/LULO |
| Accounting/Analytic | account.analytic.* y modelos contables instalados | Centro de costo, presupuesto, costos | LULO/RQ/OF |
| HR | hr.employee | Responsables, técnicos, analistas | Todos |
| Mail | mail.message, mail.activity | Chatter, actividades, trazabilidad | Todos |
| eLearning | slide.channel y modelos relacionados según edición | Cursos y rutas | LMS |
| Spreadsheet/Dashboards | según edición instalada | BI embebido y reportes | Dashboards |

**Regla:** los nombres de modelos de una instancia Odoo 19 deben verificarse contra la instalación y módulos realmente habilitados. El diseño no debe inventar modelos físicos ni escribir SQL transaccional directo para saltarse ORM/reglas de negocio.


# 69. WBS / PLAN DE DESARROLLO POR FASES CON ENTREGABLES Y GATES

| Fase | Nombre | Entregables | Responsable principal | Gate de salida |
| --- | --- | --- | --- | --- |
| F0 | Gobierno y alcance | Backlog maestro, RACI, criterios D0-D5, registro HOLD/TBC | Sponsor + Arquitectura | Alcance aprobado |
| F1 | Levantamiento AS-FOUND | Inventarios PROC/PTE/IOT/GPON/MNT, documentos, Odoo real, OT | Ingeniería + Datos | Fuentes reconciliadas |
| F2 | UX Research / IA | Personas, journeys, sitemap, card sorting, prototipos | UX | IA validada |
| F3 | Design System | Tokens, componentes, patrones FUR, accesibilidad | UX/FE | Storybook/kit aprobado |
| F4 | Fundación DevOps | Repos, CI/CD, entornos, secretos, observabilidad | DevOps | Pipelines verdes |
| F5 | Odoo/FUR Core | Módulos core, fur_record, relaciones, documentos, auditoría | Odoo/BE | CRUD + permisos |
| F6 | BFF/API | Auth, OpenAPI, filtros, búsqueda, composición | Backend | Contrato v1 estable |
| F7 | App Shell/Home/Catálogo | Navegación, search, cards, filtros, favoritos | Frontend | UX acceptance |
| F8 | FUR Engine | Renderer por metadatos, bloques comunes, versiones | Frontend/Backend | 3 dominios piloto |
| F9 | PROC/PTE/IOT | Catálogos 18 etapas, fichas, relaciones y datos | Multidisciplina | 540 ejemplos cargables |
| F10 | GPON/CAM | Topología, OTDR, video, almacenamiento, mapas | Telecom/Security | Red y video navegables |
| F11 | CC/LAB | Muestras, custodia, métodos, QA/QC, certificados | Lab/Quality | Trazabilidad muestra→resultado |
| F12 | MNT/WMS | Planes, OT, BOM, stock, condición, confiabilidad | MNT/WMS | Activo→OT→repuesto |
| F13 | RQ/OF/Compras | Aprobación, RFQ, ofertas, evaluación, PO | Procurement | RQ→OF→PO |
| F14 | LULO/Costos | APU, materiales, MO, equipos, indirectos, escenarios | Costos | Presupuesto reproducible |
| F15 | Dashboards/BI | 20 dashboards, KPI registry, drilldown, calidad | BI | KPIs trazables |
| F16 | OT/IT Realtime | Gateway, SCADA/Historian, subscriptions, cache | OT/Backend | Datos realtime gobernados |
| F17 | Marketplace/LMS/Knowledge | Productos, proveedores, servicios, cursos, documentos | Producto | Ecosistema comercial/conocimiento |
| F18 | Seguridad/Hardening | RBAC/ABAC, SAST/DAST, logging, backups, DR | Security | Security gate |
| F19 | Migración y Data Quality | ETL, reconciliación, deduplicación, promoción madurez | Data | Cargas aprobadas |
| F20 | FAT/SAT/UAT | Pruebas por flujo, rol, red, dato, integración | QA | Actas aprobadas |
| F21 | Piloto | Molienda/clasificación + redes asociadas | Operación | KPIs piloto cumplidos |
| F22 | Escalamiento 18 etapas | Oleadas por área y red | PMO | Cobertura completa |
| F23 | Operación y mejora | SLA, soporte, backlog, capacitación, releases | Producto/IT | Operación estable |

# 70. CRITERIOS DE ACEPTACIÓN TRANSVERSALES

| Área | Criterio |
| --- | --- |
| Identidad | 100% registros con UUID + código FUR único + dominio + versión |
| Trazabilidad | Relaciones principales navegables y auditables end-to-end |
| Datos | Todo dato crítico muestra fuente, condición, madurez y timestamp |
| Seguridad | Ninguna acción fuera de matriz RBAC/ABAC y segregación de funciones |
| UX | Búsqueda global, filtros y FUR usable en desktop/tablet; móvil para tareas de campo |
| Odoo | No duplicar maestro nativo cuando existe autoridad Odoo |
| OT | Series temporales no se duplican masivamente en FUR; se referencian a Historian |
| Documentos | Revisión, vigencia, clasificación y vínculo FUR para evidencia |
| Mantenimiento | Activo→plan→OT→BOM→stock navegable |
| Calidad/Lab | Muestra→custodia→solicitud→método→resultado→QA/QC→certificado |
| Abastecimiento | Necesidad→RQ→RFQ/OF→evaluación→PO trazable |
| Dashboards | KPI con definición, fórmula, fuente, owner, frecuencia y drilldown |
| Auditoría | Cambios, aprobaciones, accesos y eventos críticos consultables |
| Performance | Objetivos medidos por ruta/API y volumen de catálogo |
| Pruebas | Unit/integration/E2E/FAT/SAT/UAT sin críticos abiertos antes de producción |

# 71. ANEXO A — CATÁLOGO FUENTE FUR-PROC 18 ETAPAS × 10

> Contenido incorporado desde el documento maestro interno del proyecto. Se preserva para no perder el detalle de los 180 ejemplos de activos de proceso.


# CATÁLOGO MAESTRO — FUR-PROC — ACTIVOS FÍSICOS POR ETAPA DE PROCESO
## Planta de Beneficio de Oro — 18 etapas × 10 FUR de activos = 180 ejemplos referenciales

**Código documental:** `CAT-FUR-PROC-ACTIVOS-180-001`  
**Revisión:** `REV.00`  
**Fecha:** `2026-09-16`  
**Red transversal:** `FUR-PROC — Procesos`  
**Base de referencia:** Ecosistema Digital FUR + documentos maestros de Planta REVEMIN + infografías FUR-PROC + investigación pública de equipos de procesamiento de minerales.  
**Estado:** Catálogo técnico de ejemplos / **NO AS-BUILT / NO IFC / NO AFC**.

> **REGLA OBLIGATORIA:** los 180 registros de este catálogo son **ejemplos referenciales** para diseño del Ecosistema Digital FUR. Salvo donde se indique “(*) base documental”, los valores numéricos son ejemplos de ingeniería de catálogo y se clasifican **Referencial / D1**. Incluso los valores tomados de documentos del proyecto se mantienen aquí como **Referencial / D1 para el catálogo** hasta su reconciliación AS-FOUND / placa / PFD / P&ID / Asset Register.

---

# 1. OBJETIVO

Construir un catálogo maestro navegable de activos físicos asociados a la **Red Transversal de Procesos — FUR-PROC**, organizado por las **18 etapas productivas** de una planta de beneficio de oro y asignando **10 ejemplos de FUR de activos físicos por etapa**.

Resultado:

```text
18 etapas productivas
× 10 FUR de activos por etapa
= 180 FUR de activos físicos referenciales
```

El catálogo sirve como base para:

- HOME / Mapa Integral de Activos;
- catálogo React.js;
- Asset Register;
- relación Proceso ↔ Activo;
- integración con Odoo 19;
- mantenimiento y WMS;
- potencia;
- IoT / instrumentación;
- GPON / comunicaciones;
- QA-QC / laboratorio;
- requisiciones / ofertas;
- cámaras / seguridad;
- documentos, auditoría y madurez del dato.

---

# 2. FUENTES DEL PROYECTO Y PRECEDENCIA

La estructura productiva adoptada corresponde a la cadena consolidada de **18 etapas** del proyecto REVEMIN. La documentación maestra del proyecto establece además una capacidad nominal de planta de **1.500 t/d**, silos documentados de **300 t + 200 t**, Pre-Lix **2 × 103 m³**, CIL **4 × 230 m³** y CIP **10 × 112 m³**, siempre sujetos a la regla de no convertir automáticamente un dato documental en AS-BUILT.

La FUR-PROC-00123 del **Molino de Bolas MB-01** se utiliza como patrón visual y funcional de ficha: identidad, jerarquía, bloque técnico, relaciones, documentos, sourcing, calidad de dato, auditoría y TBC/HOLD.

## 2.1 Precedencia

1. Datos AS-BUILT / placa / P&ID aprobados, cuando existan.
2. Documentos maestros del proyecto.
3. Inventarios y planos reconciliados.
4. Datos de fabricante.
5. Ejemplos públicos de tecnología.
6. Ejemplos numéricos de este catálogo — **D1**.

---

# 3. INVESTIGACIÓN PÚBLICA USADA PARA ESTRUCTURAR EL CATÁLOGO

La investigación externa se utiliza únicamente para validar **familias típicas de equipos**, no para declarar datos reales de Planta REVEMIN.

- Metso describe un portafolio de procesamiento de minerales que abarca alimentación, trituración, cribado, molienda, hidrociclones, espesamiento, bombas de pulpa, filtración y manejo de materiales.
- La página de oro de Metso sitúa trituración y molienda como etapas centrales del flowsheet de procesamiento aurífero.
- International Cyanide Management Code describe de forma general la secuencia molienda → lixiviación agitada → CIL/CIP → separación de carbón → elución → electrowinning / recuperación.
- FLS describe plantas ADR con adsorción, elución Zadra/AARL, electrowinning, regeneración de carbón y refinación/fundición.
- Metso describe plantas de relaves secos integrando espesamiento, filtración y manejo de relaves.
- FLS publica hornos de regeneración de carbón con capacidades comerciales desde aproximadamente 0,5 a 20 t/d, lo que sirve únicamente como contexto tecnológico para el tipo de activo.

Referencias web se incluyen en el §15.

---

# 4. ADVERTENCIA DE ARQUITECTURA — FUR-PROC VS FUR DE ACTIVO

La documentación del proyecto contiene dos representaciones:

```text
FUR-PROC
= identidad del proceso / subproceso / etapa
```

y, visualmente:

```text
FUR-PROC-00123
= Molino de Bolas MB-01
```

Para evitar perder continuidad con las infografías del proyecto, este catálogo utiliza un **código visible de catálogo dentro de FUR-PROC**:

```text
FUR-PROC-D{NN}-{FAMILIA}-{SECUENCIA}
```

Ejemplo:

```text
FUR-PROC-D06-MOL-0001
```

Sin embargo, para una implementación normalizada se recomienda mantener disponible una clase canónica de activo:

```text
FUR-EQP-D06-MOL-0001
```

Por tanto, cada registro del catálogo presenta:

- **Código FUR-PROC de catálogo**: continuidad con la red transversal.
- **Código EQP canónico propuesto**: identidad física candidata.

La decisión final permanece **HOLD de arquitectura**.

---

# 5. CADENA PRODUCTIVA MAESTRA — 18 ETAPAS

| Nº | Código de proceso | Etapa | FUR de activos referenciales |
| --- | --- | --- | --- |
| 1 | FUR-PROC-01 | Recepción y Alimentación | 10 |
| 2 | FUR-PROC-02 | Trituración Primaria | 10 |
| 3 | FUR-PROC-03 | Cribado | 10 |
| 4 | FUR-PROC-04 | Trituración Secundaria | 10 |
| 5 | FUR-PROC-05 | Transporte / Silos | 10 |
| 6 | FUR-PROC-06 | Molienda Primaria | 10 |
| 7 | FUR-PROC-07 | Molienda Secundaria | 10 |
| 8 | FUR-PROC-08 | Clasificación | 10 |
| 9 | FUR-PROC-09 | Pre-lixiviación | 10 |
| 10 | FUR-PROC-10 | Espesamiento | 10 |
| 11 | FUR-PROC-11 | Lixiviación / CIL | 10 |
| 12 | FUR-PROC-12 | Adsorción CIP | 10 |
| 13 | FUR-PROC-13 | Manejo de Carbón Cargado | 10 |
| 14 | FUR-PROC-14 | Elución / Desorción | 10 |
| 15 | FUR-PROC-15 | Electrowinning | 10 |
| 16 | FUR-PROC-16 | Calcinación / Secado | 10 |
| 17 | FUR-PROC-17 | Fundición | 10 |
| 18 | FUR-PROC-18 | Producto Final / Reactivación / Colas | 10 |
## 5.1 Flujo maestro

```text
01 Recepción y Alimentación
→ 02 Trituración Primaria
→ 03 Cribado
→ 04 Trituración Secundaria
→ 05 Transporte / Silos
→ 06 Molienda Primaria
→ 07 Molienda Secundaria
→ 08 Clasificación
→ 09 Pre-lixiviación
→ 10 Espesamiento
→ 11 Lixiviación / CIL
→ 12 Adsorción CIP
→ 13 Manejo de Carbón Cargado
→ 14 Elución / Desorción
→ 15 Electrowinning
→ 16 Calcinación / Secado
→ 17 Fundición
→ 18 Producto Final / Reactivación / Colas
```

---

# 6. REGLA DE DATOS PARA LOS 180 EJEMPLOS

Todos los registros usan:

| Campo | Regla |
|---|---|
| Condición | `Referencial` |
| Madurez | `D1` |
| Estado de catálogo | `Ejemplo` |
| Uso | UX, modelo de datos, parametrización, pruebas y prototipado |
| Prohibición | No publicar como capacidad/placa AS-BUILT |
| Cierre | Reemplazar por datos reales reconciliados |

`(*)` significa que el tipo o valor tiene antecedente en documentos maestros del proyecto, pero en **este catálogo** se conserva como D1.

---

# 7. CATÁLOGO DETALLADO — 180 FUR DE ACTIVOS


## 7.1 — D01 — Recepción y Alimentación

**FUR proceso padre:** `FUR-PROC-01`  
**Contexto:** Tolvas, romana, alimentadores y cintas. La base de proyecto identifica recepción de mineral ROM y dosificación hacia trituración.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D01-TOL-0001 | FUR-EQP-D01-TOL-0001 | TOL-ROM-01 | Tolva de recepción ROM | Recepción temporal del mineral descargado | 80 t de capacidad útil | Referencial | D1 |
| 2 | FUR-PROC-D01-ROM-0002 | FUR-EQP-D01-ROM-0002 | ROM-BAL-01 | Romana / balanza camionera | Pesaje de mineral recibido | 60 t por pesada | Referencial | D1 |
| 3 | FUR-PROC-D01-GRZ-0003 | FUR-EQP-D01-GRZ-0003 | GRZ-01 | Grizzly estático | Retención de sobretamaño antes de alimentación | Abertura referencial 150 mm | Referencial | D1 |
| 4 | FUR-PROC-D01-APF-0004 | FUR-EQP-D01-APF-0004 | APF-01 | Alimentador de placas | Dosificación uniforme hacia trituración | 80 t/h; ancho 1.2 m | Referencial | D1 |
| 5 | FUR-PROC-D01-CVR-0005 | FUR-EQP-D01-CVR-0005 | CV-01 | Cinta transportadora de alimentación | Transferencia de mineral | 80 t/h; banda 800 mm; 45 m | Referencial | D1 |
| 6 | FUR-PROC-D01-MAG-0006 | FUR-EQP-D01-MAG-0006 | MAG-01 | Separador magnético suspendido | Remoción de hierro tramp | Banda 800 mm; 3 kW | Referencial | D1 |
| 7 | FUR-PROC-D01-MDT-0007 | FUR-EQP-D01-MDT-0007 | MD-01 | Detector de metales | Detección de metal no magnético | Velocidad banda 1.5 m/s | Referencial | D1 |
| 8 | FUR-PROC-D01-SMP-0008 | FUR-EQP-D01-SMP-0008 | SMP-ROM-01 | Muestreador de mineral ROM | Obtención de muestra representativa | Incremento 5 kg; 1 muestra/30 min | Referencial | D1 |
| 9 | FUR-PROC-D01-CHT-0009 | FUR-EQP-D01-CHT-0009 | CHT-01 | Chute de transferencia | Conducción controlada de mineral | Sección 0.8 × 0.8 m; caída 3 m | Referencial | D1 |
| 10 | FUR-PROC-D01-DCL-0010 | FUR-EQP-D01-DCL-0010 | DCL-01 | Colector de polvo recepción | Control de polvo fugitivo | Caudal 8,000 m³/h | Referencial | D1 |

## 7.2 — D02 — Trituración Primaria

**FUR proceso padre:** `FUR-PROC-02`  
**Contexto:** Conminución primaria. La documentación del proyecto referencia trituradora de mandíbula Pioneer 2036 y equipos de alimentación/descarga.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D02-JCR-0001 | FUR-EQP-D02-JCR-0001 | CR-JAW-01 | Trituradora de mandíbula primaria | Reducción primaria de mineral | Boca 20×36 in; capacidad ref. 75 t/h | Referencial | D1 |
| 2 | FUR-PROC-D02-APF-0002 | FUR-EQP-D02-APF-0002 | APF-02 | Alimentador de placas primario | Alimentación controlada a trituradora | 75 t/h; 1.0 m ancho | Referencial | D1 |
| 3 | FUR-PROC-D02-HYB-0003 | FUR-EQP-D02-HYB-0003 | HYB-01 | Rompe-rocas hidráulico | Liberación de atascos y sobretamaño | Martillo 500 kg; alcance 4.5 m | Referencial | D1 |
| 4 | FUR-PROC-D02-CVR-0004 | FUR-EQP-D02-CVR-0004 | CV-02 | Cinta de descarga primaria | Evacuación de producto triturado | 75 t/h; banda 800 mm; 35 m | Referencial | D1 |
| 5 | FUR-PROC-D02-DCL-0005 | FUR-EQP-D02-DCL-0005 | DCL-02 | Colector de polvo trituración | Captación en boca y descarga | 10,000 m³/h | Referencial | D1 |
| 6 | FUR-PROC-D02-LUB-0006 | FUR-EQP-D02-LUB-0006 | LUB-JAW-01 | Skid de lubricación trituradora | Lubricación de cojinetes | Depósito 250 L; bomba 2.2 kW | Referencial | D1 |
| 7 | FUR-PROC-D02-MTR-0007 | FUR-EQP-D02-MTR-0007 | MTR-JAW-01 | Motor principal trituradora | Accionamiento de chancadora | 90 kW; 440 V | Referencial | D1 |
| 8 | FUR-PROC-D02-CHT-0008 | FUR-EQP-D02-CHT-0008 | CHT-02 | Chute de descarga primaria | Transferencia a cinta | Sección 0.9 × 0.9 m | Referencial | D1 |
| 9 | FUR-PROC-D02-VIB-0009 | FUR-EQP-D02-VIB-0009 | VIB-01 | Alimentador vibratorio de apoyo | Regularización de carga | 70 t/h; 7.5 kW | Referencial | D1 |
| 10 | FUR-PROC-D02-SMP-0010 | FUR-EQP-D02-SMP-0010 | SMP-CR1-01 | Muestreador producto primario | Control granulométrico | Incremento 3 kg; 1 muestra/h | Referencial | D1 |

## 7.3 — D03 — Cribado

**FUR proceso padre:** `FUR-PROC-03`  
**Contexto:** Separación granulométrica. La base documental menciona cribas vibratorias Vibramech y Allis/Faco.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D03-SCR-0001 | FUR-EQP-D03-SCR-0001 | SCR-01 | Criba vibratoria primaria | Separación de gruesos y finos | 2 pisos; 1.8×4.8 m; 80 t/h | Referencial | D1 |
| 2 | FUR-PROC-D03-SCR-0002 | FUR-EQP-D03-SCR-0002 | SCR-02 | Criba vibratoria secundaria | Clasificación de producto | 2 pisos; 1.5×4.0 m; 65 t/h | Referencial | D1 |
| 3 | FUR-PROC-D03-MTR-0003 | FUR-EQP-D03-MTR-0003 | MTR-SCR01 | Motor criba 01 | Accionamiento vibratorio | 22 kW; 440 V | Referencial | D1 |
| 4 | FUR-PROC-D03-MTR-0004 | FUR-EQP-D03-MTR-0004 | MTR-SCR02 | Motor criba 02 | Accionamiento vibratorio | 18.5 kW; 440 V | Referencial | D1 |
| 5 | FUR-PROC-D03-CHT-0005 | FUR-EQP-D03-CHT-0005 | CHT-SCR-F | Chute de finos | Descarga de fracción pasante | 0.7×0.7 m | Referencial | D1 |
| 6 | FUR-PROC-D03-CHT-0006 | FUR-EQP-D03-CHT-0006 | CHT-SCR-O | Chute de sobretamaño | Retorno de sobretamaño | 0.8×0.8 m | Referencial | D1 |
| 7 | FUR-PROC-D03-CVR-0007 | FUR-EQP-D03-CVR-0007 | CV-FIN-01 | Cinta de finos | Transporte de material pasante | 65 t/h; 650 mm | Referencial | D1 |
| 8 | FUR-PROC-D03-CVR-0008 | FUR-EQP-D03-CVR-0008 | CV-OVS-01 | Cinta de sobretamaño | Transporte a trituración secundaria | 40 t/h; 650 mm | Referencial | D1 |
| 9 | FUR-PROC-D03-SPR-0009 | FUR-EQP-D03-SPR-0009 | SPR-SCR-01 | Manifold de lavado / spray | Lavado y control de cegamiento | 25 m³/h a 3 bar | Referencial | D1 |
| 10 | FUR-PROC-D03-SMP-0010 | FUR-EQP-D03-SMP-0010 | SMP-SCR-01 | Muestreador de producto cribado | Verificación granulométrica | Incremento 2 kg; 1 muestra/h | Referencial | D1 |

## 7.4 — D04 — Trituración Secundaria

**FUR proceso padre:** `FUR-PROC-04`  
**Contexto:** Reducción secundaria en circuito con cribado. La documentación referencia trituradoras cónicas Nordberg y Allis/Faco.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D04-CCR-0001 | FUR-EQP-D04-CCR-0001 | CR-CONE-01 | Trituradora cónica secundaria 01 | Reducción de sobretamaño | Capacidad ref. 70 t/h; CSS 18 mm | Referencial | D1 |
| 2 | FUR-PROC-D04-CCR-0002 | FUR-EQP-D04-CCR-0002 | CR-CONE-02 | Trituradora cónica secundaria 02 | Reserva / línea paralela | Capacidad ref. 70 t/h; CSS 18 mm | Referencial | D1 |
| 3 | FUR-PROC-D04-BIN-0003 | FUR-EQP-D04-BIN-0003 | BIN-SEC-01 | Tolva pulmón secundaria | Amortiguación de flujo | 40 t útiles | Referencial | D1 |
| 4 | FUR-PROC-D04-BFD-0004 | FUR-EQP-D04-BFD-0004 | BF-SEC-01 | Alimentador de banda | Dosificación a cono | 60 t/h; banda 650 mm | Referencial | D1 |
| 5 | FUR-PROC-D04-LUB-0005 | FUR-EQP-D04-LUB-0005 | LUB-CONE-01 | Skid de lubricación cono 01 | Lubricación y enfriamiento | Depósito 400 L; 5.5 kW | Referencial | D1 |
| 6 | FUR-PROC-D04-HYD-0006 | FUR-EQP-D04-HYD-0006 | HYD-CONE-01 | Unidad hidráulica cono 01 | Ajuste y despeje hidráulico | 200 bar; 7.5 kW | Referencial | D1 |
| 7 | FUR-PROC-D04-MTR-0007 | FUR-EQP-D04-MTR-0007 | MTR-CONE-01 | Motor trituradora cónica | Accionamiento principal | 132 kW; 440 V | Referencial | D1 |
| 8 | FUR-PROC-D04-CVR-0008 | FUR-EQP-D04-CVR-0008 | CV-SEC-01 | Cinta descarga secundaria | Transporte de producto | 70 t/h; 800 mm | Referencial | D1 |
| 9 | FUR-PROC-D04-MDT-0009 | FUR-EQP-D04-MDT-0009 | MD-SEC-01 | Detector de metales secundario | Protección de trituradora | Banda 800 mm | Referencial | D1 |
| 10 | FUR-PROC-D04-DCL-0010 | FUR-EQP-D04-DCL-0010 | DCL-SEC-01 | Colector de polvo secundario | Captación de polvo | 8,000 m³/h | Referencial | D1 |

## 7.5 — D05 — Transporte / Silos

**FUR proceso padre:** `FUR-PROC-05`  
**Contexto:** Transferencia y almacenamiento intermedio. La base maestra documenta Silo 1 = 300 t y Silo 2 = 200 t, sujetos a reconciliación AS-FOUND.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D05-SIL-0001 | FUR-EQP-D05-SIL-0001 | SIL-01 | Silo de mineral N.º 1 | Almacenamiento intermedio | 300 t (*) | Referencial | D1 |
| 2 | FUR-PROC-D05-SIL-0002 | FUR-EQP-D05-SIL-0002 | SIL-02 | Silo de mineral N.º 2 | Almacenamiento intermedio | 200 t (*) | Referencial | D1 |
| 3 | FUR-PROC-D05-CVR-0003 | FUR-EQP-D05-CVR-0003 | CV-03 | Cinta transportadora a silos | Transferencia principal | 80 t/h; 800 mm; 90 m | Referencial | D1 |
| 4 | FUR-PROC-D05-CVR-0004 | FUR-EQP-D05-CVR-0004 | CV-04 | Cinta distribuidora de silos | Distribución entre silos | 70 t/h; 650 mm; 35 m | Referencial | D1 |
| 5 | FUR-PROC-D05-CVR-0005 | FUR-EQP-D05-CVR-0005 | CV-05 | Cinta de descarga a molienda | Alimentación a molienda | 70 t/h; 650 mm; 55 m | Referencial | D1 |
| 6 | FUR-PROC-D05-BFD-0006 | FUR-EQP-D05-BFD-0006 | BF-SIL01 | Alimentador de banda Silo 1 | Extracción controlada | 50 t/h | Referencial | D1 |
| 7 | FUR-PROC-D05-BFD-0007 | FUR-EQP-D05-BFD-0007 | BF-SIL02 | Alimentador de banda Silo 2 | Extracción controlada | 40 t/h | Referencial | D1 |
| 8 | FUR-PROC-D05-DIV-0008 | FUR-EQP-D05-DIV-0008 | DIV-01 | Compuerta desviadora | Selección de destino | 2 vías; 650 mm | Referencial | D1 |
| 9 | FUR-PROC-D05-BSC-0009 | FUR-EQP-D05-BSC-0009 | BSC-01 | Balanza integradora de cinta | Medición de tonelaje | 0–100 t/h; ±0.5 % ref. | Referencial | D1 |
| 10 | FUR-PROC-D05-DCL-0010 | FUR-EQP-D05-DCL-0010 | DCL-SIL-01 | Colector de polvo silos | Control de polvo en carga | 6,000 m³/h | Referencial | D1 |

## 7.6 — D06 — Molienda Primaria

**FUR proceso padre:** `FUR-PROC-06`  
**Contexto:** Molienda húmeda primaria. La base documental identifica un Molino Marcy 10×20 pies; la ficha visual FUR-PROC-00123 usa un molino de bolas como ejemplo de UI.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D06-MOL-0001 | FUR-EQP-D06-MOL-0001 | MB-PRI-01 | Molino de bolas / Marcy primario | Liberación mineral primaria | 10×20 ft (*) ; capacidad catálogo 65 t/h | Referencial | D1 |
| 2 | FUR-PROC-D06-MTR-0002 | FUR-EQP-D06-MTR-0002 | MTR-MBPRI | Motor principal molino | Accionamiento | 750 kW; 2.4 kV | Referencial | D1 |
| 3 | FUR-PROC-D06-GBX-0003 | FUR-EQP-D06-GBX-0003 | GBX-MBPRI | Reductor principal | Reducción de velocidad | Relación 7.5:1; 800 kW | Referencial | D1 |
| 4 | FUR-PROC-D06-LUB-0004 | FUR-EQP-D06-LUB-0004 | LUB-MBPRI | Skid de lubricación | Lubricación de chumaceras/engranajes | Tanque 1,000 L; 11 kW | Referencial | D1 |
| 5 | FUR-PROC-D06-BCH-0005 | FUR-EQP-D06-BCH-0005 | BCH-01 | Sistema de carga de bolas | Reposición de medios | Tolva 5 t; dosificación 0–1 t/h | Referencial | D1 |
| 6 | FUR-PROC-D06-FED-0006 | FUR-EQP-D06-FED-0006 | FED-MBPRI | Alimentador de molino | Dosificación de mineral | 65 t/h | Referencial | D1 |
| 7 | FUR-PROC-D06-WTR-0007 | FUR-EQP-D06-WTR-0007 | WTR-MBPRI | Colector de agua de proceso | Adición de agua a molienda | 0–50 m³/h | Referencial | D1 |
| 8 | FUR-PROC-D06-TRM-0008 | FUR-EQP-D06-TRM-0008 | TRM-MBPRI | Trommel de descarga | Retención de sobretamaño | Ø 1.8 m × 2.5 m | Referencial | D1 |
| 9 | FUR-PROC-D06-SMP-0009 | FUR-EQP-D06-SMP-0009 | SMP-MBPRI | Cajón de descarga / sump | Recepción de pulpa | 15 m³ | Referencial | D1 |
| 10 | FUR-PROC-D06-PMP-0010 | FUR-EQP-D06-PMP-0010 | PMP-MBPRI | Bomba descarga molino | Transferencia de pulpa | 250 m³/h; 45 kW | Referencial | D1 |

## 7.7 — D07 — Molienda Secundaria

**FUR proceso padre:** `FUR-PROC-07`  
**Contexto:** Remolienda. La base maestra identifica dos molinos Osborn 7×14 pies.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D07-MOL-0001 | FUR-EQP-D07-MOL-0001 | MB-SEC-01 | Molino Osborn secundario 01 | Remolienda | 7×14 ft (*) ; 35 t/h | Referencial | D1 |
| 2 | FUR-PROC-D07-MOL-0002 | FUR-EQP-D07-MOL-0002 | MB-SEC-02 | Molino Osborn secundario 02 | Remolienda paralela | 7×14 ft (*) ; 35 t/h | Referencial | D1 |
| 3 | FUR-PROC-D07-MTR-0003 | FUR-EQP-D07-MTR-0003 | MTR-MBSEC1 | Motor molino secundario 01 | Accionamiento | 400 kW; 2.4 kV | Referencial | D1 |
| 4 | FUR-PROC-D07-MTR-0004 | FUR-EQP-D07-MTR-0004 | MTR-MBSEC2 | Motor molino secundario 02 | Accionamiento | 400 kW; 2.4 kV | Referencial | D1 |
| 5 | FUR-PROC-D07-LUB-0005 | FUR-EQP-D07-LUB-0005 | LUB-MBSEC1 | Skid lubricación molino 01 | Lubricación | 600 L; 7.5 kW | Referencial | D1 |
| 6 | FUR-PROC-D07-LUB-0006 | FUR-EQP-D07-LUB-0006 | LUB-MBSEC2 | Skid lubricación molino 02 | Lubricación | 600 L; 7.5 kW | Referencial | D1 |
| 7 | FUR-PROC-D07-TRM-0007 | FUR-EQP-D07-TRM-0007 | TRM-MBSEC1 | Trommel molino 01 | Clasificación de descarga gruesa | Ø 1.2 m × 1.8 m | Referencial | D1 |
| 8 | FUR-PROC-D07-TRM-0008 | FUR-EQP-D07-TRM-0008 | TRM-MBSEC2 | Trommel molino 02 | Clasificación de descarga gruesa | Ø 1.2 m × 1.8 m | Referencial | D1 |
| 9 | FUR-PROC-D07-SMP-0009 | FUR-EQP-D07-SMP-0009 | SMP-MBSEC | Cajón común de descarga | Recepción de pulpa | 12 m³ | Referencial | D1 |
| 10 | FUR-PROC-D07-PMP-0010 | FUR-EQP-D07-PMP-0010 | PMP-MBSEC | Bomba de transferencia | Envío a clasificación | 220 m³/h; 37 kW | Referencial | D1 |

## 7.8 — D08 — Clasificación

**FUR proceso padre:** `FUR-PROC-08`  
**Contexto:** Clasificación húmeda y recirculación. La documentación del proyecto identifica hidrociclones y bombas de pulpa.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D08-HCL-0001 | FUR-EQP-D08-HCL-0001 | HC-01 | Hidrociclón 01 | Clasificación por tamaño | Ø 250 mm; corte ref. 150 µm | Referencial | D1 |
| 2 | FUR-PROC-D08-HCL-0002 | FUR-EQP-D08-HCL-0002 | HC-02 | Hidrociclón 02 | Clasificación paralela | Ø 250 mm; corte ref. 150 µm | Referencial | D1 |
| 3 | FUR-PROC-D08-HCL-0003 | FUR-EQP-D08-HCL-0003 | HC-03 | Hidrociclón 03 | Reserva / expansión | Ø 250 mm | Referencial | D1 |
| 4 | FUR-PROC-D08-HCL-0004 | FUR-EQP-D08-HCL-0004 | HC-04 | Hidrociclón 04 | Reserva / expansión | Ø 250 mm | Referencial | D1 |
| 5 | FUR-PROC-D08-PMP-0005 | FUR-EQP-D08-PMP-0005 | PMP-HC-A | Bomba alimentación ciclones A | Impulsión de pulpa | 250 m³/h; 45 kW | Referencial | D1 |
| 6 | FUR-PROC-D08-PMP-0006 | FUR-EQP-D08-PMP-0006 | PMP-HC-B | Bomba alimentación ciclones B | Standby / paralelo | 250 m³/h; 45 kW | Referencial | D1 |
| 7 | FUR-PROC-D08-MAN-0007 | FUR-EQP-D08-MAN-0007 | MAN-HC-01 | Manifold distribuidor de ciclones | Distribución de pulpa | DN200; 6 salidas | Referencial | D1 |
| 8 | FUR-PROC-D08-SMP-0008 | FUR-EQP-D08-SMP-0008 | SMP-HC-01 | Sump alimentación ciclones | Pulmón de bombeo | 20 m³ | Referencial | D1 |
| 9 | FUR-PROC-D08-LND-0009 | FUR-EQP-D08-LND-0009 | LND-HC-OF | Launder de overflow | Conducción de finos | 25 m³/h | Referencial | D1 |
| 10 | FUR-PROC-D08-CHT-0010 | FUR-EQP-D08-CHT-0010 | CHT-HC-UF | Chute de underflow | Retorno de gruesos a molienda | 60 t/h equivalente | Referencial | D1 |

## 7.9 — D09 — Pre-lixiviación

**FUR proceso padre:** `FUR-PROC-09`  
**Contexto:** Acondicionamiento previo a cianuración. La base del proyecto registra 2 tanques de 103 m³ cada uno.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D09-TNK-0001 | FUR-EQP-D09-TNK-0001 | TK-PLX-01 | Tanque Pre-Lix 01 | Acondicionamiento de pulpa | 103 m³ (*) | Referencial | D1 |
| 2 | FUR-PROC-D09-TNK-0002 | FUR-EQP-D09-TNK-0002 | TK-PLX-02 | Tanque Pre-Lix 02 | Acondicionamiento en serie | 103 m³ (*) | Referencial | D1 |
| 3 | FUR-PROC-D09-AGT-0003 | FUR-EQP-D09-AGT-0003 | AG-PLX-01 | Agitador Pre-Lix 01 | Suspensión y mezcla | 22 kW; 55 rpm | Referencial | D1 |
| 4 | FUR-PROC-D09-AGT-0004 | FUR-EQP-D09-AGT-0004 | AG-PLX-02 | Agitador Pre-Lix 02 | Suspensión y mezcla | 22 kW; 55 rpm | Referencial | D1 |
| 5 | FUR-PROC-D09-TNK-0005 | FUR-EQP-D09-TNK-0005 | TK-LIME-01 | Tanque de leche de cal | Preparación / dosificación de cal | 20 m³ | Referencial | D1 |
| 6 | FUR-PROC-D09-PMP-0006 | FUR-EQP-D09-PMP-0006 | PMP-LIME-01 | Bomba dosificadora de cal | Ajuste de pH | 0–5 m³/h; 3 kW | Referencial | D1 |
| 7 | FUR-PROC-D09-TNK-0007 | FUR-EQP-D09-TNK-0007 | TK-CN-DAY | Tanque diario de NaCN | Almacenamiento de solución preparada | 10 m³ | Referencial | D1 |
| 8 | FUR-PROC-D09-PMP-0008 | FUR-EQP-D09-PMP-0008 | PMP-CN-01 | Bomba dosificadora NaCN | Dosificación controlada | 0–1.5 m³/h | Referencial | D1 |
| 9 | FUR-PROC-D09-BLW-0009 | FUR-EQP-D09-BLW-0009 | BLW-PLX-01 | Soplador de aire de proceso | Aireación de pulpa | 1,000 Nm³/h; 45 kW | Referencial | D1 |
| 10 | FUR-PROC-D09-PMP-0010 | FUR-EQP-D09-PMP-0010 | PMP-PLX-OUT | Bomba transferencia Pre-Lix | Envío a espesamiento/lixiviación | 180 m³/h; 30 kW | Referencial | D1 |

## 7.10 — D10 — Espesamiento

**FUR proceso padre:** `FUR-PROC-10`  
**Contexto:** Separación sólido-líquido. La documentación referencia malla lineal, espesador D-110, floculante y bombeo; el volumen geométrico del espesador permanece sujeto a reconciliación.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D10-LSC-0001 | FUR-EQP-D10-LSC-0001 | LS-01 | Malla / criba lineal | Retención de residuos gruesos | 1.2×3.0 m; 150 m³/h | Referencial | D1 |
| 2 | FUR-PROC-D10-THK-0002 | FUR-EQP-D10-THK-0002 | THK-D110 | Espesador D-110 | Concentración de sólidos | Ø 18.3 m (*) ; área 262.8 m² (*) | Referencial | D1 |
| 3 | FUR-PROC-D10-FDW-0003 | FUR-EQP-D10-FDW-0003 | FDW-D110 | Feedwell espesador | Distribución y floculación | Ø 3.0 m | Referencial | D1 |
| 4 | FUR-PROC-D10-RKE-0004 | FUR-EQP-D10-RKE-0004 | RKE-D110 | Mecanismo de rastras | Movimiento de lodos | 7.5 kW; 0.1–0.3 rpm | Referencial | D1 |
| 5 | FUR-PROC-D10-TNK-0005 | FUR-EQP-D10-TNK-0005 | TK-FLOC-01 | Tanque preparación floculante | Preparación de polímero | 8 m³ | Referencial | D1 |
| 6 | FUR-PROC-D10-PMP-0006 | FUR-EQP-D10-PMP-0006 | PMP-FLOC-01 | Bomba dosificadora floculante | Dosificación | 0–1 m³/h | Referencial | D1 |
| 7 | FUR-PROC-D10-TNK-0007 | FUR-EQP-D10-TNK-0007 | TK-OF-01 | Tanque overflow | Recuperación de agua clarificada | 50 m³ | Referencial | D1 |
| 8 | FUR-PROC-D10-PMP-0008 | FUR-EQP-D10-PMP-0008 | PMP-UF-A | Bomba underflow A | Transferencia de pulpa espesada | 100 m³/h; 22 kW | Referencial | D1 |
| 9 | FUR-PROC-D10-PMP-0009 | FUR-EQP-D10-PMP-0009 | PMP-UF-B | Bomba underflow B | Standby | 100 m³/h; 22 kW | Referencial | D1 |
| 10 | FUR-PROC-D10-PMP-0010 | FUR-EQP-D10-PMP-0010 | PMP-RW-01 | Bomba agua recuperada | Retorno de agua al proceso | 120 m³/h; 30 kW | Referencial | D1 |

## 7.11 — D11 — Lixiviación / CIL

**FUR proceso padre:** `FUR-PROC-11`  
**Contexto:** Cianuración/agitación y adsorción simultánea cuando opera como CIL. La base del proyecto registra 4 tanques de 230 m³ cada uno.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D11-CIL-0001 | FUR-EQP-D11-CIL-0001 | CIL-TK01 | Tanque CIL 01 | Lixiviación / adsorción | 230 m³ (*) | Referencial | D1 |
| 2 | FUR-PROC-D11-CIL-0002 | FUR-EQP-D11-CIL-0002 | CIL-TK02 | Tanque CIL 02 | Lixiviación / adsorción | 230 m³ (*) | Referencial | D1 |
| 3 | FUR-PROC-D11-CIL-0003 | FUR-EQP-D11-CIL-0003 | CIL-TK03 | Tanque CIL 03 | Lixiviación / adsorción | 230 m³ (*) | Referencial | D1 |
| 4 | FUR-PROC-D11-CIL-0004 | FUR-EQP-D11-CIL-0004 | CIL-TK04 | Tanque CIL 04 | Lixiviación / adsorción | 230 m³ (*) | Referencial | D1 |
| 5 | FUR-PROC-D11-AGT-0005 | FUR-EQP-D11-AGT-0005 | AG-CIL01 | Agitador CIL 01 | Suspensión / transferencia de masa | 30 kW; 45 rpm | Referencial | D1 |
| 6 | FUR-PROC-D11-AGT-0006 | FUR-EQP-D11-AGT-0006 | AG-CIL02 | Agitador CIL 02 | Suspensión / transferencia de masa | 30 kW; 45 rpm | Referencial | D1 |
| 7 | FUR-PROC-D11-AGT-0007 | FUR-EQP-D11-AGT-0007 | AG-CIL03 | Agitador CIL 03 | Suspensión / transferencia de masa | 30 kW; 45 rpm | Referencial | D1 |
| 8 | FUR-PROC-D11-AGT-0008 | FUR-EQP-D11-AGT-0008 | AG-CIL04 | Agitador CIL 04 | Suspensión / transferencia de masa | 30 kW; 45 rpm | Referencial | D1 |
| 9 | FUR-PROC-D11-SCR-0009 | FUR-EQP-D11-SCR-0009 | IS-CIL-01 | Criba interetapa CIL | Retención de carbón | Abertura ref. 0.8 mm; 150 m³/h | Referencial | D1 |
| 10 | FUR-PROC-D11-BLW-0010 | FUR-EQP-D11-BLW-0010 | BLW-CIL-01 | Soplador de aire CIL | Aireación de tanques | 1,500 Nm³/h; 55 kW | Referencial | D1 |

## 7.12 — D12 — Adsorción CIP

**FUR proceso padre:** `FUR-PROC-12`  
**Contexto:** Adsorción en carbón activado. La base maestra documenta 10 tanques × 112 m³ = 1.120 m³; 5 tanques equivalen a 560 m³.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D12-CIP-0001 | FUR-EQP-D12-CIP-0001 | CIP-TK01 | Tanque CIP 01 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 2 | FUR-PROC-D12-CIP-0002 | FUR-EQP-D12-CIP-0002 | CIP-TK02 | Tanque CIP 02 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 3 | FUR-PROC-D12-CIP-0003 | FUR-EQP-D12-CIP-0003 | CIP-TK03 | Tanque CIP 03 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 4 | FUR-PROC-D12-CIP-0004 | FUR-EQP-D12-CIP-0004 | CIP-TK04 | Tanque CIP 04 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 5 | FUR-PROC-D12-CIP-0005 | FUR-EQP-D12-CIP-0005 | CIP-TK05 | Tanque CIP 05 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 6 | FUR-PROC-D12-CIP-0006 | FUR-EQP-D12-CIP-0006 | CIP-TK06 | Tanque CIP 06 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 7 | FUR-PROC-D12-CIP-0007 | FUR-EQP-D12-CIP-0007 | CIP-TK07 | Tanque CIP 07 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 8 | FUR-PROC-D12-CIP-0008 | FUR-EQP-D12-CIP-0008 | CIP-TK08 | Tanque CIP 08 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 9 | FUR-PROC-D12-CIP-0009 | FUR-EQP-D12-CIP-0009 | CIP-TK09 | Tanque CIP 09 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |
| 10 | FUR-PROC-D12-CIP-0010 | FUR-EQP-D12-CIP-0010 | CIP-TK10 | Tanque CIP 10 | Adsorción de oro en carbón | 112 m³ (*) | Referencial | D1 |

## 7.13 — D13 — Manejo de Carbón Cargado

**FUR proceso padre:** `FUR-PROC-13`  
**Contexto:** Separación, lavado y transferencia de carbón cargado hacia el circuito de elución.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D13-SCR-0001 | FUR-EQP-D13-SCR-0001 | SCR-LC-01 | Criba de carbón cargado | Separación carbón/pulpa | 30 t/h de pulpa; malla ref. 0.8 mm | Referencial | D1 |
| 2 | FUR-PROC-D13-PMP-0002 | FUR-EQP-D13-PMP-0002 | PMP-CARB-A | Bomba de transferencia de carbón A | Movimiento hidráulico de carbón | 30 m³/h; 7.5 kW | Referencial | D1 |
| 3 | FUR-PROC-D13-PMP-0003 | FUR-EQP-D13-PMP-0003 | PMP-CARB-B | Bomba de transferencia de carbón B | Standby | 30 m³/h; 7.5 kW | Referencial | D1 |
| 4 | FUR-PROC-D13-HOP-0004 | FUR-EQP-D13-HOP-0004 | HOP-CARB-01 | Tolva de carbón cargado | Recepción temporal | 2 t de carbón | Referencial | D1 |
| 5 | FUR-PROC-D13-COL-0005 | FUR-EQP-D13-COL-0005 | COL-CARB-01 | Columna de lavado ácido preliminar | Lavado de carbón | 1.5 t por lote | Referencial | D1 |
| 6 | FUR-PROC-D13-SCR-0006 | FUR-EQP-D13-SCR-0006 | SCR-DW-CARB | Criba de desaguado de carbón | Remoción de agua | 2 t/h de carbón | Referencial | D1 |
| 7 | FUR-PROC-D13-EDU-0007 | FUR-EQP-D13-EDU-0007 | EDU-CARB-01 | Eductor de transferencia | Transporte suave de carbón | 25 m³/h | Referencial | D1 |
| 8 | FUR-PROC-D13-VSL-0008 | FUR-EQP-D13-VSL-0008 | VSL-CARB-01 | Vasija de transferencia de carbón | Pulmón de transferencia | 3 m³ | Referencial | D1 |
| 9 | FUR-PROC-D13-HOP-0009 | FUR-EQP-D13-HOP-0009 | HOP-MEAS-01 | Tolva / recipiente de medición | Control de masa por lote | 1.5 t | Referencial | D1 |
| 10 | FUR-PROC-D13-PMP-0010 | FUR-EQP-D13-PMP-0010 | PMP-CW-01 | Bomba de agua de transferencia | Agua para transporte/lavado | 40 m³/h; 11 kW | Referencial | D1 |

## 7.14 — D14 — Elución / Desorción

**FUR proceso padre:** `FUR-PROC-14`  
**Contexto:** Desorción de oro/plata desde carbón cargado. La base de proyecto utiliza una columna de elución de 1,5 t como referencia documental.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D14-ELC-0001 | FUR-EQP-D14-ELC-0001 | ELU-COL-01 | Columna de elución | Desorción de carbón cargado | 1.5 t carbón/lote (*) | Referencial | D1 |
| 2 | FUR-PROC-D14-AWC-0002 | FUR-EQP-D14-AWC-0002 | AW-COL-01 | Columna / tanque de lavado ácido | Remoción de incrustaciones | 1.5 t carbón/lote | Referencial | D1 |
| 3 | FUR-PROC-D14-TNK-0003 | FUR-EQP-D14-TNK-0003 | TK-ELU-01 | Tanque de solución de elución | Preparación de eluente | 10 m³ | Referencial | D1 |
| 4 | FUR-PROC-D14-TNK-0004 | FUR-EQP-D14-TNK-0004 | TK-BAR-01 | Tanque de solución barren | Recirculación | 15 m³ | Referencial | D1 |
| 5 | FUR-PROC-D14-HEX-0005 | FUR-EQP-D14-HEX-0005 | HX-ELU-01 | Intercambiador de calor | Recuperación de calor | 250 kW térmicos | Referencial | D1 |
| 6 | FUR-PROC-D14-HTR-0006 | FUR-EQP-D14-HTR-0006 | HTR-ELU-01 | Calentador de solución | Calentamiento de eluente | 300 kW térmicos | Referencial | D1 |
| 7 | FUR-PROC-D14-PMP-0007 | FUR-EQP-D14-PMP-0007 | PMP-ELU-A | Bomba circulación elución A | Recirculación | 30 m³/h; 11 kW | Referencial | D1 |
| 8 | FUR-PROC-D14-PMP-0008 | FUR-EQP-D14-PMP-0008 | PMP-ELU-B | Bomba circulación elución B | Standby | 30 m³/h; 11 kW | Referencial | D1 |
| 9 | FUR-PROC-D14-TNK-0009 | FUR-EQP-D14-TNK-0009 | TK-PREG-01 | Tanque de solución rica | Recepción de eluato | 12 m³ | Referencial | D1 |
| 10 | FUR-PROC-D14-FLT-0010 | FUR-EQP-D14-FLT-0010 | FLT-ELU-01 | Filtro de solución rica | Protección de EW | 20 m³/h; 10 µm | Referencial | D1 |

## 7.15 — D15 — Electrowinning

**FUR proceso padre:** `FUR-PROC-15`  
**Contexto:** Recuperación electroquímica de metales preciosos desde solución rica.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D15-EWC-0001 | FUR-EQP-D15-EWC-0001 | EW-CELL-01 | Celda de electroobtención 01 | Deposición de Au/Ag | 3.5 m³; 1,200 A | Referencial | D1 |
| 2 | FUR-PROC-D15-EWC-0002 | FUR-EQP-D15-EWC-0002 | EW-CELL-02 | Celda de electroobtención 02 | Celda paralela | 3.5 m³; 1,200 A | Referencial | D1 |
| 3 | FUR-PROC-D15-REC-0003 | FUR-EQP-D15-REC-0003 | RECT-01 | Rectificador DC 01 | Fuente DC para EW | 12 VDC; 1,500 A | Referencial | D1 |
| 4 | FUR-PROC-D15-REC-0004 | FUR-EQP-D15-REC-0004 | RECT-02 | Rectificador DC 02 | Redundancia / segunda celda | 12 VDC; 1,500 A | Referencial | D1 |
| 5 | FUR-PROC-D15-PMP-0005 | FUR-EQP-D15-PMP-0005 | PMP-EW-FEED | Bomba alimentación EW | Transferencia de solución rica | 20 m³/h; 7.5 kW | Referencial | D1 |
| 6 | FUR-PROC-D15-PMP-0006 | FUR-EQP-D15-PMP-0006 | PMP-EW-REC | Bomba recirculación EW | Recirculación de electrolito | 25 m³/h; 7.5 kW | Referencial | D1 |
| 7 | FUR-PROC-D15-RCK-0007 | FUR-EQP-D15-RCK-0007 | RACK-CATH-01 | Rack de cátodos | Manipulación / drenaje | Capacidad 12 cátodos | Referencial | D1 |
| 8 | FUR-PROC-D15-FLT-0008 | FUR-EQP-D15-FLT-0008 | FP-SLUDGE-01 | Filtro prensa de lodo EW | Desaguado de lodo | 5 m²; 6 bar | Referencial | D1 |
| 9 | FUR-PROC-D15-TNK-0009 | FUR-EQP-D15-TNK-0009 | TK-EW-WASH | Tanque de lavado de cátodos | Lavado y recuperación | 2 m³ | Referencial | D1 |
| 10 | FUR-PROC-D15-VNT-0010 | FUR-EQP-D15-VNT-0010 | VNT-EW-01 | Sistema de extracción EW | Ventilación de gases | 4,000 m³/h | Referencial | D1 |

## 7.16 — D16 — Calcinación / Secado

**FUR proceso padre:** `FUR-PROC-16`  
**Contexto:** Secado y/o calcinación de lodos o precipitados antes de fundición, según el circuito final adoptado.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D16-DRY-0001 | FUR-EQP-D16-DRY-0001 | DRY-01 | Secador de precipitado | Reducción de humedad | 50 kg/h; 120 °C | Referencial | D1 |
| 2 | FUR-PROC-D16-FUR-0002 | FUR-EQP-D16-FUR-0002 | CAL-FUR-01 | Horno de calcinación | Calcinación de producto | 50 kg/h; 650 °C | Referencial | D1 |
| 3 | FUR-PROC-D16-HOP-0003 | FUR-EQP-D16-HOP-0003 | HOP-CAL-01 | Tolva de alimentación | Pulmón de producto húmedo | 0.25 m³ | Referencial | D1 |
| 4 | FUR-PROC-D16-SFD-0004 | FUR-EQP-D16-SFD-0004 | SFD-CAL-01 | Alimentador de tornillo | Dosificación al horno | 0–60 kg/h | Referencial | D1 |
| 5 | FUR-PROC-D16-BRN-0005 | FUR-EQP-D16-BRN-0005 | BRN-CAL-01 | Quemador / sistema térmico | Generación de calor | 250 kW térmicos | Referencial | D1 |
| 6 | FUR-PROC-D16-IDF-0006 | FUR-EQP-D16-IDF-0006 | IDF-CAL-01 | Ventilador de tiro inducido | Extracción de gases | 3,000 m³/h; 7.5 kW | Referencial | D1 |
| 7 | FUR-PROC-D16-BAG-0007 | FUR-EQP-D16-BAG-0007 | BF-CAL-01 | Filtro de mangas | Captación de partículas | 3,000 m³/h | Referencial | D1 |
| 8 | FUR-PROC-D16-CLR-0008 | FUR-EQP-D16-CLR-0008 | CLR-CAL-01 | Enfriador de producto | Enfriamiento post-calcinación | 50 kg/h | Referencial | D1 |
| 9 | FUR-PROC-D16-BIN-0009 | FUR-EQP-D16-BIN-0009 | BIN-CAL-01 | Tolva de producto seco | Almacenamiento temporal | 0.2 m³ | Referencial | D1 |
| 10 | FUR-PROC-D16-SKD-0010 | FUR-EQP-D16-SKD-0010 | SKD-CAL-CTRL | Skid de control térmico | Control de temperatura / combustible | 4 zonas de control | Referencial | D1 |

## 7.17 — D17 — Fundición

**FUR proceso padre:** `FUR-PROC-17`  
**Contexto:** Fusión del producto seco con fundentes y vaciado a moldes de doré.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D17-SMF-0001 | FUR-EQP-D17-SMF-0001 | SMELT-01 | Horno de fundición | Fusión de carga | 100 kg/ciclo; 1,200 °C | Referencial | D1 |
| 2 | FUR-PROC-D17-CRU-0002 | FUR-EQP-D17-CRU-0002 | CRUC-01 | Crisol de fundición 01 | Contención de metal fundido | 100 kg | Referencial | D1 |
| 3 | FUR-PROC-D17-CRU-0003 | FUR-EQP-D17-CRU-0003 | CRUC-02 | Crisol de fundición 02 | Reserva / segundo ciclo | 100 kg | Referencial | D1 |
| 4 | FUR-PROC-D17-MIX-0004 | FUR-EQP-D17-MIX-0004 | FLUX-MIX-01 | Mezclador de fundentes | Preparación de carga | 150 kg/lote | Referencial | D1 |
| 5 | FUR-PROC-D17-SFD-0005 | FUR-EQP-D17-SFD-0005 | FLUX-FEED-01 | Alimentador de fundentes | Dosificación al horno | 0–100 kg/h | Referencial | D1 |
| 6 | FUR-PROC-D17-HOD-0006 | FUR-EQP-D17-HOD-0006 | HOD-SMELT-01 | Campana de extracción | Captura de humos | 5,000 m³/h | Referencial | D1 |
| 7 | FUR-PROC-D17-SCR-0007 | FUR-EQP-D17-SCR-0007 | SCRUB-SMELT | Lavador de gases | Control de emisiones | 5,000 m³/h | Referencial | D1 |
| 8 | FUR-PROC-D17-LAD-0008 | FUR-EQP-D17-LAD-0008 | LADLE-01 | Cucharón de colada | Transferencia de metal | 80 kg | Referencial | D1 |
| 9 | FUR-PROC-D17-MST-0009 | FUR-EQP-D17-MST-0009 | MOLD-ST-01 | Estación de moldes doré | Moldeo de barras | 4 moldes × 20 kg | Referencial | D1 |
| 10 | FUR-PROC-D17-PSU-0010 | FUR-EQP-D17-PSU-0010 | PSU-SMELT | Fuente / transformador de horno | Alimentación eléctrica | 150 kVA | Referencial | D1 |

## 7.18 — D18 — Producto Final / Reactivación / Colas

**FUR proceso padre:** `FUR-PROC-18`  
**Contexto:** Circuitos asociados de producto doré, regeneración de carbón y manejo de relaves/agua de retorno.

| # | FUR-PROC catálogo | FUR-EQP canónico propuesto | TAG ref. | Activo físico | Función | Ejemplo numérico referencial | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PROC-D18-KIL-0001 | FUR-EQP-D18-KIL-0001 | KILN-CARB-01 | Horno de reactivación de carbón | Restaurar actividad del carbón | 1 t/d; 60 kW ref. | Referencial | D1 |
| 2 | FUR-PROC-D18-QTK-0002 | FUR-EQP-D18-QTK-0002 | QTK-CARB-01 | Tanque de quench de carbón | Enfriamiento del carbón regenerado | 5 m³ | Referencial | D1 |
| 3 | FUR-PROC-D18-SCR-0003 | FUR-EQP-D18-SCR-0003 | SCR-CARB-REG | Criba de carbón regenerado | Clasificación / eliminación de finos | 1 t/h | Referencial | D1 |
| 4 | FUR-PROC-D18-PMP-0004 | FUR-EQP-D18-PMP-0004 | PMP-CARB-REG | Bomba de retorno de carbón | Retorno a CIP | 20 m³/h; 5.5 kW | Referencial | D1 |
| 5 | FUR-PROC-D18-THK-0005 | FUR-EQP-D18-THK-0005 | THK-TAIL-01 | Espesador de relaves | Recuperación de agua | Ø 15 m; 120 m³/h | Referencial | D1 |
| 6 | FUR-PROC-D18-PMP-0006 | FUR-EQP-D18-PMP-0006 | PMP-TAIL-A | Bomba de relaves A | Transferencia a disposición | 150 m³/h; 45 kW | Referencial | D1 |
| 7 | FUR-PROC-D18-PMP-0007 | FUR-EQP-D18-PMP-0007 | PMP-TAIL-B | Bomba de relaves B | Standby | 150 m³/h; 45 kW | Referencial | D1 |
| 8 | FUR-PROC-D18-PMP-0008 | FUR-EQP-D18-PMP-0008 | PMP-RECL-01 | Bomba de agua recuperada | Retorno de agua a planta | 100 m³/h; 30 kW | Referencial | D1 |
| 9 | FUR-PROC-D18-SCL-0009 | FUR-EQP-D18-SCL-0009 | SCALE-DORE | Balanza de barras doré | Pesaje de producto final | 0–50 kg; 1 g resolución | Referencial | D1 |
| 10 | FUR-PROC-D18-SAF-0010 | FUR-EQP-D18-SAF-0010 | SAFE-DORE | Gabinete / caja fuerte doré | Custodia temporal | Capacidad 500 kg | Referencial | D1 |
---

# 8. ÍNDICE RESUMIDO DE FAMILIAS DE ACTIVOS

El catálogo contiene familias de activos como:

- tolvas, silos, bins y recipientes;
- alimentadores de placas, banda, vibratorios y tornillo;
- trituradoras de mandíbula y cónicas;
- cribas vibratorias y lineales;
- cintas, chutes, compuertas y launders;
- molinos, motores, reductores, trommels y sistemas de lubricación;
- bombas de pulpa, bombas de proceso y bombas dosificadoras;
- hidrociclones, manifolds y sumps;
- tanques agitados de Pre-Lix, CIL y CIP;
- espesadores, feedwells, rastras y sistemas de floculante;
- sistemas de carbón cargado;
- columnas de elución, intercambiadores y calentadores;
- celdas de electrowinning y rectificadores;
- secadores y hornos de calcinación;
- hornos de fundición, crisoles, campanas y moldes;
- hornos de reactivación de carbón;
- espesamiento y bombeo de relaves;
- pesaje y custodia de doré.

---

# 9. PLANTILLA MAESTRA DE FUR DE ACTIVO DE PROCESO

Cada uno de los 180 activos debe poder evolucionar desde el registro mínimo del catálogo hacia una ficha completa.

```yaml
fur_catalog_code:
fur_canonical_asset_code:
class: EQP
domain: D01-D18
network: FUR-PROC
parent_process_fur:
tag:
name:
family:
subfamily:
description:
function:
site:
area:
process:
system:
location:
manufacturer:
model:
serial:
technical_parameters: []
design_capacity:
power:
voltage:
dimensions:
material:
status:
criticality:
owner:
custodian:
technical_responsible:
documents: []
relations: []
power_relation:
iot_relation:
gpon_relation:
quality_relation:
lab_relation:
maintenance_relation:
rq_relations: []
offer_relations: []
camera_relations: []
data_condition: Referential
maturity: D1
hold_tbc: []
audit:
```

---

# 10. RELACIONES MÍNIMAS POR ACTIVO

Cada activo físico del catálogo debe poder vincularse mediante `fur_relation` con:

```text
PARENT_OF / PART_OF
UPSTREAM_OF / DOWNSTREAM_OF
POWERED_BY
CONTROLLED_BY
MEASURED_BY
CONNECTED_TO
COMMUNICATES_THROUGH
SAMPLED_BY
ANALYZED_BY
MAINTAINED_BY
STOCKED_BY
HAS_SPARE
HAS_DOCUMENT
HAS_RISK
LOCATED_AT
REPLACED_BY
REQUESTED_BY
OFFERED_BY
```

Ejemplo:

```text
FUR-PROC-D06-MOL-0001
Molino primario
   ├─ PART_OF → FUR-PROC-06 Molienda Primaria
   ├─ POWERED_BY → FUR-PTE...
   ├─ MEASURED_BY → FUR-IOT...
   ├─ COMMUNICATES_THROUGH → FUR-GPON...
   ├─ SAMPLED_BY → FUR-CC...
   ├─ ANALYZED_BY → FUR-LAB...
   ├─ MAINTAINED_BY → FUR-MNT...
   ├─ REQUESTED_BY → FUR-RQ...
   ├─ OFFERED_BY → FUR-OF...
   └─ COVERED_BY → FUR-CAM...
```

---

# 11. MODELO DE DATOS — ODOO 19 + FUR

## 11.1 Maestros nativos Odoo a reutilizar

| Modelo Odoo | Tabla PostgreSQL típica | Uso |
|---|---|---|
| `product.template` | `product_template` | Identidad ERP catalogable |
| `product.product` | `product_product` | Variante inventariable |
| `product.category` | `product_category` | Familia / categoría |
| `uom.uom` | `uom_uom` | Unidades |
| `res.partner` | `res_partner` | Fabricante / proveedor |
| `res.currency` | `res_currency` | Moneda |
| `stock.location` | `stock_location` | Ubicación ERP |
| `stock.lot` | `stock_lot` | Serie / lote |
| `maintenance.equipment` | `maintenance_equipment` | Equipo mantenible |
| `maintenance.request` | `maintenance_request` | Solicitud / OT |
| `product.supplierinfo` | `product_supplierinfo` | Datos de proveedor / precio de catálogo |
| `purchase.order` | `purchase_order` | PO final |
| `ir.attachment` | `ir_attachment` | Binario documental |
| `res.users` | `res_users` | Usuario / aprobador |
| `hr.employee` | `hr_employee` | Responsable técnico |
| `mail.message` | `mail_message` | Chatter / trazabilidad |
| `mail.activity` | `mail_activity` | Actividades |

## 11.2 Tablas propias comunes

| Tabla FUR | Función |
|---|---|
| `fur_record` | Identidad maestra |
| `fur_relation` | Relaciones |
| `fur_document_link` | Vínculos documentales |
| `fur_data_quality` | Condición y madurez |
| `fur_audit_event` | Auditoría |
| `fur_status_history` | Historial de estados |
| `fur_lifecycle_event` | Ciclo de vida |
| `fur_responsibility` | Propietario / custodio / responsable |
| `fur_search_alias` | Sinónimos / códigos externos |
| `fur_external_reference` | Referencias a sistemas origen |

## 11.3 Tablas propias de proceso / activo

La implementación debe reconciliar sin duplicar:

```text
fur_process
fur_process_stage
fur_process_input
fur_process_output
fur_process_parameter
fur_process_variable
fur_process_asset_rel
fur_process_document_rel
fur_process_kpi
fur_process_dependency

y/o

fur_proc_nameplate
fur_proc_operating
fur_proc_efficiency
fur_proc_media
fur_proc_liner
fur_proc_inspection
fur_proc_stream
fur_proc_parameter
fur_proc_asset_link
fur_proc_kpi
```

**HOLD:** decidir un único modelo canónico antes de DDL/producción.

---

# 12. COMPONENTE DE CATÁLOGO WEB — COMPORTAMIENTO PROPUESTO

Sin código React.js:

```text
CARGAR lista de 18 etapas
PARA etapa seleccionada:
    consultar FUR proceso padre
    consultar 10/NN activos relacionados
    mostrar tarjeta por activo:
        imagen
        FUR
        tag
        nombre
        familia
        parámetro numérico principal
        estado
        condición
        madurez

AL seleccionar activo:
    abrir FUR completa
    cargar:
        identidad
        datos técnicos
        relaciones
        documentos
        mantenimiento
        sourcing
        TBC/HOLD
        auditoría
```

Filtros recomendados:

- etapa;
- familia;
- criticidad;
- estado;
- madurez;
- condición del dato;
- fabricante;
- potencia;
- capacidad;
- ubicación;
- activo con/sin documentos;
- activo con/sin mantenimiento;
- activo con HOLD/TBC.

---

# 13. GOBIERNO DEL DATO

## 13.1 Escala

| Nivel | Interpretación |
|---|---|
| D0 | Hipótesis |
| D1 | Referencial |
| D2 | Preliminar |
| D3 | Validado en revisión |
| D4 | Operacional con evidencia |
| D5 | Histórico completo y trazable |

## 13.2 Regla de promoción

```text
D1 catálogo
→ levantamiento físico
→ D2
→ conciliación placa/PFD/P&ID/documentos
→ D3
→ evidencia operacional / pruebas
→ D4
→ histórico completo / gobierno sostenido
→ D5
```

Ningún registro de este catálogo debe promoverse automáticamente.

---

# 14. HOLD / TBC DEL CATÁLOGO

1. Confirmar nomenclatura final `FUR-PROC` vs `FUR-EQP`.
2. Reconciliar las 18 etapas contra PFD/P&ID vigente.
3. Reconciliar los 180 ejemplos contra Asset Register real.
4. Confirmar TAG real de cada activo.
5. Confirmar fabricante/modelo/serial.
6. Confirmar capacidad, potencia, presión, caudal y dimensiones.
7. Confirmar ubicación física.
8. Confirmar criticidad.
9. Vincular fuentes de potencia.
10. Vincular instrumentos y tags SCADA/Historian.
11. Vincular red GPON/OT cuando aplique.
12. Vincular puntos de muestreo y laboratorio.
13. Vincular BOM/WMS.
14. Vincular plan MNT / OT.
15. Vincular riesgos HSE/LOTO.
16. Vincular RQ/OF/PO reales.
17. Vincular documentos vigentes.
18. Validar qué activos requieren FUR propia y cuáles deben permanecer como subactivos/componentes.
19. Cerrar discrepancias históricas de capacidades.
20. Ejecutar FAT/SAT/UAT del catálogo digital.

---

# 15. REFERENCIAS PÚBLICAS UTILIZADAS

1. **Metso — Minerals processing portfolio.** Familias típicas de alimentación, trituración, cribado, molienda, clasificación, bombas, espesamiento, filtración y manejo de materiales.  
   https://www.metso.com/globalassets/campaigns/asia-pacific/capstat-apa-07-2025-web.pdf

2. **Metso — Gold processing.** Contexto de trituración y molienda en flowsheets auríferos.  
   https://www.metso.com/commodities/gold/

3. **Metso — Feeding / Feeders.** Alimentadores de placas, banda, grizzly, pan y wobbler para minería.  
   https://www.metso.com/mining/material-handling/feeding/  
   https://www.metso.com/portfolio/feeders/

4. **International Cyanide Management Code — Cyanide Facts.** Descripción general de molienda, lixiviación, CIL/CIP, carbón, elución y electrowinning.  
   https://cyanidecode.org/cyanide-facts/

5. **FLS — Carbon ADR plants.** Adsorción, elución Zadra/AARL, electrowinning, regeneración y refinación.  
   https://fls.com/en/equipment/precious-metal-recovery/carbon-adr-plants

6. **FLS — Precious metal recovery.** Familias de equipos para recuperación de metales preciosos.  
   https://fls.com/en/equipment/precious-metal-recovery

7. **FLS — Carbon regeneration kiln.** Horno de regeneración de carbón y rangos comerciales de capacidad.  
   https://fls.com/en/equipment/precious-metal-recovery/carbon-regeneration-kiln

8. **Metso — Dry Tailings Plant.** Espesamiento, filtración, recuperación de agua y manejo de relaves.  
   https://www.metso.com/portfolio/dry-tailings-plant/

> Estas referencias respaldan la **selección de familias de equipos**. Los números de cada FUR de ejemplo continúan siendo `Referencial / D1`.

---

# 16. RESUMEN CUANTITATIVO

| Concepto | Cantidad |
|---|---:|
| Etapas productivas | 18 |
| FUR proceso padre | 18 |
| FUR de activos físicos de ejemplo por etapa | 10 |
| **FUR de activos físicos referenciales** | **180** |
| Redes FUR relacionadas potencialmente | 10 |
| Condición inicial | Referencial |
| Madurez inicial | D1 |

---

# 17. CONCLUSIÓN

El catálogo establece una base homogénea para navegar desde:

```text
PLANTA
→ ETAPA
→ FUR-PROC
→ ACTIVO FÍSICO
→ FUR DE ACTIVO
→ SUBACTIVO / COMPONENTE
→ POTENCIA / IOT / GPON / CC / LAB / MNT / RQ / OF / CAM
→ DOCUMENTOS / AUDITORÍA / HISTORIAL
```

Los **180 activos** son una biblioteca referencial para parametrizar el Ecosistema Digital FUR. No representan por sí solos el inventario AS-BUILT de la planta.

La prioridad siguiente es sustituir progresivamente cada ejemplo D1 por:

```text
TAG real
+ placa
+ ubicación
+ documento
+ relación de proceso
+ potencia
+ instrumentación
+ mantenimiento
+ repuestos
+ calidad
+ evidencia
+ auditoría
```

hasta alcanzar D4/D5.

---

**FIN DEL DOCUMENTO — `CATALOGO_MAESTRO_FUR_PROC_ACTIVOS_FISICOS_18_ETAPAS_180_FUR_REV00.md`**


# 72. ANEXO B — CATÁLOGO FUENTE FUR-PTE 18 ETAPAS × 10

> Contenido incorporado desde el catálogo eléctrico REV.01 del proyecto.


# CATÁLOGO MAESTRO — FUR-PTE — ACTIVOS FÍSICOS DE POTENCIA ELÉCTRICA POR ETAPA DE PROCESO
## Planta de Beneficio de Oro — 18 etapas × 10 FUR-PTE = 180 ejemplos referenciales

**Código documental:** `CAT-FUR-PTE-ACTIVOS-180-001`  
**Revisión:** `REV.01`  
**Fecha:** `2026-09-21`  
**Red transversal:** `FUR-PTE — Potencia Eléctrica`  
**Arquitectura digital:** Odoo 19 ORM + PostgreSQL + `fur_record` + `fur_power_*` + React.js  
**Estado:** Catálogo técnico de ejemplos — **NO AS-BUILT / NO IFC / NO AFC**.

**Actualización REV.01:** consolidación del catálogo FUR-PTE a partir de las láminas adjuntas, continuidad con el catálogo maestro FUR-PROC y verificación de fuentes públicas oficiales vigentes al 2026-09-21. Se mantiene la regla de no convertir datos referenciales en datos de diseño o AS-BUILT.

> **ADVERTENCIA DE INGENIERÍA:** los 180 registros del presente catálogo son ejemplos para estructuración del Ecosistema Digital FUR. Sus tensiones, potencias, corrientes, calibres, ratings, topologías y códigos son **Referenciales / D1**, salvo el ejemplo maestro `FUR-PTE-PB01-TRF-0001`, que se conserva según la lámina fuente como D4 gráfico, sin que ello equivalga a validación AS-BUILT. Ningún dato D1 debe convertirse automáticamente en realidad operacional.

---

# 1. OBJETIVO

Desarrollar un catálogo normalizado de activos físicos de la **Red Transversal de Potencia Eléctrica — FUR-PTE** asociados a cada una de las 18 etapas del proceso de una planta de beneficio de oro.

Resultado:

```text
18 etapas de proceso
× 10 FUR-PTE referenciales por etapa
= 180 FUR de activos eléctricos
```

Cada FUR de catálogo identifica un activo eléctrico y lo vincula con:

- FUR-PROC / etapa de proceso;
- equipos de proceso alimentados;
- transformadores;
- celdas MV;
- MCC;
- motores;
- VFD / arrancadores;
- paneles locales;
- medidores de energía;
- UPS;
- protecciones;
- Odoo 19;
- mantenimiento;
- IoT/SCADA/Historian;
- GPON/OT;
- documentos;
- sourcing;
- auditoría;
- condición y madurez del dato.

---

# 2. BASE DEL PROYECTO

La ficha maestra utilizada como patrón de referencia es:

`FUR-PTE-PB01-TRF-0001 — Transformador TRF-01`

La lámina suministrada lo identifica como transformador de la **Subestación Principal**, con:

- potencia nominal: **5 MVA**;
- tensión primaria: **34.5 kV**;
- tensión secundaria: **4.16 kV**;
- estado visual: **Activo**;
- madurez visual: **D4 — Operacional**.

En el Documento Maestro de esta FUR se advierte que la condición D4 de la tarjeta gráfica no sustituye placa, unifilar AS-BUILT, FAT/SAT, pruebas de campo ni Asset Register reconciliado.

---

# 3. INVESTIGACIÓN PÚBLICA Y CRITERIOS TÉCNICOS

La investigación pública se utiliza únicamente para validar **familias de equipos, criterios de clasificación y marcos normativos**. No asigna datos reales a la Planta de Beneficio de Oro.

- Schneider Electric documenta los **MCC de baja tensión** como elementos relevantes en sistemas eléctricos mineros y publica guías de aplicación para distribución y control de motores.
- Schneider Electric publica documentación específica de **variadores de velocidad para aplicaciones mineras**, útil para estructurar las familias `VFD` de este catálogo.
- Schneider Electric mantiene un portafolio de **switchgear de media tensión** metal-clad / metal-enclosed para distribución y control de potencia.
- **IEC 60076-1:2011** continúa como referencia general para transformadores de potencia.
- **IEC 60034-1:2026** es la revisión vigente consultada para rating y desempeño de máquinas eléctricas rotativas.
- **IEC 61800-2:2021** cubre requisitos generales y especificaciones de rating de sistemas de accionamiento AC de velocidad variable.
- **IEC 61800-5-1:2022**, con correcciones posteriores, cubre requisitos de seguridad eléctrica, térmica y energética de power drive systems.
- **IEC 61439-1:2020** establece reglas generales para ensamblajes de switchgear y controlgear de baja tensión.
- **IEC 62271-200:2021 + AMD1:2024** aplica a switchgear y controlgear AC metal-enclosed por encima de 1 kV y hasta 52 kV.
- La documentación oficial de **Odoo 19** confirma el uso de mantenimiento, inventario con lotes/series y compras como capacidades nativas reutilizables por el ecosistema.

Estos documentos respaldan la **taxonomía y arquitectura lógica** del catálogo. La selección final de tensión, capacidad de cortocircuito, conductores, protecciones, coordinación, CT/PT, puesta a tierra, armónicos y ajustes debe cerrarse con estudios eléctricos del sitio, placas, unifilares aprobados, FAT/SAT y documentación AS-BUILT.

---

# 4. REGLA DE CODIFICACIÓN DEL CATÁLOGO

Formato referencial:

```text
FUR-PTE-D{ETAPA}-{FAMILIA}-{SECUENCIA}
```

Ejemplos:

```text
FUR-PTE-D01-TRF-0001
FUR-PTE-D06-MTR-0002
FUR-PTE-D15-REC-0003
```

Jerarquía:

```text
Planta
→ Etapa FUR-PROC
→ Sistema eléctrico de área
→ FUR-PTE
→ Activo eléctrico
→ Equipo de proceso alimentado / protegido / controlado
```

Familias de código utilizadas:

| Código | Familia |
|---|---|
| `TRF` | Transformador |
| `SWG` | Switchgear / celda MV |
| `MCC` | Motor Control Center |
| `MTR` | Motor eléctrico |
| `VFD` | Variador de frecuencia |
| `SST` | Arrancador suave |
| `CBR` | Interruptor / breaker |
| `REL` | Relé de protección |
| `PNL` | Panel local / tablero |
| `PMT` | Medidor / analizador de potencia |
| `UPS` | UPS |
| `REC` | Rectificador |
| `BUS` | Barra DC |
| `HTR` | Banco calefactor |
| `PSU` | Fuente / transformador especial |

---

# 5. CADENA PRODUCTIVA MAESTRA — 18 ETAPAS

| # | Código | Etapa de proceso | FUR-PROC padre | FUR-PTE de ejemplo |
| --- | --- | --- | --- | --- |
| 1 | D01 | Recepción y Alimentación | FUR-PROC-01 | 10 |
| 2 | D02 | Trituración Primaria | FUR-PROC-02 | 10 |
| 3 | D03 | Cribado | FUR-PROC-03 | 10 |
| 4 | D04 | Trituración Secundaria | FUR-PROC-04 | 10 |
| 5 | D05 | Transporte / Silos | FUR-PROC-05 | 10 |
| 6 | D06 | Molienda Primaria | FUR-PROC-06 | 10 |
| 7 | D07 | Molienda Secundaria | FUR-PROC-07 | 10 |
| 8 | D08 | Clasificación | FUR-PROC-08 | 10 |
| 9 | D09 | Pre-lixiviación | FUR-PROC-09 | 10 |
| 10 | D10 | Espesamiento | FUR-PROC-10 | 10 |
| 11 | D11 | Lixiviación / CIL | FUR-PROC-11 | 10 |
| 12 | D12 | Adsorción CIP | FUR-PROC-12 | 10 |
| 13 | D13 | Manejo de Carbón Cargado | FUR-PROC-13 | 10 |
| 14 | D14 | Elución / Desorción | FUR-PROC-14 | 10 |
| 15 | D15 | Electrowinning | FUR-PROC-15 | 10 |
| 16 | D16 | Calcinación / Secado | FUR-PROC-16 | 10 |
| 17 | D17 | Fundición | FUR-PROC-17 | 10 |
| 18 | D18 | Producto Final / Reactivación / Colas | FUR-PROC-18 | 10 |
## 5.1 Flujo maestro

```text
D01 Recepción y Alimentación
→ D02 Trituración Primaria
→ D03 Cribado
→ D04 Trituración Secundaria
→ D05 Transporte / Silos
→ D06 Molienda Primaria
→ D07 Molienda Secundaria
→ D08 Clasificación
→ D09 Pre-lixiviación
→ D10 Espesamiento
→ D11 Lixiviación / CIL
→ D12 Adsorción CIP
→ D13 Manejo de Carbón Cargado
→ D14 Elución / Desorción
→ D15 Electrowinning
→ D16 Calcinación / Secado
→ D17 Fundición
→ D18 Producto Final / Reactivación / Colas
```

---

# 6. EJEMPLO MAESTRO FUR-PTE DEL ECOSISTEMA

## FUR-PTE-PB01-TRF-0001 — Transformador TRF-01

| Campo | Valor de la ficha fuente |
|---|---|
| Código FUR | `FUR-PTE-PB01-TRF-0001` |
| Red | FUR-PTE — Potencia Eléctrica |
| Activo | Transformador TRF-01 |
| Ubicación | Subestación Principal |
| Potencia | 5 MVA |
| Primario | 34.5 kV |
| Secundario | 4.16 kV |
| Estado | Activo |
| Madurez gráfica | D4 — Operacional |

Corrientes trifásicas puramente matemáticas, solo como verificación referencial:

```text
I = S / (√3 × V)

I34.5 kV ≈ 83.7 A
I4.16 kV ≈ 694 A
```

Estos valores no sustituyen la corriente de placa ni el estudio eléctrico real.

---

# 7. CONDICIÓN DE LOS 180 REGISTROS DEL CATÁLOGO

| Campo | Regla |
|---|---|
| Condición | Referencial |
| Madurez | D1 |
| Estado | Ejemplo de ingeniería |
| Autoridad | Catálogo / prototipo |
| Uso | UX, base de datos, filtros, pruebas, desarrollo |
| Restricción | No AS-BUILT |
| Promoción | Solo tras evidencia y aprobación |

---

# 8. CATÁLOGO DETALLADO — 180 FUR-PTE


## 8.1 — D01 — Recepción y Alimentación

**FUR-PROC padre:** `FUR-PROC-01`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D01-TRF-0001 | TRF-RCV-01 | Transformador de distribución recepción | Alimentación de cargas LV del área | 500 kVA; 4.16/0.48 kV | FUR-PROC-01 | Referencial | D1 |
| 2 | FUR-PTE-D01-MCC-0002 | MCC-RCV-01 | Centro de control de motores recepción | Distribución y mando de motores | 480 V; 800 A | FUR-PROC-01 | Referencial | D1 |
| 3 | FUR-PTE-D01-MTR-0003 | MTR-APF-01 | Motor alimentador de placas | Accionamiento del alimentador | 75 kW; 480 V | FUR-PROC-01 | Referencial | D1 |
| 4 | FUR-PTE-D01-VFD-0004 | VFD-APF-01 | Variador alimentador de placas | Control de velocidad y par | 90 kW; 480 V | FUR-PROC-01 | Referencial | D1 |
| 5 | FUR-PTE-D01-MTR-0005 | MTR-CV01 | Motor cinta de alimentación | Accionamiento de cinta | 30 kW; 480 V | FUR-PROC-01 | Referencial | D1 |
| 6 | FUR-PTE-D01-VFD-0006 | VFD-CV01 | Variador cinta de alimentación | Control de velocidad | 37 kW; 480 V | FUR-PROC-01 | Referencial | D1 |
| 7 | FUR-PTE-D01-MTR-0007 | MTR-DCL01 | Motor colector de polvo | Accionamiento de ventilador | 15 kW; 480 V | FUR-PROC-01 | Referencial | D1 |
| 8 | FUR-PTE-D01-PNL-0008 | LCP-RCV-01 | Panel local de recepción | Mando local e interbloqueos | 480/120 V; 100 A | FUR-PROC-01 | Referencial | D1 |
| 9 | FUR-PTE-D01-PMT-0009 | PM-RCV-01 | Medidor de energía recepción | Medición de V/I/kW/kWh/PF | Clase 0.5S; 480 V | FUR-PROC-01 | Referencial | D1 |
| 10 | FUR-PTE-D01-UPS-0010 | UPS-RCV-01 | UPS de control recepción | Respaldo PLC/HMI/comunicaciones | 3 kVA; 120 VAC | FUR-PROC-01 | Referencial | D1 |

## 8.2 — D02 — Trituración Primaria

**FUR-PROC padre:** `FUR-PROC-02`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D02-TRF-0001 | TRF-CR1-01 | Transformador trituración primaria | Alimentación del área | 1,000 kVA; 4.16/0.48 kV | FUR-PROC-02 | Referencial | D1 |
| 2 | FUR-PTE-D02-MCC-0002 | MCC-CR1-01 | MCC trituración primaria | Distribución a trituradora y auxiliares | 480 V; 1,200 A | FUR-PROC-02 | Referencial | D1 |
| 3 | FUR-PTE-D02-MTR-0003 | MTR-JAW-01 | Motor trituradora de mandíbula | Accionamiento principal | 90 kW; 480 V | FUR-PROC-02 | Referencial | D1 |
| 4 | FUR-PTE-D02-SST-0004 | SST-JAW-01 | Arrancador suave trituradora | Limitación de corriente de arranque | 110 kW; 480 V | FUR-PROC-02 | Referencial | D1 |
| 5 | FUR-PTE-D02-MTR-0005 | MTR-APF02 | Motor alimentador primario | Accionamiento de placas | 37 kW; 480 V | FUR-PROC-02 | Referencial | D1 |
| 6 | FUR-PTE-D02-VFD-0006 | VFD-APF02 | Variador alimentador primario | Regulación de alimentación | 45 kW; 480 V | FUR-PROC-02 | Referencial | D1 |
| 7 | FUR-PTE-D02-MTR-0007 | MTR-CV02 | Motor cinta descarga primaria | Accionamiento de cinta | 30 kW; 480 V | FUR-PROC-02 | Referencial | D1 |
| 8 | FUR-PTE-D02-MTR-0008 | MTR-DCL02 | Motor colector de polvo | Ventilación / captación | 22 kW; 480 V | FUR-PROC-02 | Referencial | D1 |
| 9 | FUR-PTE-D02-REL-0009 | REL-CR1-01 | Relé protección alimentador | Protección eléctrica de área | 50/51, 50N/51N ref. | FUR-PROC-02 | Referencial | D1 |
| 10 | FUR-PTE-D02-PNL-0010 | LCP-CR1-01 | Panel local trituradora | Mando local / E-Stop | 480/120 V; 100 A | FUR-PROC-02 | Referencial | D1 |

## 8.3 — D03 — Cribado

**FUR-PROC padre:** `FUR-PROC-03`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D03-TRF-0001 | TRF-SCR-01 | Transformador área cribado | Alimentación de motores y servicios | 500 kVA; 4.16/0.48 kV | FUR-PROC-03 | Referencial | D1 |
| 2 | FUR-PTE-D03-MCC-0002 | MCC-SCR-01 | MCC cribado | Distribución de fuerza | 480 V; 800 A | FUR-PROC-03 | Referencial | D1 |
| 3 | FUR-PTE-D03-MTR-0003 | MTR-SCR01 | Motor criba vibratoria 01 | Accionamiento de criba | 22 kW; 480 V | FUR-PROC-03 | Referencial | D1 |
| 4 | FUR-PTE-D03-MTR-0004 | MTR-SCR02 | Motor criba vibratoria 02 | Accionamiento de criba | 18.5 kW; 480 V | FUR-PROC-03 | Referencial | D1 |
| 5 | FUR-PTE-D03-MTR-0005 | MTR-CVFIN | Motor cinta de finos | Accionamiento de cinta | 15 kW; 480 V | FUR-PROC-03 | Referencial | D1 |
| 6 | FUR-PTE-D03-MTR-0006 | MTR-CVOVS | Motor cinta de sobretamaño | Accionamiento de cinta | 11 kW; 480 V | FUR-PROC-03 | Referencial | D1 |
| 7 | FUR-PTE-D03-MTR-0007 | MTR-SPR01 | Motor bomba de spray | Agua de lavado | 7.5 kW; 480 V | FUR-PROC-03 | Referencial | D1 |
| 8 | FUR-PTE-D03-CBR-0008 | CBR-SCR-01 | Interruptor alimentador cribado | Protección del tablero/MCC | 480 V; 400 A | FUR-PROC-03 | Referencial | D1 |
| 9 | FUR-PTE-D03-PMT-0009 | PM-SCR-01 | Medidor multifunción cribado | Monitoreo de demanda y PF | 480 V; clase 0.5S | FUR-PROC-03 | Referencial | D1 |
| 10 | FUR-PTE-D03-PNL-0010 | LCP-SCR-01 | Panel local cribas | Control local / alarmas | 480/120 V; 60 A | FUR-PROC-03 | Referencial | D1 |

## 8.4 — D04 — Trituración Secundaria

**FUR-PROC padre:** `FUR-PROC-04`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D04-TRF-0001 | TRF-CR2-01 | Transformador trituración secundaria | Alimentación del área | 1,500 kVA; 4.16/0.48 kV | FUR-PROC-04 | Referencial | D1 |
| 2 | FUR-PTE-D04-MCC-0002 | MCC-CR2-01 | MCC trituración secundaria | Distribución de fuerza | 480 V; 1,600 A | FUR-PROC-04 | Referencial | D1 |
| 3 | FUR-PTE-D04-MTR-0003 | MTR-CONE01 | Motor trituradora cónica | Accionamiento principal | 132 kW; 480 V | FUR-PROC-04 | Referencial | D1 |
| 4 | FUR-PTE-D04-SST-0004 | SST-CONE01 | Arrancador suave trituradora cónica | Arranque controlado | 160 kW; 480 V | FUR-PROC-04 | Referencial | D1 |
| 5 | FUR-PTE-D04-MTR-0005 | MTR-LUBC01 | Motor skid lubricación | Circulación de aceite | 5.5 kW; 480 V | FUR-PROC-04 | Referencial | D1 |
| 6 | FUR-PTE-D04-MTR-0006 | MTR-HYDC01 | Motor unidad hidráulica | Ajuste / despeje | 7.5 kW; 480 V | FUR-PROC-04 | Referencial | D1 |
| 7 | FUR-PTE-D04-MTR-0007 | MTR-CVSEC | Motor cinta secundaria | Transferencia de mineral | 30 kW; 480 V | FUR-PROC-04 | Referencial | D1 |
| 8 | FUR-PTE-D04-PMT-0008 | PM-CR2-01 | Medidor de energía secundaria | Registro de energía | 480 V; clase 0.5S | FUR-PROC-04 | Referencial | D1 |
| 9 | FUR-PTE-D04-REL-0009 | REL-CR2-01 | Relé protección de alimentador | Protección del área | 50/51, 50N/51N ref. | FUR-PROC-04 | Referencial | D1 |
| 10 | FUR-PTE-D04-PNL-0010 | LCP-CR2-01 | Panel local cono | Mando / enclavamientos | 480/120 V; 100 A | FUR-PROC-04 | Referencial | D1 |

## 8.5 — D05 — Transporte / Silos

**FUR-PROC padre:** `FUR-PROC-05`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D05-TRF-0001 | TRF-SIL-01 | Transformador transporte/silos | Servicios de cintas y alimentadores | 750 kVA; 4.16/0.48 kV | FUR-PROC-05 | Referencial | D1 |
| 2 | FUR-PTE-D05-MCC-0002 | MCC-SIL-01 | MCC transporte/silos | Distribución de motores | 480 V; 1,200 A | FUR-PROC-05 | Referencial | D1 |
| 3 | FUR-PTE-D05-MTR-0003 | MTR-CV03 | Motor cinta principal a silos | Transferencia principal | 45 kW; 480 V | FUR-PROC-05 | Referencial | D1 |
| 4 | FUR-PTE-D05-VFD-0004 | VFD-CV03 | Variador cinta principal | Control de velocidad | 55 kW; 480 V | FUR-PROC-05 | Referencial | D1 |
| 5 | FUR-PTE-D05-MTR-0005 | MTR-CV04 | Motor cinta distribuidora | Distribución a silos | 22 kW; 480 V | FUR-PROC-05 | Referencial | D1 |
| 6 | FUR-PTE-D05-MTR-0006 | MTR-CV05 | Motor cinta descarga a molienda | Transferencia a molienda | 30 kW; 480 V | FUR-PROC-05 | Referencial | D1 |
| 7 | FUR-PTE-D05-MTR-0007 | MTR-BFS01 | Motor alimentador Silo 1 | Extracción de mineral | 15 kW; 480 V | FUR-PROC-05 | Referencial | D1 |
| 8 | FUR-PTE-D05-MTR-0008 | MTR-BFS02 | Motor alimentador Silo 2 | Extracción de mineral | 11 kW; 480 V | FUR-PROC-05 | Referencial | D1 |
| 9 | FUR-PTE-D05-PNL-0009 | LCP-SIL-01 | Panel de secuencia de cintas | Interbloqueos de transporte | 480/120 V; 100 A | FUR-PROC-05 | Referencial | D1 |
| 10 | FUR-PTE-D05-PMT-0010 | PM-SIL-01 | Medidor de potencia transporte | Demanda / energía / PF | 480 V; clase 0.5S | FUR-PROC-05 | Referencial | D1 |

## 8.6 — D06 — Molienda Primaria

**FUR-PROC padre:** `FUR-PROC-06`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D06-SWG-0001 | SWG-MBPRI | Celda MV molino primario | Seccionamiento y protección del accionamiento | 4.16 kV; 400 A | FUR-PROC-06 | Referencial | D1 |
| 2 | FUR-PTE-D06-MTR-0002 | MTR-MBPRI | Motor MV molino primario | Accionamiento del molino | 750 kW; 4.16 kV | FUR-PROC-06 | Referencial | D1 |
| 3 | FUR-PTE-D06-VFD-0003 | VFD-MBPRI | Variador MV molino primario | Control de velocidad/par | 900 kW; 4.16 kV | FUR-PROC-06 | Referencial | D1 |
| 4 | FUR-PTE-D06-TRF-0004 | TRF-MBPRI | Transformador auxiliares molienda | Servicios LV | 1,000 kVA; 4.16/0.48 kV | FUR-PROC-06 | Referencial | D1 |
| 5 | FUR-PTE-D06-MCC-0005 | MCC-MBPRI | MCC auxiliares molienda | Distribución LV | 480 V; 1,600 A | FUR-PROC-06 | Referencial | D1 |
| 6 | FUR-PTE-D06-MTR-0006 | MTR-LUBMB1 | Motor skid lubricación | Lubricación del molino | 11 kW; 480 V | FUR-PROC-06 | Referencial | D1 |
| 7 | FUR-PTE-D06-MTR-0007 | MTR-PMBPRI | Motor bomba descarga molino | Transferencia de pulpa | 45 kW; 480 V | FUR-PROC-06 | Referencial | D1 |
| 8 | FUR-PTE-D06-MTR-0008 | MTR-FEDMB1 | Motor alimentador molino | Dosificación de mineral | 15 kW; 480 V | FUR-PROC-06 | Referencial | D1 |
| 9 | FUR-PTE-D06-PNL-0009 | LCP-MBPRI | Panel local molino primario | Control / permissives / E-Stop | 480/120 V; 150 A | FUR-PROC-06 | Referencial | D1 |
| 10 | FUR-PTE-D06-PMT-0010 | PM-MBPRI | Analizador de potencia molino | kW/kWh/PF/armónicos | 4.16 kV vía CT/PT | FUR-PROC-06 | Referencial | D1 |

## 8.7 — D07 — Molienda Secundaria

**FUR-PROC padre:** `FUR-PROC-07`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D07-SWG-0001 | SWG-MBSEC1 | Celda MV molino secundario 01 | Protección y maniobra | 4.16 kV; 200 A | FUR-PROC-07 | Referencial | D1 |
| 2 | FUR-PTE-D07-MTR-0002 | MTR-MBSEC1 | Motor molino secundario 01 | Accionamiento | 400 kW; 4.16 kV | FUR-PROC-07 | Referencial | D1 |
| 3 | FUR-PTE-D07-VFD-0003 | VFD-MBSEC1 | Variador MV molino 01 | Control de velocidad | 500 kW; 4.16 kV | FUR-PROC-07 | Referencial | D1 |
| 4 | FUR-PTE-D07-SWG-0004 | SWG-MBSEC2 | Celda MV molino secundario 02 | Protección y maniobra | 4.16 kV; 200 A | FUR-PROC-07 | Referencial | D1 |
| 5 | FUR-PTE-D07-MTR-0005 | MTR-MBSEC2 | Motor molino secundario 02 | Accionamiento | 400 kW; 4.16 kV | FUR-PROC-07 | Referencial | D1 |
| 6 | FUR-PTE-D07-VFD-0006 | VFD-MBSEC2 | Variador MV molino 02 | Control de velocidad | 500 kW; 4.16 kV | FUR-PROC-07 | Referencial | D1 |
| 7 | FUR-PTE-D07-TRF-0007 | TRF-MBSEC | Transformador auxiliares remolienda | Servicios LV | 750 kVA; 4.16/0.48 kV | FUR-PROC-07 | Referencial | D1 |
| 8 | FUR-PTE-D07-MCC-0008 | MCC-MBSEC | MCC auxiliares remolienda | Distribución LV | 480 V; 1,200 A | FUR-PROC-07 | Referencial | D1 |
| 9 | FUR-PTE-D07-MTR-0009 | MTR-PMBSEC | Motor bomba transferencia | Transferencia a clasificación | 37 kW; 480 V | FUR-PROC-07 | Referencial | D1 |
| 10 | FUR-PTE-D07-PNL-0010 | LCP-MBSEC | Panel local remolienda | Control local | 480/120 V; 100 A | FUR-PROC-07 | Referencial | D1 |

## 8.8 — D08 — Clasificación

**FUR-PROC padre:** `FUR-PROC-08`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D08-TRF-0001 | TRF-HC-01 | Transformador clasificación | Alimentación de bombas/cargas | 500 kVA; 4.16/0.48 kV | FUR-PROC-08 | Referencial | D1 |
| 2 | FUR-PTE-D08-MCC-0002 | MCC-HC-01 | MCC clasificación | Distribución de fuerza | 480 V; 800 A | FUR-PROC-08 | Referencial | D1 |
| 3 | FUR-PTE-D08-MTR-0003 | MTR-PHCA | Motor bomba ciclones A | Impulsión de pulpa | 45 kW; 480 V | FUR-PROC-08 | Referencial | D1 |
| 4 | FUR-PTE-D08-VFD-0004 | VFD-PHCA | Variador bomba ciclones A | Control de presión/caudal | 55 kW; 480 V | FUR-PROC-08 | Referencial | D1 |
| 5 | FUR-PTE-D08-MTR-0005 | MTR-PHCB | Motor bomba ciclones B | Redundancia / paralelo | 45 kW; 480 V | FUR-PROC-08 | Referencial | D1 |
| 6 | FUR-PTE-D08-VFD-0006 | VFD-PHCB | Variador bomba ciclones B | Control de presión/caudal | 55 kW; 480 V | FUR-PROC-08 | Referencial | D1 |
| 7 | FUR-PTE-D08-MTR-0007 | MTR-SMPHC | Motor bomba de sump | Transferencia auxiliar | 11 kW; 480 V | FUR-PROC-08 | Referencial | D1 |
| 8 | FUR-PTE-D08-PNL-0008 | LCP-HC-01 | Panel local clasificación | Control y permissives | 480/120 V; 80 A | FUR-PROC-08 | Referencial | D1 |
| 9 | FUR-PTE-D08-PMT-0009 | PM-HC-01 | Medidor de potencia clasificación | Demanda de bombas | 480 V; clase 0.5S | FUR-PROC-08 | Referencial | D1 |
| 10 | FUR-PTE-D08-UPS-0010 | UPS-HC-01 | UPS de control clasificación | Respaldo PLC/IO | 3 kVA; 120 VAC | FUR-PROC-08 | Referencial | D1 |

## 8.9 — D09 — Pre-lixiviación

**FUR-PROC padre:** `FUR-PROC-09`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D09-TRF-0001 | TRF-PLX-01 | Transformador Pre-Lix | Alimentación de agitadores y bombas | 750 kVA; 4.16/0.48 kV | FUR-PROC-09 | Referencial | D1 |
| 2 | FUR-PTE-D09-MCC-0002 | MCC-PLX-01 | MCC Pre-Lix | Distribución de fuerza | 480 V; 1,200 A | FUR-PROC-09 | Referencial | D1 |
| 3 | FUR-PTE-D09-MTR-0003 | MTR-AGPLX1 | Motor agitador Pre-Lix 01 | Agitación de pulpa | 22 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 4 | FUR-PTE-D09-VFD-0004 | VFD-AGPLX1 | Variador agitador 01 | Control de velocidad | 30 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 5 | FUR-PTE-D09-MTR-0005 | MTR-AGPLX2 | Motor agitador Pre-Lix 02 | Agitación de pulpa | 22 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 6 | FUR-PTE-D09-VFD-0006 | VFD-AGPLX2 | Variador agitador 02 | Control de velocidad | 30 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 7 | FUR-PTE-D09-MTR-0007 | MTR-BLWPLX | Motor soplador de proceso | Aireación | 45 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 8 | FUR-PTE-D09-VFD-0008 | VFD-BLWPLX | Variador soplador | Control de aire | 55 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 9 | FUR-PTE-D09-MTR-0009 | MTR-PPLXOUT | Motor bomba transferencia | Envío al proceso siguiente | 30 kW; 480 V | FUR-PROC-09 | Referencial | D1 |
| 10 | FUR-PTE-D09-UPS-0010 | UPS-PLX-01 | UPS instrumentación Pre-Lix | Respaldo de control crítico | 5 kVA; 120 VAC | FUR-PROC-09 | Referencial | D1 |

## 8.10 — D10 — Espesamiento

**FUR-PROC padre:** `FUR-PROC-10`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D10-TRF-0001 | TRF-THK-01 | Transformador espesamiento | Alimentación de espesador y bombas | 500 kVA; 4.16/0.48 kV | FUR-PROC-10 | Referencial | D1 |
| 2 | FUR-PTE-D10-MCC-0002 | MCC-THK-01 | MCC espesamiento | Distribución de fuerza | 480 V; 800 A | FUR-PROC-10 | Referencial | D1 |
| 3 | FUR-PTE-D10-MTR-0003 | MTR-RKED110 | Motor rastras espesador | Accionamiento de rastras | 7.5 kW; 480 V | FUR-PROC-10 | Referencial | D1 |
| 4 | FUR-PTE-D10-VFD-0004 | VFD-RKED110 | Variador de rastras | Control de velocidad/par | 11 kW; 480 V | FUR-PROC-10 | Referencial | D1 |
| 5 | FUR-PTE-D10-MTR-0005 | MTR-PUFA | Motor bomba underflow A | Transferencia de pulpa espesa | 22 kW; 480 V | FUR-PROC-10 | Referencial | D1 |
| 6 | FUR-PTE-D10-MTR-0006 | MTR-PUFB | Motor bomba underflow B | Redundancia | 22 kW; 480 V | FUR-PROC-10 | Referencial | D1 |
| 7 | FUR-PTE-D10-MTR-0007 | MTR-PRW01 | Motor bomba agua recuperada | Retorno de agua | 30 kW; 480 V | FUR-PROC-10 | Referencial | D1 |
| 8 | FUR-PTE-D10-MTR-0008 | MTR-PFLOC | Motor bomba floculante | Dosificación | 3 kW; 480 V | FUR-PROC-10 | Referencial | D1 |
| 9 | FUR-PTE-D10-PNL-0009 | LCP-THK-01 | Panel local espesador | Control / torque / alarmas | 480/120 V; 80 A | FUR-PROC-10 | Referencial | D1 |
| 10 | FUR-PTE-D10-PMT-0010 | PM-THK-01 | Medidor de energía espesamiento | Balance de energía | 480 V; clase 0.5S | FUR-PROC-10 | Referencial | D1 |

## 8.11 — D11 — Lixiviación / CIL

**FUR-PROC padre:** `FUR-PROC-11`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D11-TRF-0001 | TRF-CIL-01 | Transformador CIL | Alimentación de tanques y auxiliares | 1,000 kVA; 4.16/0.48 kV | FUR-PROC-11 | Referencial | D1 |
| 2 | FUR-PTE-D11-MCC-0002 | MCC-CIL-01 | MCC CIL | Distribución de fuerza | 480 V; 1,600 A | FUR-PROC-11 | Referencial | D1 |
| 3 | FUR-PTE-D11-MTR-0003 | MTR-AGCIL1 | Motor agitador CIL 01 | Agitación tanque 01 | 30 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 4 | FUR-PTE-D11-MTR-0004 | MTR-AGCIL2 | Motor agitador CIL 02 | Agitación tanque 02 | 30 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 5 | FUR-PTE-D11-MTR-0005 | MTR-AGCIL3 | Motor agitador CIL 03 | Agitación tanque 03 | 30 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 6 | FUR-PTE-D11-MTR-0006 | MTR-AGCIL4 | Motor agitador CIL 04 | Agitación tanque 04 | 30 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 7 | FUR-PTE-D11-MTR-0007 | MTR-BLWCIL | Motor soplador CIL | Aireación de tanques | 55 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 8 | FUR-PTE-D11-VFD-0008 | VFD-BLWCIL | Variador soplador CIL | Regulación de aire | 75 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 9 | FUR-PTE-D11-MTR-0009 | MTR-ISCIL | Motor criba interetapa | Accionamiento de criba | 7.5 kW; 480 V | FUR-PROC-11 | Referencial | D1 |
| 10 | FUR-PTE-D11-PNL-0010 | LCP-CIL-01 | Panel local CIL | Control de secuencia / E-Stop | 480/120 V; 100 A | FUR-PROC-11 | Referencial | D1 |

## 8.12 — D12 — Adsorción CIP

**FUR-PROC padre:** `FUR-PROC-12`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D12-TRF-0001 | TRF-CIP-01 | Transformador CIP | Alimentación del tren CIP | 1,000 kVA; 4.16/0.48 kV | FUR-PROC-12 | Referencial | D1 |
| 2 | FUR-PTE-D12-MCC-0002 | MCC-CIP-01 | MCC CIP | Distribución de fuerza | 480 V; 1,600 A | FUR-PROC-12 | Referencial | D1 |
| 3 | FUR-PTE-D12-MTR-0003 | MTR-AGCIP1 | Motor agitador CIP 01 | Agitación tanque 01 | 22 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 4 | FUR-PTE-D12-MTR-0004 | MTR-AGCIP2 | Motor agitador CIP 02 | Agitación tanque 02 | 22 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 5 | FUR-PTE-D12-MTR-0005 | MTR-AGCIP3 | Motor agitador CIP 03 | Agitación tanque 03 | 22 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 6 | FUR-PTE-D12-MTR-0006 | MTR-AGCIP4 | Motor agitador CIP 04 | Agitación tanque 04 | 22 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 7 | FUR-PTE-D12-MTR-0007 | MTR-SCRCIP | Motor criba interetapa CIP | Retención de carbón | 7.5 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 8 | FUR-PTE-D12-MTR-0008 | MTR-PCARB | Motor bomba transferencia carbón | Movimiento de carbón | 11 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 9 | FUR-PTE-D12-VFD-0009 | VFD-PCARB | Variador bomba carbón | Control de transferencia | 15 kW; 480 V | FUR-PROC-12 | Referencial | D1 |
| 10 | FUR-PTE-D12-UPS-0010 | UPS-CIP-01 | UPS de control CIP | Respaldo PLC/HMI | 5 kVA; 120 VAC | FUR-PROC-12 | Referencial | D1 |

## 8.13 — D13 — Manejo de Carbón Cargado

**FUR-PROC padre:** `FUR-PROC-13`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D13-TRF-0001 | TRF-CARB-01 | Transformador manejo de carbón | Alimentación del área | 315 kVA; 4.16/0.48 kV | FUR-PROC-13 | Referencial | D1 |
| 2 | FUR-PTE-D13-MCC-0002 | MCC-CARB-01 | MCC manejo de carbón | Distribución de fuerza | 480 V; 600 A | FUR-PROC-13 | Referencial | D1 |
| 3 | FUR-PTE-D13-MTR-0003 | MTR-SCRLC | Motor criba carbón cargado | Separación carbón/pulpa | 11 kW; 480 V | FUR-PROC-13 | Referencial | D1 |
| 4 | FUR-PTE-D13-MTR-0004 | MTR-PCARBA | Motor bomba carbón A | Transferencia hidráulica | 7.5 kW; 480 V | FUR-PROC-13 | Referencial | D1 |
| 5 | FUR-PTE-D13-MTR-0005 | MTR-PCARBB | Motor bomba carbón B | Redundancia | 7.5 kW; 480 V | FUR-PROC-13 | Referencial | D1 |
| 6 | FUR-PTE-D13-MTR-0006 | MTR-SCRDW | Motor criba desaguado | Desaguado de carbón | 5.5 kW; 480 V | FUR-PROC-13 | Referencial | D1 |
| 7 | FUR-PTE-D13-MTR-0007 | MTR-PCW01 | Motor bomba agua transferencia | Agua de transporte/lavado | 11 kW; 480 V | FUR-PROC-13 | Referencial | D1 |
| 8 | FUR-PTE-D13-VFD-0008 | VFD-PCW01 | Variador bomba agua | Control de caudal | 15 kW; 480 V | FUR-PROC-13 | Referencial | D1 |
| 9 | FUR-PTE-D13-PNL-0009 | LCP-CARB-01 | Panel local carbón | Control de secuencia | 480/120 V; 60 A | FUR-PROC-13 | Referencial | D1 |
| 10 | FUR-PTE-D13-UPS-0010 | UPS-CARB-01 | UPS control carbón | Respaldo de instrumentación | 3 kVA; 120 VAC | FUR-PROC-13 | Referencial | D1 |

## 8.14 — D14 — Elución / Desorción

**FUR-PROC padre:** `FUR-PROC-14`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D14-TRF-0001 | TRF-ELU-01 | Transformador elución | Alimentación de bombas/calefacción | 500 kVA; 4.16/0.48 kV | FUR-PROC-14 | Referencial | D1 |
| 2 | FUR-PTE-D14-MCC-0002 | MCC-ELU-01 | MCC elución | Distribución de fuerza | 480 V; 800 A | FUR-PROC-14 | Referencial | D1 |
| 3 | FUR-PTE-D14-HTR-0003 | HTR-ELU-01 | Banco de calentamiento eléctrico | Calentamiento de solución | 300 kW; 480 V | FUR-PROC-14 | Referencial | D1 |
| 4 | FUR-PTE-D14-MTR-0004 | MTR-PELUA | Motor bomba circulación A | Recirculación de eluente | 11 kW; 480 V | FUR-PROC-14 | Referencial | D1 |
| 5 | FUR-PTE-D14-MTR-0005 | MTR-PELUB | Motor bomba circulación B | Redundancia | 11 kW; 480 V | FUR-PROC-14 | Referencial | D1 |
| 6 | FUR-PTE-D14-MTR-0006 | MTR-PBAR | Motor bomba barren | Recirculación de solución | 7.5 kW; 480 V | FUR-PROC-14 | Referencial | D1 |
| 7 | FUR-PTE-D14-MTR-0007 | MTR-PPREG | Motor bomba solución rica | Transferencia a EW | 7.5 kW; 480 V | FUR-PROC-14 | Referencial | D1 |
| 8 | FUR-PTE-D14-VFD-0008 | VFD-PELUA | Variador bomba circulación | Control de caudal | 15 kW; 480 V | FUR-PROC-14 | Referencial | D1 |
| 9 | FUR-PTE-D14-PNL-0009 | LCP-ELU-01 | Panel de control elución | Secuencia térmica / bombas | 480/120 V; 100 A | FUR-PROC-14 | Referencial | D1 |
| 10 | FUR-PTE-D14-UPS-0010 | UPS-ELU-01 | UPS de control elución | Respaldo PLC/HMI | 5 kVA; 120 VAC | FUR-PROC-14 | Referencial | D1 |

## 8.15 — D15 — Electrowinning

**FUR-PROC padre:** `FUR-PROC-15`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D15-TRF-0001 | TRF-EW-01 | Transformador área EW | Alimentación AC del proceso | 500 kVA; 4.16/0.48 kV | FUR-PROC-15 | Referencial | D1 |
| 2 | FUR-PTE-D15-MCC-0002 | MCC-EW-01 | MCC electrowinning | Distribución de auxiliares | 480 V; 800 A | FUR-PROC-15 | Referencial | D1 |
| 3 | FUR-PTE-D15-REC-0003 | REC-EW01 | Rectificador EW 01 | Conversión AC/DC para celda | 25 kW; 12 VDC / 1,500 A | FUR-PROC-15 | Referencial | D1 |
| 4 | FUR-PTE-D15-REC-0004 | REC-EW02 | Rectificador EW 02 | Conversión AC/DC redundante | 25 kW; 12 VDC / 1,500 A | FUR-PROC-15 | Referencial | D1 |
| 5 | FUR-PTE-D15-BUS-0005 | BUS-EW-01 | Barra DC de electrowinning | Distribución DC a celdas | 0–12 VDC; 2,000 A | FUR-PROC-15 | Referencial | D1 |
| 6 | FUR-PTE-D15-MTR-0006 | MTR-PEWF | Motor bomba alimentación EW | Transferencia de solución rica | 7.5 kW; 480 V | FUR-PROC-15 | Referencial | D1 |
| 7 | FUR-PTE-D15-MTR-0007 | MTR-PEWR | Motor bomba recirculación EW | Recirculación de electrolito | 7.5 kW; 480 V | FUR-PROC-15 | Referencial | D1 |
| 8 | FUR-PTE-D15-MTR-0008 | MTR-VNTEW | Motor extracción EW | Ventilación del área | 11 kW; 480 V | FUR-PROC-15 | Referencial | D1 |
| 9 | FUR-PTE-D15-PNL-0009 | LCP-EW-01 | Panel control EW | Control de rectificadores/celdas | 480/120 V; 100 A | FUR-PROC-15 | Referencial | D1 |
| 10 | FUR-PTE-D15-UPS-0010 | UPS-EW-01 | UPS control EW | Respaldo de control | 5 kVA; 120 VAC | FUR-PROC-15 | Referencial | D1 |

## 8.16 — D16 — Calcinación / Secado

**FUR-PROC padre:** `FUR-PROC-16`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D16-TRF-0001 | TRF-CAL-01 | Transformador calcinación | Alimentación del área | 500 kVA; 4.16/0.48 kV | FUR-PROC-16 | Referencial | D1 |
| 2 | FUR-PTE-D16-MCC-0002 | MCC-CAL-01 | MCC calcinación/secado | Distribución de fuerza | 480 V; 800 A | FUR-PROC-16 | Referencial | D1 |
| 3 | FUR-PTE-D16-HTR-0003 | HTR-CAL-01 | Banco calefactor horno/secador | Aporte térmico eléctrico | 250 kW; 480 V | FUR-PROC-16 | Referencial | D1 |
| 4 | FUR-PTE-D16-MTR-0004 | MTR-DRY01 | Motor secador | Accionamiento mecánico | 7.5 kW; 480 V | FUR-PROC-16 | Referencial | D1 |
| 5 | FUR-PTE-D16-MTR-0005 | MTR-SFD01 | Motor alimentador tornillo | Dosificación | 3 kW; 480 V | FUR-PROC-16 | Referencial | D1 |
| 6 | FUR-PTE-D16-MTR-0006 | MTR-IDFCAL | Motor ventilador tiro inducido | Extracción de gases | 7.5 kW; 480 V | FUR-PROC-16 | Referencial | D1 |
| 7 | FUR-PTE-D16-MTR-0007 | MTR-BFCAL | Motor filtro de mangas | Captación de partículas | 11 kW; 480 V | FUR-PROC-16 | Referencial | D1 |
| 8 | FUR-PTE-D16-MTR-0008 | MTR-CLRCAL | Motor enfriador | Enfriamiento de producto | 5.5 kW; 480 V | FUR-PROC-16 | Referencial | D1 |
| 9 | FUR-PTE-D16-PNL-0009 | LCP-CAL-01 | Panel control térmico | Control de temperatura y secuencia | 480/120 V; 100 A | FUR-PROC-16 | Referencial | D1 |
| 10 | FUR-PTE-D16-UPS-0010 | UPS-CAL-01 | UPS control calcinación | Respaldo de control | 3 kVA; 120 VAC | FUR-PROC-16 | Referencial | D1 |

## 8.17 — D17 — Fundición

**FUR-PROC padre:** `FUR-PROC-17`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D17-TRF-0001 | TRF-SMELT | Transformador fundición | Alimentación del área | 300 kVA; 4.16/0.48 kV | FUR-PROC-17 | Referencial | D1 |
| 2 | FUR-PTE-D17-PSU-0002 | PSU-SMELT | Fuente/transformador de horno | Alimentación del horno | 150 kVA; salida TBC | FUR-PROC-17 | Referencial | D1 |
| 3 | FUR-PTE-D17-MCC-0003 | MCC-SMELT | MCC fundición | Distribución de auxiliares | 480 V; 600 A | FUR-PROC-17 | Referencial | D1 |
| 4 | FUR-PTE-D17-MTR-0004 | MTR-HODSM | Motor extracción de humos | Ventilación de campana | 15 kW; 480 V | FUR-PROC-17 | Referencial | D1 |
| 5 | FUR-PTE-D17-MTR-0005 | MTR-SCRUB | Motor bomba scrubber | Circulación de solución | 7.5 kW; 480 V | FUR-PROC-17 | Referencial | D1 |
| 6 | FUR-PTE-D17-MTR-0006 | MTR-FLUXM | Motor mezclador fundentes | Preparación de carga | 5.5 kW; 480 V | FUR-PROC-17 | Referencial | D1 |
| 7 | FUR-PTE-D17-MTR-0007 | MTR-FLUXF | Motor alimentador fundentes | Dosificación | 3 kW; 480 V | FUR-PROC-17 | Referencial | D1 |
| 8 | FUR-PTE-D17-PNL-0008 | LCP-SMELT | Panel local fundición | Control / alarmas / permissives | 480/120 V; 100 A | FUR-PROC-17 | Referencial | D1 |
| 9 | FUR-PTE-D17-UPS-0009 | UPS-SMELT | UPS control fundición | Respaldo de control | 5 kVA; 120 VAC | FUR-PROC-17 | Referencial | D1 |
| 10 | FUR-PTE-D17-PMT-0010 | PM-SMELT | Analizador de potencia horno | Demanda y energía | 480 V; clase 0.5S | FUR-PROC-17 | Referencial | D1 |

## 8.18 — D18 — Producto Final / Reactivación / Colas

**FUR-PROC padre:** `FUR-PROC-18`  
**Condición de todos los registros de esta tabla:** Referencial / D1.

| # | Código FUR-PTE | TAG referencial | Activo eléctrico | Función eléctrica | Ejemplo numérico referencial | FUR-PROC relacionada | Condición | Madurez |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | FUR-PTE-D18-TRF-0001 | TRF-D18-01 | Transformador reactivación/colas | Alimentación del área | 1,000 kVA; 4.16/0.48 kV | FUR-PROC-18 | Referencial | D1 |
| 2 | FUR-PTE-D18-MCC-0002 | MCC-D18-01 | MCC reactivación/colas | Distribución de fuerza | 480 V; 1,200 A | FUR-PROC-18 | Referencial | D1 |
| 3 | FUR-PTE-D18-MTR-0003 | MTR-KILNDRV | Motor accionamiento horno carbón | Rotación del horno | 15 kW; 480 V | FUR-PROC-18 | Referencial | D1 |
| 4 | FUR-PTE-D18-HTR-0004 | HTR-KILN | Banco calefactor horno regeneración | Reactivación térmica | 60 kW; 480 V | FUR-PROC-18 | Referencial | D1 |
| 5 | FUR-PTE-D18-MTR-0005 | MTR-PCREG | Motor bomba retorno carbón | Retorno a CIP | 5.5 kW; 480 V | FUR-PROC-18 | Referencial | D1 |
| 6 | FUR-PTE-D18-MTR-0006 | MTR-PTAILA | Motor bomba relaves A | Transferencia de relaves | 45 kW; 480 V | FUR-PROC-18 | Referencial | D1 |
| 7 | FUR-PTE-D18-MTR-0007 | MTR-PTAILB | Motor bomba relaves B | Redundancia | 45 kW; 480 V | FUR-PROC-18 | Referencial | D1 |
| 8 | FUR-PTE-D18-MTR-0008 | MTR-PRECL | Motor bomba agua recuperada | Retorno de agua a planta | 30 kW; 480 V | FUR-PROC-18 | Referencial | D1 |
| 9 | FUR-PTE-D18-UPS-0009 | UPS-DORE | UPS balanza/custodia doré | Respaldo de pesaje/registro | 2 kVA; 120 VAC | FUR-PROC-18 | Referencial | D1 |
| 10 | FUR-PTE-D18-PMT-0010 | PM-D18-01 | Medidor de energía D18 | Balance de energía | 480 V; clase 0.5S | FUR-PROC-18 | Referencial | D1 |
---

# 9. RESUMEN CUANTITATIVO

| Concepto | Cantidad |
|---|---:|
| Etapas de proceso | 18 |
| FUR-PROC padre | 18 |
| FUR-PTE por etapa | 10 |
| **FUR-PTE referenciales** | **180** |
| Condición inicial | Referencial |
| Madurez inicial | D1 |

---

# 10. TAXONOMÍA FUNCIONAL DE ACTIVOS FUR-PTE

## 10.1 Generación / entrada / distribución

- acometida;
- subestación;
- transformadores;
- celdas MV;
- interruptores;
- barras;
- alimentadores.

## 10.2 Control de motores

- MCC;
- motores;
- VFD;
- arrancadores suaves;
- contactores;
- protecciones de motor.

## 10.3 Control y servicios auxiliares

- paneles locales;
- UPS;
- fuentes DC;
- tableros de control;
- calefacción eléctrica;
- ventilación.

## 10.4 Medición y protección

- relés;
- CT/PT;
- analizadores de potencia;
- medidores de energía;
- monitoreo de condición.

---

# 11. PLANTILLA MAESTRA DE UNA FUR-PTE

```yaml
fur_code:
uuid:
network: FUR-PTE
parent_process_fur:
asset_name:
tag:
family:
subtype:
site:
area:
process_stage:
electrical_system:
location:
manufacturer:
model:
serial:
rated_power:
rated_voltage:
rated_current:
frequency:
phases:
efficiency:
power_factor:
service_duty:
cooling:
insulation:
short_circuit_rating:
protection_functions: []
upstream_feeder:
downstream_loads: []
cable_feeders: []
grounding:
metering:
maintenance_asset:
documents: []
relations: []
condition: Referential
maturity: D1
tbc_hold: []
audit:
```

---

# 12. BLOQUES DE DATOS ESPECIALIZADOS FUR-PTE

| Tabla propia | Uso |
|---|---|
| `fur_power_nameplate` | Placa y datos nominales |
| `fur_power_rating` | Potencia/rating térmico/eléctrico |
| `fur_power_winding` | Devanados y grupo vectorial |
| `fur_power_impedance` | Impedancias |
| `fur_power_insulation` | BIL / aislamiento |
| `fur_power_cooling` | ONAN/ONAF/ventilación |
| `fur_power_tap` | Taps |
| `fur_power_protection` | Funciones ANSI / ajustes |
| `fur_power_feeder` | Alimentadores |
| `fur_power_test` | FAT/SAT/pruebas |
| `fur_power_oil_test` | Ensayos de aceite |
| `fur_power_condition` | Health index / condición |
| `fur_power_measurement` | Mediciones puntuales/referencias historian |
| `fur_power_grounding` | Neutro / puesta a tierra |

---

# 13. TABLAS COMUNES FUR

- `fur_record`
- `fur_relation`
- `fur_document_link`
- `fur_audit_event`
- `fur_data_quality`
- `fur_status_history`
- `fur_lifecycle_event`
- `fur_responsibility`
- `fur_search_alias`
- `fur_external_reference`
- `fur_geo_location`
- `fur_tag`

---

# 14. MODELOS NATIVOS ODOO 19 REUTILIZADOS

| Modelo | Uso |
|---|---|
| `product.template` | Identidad ERP catalogable |
| `product.product` | Variante/producto |
| `product.category` | Clasificación |
| `res.partner` | Fabricante/proveedor |
| `res.currency` | Moneda |
| `uom.uom` | Unidades |
| `stock.location` | Ubicación |
| `stock.lot` | Serie/lote |
| `maintenance.equipment` | Equipo mantenible |
| `maintenance.request` | Solicitud/OT |
| `product.supplierinfo` | Proveedor/precio de catálogo |
| `purchase.order` | Orden de compra |
| `purchase.order.line` | Líneas de compra |
| `ir.attachment` | Documentos binarios |
| `res.users` | Usuarios |
| `hr.employee` | Responsables |
| `mail.message` | Chatter/auditoría |
| `mail.activity` | Actividades |

**Regla:** la escritura transaccional sobre Odoo debe realizarse mediante ORM/capa de negocio, no SQL directo.

---

# 15. RELACIONES TRANSVERSALES MÍNIMAS

Cada FUR-PTE puede relacionarse con:

```text
FUR-PROC  → proceso/carga atendida
FUR-IOT   → medición/temperatura/vibración/estado
FUR-GPON  → comunicaciones OT
FUR-CC    → inspección/QA-QC de suministros
FUR-LAB   → análisis de aceite/materiales
FUR-MNT   → mantenimiento/OT
FUR-RQ    → requisiciones
FUR-OF    → ofertas
FUR-CAM   → seguridad/monitoreo visual
```

Tipos recomendados en `fur_relation`:

- `pertenece`
- `alimenta`
- `protege`
- `mide`
- `comunica`
- `mantiene`
- `repuesto_de`
- `analiza`
- `solicita`
- `oferta`
- `soporta`
- `monitorea`
- `ubicado_en`

---

# 16. CATÁLOGO WEB — FILTROS PROPUESTOS

La página web de FUR-PTE debería permitir:

- buscar por código FUR;
- TAG;
- etapa D01–D18;
- área;
- subestación;
- nivel de tensión;
- potencia;
- familia eléctrica;
- motor/VFD/MCC/transformador;
- estado;
- condición;
- madurez D0–D5;
- criticidad;
- alimentador;
- carga asociada;
- fabricante;
- mantenimiento pendiente;
- documento faltante;
- TBC/HOLD;
- relación con FUR-PROC;
- relación con FUR-IOT;
- relación con FUR-MNT.

Pseudoflujo:

```text
SELECCIONAR etapa
→ consultar FUR-PROC
→ consultar FUR-PTE relacionadas
→ filtrar por familia/tensión/potencia/estado/madurez
→ mostrar tarjetas
→ abrir FUR-PTE completa
→ cargar datos técnicos
→ cargar relaciones
→ cargar documentos
→ cargar mantenimiento
→ cargar sourcing
→ cargar calidad del dato
→ cargar TBC/HOLD
```

---

# 17. KPI ELÉCTRICOS PROPUESTOS

Solo deben activarse cuando existan fuentes confiables:

- carga %;
- demanda máxima;
- kW;
- kVA;
- kWh;
- factor de potencia;
- corriente;
- tensión;
- frecuencia;
- desequilibrio;
- THD;
- temperatura;
- estado de breaker;
- número de trips;
- disponibilidad;
- MTBF;
- MTTR;
- consumo específico kWh/t;
- eficiencia de accionamiento;
- utilización de transformadores/MCC/VFD.

---

# 18. REGLAS DE DISEÑO Y VALIDACIÓN

1. No dimensionar cables únicamente con corriente nominal.
2. Verificar ampacidad, caída de tensión, cortocircuito, arranque y coordinación.
3. Verificar capacidad interruptiva del switchgear.
4. Coordinar relés, fusibles, breakers y arrancadores.
5. Validar esquema de puesta a tierra.
6. Definir CT/PT según medición/protección.
7. Verificar armónicos de VFD/rectificadores.
8. Verificar ventilación y ambiente minero.
9. Mantener segregación OT/IT.
10. Vincular FAT/SAT y pruebas.
11. No guardar series temporales en `product.template`.
12. Mantener fuente autoritativa del dato.
13. No promover D1 a D4 sin evidencia.

---

# 19. MADUREZ D0–D5

| Nivel | Significado |
|---|---|
| D0 | Hipótesis / sin datos |
| D1 | Referencial / estimado |
| D2 | Preliminar / levantamiento |
| D3 | Validado / en revisión |
| D4 | Operacional / con evidencia |
| D5 | Histórico completo y trazable |

Ruta objetivo:

```text
D1 catálogo
→ AS-FOUND
→ D2
→ placa/unifilar/estudio
→ D3
→ pruebas/evidencia operacional
→ D4
→ histórico completo
→ D5
```

---

# 20. HOLD / TBC DEL CATÁLOGO

1. Confirmar tensión nominal real de distribución por área.
2. Confirmar arquitectura 34.5/4.16 kV, 2.4 kV y/o 480 V por planta real.
3. Reconciliar 180 registros con Asset Register.
4. Confirmar TAG.
5. Confirmar fabricante/modelo/serial.
6. Confirmar ratings reales.
7. Confirmar corriente nominal y de arranque.
8. Confirmar estudios de cortocircuito.
9. Confirmar coordinación de protecciones.
10. Confirmar CT/PT.
11. Confirmar cables y rutas.
12. Confirmar esquema de tierra.
13. Confirmar VFD/soft starters instalados.
14. Confirmar MCC/celdas reales.
15. Confirmar documentos AS-BUILT.
16. Vincular planes MNT.
17. Vincular historian/SCADA.
18. Vincular comunicaciones GPON/OT.
19. Cerrar RQ/OF/PO reales.
20. Ejecutar FAT/SAT/UAT del catálogo digital.

---

# 21. REFERENCIAS PÚBLICAS — VERIFICADAS REV.01

1. Schneider Electric — **LV Motor Control Center in Mining Applications**.  
   https://www.se.com/ca/en/download/document/LVMCCMiningPowerSystemWP04/

2. Schneider Electric — **Variable speed drives for mining power systems applications**.  
   https://www.se.com/us/en/download/document/VSD_Mining_Applications/

3. Schneider Electric — **Medium Voltage Switchgear**.  
   https://www.se.com/us/en/product-category/87897-medium-voltage-switchgear/

4. IEC — **IEC 60076-1:2011 — Power transformers — Part 1: General**.  
   https://webstore.iec.ch/en/publication/588

5. IEC — **IEC 60034-1:2026 — Rotating electrical machines — Part 1: Rating and performance**.  
   https://webstore.iec.ch/en/publication/89961

6. IEC — **IEC 61800-2:2021 — Adjustable speed electrical power drive systems — Part 2**.  
   https://webstore.iec.ch/en/publication/62105

7. IEC — **IEC 61800-5-1:2022 — Safety requirements — Electrical, thermal and energy**.  
   https://webstore.iec.ch/en/publication/62103

8. IEC — **IEC 61439-1:2020 — Low-voltage switchgear and controlgear assemblies — General rules**.  
   https://webstore.iec.ch/en/publication/32338

9. IEC — **IEC 62271-200:2021 + AMD1:2024 — AC metal-enclosed switchgear and controlgear**.  
   https://webstore.iec.ch/en/publication/63466

10. Odoo — **Odoo 19 Inventory — Lot numbers / serial traceability**.  
    https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/product_management/product_tracking/lots.html

11. Odoo — **Odoo 19 Maintenance — Equipment and maintenance requests**.  
    https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/maintenance/

12. Odoo — **Odoo 19 Purchase**.  
    https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/purchase.html

---

# 22. CONCLUSIÓN

Este Catálogo Maestro define **180 FUR-PTE referenciales**, distribuidas en **18 etapas × 10 activos eléctricos**, para construir la capa de potencia eléctrica del Ecosistema Digital FUR.

La estructura permite navegar:

```text
PLANTA
→ ETAPA FUR-PROC
→ SISTEMA ELÉCTRICO
→ FUR-PTE
→ ACTIVO ELÉCTRICO
→ CARGA
→ PROTECCIÓN
→ MEDICIÓN
→ MANTENIMIENTO
→ DOCUMENTOS
→ SOURCING
→ AUDITORÍA
```

El catálogo es una base para React.js, Odoo 19, PostgreSQL, Asset Register, mantenimiento, estudios de potencia y gemelo digital. Antes de producción, cada FUR debe reconciliarse con placas, unifilares, estudios de cortocircuito/coordinación, FAT/SAT, pruebas de campo y documentación AS-BUILT.

---

# 23. CONTROL DE CONSISTENCIA REV.01

Verificación automática del catálogo maestro:

| Control | Resultado |
|---|---:|
| Etapas D01–D18 | 18 |
| FUR-PTE por etapa | 10 |
| Total de FUR-PTE de catálogo | 180 |
| Códigos FUR-PTE duplicados | 0 |
| Condición base de catálogo | Referencial |
| Madurez base | D1 |
| Ejemplo maestro gráfico | FUR-PTE-PB01-TRF-0001 |
| Estado de ingeniería | NO AS-BUILT / NO IFC / NO AFC |

La validación de consistencia confirma la estructura **18 × 10 = 180 registros únicos**. La consistencia documental no equivale a validación de ingeniería de campo.

---

**FIN DEL DOCUMENTO — `CATALOGO_MAESTRO_FUR_PTE_ACTIVOS_ELECTRICOS_18_ETAPAS_180_FUR_REV01.md`**


# 73. ANEXO C — CATÁLOGO FUENTE FUR-IOT 18 ETAPAS × 10

> Contenido incorporado desde el catálogo IoT del proyecto, incluyendo FUR-IOT-001045 como ejemplo documental fuente.


# CATÁLOGO MAESTRO FUR-IOT — ACTIVOS IoT / INSTRUMENTACIÓN POR ETAPA DE PROCESO
## Ecosistema Digital FUR — Planta de Beneficio de Oro — 18 etapas × 10 FUR-IOT = 180 ejemplos referenciales

**Código documental:** `CAT-FUR-IOT-ACTIVOS-180-001`  
**Revisión:** `REV.00`  
**Fecha:** `2026-09-21`  
**Red transversal:** `FUR-IOT — IoT / Instrumentación`  
**Arquitectura objetivo:** Odoo 19 + PostgreSQL + `fur_record` + `fur_iot_*` + React.js + sistemas OT (PLC/SCADA/Historian)  
**Condición del catálogo:** **REFERENCIAL DE INGENIERÍA — NO AS-BUILT / NO IFC / NO AFC**  
**Madurez inicial de los 180 ejemplos:** `D1 — Referencial (estimado)` salvo la ficha fuente `FUR-IOT-001045`, que se conserva como ejemplo documental D4 en su expediente original.  

> **Advertencia de gobierno del dato:** los 180 registros siguientes son ejemplos numéricos de catálogo para diseño funcional, UX, base de datos, Asset Register, filtros y pruebas. No deben promoverse automáticamente a datos operacionales, de seguridad, control, metrología o mantenimiento. Cada valor requiere reconciliación con Instrument Index, I/O List, P&ID, Loop Diagrams, PLC/SCADA, Historian, datasheets OEM, certificados de calibración y evidencia de campo.

---

# 1. OBJETIVO Y ALCANCE

Este documento organiza un catálogo maestro de activos IoT e instrumentación asociados a las 18 etapas productivas del proceso de una planta de beneficio de oro. Para cada etapa se proponen exactamente **10 FUR-IOT**, totalizando **180 registros referenciales**. El catálogo se alinea con la ficha maestra `FUR-IOT-001045 — Sensor de Presión PT-100`, que define identidad única, variable, rango, señal, conectividad, calibración, relaciones, documentación, sourcing, madurez del dato y trazabilidad.

El catálogo sirve como base para:

- catálogo web y filtros por etapa, familia, variable, señal, condición y madurez;
- diseño del Asset Register IoT;
- parametrización de componentes React.js sin hard-coding por activo;
- definición conceptual de tablas `fur_iot_*`;
- relación Proceso ↔ Activo ↔ Instrumento ↔ PLC/SCADA ↔ Historian ↔ Odoo/FUR;
- planificación de levantamiento de campo, calibración, ciberseguridad OT y pruebas FAT/SAT/UAT;
- integración transversal con FUR-PROC, FUR-PTE, FUR-GPON, FUR-CC, FUR-LAB, FUR-MNT, FUR-RQ, FUR-OF y FUR-CAM.

---

# 2. BASE DOCUMENTAL Y CRITERIO DE CONSTRUCCIÓN

## 2.1 Contenido derivado del documento adjunto

Del Documento Maestro `FUR-IOT-001045` se conservan como patrón de diseño: identidad FUR, jerarquía Sitio → Área → Proceso → Sistema → Ubicación, bloques comunes, variable/rango/señal, conectividad, calibración, cadena Sensor → Gateway → PLC/SCADA → Historian → Odoo/FUR → Dashboard, tablas Odoo, tablas `fur_iot_*`, calidad D0–D5, TBC/HOLD y auditoría.

La ficha fuente documenta específicamente `FUR-IOT-001045 — Sensor de Presión PT-100`, Zona 03 — Molienda, proceso Clasificación / Impulsión, rango 0–10 bar, señal 4–20 mA + HART, 24 VDC y madurez D4. En este catálogo se conserva como **alias documental** de uno de los ejemplos de D08, sin renumerar ni alterar el expediente fuente.

## 2.2 Ampliación con referencias públicas

La selección de familias de instrumentos se amplía con referencias públicas de minería y procesamiento de minerales. Estas fuentes respaldan la **clase de medición o función** (por ejemplo, presión/caudal/densidad en ciclones, pH/DO en lixiviación, nivel/torque/densidad en espesamiento, instrumentación de cintas y monitoreo de electrowinning), pero **no validan los números concretos de este catálogo**. Los rangos aquí presentados son valores referenciales de ingeniería para prototipado.

---

# 3. CONVENCIÓN DE IDENTIDAD FUR-IOT DEL CATÁLOGO

Formato propuesto para este catálogo:

```text
FUR-IOT-{ETAPA}-{FAMILIA}-{SECUENCIA GLOBAL}
```

Ejemplo:

```text
FUR-IOT-D08-PT-0071
```

Significado:

- `FUR-IOT`: red transversal IoT / Instrumentación.
- `D08`: etapa de Clasificación.
- `PT`: familia funcional — Pressure Transmitter.
- `0071`: secuencia global dentro del catálogo de 180 ejemplos.

> **HOLD de nomenclatura:** el patrón definitivo debe reconciliarse con el TAG Register, Instrument Index, convenciones de planta y política corporativa de codificación. La ficha fuente `FUR-IOT-001045` mantiene su código original.

---

# 4. TAXONOMÍA FUNCIONAL FUR-IOT

| Código | Familia / tipo funcional | Ejemplos de variable o función |
|---|---|---|
| `PT` | Presión | presión de pulpa, aceite, aire, draft |
| `DPT` | Presión diferencial | filtros, screens, pérdida de carga |
| `TT` | Temperatura | pulpa, aceite, rodamientos, hornos |
| `LT / LS` | Nivel | tanques, silos, chutes, pozas |
| `FT` | Caudal | pulpa, agua, reactivos, combustible |
| `DT` | Densidad | pulpa, underflow, relaves |
| `AIT` | Analítica | pH, ORP, DO, conductividad, cianuro, O₂, CO |
| `VT` | Vibración | bombas, molinos, agitadores, rodamientos |
| `WT / WIT` | Pesaje | básculas, caudal másico en cinta, carga |
| `ST` | Velocidad | cintas, ejes, tambores |
| `CT / PWR` | Eléctrico de condición | corriente, potencia |
| `ZT / ZS` | Posición / estado | válvulas, CSS, desalineamiento |
| `MDT / RDS` | Protección de transporte | metal tramp, rasgadura |
| `PSA / AST` | Analítica avanzada | tamaño de partícula, acústica |
| `GAS` | Seguridad de proceso | H₂ u otros gases |
| `RFID` | Identificación digital | custodia y trazabilidad física |

---

# 5. RESUMEN CUANTITATIVO

| Indicador | Valor |
|---|---:|
| Etapas de proceso | 18 |
| FUR-IOT por etapa | 10 |
| Total FUR-IOT referenciales | **180** |
| Red transversal | FUR-IOT |
| Condición inicial del catálogo | Referencial |
| Madurez inicial del catálogo | D1 |
| Ejemplo fuente conservado | FUR-IOT-001045 |

---

# 6. MATRIZ MAESTRA DE ETAPAS

| # | Código | Etapa de proceso | FUR-PROC padre | FUR-IOT |
|---:|---|---|---|---:|
| 1 | `D01` | Recepción y Alimentación | `FUR-PROC-01` | 10 |
| 2 | `D02` | Trituración Primaria | `FUR-PROC-02` | 10 |
| 3 | `D03` | Cribado | `FUR-PROC-03` | 10 |
| 4 | `D04` | Trituración Secundaria | `FUR-PROC-04` | 10 |
| 5 | `D05` | Transporte / Silos | `FUR-PROC-05` | 10 |
| 6 | `D06` | Molienda Primaria | `FUR-PROC-06` | 10 |
| 7 | `D07` | Molienda Secundaria | `FUR-PROC-07` | 10 |
| 8 | `D08` | Clasificación | `FUR-PROC-08` | 10 |
| 9 | `D09` | Pre-lixiviación | `FUR-PROC-09` | 10 |
| 10 | `D10` | Espesamiento | `FUR-PROC-10` | 10 |
| 11 | `D11` | Lixiviación / CIL | `FUR-PROC-11` | 10 |
| 12 | `D12` | Adsorción CIP | `FUR-PROC-12` | 10 |
| 13 | `D13` | Manejo de Carbón Cargado | `FUR-PROC-13` | 10 |
| 14 | `D14` | Elución / Desorción | `FUR-PROC-14` | 10 |
| 15 | `D15` | Electrowinning | `FUR-PROC-15` | 10 |
| 16 | `D16` | Calcinación / Secado | `FUR-PROC-16` | 10 |
| 17 | `D17` | Fundición | `FUR-PROC-17` | 10 |
| 18 | `D18` | Producto Final / Reactivación / Colas | `FUR-PROC-18` | 10 |

---

# 7. CATÁLOGO DETALLADO — 180 FUR-IOT

## 7.1 D01 — Recepción y Alimentación

**FUR-PROC padre:** `FUR-PROC-01`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D01-LT-0001` | — | `LT-ROM-01` | Transmisor de nivel radar de tolva ROM | Nivel de mineral en tolva | 0–8 m | 4–20 mA + HART | Tolva ROM | Referencial | D1 |
| 2 | `FUR-IOT-D01-WT-0002` | — | `WT-ROM-01` | Sistema de pesaje / báscula camionera | Masa por pesada | 0–100 t | Ethernet / Modbus TCP | Balanza camionera | Referencial | D1 |
| 3 | `FUR-IOT-D01-WIT-0003` | — | `WIT-CV01` | Báscula dinámica de cinta | Caudal másico de mineral | 0–250 t/h | 4–20 mA + Modbus TCP | Cinta de alimentación | Referencial | D1 |
| 4 | `FUR-IOT-D01-ST-0004` | — | `ST-CV01` | Sensor de velocidad de cinta | Velocidad de banda | 0–3.0 m/s | Pulso / 4–20 mA | Cinta de alimentación | Referencial | D1 |
| 5 | `FUR-IOT-D01-MDT-0005` | — | `MDT-CV01` | Detector de metal tramp | Presencia de metal no magnético | Digital / detección | Relé + Ethernet | Detector de metales | Referencial | D1 |
| 6 | `FUR-IOT-D01-ZS-0006` | — | `ZS-MIS-01` | Interruptor de desalineamiento de banda | Posición lateral de cinta | Normal / alarma / trip | Contacto seco | Cinta de alimentación | Referencial | D1 |
| 7 | `FUR-IOT-D01-RDS-0007` | — | `RDS-CV01` | Detector de rasgadura de cinta | Integridad de banda | Normal / trip | Digital | Cinta de alimentación | Referencial | D1 |
| 8 | `FUR-IOT-D01-VT-0008` | — | `VT-BRG-01` | Transmisor de vibración de rodamiento | Vibración global | 0–25 mm/s RMS | 4–20 mA | Polea motriz | Referencial | D1 |
| 9 | `FUR-IOT-D01-TT-0009` | — | `TT-BRG-01` | Transmisor de temperatura de rodamiento | Temperatura de cojinete | 0–120 °C | 4–20 mA / RTD | Polea motriz | Referencial | D1 |
| 10 | `FUR-IOT-D01-DPT-0010` | — | `DPT-DCL-01` | Transmisor de presión diferencial de colector | ΔP de filtro de mangas | 0–2,500 Pa | 4–20 mA + HART | Colector de polvo | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D01 → GW-D01-01 → PLC-D01-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.2 D02 — Trituración Primaria

**FUR-PROC padre:** `FUR-PROC-02`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D02-LT-0011` | — | `LT-CRH-01` | Transmisor de nivel de tolva de chancadora | Nivel de alimentación | 0–8 m | 4–20 mA + HART | Tolva de chancado | Referencial | D1 |
| 2 | `FUR-IOT-D02-WIT-0012` | — | `WIT-CRH-01` | Báscula de cinta de alimentación | Caudal de mineral a chancadora | 0–300 t/h | Modbus TCP | Alimentador de placas | Referencial | D1 |
| 3 | `FUR-IOT-D02-CT-0013` | — | `CT-MTR-CRH01` | Transmisor de corriente de motor principal | Corriente del motor | 0–600 A | 4–20 mA / Modbus | Motor chancadora | Referencial | D1 |
| 4 | `FUR-IOT-D02-VT-0014` | — | `VT-CRH-01` | Transmisor de vibración de chancadora | Vibración estructura/cojinete | 0–50 mm/s RMS | 4–20 mA | Chancadora primaria | Referencial | D1 |
| 5 | `FUR-IOT-D02-TT-0015` | — | `TT-BRG-CRH01` | Transmisor de temperatura de rodamiento | Temperatura de cojinete | 0–150 °C | 4–20 mA / RTD | Chancadora primaria | Referencial | D1 |
| 6 | `FUR-IOT-D02-PT-0016` | — | `PT-LUB-CRH01` | Transmisor de presión de lubricación | Presión de aceite | 0–10 bar | 4–20 mA + HART | Skid lubricación | Referencial | D1 |
| 7 | `FUR-IOT-D02-TT-0017` | — | `TT-LUB-CRH01` | Transmisor de temperatura de aceite | Temperatura de aceite | 0–100 °C | 4–20 mA | Skid lubricación | Referencial | D1 |
| 8 | `FUR-IOT-D02-ZT-0018` | — | `ZT-CSS-CRH01` | Sensor de posición / ajuste CSS | Abertura de descarga | 0–200 mm | 4–20 mA / encoder | Chancadora primaria | Referencial | D1 |
| 9 | `FUR-IOT-D02-ST-0019` | — | `ST-CRH-01` | Sensor de velocidad de eje | Velocidad de eje | 0–1,000 rpm | Pulso / encoder | Chancadora primaria | Referencial | D1 |
| 10 | `FUR-IOT-D02-DPT-0020` | — | `DPT-DCL-CRH01` | Transmisor ΔP colector de polvo | ΔP del filtro | 0–2,500 Pa | 4–20 mA | Colector de polvo | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D02 → GW-D02-01 → PLC-D02-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.3 D03 — Cribado

**FUR-PROC padre:** `FUR-PROC-03`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D03-WIT-0021` | — | `WIT-SCR-01` | Báscula de cinta de alimentación a criba | Caudal másico | 0–250 t/h | Modbus TCP | Criba vibratoria | Referencial | D1 |
| 2 | `FUR-IOT-D03-VT-0022` | — | `VT-SCR-01` | Transmisor de vibración de criba | Vibración del cuerpo | 0–50 mm/s RMS | 4–20 mA | Criba vibratoria | Referencial | D1 |
| 3 | `FUR-IOT-D03-TT-0023` | — | `TT-SCR-BRG01` | Transmisor de temperatura de rodamientos | Temperatura de cojinete | 0–120 °C | 4–20 mA / RTD | Criba vibratoria | Referencial | D1 |
| 4 | `FUR-IOT-D03-CT-0024` | — | `CT-MTR-SCR01` | Transmisor de corriente de motor | Corriente de motor | 0–250 A | 4–20 mA / Modbus | Motor criba | Referencial | D1 |
| 5 | `FUR-IOT-D03-FT-0025` | — | `FT-SPR-SCR01` | Caudalímetro de agua de spray | Caudal de lavado | 0–100 m³/h | 4–20 mA + HART | Sprays de lavado | Referencial | D1 |
| 6 | `FUR-IOT-D03-PT-0026` | — | `PT-SPR-SCR01` | Transmisor de presión de spray | Presión de agua | 0–10 bar | 4–20 mA | Manifold de spray | Referencial | D1 |
| 7 | `FUR-IOT-D03-LS-0027` | — | `LS-OVS-01` | Interruptor de nivel alto de chute oversize | Atoro / sobrellenado | Normal / alto | Digital | Chute oversize | Referencial | D1 |
| 8 | `FUR-IOT-D03-LT-0028` | — | `LT-UND-01` | Transmisor de nivel de chute de finos | Nivel de finos | 0–6 m | 4–20 mA | Chute undersize | Referencial | D1 |
| 9 | `FUR-IOT-D03-ST-0029` | — | `ST-CV-SCR01` | Sensor de velocidad de cinta de descarga | Velocidad de banda | 0–3.0 m/s | Pulso | Cinta descarga | Referencial | D1 |
| 10 | `FUR-IOT-D03-DPT-0030` | — | `DPT-DCL-SCR01` | Transmisor ΔP colector de polvo | ΔP del filtro | 0–2,500 Pa | 4–20 mA | Colector de polvo | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D03 → GW-D03-01 → PLC-D03-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.4 D04 — Trituración Secundaria

**FUR-PROC padre:** `FUR-PROC-04`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D04-LT-0031` | — | `LT-SEC-01` | Transmisor de nivel de tolva de chancado secundario | Nivel de alimentación | 0–8 m | 4–20 mA + HART | Tolva chancadora cónica | Referencial | D1 |
| 2 | `FUR-IOT-D04-WIT-0032` | — | `WIT-SEC-01` | Báscula de cinta de alimentación | Caudal de mineral | 0–250 t/h | Modbus TCP | Cinta alimentación | Referencial | D1 |
| 3 | `FUR-IOT-D04-CT-0033` | — | `CT-MTR-CONE01` | Transmisor de corriente de motor de cono | Corriente motor | 0–500 A | 4–20 mA / Modbus | Chancadora cónica | Referencial | D1 |
| 4 | `FUR-IOT-D04-VT-0034` | — | `VT-CONE-01` | Transmisor de vibración de chancadora cónica | Vibración de conjunto | 0–50 mm/s RMS | 4–20 mA | Chancadora cónica | Referencial | D1 |
| 5 | `FUR-IOT-D04-PT-0035` | — | `PT-LUB-CONE01` | Transmisor de presión de lubricación | Presión aceite | 0–10 bar | 4–20 mA + HART | Skid lubricación | Referencial | D1 |
| 6 | `FUR-IOT-D04-TT-0036` | — | `TT-LUB-CONE01` | Transmisor de temperatura de aceite | Temperatura aceite | 0–100 °C | 4–20 mA | Skid lubricación | Referencial | D1 |
| 7 | `FUR-IOT-D04-ZT-0037` | — | `ZT-CSS-CONE01` | Sensor de posición CSS | Abertura de descarga | 0–100 mm | 4–20 mA / encoder | Chancadora cónica | Referencial | D1 |
| 8 | `FUR-IOT-D04-PT-0038` | — | `PT-HYD-CONE01` | Transmisor de presión hidráulica | Presión de ajuste | 0–250 bar | 4–20 mA | Unidad hidráulica | Referencial | D1 |
| 9 | `FUR-IOT-D04-ST-0039` | — | `ST-CONE-01` | Sensor de velocidad de eje | Velocidad de cono | 0–1,500 rpm | Pulso / encoder | Chancadora cónica | Referencial | D1 |
| 10 | `FUR-IOT-D04-DPT-0040` | — | `DPT-DCL-CONE01` | Transmisor ΔP colector de polvo | ΔP filtro | 0–2,500 Pa | 4–20 mA | Colector de polvo | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D04 → GW-D04-01 → PLC-D04-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.5 D05 — Transporte / Silos

**FUR-PROC padre:** `FUR-PROC-05`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D05-WIT-0041` | — | `WIT-CV05-01` | Báscula dinámica de cinta principal | Caudal másico | 0–300 t/h | Modbus TCP | Cinta principal | Referencial | D1 |
| 2 | `FUR-IOT-D05-ST-0042` | — | `ST-CV05-01` | Sensor de velocidad de cinta | Velocidad banda | 0–4.0 m/s | Pulso / 4–20 mA | Cinta principal | Referencial | D1 |
| 3 | `FUR-IOT-D05-ZS-0043` | — | `ZS-MIS-CV05` | Interruptor de desalineamiento | Posición lateral | Normal / alarma / trip | Contacto seco | Cinta principal | Referencial | D1 |
| 4 | `FUR-IOT-D05-RDS-0044` | — | `RDS-CV05-01` | Detector de rasgadura | Integridad banda | Normal / trip | Digital | Cinta principal | Referencial | D1 |
| 5 | `FUR-IOT-D05-LT-0045` | — | `LT-SILO-01` | Transmisor radar de nivel de silo | Nivel de mineral | 0–20 m | 4–20 mA + HART | Silo gruesos | Referencial | D1 |
| 6 | `FUR-IOT-D05-LS-0046` | — | `LSHH-SILO-01` | Interruptor de nivel alto-alto | Protección sobrellenado | Normal / HH | Digital | Silo gruesos | Referencial | D1 |
| 7 | `FUR-IOT-D05-VT-0047` | — | `VT-FDR-05` | Transmisor de vibración de alimentador | Vibración alimentador | 0–50 mm/s RMS | 4–20 mA | Alimentador vibratorio | Referencial | D1 |
| 8 | `FUR-IOT-D05-ST-0048` | — | `ST-FDR-05` | Sensor de velocidad/frecuencia de alimentador | Velocidad relativa | 0–100 % | 4–20 mA | Alimentador vibratorio | Referencial | D1 |
| 9 | `FUR-IOT-D05-TT-0049` | — | `TT-BRG-CV05` | Transmisor de temperatura de cojinete | Temperatura rodamiento | 0–120 °C | 4–20 mA / RTD | Polea motriz | Referencial | D1 |
| 10 | `FUR-IOT-D05-DPT-0050` | — | `DPT-DCL-05` | Transmisor ΔP colector de polvo | ΔP filtro | 0–2,500 Pa | 4–20 mA | Colector de polvo | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D05 → GW-D05-01 → PLC-D05-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.6 D06 — Molienda Primaria

**FUR-PROC padre:** `FUR-PROC-06`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D06-WIT-0051` | — | `WIT-MILL-01` | Báscula de alimentación de molino | Caudal de mineral | 0–500 t/h | Modbus TCP | Alimentación molino | Referencial | D1 |
| 2 | `FUR-IOT-D06-ST-0052` | — | `ST-MILL-01` | Sensor de velocidad de molino | Velocidad de giro | 0–20 rpm | Encoder / pulso | Molino primario | Referencial | D1 |
| 3 | `FUR-IOT-D06-PWR-0053` | — | `PWR-MILL-01` | Medidor de potencia del motor | Potencia activa | 0–5 MW | Modbus TCP | Motor principal | Referencial | D1 |
| 4 | `FUR-IOT-D06-VT-0054` | — | `VT-MILL-01` | Transmisor de vibración de cojinete | Vibración global | 0–25 mm/s RMS | 4–20 mA | Cojinetes molino | Referencial | D1 |
| 5 | `FUR-IOT-D06-TT-0055` | — | `TT-TRN-MILL01` | Transmisor de temperatura de trunnion | Temperatura cojinete | 0–100 °C | 4–20 mA / RTD | Trunnion | Referencial | D1 |
| 6 | `FUR-IOT-D06-PT-0056` | — | `PT-LUB-MILL01` | Transmisor de presión de lubricación | Presión aceite | 0–10 bar | 4–20 mA + HART | Skid lubricación | Referencial | D1 |
| 7 | `FUR-IOT-D06-TT-0057` | — | `TT-LUB-MILL01` | Transmisor de temperatura de aceite | Temperatura aceite | 0–90 °C | 4–20 mA | Skid lubricación | Referencial | D1 |
| 8 | `FUR-IOT-D06-LT-0058` | — | `LT-SUMP-MILL01` | Transmisor de nivel de sump | Nivel de pulpa | 0–5 m | 4–20 mA | Sump molienda | Referencial | D1 |
| 9 | `FUR-IOT-D06-FT-0059` | — | `FT-WTR-MILL01` | Caudalímetro de agua de proceso | Caudal agua | 0–500 m³/h | 4–20 mA + HART | Agua al molino | Referencial | D1 |
| 10 | `FUR-IOT-D06-AST-0060` | — | `AST-MILL-01` | Sensor acústico de carga de molino | Firma acústica / carga | 0–100 % índice | Ethernet / analítica edge | Molino primario | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D06 → GW-D06-01 → PLC-D06-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.7 D07 — Molienda Secundaria

**FUR-PROC padre:** `FUR-PROC-07`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D07-WIT-0061` | — | `WIT-MILL-02` | Báscula de alimentación de molino secundario | Caudal de mineral | 0–400 t/h | Modbus TCP | Alimentación molino | Referencial | D1 |
| 2 | `FUR-IOT-D07-ST-0062` | — | `ST-MILL-02` | Sensor de velocidad de molino | Velocidad de giro | 0–20 rpm | Encoder / pulso | Molino secundario | Referencial | D1 |
| 3 | `FUR-IOT-D07-PWR-0063` | — | `PWR-MILL-02` | Medidor de potencia del motor | Potencia activa | 0–4 MW | Modbus TCP | Motor principal | Referencial | D1 |
| 4 | `FUR-IOT-D07-VT-0064` | — | `VT-MILL-02` | Transmisor de vibración de cojinete | Vibración global | 0–25 mm/s RMS | 4–20 mA | Cojinetes molino | Referencial | D1 |
| 5 | `FUR-IOT-D07-TT-0065` | — | `TT-TRN-MILL02` | Transmisor de temperatura de trunnion | Temperatura cojinete | 0–100 °C | 4–20 mA / RTD | Trunnion | Referencial | D1 |
| 6 | `FUR-IOT-D07-LT-0066` | — | `LT-SUMP-MILL02` | Transmisor de nivel de cajón de bombas | Nivel de pulpa | 0–5 m | 4–20 mA | Cajón bombas | Referencial | D1 |
| 7 | `FUR-IOT-D07-PT-0067` | — | `PT-PMP-MILL02` | Transmisor de presión descarga bomba | Presión de pulpa | 0–10 bar | 4–20 mA + HART | Bomba ciclones | Referencial | D1 |
| 8 | `FUR-IOT-D07-FT-0068` | — | `FT-PMP-MILL02` | Caudalímetro magnético de pulpa | Caudal de pulpa | 0–1,000 m³/h | 4–20 mA + HART | Bomba ciclones | Referencial | D1 |
| 9 | `FUR-IOT-D07-DT-0069` | — | `DT-PMP-MILL02` | Densímetro de pulpa | Densidad de pulpa | 1.0–2.2 SG | 4–20 mA / Modbus | Línea a ciclones | Referencial | D1 |
| 10 | `FUR-IOT-D07-PSA-0070` | — | `PSA-MILL-02` | Analizador online de tamaño de partícula | P80 estimado | 20–300 µm | Ethernet / OPC UA | Descarga clasificación | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D07 → GW-D07-01 → PLC-D07-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.8 D08 — Clasificación

**FUR-PROC padre:** `FUR-PROC-08`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  
**Nota de continuidad:** el primer registro conserva como alias el expediente fuente `FUR-IOT-001045 — Sensor de Presión PT-100`.  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D08-PT-0071` | `FUR-IOT-001045` | `PT-100` | Sensor de Presión PT-100 | Presión de pulpa | 0–10 bar | 4–20 mA + HART | Bomba BP-301 / clasificación | Referencial | D1 |
| 2 | `FUR-IOT-D08-FT-0072` | — | `FT-CYC-01` | Caudalímetro magnético de alimentación a ciclones | Caudal de pulpa | 0–1,000 m³/h | 4–20 mA + HART | Manifold de ciclones | Referencial | D1 |
| 3 | `FUR-IOT-D08-DT-0073` | — | `DT-CYC-01` | Densímetro de pulpa a ciclones | Densidad / % sólidos | 1.0–2.2 SG | 4–20 mA / Modbus | Manifold de ciclones | Referencial | D1 |
| 4 | `FUR-IOT-D08-LT-0074` | — | `LT-SUMP-CYC01` | Transmisor de nivel de sump de ciclones | Nivel de pulpa | 0–6 m | 4–20 mA | Sump ciclones | Referencial | D1 |
| 5 | `FUR-IOT-D08-TT-0075` | — | `TT-PMP-CYC01` | Transmisor de temperatura de bomba | Temperatura rodamiento | 0–120 °C | 4–20 mA / RTD | Bomba de ciclones | Referencial | D1 |
| 6 | `FUR-IOT-D08-VT-0076` | — | `VT-PMP-CYC01` | Transmisor de vibración de bomba | Vibración global | 0–25 mm/s RMS | 4–20 mA | Bomba de ciclones | Referencial | D1 |
| 7 | `FUR-IOT-D08-CT-0077` | — | `CT-PMP-CYC01` | Transmisor de corriente de motor | Corriente bomba | 0–800 A | Modbus TCP | Motor bomba ciclones | Referencial | D1 |
| 8 | `FUR-IOT-D08-PSA-0078` | — | `PSA-CYC-OF01` | Analizador de tamaño de partícula en overflow | P80 del overflow | 20–300 µm | Ethernet / OPC UA | Overflow ciclones | Referencial | D1 |
| 9 | `FUR-IOT-D08-ZT-0079` | — | `ZT-CYC-VLV01` | Sensor de posición de válvula de ciclón | Apertura de válvula | 0–100 % | 4–20 mA / digital | Válvula cuchilla | Referencial | D1 |
| 10 | `FUR-IOT-D08-PT-0080` | — | `PT-CYC-MNF02` | Segundo transmisor de presión de manifold | Presión de alimentación | 0–10 bar | 4–20 mA + HART | Manifold de ciclones | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D08 → GW-D08-01 → PLC-D08-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.9 D09 — Pre-lixiviación

**FUR-PROC padre:** `FUR-PROC-09`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D09-AIT-0081` | — | `AIT-PH-PLX01` | Analizador de pH de pre-lixiviación | pH de pulpa | 8–13 pH | 4–20 mA + digital | Tanque pre-lixiviación | Referencial | D1 |
| 2 | `FUR-IOT-D09-AIT-0082` | — | `AIT-ORP-PLX01` | Analizador ORP | Potencial redox | -500–+500 mV | 4–20 mA | Tanque pre-lixiviación | Referencial | D1 |
| 3 | `FUR-IOT-D09-AIT-0083` | — | `AIT-DO-PLX01` | Analizador de oxígeno disuelto | DO | 0–20 mg/L | 4–20 mA / digital | Tanque pre-lixiviación | Referencial | D1 |
| 4 | `FUR-IOT-D09-LT-0084` | — | `LT-PLX-01` | Transmisor radar de nivel | Nivel de pulpa | 0–10 m | 4–20 mA + HART | Tanque pre-lixiviación | Referencial | D1 |
| 5 | `FUR-IOT-D09-DT-0085` | — | `DT-PLX-01` | Densímetro de pulpa | Densidad | 1.0–2.0 SG | 4–20 mA | Línea de alimentación | Referencial | D1 |
| 6 | `FUR-IOT-D09-FT-0086` | — | `FT-LIME-PLX01` | Caudalímetro de lechada de cal | Caudal de cal | 0–100 m³/h | 4–20 mA + HART | Dosificación de cal | Referencial | D1 |
| 7 | `FUR-IOT-D09-FT-0087` | — | `FT-FEED-PLX01` | Caudalímetro de pulpa de alimentación | Caudal de pulpa | 0–500 m³/h | 4–20 mA + HART | Entrada tanque | Referencial | D1 |
| 8 | `FUR-IOT-D09-TT-0088` | — | `TT-PLX-01` | Transmisor de temperatura | Temperatura de pulpa | 0–80 °C | 4–20 mA | Tanque pre-lixiviación | Referencial | D1 |
| 9 | `FUR-IOT-D09-VT-0089` | — | `VT-AGT-PLX01` | Transmisor de vibración de agitador | Vibración caja/reductor | 0–25 mm/s RMS | 4–20 mA | Agitador | Referencial | D1 |
| 10 | `FUR-IOT-D09-CT-0090` | — | `CT-AGT-PLX01` | Transmisor de corriente de agitador | Corriente motor | 0–400 A | Modbus TCP | Motor agitador | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D09 → GW-D09-01 → PLC-D09-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.10 D10 — Espesamiento

**FUR-PROC padre:** `FUR-PROC-10`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D10-LT-0091` | — | `LT-THK-BED01` | Medidor de nivel de lecho de espesador | Altura de lecho | 0–10 m | Ultrasónico / 4–20 mA | Espesador | Referencial | D1 |
| 2 | `FUR-IOT-D10-TQ-0092` | — | `TQ-RAKE-01` | Transmisor de torque de rastras | Torque de rastras | 0–100 % | 4–20 mA / Modbus | Accionamiento de rastras | Referencial | D1 |
| 3 | `FUR-IOT-D10-DT-0093` | — | `DT-UF-THK01` | Densímetro de underflow | Densidad de pulpa | 1.0–2.0 SG | 4–20 mA / Modbus | Underflow | Referencial | D1 |
| 4 | `FUR-IOT-D10-FT-0094` | — | `FT-UF-THK01` | Caudalímetro magnético de underflow | Caudal de pulpa | 0–500 m³/h | 4–20 mA + HART | Underflow | Referencial | D1 |
| 5 | `FUR-IOT-D10-AIT-0095` | — | `AIT-TURB-OF01` | Turbidímetro de overflow | Turbidez | 0–2,000 NTU | 4–20 mA / digital | Overflow | Referencial | D1 |
| 6 | `FUR-IOT-D10-FT-0096` | — | `FT-FLOC-01` | Caudalímetro de floculante | Caudal floculante | 0–10 m³/h | Coriolis / 4–20 mA | Dosificación floculante | Referencial | D1 |
| 7 | `FUR-IOT-D10-LT-0097` | — | `LT-THK-01` | Transmisor de nivel de tanque | Nivel total | 0–12 m | Radar / 4–20 mA | Espesador | Referencial | D1 |
| 8 | `FUR-IOT-D10-PT-0098` | — | `PT-UF-THK01` | Transmisor de presión de underflow | Presión de línea | 0–10 bar | 4–20 mA + HART | Bomba underflow | Referencial | D1 |
| 9 | `FUR-IOT-D10-VT-0099` | — | `VT-RAKE-01` | Transmisor de vibración de accionamiento | Vibración reductor | 0–25 mm/s RMS | 4–20 mA | Drive rastras | Referencial | D1 |
| 10 | `FUR-IOT-D10-AIT-0100` | — | `AIT-PH-THK01` | Analizador de pH de overflow/underflow | pH | 6–12 pH | 4–20 mA | Espesador | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D10 → GW-D10-01 → PLC-D10-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.11 D11 — Lixiviación / CIL

**FUR-PROC padre:** `FUR-PROC-11`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D11-AIT-0101` | — | `AIT-PH-CIL01` | Analizador de pH CIL | pH de pulpa | 8–14 pH | 4–20 mA + digital | Tanque CIL 01 | Referencial | D1 |
| 2 | `FUR-IOT-D11-AIT-0102` | — | `AIT-DO-CIL01` | Analizador de oxígeno disuelto | DO | 0–20 mg/L | 4–20 mA / digital | Tanque CIL 01 | Referencial | D1 |
| 3 | `FUR-IOT-D11-AIT-0103` | — | `AIT-CN-CIL01` | Analizador de cianuro libre | NaCN libre | 0–1,000 mg/L | Digital / Modbus | Circuito CIL | Referencial | D1 |
| 4 | `FUR-IOT-D11-AIT-0104` | — | `AIT-ORP-CIL01` | Analizador ORP | Potencial redox | -500–+500 mV | 4–20 mA | Tanque CIL | Referencial | D1 |
| 5 | `FUR-IOT-D11-LT-0105` | — | `LT-CIL-01` | Transmisor radar de nivel | Nivel de pulpa | 0–12 m | 4–20 mA + HART | Tanque CIL | Referencial | D1 |
| 6 | `FUR-IOT-D11-DT-0106` | — | `DT-CIL-01` | Densímetro de pulpa | Densidad | 1.0–2.0 SG | 4–20 mA / Modbus | Alimentación CIL | Referencial | D1 |
| 7 | `FUR-IOT-D11-FT-0107` | — | `FT-CIL-FEED01` | Caudalímetro de alimentación CIL | Caudal de pulpa | 0–500 m³/h | 4–20 mA + HART | Entrada CIL | Referencial | D1 |
| 8 | `FUR-IOT-D11-TT-0108` | — | `TT-CIL-01` | Transmisor de temperatura de pulpa | Temperatura | 0–80 °C | 4–20 mA | Tanque CIL | Referencial | D1 |
| 9 | `FUR-IOT-D11-VT-0109` | — | `VT-AGT-CIL01` | Transmisor de vibración de agitador | Vibración reductor | 0–25 mm/s RMS | 4–20 mA | Agitador CIL | Referencial | D1 |
| 10 | `FUR-IOT-D11-CT-0110` | — | `CT-AGT-CIL01` | Transmisor de corriente de agitador | Corriente motor | 0–500 A | Modbus TCP | Motor agitador | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D11 → GW-D11-01 → PLC-D11-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.12 D12 — Adsorción CIP

**FUR-PROC padre:** `FUR-PROC-12`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D12-LT-0111` | — | `LT-CIP-01` | Transmisor radar de nivel CIP | Nivel de pulpa | 0–12 m | 4–20 mA + HART | Tanque CIP | Referencial | D1 |
| 2 | `FUR-IOT-D12-AIT-0112` | — | `AIT-PH-CIP01` | Analizador de pH CIP | pH de pulpa | 8–14 pH | 4–20 mA / digital | Tanque CIP | Referencial | D1 |
| 3 | `FUR-IOT-D12-AIT-0113` | — | `AIT-DO-CIP01` | Analizador de oxígeno disuelto | DO | 0–20 mg/L | 4–20 mA / digital | Tanque CIP | Referencial | D1 |
| 4 | `FUR-IOT-D12-DT-0114` | — | `DT-CIP-01` | Densímetro de pulpa | Densidad | 1.0–2.0 SG | 4–20 mA | Alimentación CIP | Referencial | D1 |
| 5 | `FUR-IOT-D12-FT-0115` | — | `FT-CIP-01` | Caudalímetro de pulpa CIP | Caudal | 0–500 m³/h | 4–20 mA + HART | Transferencia CIP | Referencial | D1 |
| 6 | `FUR-IOT-D12-DPT-0116` | — | `DPT-SCR-CIP01` | Transmisor ΔP de interstage screen | Pérdida de carga | 0–2 bar | 4–20 mA | Interstage screen | Referencial | D1 |
| 7 | `FUR-IOT-D12-AIT-0117` | — | `AIT-CARB-CIP01` | Analizador/estimador de concentración de carbón | Concentración de carbón | 0–50 g/L | Digital / analítica | Tanque CIP | Referencial | D1 |
| 8 | `FUR-IOT-D12-TT-0118` | — | `TT-CIP-01` | Transmisor de temperatura | Temperatura de pulpa | 0–80 °C | 4–20 mA | Tanque CIP | Referencial | D1 |
| 9 | `FUR-IOT-D12-VT-0119` | — | `VT-AGT-CIP01` | Transmisor de vibración de agitador | Vibración | 0–25 mm/s RMS | 4–20 mA | Agitador CIP | Referencial | D1 |
| 10 | `FUR-IOT-D12-FT-0120` | — | `FT-CARB-TR01` | Caudalímetro de transferencia de carbón | Caudal slurry carbón | 0–50 m³/h | 4–20 mA | Transferencia de carbón | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D12 → GW-D12-01 → PLC-D12-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.13 D13 — Manejo de Carbón Cargado

**FUR-PROC padre:** `FUR-PROC-13`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D13-LT-0121` | — | `LT-CARB-01` | Transmisor de nivel de tanque de carbón cargado | Nivel de slurry carbón | 0–5 m | 4–20 mA + HART | Tanque de carbón | Referencial | D1 |
| 2 | `FUR-IOT-D13-FT-0122` | — | `FT-CARB-01` | Caudalímetro de transferencia de carbón | Caudal slurry carbón | 0–50 m³/h | 4–20 mA | Bomba de transferencia | Referencial | D1 |
| 3 | `FUR-IOT-D13-PT-0123` | — | `PT-CARB-PMP01` | Transmisor de presión de bomba de carbón | Presión descarga | 0–10 bar | 4–20 mA + HART | Bomba de carbón | Referencial | D1 |
| 4 | `FUR-IOT-D13-AIT-0124` | — | `AIT-PH-AW01` | Analizador de pH de lavado ácido | pH solución | 0–14 pH | 4–20 mA / digital | Columna lavado ácido | Referencial | D1 |
| 5 | `FUR-IOT-D13-AIT-0125` | — | `AIT-EC-AW01` | Analizador de conductividad | Conductividad de solución | 0–200 mS/cm | 4–20 mA / digital | Lavado ácido | Referencial | D1 |
| 6 | `FUR-IOT-D13-TT-0126` | — | `TT-AW-01` | Transmisor de temperatura de lavado ácido | Temperatura | 0–100 °C | 4–20 mA | Lavado ácido | Referencial | D1 |
| 7 | `FUR-IOT-D13-DPT-0127` | — | `DPT-SCR-CARB01` | Transmisor ΔP de tamiz de carbón | Pérdida de carga | 0–2 bar | 4–20 mA | Tamiz carbón | Referencial | D1 |
| 8 | `FUR-IOT-D13-VT-0128` | — | `VT-PMP-CARB01` | Transmisor de vibración de bomba | Vibración | 0–25 mm/s RMS | 4–20 mA | Bomba transferencia | Referencial | D1 |
| 9 | `FUR-IOT-D13-WT-0129` | — | `WT-CARB-01` | Sistema de pesaje de carbón cargado | Masa de carbón | 0–5 t | Load cells / Modbus | Tolva / bin carbón | Referencial | D1 |
| 10 | `FUR-IOT-D13-LS-0130` | — | `LSHH-CARB-01` | Interruptor de nivel alto-alto | Protección sobrellenado | Normal / HH | Digital | Tanque de carbón | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D13 → GW-D13-01 → PLC-D13-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.14 D14 — Elución / Desorción

**FUR-PROC padre:** `FUR-PROC-14`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D14-PT-0131` | — | `PT-ELU-COL01` | Transmisor de presión de columna de elución | Presión de columna | 0–10 bar | 4–20 mA + HART | Columna elución | Referencial | D1 |
| 2 | `FUR-IOT-D14-TT-0132` | — | `TT-ELU-COL01` | Transmisor de temperatura de eluato | Temperatura de eluato | 0–160 °C | 4–20 mA / RTD | Columna elución | Referencial | D1 |
| 3 | `FUR-IOT-D14-FT-0133` | — | `FT-ELU-01` | Caudalímetro de solución de elución | Caudal de solución | 0–100 m³/h | 4–20 mA + HART | Circuito eluato | Referencial | D1 |
| 4 | `FUR-IOT-D14-AIT-0134` | — | `AIT-EC-ELU01` | Analizador de conductividad de eluato | Conductividad | 0–200 mS/cm | 4–20 mA / digital | Circuito eluato | Referencial | D1 |
| 5 | `FUR-IOT-D14-AIT-0135` | — | `AIT-PH-ELU01` | Analizador de pH de eluato | pH | 0–14 pH | 4–20 mA | Circuito eluato | Referencial | D1 |
| 6 | `FUR-IOT-D14-LT-0136` | — | `LT-ELU-TK01` | Transmisor de nivel de tanque de solución | Nivel | 0–5 m | Radar / 4–20 mA | Tanque solución | Referencial | D1 |
| 7 | `FUR-IOT-D14-TT-0137` | — | `TT-HTR-ELU01` | Transmisor de temperatura de salida de calentador | Temperatura | 0–180 °C | 4–20 mA | Calentador eluato | Referencial | D1 |
| 8 | `FUR-IOT-D14-PT-0138` | — | `PT-HTR-ELU01` | Transmisor de presión del calentador | Presión | 0–15 bar | 4–20 mA | Calentador eluato | Referencial | D1 |
| 9 | `FUR-IOT-D14-DPT-0139` | — | `DPT-COL-ELU01` | Transmisor ΔP de columna | Pérdida de carga | 0–5 bar | 4–20 mA | Columna elución | Referencial | D1 |
| 10 | `FUR-IOT-D14-VT-0140` | — | `VT-PMP-ELU01` | Transmisor de vibración de bomba de recirculación | Vibración | 0–25 mm/s RMS | 4–20 mA | Bomba eluato | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D14 → GW-D14-01 → PLC-D14-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.15 D15 — Electrowinning

**FUR-PROC padre:** `FUR-PROC-15`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D15-AIT-0141` | — | `AIT-I-RECT01` | Transmisor/analizador de corriente DC | Corriente de rectificador | 0–5,000 A DC | Modbus TCP | Rectificador EW | Referencial | D1 |
| 2 | `FUR-IOT-D15-AIT-0142` | — | `AIT-V-RECT01` | Transmisor/analizador de tensión DC | Tensión de celda/bus | 0–10 V DC | Modbus TCP | Rectificador / celdas | Referencial | D1 |
| 3 | `FUR-IOT-D15-TT-0143` | — | `TT-EW-EL01` | Transmisor de temperatura de electrolito | Temperatura electrolito | 0–100 °C | 4–20 mA / RTD | Tanque EW | Referencial | D1 |
| 4 | `FUR-IOT-D15-LT-0144` | — | `LT-EW-TK01` | Transmisor de nivel de tanque EW | Nivel de electrolito | 0–3 m | Radar / 4–20 mA | Tanque EW | Referencial | D1 |
| 5 | `FUR-IOT-D15-FT-0145` | — | `FT-EW-01` | Caudalímetro de recirculación de electrolito | Caudal | 0–100 m³/h | 4–20 mA + HART | Recirculación EW | Referencial | D1 |
| 6 | `FUR-IOT-D15-AIT-0146` | — | `AIT-EC-EW01` | Analizador de conductividad | Conductividad electrolito | 0–200 mS/cm | 4–20 mA / digital | Electrolito | Referencial | D1 |
| 7 | `FUR-IOT-D15-AIT-0147` | — | `AIT-PH-EW01` | Analizador de pH | pH electrolito | 0–14 pH | 4–20 mA | Electrolito | Referencial | D1 |
| 8 | `FUR-IOT-D15-GAS-0148` | — | `GAS-H2-EW01` | Detector de hidrógeno ambiental | Concentración relativa a LEL | 0–100 % LEL | 4–20 mA / digital | Sala EW | Referencial | D1 |
| 9 | `FUR-IOT-D15-TT-0149` | — | `TT-RECT-01` | Transmisor de temperatura de rectificador | Temperatura de potencia | 0–120 °C | Modbus TCP | Rectificador | Referencial | D1 |
| 10 | `FUR-IOT-D15-VT-0150` | — | `VT-PMP-EW01` | Transmisor de vibración de bomba de recirculación | Vibración | 0–25 mm/s RMS | 4–20 mA | Bomba EW | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D15 → GW-D15-01 → PLC-D15-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.16 D16 — Calcinación / Secado

**FUR-PROC padre:** `FUR-PROC-16`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D16-TT-0151` | — | `TT-DRY-IN01` | Transmisor de temperatura de entrada secador | Temperatura gases entrada | 0–600 °C | Termopar / 4–20 mA | Secador | Referencial | D1 |
| 2 | `FUR-IOT-D16-TT-0152` | — | `TT-DRY-OUT01` | Transmisor de temperatura de salida secador | Temperatura gases salida | 0–400 °C | Termopar / 4–20 mA | Secador | Referencial | D1 |
| 3 | `FUR-IOT-D16-TT-0153` | — | `TT-CAL-KILN01` | Pirómetro/termopar de calcinador | Temperatura de proceso | 0–1,200 °C | Termopar / digital | Calcinador | Referencial | D1 |
| 4 | `FUR-IOT-D16-FT-0154` | — | `FT-FUEL-CAL01` | Caudalímetro de combustible | Caudal de gas combustible | 0–500 Nm³/h | 4–20 mA + HART | Quemador | Referencial | D1 |
| 5 | `FUR-IOT-D16-PT-0155` | — | `PT-DRAFT-CAL01` | Transmisor de presión/draft | Tiro del horno | -5–+5 kPa | 4–20 mA | Ducto gases | Referencial | D1 |
| 6 | `FUR-IOT-D16-AIT-0156` | — | `AIT-O2-CAL01` | Analizador de oxígeno en gases | O₂ | 0–25 % vol | 4–20 mA / digital | Chimenea / horno | Referencial | D1 |
| 7 | `FUR-IOT-D16-AIT-0157` | — | `AIT-CO-CAL01` | Analizador de CO | CO gases | 0–2,000 ppm | 4–20 mA / digital | Chimenea | Referencial | D1 |
| 8 | `FUR-IOT-D16-WT-0158` | — | `WT-FEED-CAL01` | Sistema de pesaje de alimentación | Masa de precipitado | 0–5 t | Load cells / Modbus | Tolva de secado | Referencial | D1 |
| 9 | `FUR-IOT-D16-ST-0159` | — | `ST-DRUM-CAL01` | Sensor de velocidad de tambor | Velocidad de rotación | 0–10 rpm | Encoder / pulso | Tambor secador | Referencial | D1 |
| 10 | `FUR-IOT-D16-DPT-0160` | — | `DPT-BAG-CAL01` | Transmisor ΔP de filtro de mangas | ΔP filtro | 0–3,000 Pa | 4–20 mA | Colector de polvo | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D16 → GW-D16-01 → PLC-D16-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.17 D17 — Fundición

**FUR-PROC padre:** `FUR-PROC-17`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D17-TT-0161` | — | `TT-FRN-01` | Pirómetro / termopar de horno de fundición | Temperatura de baño/horno | 0–1,400 °C | Termopar / digital | Horno de fundición | Referencial | D1 |
| 2 | `FUR-IOT-D17-TT-0162` | — | `TT-FLU-FRN01` | Transmisor de temperatura de gases | Temperatura gases | 0–1,200 °C | Termopar / 4–20 mA | Ducto de gases | Referencial | D1 |
| 3 | `FUR-IOT-D17-AIT-0163` | — | `AIT-O2-FRN01` | Analizador de oxígeno en gases | O₂ | 0–25 % vol | 4–20 mA / digital | Chimenea | Referencial | D1 |
| 4 | `FUR-IOT-D17-AIT-0164` | — | `AIT-CO-FRN01` | Analizador de monóxido de carbono | CO | 0–5,000 ppm | 4–20 mA / digital | Área de fundición | Referencial | D1 |
| 5 | `FUR-IOT-D17-FT-0165` | — | `FT-FUEL-FRN01` | Caudalímetro de combustible del horno | Caudal de combustible | 0–500 Nm³/h | 4–20 mA + HART | Quemador horno | Referencial | D1 |
| 6 | `FUR-IOT-D17-PT-0166` | — | `PT-DRAFT-FRN01` | Transmisor de presión del horno | Presión / draft | -5–+5 kPa | 4–20 mA | Horno | Referencial | D1 |
| 7 | `FUR-IOT-D17-FT-0167` | — | `FT-CW-FRN01` | Caudalímetro de agua de enfriamiento | Caudal agua | 0–200 m³/h | 4–20 mA | Circuito enfriamiento | Referencial | D1 |
| 8 | `FUR-IOT-D17-TT-0168` | — | `TT-CW-FRN01` | Transmisor temperatura agua de retorno | Temperatura retorno | 0–100 °C | 4–20 mA / RTD | Circuito enfriamiento | Referencial | D1 |
| 9 | `FUR-IOT-D17-WT-0169` | — | `WT-CRU-FRN01` | Celda de carga de crisol / lote | Masa de carga | 0–1,000 kg | Load cell / Modbus | Crisol / mesa de moldeo | Referencial | D1 |
| 10 | `FUR-IOT-D17-DPT-0170` | — | `DPT-BAG-FRN01` | Transmisor ΔP colector de humos | ΔP filtro | 0–3,000 Pa | 4–20 mA | Colector de humos | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D17 → GW-D17-01 → PLC-D17-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

## 7.18 D18 — Producto Final / Reactivación / Colas

**FUR-PROC padre:** `FUR-PROC-18`  
**Cantidad:** 10 FUR-IOT referenciales  
**Condición:** Referencial  
**Madurez inicial:** D1  

| # | Código FUR-IOT de catálogo | Alias / fuente | TAG referencial | Activo IoT / Instrumento | Variable / función | Rango o valor numérico referencial | Señal / protocolo | Activo / sistema relacionado | Cond. | Mad. |
|---:|---|---|---|---|---|---|---|---|---|---|
| 1 | `FUR-IOT-D18-WT-0171` | — | `WT-DORE-01` | Balanza de producto doré | Masa de barra doré | 0–100 kg | Load cell / Ethernet | Área producto final | Referencial | D1 |
| 2 | `FUR-IOT-D18-RFID-0172` | — | `RFID-DORE-01` | Lector RFID/NFC de custodia de doré | Identidad / evento de custodia | Lectura UID | Ethernet / MQTT | Custodia de doré | Referencial | D1 |
| 3 | `FUR-IOT-D18-TT-0173` | — | `TT-VAULT-01` | Sensor de temperatura de bóveda | Temperatura ambiente | 0–50 °C | 4–20 mA / Modbus | Bóveda | Referencial | D1 |
| 4 | `FUR-IOT-D18-HT-0174` | — | `HT-VAULT-01` | Sensor de humedad de bóveda | Humedad relativa | 0–100 %RH | 4–20 mA / Modbus | Bóveda | Referencial | D1 |
| 5 | `FUR-IOT-D18-TT-0175` | — | `TT-REGEN-01` | Pirómetro de horno de reactivación de carbón | Temperatura de reactivación | 0–1,000 °C | Termopar / digital | Horno reactivación | Referencial | D1 |
| 6 | `FUR-IOT-D18-AIT-0176` | — | `AIT-O2-REGEN01` | Analizador O₂ de horno de reactivación | Oxígeno en gases | 0–25 % vol | 4–20 mA / digital | Horno reactivación | Referencial | D1 |
| 7 | `FUR-IOT-D18-FT-0177` | — | `FT-TAIL-01` | Caudalímetro de relaves | Caudal de relaves | 0–1,000 m³/h | 4–20 mA + HART | Línea relaves | Referencial | D1 |
| 8 | `FUR-IOT-D18-DT-0178` | — | `DT-TAIL-01` | Densímetro de relaves | Densidad de pulpa | 1.0–2.2 SG | 4–20 mA / Modbus | Línea relaves | Referencial | D1 |
| 9 | `FUR-IOT-D18-AIT-0179` | — | `AIT-PH-TAIL01` | Analizador de pH de relaves | pH | 6–12 pH | 4–20 mA / digital | Línea relaves | Referencial | D1 |
| 10 | `FUR-IOT-D18-LT-0180` | — | `LT-TAIL-POND01` | Transmisor radar de nivel de depósito/poza | Nivel de agua/relaves | 0–20 m | Radar / 4–20 mA | Poza / depósito de relaves | Referencial | D1 |

**Cadena OT sugerida para catálogo:** `Instrumentos D18 → GW-D18-01 → PLC-D18-01 → SCADA/Historian → FUR-IOT/Odoo → Dashboard`. Identificadores de gateway/PLC/SCADA: **TBC**.

---

# 8. ÍNDICE MAESTRO DE LAS 180 FUR-IOT

| Nº global | Etapa | FUR-PROC padre | Código FUR-IOT | TAG | Activo |
|---:|---|---|---|---|---|
| 1 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-LT-0001` | `LT-ROM-01` | Transmisor de nivel radar de tolva ROM |
| 2 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-WT-0002` | `WT-ROM-01` | Sistema de pesaje / báscula camionera |
| 3 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-WIT-0003` | `WIT-CV01` | Báscula dinámica de cinta |
| 4 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-ST-0004` | `ST-CV01` | Sensor de velocidad de cinta |
| 5 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-MDT-0005` | `MDT-CV01` | Detector de metal tramp |
| 6 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-ZS-0006` | `ZS-MIS-01` | Interruptor de desalineamiento de banda |
| 7 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-RDS-0007` | `RDS-CV01` | Detector de rasgadura de cinta |
| 8 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-VT-0008` | `VT-BRG-01` | Transmisor de vibración de rodamiento |
| 9 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-TT-0009` | `TT-BRG-01` | Transmisor de temperatura de rodamiento |
| 10 | D01 — Recepción y Alimentación | `FUR-PROC-01` | `FUR-IOT-D01-DPT-0010` | `DPT-DCL-01` | Transmisor de presión diferencial de colector |
| 11 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-LT-0011` | `LT-CRH-01` | Transmisor de nivel de tolva de chancadora |
| 12 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-WIT-0012` | `WIT-CRH-01` | Báscula de cinta de alimentación |
| 13 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-CT-0013` | `CT-MTR-CRH01` | Transmisor de corriente de motor principal |
| 14 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-VT-0014` | `VT-CRH-01` | Transmisor de vibración de chancadora |
| 15 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-TT-0015` | `TT-BRG-CRH01` | Transmisor de temperatura de rodamiento |
| 16 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-PT-0016` | `PT-LUB-CRH01` | Transmisor de presión de lubricación |
| 17 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-TT-0017` | `TT-LUB-CRH01` | Transmisor de temperatura de aceite |
| 18 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-ZT-0018` | `ZT-CSS-CRH01` | Sensor de posición / ajuste CSS |
| 19 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-ST-0019` | `ST-CRH-01` | Sensor de velocidad de eje |
| 20 | D02 — Trituración Primaria | `FUR-PROC-02` | `FUR-IOT-D02-DPT-0020` | `DPT-DCL-CRH01` | Transmisor ΔP colector de polvo |
| 21 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-WIT-0021` | `WIT-SCR-01` | Báscula de cinta de alimentación a criba |
| 22 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-VT-0022` | `VT-SCR-01` | Transmisor de vibración de criba |
| 23 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-TT-0023` | `TT-SCR-BRG01` | Transmisor de temperatura de rodamientos |
| 24 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-CT-0024` | `CT-MTR-SCR01` | Transmisor de corriente de motor |
| 25 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-FT-0025` | `FT-SPR-SCR01` | Caudalímetro de agua de spray |
| 26 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-PT-0026` | `PT-SPR-SCR01` | Transmisor de presión de spray |
| 27 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-LS-0027` | `LS-OVS-01` | Interruptor de nivel alto de chute oversize |
| 28 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-LT-0028` | `LT-UND-01` | Transmisor de nivel de chute de finos |
| 29 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-ST-0029` | `ST-CV-SCR01` | Sensor de velocidad de cinta de descarga |
| 30 | D03 — Cribado | `FUR-PROC-03` | `FUR-IOT-D03-DPT-0030` | `DPT-DCL-SCR01` | Transmisor ΔP colector de polvo |
| 31 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-LT-0031` | `LT-SEC-01` | Transmisor de nivel de tolva de chancado secundario |
| 32 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-WIT-0032` | `WIT-SEC-01` | Báscula de cinta de alimentación |
| 33 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-CT-0033` | `CT-MTR-CONE01` | Transmisor de corriente de motor de cono |
| 34 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-VT-0034` | `VT-CONE-01` | Transmisor de vibración de chancadora cónica |
| 35 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-PT-0035` | `PT-LUB-CONE01` | Transmisor de presión de lubricación |
| 36 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-TT-0036` | `TT-LUB-CONE01` | Transmisor de temperatura de aceite |
| 37 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-ZT-0037` | `ZT-CSS-CONE01` | Sensor de posición CSS |
| 38 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-PT-0038` | `PT-HYD-CONE01` | Transmisor de presión hidráulica |
| 39 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-ST-0039` | `ST-CONE-01` | Sensor de velocidad de eje |
| 40 | D04 — Trituración Secundaria | `FUR-PROC-04` | `FUR-IOT-D04-DPT-0040` | `DPT-DCL-CONE01` | Transmisor ΔP colector de polvo |
| 41 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-WIT-0041` | `WIT-CV05-01` | Báscula dinámica de cinta principal |
| 42 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-ST-0042` | `ST-CV05-01` | Sensor de velocidad de cinta |
| 43 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-ZS-0043` | `ZS-MIS-CV05` | Interruptor de desalineamiento |
| 44 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-RDS-0044` | `RDS-CV05-01` | Detector de rasgadura |
| 45 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-LT-0045` | `LT-SILO-01` | Transmisor radar de nivel de silo |
| 46 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-LS-0046` | `LSHH-SILO-01` | Interruptor de nivel alto-alto |
| 47 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-VT-0047` | `VT-FDR-05` | Transmisor de vibración de alimentador |
| 48 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-ST-0048` | `ST-FDR-05` | Sensor de velocidad/frecuencia de alimentador |
| 49 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-TT-0049` | `TT-BRG-CV05` | Transmisor de temperatura de cojinete |
| 50 | D05 — Transporte / Silos | `FUR-PROC-05` | `FUR-IOT-D05-DPT-0050` | `DPT-DCL-05` | Transmisor ΔP colector de polvo |
| 51 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-WIT-0051` | `WIT-MILL-01` | Báscula de alimentación de molino |
| 52 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-ST-0052` | `ST-MILL-01` | Sensor de velocidad de molino |
| 53 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-PWR-0053` | `PWR-MILL-01` | Medidor de potencia del motor |
| 54 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-VT-0054` | `VT-MILL-01` | Transmisor de vibración de cojinete |
| 55 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-TT-0055` | `TT-TRN-MILL01` | Transmisor de temperatura de trunnion |
| 56 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-PT-0056` | `PT-LUB-MILL01` | Transmisor de presión de lubricación |
| 57 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-TT-0057` | `TT-LUB-MILL01` | Transmisor de temperatura de aceite |
| 58 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-LT-0058` | `LT-SUMP-MILL01` | Transmisor de nivel de sump |
| 59 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-FT-0059` | `FT-WTR-MILL01` | Caudalímetro de agua de proceso |
| 60 | D06 — Molienda Primaria | `FUR-PROC-06` | `FUR-IOT-D06-AST-0060` | `AST-MILL-01` | Sensor acústico de carga de molino |
| 61 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-WIT-0061` | `WIT-MILL-02` | Báscula de alimentación de molino secundario |
| 62 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-ST-0062` | `ST-MILL-02` | Sensor de velocidad de molino |
| 63 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-PWR-0063` | `PWR-MILL-02` | Medidor de potencia del motor |
| 64 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-VT-0064` | `VT-MILL-02` | Transmisor de vibración de cojinete |
| 65 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-TT-0065` | `TT-TRN-MILL02` | Transmisor de temperatura de trunnion |
| 66 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-LT-0066` | `LT-SUMP-MILL02` | Transmisor de nivel de cajón de bombas |
| 67 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-PT-0067` | `PT-PMP-MILL02` | Transmisor de presión descarga bomba |
| 68 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-FT-0068` | `FT-PMP-MILL02` | Caudalímetro magnético de pulpa |
| 69 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-DT-0069` | `DT-PMP-MILL02` | Densímetro de pulpa |
| 70 | D07 — Molienda Secundaria | `FUR-PROC-07` | `FUR-IOT-D07-PSA-0070` | `PSA-MILL-02` | Analizador online de tamaño de partícula |
| 71 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-PT-0071` | `PT-100` | Sensor de Presión PT-100 |
| 72 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-FT-0072` | `FT-CYC-01` | Caudalímetro magnético de alimentación a ciclones |
| 73 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-DT-0073` | `DT-CYC-01` | Densímetro de pulpa a ciclones |
| 74 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-LT-0074` | `LT-SUMP-CYC01` | Transmisor de nivel de sump de ciclones |
| 75 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-TT-0075` | `TT-PMP-CYC01` | Transmisor de temperatura de bomba |
| 76 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-VT-0076` | `VT-PMP-CYC01` | Transmisor de vibración de bomba |
| 77 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-CT-0077` | `CT-PMP-CYC01` | Transmisor de corriente de motor |
| 78 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-PSA-0078` | `PSA-CYC-OF01` | Analizador de tamaño de partícula en overflow |
| 79 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-ZT-0079` | `ZT-CYC-VLV01` | Sensor de posición de válvula de ciclón |
| 80 | D08 — Clasificación | `FUR-PROC-08` | `FUR-IOT-D08-PT-0080` | `PT-CYC-MNF02` | Segundo transmisor de presión de manifold |
| 81 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-AIT-0081` | `AIT-PH-PLX01` | Analizador de pH de pre-lixiviación |
| 82 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-AIT-0082` | `AIT-ORP-PLX01` | Analizador ORP |
| 83 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-AIT-0083` | `AIT-DO-PLX01` | Analizador de oxígeno disuelto |
| 84 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-LT-0084` | `LT-PLX-01` | Transmisor radar de nivel |
| 85 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-DT-0085` | `DT-PLX-01` | Densímetro de pulpa |
| 86 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-FT-0086` | `FT-LIME-PLX01` | Caudalímetro de lechada de cal |
| 87 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-FT-0087` | `FT-FEED-PLX01` | Caudalímetro de pulpa de alimentación |
| 88 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-TT-0088` | `TT-PLX-01` | Transmisor de temperatura |
| 89 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-VT-0089` | `VT-AGT-PLX01` | Transmisor de vibración de agitador |
| 90 | D09 — Pre-lixiviación | `FUR-PROC-09` | `FUR-IOT-D09-CT-0090` | `CT-AGT-PLX01` | Transmisor de corriente de agitador |
| 91 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-LT-0091` | `LT-THK-BED01` | Medidor de nivel de lecho de espesador |
| 92 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-TQ-0092` | `TQ-RAKE-01` | Transmisor de torque de rastras |
| 93 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-DT-0093` | `DT-UF-THK01` | Densímetro de underflow |
| 94 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-FT-0094` | `FT-UF-THK01` | Caudalímetro magnético de underflow |
| 95 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-AIT-0095` | `AIT-TURB-OF01` | Turbidímetro de overflow |
| 96 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-FT-0096` | `FT-FLOC-01` | Caudalímetro de floculante |
| 97 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-LT-0097` | `LT-THK-01` | Transmisor de nivel de tanque |
| 98 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-PT-0098` | `PT-UF-THK01` | Transmisor de presión de underflow |
| 99 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-VT-0099` | `VT-RAKE-01` | Transmisor de vibración de accionamiento |
| 100 | D10 — Espesamiento | `FUR-PROC-10` | `FUR-IOT-D10-AIT-0100` | `AIT-PH-THK01` | Analizador de pH de overflow/underflow |
| 101 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-AIT-0101` | `AIT-PH-CIL01` | Analizador de pH CIL |
| 102 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-AIT-0102` | `AIT-DO-CIL01` | Analizador de oxígeno disuelto |
| 103 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-AIT-0103` | `AIT-CN-CIL01` | Analizador de cianuro libre |
| 104 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-AIT-0104` | `AIT-ORP-CIL01` | Analizador ORP |
| 105 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-LT-0105` | `LT-CIL-01` | Transmisor radar de nivel |
| 106 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-DT-0106` | `DT-CIL-01` | Densímetro de pulpa |
| 107 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-FT-0107` | `FT-CIL-FEED01` | Caudalímetro de alimentación CIL |
| 108 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-TT-0108` | `TT-CIL-01` | Transmisor de temperatura de pulpa |
| 109 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-VT-0109` | `VT-AGT-CIL01` | Transmisor de vibración de agitador |
| 110 | D11 — Lixiviación / CIL | `FUR-PROC-11` | `FUR-IOT-D11-CT-0110` | `CT-AGT-CIL01` | Transmisor de corriente de agitador |
| 111 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-LT-0111` | `LT-CIP-01` | Transmisor radar de nivel CIP |
| 112 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-AIT-0112` | `AIT-PH-CIP01` | Analizador de pH CIP |
| 113 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-AIT-0113` | `AIT-DO-CIP01` | Analizador de oxígeno disuelto |
| 114 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-DT-0114` | `DT-CIP-01` | Densímetro de pulpa |
| 115 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-FT-0115` | `FT-CIP-01` | Caudalímetro de pulpa CIP |
| 116 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-DPT-0116` | `DPT-SCR-CIP01` | Transmisor ΔP de interstage screen |
| 117 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-AIT-0117` | `AIT-CARB-CIP01` | Analizador/estimador de concentración de carbón |
| 118 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-TT-0118` | `TT-CIP-01` | Transmisor de temperatura |
| 119 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-VT-0119` | `VT-AGT-CIP01` | Transmisor de vibración de agitador |
| 120 | D12 — Adsorción CIP | `FUR-PROC-12` | `FUR-IOT-D12-FT-0120` | `FT-CARB-TR01` | Caudalímetro de transferencia de carbón |
| 121 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-LT-0121` | `LT-CARB-01` | Transmisor de nivel de tanque de carbón cargado |
| 122 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-FT-0122` | `FT-CARB-01` | Caudalímetro de transferencia de carbón |
| 123 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-PT-0123` | `PT-CARB-PMP01` | Transmisor de presión de bomba de carbón |
| 124 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-AIT-0124` | `AIT-PH-AW01` | Analizador de pH de lavado ácido |
| 125 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-AIT-0125` | `AIT-EC-AW01` | Analizador de conductividad |
| 126 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-TT-0126` | `TT-AW-01` | Transmisor de temperatura de lavado ácido |
| 127 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-DPT-0127` | `DPT-SCR-CARB01` | Transmisor ΔP de tamiz de carbón |
| 128 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-VT-0128` | `VT-PMP-CARB01` | Transmisor de vibración de bomba |
| 129 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-WT-0129` | `WT-CARB-01` | Sistema de pesaje de carbón cargado |
| 130 | D13 — Manejo de Carbón Cargado | `FUR-PROC-13` | `FUR-IOT-D13-LS-0130` | `LSHH-CARB-01` | Interruptor de nivel alto-alto |
| 131 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-PT-0131` | `PT-ELU-COL01` | Transmisor de presión de columna de elución |
| 132 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-TT-0132` | `TT-ELU-COL01` | Transmisor de temperatura de eluato |
| 133 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-FT-0133` | `FT-ELU-01` | Caudalímetro de solución de elución |
| 134 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-AIT-0134` | `AIT-EC-ELU01` | Analizador de conductividad de eluato |
| 135 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-AIT-0135` | `AIT-PH-ELU01` | Analizador de pH de eluato |
| 136 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-LT-0136` | `LT-ELU-TK01` | Transmisor de nivel de tanque de solución |
| 137 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-TT-0137` | `TT-HTR-ELU01` | Transmisor de temperatura de salida de calentador |
| 138 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-PT-0138` | `PT-HTR-ELU01` | Transmisor de presión del calentador |
| 139 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-DPT-0139` | `DPT-COL-ELU01` | Transmisor ΔP de columna |
| 140 | D14 — Elución / Desorción | `FUR-PROC-14` | `FUR-IOT-D14-VT-0140` | `VT-PMP-ELU01` | Transmisor de vibración de bomba de recirculación |
| 141 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-AIT-0141` | `AIT-I-RECT01` | Transmisor/analizador de corriente DC |
| 142 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-AIT-0142` | `AIT-V-RECT01` | Transmisor/analizador de tensión DC |
| 143 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-TT-0143` | `TT-EW-EL01` | Transmisor de temperatura de electrolito |
| 144 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-LT-0144` | `LT-EW-TK01` | Transmisor de nivel de tanque EW |
| 145 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-FT-0145` | `FT-EW-01` | Caudalímetro de recirculación de electrolito |
| 146 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-AIT-0146` | `AIT-EC-EW01` | Analizador de conductividad |
| 147 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-AIT-0147` | `AIT-PH-EW01` | Analizador de pH |
| 148 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-GAS-0148` | `GAS-H2-EW01` | Detector de hidrógeno ambiental |
| 149 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-TT-0149` | `TT-RECT-01` | Transmisor de temperatura de rectificador |
| 150 | D15 — Electrowinning | `FUR-PROC-15` | `FUR-IOT-D15-VT-0150` | `VT-PMP-EW01` | Transmisor de vibración de bomba de recirculación |
| 151 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-TT-0151` | `TT-DRY-IN01` | Transmisor de temperatura de entrada secador |
| 152 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-TT-0152` | `TT-DRY-OUT01` | Transmisor de temperatura de salida secador |
| 153 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-TT-0153` | `TT-CAL-KILN01` | Pirómetro/termopar de calcinador |
| 154 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-FT-0154` | `FT-FUEL-CAL01` | Caudalímetro de combustible |
| 155 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-PT-0155` | `PT-DRAFT-CAL01` | Transmisor de presión/draft |
| 156 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-AIT-0156` | `AIT-O2-CAL01` | Analizador de oxígeno en gases |
| 157 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-AIT-0157` | `AIT-CO-CAL01` | Analizador de CO |
| 158 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-WT-0158` | `WT-FEED-CAL01` | Sistema de pesaje de alimentación |
| 159 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-ST-0159` | `ST-DRUM-CAL01` | Sensor de velocidad de tambor |
| 160 | D16 — Calcinación / Secado | `FUR-PROC-16` | `FUR-IOT-D16-DPT-0160` | `DPT-BAG-CAL01` | Transmisor ΔP de filtro de mangas |
| 161 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-TT-0161` | `TT-FRN-01` | Pirómetro / termopar de horno de fundición |
| 162 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-TT-0162` | `TT-FLU-FRN01` | Transmisor de temperatura de gases |
| 163 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-AIT-0163` | `AIT-O2-FRN01` | Analizador de oxígeno en gases |
| 164 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-AIT-0164` | `AIT-CO-FRN01` | Analizador de monóxido de carbono |
| 165 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-FT-0165` | `FT-FUEL-FRN01` | Caudalímetro de combustible del horno |
| 166 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-PT-0166` | `PT-DRAFT-FRN01` | Transmisor de presión del horno |
| 167 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-FT-0167` | `FT-CW-FRN01` | Caudalímetro de agua de enfriamiento |
| 168 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-TT-0168` | `TT-CW-FRN01` | Transmisor temperatura agua de retorno |
| 169 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-WT-0169` | `WT-CRU-FRN01` | Celda de carga de crisol / lote |
| 170 | D17 — Fundición | `FUR-PROC-17` | `FUR-IOT-D17-DPT-0170` | `DPT-BAG-FRN01` | Transmisor ΔP colector de humos |
| 171 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-WT-0171` | `WT-DORE-01` | Balanza de producto doré |
| 172 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-RFID-0172` | `RFID-DORE-01` | Lector RFID/NFC de custodia de doré |
| 173 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-TT-0173` | `TT-VAULT-01` | Sensor de temperatura de bóveda |
| 174 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-HT-0174` | `HT-VAULT-01` | Sensor de humedad de bóveda |
| 175 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-TT-0175` | `TT-REGEN-01` | Pirómetro de horno de reactivación de carbón |
| 176 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-AIT-0176` | `AIT-O2-REGEN01` | Analizador O₂ de horno de reactivación |
| 177 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-FT-0177` | `FT-TAIL-01` | Caudalímetro de relaves |
| 178 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-DT-0178` | `DT-TAIL-01` | Densímetro de relaves |
| 179 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-AIT-0179` | `AIT-PH-TAIL01` | Analizador de pH de relaves |
| 180 | D18 — Producto Final / Reactivación / Colas | `FUR-PROC-18` | `FUR-IOT-D18-LT-0180` | `LT-TAIL-POND01` | Transmisor radar de nivel de depósito/poza |

---

# 9. ARQUITECTURA FUNCIONAL DEL CATÁLOGO FUR-IOT

```text
FUR-PROC / ACTIVO DE PROCESO
          │
          ▼
   FUR-IOT / Instrumento
          │
          ├── Variable / Rango / Unidad
          ├── Señal / Protocolo / Tag / Lazo
          ├── Calibración / Metrología
          ├── Alarmas / Interlocks
          ├── Gateway / PLC / SCADA
          ├── Historian (referencia, no duplicación de series)
          ├── GPON / Comunicaciones
          ├── Mantenimiento / OT
          ├── Documentos / Certificados
          └── Odoo 19 / FUR / Dashboard
```

Regla de autoridad: **las series temporales permanecen en SCADA/Historian**; FUR conserva identidad, metadatos, relaciones, calidad, contexto y trazabilidad.

---

# 10. MODELO DE DATOS RECOMENDADO

## 10.1 Modelos / tablas nativas Odoo 19 reutilizables

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
|---|---|---|
| `product.template` | `product_template` | Identidad catalogable / nombre / categoría |
| `product.product` | `product_product` | Variante o instancia catalogable cuando aplique |
| `product.category` | `product_category` | Familia / clase |
| `uom.uom` | `uom_uom` | Unidades de medida |
| `res.partner` | `res_partner` | Fabricante / proveedor |
| `res.currency` | `res_currency` | Moneda |
| `stock.location` | `stock_location` | Ubicación ERP / logística |
| `stock.lot` | `stock_lot` | Número de serie |
| `maintenance.equipment` | `maintenance_equipment` | Equipo mantenible |
| `maintenance.request` | `maintenance_request` | OT / solicitud de mantenimiento |
| `product.supplierinfo` | `product_supplierinfo` | Proveedor / precio catálogo |
| `purchase.order` | `purchase_order` | Orden de compra |
| `purchase.order.line` | `purchase_order_line` | Líneas de compra |
| `ir.attachment` | `ir_attachment` | Datasheet, P&ID, Loop, calibración, manual, foto |
| `res.users` | `res_users` | Responsables / aprobadores |
| `hr.employee` | `hr_employee` | Personal relacionado |
| `mail.message` | `mail_message` | Trazabilidad / chatter |
| `mail.activity` | `mail_activity` | Seguimiento |

> Los nombres físicos deben verificarse contra la instancia Odoo 19 instalada; el ORM es la capa contractual recomendada para escritura transaccional.

## 10.2 Tablas comunes propias FUR

| Tabla | Responsabilidad |
|---|---|
| `fur_record` | Identidad maestra FUR |
| `fur_relation` | Relaciones transversales |
| `fur_document_link` | Vínculo documental a Odoo/ir.attachment |
| `fur_audit_event` | Auditoría de cambios |
| `fur_data_quality` | Condición y madurez por campo |
| `fur_status_history` | Historial de estado |
| `fur_lifecycle_event` | Eventos de ciclo de vida |
| `fur_responsibility` | Propietario / custodio / técnico |
| `fur_search_alias` | Tags, sinónimos y códigos externos |
| `fur_external_reference` | Referencias a PLC/SCADA/Historian/NMS |

## 10.3 Tablas especializadas FUR-IOT

| Tabla | Propósito |
|---|---|
| `fur_iot_nameplate` | Placa y datos nominales |
| `fur_iot_variable` | Variable y unidad |
| `fur_iot_range` | Rango, span y límites |
| `fur_iot_tag` | Tag, lazo y punto de medición |
| `fur_iot_calibration` | Calibración y certificados |
| `fur_iot_connectivity` | Gateway, protocolo, red y estado |
| `fur_iot_alarm` | Alarmas, prioridad y límites |
| `fur_iot_scada_mapping` | PLC, canal, tag SCADA y pantalla |
| `fur_iot_historian_ref` | Referencia a Historian; no series temporales |
| `fur_iot_cyber_profile` | Firmware, checksum y criticidad OT |
| `fur_iot_asset_rel` | Instrumento ↔ proceso ↔ activo físico |
| `fur_iot_data_quality` | Calidad contextual de medición |

---

# 11. CAMPOS MÍNIMOS DE CADA FUR-IOT

Cada registro del catálogo debería poder almacenar o relacionar como mínimo: código FUR; UUID; TAG; etapa; FUR-PROC padre; área; sistema; activo relacionado; familia; variable; unidad; rango; precisión; señal; protocolo; alimentación; gateway; PLC/RTU/RIO; canal; tag SCADA; Historian; estado online/offline; frecuencia de muestreo; alarmas; última calibración; certificado; firmware; checksum; IP/VLAN cuando aplique; fabricante; modelo; serie; proveedor; documentos; criticidad; estado; condición del dato; madurez D0–D5; TBC/HOLD; responsable; auditoría.

---

# 12. FILTROS RECOMENDADOS PARA EL CATÁLOGO WEB

Filtros principales: código FUR; TAG; etapa D01–D18; FUR-PROC padre; área; familia de instrumento; variable; unidad; rango; señal; protocolo; fabricante; estado; condición; madurez; criticidad; calibración vencida/próxima; gateway; PLC; SCADA; Historian; conectividad; mantenimiento pendiente; documentos faltantes; TBC/HOLD; relaciones FUR.

KPIs sugeridos: 180 FUR planificadas; % por madurez; % con TAG validado; % con loop diagram; % con calibración vigente; % online; % con PLC/SCADA mapeado; % con historian; % con firmware/checksum; % con TBC/HOLD; instrumentos críticos; alarmas por prioridad; instrumentos por familia y etapa.

---

# 13. 10 COMPONENTES FUNCIONALES REUTILIZABLES PARA REACT.JS — SIN CÓDIGO

| # | Componente funcional | Pseudocódigo conceptual |
|---:|---|---|
| 1 | Cabecera FUR-IOT | Cargar identidad → estado → versión → madurez → criticidad → mostrar QR/acciones |
| 2 | Jerarquía y ubicación | Resolver planta → área → etapa → sistema → activo → mapa |
| 3 | Variable / rango / unidad | Cargar variable → unidad → rango → precisión → límites → condición |
| 4 | Tag / señal / lazo | Resolver TAG → lazo → tipo de señal → canal → validar unicidad |
| 5 | Conectividad OT | Cargar protocolo → gateway → IP/VLAN → estado → cibercriticidad |
| 6 | PLC / SCADA | Resolver PLC/RTU → canal → tag SCADA → alarmas/interlocks |
| 7 | Historian / tendencias | Resolver referencia Historian → tag → calidad → abrir tendencia sin duplicar serie |
| 8 | Calibración / metrología | Cargar última calibración → certificado → vencimiento → OT → pendiente |
| 9 | Relaciones transversales | Relacionar FUR-PROC/PTE/GPON/MNT/CC/LAB/RQ/OF/CAM → mostrar grafo |
| 10 | Calidad / TBC / auditoría | Evaluar D0–D5 → TBC/HOLD → evidencia → registrar auditoría → bloquear promoción si falta soporte |

---

# 14. PSEUDOCÓDIGO MAESTRO DEL CATÁLOGO

```text
INICIAR CATÁLOGO FUR-IOT
1. SELECCIONAR etapa D01..D18
2. CARGAR exactamente 10 FUR-IOT de la etapa
3. VALIDAR código FUR único y TAG no ambiguo
4. RELACIONAR cada FUR-IOT con FUR-PROC padre y activo físico
5. CARGAR variable, unidad, rango, señal y protocolo
6. RESOLVER gateway, PLC/SCADA e Historian por referencias controladas
7. NO COPIAR series temporales a Odoo/FUR
8. CARGAR calibración, documentos, fabricante, modelo y serie cuando existan
9. ASIGNAR condición y madurez por campo
10. IDENTIFICAR TBC/HOLD
11. REGISTRAR auditoría
12. MOSTRAR filtros, KPI, relaciones y acciones contextuales
FINALIZAR
```

---

# 15. REGLAS DE DISEÑO Y GOBIERNO DEL DATO

1. Una FUR-IOT debe tener un código único y un UUID único.
2. El TAG de instrumento debe reconciliarse con Instrument Index / I/O List / P&ID.
3. No duplicar maestros nativos de Odoo; referenciarlos.
4. No almacenar series temporales en `fur_record`, `product.template` ni campos de texto; usar SCADA/Historian como autoridad.
5. Conservar timestamp, calidad y sistema fuente en referencias de medición.
6. Separar `Confirmado`, `Referencial`, `TBC` y `HOLD` por campo.
7. La madurez D0–D5 no sustituye evidencia técnica.
8. La promoción D1 → D2 → D3 → D4 → D5 requiere evidencia y aprobación definida.
9. La calibración debe vincular certificado, fecha, resultado y vigencia.
10. Firmware, checksum y configuración OT deben estar auditados cuando aplique.
11. Los rangos de este catálogo son ejemplos; no deben usarse como setpoints de control o seguridad.
12. Los interlocks, SIL, alarmas críticas y lógicas de paro requieren ingeniería y pruebas específicas.

---

# 16. HOLD / TBC DEL CATÁLOGO

- Confirmar las 18 etapas con el PFD/P&ID oficial.
- Reconciliar 180 TAG con Instrument Index e I/O List reales.
- Confirmar variables, unidades, rangos y precisiones de cada instrumento.
- Confirmar señales, protocolos, alimentación y barreras/aisladores.
- Confirmar fabricante, modelo, serie y certificaciones.
- Confirmar ubicación física y coordenadas.
- Confirmar PLC/RTU/RIO, rack, slot, canal y tag SCADA.
- Confirmar Historian y política de retención.
- Confirmar arquitectura de gateways, redundancia y latencia.
- Confirmar GPON/VLAN/IP cuando corresponda.
- Confirmar plan de calibración y trazabilidad metrológica.
- Confirmar alarmas, prioridades, límites, interlocks y filosofía de alarmas.
- Confirmar ciberseguridad OT, firmware, checksum y hardening.
- Vincular mantenimiento, repuestos y criticidad.
- Validar FAT/SAT/UAT antes de condición operacional.

---

# 17. FUENTES PÚBLICAS CONSULTADAS — AMPLIACIÓN TÉCNICA

Las siguientes fuentes se utilizaron para contrastar **tipos de instrumentación y aplicaciones típicas**; no se usaron para afirmar que los rangos referenciales del catálogo correspondan a la planta real:

1. Endress+Hauser — *Portfolio Mining* — instrumentación de lixiviación, incluyendo pH, oxígeno disuelto, nivel, caudal y temperatura: https://www.endress.com/_storage/asset/11243675/storage/master/file/58973971/download/SO01117U60EN0123_Portfolio_Brochure_Mining_20231117_SCREEN.pdf
2. Endress+Hauser — *Thickener optimization to reduce production costs* — nivel de lecho, torque, floculante, underflow, densidad, turbidez y analítica: https://www.endress.com/en/endress-hauser-group/Case-studies-application-notes/thickener-optimization
3. Emerson — *Hydrocyclone* — presión, caudal, densidad y monitoreo de clasificación: https://www.emerson.com/en/measurement-instrumentation/industries/mining-and-metals/hydrocyclone
4. Metso — *Basics in Minerals Processing* — configuración de clusters de hidrociclones y transmisor/manómetro de presión: https://www.metso.com/globalassets/insights/ebooks/mo-basics-in-mineral-processing-handbook_lowres.pdf
5. ABB — *Mining conveyor instrumentation* — peso, volumen, temperatura, vibración, posición, tramp metal, desalineamiento, slip, desgaste, rasgadura y sobrellenado: https://new.abb.com/mining/material-handling/crushing-conveying/gearless-conveyor-drives/conveyor-instrumentation
6. Thermo Fisher Scientific — *A practical guide to improving mining and mineral operations* — belt scales y tramp metal detectors: https://assets.thermofisher.com/TFS-Assets/CAD/Scientific-Resources/mining-mineral-operations-ebook.pdf
7. Emerson — guía de medición para procesamiento de oro — control de pH en lixiviación: https://www.emerson.com/is/content/emerson/en/measurement-instrumentation/technical/products/flow-magnetic/documents/doc-rosemount-ms-00803-0100-2929.pdf
8. Metso — *Gold Cyanide Leaching Process* — plantas de lixiviación con instrumentación y automatización: https://www.metso.com/portfolio/gold-cyanide-leaching-process/
9. Emerson — *Electrowinning* — nivel, temperatura y analítica para operación de electroobtención: https://www.emerson.com/en/measurement-instrumentation/industries/mining-and-metals/electrowinning
10. ABB — *High Power Rectifiers for the Electrowinning Industry* — rectificación, medición DC, control y monitoreo: https://library.e.abb.com/public/031772df7cc749b78d35794706c28c1c/3BHS352577_en_B_High%20Power%20Rectifiers%20for%20the%20electrowinning%20industry.pdf
11. Odoo 19 — ORM API — modelos, recordsets, constraints e índices: https://www.odoo.com/documentation/19.0/developer/reference/backend/orm.html

---

# 18. CONCLUSIÓN

El catálogo consolida **180 FUR-IOT referenciales**, distribuidas en **18 etapas × 10 activos IoT/instrumentos**. Mantiene la filosofía del expediente `FUR-IOT-001045`: una identidad única para relacionar el instrumento con proceso, activo, señal, conectividad, calibración, documentación, mantenimiento y sistemas OT/IT. La arquitectura propuesta evita duplicar series temporales y maestros nativos, utiliza Odoo 19 para entidades empresariales y mantiene en FUR la identidad, relaciones, contexto, calidad y auditoría.

Antes de utilizar cualquiera de estos registros como información de planta se debe ejecutar levantamiento y reconciliación documental/campo. Hasta entonces, **todos los 180 registros del catálogo permanecen en condición Referencial / madurez D1**.

---

**FIN DEL DOCUMENTO — `CATALOGO_MAESTRO_FUR_IOT_ACTIVOS_INSTRUMENTACION_18_ETAPAS_180_FUR_REV00.md`**

# 74. ANEXO D — MODELO DE DATOS ODOO 19 + FUR POR RED

> Se incorpora el documento técnico de modelo de datos para conservar tablas nativas, tablas propias, normalización, autoridad, índices y flujos.


# DOCUMENTO MAESTRO — FUR POR RED TRANSVERSAL DEL ECOSISTEMA
## Modelo de datos normalizado con ERP Odoo 19 — Tablas nativas + tablas propias FUR

**Código:** DM-FUR-ODOO-DATA-001  
**Revisión:** REV.00  
**Fecha:** 2026-09-15  
**Proyecto:** Ecosistema Digital FUR — Planta de Beneficio de Oro  
**Estado:** Ingeniería conceptual / Arquitectura de datos / Parametrización funcional  
**Tecnologías objetivo:** Odoo 19 ORM + PostgreSQL + módulos propios FUR + interfaz React.js  
**Criterio de integración:** **sin sincronizaciones digitales externas con otro ERP Odoo**. Se adopta Odoo 19 como **modelo normalizador y núcleo ORM**, reutilizando/heredando modelos nativos cuando soportan la lógica y creando modelos propios `fur.*` cuando la lógica FUR excede la semántica estándar.

---

# 0. RESUMEN EJECUTIVO

El Ecosistema Digital FUR administra cada entidad operacional mediante una **Ficha Única de Registro (FUR)**. Para normalizar datos, evitar duplicidad y aprovechar estructuras maduras de ERP, cada FUR se representa como una **entidad catalogable equivalente a un producto Odoo**, vinculada a `product.template` / `product.product`, pero conserva su lógica técnica especializada en modelos propios del ecosistema.

La arquitectura propuesta no convierte un transformador, sensor, proceso, muestra, análisis, orden de mantenimiento o cámara en un producto comercial de forma literal. El patrón **“FUR como producto Odoo”** significa que cada FUR aprovecha el núcleo de identidad, categoría, unidad de medida, compañía, proveedor, documentos, compras, inventario y trazabilidad de Odoo, mientras los atributos de ingeniería permanecen en tablas FUR especializadas.

Se consideran las siguientes familias principales:

1. **FUR-PROC** — Procesos.
2. **FUR-PTE** — Potencia Eléctrica.
3. **FUR-IOT** — IoT / Instrumentación.
4. **FUR-GPON** — GPON / Comunicaciones.
5. **FUR-CC** — Control de Calidad / Muestras físicas.
6. **FUR-LAB** — Laboratorios / Estudios y análisis.
7. **FUR-MNT** — Mantenimientos.
8. **FUR-RQ** — Requisiciones originadas por cualquier red FUR.
9. **FUR-OF** — Ofertas Comerciales asociadas a cada RQ.
10. **FUR-CAM** — Cámaras / Videovigilancia.

Principio rector:

```text
PRODUCTO ODOO = IDENTIDAD ERP NORMALIZADA
FUR = IDENTIDAD TÉCNICA + LÓGICA DE NEGOCIO + RELACIONES DEL ECOSISTEMA

product.template / product.product
             │
             └── fur.record
                    ├── fur.process
                    ├── fur.power.asset
                    ├── fur.iot.asset
                    ├── fur.gpon.asset
                    ├── fur.quality.sample
                    ├── fur.lab.analysis
                    ├── fur.maintenance.asset
                    ├── fur.requisition
                    ├── fur.commercial.offer
                    └── fur.camera.asset
```

---

# 1. BASE DOCUMENTAL Y CRITERIOS UTILIZADOS

## 1.1 Información consolidada del Ecosistema FUR

Las láminas y documentos del proyecto establecen una arquitectura de FUR por redes transversales, con una plantilla común y especialización por dominio. Se mantiene la filosofía:

```text
Una identidad → múltiples relaciones → una sola trazabilidad
```

La estructura común contempla identidad FUR, estado, jerarquía de planta, parámetros técnicos, relaciones, documentos, historial, responsable, criticidad, condición del dato y vínculos con otras FUR.

## 1.2 Investigación Odoo 19

La documentación oficial de Odoo 19 confirma que:

- bienes y servicios se gestionan como productos;
- el catálogo de productos se reutiliza en Inventario, Compras, Fabricación, Reparaciones y otros módulos;
- Purchase gestiona RFQ, órdenes de compra, acuerdos y análisis;
- Inventory administra productos, lotes/series, ubicaciones, existencias y movimientos;
- Maintenance administra equipos y solicitudes preventivas/correctivas;
- Quality administra puntos de control y controles de calidad;
- el ORM de Odoo permite extensión mediante `_inherit`, herencia clásica y delegación `_inherits`.

> **Nota de ingeniería:** los nombres de tablas indicados en este documento siguen la convención ORM estándar de Odoo: el modelo `x.y` se materializa normalmente como tabla `x_y`. La lista debe verificarse contra la base Odoo 19 realmente instalada antes de congelar una migración o un DDL IFC, porque módulos instalados, Enterprise/Community y personalizaciones pueden añadir o modificar modelos/campos.

---

# 2. PRINCIPIOS DE ARQUITECTURA DE DATOS

## 2.1 No duplicar información maestra nativa

Si Odoo ya dispone de una entidad normalizada adecuada, la FUR debe referenciarla en lugar de copiarla.

Ejemplos:

| Información | Modelo Odoo | Tabla física típica | Regla FUR |
|---|---|---|---|
| Producto/activo catalogable | `product.template` | `product_template` | Heredar/extender |
| Variante/registro operativo | `product.product` | `product_product` | Referenciar |
| Categoría | `product.category` | `product_category` | Reutilizar |
| Unidad | `uom.uom` | `uom_uom` | Reutilizar |
| Empresa | `res.company` | `res_company` | Reutilizar |
| Usuario | `res.users` | `res_users` | Reutilizar |
| Persona/proveedor | `res.partner` | `res_partner` | Reutilizar |
| Archivo adjunto | `ir.attachment` | `ir_attachment` | Reutilizar |
| Actividad | `mail.activity` | `mail_activity` | Reutilizar |
| Mensajería/auditoría social | `mail.message` | `mail_message` | Reutilizar |
| Almacén | `stock.warehouse` | `stock_warehouse` | Reutilizar |
| Ubicación | `stock.location` | `stock_location` | Reutilizar |
| Existencia | `stock.quant` | `stock_quant` | Reutilizar |
| Movimiento | `stock.move` | `stock_move` | Reutilizar |
| Lote/serie | `stock.lot` | `stock_lot` | Reutilizar |
| Orden de compra/RFQ | `purchase.order` | `purchase_order` | Reutilizar |
| Línea de compra | `purchase.order.line` | `purchase_order_line` | Reutilizar |
| Proveedor/precio | `product.supplierinfo` | `product_supplierinfo` | Reutilizar |
| Equipo mantenimiento | `maintenance.equipment` | `maintenance_equipment` | Reutilizar |
| Solicitud mantenimiento | `maintenance.request` | `maintenance_request` | Reutilizar |
| Punto de calidad | `quality.point` | `quality_point` | Reutilizar cuando aplique |
| Control de calidad | `quality.check` | `quality_check` | Reutilizar cuando aplique |
| Cuenta analítica | `account.analytic.account` | `account_analytic_account` | Reutilizar |

## 2.2 Crear tabla propia cuando la semántica FUR sea distinta

Se crea un modelo `fur.*` cuando:

- el dato es específico de ingeniería;
- requiere historial técnico propio;
- tiene relaciones N:M no soportadas naturalmente por el modelo nativo;
- representa una entidad que Odoo no modela de forma equivalente;
- requiere estados, validaciones o reglas FUR;
- debe conservar trazabilidad AS-FOUND / AS-BUILT / TBC / HOLD;
- necesita correlación entre redes.

## 2.3 Extensión vs. delegación

### Extensión `_inherit`

Se utiliza para agregar campos FUR a un modelo Odoo existente sin crear una identidad paralela.

Ejemplo conceptual:

```text
product.template
  + fur_code
  + fur_domain_id
  + fur_criticality_id
  + fur_data_condition
  + fur_active_record_id
```

### Delegación `_inherits`

Se recomienda cuando una FUR especializada **tiene una identidad producto**, pero necesita una tabla propia separada.

```text
fur.record
  _inherits = {'product.template': 'product_tmpl_id'}
```

De esta manera la FUR conserva la identidad ERP y añade su semántica técnica sin sobrecargar `product_template` con cientos de campos específicos.

---

# 3. MODELO MAESTRO: CADA FUR COMO PRODUCTO ODOO

## 3.1 Modelo nativo raíz

### `product.template` → `product_template`

Uso:

- nombre;
- descripción;
- categoría;
- UoM;
- tipo de producto/servicio;
- compra/venta cuando corresponda;
- imagen;
- atributos generales;
- compañía;
- archivado/activo;
- catálogo.

### `product.product` → `product_product`

Uso:

- variante/instancia catalogable;
- SKU/código interno cuando corresponda;
- relación con inventario, compras y trazabilidad.

## 3.2 Modelo propio maestro

### `fur.record` → `fur_record`

Campos mínimos propuestos:

| Campo | Tipo | Fuente |
|---|---|---|
| `id` | PK | Propio |
| `product_tmpl_id` | M2O | `product_template` |
| `product_id` | M2O | `product_product` |
| `fur_code` | Char unique | FUR |
| `domain_id` | M2O | `fur_domain` |
| `family_id` | M2O | `fur_family` |
| `subtype_id` | M2O | `fur_subtype` |
| `status_id` | M2O | `fur_status` |
| `criticality_id` | M2O | `fur_criticality` |
| `plant_id` | M2O | `fur_plant` |
| `area_id` | M2O | `fur_area` |
| `process_id` | M2O | `fur_process` |
| `location_text` | Char | FUR |
| `responsible_user_id` | M2O | `res_users` |
| `owner_partner_id` | M2O | `res_partner` |
| `company_id` | M2O | `res_company` |
| `data_condition` | Selection | Confirmado/Referencial/TBC/HOLD |
| `revision` | Char | FUR |
| `effective_date` | Date | FUR |
| `active` | Boolean | Común |
| `notes` | Text | FUR |

## 3.3 Catálogos propios comunes

| Modelo propio | Tabla |
|---|---|
| `fur.domain` | `fur_domain` |
| `fur.family` | `fur_family` |
| `fur.subtype` | `fur_subtype` |
| `fur.status` | `fur_status` |
| `fur.criticality` | `fur_criticality` |
| `fur.plant` | `fur_plant` |
| `fur.area` | `fur_area` |
| `fur.process.stage` | `fur_process_stage` |
| `fur.data.source` | `fur_data_source` |
| `fur.relation.type` | `fur_relation_type` |
| `fur.relation` | `fur_relation` |
| `fur.tag` | `fur_tag` |
| `fur.parameter.definition` | `fur_parameter_definition` |
| `fur.parameter.value` | `fur_parameter_value` |
| `fur.event` | `fur_event` |
| `fur.state.history` | `fur_state_history` |
| `fur.document.link` | `fur_document_link` |
| `fur.kpi.definition` | `fur_kpi_definition` |
| `fur.kpi.value` | `fur_kpi_value` |
| `fur.hold.point` | `fur_hold_point` |
| `fur.audit.event` | `fur_audit_event` |

---

# 4. LISTADO MAESTRO DE MÓDULOS NATIVOS ODOO 19 REQUERIDOS

## 4.1 Núcleo obligatorio

| Módulo Odoo | Uso en FUR |
|---|---|
| `base` | usuarios, compañías, partners, modelos, seguridad |
| `product` | identidad producto, categorías, UoM, atributos |
| `mail` | chatter, mensajes, actividades, seguimiento |
| `contacts` | personas, proveedores, fabricantes, responsables |
| `uom` | unidades normalizadas |

## 4.2 Inventario y logística

| Módulo | Uso |
|---|---|
| `stock` | almacenes, ubicaciones, movimientos, existencias, lotes/series |
| `stock_account` | valoración cuando se adopte contabilidad de inventario |
| `barcodes` / Barcode | identificación física y operación móvil, si se licencia/instala |

## 4.3 Compras y ofertas

| Módulo | Uso |
|---|---|
| `purchase` | RFQ, órdenes de compra, líneas, proveedores |
| `purchase_stock` | vínculo compra–recepción–inventario |
| `account` | impuestos, monedas, documentos contables cuando aplique |
| `analytic` | centros/cuentas analíticas para costos y presupuestos |

## 4.4 Mantenimiento

| Módulo | Uso |
|---|---|
| `maintenance` | equipos, solicitudes/OT base, categorías, equipos de mantenimiento |
| `repair` | reparación de productos/equipos cuando el proceso lo requiera |

## 4.5 Calidad

| Módulo | Uso |
|---|---|
| `quality` | puntos de control y controles de calidad |
| `quality_control` / funcionalidades de Quality instaladas | controles operativos según edición/configuración |

## 4.6 Documentación y colaboración

| Módulo | Uso |
|---|---|
| `documents` | documentos gestionados cuando esté disponible/licenciado |
| `mail` | adjuntos, mensajes, actividades |

## 4.7 Módulos opcionales según alcance

| Módulo | Uso |
|---|---|
| `project` | proyectos/acciones de mejora |
| `hr` | personal/técnicos si se decide enlazar recursos humanos |
| `fleet` | equipos móviles/vehículos |
| `approvals` | aprobaciones cuando la edición instalada lo permita |
| `planning` | programación de recursos |
| `spreadsheet_dashboard` / dashboards disponibles | analítica y cuadros de mando |

---

# 5. LISTADO MAESTRO DE TABLAS NATIVAS ODOO UTILIZADAS

> **Alcance de “listado completo”:** completo para la arquitectura FUR propuesta, no representa todas las tablas existentes en una instalación Odoo 19. Una instalación completa contiene numerosas tablas técnicas adicionales dependientes de los módulos instalados.

## 5.1 Base / seguridad / metadatos

| Modelo | Tabla | Uso FUR |
|---|---|---|
| `res.company` | `res_company` | compañía |
| `res.users` | `res_users` | usuarios/responsables |
| `res.partner` | `res_partner` | personas, proveedores, OEM |
| `res.country` | `res_country` | país |
| `res.country.state` | `res_country_state` | estado/provincia |
| `res.currency` | `res_currency` | moneda |
| `ir.model` | `ir_model` | catálogo de modelos |
| `ir.model.fields` | `ir_model_fields` | metadatos de campos |
| `ir.attachment` | `ir_attachment` | archivos |
| `ir.sequence` | `ir_sequence` | secuencias FUR/RQ/OF |
| `ir.config_parameter` | `ir_config_parameter` | parámetros del sistema |
| `ir.module.module` | `ir_module_module` | módulos instalados |
| `ir.ui.view` | `ir_ui_view` | vistas Odoo |
| `ir.actions.act_window` | `ir_act_window` | acciones UI |
| `res.groups` | `res_groups` | roles/grupos |
| `ir.rule` | `ir_rule` | reglas de registros |
| `ir.model.access` | `ir_model_access` | ACL |

## 5.2 Mensajería / actividades / trazabilidad

| Modelo | Tabla | Uso |
|---|---|---|
| `mail.message` | `mail_message` | historial conversacional |
| `mail.activity` | `mail_activity` | tareas/aprobaciones |
| `mail.activity.type` | `mail_activity_type` | tipos de actividad |
| `mail.followers` | `mail_followers` | seguidores |
| `mail.tracking.value` | `mail_tracking_value` | cambios rastreados |

## 5.3 Producto / catálogo / UoM

| Modelo | Tabla | Uso |
|---|---|---|
| `product.template` | `product_template` | identidad producto/FUR |
| `product.product` | `product_product` | variante/instancia |
| `product.category` | `product_category` | clasificación |
| `product.tag` | `product_tag` | etiquetas si está disponible en configuración |
| `product.attribute` | `product_attribute` | atributos |
| `product.attribute.value` | `product_attribute_value` | valores |
| `product.template.attribute.line` | `product_template_attribute_line` | atributos por plantilla |
| `product.template.attribute.value` | `product_template_attribute_value` | valor aplicado |
| `uom.uom` | `uom_uom` | unidades |
| `uom.category` | `uom_category` | categorías UoM |
| `product.supplierinfo` | `product_supplierinfo` | proveedor/precio/plazo |

## 5.4 Inventario / WMS

| Modelo | Tabla | Uso |
|---|---|---|
| `stock.warehouse` | `stock_warehouse` | almacén |
| `stock.location` | `stock_location` | ubicación |
| `stock.quant` | `stock_quant` | stock actual |
| `stock.move` | `stock_move` | movimiento |
| `stock.move.line` | `stock_move_line` | detalle |
| `stock.picking` | `stock_picking` | transferencia/recepción |
| `stock.picking.type` | `stock_picking_type` | tipo de operación |
| `stock.lot` | `stock_lot` | lote/serial |
| `stock.rule` | `stock_rule` | reglas de abastecimiento |
| `stock.route` | `stock_route` | rutas |
| `stock.package.type` | `stock_package_type` | embalajes |
| `stock.quant.package` | `stock_quant_package` | paquetes |

## 5.5 Compras / RFQ / Ofertas

| Modelo | Tabla | Uso |
|---|---|---|
| `purchase.order` | `purchase_order` | RFQ/PO |
| `purchase.order.line` | `purchase_order_line` | ítems RFQ/PO |
| `purchase.requisition`* | `purchase_requisition`* | acuerdos/tenders si módulo correspondiente está instalado |
| `purchase.requisition.line`* | `purchase_requisition_line`* | líneas de acuerdo |
| `product.supplierinfo` | `product_supplierinfo` | oferta/precio de proveedor normalizado |
| `account.payment.term` | `account_payment_term` | condiciones de pago |
| `account.tax` | `account_tax` | impuestos |
| `res.currency` | `res_currency` | moneda |

`*` Verificar disponibilidad exacta según edición y módulos instalados.

## 5.6 Contabilidad analítica / costos

| Modelo | Tabla | Uso |
|---|---|---|
| `account.analytic.account` | `account_analytic_account` | centro/cuenta analítica |
| `account.analytic.line` | `account_analytic_line` | imputaciones |
| `account.journal` | `account_journal` | diario, si aplica |
| `account.move` | `account_move` | factura/asiento, si aplica |
| `account.move.line` | `account_move_line` | detalle contable |

## 5.7 Mantenimiento

| Modelo | Tabla | Uso |
|---|---|---|
| `maintenance.equipment` | `maintenance_equipment` | activo/equipo mantenible |
| `maintenance.equipment.category` | `maintenance_equipment_category` | categoría |
| `maintenance.request` | `maintenance_request` | solicitud/OT base |
| `maintenance.stage` | `maintenance_stage` | etapa |
| `maintenance.team` | `maintenance_team` | equipo responsable |

## 5.8 Calidad

| Modelo | Tabla | Uso |
|---|---|---|
| `quality.point` | `quality_point` | punto de control |
| `quality.check` | `quality_check` | chequeo/resultado operativo |
| `quality.alert` | `quality_alert` | no conformidad/alerta, cuando disponible |
| `quality.alert.stage` | `quality_alert_stage` | estado de alerta |
| `quality.alert.team` | `quality_alert_team` | equipo de calidad |

## 5.9 Proyectos / recursos opcionales

| Modelo | Tabla | Uso |
|---|---|---|
| `project.project` | `project_project` | proyecto |
| `project.task` | `project_task` | tarea |
| `hr.employee` | `hr_employee` | técnico/analista si HR está habilitado |
| `hr.department` | `hr_department` | departamento |

---

# 6. MÓDULOS PROPIOS DEL ECOSISTEMA FUR

Se recomienda separar módulos para mantener bajo acoplamiento.

| Módulo propio | Responsabilidad |
|---|---|
| `fur_core` | identidad FUR, dominios, relaciones, estados, auditoría |
| `fur_product_bridge` | extensión/delegación de `product.template` y `product.product` |
| `fur_process` | FUR-PROC |
| `fur_power` | FUR-PTE |
| `fur_iot` | FUR-IOT |
| `fur_gpon` | FUR-GPON |
| `fur_quality` | FUR-CC |
| `fur_laboratory` | FUR-LAB |
| `fur_maintenance` | FUR-MNT |
| `fur_requisition` | FUR-RQ |
| `fur_commercial_offer` | FUR-OF |
| `fur_camera` | FUR-CAM |
| `fur_documents` | clasificación y vínculo documental |
| `fur_kpi` | indicadores y snapshots |
| `fur_catalogs` | catálogos técnicos |
| `fur_audit` | eventos, cambios, HOLD/TBC |
| `fur_dashboard` | vistas/KPI internos |
| `fur_security` | roles, grupos y reglas |

---

# 7. FUR-PROC — RED TRANSVERSAL DE PROCESOS

## 7.1 Objetivo

Registrar cada proceso/subproceso/etapa como entidad FUR y relacionarlo con activos, variables, entradas, salidas, parámetros, documentos, calidad, laboratorio y mantenimiento.

## 7.2 Tablas Odoo reutilizadas

- `product_template`
- `product_product`
- `product_category`
- `uom_uom`
- `res_company`
- `res_users`
- `res_partner`
- `ir_attachment`
- `mail_message`
- `mail_activity`
- `account_analytic_account`

## 7.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_process` | cabecera proceso |
| `fur_process_stage` | etapa/subetapa |
| `fur_process_input` | entradas |
| `fur_process_output` | salidas |
| `fur_process_parameter` | setpoint/rango/unidad |
| `fur_process_variable` | variables críticas |
| `fur_process_asset_rel` | activos asociados |
| `fur_process_document_rel` | documentos |
| `fur_process_kpi` | KPI |
| `fur_process_dependency` | relaciones entre procesos |

## 7.4 Relación como producto

```text
product_template
   1 ── 1 fur_record
           1 ── 1 fur_process
```

---

# 8. FUR-PTE — RED TRANSVERSAL DE POTENCIA ELÉCTRICA

## 8.1 Objetivo

Gestionar transformadores, generadores, motores, celdas, interruptores, barras, VFD/AFE, UPS, relés, medidores, alimentadores y demás activos eléctricos.

## 8.2 Tablas Odoo reutilizadas

- `product_template`, `product_product`, `product_category`
- `stock_lot` para seriales cuando corresponda
- `maintenance_equipment`
- `maintenance_request`
- `stock_quant`, `stock_location` para repuestos
- `product_supplierinfo`
- `ir_attachment`
- `res_partner` para OEM/proveedor

## 8.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_power_asset` | cabecera eléctrica |
| `fur_power_nameplate` | placa |
| `fur_power_rating` | kW/kVA/MVA/V/A/Hz |
| `fur_power_transformer` | relación V1/V2, grupo, Z%, taps, cooling |
| `fur_power_motor` | HP/kW/rpm/FP/η |
| `fur_power_switchgear` | celda/CB/DS |
| `fur_power_protection` | ANSI, relé, CT/PT, ajustes |
| `fur_power_feeder` | alimentador/cable |
| `fur_power_measurement` | variables eléctricas |
| `fur_power_singleline_rel` | vínculo con unifilar/documento |
| `fur_power_asset_relation` | fuente-carga/enlace |

---

# 9. FUR-IOT — RED TRANSVERSAL IoT / INSTRUMENTACIÓN

## 9.1 Objetivo

Gestionar sensores, transmisores, analizadores, gateways, edge, PC industrial, PLC/RTU/RIO cuando aplique y parámetros de medición.

## 9.2 Tablas Odoo reutilizadas

- `product_template`, `product_product`
- `product_category`
- `uom_uom`
- `maintenance_equipment`, `maintenance_request`
- `stock_lot`
- `ir_attachment`
- `res_partner`

## 9.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_iot_asset` | dispositivo |
| `fur_iot_variable` | variable medida |
| `fur_iot_range` | rango/span/unidad |
| `fur_iot_signal` | 4-20 mA, DI/DO, etc. |
| `fur_iot_protocol` | OPC UA/MQTT/Modbus/etc. |
| `fur_iot_endpoint` | endpoint/nodo/canal lógico |
| `fur_iot_tag` | tag PLC/SCADA/Historian |
| `fur_iot_alarm` | alarma/umbral |
| `fur_iot_calibration` | calibración/metrología |
| `fur_iot_data_quality` | calidad del dato |
| `fur_iot_asset_rel` | vínculo proceso/activo |

> No se almacenan series temporales masivas en `product_template`; la FUR conserva metadatos y referencias de contexto.

---

# 10. FUR-GPON — RED TRANSVERSAL GPON / COMUNICACIONES

## 10.1 Objetivo

Gestionar OLT, tarjetas/puertos PON, ODF, ODN, splitters, fibra, empalmes, closures, ONU/ONT, switches, SFP, patch cords, gabinetes, UPS y puntos de servicio.

## 10.2 Tablas Odoo reutilizadas

- `product_template`, `product_product`
- `product_category`
- `stock_lot` para seriales
- `stock_location` para racks/gabinetes si se adopta esta semántica
- `maintenance_equipment`, `maintenance_request`
- `ir_attachment`
- `product_supplierinfo`

## 10.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_gpon_asset` | cabecera activo GPON |
| `fur_gpon_olt` | OLT/chassis |
| `fur_gpon_pon_port` | puerto PON |
| `fur_gpon_odf` | ODF |
| `fur_gpon_splitter` | splitter |
| `fur_gpon_fiber` | fibra/tramo |
| `fur_gpon_splice` | empalme |
| `fur_gpon_closure` | cierre/caja |
| `fur_gpon_onu` | ONU/ONT |
| `fur_gpon_service` | CCTV/VoIP/WiFi/OT |
| `fur_gpon_vlan` | VLAN lógica |
| `fur_gpon_optical_budget` | Tx/Rx/pérdida/margen |
| `fur_gpon_otdr_test` | evidencia OTDR |
| `fur_gpon_topology_rel` | relación extremo a extremo |

---

# 11. FUR-CC — RED TRANSVERSAL DE CONTROL DE CALIDAD

## 11.1 Regla fundamental

**FUR-CC representa la identidad y trazabilidad de la muestra física.** El resultado analítico pertenece a FUR-LAB.

## 11.2 Tablas Odoo reutilizadas

- `product_template` / `product_product` para catalogar tipo de muestra/servicio cuando convenga
- `quality_point`
- `quality_check`
- `quality_alert`
- `stock_lot` para lote/código trazable cuando aplique
- `ir_attachment`
- `res_users`, `res_partner`

## 11.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_quality_sample` | muestra física |
| `fur_sampling_point` | punto de muestreo |
| `fur_sampling_plan` | plan/frecuencia |
| `fur_sample_collection` | toma |
| `fur_sample_container` | envase |
| `fur_sample_preservation` | preservación |
| `fur_chain_custody` | cadena de custodia |
| `fur_chain_custody_event` | transferencias |
| `fur_sample_preparation_request` | preparación solicitada |
| `fur_lab_request` | solicitud de análisis |
| `fur_qaqc_control` | blanco/duplicado/CRM |
| `fur_sample_process_rel` | proceso/punto/activo |
| `fur_sample_iot_window` | ventana temporal para comparación IoT |

---

# 12. FUR-LAB — RED TRANSVERSAL DE LABORATORIOS

## 12.1 Objetivo

Representar cada estudio, ensayo o análisis realizado sobre una muestra FUR-CC, con método, preparación, equipo, analitos, resultados, QA/QC, revisión y certificado.

## 12.2 Tablas Odoo reutilizadas

- `product_template` / `product_product` para catálogo de ensayos/servicios/equipos
- `quality_check` como apoyo donde la semántica coincida
- `maintenance_equipment` para equipos de laboratorio
- `ir_attachment` para certificados/reportes
- `res_users` / `res_partner` para analista/revisor
- `uom_uom` para unidades

## 12.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_lab_analysis` | cabecera análisis |
| `fur_lab_method` | método/SOP/versión |
| `fur_lab_sample_rel` | vínculo exacto FUR-CC |
| `fur_lab_preparation` | preparación |
| `fur_lab_equipment_rel` | equipo usado |
| `fur_lab_run` | corrida |
| `fur_lab_analyte` | analito |
| `fur_lab_result` | resultado/unidad |
| `fur_lab_detection_limit` | LOD/LOQ |
| `fur_lab_uncertainty` | incertidumbre |
| `fur_lab_qaqc_result` | blanco/duplicado/CRM/recuperación |
| `fur_lab_validation` | revisión/aprobación |
| `fur_lab_certificate` | certificado/informe |
| `fur_lab_iot_comparison` | reconciliación con IoT |

---

# 13. FUR-MNT — RED TRANSVERSAL DE MANTENIMIENTOS

## 13.1 Objetivo

Gestionar mantenimiento preventivo, correctivo, predictivo, inspección, condición, fallas, repuestos, BOM, OT, recursos e indicadores.

## 13.2 Tablas Odoo reutilizadas

- `maintenance_equipment`
- `maintenance_equipment_category`
- `maintenance_request`
- `maintenance_stage`
- `maintenance_team`
- `product_template`, `product_product` para repuestos/servicios
- `stock_quant`, `stock_location`, `stock_move`, `stock_move_line`
- `product_supplierinfo`
- `ir_attachment`
- `mail_activity`

## 13.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_maintenance_asset` | extensión FUR del activo mantenible |
| `fur_maintenance_strategy` | estrategia |
| `fur_maintenance_plan` | plan |
| `fur_maintenance_task` | tarea técnica |
| `fur_maintenance_frequency` | frecuencia/contador |
| `fur_maintenance_failure` | falla/evento |
| `fur_failure_mode` | modo de falla |
| `fur_failure_cause` | causa |
| `fur_failure_consequence` | consecuencia |
| `fur_condition_measurement` | condición |
| `fur_asset_bom` | BOM de mantenimiento |
| `fur_asset_bom_line` | repuestos por activo |
| `fur_spare_criticality` | criticidad repuesto |
| `fur_maintenance_kpi` | MTBF/MTTR/disponibilidad/backlog |
| `fur_maintenance_request_rel` | vínculo con `maintenance_request` |

---

# 14. FUR-RQ — RED TRANSVERSAL DE REQUISICIONES

## 14.1 Objetivo

Toda red FUR puede originar una RQ de bien, repuesto, servicio u obra. La RQ debe conservar la identidad de la red/activo/proceso solicitante.

## 14.2 Tablas Odoo reutilizadas

- `product_template`, `product_product`
- `product_supplierinfo`
- `stock_quant`, `stock_location`, `stock_warehouse`
- `purchase_order`, `purchase_order_line` **solo después de la etapa de compra/RFQ según política**
- `account_analytic_account`
- `res_users`, `res_partner`
- `mail_activity`, `mail_message`
- `ir_attachment`

## 14.3 Por qué se requiere tabla propia

Odoo Purchase gestiona RFQ/PO, pero la **RQ interna FUR** requiere identidad de red origen, justificación técnica, criticidad, activo, centro de costo, presupuesto, disponibilidad WMS, aprobaciones internas y trazabilidad previa al RFQ.

## 14.4 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_requisition` | cabecera RQ |
| `fur_requisition_line` | ítems |
| `fur_requisition_origin` | red/FUR origen |
| `fur_requisition_justification` | justificación |
| `fur_requisition_budget` | presupuesto/centro de costo |
| `fur_requisition_stock_check` | snapshot de disponibilidad |
| `fur_requisition_approval_route` | ruta |
| `fur_requisition_approval` | aprobación/rechazo |
| `fur_requisition_document` | documentos |
| `fur_requisition_event` | historial |
| `fur_requisition_purchase_rel` | vínculo RQ → RFQ/PO Odoo |

## 14.5 Flujo

```text
FUR origen
 → FUR-RQ
 → Validación técnica
 → Consulta WMS
 → Presupuesto / centro de costo
 → Aprobación
 → Solicitud de ofertas / RFQ
 → Compra o salida de almacén
 → Recepción / entrega
 → Cierre RQ
```

---

# 15. FUR-OF — RED TRANSVERSAL DE OFERTAS COMERCIALES

## 15.1 Objetivo

Registrar **múltiples ofertas por cada RQ**, normalizar proveedores y condiciones, realizar comparación técnico-económica y dejar evidencia de recomendación/adjudicación.

## 15.2 Tablas Odoo reutilizadas

- `res_partner` — proveedor
- `product_supplierinfo` — referencia proveedor/precio
- `purchase_order` — RFQ/PO cuando se formaliza en Purchase
- `purchase_order_line`
- `res_currency`
- `account_payment_term`
- `account_tax`
- `ir_attachment`
- `mail_activity`, `mail_message`

## 15.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_commercial_offer` | cabecera oferta |
| `fur_commercial_offer_line` | ítems |
| `fur_offer_rq_rel` | oferta ↔ RQ |
| `fur_offer_supplier_contact` | contacto específico |
| `fur_offer_incoterm` | condición logística normalizada si no se usa modelo nativo disponible |
| `fur_offer_delivery_term` | plazo |
| `fur_offer_warranty` | garantía |
| `fur_offer_payment_term` | condición adicional |
| `fur_offer_technical_eval` | evaluación técnica |
| `fur_offer_commercial_eval` | evaluación comercial |
| `fur_offer_weighted_score` | ponderación |
| `fur_offer_comparison` | comparativo |
| `fur_offer_award` | adjudicación/recomendación |
| `fur_offer_document` | cotización/ficha/certificados |
| `fur_offer_purchase_rel` | oferta → RFQ/PO |

## 15.4 Regla

```text
1 FUR-RQ → N FUR-OF
1 FUR-OF → 1 proveedor principal
1 FUR-OF → N líneas
N FUR-OF → 1 comparativo por RQ/revisión
1 oferta adjudicada → 0..N purchase.order
```

---

# 16. FUR-CAM — RED TRANSVERSAL DE CÁMARAS

## 16.1 Objetivo

Gestionar cámaras, NVR/VMS, almacenamiento, streams, zonas analíticas, PoE, red GPON/IP, eventos y mantenimiento.

## 16.2 Tablas Odoo reutilizadas

- `product_template`, `product_product`
- `product_category`
- `stock_lot`
- `maintenance_equipment`, `maintenance_request`
- `stock_quant` para repuestos
- `ir_attachment`
- `res_partner`

## 16.3 Tablas propias

| Tabla | Propósito |
|---|---|
| `fur_camera_asset` | cámara/dispositivo |
| `fur_camera_optics` | lente/FOV/zoom |
| `fur_camera_video_profile` | resolución/FPS/codec |
| `fur_camera_network` | IP/VLAN/PoE |
| `fur_camera_stream` | stream lógico |
| `fur_camera_vms_rel` | VMS/NVR |
| `fur_camera_storage_policy` | retención |
| `fur_camera_analytics` | movimiento/intrusión/etc. |
| `fur_camera_zone` | zona analítica |
| `fur_camera_event` | evento |
| `fur_camera_gpon_rel` | vínculo con ONU/ODN/servicio |
| `fur_camera_process_rel` | área/proceso protegido |

---

# 17. TABLAS PROPIAS TRANSVERSALES ADICIONALES

## 17.1 Documentos

| Tabla | Uso |
|---|---|
| `fur_document_type` | tipo documental |
| `fur_document_revision` | revisión |
| `fur_document_link` | relación FUR-documento |
| `fur_document_requirement` | documento obligatorio por familia |
| `fur_document_approval` | revisión/aprobación |

El binario puede permanecer en `ir_attachment`; la semántica técnica FUR se almacena en las tablas anteriores.

## 17.2 Relaciones

| Tabla | Uso |
|---|---|
| `fur_relation` | relación genérica FUR↔FUR |
| `fur_relation_type` | alimenta, mide, pertenece, analiza, mantiene, comunica, solicita, oferta, etc. |
| `fur_relation_history` | vigencia histórica |

## 17.3 Parámetros

| Tabla | Uso |
|---|---|
| `fur_parameter_definition` | definición maestra |
| `fur_parameter_value` | valor por FUR |
| `fur_parameter_limit` | límites |
| `fur_parameter_unit_rule` | unidad permitida |

## 17.4 Auditoría y ciclo de vida

| Tabla | Uso |
|---|---|
| `fur_event` | evento operacional/administrativo |
| `fur_state_history` | cambio de estado |
| `fur_audit_event` | auditoría |
| `fur_hold_point` | HOLD/TBC |
| `fur_data_quality` | completitud/calidad |
| `fur_approval` | aprobación genérica |

## 17.5 KPI

| Tabla | Uso |
|---|---|
| `fur_kpi_definition` | definición |
| `fur_kpi_formula` | fórmula/versionado |
| `fur_kpi_value` | valor/snapshot |
| `fur_kpi_target` | objetivo |
| `fur_kpi_alert_rule` | umbral |

---

# 18. MATRIZ RED FUR → MÓDULOS ODOO → TABLAS PROPIAS

| Red | Product | Stock | Purchase | Maintenance | Quality | Documents | Propias principales |
|---|---:|---:|---:|---:|---:|---:|---|
| PROC | ✓ | ○ | ○ | ○ | ○ | ✓ | `fur_process*` |
| PTE | ✓ | ✓ | ○ | ✓ | ○ | ✓ | `fur_power*` |
| IOT | ✓ | ✓ | ○ | ✓ | ○ | ✓ | `fur_iot*` |
| GPON | ✓ | ✓ | ○ | ✓ | ○ | ✓ | `fur_gpon*` |
| CC | ✓ | ○ | ○ | ○ | ✓ | ✓ | `fur_quality*`, `fur_sample*` |
| LAB | ✓ | ✓ | ○ | ✓ | ✓ | ✓ | `fur_lab*` |
| MNT | ✓ | ✓ | ○ | ✓ | ○ | ✓ | `fur_maintenance*` |
| RQ | ✓ | ✓ | ✓ | ○ | ○ | ✓ | `fur_requisition*` |
| OF | ✓ | ○ | ✓ | ○ | ○ | ✓ | `fur_commercial_offer*` |
| CAM | ✓ | ✓ | ○ | ✓ | ○ | ✓ | `fur_camera*` |

Leyenda: ✓ uso principal; ○ uso relacional/opcional.

---

# 19. NORMALIZACIÓN DE DATOS

## 19.1 Primera forma normal

No almacenar listas separadas por comas en campos técnicos. Ejemplo incorrecto:

```text
protocolos = "OPC UA,MQTT,Modbus"
```

Correcto:

```text
fur_iot_asset
fur_iot_asset_protocol_rel
fur_iot_protocol
```

## 19.2 Segunda y tercera forma normal

- proveedor en `res_partner`, no repetido en cada FUR;
- unidad en `uom_uom`;
- moneda en `res_currency`;
- producto en `product_template`;
- almacén en `stock_warehouse`;
- ubicación en `stock_location`;
- responsable en `res_users`;
- documento binario en `ir_attachment`;
- oferta técnica específica en `fur_commercial_offer`;
- muestra en `fur_quality_sample`;
- análisis en `fur_lab_analysis`.

## 19.3 Claves únicas recomendadas

```text
fur_record.fur_code UNIQUE
fur_tag.tag_code UNIQUE por planta/disciplina
fur_quality_sample.sample_code UNIQUE
fur_requisition.rq_code UNIQUE
fur_commercial_offer.offer_code UNIQUE por proveedor/RQ/revisión
fur_gpon_onu.serial_number UNIQUE cuando sea confirmado
fur_iot_tag(tag_name, system_id) UNIQUE
```

---

# 20. RELACIONES MAESTRAS

```text
res_company
   └── fur_plant
        └── fur_area
             └── fur_process
                  ├── fur_record (PROC)
                  ├── fur_record (PTE)
                  ├── fur_record (IOT)
                  ├── fur_record (GPON)
                  ├── fur_record (CC)
                  ├── fur_record (LAB)
                  ├── fur_record (MNT)
                  └── fur_record (CAM)

fur_record
   ├── product_template
   ├── ir_attachment
   ├── mail_activity
   ├── maintenance_equipment [cuando aplica]
   ├── stock_lot [cuando aplica]
   ├── fur_requisition [0..N]
   └── fur_relation [0..N]

fur_requisition
   └── fur_commercial_offer [0..N]
        └── purchase_order [0..N cuando adjudicada]
```

---

# 21. FLUJO DE ABASTECIMIENTO NORMALIZADO

```text
FUR ACTIVO / PROCESO / RED
        │
        ▼
FUR-RQ — Necesidad interna
        │
        ├── ¿Existe stock?
        │       ├── Sí → stock_picking / stock_move → entrega
        │       └── No
        ▼
FUR-OF — Ofertas comerciales
        │
        ▼
Comparación técnico-económica
        │
        ▼
Aprobación
        │
        ▼
purchase_order (RFQ/PO Odoo)
        │
        ▼
stock_picking / recepción
        │
        ▼
stock_quant / ubicación
        │
        ▼
Entrega al FUR origen
```

---

# 22. FLUJO IoT → CALIDAD → LABORATORIO

```text
FUR-PROC / activo
     │
     ├── FUR-IOT → variable / timestamp / calidad del dato
     │
     └── FUR-CC → muestra / punto / timestamp / custodia
                        │
                        ▼
                    FUR-LAB
                 método / equipo
                 resultado / QAQC
                        │
                        ▼
              Reconciliación FUR
         IoT ↔ muestra ↔ resultado LAB
```

Tablas propias críticas:

- `fur_sample_iot_window`
- `fur_lab_sample_rel`
- `fur_lab_iot_comparison`

---

# 23. FLUJO ACTIVO → MANTENIMIENTO → REPUESTOS

```text
product_template / fur_record
          │
          ▼
maintenance_equipment
          │
          ▼
fur_maintenance_plan
          │
          ▼
maintenance_request
          │
          ├── fur_failure_mode
          ├── fur_condition_measurement
          └── fur_asset_bom
                    │
                    ▼
             product_product
                    │
                    ▼
                stock_quant
                    │
              ¿stock suficiente?
              ├── Sí → consumo/salida
              └── No → FUR-RQ
```

---

# 24. ESTRATEGIA DE PRODUCTOS ODOO POR TIPO DE FUR

No todas las FUR deben activar inventario.

| FUR | Tipo conceptual Odoo | Track Inventory | Observación |
|---|---|---:|---|
| PROC | Servicio/entidad lógica | No | proceso no es stock físico |
| PTE | Bien/equipo | Según activo | serializable si aplica |
| IOT | Bien/equipo | Sí para dispositivo físico | sensores/gateways |
| GPON | Bien/equipo | Sí para hardware | OLT/ONU/SFP/etc. |
| CC | Servicio/registro + muestra | Según política | muestra no debe confundirse con stock comercial |
| LAB | Servicio/análisis | No para análisis | equipo LAB sí puede ser bien |
| MNT | Servicio/registro | No | repuestos sí son productos inventariables |
| RQ | Documento transaccional | No | no es producto físico |
| OF | Documento transaccional | No | no es producto físico |
| CAM | Bien/equipo | Sí | cámara/NVR/SFP |

**Regla:** el patrón “FUR como producto” no obliga a marcar todos los registros como bienes inventariables. Se utiliza `product.template` como identidad catalogable y se especializa la operación según el dominio.

---

# 25. SEGURIDAD Y ROLES

## 25.1 Grupos propuestos

- `group_fur_admin`
- `group_fur_manager`
- `group_fur_operations`
- `group_fur_power`
- `group_fur_iot`
- `group_fur_gpon`
- `group_fur_quality`
- `group_fur_lab`
- `group_fur_maintenance`
- `group_fur_procurement`
- `group_fur_wms`
- `group_fur_auditor`
- `group_fur_readonly`

## 25.2 Uso nativo

Se implementan mediante:

- `res_groups`;
- `ir_model_access`;
- `ir_rule`;
- compañía/plantas/áreas;
- seguimiento `mail.thread` donde corresponda.

---

# 26. ESTADOS

## 26.1 Estado maestro FUR

```text
Borrador
→ En revisión
→ Aprobado
→ Activo
→ Suspendido / Obsoleto
→ Archivado
```

## 26.2 Estado del dato

```text
Confirmado
Referencial
TBC
HOLD
```

## 26.3 Estados especializados

### RQ

```text
Borrador → Validación → Aprobación → Cotización → Adjudicada/Atendida → Cerrada
```

### Oferta

```text
Recibida → Validada → Evaluación → Recomendada → Adjudicada / Rechazada → Cerrada
```

### Muestra

```text
Creada → Tomada → En custodia → Recibida LAB → Preparación → Analizada → Cerrada
```

### Análisis

```text
Solicitado → En preparación → En análisis → QA/QC → Revisado → Aprobado → Emitido
```

### Mantenimiento

Se conserva el estado nativo de `maintenance_request` y se añade la clasificación FUR cuando sea necesario.

---

# 27. NOMENCLATURA DE TABLAS PROPIAS

Regla:

```text
fur_<dominio>_<entidad>
```

Ejemplos:

```text
fur_process_parameter
fur_power_protection
fur_iot_calibration
fur_gpon_optical_budget
fur_quality_sample
fur_lab_result
fur_maintenance_plan
fur_requisition_line
fur_commercial_offer_line
fur_camera_video_profile
```

No usar nombres que colisionen con tablas nativas Odoo.

---

# 28. ÍNDICES RECOMENDADOS

Crear índices en:

- `fur_record.fur_code`;
- `fur_record.domain_id`;
- `fur_record.product_tmpl_id`;
- `fur_tag.tag_code`;
- `fur_quality_sample.sample_code`;
- `fur_requisition.rq_code`;
- `fur_commercial_offer.offer_code`;
- `fur_gpon_onu.serial_number`;
- `fur_iot_tag.tag_name`;
- `fur_event.event_date`;
- `fur_state_history.change_date`;
- FK de relaciones de alta cardinalidad.

---

# 29. TABLAS DE RELACIÓN N:M

El ORM de Odoo puede crear tablas relacionales automáticamente. Para relaciones críticas se recomienda declarar nombres explícitos y documentarlos.

Ejemplos:

| Relación | Tabla propuesta |
|---|---|
| FUR ↔ documentos | `fur_record_document_rel` |
| FUR ↔ tags | `fur_record_tag_rel` |
| FUR ↔ FUR | `fur_relation` (modelo explícito) |
| Proceso ↔ activos | `fur_process_asset_rel` |
| IoT ↔ procesos | `fur_iot_process_rel` |
| GPON ↔ servicios | `fur_gpon_service_rel` |
| LAB ↔ equipo | `fur_lab_equipment_rel` |
| MNT ↔ repuestos | `fur_asset_bom_line` |
| RQ ↔ FUR origen | `fur_requisition_origin` |
| Oferta ↔ RQ | `fur_offer_rq_rel` |
| Cámara ↔ GPON | `fur_camera_gpon_rel` |

---

# 30. CATÁLOGOS MAESTROS

## 30.1 Odoo nativos

- compañía;
- usuario;
- partner;
- producto;
- categoría producto;
- UoM;
- moneda;
- impuestos;
- términos de pago;
- almacén;
- ubicación;
- proveedor;
- equipo de mantenimiento;
- equipo de calidad.

## 30.2 FUR propios

- dominio;
- familia;
- subtipo;
- estado;
- criticidad;
- condición de dato;
- disciplina;
- planta;
- área;
- proceso;
- etapa;
- variable;
- método analítico;
- tipo de muestra;
- punto de muestreo;
- protocolo;
- tipo de señal;
- tipo de documento;
- tipo de relación;
- modo/causa/consecuencia de falla;
- prioridad RQ;
- tipo de compra;
- criterio de evaluación de oferta;
- tipo de cámara;
- tipo de activo GPON.

---

# 31. CRITERIOS DE NO DUPLICACIÓN

1. No duplicar proveedor FUR si existe `res_partner`.
2. No duplicar producto/repuesto si existe `product_template/product_product`.
3. No duplicar UoM si existe `uom_uom`.
4. No duplicar stock si existe `stock_quant`.
5. No duplicar almacén/ubicación si existe `stock_warehouse/stock_location`.
6. No duplicar RFQ/PO si existe `purchase_order`.
7. No duplicar equipo mantenible si existe `maintenance_equipment`; extenderlo.
8. No duplicar adjunto binario si existe `ir_attachment`.
9. No usar `quality_check` como sustituto de un análisis de laboratorio complejo si no soporta la semántica requerida.
10. No usar `purchase_order` como RQ interna: FUR-RQ existe antes del proceso de compra.
11. No usar `product_supplierinfo` como sustituto de una oferta técnico-comercial completa: FUR-OF conserva revisión, documentos, evaluación y adjudicación.

---

# 32. MATRIZ DE AUTORIDAD DEL DATO

| Dato | Autoridad propuesta |
|---|---|
| Identidad FUR | `fur_record` |
| Identidad producto | `product_template` |
| Variante/SKU | `product_product` |
| Proveedor/OEM | `res_partner` |
| Precio estándar proveedor | `product_supplierinfo` |
| Oferta completa por RQ | `fur_commercial_offer` |
| Stock | `stock_quant` |
| Ubicación logística | `stock_location` |
| Movimiento | `stock_move` / `stock_move_line` |
| RFQ/PO | `purchase_order` |
| Equipo mantenimiento | `maintenance_equipment` |
| OT/solicitud base | `maintenance_request` |
| Muestra física | `fur_quality_sample` |
| Resultado laboratorio | `fur_lab_result` |
| Metadato IoT | `fur_iot_*` |
| Topología GPON | `fur_gpon_*` |
| Parámetros eléctricos | `fur_power_*` |
| Cámara/VMS | `fur_camera_*` |
| Documento binario | `ir_attachment` |
| Semántica documental | `fur_document_*` |

---

# 33. CONSIDERACIONES SOBRE ACCESO DIRECTO A POSTGRESQL

Aunque este documento lista tablas físicas para fines de normalización, **la lógica transaccional de Odoo no debe implementarse escribiendo directamente en tablas nativas desde aplicaciones externas**. Odoo define reglas de negocio, campos calculados, restricciones, seguridad, tracking y automatizaciones en su ORM.

Por ello, el diseño objetivo es:

```text
Módulos FUR ejecutados dentro del ORM Odoo
        ↓
Modelos nativos + modelos fur.*
        ↓
PostgreSQL
```

La interfaz React.js puede representar las FUR, pero la persistencia transaccional debe respetar la capa de negocio definida para el ecosistema. El requisito “sin integraciones externas con ERP Odoo” se interpreta como **una sola base lógica Odoo/FUR**, sin sincronización con una segunda instancia ERP externa.

---

# 34. PSEUDOCÓDIGO MAESTRO DE CREACIÓN DE UNA FUR

```text
INICIO

entrada ← CapturarFicha()

ValidarIdentidad(entrada)
ValidarDominio(entrada.red)
ValidarCamposObligatorios(entrada)

producto ← BuscarProductoOdoo(entrada.codigo)

SI producto NO EXISTE ENTONCES
    producto ← CrearProductTemplate(
        nombre,
        categoria,
        uom,
        tipo,
        imagen
    )
FIN SI

fur ← CrearFURRecord(
    product_tmpl_id = producto.id,
    fur_code,
    dominio,
    familia,
    estado,
    criticidad,
    planta,
    area,
    responsable,
    condicionDato
)

SEGÚN dominio HACER
    PROC: CrearFURProceso(fur, entrada)
    PTE:  CrearFURPotencia(fur, entrada)
    IOT:  CrearFURIoT(fur, entrada)
    GPON: CrearFURGPON(fur, entrada)
    CC:   CrearFURMuestra(fur, entrada)
    LAB:  CrearFURLaboratorio(fur, entrada)
    MNT:  CrearFURMantenimiento(fur, entrada)
    CAM:  CrearFURCamara(fur, entrada)
FIN SEGÚN

RegistrarRelaciones(fur)
RegistrarDocumentos(fur)
RegistrarEventoAuditoria(fur)

FIN
```

---

# 35. PSEUDOCÓDIGO RQ → OFERTA → COMPRA

```text
INICIO

rq ← CrearFUR_RQ(furOrigen, items, justificacion, centroCosto)

ValidarRQ(rq)
stock ← ConsultarStockOdoo(items)

SI stock >= necesidad ENTONCES
    CrearReservaOSalidaStock(rq)
    CerrarRQComoAtendidaDesdeWMS(rq)
SINO
    AprobarRQ(rq)

    ofertas ← RegistrarOfertasComerciales(rq)
    comparativo ← EvaluarOfertas(ofertas)
    adjudicacion ← AprobarMejorAlternativa(comparativo)

    po ← CrearPurchaseOrderDesdeOferta(adjudicacion)
    VincularRQOfertaPO(rq, adjudicacion, po)
FIN SI

RegistrarAuditoria()
FIN
```

---

# 36. CRITERIOS DE ACEPTACIÓN DE LA ARQUITECTURA

La arquitectura se considera lista para diseño detallado cuando:

1. Cada red tiene modelo FUR especializado aprobado.
2. Cada FUR posee `product_tmpl_id` o mecanismo equivalente de identidad producto.
3. Se ha definido qué FUR son inventariables y cuáles son lógicas/transaccionales.
4. Las tablas nativas Odoo no se duplican sin justificación.
5. RQ y Oferta Comercial disponen de modelos propios previos a `purchase_order`.
6. Control de Calidad separa muestra física de resultado LAB.
7. Mantenimiento reutiliza `maintenance_equipment` y `maintenance_request` donde corresponda.
8. Repuestos reutilizan Product + Stock.
9. Proveedores reutilizan `res_partner`.
10. Documentos binarios reutilizan `ir_attachment`.
11. Se define autoridad de dato por entidad.
12. Se valida la edición Odoo 19 objetivo y módulos instalados.
13. Se ejecuta inspección real de `ir_model` / `ir_model_fields` antes del DDL final.
14. Se definen ACL, record rules y multi-compañía.
15. Se validan índices, constraints y volumen esperado.

---

# 37. HOLD / TBC PARA REV.01

1. Confirmar edición exacta Odoo 19: Community / Enterprise.
2. Confirmar módulos realmente licenciados e instalados.
3. Extraer inventario real de `ir_model` e `ir_model_fields`.
4. Confirmar nombres físicos de tablas de módulos opcionales.
5. Confirmar si `documents` será obligatorio.
6. Confirmar estrategia `product.template` vs `_inherits` para `fur.record`.
7. Confirmar si cada activo físico tendrá variante `product.product` única.
8. Confirmar política de serialización mediante `stock.lot`.
9. Confirmar taxonomía de categorías de producto FUR.
10. Confirmar UoM maestras.
11. Confirmar jerarquía Planta/Área/Proceso.
12. Confirmar catálogo final de dominios FUR.
13. Confirmar nomenclatura final FUR.
14. Confirmar TAG Register.
15. Confirmar Equipment Register.
16. Confirmar Instrument Index.
17. Confirmar GPON AS-BUILT.
18. Confirmar puntos de muestreo.
19. Confirmar métodos de laboratorio.
20. Confirmar taxonomía de fallas de mantenimiento.
21. Confirmar almacenes y ubicaciones WMS.
22. Confirmar flujo y niveles de aprobación RQ.
23. Confirmar política de comparación de ofertas.
24. Confirmar ponderaciones técnico/económicas.
25. Confirmar centros de costo y cuentas analíticas.
26. Confirmar roles y RACI.
27. Confirmar retención documental.
28. Confirmar política de auditoría.
29. Confirmar KPIs por red.
30. Confirmar volumen de eventos/series temporales.
31. Confirmar política de cámaras y retención de video.
32. Confirmar modelo de ciberseguridad y segregación de datos.
33. Confirmar si las FUR transaccionales RQ/OF se publican también como `product.template` o solo se relacionan con productos; **recomendación REV.00: no tratarlas como bienes inventariables**.
34. Confirmar uso de Quality nativo para CC frente a modelos FUR especializados.
35. Confirmar integración interna de aprobaciones según edición instalada.

---

# 38. REFERENCIAS WEB OFICIALES — ODOO 19

1. Odoo 19 — ORM API  
   https://www.odoo.com/documentation/19.0/developer/reference/backend/orm.html

2. Odoo 19 — Product Type  
   https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/product_management/configure/type.html

3. Odoo 19 — Units of Measure  
   https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/product_management/configure/uom.html

4. Odoo 19 — Purchase  
   https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/purchase.html

5. Odoo 19 — Maintenance Requests  
   https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/maintenance/maintenance_requests.html

6. Odoo 19 — Quality Control Points  
   https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/quality/quality_management/quality_control_points.html

7. Odoo 19 — Quality Checks  
   https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/quality/quality_management/quality_checks.html

8. Odoo 19 — Product Catalog  
   https://www.odoo.com/documentation/19.0/applications/essentials/product_catalog.html

9. Odoo 19 — Backend tutorials / inheritance  
   https://www.odoo.com/documentation/19.0/developer/tutorials/backend.html

---

# 39. CONCLUSIÓN

La arquitectura propuesta establece un **núcleo FUR normalizado sobre los modelos nativos de Odoo 19**, donde `product.template` / `product.product` proporcionan la identidad catalogable y los módulos estándar aportan partners, unidades, inventario, compras, mantenimiento, calidad, documentos y trazabilidad.

La lógica especializada no se fuerza dentro de tablas nativas. Se implementa mediante módulos y tablas `fur.*` por dominio. Esto permite que **Procesos, Potencia, IoT, GPON, Control de Calidad, Laboratorios, Mantenimiento, Requisiciones, Ofertas Comerciales y Cámaras** compartan una identidad y un gobierno de datos común, manteniendo a la vez sus estructuras técnicas específicas.

El patrón final es:

```text
ODOO NATIVO
Producto + Partner + UoM + Stock + Purchase + Maintenance + Quality + Documents
                              │
                              ▼
                         FUR CORE
             Identidad + Estado + Relaciones + Auditoría
                              │
      ┌───────────┬───────────┼───────────┬───────────┐
      ▼           ▼           ▼           ▼           ▼
   PROC/PTE     IOT/GPON     CC/LAB       MNT       CAM
                              │
                              ▼
                         FUR-RQ
                              │
                              ▼
                         FUR-OF
                              │
                              ▼
                       PURCHASE / WMS
```

**Resultado:** una sola arquitectura de datos, normalizada, auditable y escalable, con Odoo 19 como referencia/núcleo ORM y las tablas FUR como extensión especializada del Ecosistema Digital de la Planta de Beneficio de Oro.

---

**FIN — DOCUMENTO MAESTRO REV.00**


# 75. ANEXO E — COMPONENTES REACT.JS POR RED TRANSVERSAL

> Se incorpora el documento de componentes parametrizables como especificación funcional del frontend.


# DOCUMENTO MAESTRO — COMPONENTES REACT.JS DE LAS FUR POR RED TRANSVERSAL
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código:** DM-FUR-REACT-RED-001  
**Revisión:** REV.00  
**Fecha:** 2026-09-14  
**Estado:** Ingeniería conceptual / parametrización funcional  
**Formato:** Fichas técnicas comerciales y funcionales — **SIN CÓDIGO FUENTE**

---

# 1. OBJETO

Definir el **componente React.js parametrizable** de cada Ficha Única de Registro (FUR) de las redes transversales del Ecosistema Digital de la Planta de Beneficio de Oro. El documento especifica la estructura visual, campos, pestañas, catálogos, relaciones, estados, documentos, indicadores y reglas de cada ficha; **no incluye JSX, JavaScript, TypeScript, CSS, SQL ni código de API**.

La arquitectura se basa en un **núcleo FUR común + especializaciones por red**, de manera que todas las fichas compartan identidad, navegación, trazabilidad, versionado y auditoría, mientras cada disciplina conserva sus parámetros técnicos propios.

## 1.1 FUR maestras

1. **FUR-PROC** — Red Transversal de Procesos.
2. **FUR-PTE** — Red Transversal de Potencias Eléctricas.
3. **FUR-IOT** — Red Transversal IoT / Instrumentación / Edge.
4. **FUR-GPON** — Red Transversal GPON / Comunicaciones.
5. **FUR-CC** — Red Transversal de Control de Calidad / Muestras Físicas.
6. **FUR-LAB** — Red Transversal de Laboratorios / Estudios y Resultados.
7. **FUR-MNT** — Red Transversal de Mantenimiento / Inventario / Repuestos.

> **Principio maestro:** una identidad FUR, múltiples redes, relaciones explícitas y trazabilidad extremo a extremo.

---

# 2. MODELO GENERAL DEL COMPONENTE REACT.JS FUR

El componente se concibe como una **plantilla de ficha técnica comercial reutilizable**, configurable por `dominio + familia + subtipo`, sin obligar a todas las redes a utilizar los mismos campos especializados.

## 2.1 Estructura visual común

| Zona | Contenido |
|---|---|
| Encabezado | Código FUR, nombre, TAG, dominio, estado, criticidad, revisión |
| Imagen técnica | Fotografía real, plano, esquema o icono de clase |
| Resumen | Datos principales y KPI del registro |
| Identificación | Clase, familia, subtipo, fabricante/modelo cuando aplique |
| Jerarquía | Planta → área → proceso → sistema → activo/entidad |
| Especialidad | Parámetros propios de PROC/PTE/IOT/GPON/CC/LAB/MNT |
| Relaciones | FUR vinculadas y dependencias |
| Documentos | Manuales, planos, SOP, certificados, reportes |
| Historial | Eventos, cambios, revisiones, lecturas o resultados |
| Acciones | Mapa, dashboard, relacionados, OT, documentos, historial |

## 2.2 Campos comunes obligatorios

- Código FUR único.
- TAG/código operacional cuando exista.
- Nombre.
- Dominio FUR.
- Clase / familia / subtipo.
- Estado.
- Criticidad.
- Responsable.
- Propietario/custodio del dato.
- Planta / área / proceso / ubicación.
- Fecha de alta.
- Última actualización.
- Versión/revisión.
- Fuente del dato.
- Condición del dato: **Confirmado / Referencial / TBC / HOLD**.
- Documentos relacionados.
- FUR relacionadas.
- Historial/auditoría.

## 2.3 Convención recomendada

`FUR-{DOMINIO}-{AREA/ETAPA}-{TIPO}-{SECUENCIA}`

Ejemplos:

- `FUR-PROC-A03-MOL-001`
- `FUR-PTE-A10-TR-001`
- `FUR-IOT-A03-VT-001`
- `FUR-GPON-A11-OLT-001`
- `FUR-CC-A03-MP-001`
- `FUR-LAB-A12-AU-001`
- `FUR-MNT-A03-MB01-001`

La codificación definitiva debe reconciliarse con TAG Register, Equipment Register, Instrument Index, P&ID, planos eléctricos, WMS/CMMS y nomenclatura corporativa.

---

# 3. FUR-PROC — RED TRANSVERSAL DE PROCESOS

## 3.1 Finalidad

Representar cada proceso, subproceso, etapa y subetapa de la planta, vinculando **entradas → transformación → salidas → activos → variables → instrumentación → calidad → documentos → KPI**.

## 3.2 Tipos parametrizables

La parametrización debe admitir la arquitectura maestra de la planta: ROM/recepción, trituración primaria/secundaria, zaranda, almacenamiento, molienda primaria, clasificación, molienda secundaria, hidrociclones, espesamiento, clarificación/deaeración, precipitación/recuperación, filtrado/prensa, secado y fundición, además de las restantes etapas definidas en el Documento Maestro REVEMIN vigente.

## 3.3 Pestañas

**Resumen | General | Flujo | Entradas/Salidas | Variables | Activos | Potencia | IoT | Calidad | Laboratorio | Documentos | KPI | Historial**

## 3.4 Parámetros

| Grupo | Campos |
|---|---|
| Proceso | tipo, etapa, subetapa, disciplina, tecnología |
| Capacidad | nominal, operativa, unidad, utilización |
| Entradas | mineral/material, caudal, granulometría, ley, humedad, reactivos |
| Salidas | producto/intermedio, caudal, granulometría, ley, destino |
| Variables | pH, temperatura, caudal, presión, nivel, densidad, DO, ORP, NaCN, P80, etc. según etapa |
| Operación | modo, estado, setpoints, límites |
| Activos | principales, auxiliares, activo padre/hijo |
| Control | PLC/DCS, lazos, alarmas, interlocks, historian |
| Calidad | puntos de muestra, especificaciones, resultados vinculados |
| Utilities | energía, agua, aire, reactivos |
| Documentación | PFD, P&ID, SOP, balances, manuales |

## 3.5 Ejemplo numérico referencial

**FUR-PROC-A03-MOL-001 — Molienda de Mineral**

- Área: Molienda.
- Entrada: mineral triturado.
- Salida: pulpa a clasificación.
- Variables: caudal, % sólidos, P80, densidad, potencia.
- Activos relacionados: molino, bombas, clasificación/hidrociclones.
- Estado de ejemplo: Operativo.

---

# 4. FUR-PTE — RED TRANSVERSAL DE POTENCIAS ELÉCTRICAS

## 4.1 Finalidad

Registrar activos físicos de generación, transformación, maniobra, protección, distribución, accionamiento y medición eléctrica.

## 4.2 Familias

Generadores; transformadores; barras; celdas MT; interruptores; seccionadores; MCC; tableros; VFD/AFE; motores; UPS; baterías; relés; medidores; alimentadores/cables; puesta a tierra.

## 4.3 Pestañas

**Resumen | Placa | Eléctrico | Protecciones | Alimentadores | Medición | IoT | Mantenimiento | Repuestos | Documentos | Unifilar | Historial**

## 4.4 Parámetros

| Grupo | Campos |
|---|---|
| Placa | fabricante, modelo, serie, año, norma, servicio |
| Ratings | kW/kVA/MVA, V, A, Hz, fases |
| Transformador | V1/V2, conexión, grupo vectorial, Z%, taps, refrigeración |
| Motor | kW/HP, V, A, rpm, cosφ, eficiencia, servicio, arranque |
| Maniobra | clase de tensión, In, capacidad interruptiva |
| Protección | relé, funciones ANSI, CT/PT, ajustes |
| Alimentador | origen, destino, cable, sección, longitud, ampacidad |
| Calidad de energía | V, I, kW, kVA, kvar, PF, Hz, THD |
| Documentos | unifilar, coordinación, FAT/SAT, placa, manual |

## 4.5 Ejemplo del ecosistema

**FUR-PTE-TR-2500-001 — Transformador 2.500 kVA**

- 3Φ, 60 Hz.
- 480 Δ / 2.400 YN.
- ONAN.
- Relaciones: barra, interruptor, protecciones, medición, mantenimiento y documentos.

---

# 5. FUR-IOT — RED TRANSVERSAL IoT / INSTRUMENTACIÓN / EDGE

## 5.1 Finalidad

Registrar sensores, transmisores, analizadores, gateways, PLC/RTU/RIO cuando corresponda, edge devices y PC industriales, conservando la cadena:

`VARIABLE → INSTRUMENTO → ACTIVO/PROCESO → PLC/IED → RED → SCADA → HISTORIAN → FUR`

## 5.2 Familias

LT/LIT; PT/PIT; FT/FIT; TT/TIT; DT/DIT; pH/AIT; ORP; DO; vibración; posición/velocidad; energía; peso; analizadores; visión industrial; gateway; edge computer; PC industrial; PLC/RTU/RIO; protocol gateway.

## 5.3 Pestañas

**Resumen | Variable | Metrología | Señal | Comunicación | PLC/SCADA | Historian | Alarmas | Calibración | Activo/Proceso | Documentos | Historial**

## 5.4 Parámetros

| Grupo | Campos |
|---|---|
| Medición | principio, variable, rango, span, unidad, exactitud, resolución |
| Proceso | activo, etapa, servicio, material/fluido, punto |
| Señal | 4–20 mA, DI/DO, pulse, Ethernet u otra confirmada |
| Red | protocolo, dirección, nodo, puerto, VLAN cuando aplique |
| OPC UA | servidor/endpoint, namespace/NodeId cuando exista |
| MQTT | broker/topic/QoS cuando exista |
| PLC | PLC/RIO/canal/tag |
| SCADA | tag, pantalla, alarma, prioridad |
| Historian | tag, frecuencia, deadband, retención |
| Metrología | calibración, patrón, certificado, fechas |
| Calidad del dato | timestamp, status/calidad, disponibilidad, último valor válido |
| Edge/IPC | CPU, RAM, storage, OS/firmware, interfaces, alimentación |

## 5.5 Ejemplo

**FUR-IOT-A03-VT-001 — Sensor de Vibración de Molino**

- Variable: vibración.
- Activo: molino.
- Área: molienda.
- Rango, protocolo, tags y calibración: **TBC hasta ficha OEM/Instrument Index**.

---

# 6. FUR-GPON — RED TRANSVERSAL GPON

## 6.1 Finalidad

Registrar OLT, ODF, ODN, splitters, backbone, empalmes, cajas, ONU/ONT y elementos de nodo óptico.

## 6.2 Familias

OLT; tarjeta/puerto PON; ODF; splitter; cable FO; fibra/hilo; empalme; cierre; ONU/ONT; switch; SFP; patch cord; gabinete; UPS; transformador de nodo; punto de servicio.

## 6.3 Pestañas

**Resumen | Equipo | Puertos | ODN | Fibra | Potencia Óptica | Topología | Servicios | Energía | Inventario | Documentos | Alarmas | Historial**

## 6.4 Parámetros

| Grupo | Campos |
|---|---|
| OLT | fabricante, modelo, chasis, tarjetas, PON, uplinks, firmware |
| ONU/ONT | fabricante, modelo, serial/LOID si aplica, PON padre, servicios |
| ODN | ratio splitter, nivel de división, entrada/salidas |
| Fibra | tipo, fibras, origen/destino, longitud, ruta |
| Óptico | Tx/Rx, pérdida calculada/medida, margen, clase óptica |
| Empalme | caja, bandeja, hilo, pérdida |
| Servicios | VLAN, CCTV, VoIP, Wi-Fi, DMR/IP, OT/SCADA |
| Energía | entrada, transformador, UPS, carga |
| Pruebas | OTDR, power meter, aceptación |

## 6.5 Base referencial Mina Colombia

- 7 niveles.
- 0–479 m.
- ≈20 km de galerías.
- 56 ONU/ONT como base de diseño.
- División 1:8 conceptual.
- 7 PON activos para 56 ONU en escenario 1:8.
- OLT ≥16 PON como base conceptual.
- Transformación por nodo: 480/120 VAC.

Cada FUR debe almacenar el valor real AS-BUILT/AS-FOUND; no debe copiar automáticamente el dato conceptual.

---

# 7. FUR-CC — RED TRANSVERSAL DE CONTROL DE CALIDAD

## 7.1 Finalidad

Registrar **muestras físicas y su cadena de custodia** desde el punto de muestreo hasta la recepción/preparación en laboratorio. Esta FUR representa la **muestra**, no el resultado analítico.

## 7.2 Familias

Mineral; pulpa; solución; relave; carbón; agua; reactivo; producto/intermedio; blanco; duplicado; estándar/CRM u otros controles QA/QC.

## 7.3 Pestañas

**Resumen | Muestra | Punto de Muestreo | Toma | Cadena de Custodia | Preparación | Solicitud | Resultados Vinculados | Documentos | Historial**

## 7.4 Parámetros

| Grupo | Campos |
|---|---|
| Identidad | FUR muestra, código, lote/campaña |
| Origen | proceso, etapa, activo, corriente, punto |
| Toma | fecha/hora, responsable, método, frecuencia |
| Material | tipo, masa/volumen, estado físico, recipiente |
| Preservación | condición, temperatura, preservante si aplica |
| Custodia | entrega/recepción, responsables, fechas, sellos |
| Solicitud | análisis requeridos, prioridad, laboratorio |
| QA/QC | tipo de control, lote, muestra primaria relacionada |
| Estado | registrada, enviada, recibida, preparación, análisis, cerrada |

## 7.5 Ejemplo

**FUR-CC-A03-MP-001 — Muestra de Pulpa**

- Proceso: molienda/clasificación.
- Punto: definido en plan de muestreo.
- Parámetros solicitados: según plan QA/QC.
- Fecha/hora y responsable: obligatorios.
- Los resultados se vinculan desde FUR-LAB.

---

# 8. FUR-LAB — RED TRANSVERSAL DE LABORATORIOS

## 8.1 Finalidad

Registrar el estudio, ensayo o análisis efectuado sobre una muestra FUR-CC, incluyendo preparación, método, equipo, resultados, QA/QC, validación y certificado.

## 8.2 Familias

Au/Ag; AAS; ICP-OES/ICP; ensayo al fuego; granulometría; pH; conductividad; densidad; humedad; cianuro; preparación de muestra; pruebas metalúrgicas y otros métodos aprobados.

## 8.3 Pestañas

**Resumen | Solicitud | Muestra | Preparación | Método | Equipo | Corrida | Resultados | QA/QC | Validación | Certificado | Documentos | Historial**

## 8.4 Parámetros

| Grupo | Campos |
|---|---|
| Estudio | tipo, método, SOP, versión |
| Muestra | FUR-CC origen, código, matriz |
| Preparación | secado, trituración, pulverización, digestión, dilución |
| Equipo | FUR equipo, fabricante/modelo, calibración |
| Analitos | Au, Ag, Cu, Pb, Zn u otros |
| Resultado | valor, unidad, LOD/LOQ, incertidumbre si aplica |
| QA/QC | blanco, duplicado, CRM, recuperación, aceptación |
| Validación | analista, revisor, aprobador, fecha/hora |
| Estado | recibido, preparación, análisis, revisión, finalizado, rechazado |
| Entregable | informe/certificado y versión |

---

# 9. COMPARACIÓN FUR-IOT ↔ FUR-CC ↔ FUR-LAB

Esta es una relación central del ecosistema:

`PROCESO/ACTIVO → MEDICIÓN IoT → MUESTRA FÍSICA QA/QC → ANÁLISIS LAB → RECONCILIACIÓN/KPI`

| Dimensión | FUR-IOT | FUR-CC | FUR-LAB |
|---|---|---|---|
| Identidad | instrumento | muestra | análisis |
| Origen | activo/punto | punto de muestreo | muestra recibida |
| Variable | valor online | parámetro solicitado | resultado analítico |
| Tiempo | timestamp | fecha/hora toma | fecha/hora análisis |
| Calidad | status del dato | custodia/integridad | QA/QC analítico |
| Método | principio sensor | método de toma | método analítico |
| Evidencia | historian | formulario/etiqueta | informe/certificado |

### Reglas

1. Reconciliar punto, variable, unidad y ventana temporal antes de comparar.
2. La muestra conserva vínculo al proceso/activo/punto.
3. LAB apunta a la FUR-CC exacta.
4. IoT conserva timestamp y calidad.
5. Una desviación genera evento; no altera el dato histórico original.
6. El dashboard puede calcular bias, diferencia absoluta/% y tendencias cuando exista base estadística suficiente.

---

# 10. FUR-MNT — RED TRANSVERSAL DE MANTENIMIENTO

## 10.1 Finalidad

Gestionar la vista de mantenimiento del activo físico, incluyendo planes, OT, inspecciones, condición, fallas, repuestos, consumibles, inventario, documentación y confiabilidad.

## 10.2 Familias

Plan preventivo; OT preventiva; OT correctiva; predictivo/condición; inspección; lubricación; calibración; parada mayor; falla/evento; repuesto; BOM; kit; consumible; herramienta especial.

## 10.3 Pestañas

**Resumen | Activo | Estrategia | Planes | Órdenes de Trabajo | Condición | Fallas | Repuestos/BOM | Inventario | Personal | Documentos | KPI | Historial**

## 10.4 Parámetros

| Grupo | Campos |
|---|---|
| Activo | FUR-AF, TAG, familia, fabricante, modelo, serie |
| Estrategia | preventiva, correctiva, predictiva, RCM/CBM si aplica |
| Plan | tarea, frecuencia, contador, duración, recursos |
| OT | número, prioridad, estado, fechas, ejecutor, hallazgo |
| Falla | modo, mecanismo, causa, consecuencia, downtime |
| Condición | vibración, temperatura, aceite, inspección |
| Repuesto | código, descripción, OEM/alterno, cantidad, criticidad |
| Inventario | almacén, ubicación, stock, mínimo, máximo, reservado |
| KPI | disponibilidad, MTBF, MTTR, PM compliance, backlog |
| Documentos | manual, procedimiento, plano, reporte, evidencia |

## 10.5 Ejemplo

**FUR-MNT-MB01-001 — Mantenimiento Molino de Bolas**

- Activo: FUR-AF del molino.
- Estrategia: preventiva + condición.
- Tareas: inspección, lubricación, vibración, temperatura y transmisión.
- Repuestos: según BOM real.
- Stock: proviene del WMS; no se duplica manualmente.
- OT/historial: CMMS/Odoo Maintenance según arquitectura aprobada.

---

# 11. MATRIZ MAESTRA DE COMPONENTES

| Bloque funcional | PROC | PTE | IOT | GPON | CC | LAB | MNT |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Header/identidad | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Estado/criticidad | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Jerarquía/ubicación | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Parámetros especializados | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Relaciones FUR | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Documentos | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Historial/versiones | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| KPI/dashboard | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Tiempo real | opc. | ✓ | ✓ | ✓ | — | — | opc. |
| Cadena de custodia | — | — | — | — | ✓ | ✓ | — |
| Calibración | — | med. | ✓ | pruebas | opc. | ✓ | opc. |
| Inventario/repuestos | rel. | rel. | rel. | rel. | — | consum. | ✓ |
| OT | rel. | rel. | rel. | rel. | — | rel. | ✓ |

---

# 12. CATÁLOGOS PARAMETRIZABLES

- Dominios.
- Áreas.
- Procesos/etapas.
- Familias/subtipos.
- Estados.
- Criticidad.
- Fabricantes/modelos.
- Unidades.
- Variables.
- Métodos analíticos.
- Protocolos y tipos de señal.
- Tipos de documento.
- Tipos/modos de mantenimiento y falla.
- Almacenes/ubicaciones.
- Roles/responsables.
- Normas/certificados.
- Tipos de muestra.
- Puntos de muestreo.

---

# 13. RELACIONES DEL ECOSISTEMA

`FUR ↔ Proceso ↔ Activo físico ↔ Potencia ↔ IoT ↔ GPON ↔ QA/QC ↔ Laboratorio ↔ Mantenimiento ↔ WMS ↔ Documento ↔ Persona ↔ Proveedor ↔ Curso ↔ Dashboard`

Ejemplo de recorrido:

`Molienda → Molino → Motor/MCC → Sensor vibración → GPON/OT → Muestra de pulpa → Análisis granulométrico/Au → Plan/OT → Repuestos WMS`

---

# 14. ESTADOS Y CICLO DE VIDA

## Registro FUR

Borrador → En revisión → Aprobado → Activo → Suspendido/Obsoleto → Archivado.

## Activo físico

Operativo / En mantenimiento / Fuera de servicio / Standby / En proyecto / Retirado.

Muestras, análisis y órdenes de trabajo utilizan estados específicos y no deben forzarse al catálogo operacional de equipos.

---

# 15. ROLES

Administrador FUR; Gerente de Planta; Operaciones; Ingeniería; Potencia; Instrumentación/OT; Telecom/GPON; QA/QC; Laboratorio; Mantenimiento; WMS/Almacén; HSE; Auditor; Proveedor/Contratista con permisos limitados.

---

# 16. REGLAS DE VALIDACIÓN

1. Código FUR no reutilizable.
2. Dominio, nombre, estado y responsable obligatorios.
3. Valores técnicos con unidad.
4. TBC/HOLD visibles.
5. FUR-LAB siempre vinculada a muestra cuando aplique.
6. Lectura IoT ≠ resultado LAB.
7. Repuestos referencian maestro WMS.
8. Documentos con versión/estado.
9. Cambios críticos auditables.
10. Relaciones mediante identidad maestra, no copias.
11. Timestamps conservan contexto temporal.
12. No asumir protecciones, señales, rangos ni parámetros de seguridad.
13. Imágenes conceptuales no sustituyen evidencia AS-FOUND.

---

# 17. ARQUITECTURA DE INFORMACIÓN

**A. Identidad:** código, TAG, dominio, clase, estado.  
**B. Contexto:** planta, área, proceso, sistema, ubicación.  
**C. Especialidad:** parámetros PROC/PTE/IOT/GPON/CC/LAB/MNT.  
**D. Relaciones:** FUR y sistemas fuente.  
**E. Evidencia:** planos, fotos, certificados, reportes.  
**F. Tiempo:** eventos, lecturas, muestras, análisis, OT, revisiones.  
**G. Analítica:** KPI, alarmas, tendencias, calidad y reconciliación.

---

# 18. INTEGRACIONES FUNCIONALES

| Sistema | Autoridad funcional propuesta |
|---|---|
| FUR | identidad, relaciones, navegación y metadatos maestros |
| Odoo 19 | ERP, organización, compras, proveedores y mantenimiento según módulos adoptados |
| WMS | stock, almacenes, movimientos, repuestos |
| LIMS/QA-QC | workflow de muestras/análisis cuando exista |
| PLC/DCS/RTU | control de proceso |
| SCADA | supervisión |
| Historian | series temporales |
| OPC UA | interoperabilidad/modelado industrial |
| MQTT | mensajería IIoT cuando se apruebe |
| GPON | transporte de comunicaciones |
| Documental | manuales, planos, SOP, certificados |
| BI/Dashboards | KPI y analítica |

---

# 19. BASE EXTERNA DE PARAMETRIZACIÓN

La propuesta se contrastó con documentación pública vigente:

- **React:** arquitectura basada en componentes reutilizables/anidables y presentación de datos, apropiada conceptualmente para un núcleo FUR con especializaciones por dominio.
- **OPC UA:** modelo de información basado en objetos, variables, tipos y referencias, útil para estructurar relaciones semánticas de la red IoT/OT.
- **ISO 14224:2016:** utilizada **solo como referencia metodológica** para separar datos de equipo, fallas y mantenimiento; no se declara aplicabilidad normativa directa a la planta aurífera.
- **ITU-T G.984:** referencia para la familia GPON y atributos asociados a OLT/ONU/ODN.

La aplicabilidad contractual/normativa debe ser validada por la ingeniería del proyecto.

---

# 20. PLANTILLA COMERCIAL GENERAL DE UNA FUR

## FUR — [NOMBRE]

**Código FUR:**  
**TAG:**  
**Red:**  
**Clase/Familia:**  
**Estado:**  
**Criticidad:**  
**Responsable:**  
**Versión:**  

### Información general
- Planta:
- Área:
- Proceso:
- Sistema:
- Ubicación:
- Activo/entidad padre:

### Datos técnicos
- Parámetro 1:
- Parámetro 2:
- Parámetro 3:
- Parámetro 4:

### Relaciones
- Proceso:
- Activo físico:
- Potencia:
- IoT:
- GPON:
- QA/QC:
- Laboratorio:
- Mantenimiento:
- WMS:

### Documentos
- Ficha técnica.
- Manual.
- Plano/esquema.
- Procedimiento.
- Certificado.
- Reporte.

### Accesos
**Ver ficha | Ver mapa | Ver documentos | Ver historial | Ver dashboard | Ver relacionados**

---

# 21. HOLD / TBC PARA INGENIERÍA DE DETALLE

1. Catálogo definitivo de etapas REVEMIN.
2. TAG Register.
3. Equipment Register AS-FOUND.
4. Instrument Index.
5. Lista I/O.
6. Arquitectura PLC/SCADA.
7. Namespace/NodeIds OPC UA.
8. Topics MQTT.
9. GPON AS-BUILT.
10. Seriales OLT/ONU/ONT.
11. Presupuesto óptico por ruta.
12. Puntos oficiales de muestreo.
13. Plan maestro de muestreo.
14. Métodos LAB y versiones.
15. Límites QA/QC.
16. Equipos LAB.
17. Certificados/calibraciones.
18. Taxonomía de mantenimiento.
19. BOM por activo.
20. Maestro de repuestos.
21. Almacenes WMS.
22. Roles/permisos.
23. Matriz RACI.
24. Convención final FUR.
25. Versionado.
26. Integración Odoo 19.
27. Integración LIMS.
28. Integración Historian.
29. GIS/mapa.
30. Ciberseguridad OT/IT.
31. Retención de datos.
32. Backup.
33. Auditoría.
34. KPI oficiales.
35. Diccionario de variables/unidades.

---

# 22. CRITERIOS DE ACEPTACIÓN

La parametrización estará lista para convertirse en especificación de software cuando estén aprobadas las siete plantillas; campos obligatorios/opcionales/condicionales; catálogos; relaciones; estados; fuentes maestras; validaciones; roles; relación IoT–CC–LAB; relación Mantenimiento–WMS–Activo; e integraciones reales.

---

# 23. CONCLUSIÓN

La solución debe implementarse conceptualmente como **un componente FUR común parametrizado por dominio**, no como siete fichas desconectadas. Procesos, potencia, IoT, GPON, control de calidad, laboratorio y mantenimiento comparten identidad, trazabilidad, documentos, relaciones, estados e historial, pero conservan sus campos técnicos especializados.

La relación **FUR-IOT ↔ FUR-CC ↔ FUR-LAB** permite reconciliar medición de campo, muestra física y resultado analítico. La relación **FUR-MNT ↔ Activo ↔ WMS** integra mantenimiento, repuestos e inventario.

> **UNA FUR POR IDENTIDAD · MÚLTIPLES VISTAS POR RED · UNA SOLA TRAZABILIDAD DEL ECOSISTEMA**

---

# 24. REFERENCIAS WEB CONSULTADAS

- React Documentation — https://react.dev/learn
- React Components — https://react.dev/reference/react/components
- OPC UA Overview — https://reference.opcfoundation.org/specs/OPC-10000-1/
- OPC UA Information Model — https://reference.opcfoundation.org/specs/OPC-10000-5
- ISO 14224:2016 — https://www.iso.org/standard/64076.html
- ITU-T G.984-series — https://www.itu.int/ITU-T/recommendations/

> Referencias utilizadas como apoyo conceptual. No sustituyen normas oficiales, ingeniería de detalle ni documentación OEM.

---

**FIN — DOCUMENTO MAESTRO REV.00**


# 76. ANEXO F — 10 REDES FUR × ODOO 19 × REACT.JS

> Se incorpora el documento maestro de las diez redes para conservar pseudocódigo funcional, componentes, tablas y reglas específicas.


# DOCUMENTO MAESTRO — ECOSISTEMA DIGITAL FUR
## 10 Redes Transversales × Odoo 19 × PostgreSQL × Componentes React.js

**Código documental:** `DM-FUR-10REDES-ODOO-REACT-001`  
**Revisión:** `REV.00`  
**Fecha:** `2026-09-16`  
**Estado:** Documento maestro de arquitectura funcional y de datos  
**Entregable:** Markdown autocontenido y descargable  
**Base documental:** diez documentos maestros FUR adjuntos: FUR-PROC, FUR-PTE, FUR-IOT, FUR-GPON, FUR-CC, FUR-LAB, FUR-MNT, FUR-RQ, FUR-OF y FUR-CAM.

> **Criterio de fidelidad.** Los valores de ejemplo, estados, madurez, TBC/HOLD, relaciones y parámetros de cada ficha se conservan según los documentos fuente. Las tablas adicionales y la descomposición de componentes React.js incluidas en este documento se presentan como **arquitectura propuesta de implementación**, no como esquema físico ya validado. Toda tabla/modelo Odoo debe reconciliarse contra la instancia Odoo 19 realmente instalada antes de congelar el diseño.

---

# 1. OBJETIVO

Consolidar en un único Documento Maestro la arquitectura del **Ecosistema Digital FUR** para las diez redes transversales, incluyendo:

1. las **10 fichas técnicas FUR**;
2. la arquitectura híbrida **Odoo 19 nativo + tablas propias `fur.*`**;
3. el listado de tablas nativas Odoo relevantes para cada FUR;
4. el listado de tablas propias del ecosistema por dominio;
5. las relaciones entre las diez redes;
6. la condición y madurez del dato **D0–D5**;
7. la separación entre identidad ERP, identidad FUR y lógica de ingeniería;
8. **10 componentes funcionales React.js por cada red**, total **100 componentes**, descritos **sin código**;
9. pseudocódigo funcional para cada componente;
10. trazabilidad de qué tablas nativas y propias consume cada componente.

---

# 2. LAS 10 REDES TRANSVERSALES

| Código | Red | Objeto principal de la FUR |
| --- | --- | --- |
| FUR-PROC | Procesos | Molino de Bolas MB-01 |
| FUR-PTE | Potencia Eléctrica | Transformador de Potencia 5 MVA — TRF-01 |
| FUR-IOT | IoT / Instrumentación | Sensor de Presión PT-100 |
| FUR-GPON | Comunicaciones GPON | OLT Huawei MA5800 |
| FUR-CC | Control de Calidad | Muestra de mineral MOL-01 |
| FUR-LAB | Laboratorios | Espectrómetro ICP-OES LAB-01 |
| FUR-MNT | Mantenimiento | Bomba de Pulpa BP-01 |
| FUR-RQ | Requisiciones | Requisición de Bomba Centrífuga 6×4 |
| FUR-OF | Ofertas Comerciales | Oferta Bomba de Pulpa Warman 6/4 |
| FUR-CAM | Cámaras / Seguridad | Cámara PTZ CAM-01 |

La arquitectura de las diez redes se interpreta como un único grafo operativo:

```text
FUR-PROC  ←→  FUR-PTE  ←→  FUR-IOT  ←→  FUR-GPON
   ↕             ↕             ↕              ↕
FUR-CC    ←→  FUR-LAB  ←→  FUR-MNT  ←→  FUR-CAM
   ↕                           ↕
FUR-RQ    ←────────────────→ FUR-OF
   │                           │
   └────────────→ PO Odoo ←────┘
```

La identidad y las relaciones se gobiernan desde FUR, mientras que los maestros empresariales permanecen en Odoo y la autoridad operacional especializada permanece en el sistema origen correspondiente.

---

# 3. PRINCIPIOS DE ARQUITECTURA DE DATOS

## 3.1 Patrón híbrido de identidad

```text
Odoo 19
product.template / product.product
        │
        │ identidad ERP catalogable
        ▼
fur_record
        │
        │ identidad maestra FUR
        ▼
fur_<dominio>_<entidad>
        │
        └─ lógica especializada de proceso / potencia / IoT / GPON /
           calidad / laboratorio / mantenimiento / RQ / OF / cámaras
```

## 3.2 Reglas rectoras

- No duplicar maestros nativos cuando Odoo ya dispone de una entidad adecuada.
- `res.partner` gobierna fabricante/proveedor/tercero.
- `res.currency` gobierna moneda.
- `uom.uom` gobierna unidades.
- `stock.location` gobierna ubicación ERP.
- `stock.lot` gobierna lote/serie cuando aplique.
- `maintenance.equipment` gobierna el equipo mantenible.
- `ir.attachment` gobierna el binario documental.
- `purchase.order` gobierna la orden de compra final.
- FUR-RQ y FUR-OF mantienen identidad y lógica propias; no se sustituyen con `purchase.order`.
- `product.supplierinfo` no sustituye una oferta técnico-comercial completa.
- La serie temporal IoT no se almacena en `product.template` ni en `fur_record`; FUR mantiene contexto y referencia a Historian.
- Todo campo crítico debe poder expresar **condición del dato** y **madurez**.
- Se mantiene 1FN: listas técnicas, líneas, analitos, relaciones, repuestos, documentos o aprobaciones se modelan como registros relacionados, no como cadenas separadas por comas.

## 3.3 Condición del dato

- **Confirmado**
- **Referencial**
- **TBC**
- **HOLD**

## 3.4 Madurez D0–D5

| Nivel | Interpretación |
|---|---|
| D0 | Hipótesis / sin datos |
| D1 | Referencial / estimado |
| D2 | Preliminar / levantamiento |
| D3 | Validado / en revisión |
| D4 | Operacional / con evidencia |
| D5 | Trazable / histórico completo |

---

# 4. TABLAS PROPIAS COMUNES DEL ECOSISTEMA

Estas tablas constituyen la capa transversal compartida por todas las FUR.

| Tabla lógica `fur.*` | Responsabilidad |
| --- | --- |
| fur_record | Identidad maestra FUR: UUID inmutable, fur_code UNIQUE, red, estado, versión, madurez global. |
| fur_relation | Relaciones transversales entre FUR con tipo, cardinalidad, vigencia y dirección. |
| fur_document_link | Metadatos de vínculo documental hacia `ir_attachment`; tipo, revisión, estado y vigencia. |
| fur_audit_event | Evento de auditoría: quién, cuándo, qué cambió, motivo y referencia. |
| fur_data_quality | Condición Confirmado/Referencial/TBC/HOLD y madurez D0–D5 por campo crítico. |
| fur_status_history | Historial de cambios de estado maestro. |
| fur_lifecycle_event | Alta, puesta en servicio, inspección, suspensión, retiro u otro evento de ciclo de vida. |
| fur_responsibility | Propietario funcional, custodio, responsable técnico y aprobador. |
| fur_search_alias | Sinónimos, códigos externos y términos indexables. |
| fur_external_reference | Referencias controladas a sistemas fuente: ERP, SCADA/Historian, LIMS, NMS, etc. |

## 4.1 Claves y restricciones mínimas propuestas

- `fur_record.id`: clave interna inmutable.
- `fur_record.fur_code`: `UNIQUE`, indexada.
- `fur_relation`: índices por FUR origen, FUR destino, tipo y vigencia.
- `fur_document_link`: índice por FUR, tipo documental, revisión y estado.
- `fur_data_quality`: índice por FUR, entidad/campo y condición.
- `fur_audit_event`: índice por FUR y timestamp.
- Códigos de muestra, seriales, tags, RQ y ofertas deben tener restricciones `UNIQUE` propias cuando la semántica lo requiera.
- Las relaciones N:M deben materializarse mediante tablas explícitas, no listas de IDs embebidas.

---

# 5. CATÁLOGO MAESTRO DE MODELOS/TABLAS NATIVAS ODOO 19

Los documentos fuente utilizan nombres ORM con notación de punto. La columna “tabla PostgreSQL orientativa” aplica la convención habitual de Odoo y debe verificarse contra la instancia real.

| Modelo ORM Odoo | Tabla PostgreSQL orientativa | Uso en el Ecosistema FUR |
| --- | --- | --- |
| product.template | product_template | Maestro de producto/equipo catalogable; no almacenar allí lógica especializada FUR. |
| product.product | product_product | Variante inventariable cuando aplique. |
| product.category | product_category | Clasificación ERP. |
| res.partner | res_partner | Fabricantes, proveedores y terceros. |
| res.currency | res_currency | Monedas. |
| uom.uom | uom_uom | Unidades de medida. |
| stock.location | stock_location | Ubicaciones / almacenes ERP. |
| stock.lot | stock_lot | Lotes / números de serie. |
| maintenance.equipment | maintenance_equipment | Equipos mantenibles. |
| maintenance.request | maintenance_request | Solicitudes/órdenes de mantenimiento según configuración. |
| product.supplierinfo | product_supplierinfo | Información de proveedor/precio de catálogo; no sustituye FUR-OF. |
| ir.attachment | ir_attachment | Binarios/documentos. |
| purchase.order | purchase_order | Orden de compra aprobada; no sustituye FUR-RQ ni FUR-OF. |
| purchase.order.line | purchase_order_line | Líneas de PO. |
| hr.employee | hr_employee | Personas/empleados responsables. |
| res.users | res_users | Usuarios y seguridad. |
| mail.message | mail_message | Mensajería / chatter / trazabilidad. |
| mail.activity | mail_activity | Actividades y seguimiento. |
| purchase.requisition | purchase_requisition | Modelo mostrado en la ficha FUR-RQ; verificar que el módulo correspondiente exista en la instancia Odoo 19. |
| purchase.requisition.line | purchase_requisition_line | Líneas mostradas en la ficha FUR-RQ; verificar módulo/estructura real. |

> **HOLD de implementación Odoo:** el modelo `purchase.requisition` aparece en la ficha FUR-RQ fuente, pero su disponibilidad y estructura exacta dependen de los módulos instalados. Debe verificarse antes de usarlo como dependencia. La arquitectura canónica del Ecosistema mantiene **FUR-RQ** como entidad propia y utiliza Odoo para los maestros y para el **PO final**.

---

# 6. AUTORIDAD DEL DATO

| Dominio de dato | Autoridad recomendada |
|---|---|
| Fabricante / proveedor | Odoo `res.partner` |
| Producto / repuesto catalogable | Odoo `product.template` / `product.product` |
| Moneda | Odoo `res.currency` |
| UoM | Odoo `uom.uom` |
| Serie / lote | Odoo `stock.lot` |
| Ubicación ERP | Odoo `stock.location` |
| Equipo mantenible | Odoo `maintenance.equipment` |
| Orden de compra | Odoo `purchase.order` |
| Binario documental | Odoo `ir.attachment` |
| Identidad, relaciones, estado, madurez y auditoría FUR | `fur_record` + tablas comunes |
| Datos técnicos especializados | `fur_<dominio>_*` |
| Series temporales IoT | Historian / SCADA; FUR solo conserva metadatos y referencia |
| Resultados LIMS | LIMS / tabla FUR-LAB según política; preservar origen y método |
| Alarmas NMS GPON | NMS; FUR conserva referencia/estado necesario |
| Requisición interna | FUR-RQ |
| Oferta técnico-comercial | FUR-OF |

---

# 7. INVENTARIABILIDAD DE LAS FUR

La **FUR no es por sí misma un bien inventariable**. Cuando el objeto físico es catalogable, su identidad ERP puede representarse en `product.template/product.product` y su serie en `stock.lot`. Las entidades transaccionales **FUR-RQ** y **FUR-OF** no deben convertirse en bienes inventariables.

| Red | Tratamiento |
|---|---|
| FUR-PROC | El equipo físico puede ser catalogable; la FUR es expediente/contexto |
| FUR-PTE | El activo físico puede ser catalogable; la FUR es expediente técnico |
| FUR-IOT | El instrumento puede ser catalogable; la serie temporal queda fuera de ERP/FUR |
| FUR-GPON | OLT/ONU/splitter pueden ser catalogables; topología y pruebas son FUR |
| FUR-CC | La muestra es entidad de trazabilidad; no se trata como producto comercial por defecto |
| FUR-LAB | El equipo puede ser catalogable; corrida/resultado son entidades especializadas |
| FUR-MNT | Activo y repuestos pueden ser inventariables; planes/fallas/KPI no |
| FUR-RQ | No inventariable |
| FUR-OF | No inventariable |
| FUR-CAM | Cámara/NVR pueden ser catalogables; eventos/evidencia no |

---

# 8. MATRIZ MAESTRA DE RELACIONES ENTRE REDES

```text
FUR-PROC
  ├─ consume / recibe servicio de → FUR-PTE
  ├─ es medido por → FUR-IOT
  ├─ se comunica mediante → FUR-GPON
  ├─ es muestreado por → FUR-CC
  ├─ usa resultados de → FUR-LAB
  ├─ es mantenido mediante → FUR-MNT
  ├─ genera necesidades → FUR-RQ
  ├─ recibe soluciones/ofertas → FUR-OF
  └─ es supervisado por → FUR-CAM

FUR-RQ → genera/recibe → FUR-OF → puede convertirse en → purchase.order
```

---

# 9. CRITERIOS PARA LOS COMPONENTES REACT.JS

Los componentes definidos en este documento son **componentes funcionales**, no código. Cada uno especifica:

1. responsabilidad visual/funcional;
2. pseudocódigo de comportamiento;
3. tablas nativas Odoo consultadas;
4. tablas propias `fur.*`;
5. regla de autoridad del dato.

Pseudocódigo significa aquí una secuencia conceptual tipo:

> **Cargar → Validar → Relacionar → Mostrar → Registrar auditoría**

No se incluye JSX, TSX, JavaScript ni TypeScript.

---

# 10. FICHA TÉCNICA MAESTRA — FUR-PROC — PROCESOS

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_PROC_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-PROC-00123` — **Molino de Bolas MB-01**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 82 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Identificar y contextualizar procesos, equipos de proceso, condiciones de operación, corrientes, KPI y relaciones con las demás redes.

## Flujo funcional fuente

```text
Chancado → Molienda → Clasificación → Lixiviación → Adsorción → Desorción → Refinación → Oro Doré
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo / familia | Equipo de proceso / Molienda |
| Capacidad nominal | 450 t/h — Confirmado / D4 |
| Potencia instalada | 3.500 kW — Confirmado / D4 |
| Velocidad | 11,5 rpm — Confirmado / D4 |
| Dimensiones | Ø 3,6 × 4,8 m — Confirmado / D4 |
| Descarga | Rejilla — Confirmado / D4 |
| Liners | Acero al manganeso — Referencial / D3 |
| Flujo de alimentación | 400 t/h — Referencial / D3 |
| Alimentación | P80 10 mm — Referencial / D3 |
| Producto | P80 150 µm — Referencial / D3 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP catalogable / nombre |
| product.category | product_category | Clasificación del activo |
| stock.location | stock_location | Ubicación ERP |
| maintenance.equipment | maintenance_equipment | Equipo mantenible |
| stock.lot | stock_lot | Serie/lote cuando aplique |
| res.partner | res_partner | Fabricante / proveedor |
| product.supplierinfo | product_supplierinfo | Precio/proveedor referencial |
| ir.attachment | ir_attachment | Documentos y evidencia |
| uom.uom | uom_uom | Unidades de medida |
| mail.message / mail.activity | mail_message / mail_activity | Trazabilidad colaborativa |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_proc_nameplate | Placa y datos nominales |
| fur_proc_operating | Condiciones de operación |
| fur_proc_efficiency | Rendimiento y KPI |
| fur_proc_media | Carga y medios de molienda |
| fur_proc_liner | Revestimientos |
| fur_proc_inspection | Inspecciones de proceso |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_proc_stream | Entradas, salidas y corrientes de proceso |
| fur_proc_parameter | Variables, setpoints, límites y unidades |
| fur_proc_asset_link | Relación N:M proceso ↔ activo |
| fur_proc_kpi | KPI de proceso e histórico de metas |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR de Proceso | Recuperar identidad → mostrar estado, versión y madurez → validar código único | product_template; maintenance_equipment | fur_record; fur_status_history |
| 2 | Jerarquía de Proceso | Resolver sitio → área → proceso → sistema → ubicación → mostrar contexto | stock_location | fur_record; fur_proc_asset_link |
| 3 | Flujo Entradas/Salidas | Cargar corrientes → ordenar por secuencia → presentar origen/destino y unidad | uom_uom | fur_proc_stream; fur_relation |
| 4 | Parámetros de Operación | Cargar variable → valor/setpoint/límite → condición del dato → madurez | uom_uom | fur_proc_parameter; fur_proc_operating |
| 5 | Activos del Proceso | Buscar activos vinculados → agrupar por función → abrir FUR relacionada | maintenance_equipment; product_template | fur_proc_asset_link; fur_relation |
| 6 | KPI y Eficiencia | Cargar KPI → comparar referencia vs dato vigente → señalar condición TBC/HOLD | uom_uom | fur_proc_efficiency; fur_proc_kpi; fur_data_quality |
| 7 | Relaciones Transversales | Consultar relaciones activas → agrupar PTE/IOT/CC/LAB/MNT/CAM/RQ/OF | — | fur_relation |
| 8 | Documentos de Proceso | Listar documentos vigentes → mostrar revisión/estado → abrir evidencia | ir_attachment | fur_document_link |
| 9 | Comercial / Sourcing | Resolver fabricante/proveedor → precio referencial → RQ/OF/PO asociados | res_partner; product_supplierinfo; res_currency; purchase_order | fur_relation |
| 10 | Calidad, Auditoría y Ciclo de Vida | Evaluar madurez → listar pendientes → registrar eventos y cambios | mail_message; mail_activity; res_users | fur_data_quality; fur_audit_event; fur_lifecycle_event |

## Reglas funcionales específicas

- No duplicar en la ficha valores cuya autoridad sea un sistema de proceso/historian; conservar contexto y evidencia.
- Relacionar explícitamente proceso ↔ activo ↔ variable ↔ calidad ↔ mantenimiento.
- P80, capacidad, flujo y KPI deben portar unidad, condición y madurez.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **82 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 11. FICHA TÉCNICA MAESTRA — FUR-PTE — POTENCIA ELÉCTRICA

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_PTE_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-PTE-PB01-TRF-0001` — **Transformador de Potencia 5 MVA — TRF-01**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 78 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar identidad y expediente técnico de generación, transformación, distribución, protección, alimentadores, medición y pruebas eléctricas.

## Flujo funcional fuente

```text
Red externa 34,5 kV → Transformación 34,5/4,16 kV → Tablero principal 4,16 kV → Distribución → Motores y cargas
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Potencia nominal | 5 MVA — Confirmado / D4 |
| Tensión primaria | 34,5 kV — Confirmado / D4 |
| Tensión secundaria | 4,16 kV — Confirmado / D4 |
| Frecuencia | 60 Hz — Confirmado / D4 |
| Enfriamiento | ONAN/ONAF — Confirmado / D4 |
| Impedancia | 7,5 % — Referencial / D3 |
| Grupo de conexión | Dyn11 — Confirmado / D4 |
| Aislamiento | BIL 170 kV — Referencial / D3 |
| Fabricación | 2022 — Confirmado / D4 |
| Vida útil estimada | 30 años — Referencial / D3 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP catalogable |
| maintenance.equipment | maintenance_equipment | Activo mantenible |
| res.partner | res_partner | Fabricante / proveedor |
| stock.lot | stock_lot | Número de serie |
| stock.location | stock_location | Ubicación |
| product.supplierinfo | product_supplierinfo | Precio/proveedor referencial |
| res.currency | res_currency | Moneda |
| ir.attachment | ir_attachment | Planos, pruebas, certificados |
| maintenance.request | maintenance_request | OT / solicitudes de mantenimiento |
| purchase.order | purchase_order | Orden de compra final |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_power_nameplate | Datos nominales y placa |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_power_rating | Ratings eléctricos y térmicos |
| fur_power_protection | Protecciones, ANSI, ajustes y relés |
| fur_power_feeder | Alimentadores y relación fuente/carga |
| fur_power_metering | Medición, energía y calidad de potencia |
| fur_power_connection | Grupo vectorial / conexiones / bornes |
| fur_power_insulation | BIL, aislamiento y pruebas dieléctricas |
| fur_power_test | Pruebas FAT/SAT/puesta en servicio |
| fur_power_cable | Cables, sección, longitud y ampacidad |
| fur_power_kpi | Disponibilidad, carga, pérdidas, alarmas |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR de Potencia | Cargar FUR → mostrar activo, estado, versión y madurez → validar unicidad | product_template; maintenance_equipment | fur_record; fur_status_history |
| 2 | Jerarquía Eléctrica | Resolver sitio → subestación → barra → alimentador → carga → ubicación | stock_location | fur_power_feeder; fur_relation |
| 3 | Placa y Ratings | Cargar placa → tensiones/potencia/frecuencia → condición → madurez | uom_uom | fur_power_nameplate; fur_power_rating |
| 4 | Protecciones | Cargar funciones → relé → ajustes → activo protegido → revisión vigente | — | fur_power_protection; fur_document_link |
| 5 | Alimentadores y Cables | Resolver fuente/carga → cable → capacidad → estado → relación eléctrica | product_template | fur_power_feeder; fur_power_cable; fur_relation |
| 6 | Medición y Calidad de Potencia | Cargar puntos de medida → magnitudes → referencia → KPI / alarmas | uom_uom | fur_power_metering; fur_power_kpi |
| 7 | Unifilar y Relaciones | Cargar relaciones eléctricas → construir topología lógica → enlazar documentos | ir_attachment | fur_relation; fur_document_link |
| 8 | Pruebas y Mantenimiento | Listar pruebas → OT → resultado → vigencia → próxima inspección | maintenance_request; maintenance_equipment | fur_power_test; fur_lifecycle_event |
| 9 | Comercial / Sourcing PTE | Resolver fabricante/proveedor → precio → garantía → RQ/OF/PO | res_partner; product_supplierinfo; res_currency; purchase_order | fur_relation |
| 10 | Calidad, Auditoría y Pendientes | Calcular madurez → marcar TBC/HOLD → registrar cambio y aprobador | mail_message; res_users | fur_data_quality; fur_audit_event |

## Reglas funcionales específicas

- Los ratings y protecciones deben conservar revisión y fuente documental.
- La topología eléctrica se modela mediante relaciones explícitas; no como texto libre.
- Pruebas, ajustes y curvas históricas permanecen separadas de la placa nominal.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **78 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 12. FICHA TÉCNICA MAESTRA — FUR-IOT — IOT / INSTRUMENTACIÓN

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_IOT_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-IOT-001045` — **Sensor de Presión PT-100**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 86 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar instrumentos, variables, rangos, tags, calibración, conectividad y referencias a PLC/SCADA/Historian sin duplicar series temporales.

## Flujo funcional fuente

```text
Sensor → Gateway → PLC/SCADA → Historian → Odoo 19 / FUR-IOT → Dashboards / KPI
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | Sensor de presión — Confirmado / D4 |
| Variable | Presión de pulpa — Confirmado / D4 |
| Rango | 0–10 bar — Confirmado / D4 |
| Señal | 4–20 mA + HART — Confirmado / D4 |
| Integración | HART / OPC UA Gateway — Referencial / D3 |
| Muestreo | 1 s — Referencial / D3 |
| Alimentación | 24 VDC — Confirmado / D4 |
| Precisión | ±0,1 % FS — Referencial / D3 |
| Calibración | 2026-08-15 — Confirmado / D4 |
| Estado comunicación | Online — Confirmado / D4 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP del instrumento |
| product.category | product_category | Clase/familia |
| stock.location | stock_location | Ubicación |
| maintenance.equipment | maintenance_equipment | Equipo mantenible |
| stock.lot | stock_lot | Número de serie |
| res.partner | res_partner | Fabricante/proveedor |
| product.supplierinfo | product_supplierinfo | Precio y proveedor |
| ir.attachment | ir_attachment | Datasheet, lazo, P&ID, calibración |
| maintenance.request | maintenance_request | OT asociadas |
| uom.uom | uom_uom | Unidades de variable |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_iot_nameplate | Placa y datos nominales |
| fur_iot_variable | Variable y unidad |
| fur_iot_range | Rangos y alarmas |
| fur_iot_tag | Tag / lazo / punto de medición |
| fur_iot_calibration | Calibración y certificados |
| fur_iot_connectivity | Integración, gateway y protocolo |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_iot_alarm | Alarmas, prioridad y límites |
| fur_iot_scada_mapping | PLC/SCADA tag, canal y pantalla |
| fur_iot_historian_ref | Referencia a historian; no series temporales |
| fur_iot_cyber_profile | Firmware, criticidad OT y postura de ciberseguridad |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR de Instrumento | Cargar identidad → estado → versión → madurez → criticidad | product_template; maintenance_equipment | fur_record; fur_status_history |
| 2 | Variable y Rango | Cargar variable → unidad → rango → exactitud → condición/madurez | uom_uom | fur_iot_variable; fur_iot_range |
| 3 | Tag, Señal y Lazo | Resolver tag → lazo → tipo de señal → punto de medición | — | fur_iot_tag; fur_relation |
| 4 | Conectividad y Gateway | Cargar protocolo → gateway → IP/puerto/VLAN si aplica → estado | — | fur_iot_connectivity; fur_iot_cyber_profile |
| 5 | Mapeo PLC / SCADA | Resolver PLC/canal/tag → pantalla SCADA → alarmas asociadas | — | fur_iot_scada_mapping; fur_iot_alarm |
| 6 | Historian y Tendencias | Mostrar referencia de historian → ventana temporal → calidad del dato; no duplicar serie | — | fur_iot_historian_ref |
| 7 | Alarmas / Interlocks | Cargar límites → prioridad → estado → relación con proceso/activo | — | fur_iot_alarm; fur_relation |
| 8 | Calibración / Metrología | Cargar última calibración → certificado → vencimiento → pendiente | ir_attachment; maintenance_request | fur_iot_calibration; fur_document_link |
| 9 | Comercial / Sourcing IoT | Resolver fabricante, modelo, serie, proveedor, garantía, RQ/OF/PO | res_partner; stock_lot; product_supplierinfo; res_currency; purchase_order | fur_relation |
| 10 | Calidad / Ciberseguridad / Auditoría | Evaluar madurez → firmware/criticidad → TBC/HOLD → evento de cambio | mail_message; res_users | fur_data_quality; fur_iot_cyber_profile; fur_audit_event |

## Reglas funcionales específicas

- No almacenar series temporales en `product_template` ni `fur_record`.
- Separar variable, rango, tag, calibración y conectividad.
- Toda referencia SCADA/Historian debe preservar sistema origen, tag, timestamp y calidad.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **86 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 13. FICHA TÉCNICA MAESTRA — FUR-GPON — COMUNICACIONES GPON

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_GPON_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-GPON-0231` — **OLT Huawei MA5800**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 84 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar activos y topología GPON/ODN, puertos, splitters, fibra, ONU/ONT, presupuesto óptico, OTDR y servicios.

## Flujo funcional fuente

```text
Core/Router → OLT → Splitter 1:8 → Fibra troncal → ONU/ONT → CCTV/Voz/Datos/SCADA
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | OLT GPON — Confirmado / D4 |
| Capacidad | 32 puertos GPON — Confirmado / D4 |
| Tarjetas activas | 8 — Confirmado / D4 |
| Uplink | 10GE — Confirmado / D4 |
| Split ratio | 1:8 — Referencial / D3 |
| Presupuesto óptico | 28 dB — Referencial / D3 |
| Latencia | <2 ms — Referencial / D3 |
| Fibra | Monomodo OS2 — Confirmado / D4 |
| ONU asociadas | 248 — Referencial / D3 |
| Redundancia | Fuente dual — Confirmado / D4 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP del equipo |
| product.category | product_category | Categoría |
| stock.location | stock_location | Sala/rack/ubicación |
| maintenance.equipment | maintenance_equipment | Activo mantenible |
| stock.lot | stock_lot | Serie |
| res.partner | res_partner | Fabricante/integrador |
| product.supplierinfo | product_supplierinfo | Precio/proveedor |
| ir.attachment | ir_attachment | Planos, OTDR, listas, certificados |
| maintenance.request | maintenance_request | OT |
| purchase.order | purchase_order | PO final |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_gpon_nameplate | Placa y datos nominales |
| fur_gpon_port | Puertos PON y uplinks |
| fur_gpon_splitter | Topología de splitters |
| fur_gpon_optical_budget | Presupuesto óptico |
| fur_gpon_onu_link | Relación OLT–ONU |
| fur_gpon_otdr_test | Pruebas y trazas OTDR |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_gpon_fiber_segment | Segmentos de fibra y rutas |
| fur_gpon_splice | Empalmes, cierres y pérdidas |
| fur_gpon_service | Servicios por ONU/ONT |
| fur_gpon_nms_alarm | Alarmas NMS y estado de red |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR GPON | Cargar identidad de nodo → estado → versión → madurez | product_template; maintenance_equipment | fur_record; fur_status_history |
| 2 | Chasis y Puertos PON | Cargar chasis/tarjetas → puertos → estado/ocupación → uplinks | — | fur_gpon_nameplate; fur_gpon_port |
| 3 | Topología ODN | Construir OLT → splitter → fibra → ONU mediante relaciones vigentes | stock_location | fur_gpon_splitter; fur_gpon_fiber_segment; fur_relation |
| 4 | Splitters | Listar splitters → ratio → puerto padre → destinos → condición | — | fur_gpon_splitter |
| 5 | Fibra / Empalmes | Cargar segmento → origen/destino → longitud → empalmes → pérdida | — | fur_gpon_fiber_segment; fur_gpon_splice |
| 6 | Presupuesto Óptico | Sumar pérdidas de diseño → comparar con objetivo/medición → marcar margen | uom_uom | fur_gpon_optical_budget |
| 7 | ONU/ONT y Servicios | Listar ONU → puerto PON → servicios Voz/Datos/CCTV/SCADA → estado | product_template | fur_gpon_onu_link; fur_gpon_service |
| 8 | OTDR / NMS / Alarmas | Listar pruebas OTDR → alarmas NMS → fecha/estado → evidencia | ir_attachment; maintenance_request | fur_gpon_otdr_test; fur_gpon_nms_alarm |
| 9 | Comercial / Sourcing GPON | Resolver fabricante/integrador → precio → garantía → RQ/OF/PO | res_partner; product_supplierinfo; res_currency; purchase_order | fur_relation |
| 10 | Calidad / Auditoría GPON | Evaluar potencia/topología/OTDR → TBC/HOLD → registrar revisión | mail_message; res_users | fur_data_quality; fur_audit_event |

## Reglas funcionales específicas

- Separar chasis/puertos, ODN, splitters, fibra, ONU/ONT y pruebas OTDR.
- El presupuesto óptico debe distinguir valor de diseño, valor medido y margen.
- Las alarmas NMS mantienen referencia a su sistema fuente.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **84 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 14. FICHA TÉCNICA MAESTRA — FUR-CC — CONTROL DE CALIDAD

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_CC_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-CC-00087` — **Muestra de mineral MOL-01**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 86 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar la identidad y trazabilidad de la muestra física, punto de muestreo, cadena de custodia, especificaciones, QA/QC y vínculo con laboratorio.

## Flujo funcional fuente

```text
Muestreo → Preparación → Análisis en laboratorio → Resultados → Validación → Trazabilidad → Decisiones
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Código de muestra | MOL-01 — Confirmado / D4 |
| Tipo | Compuesta — Confirmado / D4 |
| Masa | 500 g — Confirmado / D4 |
| Humedad | 8,5 % — Confirmado / D4 |
| P80 | 150 µm — Confirmado / D4 |
| Ley Au | 2,56 g/t — Confirmado / D4 |
| Ley Ag | 12,8 g/t — Confirmado / D4 |
| Método | Fire Assay — Confirmado / D4 |
| Equipo | AA-7000 — Confirmado / D4 |
| Resultado | Conforme a especificación — Confirmado / D4 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP cuando aplique al equipo/consumible; no sustituye identidad de muestra |
| maintenance.equipment | maintenance_equipment | Equipo analítico relacionado |
| res.partner | res_partner | Laboratorio/proveedor de servicios |
| uom.uom | uom_uom | Unidades de masa, humedad, ley |
| ir.attachment | ir_attachment | Cadena de custodia, informes, fotos |
| stock.location | stock_location | Ubicación física cuando se gestione en ERP |
| res.users | res_users | Responsables/aprobadores |
| hr.employee | hr_employee | Personal responsable |
| mail.message | mail_message | Trazabilidad colaborativa |
| res.currency | res_currency | Moneda del bloque comercial |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_cc_sample | Datos de muestra |
| fur_cc_analysis | Resultados de análisis |
| fur_cc_method | Métodos de ensayo |
| fur_cc_spec | Límites de especificación |
| fur_cc_chain | Cadena de custodia |
| fur_cc_certificate | Certificados de calidad |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_cc_sampling_point | Punto de muestreo y contexto de proceso |
| fur_cc_custody_event | Eventos individuales de cadena de custodia |
| fur_cc_qaqc_control | Duplicados, blancos, patrones y controles |
| fur_cc_release | Liberación, retención y disposición |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR de Muestra | Cargar muestra → estado → versión → madurez → código único de muestra | — | fur_record; fur_cc_sample |
| 2 | Punto de Muestreo | Resolver proceso/activo → punto → ubicación → frecuencia/método | stock_location | fur_cc_sampling_point; fur_relation |
| 3 | Toma de Muestra | Registrar fecha/hora → responsable → masa/volumen → condición → recipiente | hr_employee; uom_uom | fur_cc_sample; fur_lifecycle_event |
| 4 | Cadena de Custodia | Ordenar eventos → responsable/origen/destino → integridad → firma/estado | res_users | fur_cc_chain; fur_cc_custody_event |
| 5 | Preparación de Muestra | Cargar etapa de preparación → método → responsable → evidencia | ir_attachment | fur_cc_method; fur_document_link |
| 6 | Solicitud de Análisis | Generar vínculo a FUR-LAB → analitos requeridos → prioridad → estado | — | fur_relation; fur_cc_analysis |
| 7 | Especificaciones y QA/QC | Cargar límites → controles QA/QC → comparar resultado → estado de conformidad | uom_uom | fur_cc_spec; fur_cc_qaqc_control |
| 8 | Resultados Vinculados | Consultar resultados LAB → mostrar método/unidad/fecha → preservar fuente | — | fur_cc_analysis; fur_relation |
| 9 | Documentos / Evidencia | Listar cadena, informe, certificado, foto, procedimiento → revisión/estado | ir_attachment | fur_document_link; fur_cc_certificate |
| 10 | Calidad / Auditoría / Liberación | Evaluar madurez → pendientes → liberar/retener → registrar auditoría | mail_message; res_users | fur_data_quality; fur_cc_release; fur_audit_event |

## Reglas funcionales específicas

- La muestra física no se confunde con el resultado analítico.
- La cadena de custodia se modela como eventos trazables.
- Toda comparación con laboratorio conserva fuente, método, unidad y timestamp.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **86 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 15. FICHA TÉCNICA MAESTRA — FUR-LAB — LABORATORIOS

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_LAB_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-LAB-00478` — **Espectrómetro ICP-OES LAB-01**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 84 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar equipos/métodos/corridas/resultados analíticos, calibración, incertidumbre, QA/QC e integración lógica con LIMS.

## Flujo funcional fuente

```text
Muestreo → Preparación → Digestión → Análisis ICP-OES → QA/QC → Reporte LIMS
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | ICP-OES — Confirmado / D4 |
| Técnica | ICP-OES multielemental — Confirmado / D4 |
| Matriz | Solución digerida — Referencial / D3 |
| Elementos | Au, Ag, Cu, Fe, Zn, Pb — Referencial / D3 |
| Rango | 0,01–1000 mg/L — Referencial / D3 |
| Precisión | ±2 %RSD — Referencial / D3 |
| LOD Au | 0,005 mg/L — Referencial / D3 |
| Corrida | 4–6 min — Referencial / D3 |
| Calibración | Diaria — Referencial / D3 |
| LIMS | Activa — Confirmado / D4 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP del equipo |
| product.category | product_category | Categoría |
| stock.location | stock_location | Sala/banco |
| maintenance.equipment | maintenance_equipment | Equipo mantenible |
| stock.lot | stock_lot | Serie |
| res.partner | res_partner | Fabricante/distribuidor |
| ir.attachment | ir_attachment | Métodos, calibración, IQ/OQ/PQ |
| maintenance.request | maintenance_request | OT / servicio |
| uom.uom | uom_uom | Unidades analíticas |
| product.supplierinfo | product_supplierinfo | Proveedor/precio referencial |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_lab_method | Métodos y matrices |
| fur_lab_sample | Muestras y cadena de custodia |
| fur_lab_result | Analitos y resultados |
| fur_lab_uncertainty | Incertidumbre |
| fur_lab_calibration | Curvas y calibración |
| fur_lab_qaqc | Blancos, duplicados, estándares |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_lab_run | Corrida analítica y secuencia |
| fur_lab_analyte | Catálogo de analitos y unidades |
| fur_lab_instrument_link | Equipo utilizado por corrida |
| fur_lab_lims_link | Referencia y sincronización lógica con LIMS |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR LAB | Cargar identidad de equipo/estudio → estado → versión → madurez | product_template; maintenance_equipment | fur_record; fur_status_history |
| 2 | Solicitud y Muestra | Resolver muestra FUR-CC → solicitud → prioridad → cadena de custodia | — | fur_lab_sample; fur_relation |
| 3 | Preparación y Método | Cargar método → versión → matriz → preparación requerida → documento vigente | ir_attachment | fur_lab_method; fur_document_link |
| 4 | Corrida Analítica | Crear contexto de corrida → equipo → fecha → secuencia → estado | maintenance_equipment | fur_lab_run; fur_lab_instrument_link |
| 5 | Analitos y Resultados | Cargar analitos → resultado → unidad → LOD/LOQ si aplica → condición | uom_uom | fur_lab_analyte; fur_lab_result |
| 6 | Incertidumbre y QA/QC | Mostrar incertidumbre → blancos/duplicados/estándares → aceptación/rechazo | — | fur_lab_uncertainty; fur_lab_qaqc |
| 7 | Calibración del Equipo | Cargar curva/certificado → vigencia → estado → próximo vencimiento | ir_attachment; maintenance_request | fur_lab_calibration |
| 8 | Integración LIMS | Resolver ID LIMS → estado → referencia de reporte; no duplicar autoridad del sistema origen | — | fur_lab_lims_link; fur_relation |
| 9 | Documentos / Sourcing | Listar manual/SOP/método/IQ-OQ-PQ y fabricante/proveedor/RQ-OF-PO | res_partner; product_supplierinfo; ir_attachment | fur_document_link; fur_relation |
| 10 | Validación / Gobierno / Auditoría | Revisar QA/QC → madurez → aprobador → TBC/HOLD → auditoría | res_users; hr_employee; mail_message | fur_data_quality; fur_audit_event |

## Reglas funcionales específicas

- El resultado no sobreescribe la identidad de la muestra FUR-CC.
- Método, corrida, equipo, QA/QC e incertidumbre se preservan por separado.
- La integración con LIMS mantiene autoridad y referencia al sistema origen.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **84 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 16. FICHA TÉCNICA MAESTRA — FUR-MNT — MANTENIMIENTO

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_MNT_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-MNT-00621` — **Bomba de Pulpa BP-01**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 84 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar activo mantenible, estrategia, planes, OT, condición, fallas, BOM, repuestos y KPI de confiabilidad.

## Flujo funcional fuente

```text
Inspección → Diagnóstico → Planificación → OT → Ejecución → Prueba → Cierre
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | Bomba de pulpa — Confirmado / D4 |
| Estrategia | Preventivo / Predictivo — Confirmado / D4 |
| Potencia motor | 450 kW — Referencial / D3 |
| Caudal | 320 m³/h — Referencial / D3 |
| Presión descarga | 3,2 bar — Referencial / D3 |
| Inspección | Cada 7 días — Confirmado / D4 |
| Lubricación | Cada 30 días — Confirmado / D4 |
| MTBF objetivo | 1250 h — Referencial / D3 |
| MTTR objetivo | 4,6 h — Referencial / D3 |
| Próxima intervención | 2025-09-20 — Confirmado / D4 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| maintenance.equipment | maintenance_equipment | Activo mantenible |
| maintenance.request | maintenance_request | OT / solicitudes |
| product.template | product_template | Repuestos/materiales catalogables |
| product.product | product_product | Variante inventariable |
| stock.lot | stock_lot | Serie/lote |
| stock.location | stock_location | Almacén/ubicación |
| res.partner | res_partner | Fabricante/proveedor |
| hr.employee | hr_employee | Responsable/técnico |
| product.supplierinfo | product_supplierinfo | Proveedor/precio |
| ir.attachment | ir_attachment | Manual, BOM, SOP, inspecciones |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_maintenance_plan | Plan preventivo y frecuencias |
| fur_asset_bom_line | Repuestos y materiales |
| fur_work_order_link | OT e historial |
| fur_maintenance_condition | Inspecciones y condición |
| fur_failure_event | Modos de falla |
| fur_maintenance_kpi | MTBF / MTTR / disponibilidad |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_maintenance_strategy | Estrategia, criticidad y política |
| fur_maintenance_inspection | Rondas/inspecciones estructuradas |
| fur_maintenance_lubrication | Puntos, lubricantes y frecuencias |
| fur_spare_criticality | Criticidad, min/max y repuesto crítico |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera de Activo Mantenible | Cargar activo → estado → versión → madurez → criticidad | maintenance_equipment | fur_record; fur_status_history |
| 2 | Estrategia y Criticidad | Resolver criticidad → estrategia preventiva/predictiva/correctiva → aprobador | maintenance_equipment | fur_maintenance_strategy |
| 3 | Plan Preventivo | Cargar tareas → frecuencia → responsable → próxima fecha → estado | maintenance_request; hr_employee | fur_maintenance_plan |
| 4 | Inspecciones y Condición | Registrar inspección → lectura/condición → evidencia → recomendación | maintenance_request; ir_attachment | fur_maintenance_condition; fur_maintenance_inspection |
| 5 | Órdenes de Trabajo | Listar OT → prioridad → etapa → recursos → cierre → vínculo FUR | maintenance_request | fur_work_order_link; fur_relation |
| 6 | Fallas y Confiabilidad | Registrar evento → modo de falla → causa → efecto → acciones | — | fur_failure_event; fur_maintenance_kpi |
| 7 | BOM / Repuestos / WMS | Cargar BOM → producto → stock/ubicación → criticidad → RQ si falta | product_template; product_product; stock_location; stock_lot | fur_asset_bom_line; fur_spare_criticality; fur_relation |
| 8 | KPI MTBF/MTTR/Disponibilidad | Calcular/mostrar KPI desde eventos validados → período → fuente → madurez | — | fur_maintenance_kpi; fur_data_quality |
| 9 | Documentos / Sourcing | Listar manual/BOM/SOP/historial → fabricante/proveedor → RQ/OF/PO | res_partner; product_supplierinfo; ir_attachment; purchase_order | fur_document_link; fur_relation |
| 10 | Calidad / Auditoría MNT | Evaluar completitud → TBC/HOLD → registrar cambios, pruebas y cierre | mail_message; res_users | fur_data_quality; fur_audit_event; fur_lifecycle_event |

## Reglas funcionales específicas

- Separar estrategia, plan, OT, condición, falla, BOM y KPI.
- Los repuestos catalogables reutilizan maestros de producto y stock Odoo.
- MTBF/MTTR se calculan únicamente desde eventos con base temporal y fuente definida.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **84 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 17. FICHA TÉCNICA MAESTRA — FUR-RQ — REQUISICIONES

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_RQ_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-RQ-00045` — **Requisición de Bomba Centrífuga 6×4**  
**Estado fuente:** En revisión  
**Madurez global fuente:** D3 - En validación  
**Madurez visual:** 76 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar la necesidad interna de compra desde su origen operativo hasta aprobación, ofertas, PO, recepción y cierre.

## Flujo funcional fuente

```text
Solicitud → Revisión técnica → Aprobación → FUR-OF → PO → Recepción → Cierre
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | Compra de repuesto — Confirmado / D4 |
| Activo asociado | Bomba Centrífuga BC-01 — Confirmado / D4 |
| Cantidad | 2 und — Confirmado / D4 |
| Especificación | API 610 — Referencial / D3 |
| Prioridad | Alta — Confirmado / D4 |
| Fecha requerida | 2025-10-15 — Confirmado / D4 |
| Justificación | Parada de mantenimiento programado — Confirmado / D4 |
| Estimación | USD 25.000 — Referencial / D3 |
| Centro de costo | Molienda — Confirmado / D4 |
| Presupuesto | CAPEX — Confirmado / D4 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| purchase.requisition | purchase_requisition | Modelo mostrado en la fuente; verificar módulo instalado |
| purchase.requisition.line | purchase_requisition_line | Líneas mostradas en la fuente; verificar módulo instalado |
| uom.uom | uom_uom | Unidad |
| maintenance.equipment | maintenance_equipment | Activo relacionado |
| res.partner | res_partner | Proveedor sugerido |
| res.currency | res_currency | Moneda |
| ir.attachment | ir_attachment | Especificaciones, planos, cotizaciones |
| purchase.order | purchase_order | PO final, no sustituye la RQ interna |
| purchase.order.line | purchase_order_line | Líneas del PO final |
| res.users / hr.employee | res_users / hr_employee | Solicitante, revisores y aprobadores |

## Tablas propias del ecosistema — documentadas en la fuente

> La ficha fuente no enumera subtablas especializadas propias en su bloque técnico; el documento maestro propone a continuación el esquema de implementación FUR correspondiente.

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_request_header | Identidad y cabecera maestra de FUR-RQ |
| fur_request_line | Líneas solicitadas en 1FN |
| fur_request_spec | Especificaciones técnicas por línea |
| fur_request_approval | Flujo y decisiones de aprobación |
| fur_request_budget | Centro de costo, CAPEX/OPEX y reserva lógica |
| fur_request_asset_link | Relación con activo/proceso |
| fur_request_supplier_suggestion | Proveedor sugerido sin convertirlo en adjudicación |
| fur_request_document_requirement | Documentos obligatorios |
| fur_request_status_history | Historial de estados |
| fur_request_conversion | Vínculo controlado a FUR-OF / PO |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera de Requisición | Cargar FUR-RQ → solicitante → estado → versión → madurez | res_users; hr_employee | fur_record; fur_request_header |
| 2 | Necesidad / Activo / Proceso | Resolver activo y proceso origen → justificar necesidad → criticidad | maintenance_equipment | fur_request_asset_link; fur_relation |
| 3 | Líneas de Requisición | Listar ítems → cantidad → UoM → tipo → estado; una línea por registro | uom_uom; product_template | fur_request_line |
| 4 | Especificación Técnica | Cargar requisitos por línea → norma/datasheet → condición → aprobador técnico | ir_attachment | fur_request_spec; fur_document_link |
| 5 | Presupuesto / Centro de Costo | Cargar CAPEX/OPEX → centro de costo → estimación → moneda → estado | res_currency | fur_request_budget |
| 6 | Flujo de Aprobación | Ordenar pasos → revisión técnica → jefatura → compras → decisión/fecha | res_users; mail_activity | fur_request_approval; fur_request_status_history |
| 7 | Proveedores Sugeridos | Listar sugerencias → justificar → mantener como sugerencia, no adjudicación | res_partner | fur_request_supplier_suggestion |
| 8 | Ofertas / Comparación | Consultar FUR-OF relacionadas → mostrar estado/completitud → seleccionar para evaluación | — | fur_request_conversion; fur_relation |
| 9 | Documentos / Recepción | Listar solicitud/especificación/cotización/aprobación/recepción → vigencia | ir_attachment; purchase_order | fur_request_document_requirement; fur_document_link |
| 10 | Calidad / Auditoría RQ | Evaluar pendientes → bloquear conversión si HOLD → registrar auditoría y cierre | mail_message; res_users | fur_data_quality; fur_audit_event; fur_request_status_history |

## Reglas funcionales específicas

- La requisición interna no se modela como `purchase.order`.
- Las líneas deben estar normalizadas en 1FN.
- La conversión a oferta/PO debe preservar trazabilidad y aprobaciones.

## Resultado / condición de la ficha fuente

- Estado: **En revisión**.
- Madurez: **D3 - En validación**.
- Madurez visual: **76 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 18. FICHA TÉCNICA MAESTRA — FUR-OF — OFERTAS COMERCIALES

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_OF_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-OF-PB01-BPA-0023` — **Oferta Bomba de Pulpa Warman 6/4**  
**Estado fuente:** En revisión  
**Madurez global fuente:** D3 - Validado en revisión  
**Madurez visual:** 84 %; completitud documental 88 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar ofertas técnico-comerciales, condiciones, cumplimiento, desviaciones, evaluación, negociación y vínculo a PO sin sustituir la requisición.

## Flujo funcional fuente

```text
Requisición → Recepción OF → Evaluación técnica → Comparación → Negociación → Aprobación → PO/Compra
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | Técnico-comercial integral — Confirmado / D4 |
| Equipo | Bomba de pulpa Warman 6/4 — Referencial / D3 |
| Cantidad | 1 und — Confirmado / D4 |
| Moneda | USD — Confirmado / D4 |
| Precio unitario | USD 12.500 — Referencial / D3 |
| Plazo | 14–18 semanas — Referencial / D3 |
| Vigencia | 30 días — Confirmado / D4 |
| Garantía | 24 meses — Referencial / D3 |
| Incoterm | FCA — TBC / D2 |
| Cumplimiento técnico | 92 % — Referencial / D3 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| res.partner | res_partner | Proveedor ofertante |
| res.currency | res_currency | Moneda |
| ir.attachment | ir_attachment | Cotización, ficha, certificados |
| product.template | product_template | Ítem/equipo catalogable |
| uom.uom | uom_uom | Unidad |
| purchase.order | purchase_order | PO una vez adjudicada/aprobada |
| purchase.order.line | purchase_order_line | Líneas de PO |
| product.supplierinfo | product_supplierinfo | Datos de proveedor/precio de catálogo; no sustituye oferta completa |
| res.users | res_users | Evaluadores/aprobadores |
| mail.message / mail.activity | mail_message / mail_activity | Aclaratorias y trazabilidad |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_offer_header | Cabecera de oferta |
| fur_offer_item | Ítems cotizados |
| fur_offer_term | Condiciones comerciales |
| fur_offer_compliance | Cumplimiento técnico |
| fur_offer_deviation | Excepciones / desviaciones |
| fur_offer_evaluation | Puntuación y ranking |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_offer_supplier_link | Vínculo proveedor ↔ oferta |
| fur_offer_document | Matriz documental del expediente |
| fur_offer_comparison | Comparación multi-oferta |
| fur_offer_approval | Aprobación / recomendación / decisión |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera de Oferta | Cargar FUR-OF → número oferta → proveedor → estado → madurez | res_partner | fur_record; fur_offer_header |
| 2 | Proveedor y Contexto | Resolver proveedor → RQ origen → activo/proceso → país/certificaciones | res_partner | fur_offer_supplier_link; fur_relation |
| 3 | Ítems Cotizados | Listar ítem → cantidad → UoM → precio → moneda → condición | product_template; uom_uom; res_currency | fur_offer_item |
| 4 | Condiciones Comerciales | Cargar vigencia → entrega → Incoterm → pago → garantía → MOQ/empaque | — | fur_offer_term |
| 5 | Cumplimiento Técnico | Comparar requisitos RQ vs oferta → cumplimiento/desviación → evidencia | ir_attachment | fur_offer_compliance; fur_relation |
| 6 | Desviaciones / Aclaratorias | Listar excepción → impacto → respuesta → estado → responsable | mail_message | fur_offer_deviation |
| 7 | Comparación / Evaluación | Agrupar ofertas de la misma RQ → normalizar criterios → mostrar evaluación sin alterar fuentes | — | fur_offer_comparison; fur_offer_evaluation |
| 8 | Negociación / Aprobación | Registrar versión/condición negociada → aprobación → decisión → vigencia | res_users; mail_activity | fur_offer_approval; fur_offer_term |
| 9 | Documentos / PO | Listar cotización/ficha/QA/repuestos → si aprobada vincular PO; no convertir oferta en PO | ir_attachment; purchase_order | fur_offer_document; fur_document_link; fur_relation |
| 10 | Calidad / Auditoría OF | Calcular completitud → TBC/HOLD → registrar cambios y cierre del expediente | mail_message; res_users | fur_data_quality; fur_audit_event |

## Reglas funcionales específicas

- La oferta completa no se reduce a `product.supplierinfo`.
- Distinguir condiciones, cumplimiento, desviaciones y evaluación.
- La adjudicación/PO es una etapa posterior y se vincula sin borrar versiones de la oferta.

## Resultado / condición de la ficha fuente

- Estado: **En revisión**.
- Madurez: **D3 - Validado en revisión**.
- Madurez visual: **84 %; completitud documental 88 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 19. FICHA TÉCNICA MAESTRA — FUR-CAM — CÁMARAS / SEGURIDAD

**Documento fuente:** `DOCUMENTO_MAESTRO_FUR_CAM_INFOGRAFIA_REV00(1).md`  
**FUR representativa:** `FUR-CAM-PB01-PTZ-00123` — **Cámara PTZ CAM-01**  
**Estado fuente:** Activo  
**Madurez global fuente:** D4 - Operacional  
**Madurez visual:** 84 %  
**Pendientes fuente:** 4 TBC / 1 HOLD  

## Propósito de la red

Gestionar cámaras y seguridad: video, cobertura, red, grabación, retención, eventos, analítica, mantenimiento y evidencias.

## Flujo funcional fuente

```text
Acceso → Perímetro → Proceso → Control → Monitoreo → Grabación → Alarmas
```

## Resumen técnico de la ficha fuente

| Campo / parámetro | Valor / condición |
| --- | --- |
| Tipo | PTZ IP industrial — Confirmado / D4 |
| Resolución | 4K UHD — Confirmado / D4 |
| Zoom | 30× — Confirmado / D4 |
| Campo de visión | 360° pan / 90° tilt — Confirmado / D4 |
| Protección | IP66 / IK10 — Confirmado / D4 |
| Visión nocturna | IR 150 m — Confirmado / D4 |
| Compresión | H.265 — Confirmado / D4 |
| Almacenamiento local | 256 GB — Referencial / D3 |
| Alimentación | PoE++ / 24 VDC — Confirmado / D4 |
| Retención | 30 días — TBC / D2 |

## Tablas/modelos nativos Odoo relevantes

| Modelo ORM | Tabla PostgreSQL orientativa | Uso |
| --- | --- | --- |
| product.template | product_template | Identidad ERP del equipo |
| product.category | product_category | Categoría |
| stock.location | stock_location | Ubicación |
| maintenance.equipment | maintenance_equipment | Activo mantenible |
| stock.lot | stock_lot | Serie |
| res.partner | res_partner | Fabricante/proveedor |
| product.supplierinfo | product_supplierinfo | Precio/proveedor |
| ir.attachment | ir_attachment | Manual, planos, FAT, fotos |
| maintenance.request | maintenance_request | OT |
| purchase.order | purchase_order | PO final |

## Tablas propias del ecosistema — documentadas en la fuente

| Tabla propia | Función |
| --- | --- |
| fur_camera_nameplate | Placa y datos nominales |
| fur_camera_video_profile | Resolución, fps, compresión |
| fur_camera_storage_policy | Retención y almacenamiento |
| fur_camera_network | IP, VLAN, puertos y conectividad |
| fur_camera_event_rule | Detecciones, alarmas, eventos |
| fur_camera_maintenance | Inspecciones y limpieza |

## Tablas propias del ecosistema — ampliación de arquitectura propuesta

| Tabla propia propuesta | Función |
| --- | --- |
| fur_camera_coverage_zone | Zona, azimut, cobertura y puntos ciegos |
| fur_camera_nvr_link | Relación cámara ↔ NVR/VMS |
| fur_camera_analytic_profile | Analíticas habilitadas y estado |
| fur_camera_privacy_policy | Retención, acceso y gobierno de evidencia |

> Las tablas de esta subsección son una **propuesta canónica de implementación** derivada de las necesidades funcionales de la ficha. Deben pasar por revisión de modelo de datos y no se presentan como tablas ya existentes.

## 10 componentes funcionales React.js — sin código

| # | Componente funcional | Pseudocódigo conceptual | Tablas nativas Odoo | Tablas propias FUR |
| --- | --- | --- | --- | --- |
| 1 | Cabecera FUR de Cámara | Cargar identidad → estado → versión → madurez → serial | product_template; maintenance_equipment; stock_lot | fur_record; fur_status_history |
| 2 | Ubicación y Cobertura | Resolver zona → ubicación → cobertura → puntos ciegos → contexto de seguridad | stock_location | fur_camera_coverage_zone; fur_relation |
| 3 | Perfil de Video | Cargar resolución → fps → compresión → bitrate → condición | — | fur_camera_video_profile |
| 4 | PTZ / Visión Nocturna | Cargar pan/tilt/zoom → IR → presets → límites operativos | — | fur_camera_nameplate; fur_camera_analytic_profile |
| 5 | Red / VLAN / PoE | Cargar IP/VLAN/puertos → switch PoE → estado de enlace → GPON | — | fur_camera_network; fur_relation |
| 6 | Grabación / Retención / NVR | Resolver NVR/VMS → almacenamiento → política retención → estado TBC/HOLD | — | fur_camera_storage_policy; fur_camera_nvr_link; fur_camera_privacy_policy |
| 7 | Eventos / Analítica / Alarmas | Cargar regla → evento → prioridad → evidencia → estado de analítica | — | fur_camera_event_rule; fur_camera_analytic_profile |
| 8 | Integración GPON / Acceso | Mostrar enlaces a GPON, control de acceso, UPS y centro de monitoreo | — | fur_relation |
| 9 | Mantenimiento / Sourcing | Listar limpieza/OT → fabricante/proveedor → RQ/OF/PO → documentos | maintenance_request; res_partner; product_supplierinfo; purchase_order; ir_attachment | fur_camera_maintenance; fur_document_link |
| 10 | Calidad / Auditoría CAM | Evaluar cobertura/retención/analítica → pendientes → auditoría y ciclo de vida | mail_message; res_users | fur_data_quality; fur_audit_event; fur_lifecycle_event |

## Reglas funcionales específicas

- Separar perfil de video, red, almacenamiento, eventos y cobertura.
- Retención y evidencia deben conservar política y control de acceso.
- La analítica inteligente no se presume activa si está TBC/HOLD.

## Resultado / condición de la ficha fuente

- Estado: **Activo**.
- Madurez: **D4 - Operacional**.
- Madurez visual: **84 %**.
- Pendientes: **4 TBC / 1 HOLD**.

# 20. CATÁLOGO CONSOLIDADO DE 100 COMPONENTES REACT.JS

La arquitectura definida contiene **10 componentes funcionales por cada una de las 10 redes**, para un total de **100 componentes funcionales**. Todos son especificaciones conceptuales, sin código React.

| Red | Cantidad |
|---|---:|
| FUR-PROC | 10 |
| FUR-PTE | 10 |
| FUR-IOT | 10 |
| FUR-GPON | 10 |
| FUR-CC | 10 |
| FUR-LAB | 10 |
| FUR-MNT | 10 |
| FUR-RQ | 10 |
| FUR-OF | 10 |
| FUR-CAM | 10 |
| **TOTAL** | **100** |

# 21. MATRIZ DE CAPAS PARA UNA FUR EN REACT.JS

Cada pantalla FUR puede ensamblarse en las siguientes capas conceptuales:

```text
1. Router / selección de FUR
       ↓
2. Cabecera e identidad
       ↓
3. Jerarquía / ubicación / clasificación
       ↓
4. Componente técnico especializado por red
       ↓
5. Relaciones transversales
       ↓
6. Documentos y evidencia
       ↓
7. Comercial / sourcing
       ↓
8. Calidad y madurez del dato
       ↓
9. Auditoría / ciclo de vida
       ↓
10. Acciones contextuales y navegación
```

La composición visual puede ser parametrizable por `red + familia + subtipo`, pero la persistencia técnica permanece separada por dominio.

---

# 22. PSEUDOCÓDIGO MAESTRO DE CARGA DE UNA FUR

Sin código de aplicación:

```text
RECIBIR código FUR
BUSCAR fur_record por fur_code
SI no existe:
    mostrar "FUR no encontrada"
SI existe:
    validar estado y permisos
    cargar maestros Odoo referenciados
    cargar bloque propio del dominio
    cargar relaciones transversales
    cargar documentos y revisiones
    cargar comercial/sourcing
    cargar condición y madurez por campo
    cargar pendientes TBC/HOLD
    cargar auditoría y ciclo de vida
    componer vista según red/familia/subtipo
    registrar evento de lectura si la política lo requiere
```

---

# 23. PSEUDOCÓDIGO MAESTRO DE EDICIÓN

```text
USUARIO solicita editar
VALIDAR rol y permiso
BLOQUEAR edición de maestros cuya autoridad sea Odoo u otro sistema origen
EDITAR únicamente campos autorizados de FUR
POR cada campo crítico modificado:
    exigir condición del dato
    exigir madurez D0–D5
    conservar valor anterior
    registrar motivo
SI cambia una relación:
    cerrar vigencia anterior
    crear nueva relación
SI cambia un documento:
    conservar revisión anterior
    crear nuevo vínculo documental
REGISTRAR fur_audit_event
RECALCULAR completitud/madurez global según reglas aprobadas
ENVIAR a revisión/aprobación cuando corresponda
```

---

# 24. REGLAS DE INTEGRIDAD Y NORMALIZACIÓN

## Identidad

- `fur_record.fur_code` debe ser único.
- El UUID interno es inmutable y no depende del código visible.
- Serial, tag, código de muestra, RQ y OF usan claves únicas propias cuando corresponda.

## 1FN

No almacenar como texto compuesto:

- múltiples proveedores;
- múltiples repuestos;
- analitos;
- alarmas;
- documentos;
- aprobadores;
- relaciones;
- resultados;
- puertos;
- splitters;
- ONU;
- eventos de custodia.

Cada elemento debe ser una fila o relación propia.

## Auditoría

Toda modificación crítica debe registrar:

- usuario;
- timestamp;
- campo/entidad;
- valor anterior;
- valor nuevo;
- motivo;
- condición del dato;
- madurez;
- referencia documental, cuando aplique.

---

# 25. RBAC FUNCIONAL PROPUESTO

| Rol | Alcance típico |
|---|---|
| Administrador FUR | Catálogos, reglas, configuración transversal |
| Propietario funcional | Aprueba contenido del dominio |
| Custodio del dato | Mantiene calidad, completitud y evidencia |
| Responsable técnico | Edita bloque técnico de su disciplina |
| Operador / técnico | Consulta y registra eventos autorizados |
| Compras | FUR-RQ, FUR-OF, proveedores, PO |
| QA/QC | FUR-CC y validaciones de calidad |
| Laboratorio | FUR-LAB, métodos, corridas, resultados |
| Mantenimiento | FUR-MNT, OT, BOM, condición |
| Seguridad | FUR-CAM, cobertura, evidencia, alarmas |
| Consulta | Solo lectura según alcance |

---

# 26. ÍNDICES RECOMENDADOS

Además de los índices específicos por dominio:

- `idx_fur_code` — único.
- `idx_fur_domain_state` — red + estado.
- `idx_fur_location` — ubicación.
- `idx_relation_origin_type` — origen + tipo.
- `idx_relation_target_type` — destino + tipo.
- `idx_document_fur_type_state` — FUR + tipo + estado.
- `idx_quality_fur_field` — FUR + campo.
- `idx_audit_fur_timestamp` — FUR + timestamp.
- `idx_status_fur_timestamp` — FUR + timestamp.
- índices únicos de serie/tag/muestra/RQ/OF según semántica.

---

# 27. REQUISITOS DE ACEPTACIÓN

Una FUR puede declararse funcionalmente lista cuando:

- tiene identidad única;
- mantiene clave interna estable;
- no duplica maestros nativos sin justificación;
- respeta 1FN;
- sus relaciones tienen cardinalidad y vigencia;
- dispone de documentos obligatorios o pendientes explícitos;
- todo campo crítico tiene condición y madurez;
- el bloque comercial está completo o marcado TBC/HOLD;
- roles y permisos están definidos;
- la auditoría registra cambios;
- no convierte datos D0/D1 en realidad operacional;
- toda dependencia de sistema origen conserva su referencia.

---

# 28. HOLD / TBC MAESTROS PARA IMPLEMENTACIÓN

1. Verificar los módulos realmente instalados en Odoo 19.
2. Confirmar modelos/campos físicos de la instancia objetivo.
3. Validar disponibilidad real de `purchase.requisition`.
4. Congelar convención final de nombres de tablas `fur_*`.
5. Definir tipos PostgreSQL, `NOT NULL`, `CHECK`, `UNIQUE` y FK definitivas.
6. Definir política de eliminación lógica / archivado.
7. Definir RLS/RBAC si se implementa en PostgreSQL y reglas de acceso Odoo.
8. Confirmar estrategia para documentos y versionado de `ir.attachment`.
9. Confirmar fuentes de autoridad SCADA/Historian, LIMS y NMS.
10. Confirmar reglas de cálculo de madurez y completitud.
11. Confirmar catálogo de tipos de relación.
12. Confirmar catálogo de criticidad.
13. Confirmar nomenclatura FUR por sitio/área/tipo/secuencia.
14. Confirmar modelo de sincronización Odoo ↔ servicios NestJS/FUR.
15. Confirmar estrategia de caché y actualización del frontend React.
16. Confirmar OpenAPI y contratos de endpoints.
17. Confirmar auditoría de cambios y retención.
18. Confirmar políticas de ciberseguridad OT/IT.
19. Confirmar pruebas FAT/SAT/UAT.
20. Sustituir datos demostrativos/referenciales por datos reconciliados AS-FOUND/AS-BUILT cuando corresponda.

---

# 29. TRAZABILIDAD DE FUENTES

El presente documento consolida los siguientes diez documentos adjuntos:

- `DOCUMENTO_MAESTRO_FUR_PROC_INFOGRAFIA_REV00(1).md` — FUR-PROC / Procesos.
- `DOCUMENTO_MAESTRO_FUR_PTE_INFOGRAFIA_REV00(1).md` — FUR-PTE / Potencia Eléctrica.
- `DOCUMENTO_MAESTRO_FUR_IOT_INFOGRAFIA_REV00(1).md` — FUR-IOT / IoT / Instrumentación.
- `DOCUMENTO_MAESTRO_FUR_GPON_INFOGRAFIA_REV00(1).md` — FUR-GPON / Comunicaciones GPON.
- `DOCUMENTO_MAESTRO_FUR_CC_INFOGRAFIA_REV00(1).md` — FUR-CC / Control de Calidad.
- `DOCUMENTO_MAESTRO_FUR_LAB_INFOGRAFIA_REV00(1).md` — FUR-LAB / Laboratorios.
- `DOCUMENTO_MAESTRO_FUR_MNT_INFOGRAFIA_REV00(1).md` — FUR-MNT / Mantenimiento.
- `DOCUMENTO_MAESTRO_FUR_RQ_INFOGRAFIA_REV00(1).md` — FUR-RQ / Requisiciones.
- `DOCUMENTO_MAESTRO_FUR_OF_INFOGRAFIA_REV00(1).md` — FUR-OF / Ofertas Comerciales.
- `DOCUMENTO_MAESTRO_FUR_CAM_INFOGRAFIA_REV00(1).md` — FUR-CAM / Cámaras / Seguridad.

Las fichas fuente se mantienen como evidencia de los valores y estructuras presentadas. Este Documento Maestro no corrige silenciosamente discrepancias internas ni eleva valores referenciales a condición operacional.

---

# 30. CONCLUSIÓN

La arquitectura consolidada define un ecosistema de **10 FUR transversales** que comparten identidad, relaciones, documentación, calidad del dato y auditoría, pero mantienen **bloques técnicos especializados** por dominio.

El patrón rector es:

```text
Maestros empresariales Odoo 19
        +
Identidad transversal fur_record
        +
Tablas propias especializadas fur_<dominio>_*
        +
Relaciones fur_relation
        +
Documentos ir.attachment + fur_document_link
        +
Calidad / madurez / auditoría
        +
100 componentes funcionales React.js sin código
```

La separación evita duplicar los maestros ERP y permite que cada red conserve la profundidad técnica necesaria para su FUR.

**Estado del Documento Maestro:** `REV.00 — BASE DE ARQUITECTURA / SUJETO A VALIDACIÓN DE IMPLEMENTACIÓN`.

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_ECOSISTEMA_FUR_10_REDES_ODOO19_REACT_PSEUDOCODIGO_REV00.md`**


# 77. ANEXO — DOCUMENTO MAESTRO FUR-GPON

> Documento fuente interno de la ficha y arquitectura del dominio FUR-GPON.


# DOCUMENTO MAESTRO — FUR-GPON — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-GPON-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** 2026-09-16  
**Fuente:** Infografía suministrada por el usuario: **FUR-GPON — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental de todo el contenido legible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen la fuente gráfica. Este documento no constituye por sí solo validación AS-FOUND, AS-BUILT, ingeniería IFC, certificación OEM ni verificación independiente.

> **Nota de fidelidad:** el campo UUID presenta caracteres iniciales poco inequívocos por la resolución/tipografía de la imagen; se conserva como lectura gráfica aproximada y debe verificarse contra el registro fuente antes de usarlo como identificador real.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-GPON — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Red GPON | Una identidad. Todo su ciclo de vida.**

Principios superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Operación segura**
- **Gestión del ciclo de vida**
- **Decisiones inteligentes**

Mensaje superior derecho:

> **Conectividad que impulsa el valor**

Conceptos destacados:

- **FIBRA ÓPTICA**
- **COMUNICACIÓN**
- **CONFIABILIDAD**
- **DISPONIBILIDAD**

Mensaje de integración del ecosistema:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje de pie:

> **ACTIVOS CONECTADOS, OPERACIÓN MÁS EFICIENTE, MAYOR VALOR**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-GPON-0231` |
| ID interno (UUID) | Lectura gráfica aproximada: `a8b?ff-23d6-40c1-91ea-74bd8b120231` |
| Red / Dominio | `FUR-GPON (Comunicaciones)` |
| Nombre del activo | `OLT Huawei MA5800` |
| Tipo / Familia | `Equipo de red GPON / OLT` |
| Estado | `Activo` |
| Madurez global | `D4 - Operacional` |
| Versión | `1.0` |
| Fecha creación | `2025-09-14` |

La cabecera incorpora un **código QR** como elemento de identificación/acceso rápido.

---

# 2. ACTIVO DESTACADO Y UBICACIÓN EN PLANTA

## 2.1 Activo principal

**OLT Huawei MA5800**

Identificación mostrada sobre la imagen:

`FUR-GPON-0231 | Sala de Comunicaciones`

## 2.2 Ubicación en la planta

| Campo | Valor visible |
|---|---|
| Zona | `Sala de Comunicaciones` |
| Área | `Telecomunicaciones` |
| Proceso | `Infraestructura digital` |
| Coordenadas | `-12.0467, -76.9381` |
| Acción visual | `Ver en Mapa Interactivo` |

La ficha incorpora una miniatura de mapa asociada a la ubicación del equipo.

---

# 3. CADENA FUNCIONAL GPON REPRESENTADA

La arquitectura visual de comunicaciones mostrada es:

```text
Core / Router
     ↓
OLT
     ↓
Splitter 1:8
     ↓
Fibra Troncal
     ↓
ONU / ONT
     ↓
CCTV / Voz / Datos / SCADA
```

Esta cadena sitúa a la OLT como nodo principal de agregación y distribución del servicio GPON.

---

# 4. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía muestra diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia Eléctrica |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-GPON** aparece resaltada como dominio activo.

---

# 5. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza la información maestra en nueve bloques.

## 5.1 Bloque 1 — Identidad

Incluye:

- Código.
- Nombre.
- Tipo.
- Estado.
- Versión.

## 5.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Sistema
→ Ubicación
```

## 5.3 Bloque 3 — Clasificación

Incluye:

- Familia.
- Clase.
- Criticidad.
- Tags.

## 5.4 Bloque 4 — Responsabilidad

Incluye:

- Propietario.
- Custodio.
- Responsable técnico.

## 5.5 Bloque 5 — Ciclo de vida

Incluye:

- Alta.
- Puesta en servicio.
- Inspecciones.
- Retiro.

## 5.6 Bloque 6 — Documentación

Incluye:

- Planos.
- OTDR.
- Certificaciones.
- Fotos.

## 5.7 Bloque 7 — Relaciones

Incluye relaciones como:

- Conecta.
- Soporta.
- Comunica.
- Depende de.

## 5.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 5.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Sinónimos.
- Códigos externos.

---

# 6. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-GPON

## 6.1 Parámetros técnicos visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---|---|---|---|
| Tipo de equipo | OLT GPON | — | Confirmado | D4 |
| Capacidad | 32 puertos GPON | puertos | Confirmado | D4 |
| Tarjetas activas | 8 | uds | Confirmado | D4 |
| Uplink | 10GE | — | Confirmado | D4 |
| Split ratio de diseño | 1:8 | — | Referencial | D3 |
| Presupuesto óptico objetivo | 28 | dB | Referencial | D3 |
| Latencia esperada | < 2 | ms | Referencial | D3 |
| Fibra asociada | Monomodo OS2 | — | Confirmado | D4 |
| ONU asociadas | 248 | uds | Referencial | D3 |
| Servicios soportados | Voz / Datos / CCTV / SCADA | — | Referencial | D3 |
| Redundancia | Fuente dual | — | Confirmado | D4 |
| Estado de monitoreo | Operativo | — | Confirmado | D4 |

## 6.2 Dimensiones principales mostradas

La vista frontal del equipo indica:

- **Ancho:** `482 mm`
- **Altura:** `2U`

La representación corresponde visualmente al **OLT Huawei MA5800**.

## 6.3 Subtablas FUR-GPON principales

| Subtabla | Propósito indicado |
|---|---|
| `fur_gpon_nameplate` | Placa y datos nominales |
| `fur_gpon_port` | Puertos PON y uplinks |
| `fur_gpon_splitter` | Topología de splitters |
| `fur_gpon_optical_budget` | Presupuesto óptico |
| `fur_gpon_onu_link` | Relación OLT - ONU |
| `fur_gpon_otdr_test` | Pruebas y trazas OTDR |

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Fabricante | Huawei |
| Marca / Modelo | Huawei MA5800 |
| N.º de serie | `GPON-OLT-82345` |
| Proveedor | Huawei Enterprise / Integrador local |
| País de origen | China |
| Certificaciones | CE, RoHS, ISO 9001 |
| Garantía | 24 meses |
| Precio referencial | USD 18,500 |
| Moneda | USD |
| Plazo de entrega | 10 - 14 semanas |
| MOQ (repuesto) | Según ítem |
| Empaque | Rack industrial exportación |
| Vínculo RQ / OF / PO | `RQ-2025-0038 | OF-2025-0018 | PO-2025-1044` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `nombre` | `product.template.name` | varchar | — | `idx_name` |
| `tipo_activo` | `product.template.categ_id` | many2one | — | — |
| `ubicación` | `stock.location.id` | many2one | — | — |
| `equipo_mantenible` | `maintenance.equipment.id` | many2one | — | — |
| `serie` | `stock.lot.name` | varchar | Sí | `idx_serial` |
| `proveedor` | `res.partner.id` | many2one | — | — |
| `precio_ref` | `product.supplierinfo.price` | numeric | — | — |
| `datos_gpon` | `fur_gpon_nameplate.*` | tabla propia | — | `idx_gpon` |
| `documentos` | `ir.attachment.id` | many2one | — | — |

## 8.1 Lectura arquitectónica

La infografía representa un patrón híbrido:

```text
Odoo 19
   +
Tablas FUR-GPON
   +
NMS / Gestión de red
   +
Topología OLT / Splitters / ONU
   +
Documentos y evidencias OTDR
```

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Pertenece | OLT-01 | Sala Telecom | N:1 | Parte de infraestructura digital |
| Comunica | OLT-01 | ONU-034 | 1:N | Servicio PON hacia campo |
| Soporta | OLT-01 | CCTV-CAM-12 | 1:N | Transporte de video IP |
| Soporta | OLT-01 | SCADA-NODO-05 | 1:N | Conectividad de control |
| Se integra | OLT-01 | Router Core | N:1 | Uplink a red principal |
| Relaciona | OLT-01 | Splitter SP-08 | 1:N | Distribución óptica |
| Monitorea | OLT-01 | NMS-GPON | N:1 | Gestión y alarmas |
| Mantenido por | OLT-01 | OT-00089 | 1:N | Órdenes de trabajo |

Estas relaciones posicionan a la OLT como elemento central de conectividad entre la red troncal, usuarios de campo, CCTV, SCADA, splitters, NMS y mantenimiento.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Manual de operación | `MA5800_Manual.pdf` | v2.1 | Vigente |
| Plano de red | `GPON_Backbone_GA.pdf` | v1.4 | Vigente |
| Plano rack | `GPON_Rack_EL.pdf` | v1.2 | Vigente |
| Prueba OTDR | `OTDR_Troncal01.pdf` | v1.0 | Vigente |
| Lista de puertos | `OLT_Ports.xlsx` | v3.0 | Vigente |
| Certificado CE | `CE_MA5800.pdf` | v1.0 | Vigente |
| Fotografía | `OLT01_Foto.jpg` | — | Vigente |
| Historial mantenimiento | `Hist_MNT.pdf` | v1.0 | Vigente |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del activo

La infografía muestra:

> **Madurez del activo: 84 %**

La cabecera identifica la madurez global como:

> **D4 - Operacional**

---

# 12. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar niveles de potencia óptica por puerto | TBC |
| 2 | Validar topología final de splitters por área | TBC |
| 3 | Levantar inventario completo de ONU instaladas | TBC |
| 4 | Confirmar traza OTDR de respaldo | HOLD |
| 5 | Verificar fecha de última ampliación de capacidad | TBC |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 13. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico completo.
- ✓ Bloque comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Lista para operación.

Resultado visual:

> **FUR APTA para el ecosistema**

---

# 14. ARQUITECTURA FUNCIONAL INTEGRADA DE LA RED GPON

La lógica funcional puede estructurarse de la siguiente forma:

```text
                         CORE / ROUTER
                              │
                              ▼
                     FUR-GPON / OLT-01
                       Huawei MA5800
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
      Puertos PON          Uplink 10GE          NMS-GPON
          │                   │                   │
          ▼                   │                   ▼
     Splitters 1:8            │            Gestión / Alarmas
          │                   │
          ▼                   │
     Fibra Troncal            │
     Monomodo OS2             │
          │                   │
          ▼                   │
       ONU / ONT              │
          │                   │
     ┌────┼─────┬─────┐       │
     ▼    ▼     ▼     ▼       │
   Voz  Datos  CCTV  SCADA ◄──┘
```

---

# 15. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-GPON-0231
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Jerarquía
│   ├── Sala de Comunicaciones
│   ├── Telecomunicaciones
│   └── Infraestructura digital
│
├── Activo
│   └── OLT Huawei MA5800
│
├── Capacidad / Plataforma
│   ├── 32 puertos GPON
│   ├── 8 tarjetas activas
│   ├── Uplink 10GE
│   ├── Fuente dual
│   └── Estado Operativo
│
├── ODN / Óptico
│   ├── Split ratio 1:8
│   ├── Presupuesto óptico objetivo 28 dB
│   ├── Fibra monomodo OS2
│   ├── 248 ONU asociadas
│   └── Pruebas OTDR
│
├── Servicios
│   ├── Voz
│   ├── Datos
│   ├── CCTV
│   └── SCADA
│
├── Sourcing
│   ├── Huawei
│   ├── Huawei MA5800
│   ├── Serie GPON-OLT-82345
│   ├── Proveedor / integrador
│   ├── Garantía
│   ├── Precio
│   └── RQ / OF / PO
│
├── Relaciones
│   ├── Sala Telecom
│   ├── ONU
│   ├── CCTV
│   ├── SCADA
│   ├── Router Core
│   ├── Splitter
│   ├── NMS
│   └── Mantenimiento
│
├── Documentos
│   ├── Manual
│   ├── Backbone
│   ├── Rack
│   ├── OTDR
│   ├── Lista de puertos
│   ├── Certificado
│   ├── Fotografía
│   └── Historial MNT
│
└── Gobierno del dato
    ├── D0–D5
    ├── 84 % madurez visual
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 16. LÓGICA DE CICLO DE VIDA FUR-GPON

Tomando únicamente los elementos visibles en la infografía, la FUR-GPON integra:

```text
Identidad
→ Jerarquía y ubicación
→ Clasificación
→ Responsabilidad
→ Alta / puesta en servicio
→ Configuración de puertos
→ Integración con Core
→ Distribución PON / Splitters
→ Fibra / ONU / ONT
→ Servicios
→ Monitoreo / NMS
→ Pruebas OTDR
→ Mantenimiento
→ Documentación
→ Auditoría
→ Actualización / expansión
```

---

# 17. RESUMEN EJECUTIVO

La imagen describe la **FUR-GPON-0231** correspondiente a una **OLT Huawei MA5800** ubicada en la **Sala de Comunicaciones**.

La ficha concentra en un único expediente digital:

1. identidad y codificación FUR;
2. ubicación funcional;
3. capacidad y puertos GPON;
4. uplinks y redundancia;
5. topología de splitters;
6. presupuesto óptico;
7. fibra troncal y ONU asociadas;
8. servicios Voz / Datos / CCTV / SCADA;
9. sourcing y proveedor;
10. mapeo Odoo 19;
11. relaciones con otras redes FUR;
12. documentación y evidencias OTDR;
13. madurez D0–D5;
14. pendientes TBC/HOLD;
15. checklist de validación.

La arquitectura visual representa el flujo:

```text
Core / Router
→ OLT
→ Splitter 1:8
→ Fibra Troncal
→ ONU / ONT
→ CCTV / Voz / Datos / SCADA
```

---

# 18. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente del fabricante, modelo, serie, precio, coordenadas, capacidad, número de ONU, latencia, presupuesto óptico, certificaciones, documentos ni referencias RQ/OF/PO.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan tal como aparecen en la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El UUID debe verificarse en la fuente digital maestra porque algunos caracteres iniciales no son inequívocos en la imagen.
6. El mapeo Odoo/FUR debe contrastarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
7. Para convertir esta ficha en un registro AS-BUILT deben cerrarse los pendientes TBC/HOLD y reconciliarse OLT, tarjetas, puertos, splitters, ONU/ONT, rutas de fibra, mediciones ópticas, OTDR, NMS y documentación con evidencia de campo.
8. Este documento no corrige ni reconcilia posibles diferencias internas de capacidad/topología; conserva la fuente gráfica.

---

# 19. CIERRE

**FUR `FUR-GPON-0231`: estado Activo, madurez global D4 - Operacional, madurez visual del activo 84 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR APTA para el ecosistema.**

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_GPON_INFOGRAFIA_REV00.md`**


# 78. ANEXO — DOCUMENTO MAESTRO FUR-CC

> Documento fuente interno de la ficha y arquitectura del dominio FUR-CC.


# DOCUMENTO MAESTRO — FUR-CC — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-CC-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** 2026-09-16  
**Fuente:** Infografía suministrada por el usuario: **FUR-CC — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental del contenido visible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen la fuente gráfica. Este documento no constituye por sí solo validación AS-FOUND, AS-BUILT, certificación de laboratorio, certificación OEM ni aprobación operacional.

> **Regla de fidelidad:** cuando la infografía presenta un dato como “Confirmado”, “Referencial”, “TBC” o “HOLD”, este documento conserva esa clasificación sin reinterpretarla ni sustituirla.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-CC — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Control de Calidad | Una identidad. Todo su ciclo de vida.**

Principios/mensajes superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Calidad del mineral**
- **Cumplimiento normativo**
- **Decisiones inteligentes**

Mensaje institucional:

> **Del mineral a un mayor valor**

Mensaje de integración:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje inferior:

> **CALIDAD HOY, ORO MAÑANA**

Complemento:

> **Datos confiables para mejores decisiones**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-CC-00087` |
| ID interno (UUID) | `a7f4c8e2-9d11-4b7a-9c5d-0f2e7d3c0012` |
| Red / Dominio | `FUR-CC (Control de Calidad)` |
| Nombre del activo | `Muestra de mineral MOL-01` |
| Tipo / Familia | `Muestra / Lote de mineral` |
| Estado | `Activo` |
| Madurez global | `D4 - Operacional` |
| Versión | `1.0` |
| Fecha creación | `2025-09-14` |

La cabecera incorpora un **código QR** asociado a la identidad FUR.

---

# 2. MUESTRA DESTACADA Y UBICACIÓN EN PLANTA

## 2.1 Muestra principal

**Muestra MOL-01**

Identificación mostrada sobre la imagen:

`FUR-CC-00087 | Zona 03 - Molienda`

## 2.2 Ubicación en la planta

| Campo | Valor visible |
|---|---|
| Zona | `03 - Molienda` |
| Área | `Laboratorio Metalúrgico` |
| Proceso | `Control de Calidad` |
| Coordenadas | `-12.0467, -76.9381` |
| Acción visual | `Ver en Mapa Interactivo` |

La infografía incluye una miniatura de mapa para contextualizar espacialmente la muestra y su proceso asociado.

---

# 3. FLUJO DE CONTROL DE CALIDAD REPRESENTADO

La secuencia funcional visible es:

```text
Muestreo
   ↓
Preparación
   ↓
Análisis en Laboratorio
   ↓
Resultados
   ↓
Validación
   ↓
Trazabilidad
   ↓
Decisiones
```

Esta cadena representa la ruta de la muestra desde la toma hasta su uso para toma de decisiones.

---

# 4. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía presenta diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia Eléctrica |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-CC** aparece resaltada como dominio activo.

Principio visual:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

---

# 5. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza su información maestra en nueve bloques.

## 5.1 Bloque 1 — Identidad

Incluye:

- Código.
- Nombre.
- Tipo.
- Estado.
- Versión.

## 5.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Proceso
→ Sistema
→ Ubicación
```

## 5.3 Bloque 3 — Clasificación

Incluye:

- Matriz.
- Tipo de muestra.
- Mineral.
- Tags.

## 5.4 Bloque 4 — Responsabilidad

Incluye:

- Propietario.
- Custodio.
- Responsable técnico.

## 5.5 Bloque 5 — Ciclo de vida

Incluye:

- Muestreo.
- Análisis.
- Liberación.
- Retención.

## 5.6 Bloque 6 — Documentación

Incluye:

- Procedimientos.
- Planos.
- Certificados.
- Fotos.

## 5.7 Bloque 7 — Relaciones

Incluye relaciones tales como:

- Proviene de.
- Alimenta.
- Analiza.
- Soporta.

## 5.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 5.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Sinónimos.
- Códigos externos.

---

# 6. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-CC

## 6.1 Parámetros técnicos visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---:|---|---|---|
| Código de muestra | MOL-01 | — | Confirmado | D4 |
| Tipo de muestra | Compuesta | — | Confirmado | D4 |
| Masa de muestra | 500 | g | Confirmado | D4 |
| Humedad | 8.5 | % | Confirmado | D4 |
| Granulometría P80 | 150 | µm | Confirmado | D4 |
| Ley de cabeza (Au) | 2.56 | g/t | Confirmado | D4 |
| Ley de plata (Ag) | 12.8 | g/t | Confirmado | D4 |
| Método de análisis | Fire Assay | — | Confirmado | D4 |
| Equipo de análisis | AA-7000 | — | Confirmado | D4 |
| Fecha de análisis | 2025-09-14 | — | Confirmado | D4 |
| Resultado final | Conforme a especificación | — | Confirmado | D4 |

## 6.2 Imagen de la muestra

La infografía muestra una bandeja identificada:

> **MOL-01**

La fotografía representa el material mineral asociado a la ficha y se acompaña de un código QR.

## 6.3 Subtablas FUR-CC principales

| Subtabla | Propósito indicado |
|---|---|
| `fur_cc_sample` | Datos de muestra |
| `fur_cc_analysis` | Resultados de análisis |
| `fur_cc_method` | Métodos de ensayo |
| `fur_cc_spec` | Límites de especificación |
| `fur_cc_chain` | Cadena de custodia |
| `fur_cc_certificate` | Certificados de calidad |

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Proveedor de servicios | ALS Global |
| Marca / Modelo (equipo) | AA-7000 (Shimadzu) |
| N.º de serie | `AA7K-45821` |
| País de origen | Japón |
| Certificaciones | ISO/IEC 17025 |
| Garantía | 12 meses |
| Precio referencial | USD 150,000 |
| Moneda | USD |
| Plazo de entrega | 8 - 12 semanas |
| Servicio / Consumible | Reactivos y crisoles |
| Vínculo RQ / OF / PO | `RQ-2025-0087 | OF-2025-0045 | PO-2025-0032` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `nombre` | `product.template.name` | varchar | — | `idx_name` |
| `tipo_muestra` | `fur_cc_sample.type` | varchar | — | — |
| `masa` | `fur_cc_sample.mass` | numeric | — | — |
| `ley_au` | `fur_cc_analysis.au_grade` | numeric | — | `idx_analysis` |
| `fecha_analisis` | `fur_cc_analysis.analysis_date` | date | — | — |
| `equipo` | `maintenance.equipment.id` | many2one | — | — |
| `proveedor` | `res.partner.id` | many2one | — | — |
| `metodo` | `fur_cc_method.id` | many2one | — | — |
| `documentos` | `ir.attachment.id` | many2one | — | — |

## 8.1 Lectura arquitectónica

La infografía representa un patrón híbrido:

```text
Odoo 19
   +
Tablas FUR-CC
   +
Equipos de laboratorio
   +
Procedimientos / métodos
   +
Documentos y evidencia
```

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Proviene de | FUR-PROC | FUR-CC | N:1 | Punto de muestreo |
| Analiza | FUR-CC | FUR-LAB | N:1 | Análisis de laboratorio |
| Soporta | FUR-CC | FUR-PROC | N:1 | Control de proceso |
| Alimenta | FUR-CC | FUR-MNT | N:1 | Condición de equipos |
| Vincula | FUR-CC | FUR-RQ | 1:N | Solicitud de análisis |
| Genera | FUR-CC | FUR-OF | 1:N | Oferta de servicios |
| Asociada a | FUR-CC | FUR-CAM | 1:N | Evidencia visual |
| Comunica | FUR-CC | FUR-GPON | N:1 | Transmisión de datos |
| Utiliza | FUR-CC | FUR-IOT | N:1 | Instrumentación |
| Reporta a | FUR-CC | FUR-PROC | N:1 | Indicadores de calidad |

Estas relaciones muestran que la FUR-CC conecta la muestra física con proceso, laboratorio, mantenimiento, requisiciones, ofertas, cámaras, comunicaciones e instrumentación.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Cadena de custodia | `CC_MOL-01.pdf` | v1.0 | Vigente |
| Informe de ensayo | `IE_MOL-01.pdf` | v1.0 | Vigente |
| Certificado | `CE_2025-045.pdf` | v1.0 | Vigente |
| Foto de muestra | `MOL-01.jpg` | — | Vigente |
| Procedimiento | `P-CC-001.pdf` | v2.0 | Vigente |
| Hoja de cálculo | `Resultados.xlsx` | v1.0 | Vigente |
| Especificación | `ESP-AU-001.pdf` | v1.0 | Vigente |
| Trazabilidad | `TR_MOL-01.pdf` | v1.0 | Vigente |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del activo

La infografía muestra:

> **Madurez del activo: 86 %**

La cabecera identifica la madurez global como:

> **D4 - Operacional**

---

# 12. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar duplicados de muestra | TBC |
| 2 | Validar humedad real de campo | TBC |
| 3 | Adjuntar foto de punto de muestreo | TBC |
| 4 | Confirmar especificación de ley | HOLD |
| 5 | Verificar calibración de equipo | TBC |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 13. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico completo.
- ✓ Bloque comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Lista para operación.

Resultado visual:

> **FUR APTA para el ecosistema**

---

# 14. ARQUITECTURA FUNCIONAL DE LA FUR-CC

La lógica funcional del registro puede representarse de la siguiente manera:

```text
                    FUR-PROC
                  Punto de Muestreo
                        │
                        ▼
                  FUR-CC / MOL-01
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
   Preparación       FUR-LAB          FUR-IOT
   de muestra        Análisis       Instrumentación
        │               │                │
        └───────────────┼────────────────┘
                        │
                        ▼
                    Resultados
                        │
                        ▼
                    Validación
                        │
        ┌───────────────┼────────────────┐
        │               │                │
        ▼               ▼                ▼
 Cadena de custodia   Documentos       FUR-GPON
 / trazabilidad       / evidencia     Transmisión
                        │
                        ▼
                     Decisiones
```

---

# 15. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-CC-00087
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Jerarquía
│   ├── Zona 03 - Molienda
│   ├── Laboratorio Metalúrgico
│   └── Control de Calidad
│
├── Muestra
│   ├── MOL-01
│   ├── Tipo: Compuesta
│   ├── Masa: 500 g
│   ├── Humedad: 8.5 %
│   └── P80: 150 µm
│
├── Resultados
│   ├── Au: 2.56 g/t
│   ├── Ag: 12.8 g/t
│   ├── Método: Fire Assay
│   ├── Equipo: AA-7000
│   └── Resultado: Conforme a especificación
│
├── Sourcing
│   ├── ALS Global
│   ├── AA-7000 (Shimadzu)
│   ├── Serie AA7K-45821
│   ├── ISO/IEC 17025
│   ├── Garantía
│   ├── Precio
│   └── RQ / OF / PO
│
├── Relaciones
│   ├── PROC
│   ├── LAB
│   ├── MNT
│   ├── RQ
│   ├── OF
│   ├── CAM
│   ├── GPON
│   └── IOT
│
├── Documentos
│   ├── Cadena de custodia
│   ├── Informe de ensayo
│   ├── Certificado
│   ├── Fotografía
│   ├── Procedimiento
│   ├── Hoja de cálculo
│   ├── Especificación
│   └── Trazabilidad
│
└── Gobierno del dato
    ├── D0–D5
    ├── 86 % de madurez visual
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 16. CICLO DE VIDA FUR-CC

Tomando únicamente los elementos visibles en la infografía, la FUR-CC integra:

```text
Identidad
→ Jerarquía / punto de muestreo
→ Muestreo
→ Preparación
→ Análisis
→ Resultados
→ Validación
→ Cadena de custodia
→ Liberación
→ Retención
→ Trazabilidad
→ Documentación
→ Auditoría
→ Decisiones
```

---

# 17. DIFERENCIACIÓN FUNCIONAL FUR-CC / FUR-LAB

La infografía muestra una separación funcional entre:

```text
FUR-CC
Muestra física + control de calidad + cadena de custodia
       │
       ▼
FUR-LAB
Análisis / ensayo de laboratorio
```

En esta representación:

- **FUR-CC** conserva la identidad de la muestra y su trazabilidad.
- **FUR-LAB** aparece como red relacionada para el análisis.
- El resultado analítico se vincula al expediente de calidad sin perder la relación con la muestra.

Esta diferenciación se conserva tal como está implícita en las relaciones de la infografía.

---

# 18. RESUMEN EJECUTIVO

La imagen describe la **FUR-CC-00087** correspondiente a la **Muestra de mineral MOL-01**, integrada al proceso de **Control de Calidad** en la **Zona 03 — Molienda**.

La ficha concentra en un único expediente digital:

1. identidad FUR;
2. ubicación y contexto;
3. datos de muestra;
4. masa, humedad y granulometría;
5. leyes Au/Ag;
6. método y equipo de análisis;
7. resultado final;
8. proveedor de servicios y sourcing;
9. mapeo con Odoo 19;
10. relaciones con otras redes FUR;
11. cadena de custodia y evidencias;
12. madurez D0–D5;
13. pendientes TBC/HOLD;
14. checklist de validación.

La cadena visual principal es:

```text
Muestreo
→ Preparación
→ Análisis en Laboratorio
→ Resultados
→ Validación
→ Trazabilidad
→ Decisiones
```

---

# 19. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente de las leyes Au/Ag, humedad, P80, masa, método, equipo, certificaciones, precio, coordenadas ni referencias RQ/OF/PO.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan según la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El mapeo Odoo/FUR debe verificarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
6. Para convertir esta ficha en registro AS-BUILT / operacional plenamente validado deben cerrarse los TBC/HOLD y reconciliarse muestra, punto de muestreo, cadena de custodia, calibración, método, especificaciones y certificados con evidencia fuente.
7. El precio mostrado pertenece al bloque comercial de la infografía y no se interpreta aquí como cotización vigente verificada.

---

# 20. CIERRE

**FUR `FUR-CC-00087`: estado Activo, madurez global D4 - Operacional, madurez visual del activo 86 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR APTA para el ecosistema.**

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_CC_INFOGRAFIA_REV00.md`**


# 79. ANEXO — DOCUMENTO MAESTRO FUR-LAB

> Documento fuente interno de la ficha y arquitectura del dominio FUR-LAB.


# DOCUMENTO MAESTRO — FUR-LAB — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-LAB-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** 2026-09-16  
**Fuente:** Infografía suministrada por el usuario: **FUR-LAB — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental de todo el contenido legible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen el contenido gráfico de la fuente. Este documento no constituye por sí solo validación AS-FOUND, AS-BUILT, certificación de laboratorio, certificación OEM, validación metrológica ni aprobación de ingeniería.

> **Regla de fidelidad:** cuando la infografía presenta un dato como `Confirmado`, `Referencial`, `TBC`, `HOLD` o con madurez `D0–D5`, este documento conserva esa clasificación sin reinterpretarla.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-LAB — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Activos de Laboratorio | Una identidad. Todo su ciclo de vida.**

Principios/mensajes superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Operación segura**
- **Gestión del ciclo de vida**
- **Decisiones inteligentes**

Mensaje institucional superior:

> **Del análisis a un mayor valor**

Mensaje de integración del ecosistema:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje de pie:

> **ACTIVOS CONECTADOS, OPERACIÓN MÁS EFICIENTE, MAYOR VALOR**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-LAB-00478` |
| ID interno (UUID) | `c8f1b2a4-5f1d-4a92-a581-7e2b4d1f0a61` |
| Red / Dominio | `FUR-LAB (Laboratorios)` |
| Nombre del activo | `Espectrómetro ICP-OES LAB-01` |
| Tipo / Familia | `Equipo de laboratorio / Análisis químico` |
| Estado | `Activo` |
| Madurez global | `D4 - Operacional` |
| Versión | `1.0` |
| Fecha creación | `2026-09-16` |

La cabecera incorpora un **código QR** asociado a la identidad FUR.

---

# 2. ACTIVO DESTACADO Y UBICACIÓN EN PLANTA

## 2.1 Activo principal

**Espectrómetro ICP-OES LAB-01**

Identificación mostrada sobre la imagen:

`FUR-LAB-00478 | Laboratorio Central`

## 2.2 Ubicación en la planta

| Campo | Valor visible |
|---|---|
| Zona | `Laboratorio Central` |
| Área | `Laboratorio Metalúrgico` |
| Proceso | `Análisis Químico Au/Ag` |
| Ubicación física | `Sala ICP / Banco 02` |
| Acción visual | `Ver en Mapa Interactivo` |

La infografía incluye una miniatura cartográfica para contextualizar la ubicación del equipo.

---

# 3. FLUJO ANALÍTICO REPRESENTADO

La secuencia funcional visible es:

```text
Muestreo
   ↓
Preparación
   ↓
Digestión
   ↓
Análisis ICP-OES
   ↓
QA/QC
   ↓
Reporte LIMS
```

La cadena muestra el recorrido analítico desde la muestra hasta el registro de resultados en el sistema LIMS.

---

# 4. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía presenta diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia Eléctrica |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-LAB** aparece resaltada como dominio activo.

---

# 5. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza la información maestra en nueve bloques.

## 5.1 Bloque 1 — Identidad

Incluye:

- Código.
- Nombre.
- Tipo.
- Estado.
- Versión.

## 5.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Proceso
→ Sistema
→ Ubicación
```

## 5.3 Bloque 3 — Clasificación

Incluye:

- Familia.
- Clase.
- Criticidad.
- Tags.

## 5.4 Bloque 4 — Responsabilidad

Incluye:

- Propietario.
- Custodio.
- Responsable técnico.

## 5.5 Bloque 5 — Ciclo de vida

Incluye:

- Alta.
- Puesta en servicio.
- Inspecciones.
- Retiro.

## 5.6 Bloque 6 — Documentación

Incluye:

- Manuales.
- Métodos.
- Calibraciones.
- Fotos.

## 5.7 Bloque 7 — Relaciones

Incluye relaciones como:

- Analiza.
- Comunica.
- Mantiene.
- Soporta.

## 5.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 5.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Sinónimos.
- Códigos externos.

---

# 6. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-LAB

## 6.1 Parámetros técnicos visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---:|---|---|---|
| Tipo de equipo | ICP-OES | — | Confirmado | D4 |
| Técnica analítica | ICP-OES multielemental | — | Confirmado | D4 |
| Matriz de análisis | Solución digerida | — | Referencial | D3 |
| Elementos | Au, Ag, Cu, Fe, Zn, Pb | — | Referencial | D3 |
| Rango operativo | 0.01 - 1000 | mg/L | Referencial | D3 |
| Precisión | ±2 | %RSD | Referencial | D3 |
| Límite de detección Au | 0.005 | mg/L | Referencial | D3 |
| Tiempo por corrida | 4 - 6 | min | Referencial | D3 |
| Frecuencia de calibración | Diaria | — | Referencial | D3 |
| Integración LIMS | Activa | — | Confirmado | D4 |

## 6.2 Dimensiones principales mostradas

La vista lateral del equipo indica aproximadamente:

- **Ancho:** `1.6 m`
- **Altura:** `1.2 m`
- **Profundidad:** `0.8 m`

> Las dimensiones se transcriben tal como aparecen en la infografía y no sustituyen un plano dimensional ni un datasheet certificado.

## 6.3 Subtablas FUR-LAB principales

| Subtabla | Propósito indicado |
|---|---|
| `fur_lab_method` | Métodos y matrices |
| `fur_lab_sample` | Muestras y cadena de custodia |
| `fur_lab_result` | Analitos y resultados |
| `fur_lab_uncertainty` | Incertidumbre |
| `fur_lab_calibration` | Curvas y calibración |
| `fur_lab_qaqc` | Blancos, duplicados, estándares |

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Fabricante | Agilent |
| Marca / Modelo | Agilent 5110 ICP-OES |
| N.º de serie | TBC |
| Proveedor | Distribuidor autorizado / `res_partner` |
| País de origen | USA |
| Certificaciones | ISO 9001, CE |
| Garantía | 12 meses |
| Precio referencial | USD 95,000 |
| Moneda | USD |
| Plazo de entrega | 10 - 14 semanas |
| MOQ (repuesto) | Según ítem |
| Empaque | Estándar exportación |
| Vínculo RQ / OF / PO | `RQ-LAB-001 | OF-LAB-004 | PO-TBC` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `nombre` | `product.template.name` | varchar | — | `idx_name` |
| `tipo_activo` | `product.template.categ_id` | many2one | — | — |
| `ubicación` | `stock.location.id` | many2one | — | — |
| `equipo_mantenible` | `maintenance.equipment.id` | many2one | — | — |
| `serie` | `stock.lot.name` | varchar | Sí | `idx_serial` |
| `proveedor` | `res.partner.id` | many2one | — | — |
| `metodo_lab` | `fur_lab_method.method_code` | varchar | — | `idx_method` |
| `resultado` | `fur_lab_result.result_value` | numeric | — | `idx_result` |
| `documentos` | `ir.attachment.id` | many2one | — | — |

## 8.1 Lectura arquitectónica

La infografía representa un patrón híbrido:

```text
Odoo 19
   +
Tablas FUR-LAB
   +
Equipos analíticos
   +
LIMS
   +
QA/QC
   +
Documentos / calibración
```

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Pertenece | LAB-01 | Laboratorio Central | N:1 | Parte de la red de laboratorios |
| Analiza | LAB-01 | Muestra MS-245 | 1:N | Ensayo de Au/Ag en muestra |
| Se integra con | LAB-01 | LIMS-01 | 1:1 | Gestión de resultados |
| Comunica | LAB-01 | Gateway IOT-LAB | 1:1 | Datos y estado del equipo |
| Mantiene | LAB-01 | OT-MNT-054 | 1:N | Órdenes de trabajo y servicio |
| Soporta | LAB-01 | FUR-CC-012 | 1:N | Verificación y QA/QC |
| Solicita | LAB-01 | RQ-LAB-011 | 1:N | Reactivos y consumibles |
| Asociado a | LAB-01 | DOC-LAB-07 | 1:N | Procedimientos y métodos |

Estas relaciones sitúan al equipo analítico como nodo integrado entre laboratorio, muestras, LIMS, IoT, mantenimiento, control de calidad, requisiciones y documentación.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Manual de operación | `ICP_OES_Manual.pdf` | v2.1 | Vigente |
| SOP de preparación | `SOP_PREP_MUESTRAS.pdf` | v1.5 | Vigente |
| Método analítico | `MET_ICP_AuAg_01.pdf` | v3.0 | Vigente |
| Certificado de calibración | `CAL_ICP_2026.pdf` | v1.0 | Vigente |
| IQ/OQ/PQ | `IQOQPQ_LAB01.pdf` | v1.0 | Vigente |
| Fotografía | `LAB01_Foto.jpg` | — | Vigente |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del activo

La infografía muestra:

> **Madurez del activo: 84 %**

La cabecera identifica la madurez global como:

> **D4 - Operacional**

---

# 12. GOBERNANZA DEL ACTIVO

La infografía presenta un bloque específico de gobernanza:

| Rol | Responsable visible |
|---|---|
| Propietario funcional | Jefe de Laboratorio |
| Custodio | QA/QC |
| Aprobador | Superintendente de Planta |

Esta asignación representa el esquema funcional de responsabilidad mostrado para la FUR-LAB.

---

# 13. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar serial exacto del equipo | TBC |
| 2 | Validar fecha del último certificado de calibración | TBC |
| 3 | Cargar coordenada y código definitivo de ubicación | TBC |
| 4 | Confirmar BOM de repuestos críticos | HOLD |
| 5 | Vincular orden de compra o contrato de servicio | TBC |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 14. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico completo.
- ✓ Bloque comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Roles RBAC sugeridos.

Resultado visual:

> **FUR APTA para el ecosistema**

---

# 15. ARQUITECTURA FUNCIONAL DE LA FUR-LAB

La lógica funcional del registro puede representarse de la siguiente manera:

```text
                      FUR-CC / Muestra
                            │
                            ▼
                       Muestreo
                            │
                            ▼
                      Preparación
                            │
                            ▼
                        Digestión
                            │
                            ▼
                 Espectrómetro ICP-OES
                    FUR-LAB-00478
                            │
           ┌────────────────┼────────────────┐
           │                │                │
           ▼                ▼                ▼
         QA/QC           LIMS-01        Gateway IOT-LAB
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
                   Resultados analíticos
                            │
                            ▼
                      Reporte LIMS
                            │
           ┌────────────────┼────────────────┐
           │                │                │
           ▼                ▼                ▼
       FUR-PROC          FUR-CC          Documentos
      Decisiones       Validación       / Evidencia
```

---

# 16. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-LAB-00478
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Jerarquía
│   ├── Laboratorio Central
│   ├── Laboratorio Metalúrgico
│   ├── Análisis Químico Au/Ag
│   └── Sala ICP / Banco 02
│
├── Activo
│   └── Espectrómetro ICP-OES LAB-01
│
├── Técnica analítica
│   ├── ICP-OES multielemental
│   ├── Matriz: solución digerida
│   ├── Au, Ag, Cu, Fe, Zn, Pb
│   ├── Rango 0.01–1000 mg/L
│   ├── Precisión ±2 %RSD
│   ├── LOD Au 0.005 mg/L
│   ├── Corrida 4–6 min
│   └── Calibración diaria
│
├── Integraciones
│   ├── LIMS-01
│   ├── Gateway IOT-LAB
│   ├── FUR-CC
│   ├── FUR-MNT
│   ├── FUR-RQ
│   └── Documentación
│
├── Sourcing
│   ├── Agilent
│   ├── Agilent 5110 ICP-OES
│   ├── Serie TBC
│   ├── Distribuidor autorizado
│   ├── ISO 9001 / CE
│   ├── Garantía
│   ├── Precio
│   └── RQ / OF / PO
│
├── QA/QC
│   ├── Blancos
│   ├── Duplicados
│   └── Estándares
│
├── Documentos
│   ├── Manual
│   ├── SOP
│   ├── Método analítico
│   ├── Certificado de calibración
│   ├── IQ/OQ/PQ
│   └── Fotografía
│
├── Gobernanza
│   ├── Jefe de Laboratorio
│   ├── QA/QC
│   └── Superintendente de Planta
│
└── Gobierno del dato
    ├── D0–D5
    ├── 84 % madurez visual
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 17. CICLO DE VIDA FUR-LAB

Tomando únicamente los elementos visibles de la infografía, la FUR-LAB integra:

```text
Identidad
→ Jerarquía y ubicación
→ Clasificación
→ Alta / puesta en servicio
→ Muestreo
→ Preparación
→ Digestión
→ Análisis
→ QA/QC
→ Calibración
→ Registro en LIMS
→ Reporte
→ Mantenimiento
→ Documentación
→ Auditoría
→ Trazabilidad
```

---

# 18. DIFERENCIACIÓN FUNCIONAL FUR-LAB / FUR-CC

La infografía establece una relación clara entre:

```text
FUR-CC
Muestra / control de calidad
        │
        ▼
FUR-LAB
Equipo + método + corrida + resultado analítico
```

En esta representación:

- **FUR-CC** aporta la muestra y el contexto de calidad.
- **FUR-LAB** representa el equipo de laboratorio, método analítico, QA/QC, integración LIMS y resultados.
- La relación evita que la identidad de la muestra se confunda con la identidad del equipo o del análisis.

---

# 19. RESUMEN EJECUTIVO

La imagen describe la **FUR-LAB-00478** correspondiente al **Espectrómetro ICP-OES LAB-01** del **Laboratorio Central**, utilizado en el contexto de **Análisis Químico Au/Ag**.

La ficha concentra en un único expediente digital:

1. identidad y codificación FUR;
2. ubicación funcional;
3. técnica analítica;
4. matriz y elementos;
5. rango, precisión y límite de detección;
6. tiempo de corrida y calibración;
7. integración LIMS;
8. fabricante/proveedor y sourcing;
9. mapeo Odoo 19;
10. relaciones transversales;
11. documentos y evidencias;
12. gobernanza del activo;
13. madurez D0–D5;
14. pendientes TBC/HOLD;
15. checklist de validación.

La cadena visual principal es:

```text
Muestreo
→ Preparación
→ Digestión
→ Análisis ICP-OES
→ QA/QC
→ Reporte LIMS
```

---

# 20. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente del fabricante, modelo, precio, dimensiones, método, LOD, precisión, rango, certificaciones, documentos, calibraciones ni referencias RQ/OF/PO.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan tal como aparecen en la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El serial del equipo permanece **TBC** según la propia fuente gráfica.
6. El mapeo Odoo/FUR debe verificarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
7. Para convertir esta ficha en un registro AS-BUILT/operacional plenamente validado deben cerrarse los TBC/HOLD y reconciliarse ubicación, serial, calibración, BOM, contrato/PO, método, QA/QC e integración LIMS con evidencia fuente.
8. Los valores analíticos mostrados son parte del contenido gráfico y no deben interpretarse como capacidades garantizadas sin documentación OEM.

---

# 21. CIERRE

**FUR `FUR-LAB-00478`: estado Activo, madurez global D4 - Operacional, madurez visual del activo 84 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR APTA para el ecosistema.**

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_LAB_INFOGRAFIA_REV00.md`**


# 80. ANEXO — DOCUMENTO MAESTRO FUR-MNT

> Documento fuente interno de la ficha y arquitectura del dominio FUR-MNT.


# DOCUMENTO MAESTRO — FUR-MNT — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-MNT-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** 2026-09-16  
**Fuente:** Infografía suministrada por el usuario: **FUR-MNT — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental de todo el contenido legible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen el contenido gráfico de la fuente. Este documento no constituye por sí solo validación AS-FOUND, AS-BUILT, certificación OEM, estrategia RCM aprobada, plan de mantenimiento autorizado ni verificación independiente de campo.

> **Regla de fidelidad:** cuando la infografía presenta un dato como `Confirmado`, `Referencial`, `TBC`, `HOLD` o con madurez `D0–D5`, este documento conserva esa clasificación sin reinterpretarla.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-MNT — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Activos de Mantenimiento | Una identidad. Todo su ciclo de vida.**

Principios/mensajes superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Operación segura**
- **Gestión del ciclo de vida**
- **Decisiones inteligentes**

Mensaje institucional superior:

> **Mantenimiento confiable, mayor valor**

Mensaje de integración del ecosistema:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje de pie:

> **ACTIVOS CONECTADOS, MANTENIMIENTO CONFIABLE, MAYOR VALOR**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-MNT-00621` |
| ID interno (UUID) | `a3f9c6e2-7b4e-4c2d-8f1e-9d2a7f1e0007` |
| Red / Dominio | `FUR-MNT (Mantenimientos)` |
| Nombre del activo | `Bomba de Pulpa BP-01` |
| Tipo / Familia | `Activo mantenible / Bombeo` |
| Estado | `Activo` |
| Madurez global | `D4 - Operacional` |
| Versión | `1.0` |
| Fecha creación | `2025-09-14` |

La cabecera incorpora un **código QR** asociado a la identidad FUR.

---

# 2. ACTIVO DESTACADO Y UBICACIÓN EN PLANTA

## 2.1 Activo principal

**Bomba de Pulpa BP-01**

Identificación mostrada sobre la imagen:

`FUR-MNT-00621 | Área Molienda`

## 2.2 Ubicación en la planta

| Campo | Valor visible |
|---|---|
| Zona | `03 - Molienda` |
| Área | `Mantenimiento` |
| Proceso | `Bombeo de pulpa` |
| Coordenadas | `-12.0467, -76.9381` |
| Acción visual | `Ver en Mapa Interactivo` |

La infografía incorpora una miniatura cartográfica asociada a la ubicación del activo.

---

# 3. FLUJO DE MANTENIMIENTO REPRESENTADO

La secuencia funcional visible es:

```text
Inspección
   ↓
Diagnóstico
   ↓
Planificación
   ↓
OT
   ↓
Ejecución
   ↓
Prueba
   ↓
Cierre
```

Esta cadena representa el ciclo de gestión de mantenimiento desde la inspección inicial hasta el cierre de la intervención.

---

# 4. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía presenta diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia Eléctrica |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-MNT** aparece resaltada como dominio activo.

Principio visual:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

---

# 5. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza la información maestra en nueve bloques.

## 5.1 Bloque 1 — Identidad

Incluye:

- Código.
- Nombre.
- Tipo.
- Estado.
- Versión.

## 5.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Proceso
→ Sistema
→ Ubicación
```

## 5.3 Bloque 3 — Clasificación

Incluye:

- Familia.
- Clase.
- Criticidad.
- Tags.

## 5.4 Bloque 4 — Responsabilidad

Incluye:

- Propietario.
- Custodio.
- Responsable técnico.

## 5.5 Bloque 5 — Ciclo de vida

Incluye:

- Alta.
- Puesta en servicio.
- Inspecciones.
- Retiro.

## 5.6 Bloque 6 — Documentación

Incluye:

- Manuales.
- Planos.
- Certificados.
- Fotos.

## 5.7 Bloque 7 — Relaciones

Incluye relaciones tales como:

- Pertenece.
- Alimenta.
- Repuesto de.
- Otras relaciones del ecosistema.

## 5.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 5.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Sinónimos.
- Códigos externos.

---

# 6. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-MNT

## 6.1 Parámetros técnicos visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---:|---|---|---|
| Tipo de activo | Bomba de pulpa | — | Confirmado | D4 |
| Estrategia de mantenimiento | Preventivo / Predictivo | — | Confirmado | D4 |
| Potencia del motor | 450 | kW | Referencial | D3 |
| Caudal nominal | 320 | m³/h | Referencial | D3 |
| Presión de descarga | 3.2 | bar | Referencial | D3 |
| Frecuencia de inspección | 7 | días | Confirmado | D4 |
| Frecuencia de lubricación | 30 | días | Confirmado | D4 |
| MTBF objetivo | 1250 | h | Referencial | D3 |
| MTTR objetivo | 4.6 | h | Referencial | D3 |
| Próxima intervención | 2025-09-20 | fecha | Confirmado | D4 |

## 6.2 Dimensiones principales mostradas

La vista lateral de la bomba indica aproximadamente:

- **Longitud total:** `2.1 m`
- **Altura:** `1.2 m`

> Las dimensiones se transcriben tal como aparecen en la infografía y no sustituyen un plano dimensional ni un datasheet certificado.

## 6.3 Subtablas FUR-MNT principales

| Subtabla | Propósito indicado |
|---|---|
| `fur_maintenance_plan` | Plan preventivo y frecuencias |
| `fur_asset_bom_line` | Repuestos y materiales |
| `fur_work_order_link` | OT e historial |
| `fur_maintenance_condition` | Inspecciones y condición |
| `fur_failure_event` | Modos de falla |
| `fur_maintenance_kpi` | KPI MTBF / MTTR / disponibilidad |

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Fabricante | WEIR |
| Marca / Modelo | Warman 6/4 |
| N.º de serie | `SN-BP645-2024` |
| Proveedor | Weir Minerals |
| País de origen | Reino Unido |
| Certificaciones | ISO 9001, CE |
| Garantía | 24 meses |
| Precio referencial | USD 18,500 |
| Moneda | USD |
| Plazo de entrega | 8 - 12 semanas |
| MOQ (repuesto) | Según ítem |
| Empaque | Estándar exportación |
| Vínculo RQ / OF / PO | `RQ-2025-0062 | OF-2025-0038 | PO-2025-0142` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `nombre` | `maintenance.equipment.name` | varchar | — | `idx_name` |
| `product_template` | `product.template.name` | varchar | — | — |
| `tipo_activo` | `maintenance.equipment.category_id` | many2one | — | — |
| `ubicación` | `stock.location.id` | many2one | — | — |
| `responsable` | `hr.employee.id` | many2one | — | — |
| `serie` | `stock.lot.name` | varchar | Sí | `idx_serial` |
| `proveedor` | `res.partner.id` | many2one | — | — |
| `precio_ref` | `product.supplierinfo.price` | numeric | — | — |
| `plan_mantenimiento` | `fur_maintenance_plan.*` | tabla propia | — | `idx_mnt` |
| `ordenes_trabajo` | `maintenance.request.id` | many2one | — | `idx_ot` |
| `documentos` | `ir.attachment.id` | many2one | — | — |

## 8.1 Lectura arquitectónica

La infografía representa un patrón híbrido:

```text
Odoo 19
   +
maintenance.equipment
   +
maintenance.request
   +
Tablas propias FUR-MNT
   +
Documentos / BOM / KPI / condición
```

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Pertenece | BP-01 | Línea Molienda | N:1 | Parte del sistema |
| Consume energía | BP-01 | Transformador T-01 | N:1 | Alimentación eléctrica |
| Monitoreado por | BP-01 | Sensor VIB-019 | 1:N | Vibración y condición |
| Gestionado por | BP-01 | OT-000567 | 1:N | Órdenes de trabajo |
| Tiene repuestos | BP-01 | BOM-M245 | 1:N | Lista de materiales |
| Analiza condición | BP-01 | FUR-LAB-021 | N:1 | Lubricante / análisis |
| Asociado a | BP-01 | Cámara CAM-03 | N:1 | Seguridad / video |
| Soporta | BP-01 | Proceso Molienda | N:1 | Continuidad operativa |

Estas relaciones conectan el activo mantenible con proceso, potencia, IoT, órdenes de trabajo, BOM, laboratorio, cámaras y continuidad de operación.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Manual de mantenimiento | `Warman_BP_Manual.pdf` | v2.1 | Vigente |
| Plano general | `GA_BP_01.dwg` | v1.3 | Vigente |
| Plano explosión repuestos | `BOM_BP_01.xlsx` | v1.0 | Vigente |
| Procedimiento SOP | `SOP-MNT-014.pdf` | v1.2 | Vigente |
| Informe de condición | `Insp_BP_01_2025-08.pdf` | v1.0 | Vigente |
| Fotografía | `BP01_Foto.jpg` | — | Vigente |
| Historial de mantenimiento | `Hist_MNT_BP01.pdf` | v1.0 | Vigente |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del activo

La infografía muestra:

> **Madurez del activo: 84 %**

La cabecera identifica la madurez global como:

> **D4 - Operacional**

---

# 12. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar potencia exacta del motor | TBC |
| 2 | Validar curva real de caudal / presión | TBC |
| 3 | Levantar lista final de repuestos críticos | TBC |
| 4 | Confirmar fecha de overhaul mayor | HOLD |
| 5 | Verificar horas acumuladas de operación | TBC |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 13. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico completo.
- ✓ Bloque comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Lista para operación.

Resultado visual:

> **FUR APTA para el ecosistema**

---

# 14. ARQUITECTURA FUNCIONAL DE LA FUR-MNT

La lógica funcional del registro puede representarse de la siguiente manera:

```text
                      FUR-PROC
                    Proceso Molienda
                          │
                          ▼
                    Bomba de Pulpa BP-01
                     FUR-MNT-00621
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
        ▼                 ▼                  ▼
     FUR-PTE           FUR-IOT             FUR-MNT
 Transformador T-01   Sensor VIB-019      Plan / OT / KPI
        │                 │                  │
        └─────────────────┼──────────────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
              ▼           ▼           ▼
           BOM /       FUR-LAB      FUR-CAM
         Repuestos     Análisis     Seguridad
              │
              ▼
         Requisiciones /
           Sourcing
```

---

# 15. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-MNT-00621
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Jerarquía
│   ├── Zona 03 - Molienda
│   ├── Área Mantenimiento
│   └── Proceso Bombeo de pulpa
│
├── Activo
│   └── Bomba de Pulpa BP-01
│
├── Datos técnicos
│   ├── Potencia del motor
│   ├── Caudal nominal
│   ├── Presión de descarga
│   ├── Dimensiones
│   └── Condición
│
├── Estrategia
│   ├── Preventivo
│   ├── Predictivo
│   ├── Inspección cada 7 días
│   ├── Lubricación cada 30 días
│   └── Próxima intervención
│
├── Confiabilidad
│   ├── MTBF objetivo
│   ├── MTTR objetivo
│   └── Disponibilidad
│
├── Sourcing
│   ├── WEIR
│   ├── Warman 6/4
│   ├── Serie SN-BP645-2024
│   ├── Weir Minerals
│   ├── Certificaciones
│   ├── Garantía
│   ├── Precio
│   └── RQ / OF / PO
│
├── Relaciones
│   ├── Línea Molienda
│   ├── Transformador T-01
│   ├── Sensor VIB-019
│   ├── OT-000567
│   ├── BOM-M245
│   ├── FUR-LAB-021
│   ├── CAM-03
│   └── Proceso Molienda
│
├── Documentos
│   ├── Manual de mantenimiento
│   ├── Plano general
│   ├── BOM
│   ├── SOP
│   ├── Informe de condición
│   ├── Fotografía
│   └── Historial de mantenimiento
│
└── Gobierno del dato
    ├── D0–D5
    ├── 84 % madurez visual
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 16. CICLO DE VIDA FUR-MNT

Tomando únicamente los elementos visibles de la infografía, la FUR-MNT integra:

```text
Identidad
→ Jerarquía / ubicación
→ Clasificación
→ Alta / puesta en servicio
→ Inspección
→ Diagnóstico
→ Planificación
→ Orden de trabajo
→ Ejecución
→ Prueba
→ Cierre
→ Historial
→ KPI / confiabilidad
→ Repuestos / BOM
→ Documentación
→ Auditoría
→ Mejora continua
```

---

# 17. INDICADORES DE MANTENIMIENTO REPRESENTADOS

La infografía utiliza explícitamente los siguientes conceptos KPI:

- **MTBF objetivo:** `1250 h`
- **MTTR objetivo:** `4.6 h`
- **Disponibilidad** como indicador asociado a `fur_maintenance_kpi`

La subtabla especializada indicada es:

`fur_maintenance_kpi`

con propósito:

> **KPI MTBF / MTTR / disponibilidad**

> Los valores se transcriben de la infografía y no se interpretan como metas oficialmente aprobadas fuera de esta fuente gráfica.

---

# 18. RELACIÓN ENTRE MANTENIMIENTO, CONDICIÓN Y REPUESTOS

La estructura de la infografía refleja la siguiente lógica:

```text
Activo mantenible
      │
      ├── Plan preventivo / predictivo
      │
      ├── Inspecciones / condición
      │
      ├── Eventos / modos de falla
      │
      ├── OT e historial
      │
      ├── KPI de confiabilidad
      │
      └── BOM / repuestos
              │
              ▼
        RQ / OF / PO
```

Esto vincula la gestión técnica con el abastecimiento y el historial del activo.

---

# 19. RESUMEN EJECUTIVO

La imagen describe la **FUR-MNT-00621** correspondiente a la **Bomba de Pulpa BP-01** del área de Molienda.

La ficha concentra en un único expediente digital:

1. identidad y codificación FUR;
2. ubicación funcional;
3. estrategia preventivo/predictivo;
4. parámetros técnicos del activo;
5. frecuencias de inspección y lubricación;
6. MTBF y MTTR;
7. próxima intervención;
8. fabricante, proveedor y sourcing;
9. mapeo Odoo 19;
10. relaciones transversales;
11. OT, BOM y repuestos;
12. documentación y evidencia;
13. madurez D0–D5;
14. pendientes TBC/HOLD;
15. checklist de validación.

La cadena visual principal es:

```text
Inspección
→ Diagnóstico
→ Planificación
→ OT
→ Ejecución
→ Prueba
→ Cierre
```

---

# 20. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente del fabricante, modelo, serie, precio, potencia, caudal, presión, dimensiones, MTBF, MTTR, frecuencias, documentos, certificaciones ni referencias RQ/OF/PO.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan tal como aparecen en la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El mapeo Odoo/FUR debe verificarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
6. Para convertir esta ficha en un registro AS-BUILT/operacional plenamente validado deben cerrarse los TBC/HOLD y reconciliarse placa de motor, curva de bomba, condición, BOM crítico, historial de overhaul, horas de operación, órdenes de trabajo y documentación con evidencia fuente.
7. El precio mostrado pertenece al bloque comercial de la infografía y no se interpreta como cotización vigente verificada.
8. Los KPI de confiabilidad deben ser reconciliados con la política oficial de mantenimiento antes de utilizarse como metas contractuales u operativas.

---

# 21. CIERRE

**FUR `FUR-MNT-00621`: estado Activo, madurez global D4 - Operacional, madurez visual del activo 84 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR APTA para el ecosistema.**

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_MNT_INFOGRAFIA_REV00.md`**


# 81. ANEXO — DOCUMENTO MAESTRO FUR-RQ

> Documento fuente interno de la ficha y arquitectura del dominio FUR-RQ.


# DOCUMENTO MAESTRO — FUR-RQ — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-RQ-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** `2026-09-16`  
**Fuente:** Infografía suministrada por el usuario: **FUR-RQ — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental de todo el contenido legible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen el contenido gráfico de la fuente. Este documento no constituye por sí solo aprobación de compra, autorización presupuestaria, orden de compra, validación AS-FOUND/AS-BUILT ni verificación comercial independiente.

> **Regla de fidelidad:** cuando la infografía presenta un dato como `Confirmado`, `Referencial`, `TBC`, `HOLD` o con madurez `D0–D5`, este documento conserva esa clasificación sin reinterpretarla.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-RQ — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Requisiciones de Compra | Una solicitud. Todo su ciclo de vida.**

Principios/mensajes superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Aprobación y control**
- **Gestión del ciclo de vida**
- **Decisiones inteligentes**

Mensaje institucional superior:

> **Del mineral a un mayor valor**

Mensaje central:

> **Requisiciones que conectan la operación con el suministro**

Mensaje de integración del ecosistema:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje de pie:

> **ACTIVOS CONECTADOS, OPERACIÓN MÁS EFICIENTE, MAYOR VALOR**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-RQ-00045` |
| ID interno (UUID) | `e772c8a1-9b3e-4d7a-b8df-1c8e3f000045` |
| Red / Dominio | `FUR-RQ (Requisiciones)` |
| Nombre del activo | `Requisición de Bomba Centrífuga 6×4` |
| Tipo / Familia | `Solicitud de compra / Repuesto` |
| Estado | `En revisión` |
| Madurez global | `D3 - En validación` |
| Versión | `1.0` |
| Fecha creación | `2025-09-14` |

La cabecera incorpora un **código QR** asociado a la identidad FUR.

---

# 2. FLUJO DE APROBACIÓN Y CONTEXTO

## 2.1 Estado del flujo de aprobación

La infografía muestra el siguiente estado:

| Etapa | Estado visual |
|---|---|
| Creación | Completada |
| Revisión técnica | Completada |
| Aprobación jefatura | En curso / pendiente |
| Aprobación compras | Pendiente |
| Convertir a FUR-OF / PO | Pendiente |

La imagen incluye la acción:

> **Ver en Mapa de Procesos**

## 2.2 Flujo general de requisición

La secuencia funcional visible es:

```text
Solicitud
   ↓
Revisión técnica
   ↓
Aprobación
   ↓
Oferta (FUR-OF)
   ↓
Orden de Compra (PO)
   ↓
Recepción
   ↓
Cierre
```

---

# 3. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía presenta diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia Eléctrica |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-RQ** aparece resaltada como dominio activo.

Principio visual:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

---

# 4. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza la información maestra en nueve bloques.

## 4.1 Bloque 1 — Identidad

Incluye:

- Código.
- Nombre.
- Tipo.
- Estado.
- Versión.

## 4.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Proceso
→ Sistema
→ Ubicación
```

## 4.3 Bloque 3 — Clasificación

Incluye:

- Familia.
- Clase.
- Criticidad.
- Tags.

## 4.4 Bloque 4 — Responsabilidad

Incluye:

- Solicitante.
- Área usuaria.
- Responsable técnico.

## 4.5 Bloque 5 — Ciclo de vida

Incluye:

- Creación.
- Aprobación.
- Conversión.
- Cierre.

## 4.6 Bloque 6 — Documentación

Incluye:

- Especificaciones.
- Planos.
- Cotizaciones.

## 4.7 Bloque 7 — Relaciones

Incluye:

- Activo relacionado.
- Repuestos.
- Ofertas.

## 4.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 4.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Sinónimos.
- Códigos externos.

---

# 5. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-RQ

## 5.1 Parámetros técnicos visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---|---|---|---|
| Tipo de requisición | Compra de repuesto | — | Confirmado | D4 |
| Activo asociado | Bomba Centrífuga BC-01 | — | Confirmado | D4 |
| Cantidad solicitada | 2 | und | Confirmado | D4 |
| Especificación técnica | API 610 | — | Referencial | D3 |
| Prioridad | Alta | — | Confirmado | D4 |
| Fecha requerida | 2025-10-15 | — | Confirmado | D4 |
| Justificación | Parada de mantenimiento programado | — | Confirmado | D4 |
| Estimación de costo | 25,000 | USD | Referencial | D3 |
| Centro de costo | Molienda | — | Confirmado | D4 |
| Tipo de presupuesto | CAPEX | — | Confirmado | D4 |

---

# 6. ACTIVO RELACIONADO Y USO ESPERADO

## 6.1 Activo relacionado

La infografía muestra:

> **Bomba Centrífuga BC-01**

Código relacionado visible:

`FUR-MNT-00123`

Acción visual:

> **Ver FUR del Activo**

## 6.2 Uso esperado

La infografía indica:

- **Reemplazo por desgaste**
- **Mantener disponibilidad del proceso**
- **Mejorar confiabilidad operacional**

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Fabricante | Grundfos (TBC) |
| Marca / Modelo | Grundfos / CR 32-6 |
| Proveedor sugerido | Comercial Andina S.A. (TBC) |
| País de origen | Dinamarca (TBC) |
| Certificaciones | ISO 9001, ISO 14001 |
| Precio referencial | USD 12,500.00 |
| Moneda | USD |
| Plazo de entrega | 6 - 8 semanas (TBC) |
| MOQ (si aplica) | 1 unidad |
| Garantía | 24 meses |
| Empaque | Caja estándar exportación |
| Vínculo RQ / OF / PO | `RQ-00045 | OF-2025-0021 | PO-2025-0098` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `nombre` | `purchase.requisition.name` | varchar | — | `idx_name` |
| `tipo_rq` | `purchase.requisition.type` | selection | — | — |
| `cantidad` | `purchase.requisition.line.qty` | numeric | — | — |
| `unidad` | `uom.uom.id` | many2one | — | — |
| `activo_relacionado` | `maintenance.equipment.id` | many2one | — | — |
| `proveedor_sugerido` | `res.partner.id` | many2one | — | — |
| `precio_ref` | `purchase.requisition.estimated_price` | numeric | — | — |
| `moneda` | `res.currency.id` | many2one | — | — |
| `estado` | `fur.record.state` | selection | — | `idx_state` |
| `documentos` | `ir.attachment.id` | many2many | — | — |

> Los nombres de modelos/campos se transcriben según la imagen y deben verificarse contra la instancia Odoo 19 objetivo antes de cualquier implementación real.

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Solicita | RQ-00045 | MNT-00123 | N:1 | Repuesto para activo |
| Pertenece | RQ-00045 | PROC-00123 | N:1 | Proceso usuario |
| Genera | RQ-00045 | OF-0021 | 1:N | Ofertas recibidas |
| Convierte en | RQ-00045 | PO-0098 | 1:1 | Orden de compra |
| Relaciona | RQ-00045 | L-00156 | N:1 | Ítem de catálogo |
| Soporta | RQ-00045 | CC-00078 | N:1 | Especificación / QA |
| Usa presupuesto | RQ-00045 | FIN-2025 | N:1 | Centro de costo |
| Vincula | RQ-00045 | LAB-00012 | N:1 | Ensayo de referencia |

Estas relaciones conectan la requisición con mantenimiento, proceso, oferta, orden de compra, catálogo, calidad, presupuesto y laboratorio.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Solicitud de compra | `RQ-00045.pdf` | v1.0 | Vigente |
| Especificación técnica | `ET_Bomba.pdf` | v1.2 | Vigente |
| Plano / Datasheet | `DS_CR32-6.pdf` | v1.1 | Vigente |
| Cotización proveedor | `COT_Andina.pdf` | v1.0 | Vigente |
| Comparativo técnico | `COMP_2025.xlsx` | v1.0 | En revisión |
| Aprobación jefatura | `APROB_JEF.pdf` | v1.0 | TBC |
| Recepción | `OC_RECP.pdf` | v1.0 | TBC |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del registro

La infografía muestra:

> **Madurez del registro: 76 %**

La cabecera identifica la madurez global como:

> **D3 - En validación**

---

# 12. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar precio final del proveedor | TBC |
| 2 | Adjuntar cotización formal | TBC |
| 3 | Validar plazo de entrega | TBC |
| 4 | Aprobación de jefatura | TBC |
| 5 | Confirmar especificación técnica | HOLD |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 13. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico completo.
- ✓ Bloque comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Lista para operación.

Resultado visual:

> **FUR APTA para el ecosistema**

> **Nota:** este resultado visual coexiste en la fuente con un estado maestro `En revisión`, madurez global `D3 - En validación` y pendientes `TBC/HOLD`. Este documento conserva ambos elementos tal como aparecen, sin reconciliarlos por inferencia.

---

# 14. ARQUITECTURA FUNCIONAL DE LA FUR-RQ

La lógica funcional del registro puede representarse así:

```text
                   Necesidad operacional
                           │
                           ▼
                    FUR-RQ-00045
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   FUR-MNT             FUR-PROC          Especificación
Activo asociado       Proceso usuario       técnica
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                    Revisión técnica
                           │
                           ▼
                      Aprobaciones
                           │
                           ▼
                       FUR-OF
                    Ofertas recibidas
                           │
                           ▼
                          PO
                   Orden de compra
                           │
                           ▼
                       Recepción
                           │
                           ▼
                         Cierre
```

---

# 15. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-RQ-00045
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Requisición
│   ├── Compra de repuesto
│   ├── Cantidad: 2 und
│   ├── Prioridad: Alta
│   ├── Fecha requerida
│   ├── Justificación
│   ├── CAPEX
│   └── Centro de costo: Molienda
│
├── Activo relacionado
│   ├── Bomba Centrífuga BC-01
│   └── FUR-MNT-00123
│
├── Especificación
│   └── API 610 (Referencial / D3)
│
├── Uso esperado
│   ├── Reemplazo por desgaste
│   ├── Mantener disponibilidad
│   └── Mejorar confiabilidad
│
├── Sourcing
│   ├── Grundfos (TBC)
│   ├── CR 32-6
│   ├── Comercial Andina S.A. (TBC)
│   ├── Dinamarca (TBC)
│   ├── ISO 9001 / ISO 14001
│   ├── Precio referencial
│   ├── Plazo de entrega
│   ├── Garantía
│   └── RQ / OF / PO
│
├── Relaciones
│   ├── MNT
│   ├── PROC
│   ├── OF
│   ├── PO
│   ├── Catálogo
│   ├── CC
│   ├── FIN
│   └── LAB
│
├── Documentos
│   ├── Solicitud
│   ├── Especificación técnica
│   ├── Datasheet
│   ├── Cotización
│   ├── Comparativo
│   ├── Aprobación
│   └── Recepción
│
└── Gobierno del dato
    ├── D0–D5
    ├── 76 % de madurez visual
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 16. CICLO DE VIDA FUR-RQ

Tomando únicamente los elementos visibles en la infografía, la FUR-RQ integra:

```text
Identidad
→ Creación
→ Vinculación al activo / proceso
→ Especificación técnica
→ Revisión técnica
→ Aprobación de jefatura
→ Aprobación de compras
→ Generación de FUR-OF
→ Comparación / evaluación
→ Conversión a PO
→ Recepción
→ Cierre
→ Auditoría / trazabilidad
```

---

# 17. RELACIÓN FUR-RQ / FUR-OF / PO

La imagen representa una separación funcional clara:

```text
FUR-RQ
Necesidad / solicitud interna
   │
   ▼
FUR-OF
Oferta(s) técnico-comercial(es)
   │
   ▼
PO
Orden de compra
```

La requisición no aparece tratada como un bien inventariable, sino como una entidad transaccional que articula la necesidad operativa con el proceso de suministro.

---

# 18. ESTADO DEL EXPEDIENTE

A partir del contenido visible:

```text
Código:           FUR-RQ-00045
Estado maestro:   En revisión
Madurez global:   D3 - En validación
Madurez visual:   76 %
TBC:              4
HOLD:             1
Flujo:
  Creación              ✓
  Revisión técnica      ✓
  Aprobación jefatura   Pendiente
  Aprobación compras    Pendiente
  FUR-OF / PO           Pendiente
```

---

# 19. RESUMEN EJECUTIVO

La imagen describe la **FUR-RQ-00045**, correspondiente a una **Requisición de Bomba Centrífuga 6×4**, relacionada con la **Bomba Centrífuga BC-01 / FUR-MNT-00123**.

La ficha concentra en un único expediente digital:

1. identidad y codificación FUR;
2. estado y madurez;
3. activo relacionado;
4. cantidad y prioridad;
5. especificación técnica;
6. fecha requerida;
7. justificación de mantenimiento;
8. estimación de costo y presupuesto;
9. fabricante/proveedor sugerido;
10. sourcing;
11. mapeo Odoo 19;
12. relaciones transversales;
13. documentos y evidencias;
14. flujo de aprobación;
15. pendientes TBC/HOLD;
16. checklist de validación.

La cadena visual principal es:

```text
Solicitud
→ Revisión técnica
→ Aprobación
→ FUR-OF
→ PO
→ Recepción
→ Cierre
```

---

# 20. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente del fabricante, modelo, precio, especificación API 610, proveedor, país de origen, plazo, certificaciones ni referencias RQ/OF/PO.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan tal como aparecen en la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El mapeo Odoo/FUR debe verificarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
6. Para convertir esta ficha en un registro transaccional plenamente aprobado deben cerrarse los TBC/HOLD, completar aprobaciones, validar la especificación técnica, adjuntar cotización formal y confirmar precio/plazo.
7. La presencia visual de `FUR APTA` no modifica el estado `En revisión` ni la madurez `D3 - En validación` mostrados en la propia fuente.
8. El precio referencial y la estimación de costo se conservan como datos gráficos; no se interpretan como cotización contractual vigente.

---

# 21. CIERRE

**FUR `FUR-RQ-00045`: estado En revisión, madurez global D3 - En validación, madurez visual del registro 76 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR APTA para el ecosistema**, sujeto a los pendientes y aprobaciones mostrados en la propia infografía.

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_RQ_INFOGRAFIA_REV00.md`**


# 82. ANEXO — DOCUMENTO MAESTRO FUR-OF

> Documento fuente interno de la ficha y arquitectura del dominio FUR-OF.


# DOCUMENTO MAESTRO — FUR-OF — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-OF-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** `2026-09-16`  
**Fuente:** Infografía suministrada por el usuario: **FUR-OF — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental de todo el contenido legible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen el contenido gráfico de la fuente. Este documento no constituye por sí solo aceptación comercial, adjudicación, orden de compra, verificación de proveedor, validación contractual ni aprobación presupuestaria.

> **Regla de fidelidad:** cuando la infografía presenta un dato como `Confirmado`, `Referencial`, `TBC`, `HOLD` o con madurez `D0–D5`, este documento conserva esa clasificación sin reinterpretarla.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-OF — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Ofertas Comerciales | Una identidad. Todo su ciclo de vida.**

Principios/mensajes superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Operación segura**
- **Gestión del ciclo de vida**
- **Decisiones inteligentes**

Mensaje institucional superior:

> **Proveedores que impulsan un mayor valor**

Mensajes promocionales visibles en la imagen central:

> **EQUIPOS — PROVEEDORES — SOLUCIONES PARA MINERÍA**

> **SOLUCIONES PARA UN MUNDO MÁS RESILIENTE**

Mensaje de integración del ecosistema:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje del bloque sourcing:

> **SOURCING Y PROVEEDORES ALIADOS PARA EL DESARROLLO**

Mensaje de pie:

> **OFERTAS CONECTADAS, SUMINISTRO SEGURO, MAYOR VALOR**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-OF-PB01-BPA-0023` |
| ID interno (UUID) | `a3f9c7de-17b9-4c81-8e6d-9b2f7f2a1104` |
| Red / Dominio | `FUR-OF (Ofertas Comerciales)` |
| Nombre del registro | `Oferta Bomba de Pulpa Warman 6/4` |
| Tipo / Familia | `Oferta técnico-comercial / Repuesto crítico` |
| Estado | `En revisión` |
| Madurez global | `D3 - Validado en revisión` |
| Versión | `1.0` |
| Fecha creación | `2025-09-14` |

La cabecera incorpora además un **código QR** asociado a la identidad FUR.

---

# 2. OFERTA DESTACADA Y CONTEXTO

## 2.1 Oferta principal

**Oferta Bomba de Pulpa BP-01**

Identificación mostrada en la imagen:

`FUR-OF-PB01-BPA-0023 | Planta de Beneficio de Oro`

## 2.2 Ubicación / Contexto

| Campo | Valor visible |
|---|---|
| Sitio | `Planta PB-01` |
| Área | `Molienda` |
| Proceso | `Bombeo de pulpa` |
| Solicitud origen | `FUR-RQ-PB01-BPA-0045` |
| Proveedor ofertante | `Weir Minerals` |
| Acción visual | `Ver expediente comercial` |

---

# 3. FLUJO COMERCIAL REPRESENTADO

La secuencia funcional visible es:

```text
Requisición
   ↓
Recepción OF
   ↓
Evaluación técnica
   ↓
Comparación
   ↓
Negociación
   ↓
Aprobación
   ↓
PO / Compra
```

Este flujo representa el ciclo comercial desde la requisición hasta la eventual formalización de la compra.

---

# 4. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía presenta diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-OF** aparece resaltada como dominio activo.

Principio visual:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

---

# 5. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza la información maestra en nueve bloques.

## 5.1 Bloque 1 — Identidad

Incluye:

- Código.
- Tipo.
- Estado.
- Versión.

## 5.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Proceso
→ Solicitud
```

## 5.3 Bloque 3 — Clasificación

Incluye:

- Familia.
- Criticidad.
- Categoría.
- Proveedor.

## 5.4 Bloque 4 — Responsabilidad

Incluye:

- Compras.
- Técnico.
- Solicitante.

## 5.5 Bloque 5 — Ciclo de vida

Incluye:

- Emisión.
- Evaluación.
- Vigencia.
- Cierre.

## 5.6 Bloque 6 — Documentación

Incluye:

- Cotización.
- Ficha.
- Certificados.
- Anexos.

## 5.7 Bloque 7 — Relaciones

Incluye:

- RQ.
- Activo.
- Proveedor.
- PO.
- Comparativas.

## 5.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 5.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Códigos externos.
- SKU.

---

# 6. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-OF

## 6.1 Parámetros técnicos y comerciales visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---:|---|---|---|
| Tipo de oferta | Técnico-comercial integral | — | Confirmado | D4 |
| Equipo ofertado | Bomba de pulpa Warman 6/4 | — | Referencial | D3 |
| Cantidad | 1 | und | Confirmado | D4 |
| Moneda | USD | — | Confirmado | D4 |
| Precio unitario | 12,500 | USD | Referencial | D3 |
| Plazo de entrega | 14 - 18 | semanas | Referencial | D3 |
| Vigencia de oferta | 30 | días | Confirmado | D4 |
| Garantía | 24 | meses | Referencial | D3 |
| Incoterm | FCA | — | TBC | D2 |
| Forma de pago | 50% anticipo / 50% despacho | — | TBC | D2 |
| Cumplimiento técnico | 92 | % | Referencial | D3 |
| Alternativas / desviaciones | 2 | ítems | Referencial | D2 |

## 6.2 Resumen económico / completitud documental

La infografía muestra un indicador circular:

> **88 % — Completitud documental**

## 6.3 Subtablas FUR-OF principales

| Subtabla | Propósito indicado |
|---|---|
| `fur_offer_header` | Cabecera de oferta |
| `fur_offer_item` | Ítems cotizados |
| `fur_offer_term` | Condiciones comerciales |
| `fur_offer_compliance` | Cumplimiento técnico |
| `fur_offer_deviation` | Excepciones / desviaciones |
| `fur_offer_evaluation` | Puntuación y ranking |

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Fabricante | Weir |
| Marca / Modelo | Warman 6/4 AH |
| N.º de oferta | `OF-2025-0023` |
| Proveedor | Weir Minerals Perú S.A. |
| País de origen | Perú / fabricación internacional |
| Certificaciones | ISO 9001, CE, dossier QA |
| Garantía | 24 meses |
| Precio referencial | USD 12,500 |
| Moneda | USD |
| Plazo de entrega | 14 - 18 semanas |
| MOQ (repuesto) | 1 und |
| Empaque | Exportación estándar |
| Vínculo RQ / OF / PO | `RQ-2025-0045 | OF-2025-0023 | PO-PENDIENTE` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `partner_id` | `res.partner.id` | many2one | — | `idx_partner` |
| `rq_id` | `fur.request.header.id` | many2one | — | `idx_rq` |
| `offer_number` | `fur.offer.header.offer_no` | varchar | Sí | `idx_offer_no` |
| `price_total` | `fur.offer.item.price_total` | numeric | — | `idx_price` |
| `currency_id` | `res.currency.id` | many2one | — | — |
| `validity_date` | `fur.offer.term.validity_date` | date | — | `idx_validity` |
| `document_id` | `ir.attachment.id` | many2one | — | — |
| `state` | `fur.offer.header.state` | varchar | — | `idx_state` |

## 8.1 Lectura arquitectónica

La infografía representa un patrón híbrido:

```text
Odoo 19
   +
res.partner / res.currency / ir.attachment
   +
Tablas FUR-OF
   +
FUR-RQ
   +
Evaluación técnico-comercial
   +
PO / Compra
```

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Responde a | OF-0023 | RQ-0045 | N:1 | Oferta responde a requisición |
| Cotiza para | OF-0023 | MNT-00621 | N:1 | Activo/repuesto asociado |
| Compara con | OF-0023 | OF-0021 | N:N | Benchmark comercial |
| Soporta | OF-0023 | PROC-00123 | N:1 | Soporte al proceso de molienda |
| Mantiene | OF-0023 | MNT-00621 | N:1 | Insumo para mantenimiento |
| Asociado a | OF-0023 | PROV-00034 | N:1 | Proveedor ofertante |

Estas relaciones conectan la oferta con la requisición de origen, el activo/repuesto, otras ofertas comparables, el proceso de molienda, mantenimiento y el proveedor.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Cotización formal | `OF_2025_0023.pdf` | v1.0 | Vigente |
| Ficha técnica | `Warman_6x4_datasheet.pdf` | v3.2 | Vigente |
| Matriz comparativa | `Comparativa_BP01.xlsx` | v1.1 | Vigente |
| Certificado QA | `QA_Pack_Weir.pdf` | v1.0 | Vigente |
| Correo de aclaratorias | `Aclaratorias_RFQ.msg` | — | Vigente |
| Lista de repuestos | `Spare_List_BP01.xlsx` | v2.0 | Vigente |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del expediente

La infografía muestra:

> **Madurez del expediente: 84 %**

La cabecera identifica la madurez global como:

> **D3 - Validado en revisión**

---

# 12. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar Incoterm final | TBC |
| 2 | Validar forma de pago aprobada | TBC |
| 3 | Recibir PO oficial del fabricante | HOLD |
| 4 | Confirmar plazo final post-negociación | TBC |
| 5 | Cerrar evaluación comparativa multicotización | TBC |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 13. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Oferta ligada a RQ.
- ✓ Lista para comité de compras.

Resultado visual:

> **FUR OF CON PENDIENTES**

---

# 14. ARQUITECTURA FUNCIONAL DE LA FUR-OF

La lógica funcional del registro puede representarse así:

```text
                    FUR-RQ / Requisición
                            │
                            ▼
                       FUR-OF-0023
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
       ▼                    ▼                    ▼
  Proveedor /           Activo /             Proceso
 PROV-00034            MNT-00621           PROC-00123
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
                            ▼
                    Evaluación técnica
                            │
                            ▼
                      Comparación N:N
                    con otras ofertas
                            │
                            ▼
                       Negociación
                            │
                            ▼
                        Aprobación
                            │
                            ▼
                      PO / Compra
```

---

# 15. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-OF-PB01-BPA-0023
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Contexto
│   ├── Planta PB-01
│   ├── Área Molienda
│   ├── Proceso Bombeo de pulpa
│   ├── Solicitud origen FUR-RQ-PB01-BPA-0045
│   └── Proveedor ofertante Weir Minerals
│
├── Oferta
│   ├── Técnico-comercial integral
│   ├── Bomba de pulpa Warman 6/4
│   ├── Cantidad 1 und
│   ├── Precio unitario USD 12,500
│   ├── Plazo 14–18 semanas
│   ├── Vigencia 30 días
│   ├── Garantía 24 meses
│   ├── Incoterm FCA (TBC)
│   ├── Pago 50/50 (TBC)
│   ├── Cumplimiento técnico 92 %
│   └── 2 alternativas / desviaciones
│
├── Sourcing
│   ├── Weir
│   ├── Warman 6/4 AH
│   ├── OF-2025-0023
│   ├── Weir Minerals Perú S.A.
│   ├── ISO 9001 / CE / dossier QA
│   ├── Exportación estándar
│   └── RQ / OF / PO
│
├── Evaluación
│   ├── Evaluación técnica
│   ├── Comparación
│   ├── Negociación
│   ├── Puntuación / ranking
│   └── Excepciones / desviaciones
│
├── Relaciones
│   ├── RQ-0045
│   ├── MNT-00621
│   ├── OF-0021
│   ├── PROC-00123
│   └── PROV-00034
│
├── Documentos
│   ├── Cotización formal
│   ├── Ficha técnica
│   ├── Matriz comparativa
│   ├── Certificado QA
│   ├── Correo de aclaratorias
│   └── Lista de repuestos
│
└── Gobierno del dato
    ├── D0–D5
    ├── 84 % madurez del expediente
    ├── 88 % completitud documental
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 16. CICLO DE VIDA FUR-OF

Tomando únicamente los elementos visibles de la infografía, la FUR-OF integra:

```text
Identidad
→ Recepción de oferta
→ Vinculación a RQ
→ Vinculación a activo / proceso
→ Evaluación técnica
→ Evaluación comercial
→ Comparación
→ Aclaratorias
→ Negociación
→ Aprobación
→ Conversión a PO / Compra
→ Cierre
→ Auditoría / trazabilidad
```

---

# 17. RELACIÓN FUR-RQ / FUR-OF / PO

La imagen representa una separación funcional explícita:

```text
FUR-RQ
Solicitud / necesidad
   │
   ▼
FUR-OF
Oferta técnico-comercial
   │
   ▼
PO
Orden de compra
```

El vínculo visible es:

`RQ-2025-0045 | OF-2025-0023 | PO-PENDIENTE`

Por tanto, en la fuente gráfica la oferta se encuentra relacionada con una requisición existente y todavía no posee una PO cerrada.

---

# 18. INDICADORES DE EXPEDIENTE COMERCIAL

La infografía muestra dos indicadores globales:

| Indicador | Valor |
|---|---:|
| Madurez del expediente | 84 % |
| Completitud documental | 88 % |

Adicionalmente, el bloque técnico muestra:

| Indicador | Valor | Condición | Madurez |
|---|---:|---|---|
| Cumplimiento técnico | 92 % | Referencial | D3 |

---

# 19. ESTADO DEL EXPEDIENTE

A partir del contenido visible:

```text
Código:                    FUR-OF-PB01-BPA-0023
Estado maestro:            En revisión
Madurez global:            D3 - Validado en revisión
Madurez del expediente:    84 %
Completitud documental:    88 %
Cumplimiento técnico:      92 % (Referencial / D3)
TBC:                       4
HOLD:                      1
PO:                        PENDIENTE
Resultado de checklist:    FUR OF CON PENDIENTES
```

---

# 20. RESUMEN EJECUTIVO

La imagen describe la **FUR-OF-PB01-BPA-0023**, correspondiente a una **Oferta técnico-comercial de Bomba de Pulpa Warman 6/4**, vinculada a la requisición **FUR-RQ-PB01-BPA-0045** y al contexto de **Bombeo de pulpa / Molienda**.

La ficha concentra en un único expediente digital:

1. identidad y codificación FUR;
2. contexto de planta y proceso;
3. requisición origen;
4. proveedor ofertante;
5. equipo y cantidad cotizada;
6. precio, plazo, vigencia y garantía;
7. Incoterm y forma de pago;
8. cumplimiento técnico;
9. desviaciones y alternativas;
10. sourcing/proveedor;
11. mapeo Odoo 19;
12. relaciones transversales;
13. documentos y evidencias;
14. evaluación comparativa;
15. madurez D0–D5;
16. completitud documental;
17. pendientes TBC/HOLD;
18. checklist de validación.

La cadena comercial principal es:

```text
Requisición
→ Recepción OF
→ Evaluación técnica
→ Comparación
→ Negociación
→ Aprobación
→ PO / Compra
```

---

# 21. NAVEGACIÓN DEL ECOSISTEMA MOSTRADA EN EL PIE

La barra inferior de la infografía presenta accesos/áreas del ecosistema:

- Procesos.
- Potencia Eléctrica.
- IoT.
- GPON.
- Calidad.
- Laboratorios.
- Mantenimiento.
- Requisiciones.
- Ofertas.
- Cámaras.
- **Odoo 19 — ERP Integrado**.

Esto refuerza la concepción de FUR-OF como un expediente comercial conectado con las demás redes del ecosistema.

---

# 22. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente de fabricante, modelo, precio, Incoterm, forma de pago, plazo, garantía, certificaciones, proveedor, cumplimiento técnico, PO ni referencias RQ/OF.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan tal como aparecen en la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El mapeo Odoo/FUR debe verificarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
6. La oferta continúa en estado **En revisión** y la PO permanece **PENDIENTE** según la fuente.
7. Para convertir esta ficha en expediente comercial aprobado deben cerrarse los TBC/HOLD, confirmarse Incoterm, forma de pago y plazo, recibirse la PO oficial y completarse la evaluación comparativa.
8. Los valores de precio y condiciones comerciales se conservan como información gráfica; no se interpretan como cotización contractual vigente fuera de la fuente suministrada.
9. La puntuación/ranking aparece como función de la subtabla `fur_offer_evaluation`, pero la infografía no muestra un ranking comparativo final; por tanto, no se inventa ni se deriva uno.

---

# 23. CIERRE

**FUR `FUR-OF-PB01-BPA-0023`: estado En revisión, madurez global D3 - Validado en revisión, madurez del expediente 84 %, completitud documental 88 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR OF CON PENDIENTES.**

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_OF_INFOGRAFIA_REV00.md`**


# 83. ANEXO — DOCUMENTO MAESTRO FUR-CAM

> Documento fuente interno de la ficha y arquitectura del dominio FUR-CAM.


# DOCUMENTO MAESTRO — FUR-CAM — FICHA ÚNICA DE REGISTRO
## Ecosistema Digital FUR — Planta de Beneficio de Oro

**Código documental:** `DM-FUR-CAM-INFOGRAFIA-001`  
**Revisión:** `REV.00`  
**Fecha de elaboración:** `2026-09-16`  
**Fuente:** Infografía suministrada por el usuario: **FUR-CAM — FICHA ÚNICA DE REGISTRO**  
**Alcance:** Transcripción técnica estructurada y organización documental de todo el contenido legible de la imagen adjunta.  
**Condición:** Los valores consignados reproducen el contenido gráfico de la fuente. Este documento no constituye por sí solo validación AS-FOUND, AS-BUILT, certificación OEM, diseño definitivo de CCTV, estudio de cobertura ni aprobación de ciberseguridad.

> **Regla de fidelidad:** cuando la infografía presenta un dato como `Confirmado`, `Referencial`, `TBC`, `HOLD` o con madurez `D0–D5`, este documento conserva esa clasificación sin reinterpretarla.

---

# 0. IDENTIDAD VISUAL Y MENSAJES RECTORES

La infografía se presenta bajo la identidad:

**FUR — Ecosistema Digital — Planta de Beneficio de Oro**

Título principal:

> **FUR-CAM — FICHA ÚNICA DE REGISTRO**

Subtítulo:

> **Cámaras y Seguridad | Una identidad. Todo su ciclo de vida.**

Principios/mensajes superiores visibles:

- **Identidad única**
- **Trazabilidad total**
- **Integración Odoo 19**
- **Datos confiables**
- **Operación segura**
- **Gestión del ciclo de vida**
- **Decisiones inteligentes**

Mensaje institucional superior:

> **Minería más segura, mayor valor**

Mensaje de integración del ecosistema:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

Mensaje de pie:

> **ACTIVOS CONECTADOS, OPERACIÓN MÁS SEGURA, MAYOR VALOR**

Mensaje de sostenibilidad:

> **Operación Sostenible para un mejor mañana**

---

# 1. A. CABECERA FUR

## 1.1 Identificación principal

| Campo | Valor visible en la infografía |
|---|---|
| Código FUR | `FUR-CAM-PB01-PTZ-00123` |
| ID interno (UUID) | `c4f9b2a8-74de-4d83-bb92-1ca70f1e0087` |
| Red / Dominio | `FUR-CAM (Cámaras / Seguridad)` |
| Nombre del activo | `Cámara PTZ CAM-01` |
| Tipo / Familia | `Cámara IP PTZ / Seguridad perimetral` |
| Estado | `Activo` |
| Madurez global | `D4 - Operacional` |
| Versión | `1.0` |
| Fecha creación | `2026-09-16` |

La cabecera incorpora un **código QR** asociado a la identidad FUR.

---

# 2. ACTIVO DESTACADO Y UBICACIÓN EN PLANTA

## 2.1 Activo principal

**Cámara PTZ CAM-01**

Identificación mostrada sobre la imagen:

`FUR-CAM-PB01-PTZ-00123 | Planta General - Seguridad`

## 2.2 Ubicación en la planta

| Campo | Valor visible |
|---|---|
| Zona | `03 - Molienda / Perímetro Norte` |
| Área | `Seguridad` |
| Proceso | `Monitoreo y Vigilancia` |
| Coordenadas | `-12.0469, -76.9384` |
| Acción visual | `Ver en Mapa Interactivo` |

La infografía incluye una miniatura cartográfica asociada a la ubicación de la cámara.

---

# 3. FLUJO FUNCIONAL DE SEGURIDAD REPRESENTADO

La secuencia funcional visible es:

```text
Acceso
   ↓
Perímetro
   ↓
Proceso
   ↓
Control
   ↓
Monitoreo
   ↓
Grabación
   ↓
Alarmas
```

Esta cadena representa el flujo de vigilancia y seguridad desde el punto de acceso/perímetro hasta la generación de alarmas y evidencias.

---

# 4. 10 REDES TRANSVERSALES DEL ECOSISTEMA FUR

La infografía presenta diez dominios/redes integradas:

| Código | Red / Dominio |
|---|---|
| `FUR-PROC` | Procesos |
| `FUR-PTE` | Potencia Eléctrica |
| `FUR-IOT` | IoT / Instrumentación |
| `FUR-GPON` | Comunicaciones |
| `FUR-CC` | Control de Calidad |
| `FUR-LAB` | Laboratorios |
| `FUR-MNT` | Mantenimiento |
| `FUR-RQ` | Requisiciones |
| `FUR-OF` | Ofertas Comerciales |
| `FUR-CAM` | Cámaras / Seguridad |

La red **FUR-CAM** aparece resaltada como dominio activo.

Principio visual:

> **Un solo ecosistema. Activos conectados. Información que genera valor.**

---

# 5. B. BLOQUES COMUNES — INFORMACIÓN MAESTRA

La ficha organiza la información maestra en nueve bloques.

## 5.1 Bloque 1 — Identidad

Incluye:

- Código.
- Nombre.
- Tipo.
- Estado.
- Versión.

## 5.2 Bloque 2 — Jerarquía y ubicación

Jerarquía visible:

```text
Sitio
→ Área
→ Proceso
→ Sistema
→ Ubicación
```

## 5.3 Bloque 3 — Clasificación

Incluye:

- Familia.
- Clase.
- Criticidad.
- Tags.

## 5.4 Bloque 4 — Responsabilidad

Incluye:

- Propietario.
- Custodio.
- Responsable técnico.

## 5.5 Bloque 5 — Ciclo de vida

Incluye:

- Alta.
- Puesta en servicio.
- Inspecciones.
- Retiro.

## 5.6 Bloque 6 — Documentación

Incluye:

- Manuales.
- Planos.
- Certificados.
- Fotos.

## 5.7 Bloque 7 — Relaciones

Incluye relaciones tales como:

- Mide.
- Soporta.
- Comunica.
- Protege.

## 5.8 Bloque 8 — Auditoría

Incluye:

- Historial de cambios.
- Trazabilidad.

## 5.9 Bloque 9 — Búsqueda

Incluye:

- Texto indexable.
- Sinónimos.
- Códigos externos.

---

# 6. C. BLOQUE TÉCNICO ESPECIALIZADO — FUR-CAM

## 6.1 Parámetros técnicos visibles

| Parámetro | Valor | Unidad | Condición | Madurez |
|---|---:|---|---|---|
| Tipo de cámara | PTZ IP industrial | — | Confirmado | D4 |
| Resolución | 4K UHD | — | Confirmado | D4 |
| Zoom óptico | 30× | — | Confirmado | D4 |
| Campo de visión | 360° pan / 90° tilt | — | Confirmado | D4 |
| Protección ambiental | IP66 / IK10 | — | Confirmado | D4 |
| Visión nocturna | IR 150 | m | Confirmado | D4 |
| Compresión de video | H.265 | — | Confirmado | D4 |
| Almacenamiento local | 256 | GB | Referencial | D3 |
| Alimentación | PoE++ / 24 VDC | — | Confirmado | D4 |
| Ancho de banda típico | 8 - 12 | Mbps | Referencial | D3 |
| Retención de video | 30 | días | TBC | D2 |
| Política de grabación | Continua + eventos | — | Referencial | D3 |

## 6.2 Dimensiones principales mostradas

La vista dimensional de la cámara indica aproximadamente:

- **Diámetro:** `Ø 220 mm`
- **Altura:** `310 mm`

> Las dimensiones se transcriben tal como aparecen en la infografía y no sustituyen un plano dimensional ni un datasheet certificado.

## 6.3 Subtablas FUR-CAM principales

| Subtabla | Propósito indicado |
|---|---|
| `fur_camera_nameplate` | Placa y datos nominales |
| `fur_camera_video_profile` | Resolución, fps, compresión |
| `fur_camera_storage_policy` | Retención y almacenamiento |
| `fur_camera_network` | IP, VLAN, puertos y conectividad |
| `fur_camera_event_rule` | Detecciones, alarmas, eventos |
| `fur_camera_maintenance` | Inspecciones y limpieza |

---

# 7. D. BLOQUE COMERCIAL / PROVEEDOR / SOURCING

| Campo | Valor visible |
|---|---|
| Fabricante | Hikvision |
| Marca / Modelo | `DS-2DF8C435MHS-AELW` |
| N.º de serie | `SN-PTZ-88451` |
| Proveedor | SecureVision S.A. (`res_partner`) |
| País de origen | China |
| Certificaciones | CE, FCC, RoHS, NDAA/TBC |
| Garantía | 24 meses |
| Precio referencial | USD 2,850 |
| Moneda | USD |
| Plazo de entrega | 8 - 12 semanas |
| MOQ (repuesto) | Según ítem |
| Empaque | Caja reforzada + kit montaje |
| Vínculo RQ / OF / PO | `RQ-2026-0148 | OF-2026-0091 | PO-2026-1210` |

---

# 8. E. MAPEO A ODOO 19 — TABLAS PRINCIPALES

| Campo FUR | Tabla.Campo (Odoo 19 / FUR) | Tipo | Único | Índice |
|---|---|---|---|---|
| `fur_code` | `fur.record.fur_code` | varchar | Sí | `idx_fur_code` |
| `nombre` | `product.template.name` | varchar | — | `idx_name` |
| `tipo_activo` | `product.template.categ_id` | many2one | — | — |
| `ubicación` | `stock.location.id` | many2one | — | — |
| `equipo_mantenible` | `maintenance.equipment.id` | many2one | — | — |
| `serie` | `stock.lot.name` | varchar | Sí | `idx_serial` |
| `proveedor` | `res.partner.id` | many2one | — | — |
| `precio_ref` | `product.supplierinfo.price` | numeric | — | — |
| `datos_video` | `fur_camera_video_profile.*` | tabla propia | — | `idx_cam_video` |
| `politica_storage` | `fur_camera_storage_policy.*` | tabla propia | — | `idx_cam_storage` |
| `eventos` | `fur_camera_event_rule.*` | tabla propia | — | `idx_cam_event` |
| `documentos` | `ir.attachment.id` | many2one | — | — |

> Los nombres de modelos/campos se transcriben según la imagen y deben verificarse contra la instancia Odoo 19 objetivo antes de cualquier implementación real.

---

# 9. F. RELACIONES TRANSVERSALES

| Tipo de relación | FUR origen | FUR destino | Cardinalidad | Descripción |
|---|---|---|---|---|
| Pertenece | CAM-01 | Red Seguridad Planta | N:1 | Parte del sistema CCTV |
| Comunica | CAM-01 | Switch PoE SW-03 | N:1 | Conectividad Ethernet |
| Soporta | CAM-01 | Red GPON / Backbone | N:1 | Transporte de datos/video |
| Mide | CAM-01 | Evento intrusión E-014 | N:1 | Detección y evidencia |
| Alimenta | CAM-01 | UPS-SEG-02 | N:1 | Respaldo eléctrico |
| Mantiene | CAM-01 | OT-000567 | 1:N | Órdenes de trabajo |
| Analiza | CAM-01 | Centro de Monitoreo | N:1 | Supervisión de eventos |
| Asociado a | CAM-01 | Control de Acceso | N:1 | Seguridad integrada |

Estas relaciones conectan la cámara con CCTV, red PoE, GPON, eventos, energía de respaldo, mantenimiento, centro de monitoreo y control de acceso.

---

# 10. G. DOCUMENTOS Y EVIDENCIA

| Tipo | Nombre | Rev. | Estado |
|---|---|---:|---|
| Manual de operación | `PTZ_Manual.pdf` | v2.1 | Vigente |
| Plano CCTV | `CCTV_PB01.dwg` | v1.3 | Vigente |
| Plano de red | `NET_SEG_03.pdf` | v1.0 | Vigente |
| Lista de activos | `CCTV_Assets.xlsx` | v4.0 | Vigente |
| Certificado CE | `CE_Camera.pdf` | v1.0 | Vigente |
| Informe de prueba | `FAT_CAM-01.pdf` | v1.0 | Vigente |
| Fotografía | `CAM01_site.jpg` | — | Vigente |
| Histórico mantenimiento | `Hist_CAM01.pdf` | v1.0 | Vigente |

---

# 11. H. CALIDAD DEL DATO

## 11.1 Escala de madurez mostrada

| Nivel | Descripción |
|---|---|
| D0 | Hipótesis (sin datos) |
| D1 | Referencial (estimado) |
| D2 | Preliminar (levantamiento) |
| D3 | Validado (en revisión) |
| D4 | Operacional (con evidencia) |
| D5 | Trazable histórico completo |

## 11.2 Madurez del activo

La infografía muestra:

> **Madurez del activo: 84 %**

La cabecera identifica la madurez global como:

> **D4 - Operacional**

---

# 12. I. PENDIENTES TBC / HOLD

| N.º | Pendiente | Estado |
|---:|---|---|
| 1 | Confirmar política de retención de video | TBC |
| 2 | Validar capacidad real de almacenamiento NVR | TBC |
| 3 | Verificar integración con analítica inteligente | TBC |
| 4 | Confirmar cobertura ciega en perímetro norte | HOLD |
| 5 | Revisar fecha de última recalibración / limpieza mayor | TBC |

Resumen:

- **4 pendientes TBC**
- **1 pendiente HOLD**

---

# 13. J. CHECKLIST DE VALIDACIÓN

La infografía muestra como cumplidos los siguientes criterios:

- ✓ Código único y formato correcto.
- ✓ Claves y relaciones definidas.
- ✓ Bloque técnico completo.
- ✓ Bloque comercial completo.
- ✓ Documentos obligatorios.
- ✓ Madurez de datos asignada.
- ✓ Sin duplicidad de maestros nativos.
- ✓ Lista para operación.

Resultado visual:

> **FUR APTA para el ecosistema**

---

# 14. ARQUITECTURA FUNCIONAL DE LA FUR-CAM

La lógica funcional del registro puede representarse así:

```text
                         Perímetro / Proceso
                                │
                                ▼
                       Cámara PTZ CAM-01
                  FUR-CAM-PB01-PTZ-00123
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
   Switch PoE SW-03       UPS-SEG-02          Control de Acceso
          │                     │                     │
          ▼                     │                     │
   Red GPON / Backbone          │                     │
          │                     │                     │
          └─────────────┬───────┴─────────────┬───────┘
                        │                     │
                        ▼                     ▼
               Centro de Monitoreo        Evento E-014
                        │                     │
                        └──────────┬──────────┘
                                   ▼
                             Grabación / NVR
                                   │
                                   ▼
                                Alarmas
                                   │
                                   ▼
                         Evidencia / Auditoría
```

---

# 15. MODELO CONCEPTUAL DE INFORMACIÓN

```text
FUR-CAM-PB01-PTZ-00123
│
├── Identidad
│   ├── UUID
│   ├── Código FUR
│   ├── Estado
│   ├── Versión
│   └── Madurez
│
├── Jerarquía
│   ├── Zona 03 - Molienda / Perímetro Norte
│   ├── Área Seguridad
│   └── Proceso Monitoreo y Vigilancia
│
├── Activo
│   └── Cámara PTZ CAM-01
│
├── Video
│   ├── 4K UHD
│   ├── Zoom óptico 30×
│   ├── 360° pan / 90° tilt
│   ├── H.265
│   ├── IR 150 m
│   └── 8–12 Mbps
│
├── Protección / alimentación
│   ├── IP66 / IK10
│   ├── PoE++ / 24 VDC
│   └── UPS-SEG-02
│
├── Almacenamiento
│   ├── Local 256 GB
│   ├── Retención 30 días — TBC
│   └── Política continua + eventos
│
├── Red
│   ├── Switch PoE SW-03
│   ├── GPON / Backbone
│   └── Centro de Monitoreo
│
├── Seguridad
│   ├── Evento de intrusión
│   ├── Control de Acceso
│   ├── Grabación
│   └── Alarmas
│
├── Sourcing
│   ├── Hikvision
│   ├── DS-2DF8C435MHS-AELW
│   ├── SN-PTZ-88451
│   ├── SecureVision S.A.
│   ├── CE / FCC / RoHS / NDAA-TBC
│   ├── Garantía
│   ├── Precio
│   └── RQ / OF / PO
│
├── Documentos
│   ├── Manual
│   ├── Plano CCTV
│   ├── Plano de red
│   ├── Lista de activos
│   ├── Certificado CE
│   ├── FAT
│   ├── Fotografía
│   └── Historial de mantenimiento
│
└── Gobierno del dato
    ├── D0–D5
    ├── 84 % madurez visual
    ├── TBC
    ├── HOLD
    └── Checklist
```

---

# 16. CICLO DE VIDA FUR-CAM

Tomando únicamente los elementos visibles de la infografía, la FUR-CAM integra:

```text
Identidad
→ Jerarquía / ubicación
→ Clasificación
→ Alta / puesta en servicio
→ Configuración de red
→ Monitoreo
→ Detección de eventos
→ Grabación
→ Alarmas
→ Evidencia
→ Inspecciones / limpieza
→ Mantenimiento
→ Documentación
→ Auditoría
→ Retiro / sustitución
```

---

# 17. ARQUITECTURA DE VIDEO Y DATOS

La estructura funcional representada por la infografía puede sintetizarse así:

```text
Cámara PTZ
   │
   ├── Video 4K / H.265
   ├── Eventos
   └── Alarmas
        │
        ▼
   Switch PoE
        │
        ▼
 GPON / Backbone
        │
        ▼
Centro de Monitoreo / NVR
        │
        ├── Visualización
        ├── Grabación
        ├── Retención
        └── Evidencia
```

La capacidad real de almacenamiento NVR y la política de retención permanecen entre los pendientes mostrados.

---

# 18. SEGURIDAD INTEGRADA

La infografía relaciona la FUR-CAM con:

- **Perímetro físico**
- **Control de acceso**
- **Centro de monitoreo**
- **Detección de intrusión**
- **Alarmas**
- **Red GPON**
- **UPS / respaldo eléctrico**
- **Mantenimiento**

Esto posiciona a FUR-CAM como expediente digital para la capa de vigilancia y seguridad física del ecosistema.

---

# 19. ESTADO DEL EXPEDIENTE

A partir del contenido visible:

```text
Código:                 FUR-CAM-PB01-PTZ-00123
Estado maestro:         Activo
Madurez global:         D4 - Operacional
Madurez del activo:     84 %
TBC:                    4
HOLD:                   1
Resultado checklist:    FUR APTA para el ecosistema
```

---

# 20. RESUMEN EJECUTIVO

La imagen describe la **FUR-CAM-PB01-PTZ-00123**, correspondiente a una **Cámara PTZ CAM-01** ubicada en el **Perímetro Norte de la Zona 03 — Molienda**.

La ficha concentra en un único expediente digital:

1. identidad y codificación FUR;
2. ubicación y contexto de seguridad;
3. parámetros de video;
4. zoom, campo de visión y visión nocturna;
5. protección ambiental;
6. almacenamiento y retención;
7. alimentación PoE++ / 24 VDC;
8. conectividad Ethernet / GPON;
9. sourcing y proveedor;
10. mapeo Odoo 19;
11. relaciones transversales;
12. eventos y alarmas;
13. documentos y evidencias;
14. mantenimiento;
15. madurez D0–D5;
16. pendientes TBC/HOLD;
17. checklist de validación.

La cadena funcional principal es:

```text
Acceso
→ Perímetro
→ Proceso
→ Control
→ Monitoreo
→ Grabación
→ Alarmas
```

---

# 21. NAVEGACIÓN DEL ECOSISTEMA MOSTRADA EN EL PIE

La barra inferior de la infografía muestra accesos a:

- Procesos.
- Potencia Eléctrica.
- IoT.
- GPON.
- Calidad.
- Laboratorios.
- Mantenimiento.
- Requisiciones.
- Ofertas.
- Cámaras.
- **Odoo 19 — ERP Integrado**.

Esto refuerza la integración transversal de FUR-CAM con el resto del Ecosistema Digital FUR.

---

# 22. NOTAS DE CONTROL

1. Este documento reproduce y organiza únicamente el contenido visible de la infografía fuente.
2. No se ha realizado verificación independiente del fabricante, modelo, serie, precio, certificaciones, coordenadas, cobertura, almacenamiento, ancho de banda, política de grabación ni referencias RQ/OF/PO.
3. Las condiciones `Confirmado`, `Referencial`, `TBC`, `HOLD` y los niveles D0–D5 se conservan tal como aparecen en la imagen.
4. Los nombres de tablas/campos se transcriben como aparecen en la infografía.
5. El mapeo Odoo/FUR debe verificarse contra la instancia Odoo 19 y el esquema PostgreSQL objetivo antes de una implementación real.
6. Para convertir esta ficha en un registro AS-BUILT/operacional plenamente validado deben cerrarse los TBC/HOLD y reconciliarse cobertura real, política de retención, NVR, analítica inteligente, alimentación, red, mantenimiento y documentación con evidencia de campo.
7. La mención `NDAA/TBC` se conserva literalmente como condición pendiente de confirmación.
8. El precio mostrado pertenece al bloque comercial de la infografía y no se interpreta como cotización vigente verificada.
9. La existencia de analítica inteligente aparece como un pendiente de integración; no se asume funcionalidad activa más allá de lo expresamente mostrado.

---

# 23. CIERRE

**FUR `FUR-CAM-PB01-PTZ-00123`: estado Activo, madurez global D4 - Operacional, madurez visual del activo 84 %, pendientes 4 TBC / 1 HOLD.**

**Resultado visual de validación:** **FUR APTA para el ecosistema.**

---

**FIN DEL DOCUMENTO — `DOCUMENTO_MAESTRO_FUR_CAM_INFOGRAFIA_REV00.md`**


# 84. CONTROL DE REVISIÓN REV.01

| Revisión | Fecha | Cambio |
| --- | --- | --- |
| REV.00 | 2026-09-24 | Plan técnico base: arquitectura, fases, frontend, Odoo, PostgreSQL, OT/IT. |
| REV.01 | 2026-09-24 | Megadocumento ampliado: matriz 18×10, detalle por red/etapa, 1.800 FUR de diseño, datos especializados, roles/RBAC, dashboards, UX/UI, APIs, Odoo y anexos fuente completos. |

> **Criterio de cierre:** este documento es una especificación maestra de desarrollo y diseño. Todo valor técnico, TAG, rango, puerto, IP, modelo, cantidad, costo, KPI o relación que no provenga de evidencia aprobada permanece Referencial/TBC/HOLD hasta reconciliación.
