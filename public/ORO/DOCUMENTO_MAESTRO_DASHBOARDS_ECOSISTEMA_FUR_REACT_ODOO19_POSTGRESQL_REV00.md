# DOCUMENTO MAESTRO DE DASHBOARDS — ECOSISTEMA DIGITAL FUR

**Planta de Beneficio de Oro**  
**Documento:** Arquitectura funcional, UX/UI, navegación, datos, roles, KPI y desarrollo React de dashboards  
**Código documental:** `DM-FUR-DASH-001`  
**Revisión:** `REV.00`  
**Fecha:** 2026-09-25  
**Estado:** Diseño técnico / funcional referencial  
**Arquitectura objetivo:** React.js + TypeScript + NestJS + PostgreSQL + Odoo 19 + FUR + OT/SCADA/Historian  
**Condición de los ejemplos:** Referencial / TBC cuando no exista evidencia AS-BUILT  

> Este documento está dedicado exclusivamente a los dashboards del Ecosistema Digital FUR. Organiza la navegación, el sidebar, las secciones internas, KPIs, gráficos, tablas, filtros, permisos, fuentes de datos, rutas, contratos API, componentes React, estados UX/UI, drill-down y criterios de aceptación de cada dashboard. No sustituye a SCADA/Historian, Odoo, LIMS, WMS, VMS ni a los sistemas fuente: los dashboards agregan, contextualizan y enlazan la información hacia su FUR y evidencia de origen.

---

# 1. PROPÓSITO Y ALCANCE

El Ecosistema FUR requiere dashboards especializados por perfil y por red transversal. Cada dashboard debe ser una aplicación analítica contextual dentro del mismo App Shell, con navegación consistente, filtros globales y permisos RBAC/ABAC.

Este documento define:

1. arquitectura UX/UI común para todos los dashboards;
2. sidebar global y sidebar contextual de dashboards;
3. catálogo maestro de dashboards;
4. detalle funcional de cada sección de cada dashboard;
5. KPIs y reglas de cálculo/gobierno;
6. fuentes de datos y autoridad de origen;
7. drill-down desde KPI hasta FUR/evidencia;
8. roles y permisos de acceso;
9. componentes React reutilizables;
10. contratos API y estrategia de refresco/realtime;
11. comportamiento responsive y accesibilidad;
12. estados de loading, vacío, error, TBC/HOLD y dato desactualizado;
13. pruebas funcionales, técnicas y UX;
14. roadmap específico para construir los dashboards.

---

# 2. PRINCIPIOS RECTORES DE LOS DASHBOARDS

## 2.1 Un KPI siempre debe poder explicarse

Todo KPI debe tener propietario, definición, fórmula, unidad, ventana temporal, filtros aplicados, timestamp, fuente de autoridad, madurez del dato y enlace de trazabilidad.

## 2.2 Dashboard no es sistema de autoridad

- **Odoo 19** mantiene transacciones empresariales cuando aplique.
- **SCADA/Historian** mantiene series temporales operacionales.
- **FUR** mantiene identidad, relaciones, contexto, calidad, auditoría y navegación.
- **FUR-CC/FUR-LAB** mantienen trazabilidad de muestras y análisis.
- **WMS/Odoo Stock** mantiene stock y movimientos.
- **VMS/NVR** mantiene video.
- **LULO / motor de presupuesto** mantiene estructuras presupuestarias cuando se confirme el modelo definitivo.

## 2.3 Condición y madurez del dato visibles

Cada tarjeta o visualización debe poder mostrar: `Confirmado`, `Referencial`, `TBC`, `HOLD`, `Sin dato`, y madurez `D0–D5` cuando aplique.

## 2.4 Navegación por contexto

El usuario debe poder pasar de:

`Dashboard → KPI → Etapa/Área → Activo/Entidad → FUR → Documento/Evento/OT/Muestra/Resultado`

sin perder filtros ni rango temporal.

---

# 3. APP SHELL Y NAVEGACIÓN

## 3.1 Sidebar global

El sidebar global debe contener, sujeto a permisos:

- Inicio
- Catálogo
- Activos Físicos
- Procesos
- Redes Transversales
- Mapas
- Documentos
- Dashboards
- Reportes
- Marketplace
- Proveedores
- Servicios Profesionales
- Cursos / LMS
- WMS / Inventario
- Presupuestos / LULO
- Administración

## 3.2 Menú raíz de Dashboards

Ruta raíz: `/app/dashboards`

Submenús:

- Mi Dashboard
- Estado de Planta
- Ejecutivo
- Gerencia de Planta
- Metalurgia / Procesos
- Operación
- Potencia Eléctrica
- IoT / Instrumentación
- GPON / Comunicaciones
- Control de Calidad
- Laboratorio
- Mantenimiento
- WMS / Inventario
- Compras / Abastecimiento
- Presupuesto / Costos
- Ingeniería / Proyectos
- HSE / SSOMA
- Seguridad / CCTV
- Formación / LMS
- Portal Proveedor
- Auditoría / Gobierno

El menú debe generarse dinámicamente por permisos. No se debe mostrar una opción que el usuario no pueda abrir.

## 3.3 Niveles de navegación

**Nivel 1 — GlobalSidebar:** cambio entre módulos.  
**Nivel 2 — DashboardSidebar:** navegación entre dashboards permitidos.  
**Nivel 3 — SectionNav:** navegación interna de cada dashboard.  
**Nivel 4 — Tabs/DrillDown:** vistas de detalle de un KPI, FUR o entidad.

---

# 4. ESTRUCTURA UX/UI COMÚN DE UN DASHBOARD

Todo dashboard debe incluir, según aplique:

## 4.1 Cabecera

- título;
- código FUR del dashboard;
- período activo;
- planta/área/etapa;
- estado de conectividad;
- timestamp de última actualización;
- nivel de calidad del dato;
- botón de favoritos;
- exportación según permisos;
- ayuda/contexto.

## 4.2 Barra de filtros globales

Filtros normalizados:

- planta;
- área;
- etapa `D01–D18`;
- red transversal;
- activo/FUR;
- turno;
- fecha/hora;
- criticidad;
- estado;
- condición del dato;
- madurez `D0–D5`;
- proveedor cuando aplique;
- categoría/tipo de activo;
- búsqueda por TAG/FUR/nombre.

Los filtros deben persistir en URL/query-string cuando sea seguro y útil para enlaces compartibles.

## 4.3 Banda de KPI

Máximo recomendado en primera vista: 4–8 KPIs primarios. Los KPIs secundarios deben estar en secciones inferiores o expandibles.

Cada KPI card debe incluir:

- valor;
- unidad;
- comparación vs período anterior/objetivo;
- tendencia;
- timestamp;
- fuente;
- calidad/madurez;
- estado normal/advertencia/crítico;
- acción `Ver detalle`.

## 4.4 Zona analítica

Combinación de:

- tendencias;
- barras;
- Pareto;
- mapas;
- tablas;
- Sankey/flujo;
- heatmaps;
- Gantt;
- control charts;
- topologías;
- unifilares;
- timeline de eventos.

## 4.5 Panel de eventos y excepciones

Debe priorizar excepciones y no inundar la interfaz. Campos mínimos: severidad, hora, entidad, descripción, estado, responsable, FUR relacionado.

## 4.6 Panel de datos y trazabilidad

Debe mostrar fuente, timestamp, calidad, latencia, versión de fórmula y enlace al registro de autoridad.

## 4.7 Acciones rápidas

Las acciones dependen de permisos y contexto. Ejemplos: abrir FUR, crear OT, solicitar repuesto, abrir muestra, crear RFQ, adjuntar documento, exportar reporte.

---

# 5. DISEÑO VISUAL

La referencia visual del proyecto utiliza:

- azul marino como fondo estructural;
- azul/cian para navegación y datos;
- amarillo/oro para acentos y CTA;
- blanco para superficies de lectura;
- verde para normal/operativo;
- amarillo/ámbar para advertencia;
- rojo para crítico;
- púrpura para comunicaciones o dominios especializados cuando corresponda.

No se debe depender únicamente del color: cada estado debe acompañarse con icono, texto o patrón.

### Layout desktop recomendado

- sidebar 240–280 px expandido;
- topbar 56–72 px;
- grid 12 columnas;
- cards con radios coherentes;
- panel principal scroll vertical;
- panel lateral opcional para detalle rápido.

### Responsive

- >= 1440 px: vista completa 12 columnas;
- 1024–1439 px: sidebar colapsable y grid 8 columnas;
- 768–1023 px: grid 4 columnas;
- <768 px: navegación drawer, cards 1–2 columnas, tablas convertidas a listas/accordions.

---

# 6. CATÁLOGO MAESTRO DE DASHBOARDS

