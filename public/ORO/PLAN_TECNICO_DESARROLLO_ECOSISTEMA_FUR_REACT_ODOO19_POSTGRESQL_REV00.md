# PLAN TÉCNICO MAESTRO PARA EL DESARROLLO DEL ECOSISTEMA DIGITAL FUR
## Frontend React.js + TypeScript · Backend NestJS · Odoo 19 · PostgreSQL · Redes Transversales · OT/IT · Motor presupuestario tipo LuloWin

**Código documental:** `PTD-FUR-REACT-001`  
**Revisión:** `REV.00`  
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

# 52. CONTROL DE REVISIÓN

| Rev. | Fecha | Descripción |
|---|---|---|
| REV.00 | 2026-09-24 | Emisión inicial del plan técnico detallado para desarrollo frontend React + arquitectura Odoo 19/PostgreSQL/FUR, incorporando UX/UI, fases, datos, módulos, API, seguridad, OT/IT, pruebas y despliegue. |

---

**FIN — PLAN TÉCNICO MAESTRO REV.00**