| Código | Dashboard | Ruta | Rol principal | Refresco |
|---|---|---|---|---|
| FUR-DASH-PUB-001 | Estado Público de Planta | `/planta/tiempo-real` | VIS | 5–15 min |
| FUR-DASH-EXE-001 | Ejecutivo Corporativo | `/app/dashboards/ejecutivo` | DIR | 15–60 min |
| FUR-DASH-GPL-001 | Gerencia de Planta | `/app/dashboards/planta` | GPL | 1–5 min |
| FUR-DASH-MET-001 | Metalurgia / Procesos | `/app/dashboards/procesos` | MET | 1–5 min |
| FUR-DASH-OPR-001 | Operación de Planta | `/app/dashboards/operacion` | OPR | 5–30 s |
| FUR-DASH-PTE-001 | Potencia Eléctrica | `/app/dashboards/potencia` | ELE | 5–30 s |
| FUR-DASH-IOT-001 | Instrumentación / OT | `/app/dashboards/iot` | IOT | 10–60 s |
| FUR-DASH-GPON-001 | GPON / Comunicaciones | `/app/dashboards/gpon` | GPN | 30–60 s |
| FUR-DASH-CC-001 | Control de Calidad / Muestras | `/app/dashboards/calidad` | LAB | 5–15 min |
| FUR-DASH-LAB-001 | Laboratorio | `/app/dashboards/laboratorio` | LAB | 5–15 min |
| FUR-DASH-MNT-001 | Mantenimiento y Confiabilidad | `/app/dashboards/mantenimiento` | MEC | 5–15 min |
| FUR-DASH-WMS-001 | WMS / Inventario | `/app/dashboards/wms` | WMS | 5–15 min |
| FUR-DASH-BUY-001 | Compras / Abastecimiento | `/app/dashboards/compras` | BUY | 15–60 min |
| FUR-DASH-CST-001 | Presupuesto / Costos | `/app/dashboards/costos` | CST | 15–60 min |
| FUR-DASH-ENG-001 | Ingeniería / Proyectos | `/app/dashboards/ingenieria` | ENG | 15–60 min |
| FUR-DASH-HSE-001 | HSE / SSOMA | `/app/dashboards/hse` | HSE | 5–15 min |
| FUR-DASH-CAM-001 | Seguridad / CCTV | `/app/dashboards/camaras` | SEC | 5–30 s |
| FUR-DASH-LMS-001 | Formación / LMS | `/app/dashboards/lms` | INS | 15–60 min |
| FUR-DASH-SUP-001 | Portal Proveedor | `/app/dashboards/proveedor` | SUP | 15–60 min |
| FUR-DASH-AUD-001 | Auditoría y Gobierno | `/app/dashboards/auditoria` | AUD | 15–60 min |


> Además de estos dashboards especializados, el frontend debe ofrecer **Mi Dashboard** como composición personal de accesos, tareas, alertas y widgets autorizados. No debe crear nuevas fuentes de datos; solo reutilizar widgets gobernados.

---

# 7. MATRIZ DE ROLES Y VISIBILIDAD

| Rol | Dashboard inicial | Secundarios prioritarios |
|---|---|---|
| SYS-ADM | Auditoría y Gobierno | Todos |
| DIR | Ejecutivo | Planta, Costos, HSE |
| GPL | Gerencia de Planta | Procesos, MNT, PTE, Calidad |
| MET | Metalurgia/Procesos | IOT, CC, LAB |
| OPR | Operación | Procesos, alarmas |
| MEC | Mantenimiento | WMS, IOT |
| ELE | Potencia Eléctrica | MNT, IOT |
| IOT | Instrumentación/OT | Procesos, PTE |
| GPN | GPON | CAM, IOT |
| LAB | Laboratorio | CC, Procesos |
| WMS | WMS | MNT, Compras |
| BUY | Compras | WMS, Costos |
| CST | Costos | Compras, Ejecutivo |
| ENG | Ingeniería | Procesos, MNT, Calidad |
| HSE | HSE | CAM, Planta |
| INS | LMS | Competencias |
| STD | Formación personal | — |
| SUP | Portal Proveedor | Ofertas/PO propias |
| AUD | Auditoría/Gobierno | Todos en lectura autorizada |
| VIS | Estado Público | Contenido público |
| SEC | CCTV | HSE |

---

# 8. DETALLE FUNCIONAL POR DASHBOARD

## 8.1 Estado Público de Planta — `FUR-DASH-PUB-001`

**Ruta:** `/planta/tiempo-real`  
**Dominio:** Público / Planta  
**Rol principal:** `VIS`  
**Audiencia:** Visitantes, comunidad autorizada, stakeholders externos  
**Refresco objetivo:** 5–15 min  

### 8.1.1 Objetivo

Presentar información operacional autorizada de alto nivel sin exponer datos sensibles, tags OT, planos, costos ni información restringida.

### 8.1.2 Sidebar / menú contextual

1. **Resumen público**
2. **Producción autorizada**
3. **Disponibilidad**
4. **Seguridad y sostenibilidad**
5. **Tendencia 24 h**
6. **Mapa público**
7. **Noticias / comunicados**
8. **Metodología de datos**

### 8.1.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.1.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Producción autorizada del día (t/d) | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Disponibilidad global de planta (%) | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Horas operativas acumuladas | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Estado general de operación | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Indicador de seguridad publicable | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Indicador ambiental/sostenibilidad publicable | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Última actualización de datos | Indicador gobernado del dashboard Estado Público de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.1.5 Visualizaciones

- Tarjetas KPI de estado.
- Tendencia 24 h de producción autorizada.
- Semáforo de disponibilidad.
- Mapa simplificado de planta.
- Timeline de hitos públicos.

### 8.1.6 Fuentes de datos

- **FUR-PROC agregado** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo 19 solo datos publicables** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Historian mediante capa de publicación** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-HSE/indicadores aprobados** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **CMS/Documentos públicos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.1.7 Alertas y excepciones

- Datos desactualizados.
- Dashboard temporalmente no disponible.
- Estado general fuera de servicio.
- Aviso de mantenimiento del portal.

### 8.1.8 Acciones rápidas

- Ver mapa público.
- Consultar metodología.
- Abrir comunicado.
- Ver catálogo público.

### 8.1.9 Drill-down

KPI público → contexto agregado → página informativa pública; nunca baja a tags, FUR internos o documentos restringidos.

### 8.1.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.1.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.1.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.2 Ejecutivo Corporativo — `FUR-DASH-EXE-001`

**Ruta:** `/app/dashboards/ejecutivo`  
**Dominio:** Corporativo  
**Rol principal:** `DIR`  
**Audiencia:** Gerencia General / Dirección  
**Refresco objetivo:** 15–60 min  

### 8.2.1 Objetivo

Concentrar desempeño estratégico, operativo, financiero, de riesgo y sostenibilidad para toma de decisiones de dirección.

### 8.2.2 Sidebar / menú contextual

1. **Resumen ejecutivo**
2. **Producción y recuperación**
3. **Disponibilidad y confiabilidad**
4. **Costos CAPEX/OPEX**
5. **Energía y consumos**
6. **Seguridad / HSE**
7. **Calidad y laboratorio**
8. **Abastecimiento**
9. **Proyectos y MOC**
10. **Madurez FUR / gobierno**
11. **Comparativos por período**
12. **Reportes ejecutivos**

### 8.2.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.2.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Producción diaria/mensual | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Recuperación metalúrgica Au (%) | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Disponibilidad física (%) | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OEE global (%) | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Costo operativo por tonelada | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Consumo específico de energía (kWh/t) | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| CAPEX comprometido vs presupuesto | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OPEX real vs presupuesto | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Backlog crítico de mantenimiento | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Incidentes HSE | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cumplimiento de producción | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Madurez D4/D5 de FUR | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| TBC/HOLD críticos abiertos | Indicador gobernado del dashboard Ejecutivo Corporativo. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.2.5 Visualizaciones

- Scorecards ejecutivos.
- Tendencia producción/recuperación.
- Waterfall de costos.
- Curva S CAPEX/OPEX.
- Pareto de pérdidas.
- Heatmap por etapa D01–D18.
- Matriz riesgo-impacto.
- Semáforo de madurez FUR.

### 8.2.6 Fuentes de datos

- **FUR-PROC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PTE** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-CC/FUR-LAB** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Accounting/Analytic** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Purchase** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **LuloWin/motor presupuesto** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **HSE** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **SCADA/Historian agregados** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.2.7 Alertas y excepciones

- Desviación producción > límite aprobado.
- Recuperación bajo objetivo.
- Sobrepresupuesto.
- Disponibilidad bajo mínimo.
- Evento HSE mayor.
- Backlog crítico creciente.
- TBC/HOLD vencido.

### 8.2.8 Acciones rápidas

- Abrir dashboard de planta.
- Abrir detalle de costos.
- Abrir etapa crítica.
- Abrir evidencia FUR.
- Exportar reporte ejecutivo.
- Crear tarea/seguimiento.

### 8.2.9 Drill-down

Corporativo → planta → área → etapa → KPI → activo/FUR → evidencia/documento/evento.

### 8.2.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.2.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.2.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.3 Gerencia de Planta — `FUR-DASH-GPL-001`

**Ruta:** `/app/dashboards/planta`  
**Dominio:** Operaciones  
**Rol principal:** `GPL`  
**Audiencia:** Gerente de Planta, superintendencias  
**Refresco objetivo:** 1–5 min  

### 8.3.1 Objetivo

Supervisar operación integral de la planta por etapa, turno, activo crítico y evento operativo.

### 8.3.2 Sidebar / menú contextual

1. **Resumen de turno**
2. **Cadena productiva D01–D18**
3. **Producción**
4. **Recuperación**
5. **Disponibilidad**
6. **Alarmas y eventos**
7. **Activos críticos**
8. **Mantenimiento**
9. **Potencia**
10. **Calidad/Laboratorio**
11. **Inventario crítico**
12. **Personal/turnos**
13. **Mapa operativo**
14. **Reporte de turno**

### 8.3.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.3.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| t/h y t/d procesadas | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Producción de oro equivalente | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Recuperación Au | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Disponibilidad física | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OEE | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Paradas no programadas | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Alarmas activas por severidad | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Activos críticos fuera de servicio | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Backlog mantenimiento crítico | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Stock crítico sin disponibilidad | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Consumo de energía por tonelada | Indicador gobernado del dashboard Gerencia de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.3.5 Visualizaciones

- Mímico de las 18 etapas.
- Tendencia de producción por turno.
- Pareto de pérdidas de producción.
- Gantt de paradas.
- Mapa de alarmas.
- Heatmap de disponibilidad por etapa.
- Tabla de activos críticos.

### 8.3.6 Fuentes de datos

- **SCADA/Historian** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PROC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PTE** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-WMS** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-CC/LAB** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Maintenance/Stock** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.3.7 Alertas y excepciones

- Parada de etapa.
- Activo crítico detenido.
- Alarma alta/alta-alta.
- Pérdida de comunicaciones.
- Stockout de repuesto crítico.
- Desviación metalúrgica.
- Evento HSE.

### 8.3.8 Acciones rápidas

- Reconocer evento contextual.
- Abrir FUR del activo.
- Abrir OT relacionada.
- Solicitar repuesto.
- Abrir tendencia.
- Crear comentario de turno.
- Exportar reporte.

### 8.3.9 Drill-down

Planta → etapa Dxx → sistema → activo → variable/evento → OT/documento/evidencia.

### 8.3.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.3.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.3.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.4 Metalurgia / Procesos — `FUR-DASH-MET-001`

**Ruta:** `/app/dashboards/procesos`  
**Dominio:** FUR-PROC / Metalurgia  
**Rol principal:** `MET`  
**Audiencia:** Metalurgistas, ingeniería de procesos, gerente de planta  
**Refresco objetivo:** 1–5 min  

### 8.4.1 Objetivo

Monitorear desempeño metalúrgico, balance, variables críticas, correlaciones entre instrumentos, muestras y resultados de laboratorio.

### 8.4.2 Sidebar / menú contextual

1. **Resumen metalúrgico**
2. **Alimentación**
3. **Molienda**
4. **Clasificación**
5. **Pre-lixiviación**
6. **Lixiviación/CIL**
7. **Adsorción CIP**
8. **Desorción/Elución**
9. **Electrowinning**
10. **Fundición**
11. **Relaves**
12. **Balance metalúrgico**
13. **Correlación IoT–CC–LAB**
14. **Ensayos y campañas**
15. **KPIs por etapa**

### 8.4.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.4.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Throughput t/h | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| P80 alimentación/producto | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| % sólidos | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| pH | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| ORP | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| NaCN libre | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Oxígeno disuelto | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Densidad de pulpa | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Au alimentación | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Au solución | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Au carbón | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Recuperación global | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Inventario de oro en proceso | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Consumo reactivo específico | Indicador gobernado del dashboard Metalurgia / Procesos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.4.5 Visualizaciones

- Tendencias multivariable.
- Balance Sankey conceptual.
- Correlación IoT vs laboratorio.
- Control charts.
- Boxplots por turno.
- Heatmap por tanque CIL/CIP.
- Perfil granulométrico.
- Curvas de recuperación.

### 8.4.6 Fuentes de datos

- **FUR-PROC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-CC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-LAB** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **SCADA/Historian** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Quality** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos/SOP** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.4.7 Alertas y excepciones

- pH fuera de banda.
- ORP fuera de banda.
- NaCN bajo/alto.
- DO bajo.
- P80 fuera de especificación.
- Diferencia IoT vs LAB sobre tolerancia aprobada.
- Muestra crítica pendiente.

### 8.4.8 Acciones rápidas

- Abrir proceso/FUR.
- Abrir instrumento.
- Abrir muestra.
- Abrir resultado LAB.
- Comparar períodos.
- Crear campaña de análisis.
- Añadir observación técnica.

### 8.4.9 Drill-down

Etapa → variable → instrumento/tag → muestra relacionada → análisis LAB → documento/método → decisión/acción.

### 8.4.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.4.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.4.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.5 Operación de Planta — `FUR-DASH-OPR-001`

**Ruta:** `/app/dashboards/operacion`  
**Dominio:** Operación  
**Rol principal:** `OPR`  
**Audiencia:** Operadores de sala de control y terreno  
**Refresco objetivo:** 5–30 s  

### 8.5.1 Objetivo

Dar visibilidad operacional de variables y estado sin sustituir al sistema SCADA de control; el dashboard es supervisión y contexto.

### 8.5.2 Sidebar / menú contextual

1. **Vista de turno**
2. **Resumen de proceso**
3. **Variables críticas**
4. **Alarmas**
5. **Equipos**
6. **Interlocks informativos**
7. **Rondas/inspecciones**
8. **Eventos de turno**
9. **Consignas autorizadas**
10. **Documentos SOP**
11. **Handover de turno**

### 8.5.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.5.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Producción turno | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Equipos en marcha/parados | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Alarmas activas | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Variables fuera de rango | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Disponibilidad por área | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Consumo de agua/energía autorizado | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Rondas completadas | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Eventos pendientes de cierre | Indicador gobernado del dashboard Operación de Planta. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.5.5 Visualizaciones

- Mímico simplificado.
- Trend de variables.
- Lista de alarmas.
- Estado de equipos.
- Panel de rondas.
- Timeline de eventos.

### 8.5.6 Fuentes de datos

- **SCADA/Historian** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PROC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Maintenance** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **SOP/Documentos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.5.7 Alertas y excepciones

- HH/H/L/LL de variable.
- Equipo detenido.
- Interlock activo.
- Pérdida de señal.
- Ronda vencida.
- Evento no reconocido.

### 8.5.8 Acciones rápidas

- Abrir tendencia.
- Abrir SOP.
- Registrar evento.
- Crear solicitud de mantenimiento.
- Abrir FUR.
- Iniciar ronda.

### 8.5.9 Drill-down

Turno → área → equipo → variable → tendencia → FUR/SOP/evento. No ejecutar control directo desde el dashboard salvo futura autorización formal.

### 8.5.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.5.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.5.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.6 Potencia Eléctrica — `FUR-DASH-PTE-001`

**Ruta:** `/app/dashboards/potencia`  
**Dominio:** FUR-PTE  
**Rol principal:** `ELE`  
**Audiencia:** Ingeniería eléctrica, mantenimiento eléctrico, gerencia de planta  
**Refresco objetivo:** 5–30 s  

### 8.6.1 Objetivo

Supervisar red eléctrica, cargas, protecciones, calidad de energía, disponibilidad de subestaciones, MCC, VFD y motores.

### 8.6.2 Sidebar / menú contextual

1. **Resumen eléctrico**
2. **Diagrama unifilar**
3. **Subestaciones**
4. **Transformadores**
5. **Switchgear/celdas**
6. **MCC**
7. **Motores**
8. **VFD/arrancadores**
9. **Protecciones**
10. **Medición y energía**
11. **Calidad de energía**
12. **Eventos/trips**
13. **Mantenimiento eléctrico**
14. **Pruebas y documentos**

### 8.6.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.6.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Demanda kW/kVA | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Demanda máxima | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Factor de potencia | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Corriente por alimentador | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Tensión por barra | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Frecuencia | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| THD V/I | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Número de trips | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Disponibilidad MCC/VFD | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Carga de transformadores (%) | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Consumo kWh/t | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Temperatura de activos monitoreados | Indicador gobernado del dashboard Potencia Eléctrica. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.6.5 Visualizaciones

- Unifilar resumido interactivo.
- Trend V/I/kW/PF.
- Heatmap carga de transformadores.
- Pareto de trips.
- Tabla de protecciones activadas.
- Perfil de demanda.
- Indicadores de calidad de energía.

### 8.6.6 Fuentes de datos

- **FUR-PTE** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **IED/relés** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Medidores de energía** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **SCADA/Historian** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Maintenance** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.6.7 Alertas y excepciones

- Sobrecarga.
- Sub/sobretensión.
- Bajo factor de potencia.
- THD alto.
- Trip de protección.
- MCC/VFD indisponible.
- Temperatura alta.
- Pérdida de medición.

### 8.6.8 Acciones rápidas

- Abrir unifilar.
- Abrir FUR-PTE.
- Abrir evento/trip.
- Abrir tendencia.
- Crear OT.
- Abrir curva/configuración documental.
- Exportar reporte.

### 8.6.9 Drill-down

Planta → subestación → barra/alimentador → equipo → protección/medición → evento → OT/documento.

### 8.6.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.6.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.6.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.7 Instrumentación / OT — `FUR-DASH-IOT-001`

**Ruta:** `/app/dashboards/iot`  
**Dominio:** FUR-IOT  
**Rol principal:** `IOT`  
**Audiencia:** Instrumentistas, automatización, OT, ingeniería  
**Refresco objetivo:** 10–60 s  

### 8.7.1 Objetivo

Gestionar salud, conectividad, metrología y trazabilidad de instrumentos, tags, gateways, PLC/RTU y series temporales.

### 8.7.2 Sidebar / menú contextual

1. **Resumen OT**
2. **Instrumentos**
3. **Variables**
4. **Tags**
5. **PLC/RTU/RIO**
6. **Gateways/Edge**
7. **SCADA**
8. **Historian**
9. **Calibraciones**
10. **Alarmas de instrumento**
11. **Calidad de señal**
12. **Latencia/comunicaciones**
13. **Firmware/configuración**
14. **Ciberseguridad OT**
15. **Documentación**

### 8.7.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.7.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Instrumentos online (%) | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Tags Good (%) | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Tags Bad/Uncertain | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Instrumentos con calibración vencida | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Instrumentos críticos offline | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Latencia media | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Gateways online | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| PLC/RIO health | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Tasa de pérdida de datos | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Disponibilidad historian | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Pendientes de metrología | Indicador gobernado del dashboard Instrumentación / OT. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.7.5 Visualizaciones

- Health matrix por área.
- Heatmap de calidad de señal.
- Trend de latencia.
- Timeline de desconexiones.
- Calendario de calibraciones.
- Top instrumentos con fallas.
- Matriz instrumento→PLC→SCADA→Historian.

### 8.7.6 Fuentes de datos

- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **SCADA** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Historian** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **PLC/RTU/RIO** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Gateways** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Maintenance** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos/calibración** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.7.7 Alertas y excepciones

- Tag Bad/Uncertain.
- Instrumento offline.
- Calibración vencida.
- Latencia alta.
- PLC/gateway indisponible.
- Pérdida de historian.
- Cambio no autorizado de configuración.

### 8.7.8 Acciones rápidas

- Abrir FUR-IOT.
- Abrir tendencia.
- Abrir calibración.
- Crear OT.
- Ver cadena digital.
- Abrir documento.
- Comparar último valor vs laboratorio cuando aplique.

### 8.7.9 Drill-down

Área → instrumento → variable/tag → canal PLC → objeto SCADA → serie Historian → calibración/evento.

### 8.7.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.7.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.7.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.8 GPON / Comunicaciones — `FUR-DASH-GPON-001`

**Ruta:** `/app/dashboards/gpon`  
**Dominio:** FUR-GPON  
**Rol principal:** `GPN`  
**Audiencia:** Telecomunicaciones, OT, infraestructura  
**Refresco objetivo:** 30–60 s  

### 8.8.1 Objetivo

Supervisar topología óptica, OLT/ODN/ONU, potencia óptica, servicios, VLAN y disponibilidad de comunicaciones.

### 8.8.2 Sidebar / menú contextual

1. **Resumen GPON**
2. **Topología**
3. **OLT**
4. **Puertos PON**
5. **ODF/ODN**
6. **Splitters**
7. **Fibra/Backbone**
8. **Empalmes/cierres**
9. **ONU/ONT**
10. **Switches/uplinks**
11. **Potencia óptica**
12. **Servicios/VLAN**
13. **OTDR**
14. **Alarmas**
15. **Inventario telecom**
16. **Mantenimiento**

### 8.8.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.8.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| ONU online (%) | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OLT/PON disponibles | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Rx/Tx óptico | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Pérdida óptica estimada/medida | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Margen óptico | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Puertos ocupados (%) | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Servicios afectados | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Latencia/jitter cuando aplique | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OTDR pendientes | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Incidencias abiertas | Indicador gobernado del dashboard GPON / Comunicaciones. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.8.5 Visualizaciones

- Topología lógica/física.
- Heatmap de potencia óptica.
- Mapa de fibra.
- Tabla OLT→PON→ONU.
- Trend Rx/Tx.
- Timeline de alarmas.
- Capacidad de puertos.

### 8.8.6 Fuentes de datos

- **FUR-GPON** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **NMS OLT/ONU** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Pruebas OTDR/power meter** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **GIS/mapa** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-CAM/FUR-IOT relaciones** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Maintenance** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.8.7 Alertas y excepciones

- ONU offline.
- PON down.
- Rx bajo.
- Margen óptico crítico.
- Uplink down.
- Servicio afectado.
- OTDR fuera de criterio.

### 8.8.8 Acciones rápidas

- Abrir topología.
- Abrir FUR-GPON.
- Abrir servicio afectado.
- Crear OT.
- Ver ruta de fibra.
- Adjuntar OTDR.
- Abrir activo dependiente.

### 8.8.9 Drill-down

OLT → tarjeta → PON → splitter → fibra → ONU/ONT → servicio → activo FUR consumidor.

### 8.8.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.8.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.8.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.9 Control de Calidad / Muestras — `FUR-DASH-CC-001`

**Ruta:** `/app/dashboards/calidad`  
**Dominio:** FUR-CC  
**Rol principal:** `LAB`  
**Audiencia:** QA/QC, metalurgia, laboratorio  
**Refresco objetivo:** 5–15 min  

### 8.9.1 Objetivo

Controlar muestreo físico, cadena de custodia, cumplimiento del plan de muestreo y calidad de las muestras.

### 8.9.2 Sidebar / menú contextual

1. **Resumen QA/QC**
2. **Plan de muestreo**
3. **Puntos de muestreo**
4. **Muestras tomadas**
5. **Muestras pendientes**
6. **Cadena de custodia**
7. **Preparación**
8. **Solicitudes al laboratorio**
9. **Blancos**
10. **Duplicados**
11. **Materiales de referencia**
12. **No conformidades**
13. **Trazabilidad por etapa**
14. **Documentos**

### 8.9.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.9.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Muestras planificadas vs tomadas | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Muestras pendientes de recepción | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cadena de custodia abierta | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Muestras fuera de tiempo | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Controles QA/QC ejecutados | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Duplicados/blancos/CRM por lote | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| No conformidades | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Tiempo toma→recepción | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cobertura del plan de muestreo | Indicador gobernado del dashboard Control de Calidad / Muestras. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.9.5 Visualizaciones

- Pipeline de muestras.
- Heatmap puntos de muestreo.
- Pareto no conformidades.
- Timeline de custodia.
- Calendario de muestreo.
- Matriz muestra→solicitud→resultado.

### 8.9.6 Fuentes de datos

- **FUR-CC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PROC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-LAB** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Quality** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos/SOP** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.9.7 Alertas y excepciones

- Muestra vencida.
- Cadena incompleta.
- Muestra sin punto válido.
- Control QA/QC faltante.
- Recepción tardía.
- No conformidad abierta.

### 8.9.8 Acciones rápidas

- Registrar muestra.
- Abrir cadena de custodia.
- Crear solicitud LAB.
- Abrir resultado vinculado.
- Registrar no conformidad.
- Imprimir etiqueta/QR.

### 8.9.9 Drill-down

Etapa → punto → muestra → custodia → preparación → solicitud → análisis LAB.

### 8.9.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.9.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.9.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.10 Laboratorio — `FUR-DASH-LAB-001`

**Ruta:** `/app/dashboards/laboratorio`  
**Dominio:** FUR-LAB  
**Rol principal:** `LAB`  
**Audiencia:** Laboratorio, QA/QC, metalurgia  
**Refresco objetivo:** 5–15 min  

### 8.10.1 Objetivo

Gestionar carga de trabajo, métodos, corridas, equipos, resultados, QA/QC y certificación analítica.

### 8.10.2 Sidebar / menú contextual

1. **Resumen laboratorio**
2. **Recepción**
3. **Cola de muestras**
4. **Preparación**
5. **Métodos/SOP**
6. **Equipos**
7. **Calibraciones**
8. **Corridas**
9. **Resultados**
10. **QA/QC**
11. **Validación**
12. **Certificados**
13. **TAT**
14. **No conformidades**
15. **Capacidad del laboratorio**

### 8.10.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.10.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Muestras en cola | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| TAT promedio/mediana | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Muestras vencidas | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Corridas abiertas | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Equipos disponibles | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Calibraciones vigentes | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| QA/QC aceptación | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Resultados fuera de control | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Certificados pendientes | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Capacidad utilizada | Indicador gobernado del dashboard Laboratorio. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.10.5 Visualizaciones

- Cola por prioridad.
- Control charts QA/QC.
- Histograma TAT.
- Calendario de equipos.
- Pareto de repeticiones.
- Trend resultados.
- Matriz equipo→método→corrida.

### 8.10.6 Fuentes de datos

- **FUR-LAB** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-CC** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Quality** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Equipos de laboratorio** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos/SOP** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.10.7 Alertas y excepciones

- TAT excedido.
- Equipo fuera de calibración.
- Control QA/QC rechazado.
- Resultado pendiente de revisión.
- Certificado vencido.
- Muestra sin preparación.

### 8.10.8 Acciones rápidas

- Asignar muestra.
- Abrir corrida.
- Registrar/revisar resultado.
- Aprobar certificado según rol.
- Crear OT de equipo.
- Abrir muestra origen.

### 8.10.9 Drill-down

Muestra → método → equipo → corrida → resultado → QA/QC → validación → certificado.

### 8.10.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.10.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.10.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.11 Mantenimiento y Confiabilidad — `FUR-DASH-MNT-001`

**Ruta:** `/app/dashboards/mantenimiento`  
**Dominio:** FUR-MNT  
**Rol principal:** `MEC`  
**Audiencia:** Mantenimiento mecánico/eléctrico/OT, gerencia  
**Refresco objetivo:** 5–15 min  

### 8.11.1 Objetivo

Gestionar condición, estrategia, planes, órdenes, fallas, repuestos, confiabilidad y backlog de activos.

### 8.11.2 Sidebar / menú contextual

1. **Resumen mantenimiento**
2. **Activos críticos**
3. **Plan preventivo**
4. **Predictivo/condición**
5. **Correctivo**
6. **Órdenes de trabajo**
7. **Backlog**
8. **Inspecciones**
9. **Lubricación**
10. **Fallas**
11. **RCM/criticidad**
12. **MTBF/MTTR**
13. **Repuestos/BOM**
14. **Paradas mayores**
15. **Recursos**
16. **Costos**
17. **Historial**

### 8.11.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.11.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Disponibilidad | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| MTBF | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| MTTR | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cumplimiento PM | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Backlog total/crítico | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OT vencidas | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Horas de parada | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Costo mantenimiento | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Reincidencia de fallas | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cobertura predictiva | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Repuestos críticos disponibles | Indicador gobernado del dashboard Mantenimiento y Confiabilidad. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.11.5 Visualizaciones

- Pareto de fallas.
- Gantt de mantenimiento.
- Backlog aging.
- Trend MTBF/MTTR.
- Matriz criticidad.
- Mapa de condición.
- Curva costo vs disponibilidad.

### 8.11.6 Fuentes de datos

- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **maintenance.equipment** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **maintenance.request** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-IOT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PTE** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **WMS/stock** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Purchase/Odoo** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.11.7 Alertas y excepciones

- OT crítica vencida.
- Falla repetitiva.
- Condición predictiva crítica.
- Repuesto crítico no disponible.
- Activo crítico indisponible.
- PM vencido.

### 8.11.8 Acciones rápidas

- Crear/abrir OT.
- Reservar repuesto.
- Abrir BOM.
- Abrir FUR activo.
- Programar inspección.
- Registrar falla.
- Abrir tendencia de condición.

### 8.11.9 Drill-down

Activo → estrategia → plan → OT → falla/condición → BOM → stock → compra.

### 8.11.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.11.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.11.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.12 WMS / Inventario — `FUR-DASH-WMS-001`

**Ruta:** `/app/dashboards/wms`  
**Dominio:** WMS / Inventario  
**Rol principal:** `WMS`  
**Audiencia:** Almacén, logística, mantenimiento, compras  
**Refresco objetivo:** 5–15 min  

### 8.12.1 Objetivo

Controlar inventario, ubicaciones, lotes/series, movimientos, reservas, stock crítico y trazabilidad de repuestos.

### 8.12.2 Sidebar / menú contextual

1. **Resumen inventario**
2. **Almacenes**
3. **Ubicaciones**
4. **Stock**
5. **Repuestos críticos**
6. **Lotes/series**
7. **Recepciones**
8. **Despachos**
9. **Transferencias**
10. **Reservas**
11. **Inventario cíclico**
12. **RFID/códigos**
13. **Movimientos recientes**
14. **Exactitud**
15. **Aging/obsolescencia**
16. **Demandas mantenimiento**

### 8.12.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.12.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Valor de inventario | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Stock crítico disponible | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Stockouts | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Exactitud inventario | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Rotación | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Días de inventario | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Reservas pendientes | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Recepciones pendientes | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Despachos pendientes | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Ítems obsoletos | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Fill rate mantenimiento | Indicador gobernado del dashboard WMS / Inventario. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.12.5 Visualizaciones

- ABC/XYZ.
- Aging de inventario.
- Mapa de almacén.
- Trend entradas/salidas.
- Pareto stockouts.
- Heatmap de ubicaciones.
- Demanda vs stock.

### 8.12.6 Fuentes de datos

- **stock.quant** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **stock.location** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **stock.move** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **stock.move.line** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **stock.picking** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **product.product** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **purchase.order** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.12.7 Alertas y excepciones

- Stock crítico bajo mínimo.
- Stockout.
- Lote vencido.
- Recepción atrasada.
- Reserva sin stock.
- Diferencia de conteo.

### 8.12.8 Acciones rápidas

- Abrir ítem.
- Reservar.
- Crear solicitud de compra.
- Abrir ubicación.
- Ver movimientos.
- Iniciar conteo.
- Abrir activo/BOM relacionado.

### 8.12.9 Drill-down

Ítem → almacén → ubicación → lote/serie → movimiento → demanda/OT → RQ/PO.

### 8.12.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.12.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.12.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.13 Compras / Abastecimiento — `FUR-DASH-BUY-001`

**Ruta:** `/app/dashboards/compras`  
**Dominio:** FUR-RQ / FUR-OF / Odoo Purchase  
**Rol principal:** `BUY`  
**Audiencia:** Compras, logística, costos, solicitantes autorizados  
**Refresco objetivo:** 15–60 min  

### 8.13.1 Objetivo

Gestionar ciclo de abastecimiento desde requisición hasta oferta, adjudicación, orden y recepción.

### 8.13.2 Sidebar / menú contextual

1. **Resumen sourcing**
2. **Requisiciones**
3. **Aprobaciones**
4. **RFQ**
5. **Ofertas recibidas**
6. **Comparativas**
7. **Adjudicaciones**
8. **Órdenes de compra**
9. **Recepciones**
10. **Proveedores**
11. **Homologación**
12. **Lead time**
13. **Ahorros**
14. **Expediting**
15. **Documentos comerciales**

### 8.13.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.13.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| RQ abiertas | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| RQ vencidas | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| RFQ activas | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Ofertas pendientes | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Tiempo RQ→PO | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Ahorro sourcing | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| PO abiertas | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Recepciones atrasadas | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OTIF proveedor | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Spend por categoría | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Proveedores activos/homologados | Indicador gobernado del dashboard Compras / Abastecimiento. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.13.5 Visualizaciones

- Funnel RQ→RFQ→OF→PO.
- Aging de requisiciones.
- Pareto spend.
- Scorecard proveedor.
- Trend lead time.
- Ahorro vs baseline.
- Calendario de entregas.

### 8.13.6 Fuentes de datos

- **FUR-RQ** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-OF** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **purchase.requisition si aplica** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **purchase.order** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **res.partner** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **stock.picking** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **LuloWin/costos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.13.7 Alertas y excepciones

- RQ sin aprobación.
- RFQ sin ofertas.
- Oferta por vencer.
- PO retrasada.
- Proveedor no homologado.
- Desviación comercial alta.

### 8.13.8 Acciones rápidas

- Crear RFQ.
- Comparar ofertas.
- Abrir proveedor.
- Adjudicar según permiso.
- Abrir PO.
- Solicitar expediting.
- Abrir FUR activo/repuesto relacionado.

### 8.13.9 Drill-down

RQ → líneas → RFQ → ofertas → comparativa → adjudicación → PO → recepción → activo/stock.

### 8.13.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.13.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.13.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.14 Presupuesto / Costos — `FUR-DASH-CST-001`

**Ruta:** `/app/dashboards/costos`  
**Dominio:** LULO / Costos  
**Rol principal:** `CST`  
**Audiencia:** Costos, presupuesto, dirección, proyectos  
**Refresco objetivo:** 15–60 min  

### 8.14.1 Objetivo

Controlar presupuesto base, APU, compromisos, real, proyección y variaciones por proyecto, etapa y centro de costo.

### 8.14.2 Sidebar / menú contextual

1. **Resumen financiero**
2. **Presupuesto base**
3. **Capítulos/partidas**
4. **APU**
5. **Materiales**
6. **Mano de obra**
7. **Equipos**
8. **Rendimientos**
9. **Indirectos**
10. **CAPEX**
11. **OPEX**
12. **Comprometido**
13. **Real**
14. **Forecast**
15. **Curva S**
16. **Variaciones**
17. **Flujo de caja**
18. **Escenarios**
19. **Reportes**

### 8.14.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.14.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Presupuesto base | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Presupuesto vigente | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Comprometido | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Devengado/real | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Forecast EAC | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Variación costo | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| CPI/SPI si se formaliza | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| CAPEX vs OPEX | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Costo por tonelada | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Ahorro compras | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Contingencia consumida | Indicador gobernado del dashboard Presupuesto / Costos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.14.5 Visualizaciones

- Curva S.
- Waterfall variación.
- Treemap de costos.
- Trend costo/t.
- Burn rate.
- Tabla APU.
- Forecast mensual.

### 8.14.6 Fuentes de datos

- **Motor LULO** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo Accounting/Analytic** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Purchase** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Stock valuation si aplica** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-RQ/FUR-OF** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Project** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.14.7 Alertas y excepciones

- Sobrepresupuesto.
- Partida sin presupuesto.
- Compromiso > disponibilidad.
- Forecast excedido.
- APU desactualizado.
- Variación > umbral.

### 8.14.8 Acciones rápidas

- Abrir presupuesto.
- Abrir APU.
- Abrir PO asociado.
- Comparar baseline/real.
- Crear escenario.
- Exportar control presupuestario.

### 8.14.9 Drill-down

Proyecto → capítulo → partida → APU → recurso → compromiso/PO → real → documento/evidencia.

### 8.14.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.14.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.14.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.15 Ingeniería / Proyectos — `FUR-DASH-ENG-001`

**Ruta:** `/app/dashboards/ingenieria`  
**Dominio:** Ingeniería / Gobierno Técnico  
**Rol principal:** `ENG`  
**Audiencia:** Ingeniería, proyectos, document control  
**Refresco objetivo:** 15–60 min  

### 8.15.1 Objetivo

Controlar documentación, cambios, MOC, revisiones, HOLD/TBC, avance de proyectos, punch list y madurez técnica.

### 8.15.2 Sidebar / menú contextual

1. **Resumen ingeniería**
2. **Proyectos**
3. **MOC**
4. **Documentos**
5. **Revisiones**
6. **TBC/HOLD**
7. **Punch list**
8. **RFI/consultas**
9. **Entregables**
10. **AS-BUILT**
11. **FAT/SAT/UAT**
12. **Activos nuevos/modificados**
13. **Interfaces**
14. **Riesgos técnicos**
15. **Madurez D0–D5**

### 8.15.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.15.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Entregables planificados/completados | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| TBC/HOLD abiertos | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| TBC/HOLD vencidos | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| MOC abiertos | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Documentos por revisión | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Punch pendientes | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| FAT/SAT/UAT completados | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| FUR promovidos D3→D4→D5 | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| AS-BUILT pendientes | Indicador gobernado del dashboard Ingeniería / Proyectos. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.15.5 Visualizaciones

- Kanban de MOC.
- Matriz de madurez.
- Aging TBC/HOLD.
- Curva de avance.
- Matriz documentos vs activos.
- Timeline de revisiones.
- Punch Pareto.

### 8.15.6 Fuentes de datos

- **FUR** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **ir.attachment/Documentos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **project.project** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **MOC propio** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Audit log** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FAT/SAT/UAT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Modelos FUR especializados** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.15.7 Alertas y excepciones

- TBC/HOLD vencido.
- MOC sin aprobación.
- Documento obsoleto.
- Activo sin evidencia.
- Cambio sin trazabilidad.
- Punch crítico pendiente.

### 8.15.8 Acciones rápidas

- Crear MOC.
- Abrir documento.
- Comparar revisiones.
- Cerrar TBC con evidencia.
- Promover madurez.
- Abrir FUR afectadas.
- Exportar transmittal.

### 8.15.9 Drill-down

Proyecto → entregable/MOC → activo/FUR → documento → revisión → aprobación → evidencia.

### 8.15.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.15.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.15.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.16 HSE / SSOMA — `FUR-DASH-HSE-001`

**Ruta:** `/app/dashboards/hse`  
**Dominio:** HSE / Seguridad  
**Rol principal:** `HSE`  
**Audiencia:** HSE, gerencia, operaciones  
**Refresco objetivo:** 5–15 min  

### 8.16.1 Objetivo

Consolidar incidentes, condiciones inseguras, permisos, inspecciones y evidencias vinculadas a ubicación y activos.

### 8.16.2 Sidebar / menú contextual

1. **Resumen HSE**
2. **Incidentes**
3. **Observaciones**
4. **Inspecciones**
5. **Permisos de trabajo**
6. **Riesgos**
7. **Acciones correctivas**
8. **Mapa de eventos**
9. **Cámaras relacionadas**
10. **Capacitación HSE**
11. **Cumplimiento**
12. **Tendencias**
13. **Documentos**

### 8.16.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.16.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Incidentes por período | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| TRIFR/LTIFR si están aprobados | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Acciones vencidas | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Inspecciones completadas | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Permisos activos | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Hallazgos por severidad | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Eventos CCTV vinculados | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cumplimiento capacitación HSE | Indicador gobernado del dashboard HSE / SSOMA. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.16.5 Visualizaciones

- Mapa de calor.
- Trend incidentes.
- Pareto causas.
- Aging acciones.
- Matriz riesgo.
- Calendario permisos.

### 8.16.6 Fuentes de datos

- **HSE propio/Odoo Project o Quality según diseño final** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-CAM** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **LMS** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR de ubicación/activo** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.16.7 Alertas y excepciones

- Incidente alto potencial.
- Acción correctiva vencida.
- Permiso vencido.
- Inspección crítica fallida.
- Cámara crítica offline en zona sensible.

### 8.16.8 Acciones rápidas

- Registrar incidente.
- Crear acción.
- Abrir evidencia CCTV.
- Abrir FUR ubicación/activo.
- Programar inspección.
- Asignar curso HSE.

### 8.16.9 Drill-down

Evento → ubicación → activo → evidencia → acción → responsable → cierre/auditoría.

### 8.16.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.16.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.16.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.17 Seguridad / CCTV — `FUR-DASH-CAM-001`

**Ruta:** `/app/dashboards/camaras`  
**Dominio:** FUR-CAM  
**Rol principal:** `SEC`  
**Audiencia:** Seguridad física, HSE, administradores autorizados  
**Refresco objetivo:** 5–30 s  

### 8.17.1 Objetivo

Supervisar cámaras, grabación, almacenamiento, analíticas, cobertura y salud del sistema de video.

### 8.17.2 Sidebar / menú contextual

1. **Video wall**
2. **Mapa de cámaras**
3. **Cámaras online/offline**
4. **Eventos analíticos**
5. **Grabaciones**
6. **Retención/storage**
7. **Cobertura**
8. **PTZ**
9. **Analíticas**
10. **Salud de red**
11. **Mantenimiento**
12. **Evidencias**
13. **Auditoría de acceso**

### 8.17.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.17.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Cámaras online (%) | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cámaras offline | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cobertura de zonas críticas | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Storage disponible | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Días de retención | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Eventos analíticos | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| PTZ disponibles | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Incidencias abiertas | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cámaras sin grabación | Indicador gobernado del dashboard Seguridad / CCTV. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.17.5 Visualizaciones

- Video wall.
- Mapa geoespacial.
- Health matrix.
- Trend disponibilidad.
- Storage capacity.
- Timeline eventos.
- Cobertura por zona.

### 8.17.6 Fuentes de datos

- **FUR-CAM** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **VMS/NVR** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-GPON** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-PTE** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR-MNT** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Audit log** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.17.7 Alertas y excepciones

- Cámara offline.
- Grabación fallida.
- Storage bajo.
- Pérdida de enlace.
- Analítica crítica.
- Acceso no autorizado.

### 8.17.8 Acciones rápidas

- Abrir cámara.
- Abrir playback.
- Crear evidencia.
- Crear OT.
- Abrir red/energía relacionada.
- Exportar clip según permiso.

### 8.17.9 Drill-down

Zona → cámara → stream/grabación → evento → evidencia → caso/incidente → auditoría.

### 8.17.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.17.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.17.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.18 Formación / LMS — `FUR-DASH-LMS-001`

**Ruta:** `/app/dashboards/lms`  
**Dominio:** LMS  
**Rol principal:** `INS`  
**Audiencia:** Instructor, RRHH, gerencia, responsables de competencia  
**Refresco objetivo:** 15–60 min  

### 8.18.1 Objetivo

Gestionar cursos, rutas de aprendizaje, progreso, evaluaciones, certificaciones y competencias vinculadas a roles/activos.

### 8.18.2 Sidebar / menú contextual

1. **Resumen LMS**
2. **Catálogo cursos**
3. **Rutas de aprendizaje**
4. **Inscripciones**
5. **Progreso**
6. **Evaluaciones**
7. **Certificaciones**
8. **Vencimientos**
9. **Competencias**
10. **Instructores**
11. **Estudiantes**
12. **Calendario**
13. **Contenido**
14. **Reportes**

### 8.18.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.18.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Cursos activos | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Inscritos | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Finalización (%) | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Aprobación (%) | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Certificaciones vigentes | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Certificaciones por vencer | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Horas de formación | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Gap de competencia | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cursos obligatorios pendientes | Indicador gobernado del dashboard Formación / LMS. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.18.5 Visualizaciones

- Matriz de competencias.
- Trend finalización.
- Calendario.
- Distribución calificaciones.
- Aging de vencimientos.
- Ranking de rutas por adopción sin evaluación de personas.

### 8.18.6 Fuentes de datos

- **Odoo eLearning/LMS** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **hr.employee** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **res.users** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **FUR roles/activos** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos de curso** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.18.7 Alertas y excepciones

- Certificación por vencer.
- Curso obligatorio pendiente.
- Evaluación vencida.
- Instructor sin material aprobado.

### 8.18.8 Acciones rápidas

- Crear curso.
- Asignar ruta.
- Inscribir usuarios.
- Emitir certificado según regla.
- Abrir competencia.
- Exportar reporte.

### 8.18.9 Drill-down

Rol/competencia → curso → módulo → usuario → evaluación → certificación → evidencia.

### 8.18.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.18.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.18.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.19 Portal Proveedor — `FUR-DASH-SUP-001`

**Ruta:** `/app/dashboards/proveedor`  
**Dominio:** Portal Externo  
**Rol principal:** `SUP`  
**Audiencia:** Proveedor/Vendedor externo autorizado  
**Refresco objetivo:** 15–60 min  

### 8.19.1 Objetivo

Dar a proveedores una vista segura de RFQ, ofertas, PO, entregas, documentos y score propio.

### 8.19.2 Sidebar / menú contextual

1. **Resumen**
2. **RFQ recibidas**
3. **Mis ofertas**
4. **Órdenes de compra**
5. **Entregas**
6. **Documentos**
7. **Productos/servicios**
8. **Certificaciones**
9. **Mensajes**
10. **Score propio**
11. **Facturación/estado si se habilita**
12. **Perfil**

### 8.19.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.19.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| RFQ abiertas | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Ofertas enviadas | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Ofertas por vencer | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| PO abiertas | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Entregas próximas | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Entregas atrasadas | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Documentos por renovar | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| OTIF propio | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Score de proveedor propio | Indicador gobernado del dashboard Portal Proveedor. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.19.5 Visualizaciones

- Funnel comercial.
- Calendario entregas.
- Trend OTIF.
- Estado documental.
- Timeline mensajes.

### 8.19.6 Fuentes de datos

- **FUR-RQ/FUR-OF filtradas** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **purchase.order** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **res.partner** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **stock.picking** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Documentos del proveedor** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.19.7 Alertas y excepciones

- RFQ por vencer.
- Documento vencido.
- Entrega atrasada.
- PO modificada.
- Solicitud de aclaración.

### 8.19.8 Acciones rápidas

- Responder RFQ.
- Actualizar oferta.
- Confirmar entrega.
- Subir documento.
- Actualizar perfil.
- Enviar mensaje.

### 8.19.9 Drill-down

RFQ propia → oferta propia → PO propia → entrega → documento/recepción. ABAC obligatorio por partner.

### 8.19.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.19.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.19.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

## 8.20 Auditoría y Gobierno — `FUR-DASH-AUD-001`

**Ruta:** `/app/dashboards/auditoria`  
**Dominio:** Gobierno / Auditoría  
**Rol principal:** `AUD`  
**Audiencia:** Auditores, administrador, gobierno de datos  
**Refresco objetivo:** 15–60 min  

### 8.20.1 Objetivo

Proveer trazabilidad completa de cambios, accesos, aprobaciones, calidad del dato, madurez y evidencias.

### 8.20.2 Sidebar / menú contextual

1. **Resumen de gobierno**
2. **Audit log**
3. **Cambios FUR**
4. **Accesos**
5. **Aprobaciones**
6. **Calidad del dato**
7. **Madurez D0–D5**
8. **TBC/HOLD**
9. **Documentos/evidencias**
10. **Permisos/RBAC**
11. **Integridad referencial**
12. **Datos huérfanos**
13. **Interfaces**
14. **Exportaciones**
15. **Hallazgos**

### 8.20.3 Secciones de la pantalla

#### Sección 1 — Cabecera contextual

Nombre del dashboard, código, alcance, período, planta/área, última actualización, conectividad y calidad de datos.

#### Sección 2 — Filtros

Filtros globales y específicos del dominio; deben afectar KPI, gráficos y tablas de forma coherente.

#### Sección 3 — KPIs primarios

Tarjetas de alto nivel con valor, unidad, objetivo/comparación, estado, tendencia, fuente y timestamp.

#### Sección 4 — Vista operacional/analítica principal

Visualización que mejor represente el dominio: mímico, unifilar, topología, mapa, flujo, Gantt o matriz.

#### Sección 5 — Tendencias y comportamiento

Series temporales y comparación por turno, día, semana, mes o campaña según dominio.

#### Sección 6 — Eventos y excepciones

Alarmas, retrasos, desviaciones, fallas, incumplimientos o eventos pendientes.

#### Sección 7 — Tabla de detalle

Lista ordenable/filtrable con entidades, FUR, estado, criticidad, responsable, timestamps y acciones.

#### Sección 8 — Trazabilidad

Fuente de autoridad, fórmula, relación con FUR, documentos, OT, muestra, PO u otra evidencia.

#### Sección 9 — Acciones rápidas

Acciones contextuales sujetas a RBAC/ABAC; nunca ocultar la fuente de la acción.

#### Sección 10 — Ayuda y definición

Definiciones de KPI, glosario, reglas de negocio y explicación de estados.

### 8.20.4 KPIs

| KPI | Descripción funcional | Unidad/estado | Drill-down |
|---|---|---|---|
| Eventos de auditoría | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Cambios sin evidencia | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Accesos fallidos | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Aprobaciones pendientes | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Registros D0–D2 | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Registros D4/D5 | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| TBC/HOLD vencidos | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Documentos sin revisión vigente | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Relaciones huérfanas | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |
| Excepciones RBAC | Indicador gobernado del dashboard Auditoría y Gobierno. Debe mostrar fuente, timestamp y calidad. | Según definición KPI | Hacia entidad/FUR fuente |

### 8.20.5 Visualizaciones

- Timeline de cambios.
- Matriz de madurez.
- Aging TBC/HOLD.
- Heatmap de accesos.
- Pareto de excepciones.
- Matriz entidad→evidencia.

### 8.20.6 Fuentes de datos

- **fur_audit_event** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **fur_data_quality** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **fur_status_history** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **ir.attachment** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **Odoo mail.message/activity** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **logs de seguridad** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.
- **tablas FUR** — integrar mediante API/capa autorizada; conservar autoridad del sistema de origen.

### 8.20.7 Alertas y excepciones

- Cambio sin usuario/origen.
- Promoción de madurez sin evidencia.
- Acceso indebido.
- Relación huérfana.
- Documento vencido.
- Exportación masiva anómala.

### 8.20.8 Acciones rápidas

- Abrir evento.
- Abrir FUR.
- Comparar versiones.
- Exportar evidencia.
- Crear hallazgo.
- Asignar responsable.
- Cerrar hallazgo con evidencia.

### 8.20.9 Drill-down

Indicador de gobierno → excepción → entidad/FUR → evento → usuario → documento/evidencia → resolución.

### 8.20.10 Permisos

- Lectura: rol principal y perfiles secundarios autorizados.
- Escritura/acción: solo cuando el dominio lo permita y el usuario tenga permiso explícito.
- Exportación: auditable; aplicar clasificación documental.
- Datos sensibles: aplicar ABAC por planta, área, organización, criticidad y clasificación.

### 8.20.11 Estados UX

- **Loading:** skeleton por widget.
- **Sin datos:** explicar si no hay datos o si el filtro no devuelve resultados.
- **Dato retrasado:** mostrar timestamp y badge `STALE`.
- **Error parcial:** fallar el widget, no toda la página.
- **Sin permiso:** ocultar o bloquear con explicación mínima.
- **TBC/HOLD:** badge visible y acceso a evidencia pendiente.

### 8.20.12 Criterios de aceptación

- Todas las tarjetas tienen fuente y timestamp.
- Los filtros se aplican de forma consistente.
- El drill-down conserva contexto.
- No se muestran datos fuera del alcance ABAC.
- Un error de un widget no rompe el dashboard.
- Los KPIs muestran unidad y definición.
- La exportación queda registrada en auditoría cuando corresponda.
- Responsive validado en desktop/tablet/móvil según prioridad del rol.

---

# 9. MI DASHBOARD — COMPOSICIÓN PERSONAL

Ruta: `/app`

El dashboard personal no es un dashboard de autoridad. Reúne widgets autorizados del catálogo anterior.

## 9.1 Secciones

1. Saludo/contexto de usuario.
2. Tareas pendientes.
3. Alertas relevantes.
4. FUR recientes/favoritas.
5. KPIs personales autorizados.
6. Accesos rápidos.
7. Actividad reciente.
8. Calendario.
9. Cursos/certificaciones pendientes.
10. Solicitudes/RQ/OT asignadas.

## 9.2 Reglas

- Cada widget conserva su permiso de origen.
- No se puede agregar un widget de un dominio sin autorización.
- La personalización guarda layout, no duplica datos.
- Debe existir opción `Restaurar layout por defecto`.

---

# 10. COMPONENTES REACT REUTILIZABLES

## 10.1 Estructura propuesta

```text
src/
  features/
    dashboards/
      shell/
      registry/
      filters/
      widgets/
      charts/
      tables/
      maps/
      alerts/
      drilldown/
      exports/
      audit/
```

## 10.2 Componentes base

- `DashboardShell`
- `DashboardHeader`
- `DashboardSidebar`
- `DashboardSectionNav`
- `GlobalFilterBar`
- `DateTimeRangePicker`
- `PlantAreaStageFilter`
- `FurEntityFilter`
- `KpiCard`
- `KpiCardGroup`
- `TrendChart`
- `ParetoChart`
- `HeatmapMatrix`
- `StatusDonut`
- `EventTimeline`
- `AlarmTable`
- `EntityDataTable`
- `ProcessFlowMiniMap`
- `SingleLineDiagram`
- `GponTopology`
- `PlantMap`
- `MaintenanceGantt`
- `QualityControlChart`
- `CostWaterfall`
- `SCurveChart`
- `VideoWall`
- `DataQualityBadge`
- `MaturityBadge`
- `SourceTimestamp`
- `DrillDownDrawer`
- `EvidenceLink`
- `ExportMenu`
- `WidgetErrorBoundary`

## 10.3 Registro de widgets

Cada widget debe declararse por configuración:

```ts
interface DashboardWidgetDefinition {
  id: string;
  dashboardCode: string;
  title: string;
  type: string;
  requiredPermissions: string[];
  filters: string[];
  refreshMode: 'realtime' | 'polling' | 'manual';
  refreshIntervalSec?: number;
  dataSourceKey: string;
  qualityRequired?: 'D0'|'D1'|'D2'|'D3'|'D4'|'D5';
}
```

La definición es conceptual; el contrato definitivo debe versionarse en el repositorio del frontend.

---

# 11. CONTRATO DE DATOS DE DASHBOARD

## 11.1 Envelope mínimo

```json
{
  "dashboard_code": "FUR-DASH-GPL-001",
  "generated_at": "ISO-8601",
  "source_timestamp": "ISO-8601",
  "filters": {},
  "data_quality": {
    "condition": "Confirmed|Referential|TBC|HOLD|NoData",
    "maturity": "D0|D1|D2|D3|D4|D5"
  },
  "widgets": []
}
```

## 11.2 KPI mínimo

```json
{
  "kpi_code": "KPI-XXX",
  "name": "Disponibilidad",
  "value": 95.2,
  "unit": "%",
  "status": "normal",
  "period": {},
  "target": null,
  "delta": null,
  "source": "FUR-MNT",
  "source_ref": "...",
  "formula_version": "v1.0",
  "source_timestamp": "ISO-8601",
  "quality": "D4"
}
```

---

# 12. APIs PROPUESTAS PARA DASHBOARDS

```text
GET  /api/v1/dashboards
GET  /api/v1/dashboards/:code
GET  /api/v1/dashboards/:code/layout
GET  /api/v1/dashboards/:code/widgets
GET  /api/v1/dashboards/:code/widgets/:widgetId/data
GET  /api/v1/dashboards/:code/kpis
GET  /api/v1/dashboards/:code/events
GET  /api/v1/dashboards/:code/export
GET  /api/v1/dashboards/:code/definitions
POST /api/v1/dashboards/:code/preferences
POST /api/v1/dashboards/:code/export-jobs
```

Para realtime:

```text
WS/SSE /api/v1/realtime/dashboard/:code
```

No se debe conectar el navegador directamente a PLC, SCADA DB, Odoo DB o PostgreSQL.

---

# 13. FUENTES DE DATOS Y AUTORIDAD

| Dominio | Sistema de autoridad | Uso en dashboards |
|---|---|---|
| Identidad/relaciones FUR | PostgreSQL/FUR | Contexto, navegación, relaciones, calidad |
| Transacciones ERP | Odoo 19 | Compras, inventario, mantenimiento, partners, documentos según modelo |
| Series temporales | Historian/SCADA | Tendencias, estados y variables |
| Laboratorio | FUR-LAB/LIMS confirmado | Resultados, TAT, QA/QC |
| Muestras | FUR-CC | Trazabilidad física y custodia |
| Potencia | SCADA/IED/medidores + FUR-PTE | Demanda, calidad, eventos |
| GPON | NMS/OLT + FUR-GPON | Disponibilidad y óptica |
| CCTV | VMS/NVR + FUR-CAM | Salud, eventos, evidencia |
| Presupuesto | LULO/motor presupuesto + Odoo | Baseline, real, compromiso |

---

# 14. MODELO DE DATOS DE CONFIGURACIÓN DE DASHBOARDS

Tablas propias propuestas, sujetas a diseño físico definitivo:

- `fur_dashboard`
- `fur_dashboard_section`
- `fur_dashboard_widget`
- `fur_dashboard_role`
- `fur_dashboard_filter_definition`
- `fur_dashboard_kpi_definition`
- `fur_dashboard_kpi_formula_version`
- `fur_dashboard_data_source`
- `fur_dashboard_user_preference`
- `fur_dashboard_export_log`
- `fur_dashboard_alert_rule`

Campos comunes recomendados:

- UUID;
- código único;
- nombre;
- descripción;
- dominio;
- estado;
- propietario;
- roles autorizados;
- configuración JSONB controlada cuando corresponda;
- versión;
- fecha de vigencia;
- auditoría;
- condición/madurez del dato.

---

# 15. KPIs — REGLAS DE GOBIERNO

Cada KPI debe contar con ficha de definición:

- código;
- nombre;
- objetivo;
- fórmula;
- variables fuente;
- unidad;
- granularidad;
- timezone;
- regla de datos faltantes;
- regla de outliers;
- calidad mínima;
- propietario;
- aprobador;
- versión;
- fecha de vigencia;
- límites/targets;
- dashboard(s) donde aparece;
- enlaces a FUR/documentación.

Ejemplos estructurales ya usados en el proyecto:

- Disponibilidad = tiempo disponible / tiempo calendario × 100.
- Utilización = tiempo operando / tiempo disponible × 100.
- OEE = disponibilidad × rendimiento × calidad.
- Throughput = masa procesada / tiempo.
- Recuperación Au = Au producto / Au alimentación × 100.
- Consumo específico energía = kWh / t procesada.
- MTBF = horas operativas / número de fallas.
- MTTR = horas de reparación / número de reparaciones.
- TAT laboratorio = fecha/hora aprobación − recepción.
- Madurez D4+ = FUR D4/D5 / total FUR × 100.

Las fórmulas definitivas requieren aprobación de los propietarios del proceso.

---

# 16. FILTROS Y ESTADO EN URL

Ejemplo conceptual:

```text
/app/dashboards/procesos?plant=PB01&stage=D11&from=...&to=...&shift=A
```

Reglas:

- no exponer secretos/tokens;
- validar filtros en backend;
- ignorar filtros no autorizados;
- permitir links compartibles entre usuarios con permisos equivalentes;
- al abrir una FUR y regresar, conservar filtros.

---

# 17. EXPORTACIONES Y REPORTES

Formatos potenciales:

- PDF ejecutivo;
- XLSX/CSV de tablas autorizadas;
- PNG de visualizaciones;
- enlace persistente al dashboard con filtros;
- snapshot firmado/versionado cuando sea requerido.

Toda exportación sensible debe poder quedar auditada con usuario, fecha, dashboard, filtros y alcance.

---

# 18. SEGURIDAD

## 18.1 RBAC

El rol determina dashboards y acciones permitidas.

## 18.2 ABAC

Restricciones adicionales:

- planta;
- compañía;
- área;
- etapa;
- criticidad;
- propietario;
- clasificación documental;
- relación con partner/proveedor;
- tipo de dato OT.

## 18.3 Reglas críticas

- Proveedor solo ve su propia información.
- Visitante solo ve datos publicados.
- Operador no obtiene privilegios de administración.
- Dashboard no concede acceso a datos fuente que el usuario no pueda consultar.
- Exportaciones respetan los mismos permisos que la pantalla.

---

# 19. RENDIMIENTO Y REFRESCO

Tres modos:

1. **Realtime 5–30 s / WS-SSE:** operación, PTE, CCTV, algunos IoT.
2. **Near-real-time 30 s–5 min:** planta, procesos, GPON.
3. **Analítico 5–60 min:** laboratorio, calidad, mantenimiento, WMS, compras, costos, ingeniería, auditoría.

Reglas:

- cache por consulta y permisos;
- evitar N+1;
- agregaciones precomputadas para históricos largos;
- downsampling de series temporales;
- lazy loading de widgets fuera de viewport;
- abortar peticiones obsoletas al cambiar filtros;
- límites de puntos por gráfica.

---

# 20. ACCESIBILIDAD Y UX

- WCAG AA como objetivo de diseño;
- contraste adecuado;
- navegación por teclado;
- labels accesibles;
- foco visible;
- texto alternativo en imágenes relevantes;
- tablas con encabezados semánticos;
- no depender solo de color;
- soporte de zoom 200%;
- tooltips no exclusivos para información crítica.

---

# 21. ESTADOS DE CALIDAD DEL DATO EN UI

| Estado | Presentación | Acción |
|---|---|---|
| Confirmado D4/D5 | Verde + badge | Uso operacional/analítico autorizado |
| Referencial D1–D3 | Azul/ámbar + badge | Mostrar advertencia contextual |
| TBC | Ámbar | Enlace a pendiente/evidencia requerida |
| HOLD | Rojo/ámbar | Bloquear promoción/uso según regla |
| Sin dato | Gris | Explicar ausencia |
| Stale | Ámbar | Mostrar antigüedad y fuente |
| Error | Rojo | Mostrar retry y detalle técnico restringido |

---

# 22. TESTING

## 22.1 Unitario

- cálculo/formato KPI;
- filtros;
- permisos;
- transformación de datos;
- estados vacíos/error.

## 22.2 Integración

- React ↔ API;
- API ↔ FUR/Odoo/Historian;
- filtros cruzados;
- drill-down;
- exportación.

## 22.3 E2E

Flujos por rol:

- Director abre Ejecutivo → baja a etapa → abre FUR.
- Mantenimiento abre backlog → OT → repuesto → stock.
- Instrumentista abre instrumento offline → cadena digital → OT.
- Laboratorio abre muestra → corrida → resultado → certificado.
- Compras abre RQ → oferta → PO → recepción.
- Auditor abre KPI → fuente → historial de cambios.

## 22.4 Performance

- LCP/INP/CLS;
- tiempo de carga inicial;
- tiempo de refresco;
- volumen de puntos de series;
- concurrencia por perfil.

---

# 23. ROADMAP ESPECÍFICO DE DASHBOARDS

## Fase 0 — Gobierno

- validar 20 dashboards;
- propietarios;
- KPIs;
- permisos;
- fuentes;
- frecuencia.

## Fase 1 — Design System

- shell;
- cards;
- filtros;
- gráficas;
- tablas;
- estados;
- badges;
- responsive.

## Fase 2 — Framework React

- registry;
- router;
- permisos;
- filtros globales;
- widget engine;
- error boundaries;
- preferencias.

## Fase 3 — Dashboards base

1. Gerencia de Planta.
2. Procesos.
3. Mantenimiento.
4. Potencia.
5. IoT.

## Fase 4 — Redes y calidad

6. GPON.
7. Control de Calidad.
8. Laboratorio.
9. CCTV.
10. HSE.

## Fase 5 — Enterprise

11. WMS.
12. Compras.
13. Costos.
14. Ingeniería.
15. LMS.
16. Proveedor.

## Fase 6 — Gobierno y público

17. Ejecutivo.
18. Auditoría.
19. Público.
20. Mi Dashboard.

## Fase 7 — Optimización

- performance;
- caching;
- realtime;
- accesibilidad;
- pruebas de campo;
- UAT;
- promoción D4/D5.

---

# 24. HOLD / TBC PARA LOS DASHBOARDS

1. Confirmar lista final de dashboards y propietarios.
2. Confirmar KPIs oficiales y fórmulas aprobadas.
3. Confirmar límites/targets por KPI.
4. Confirmar disponibilidad real de datos por sistema fuente.
5. Confirmar modelo de autenticación/SSO.
6. Confirmar política de exportación.
7. Confirmar periodicidad de refresco de cada fuente.
8. Confirmar topología SCADA/Historian autorizada.
9. Confirmar NMS GPON y endpoints permitidos.
10. Confirmar VMS/CCTV y política de retención.
11. Confirmar modelo físico LULO.
12. Confirmar roles y ABAC finales.
13. Confirmar catálogos de planta/área/etapa.
14. Confirmar estrategia de caché.
15. Confirmar definición de información pública.
16. Confirmar requisitos regulatorios y de auditoría.
17. Confirmar políticas de ciberseguridad OT/IT.
18. Confirmar SLA de los dashboards.
19. Confirmar límites de históricos y downsampling.
20. Ejecutar FAT/SAT/UAT antes de producción.

---

# 25. CRITERIO DE CIERRE DEL DOCUMENTO

El módulo de dashboards se considerará técnicamente listo para construcción cuando exista, para cada dashboard:

- propietario;
- audiencia;
- sidebar/menu;
- ruta;
- KPIs aprobados;
- fuentes de autoridad;
- filtros;
- visualizaciones;
- alertas;
- acciones;
- permisos;
- drill-down;
- refresco;
- definición de estados UX;
- contratos API;
- criterios de aceptación;
- evidencia de pruebas.

El objetivo final es que **cada número mostrado en el Ecosistema FUR sea entendible, trazable, gobernado y navegable hasta su fuente y contexto técnico**.

---

# 26. CONTROL DE REVISIÓN

| Revisión | Fecha | Descripción |
|---|---|---|
| REV.00 | 2026-09-25 | Documento maestro exclusivo de dashboards: navegación, secciones, KPIs, fuentes, roles, UX/UI, React, APIs, seguridad y roadmap. |
