# FUR — Ecosistema Digital · Planta de Beneficio de Oro

Prototipo funcional del ecosistema descrito en `public/ORO/`: React + TypeScript
en el frontend, NestJS + Prisma + PostgreSQL en el backend (`server/`). Los
datos son de ejemplo (mismos que el prototipo original), pero la arquitectura
es real: base de datos real, servidor real, llamadas HTTP reales — nada vive
ya en arrays del navegador.

## Requisitos

- Node.js 20+
- Docker Desktop (para PostgreSQL)

## Arrancar todo desde cero

```bash
# 1. Base de datos real (PostgreSQL en Docker)
docker compose up -d

# 2. Backend (NestJS + Prisma)
cd server
npm install
cp .env.example .env      # (Windows: copy .env.example .env)
npx prisma migrate dev   # crea las tablas
npm run seed              # carga los datos de ejemplo
npm run dev                # http://localhost:3000

# 3. Frontend (en otra terminal, desde la raíz del repo)
npm install
npm run dev                # http://localhost:5173
```

Con ambos corriendo, `http://localhost:5173` consume datos reales de
`http://localhost:3000/api/v1/...`, que a su vez lee/escribe en PostgreSQL
(`localhost:55432`, ver `docker-compose.yml`).

## Qué incluye

- Catálogo, fichas FUR con **CRUD real** (crear, editar estado/madurez/HOLD) e historial de auditoría.
- Inventario con movimientos de stock, presupuestos, documentos, mapa, favoritos y alertas calculadas.
- **20 dashboards** según `public/ORO/DOCUMENTO_MAESTRO_DASHBOARDS_*.md`: sidebar contextual por dashboard,
  filtros globales en la URL, tarjetas KPI con ficha de definición, exportación CSV auditada y cabecera con
  conectividad/calidad del dato. Cada KPI indica su procedencia: **Real** (calculado en PostgreSQL),
  **Ejemplo** (fuente no conectada) o **Sin fuente**.
- Selector de rol (simulación de demo: no hay login real todavía).

## Estructura

```
/                 frontend (Vite + React + TS)
  src/shared/api.ts      capa de fetch hacia el backend
  src/pages/              páginas de la app
server/            backend (NestJS + Prisma)
  prisma/schema.prisma    modelo de datos real en PostgreSQL
  prisma/seed.ts          carga de datos de ejemplo
  src/*/                  un módulo Nest por recurso (fur, catalog, inventory, budget, documents, charts, kpis, dashboards, audit)
docker-compose.yml PostgreSQL real para desarrollo local
```

## Comandos útiles

Frontend (raíz del repo):

- `npm run dev` — servidor de desarrollo
- `npm run test` — pruebas unitarias (Vitest)
- `npm run build` — build de producción

Backend (`server/`):

- `npm run dev` — servidor Nest con recarga en caliente
- `npm run seed` — vuelve a cargar los datos de ejemplo (upsert, no duplica)
- `npx prisma studio` — explorador visual de la base de datos real

## Qué es real y qué no

- **Real:** el servidor NestJS, la base PostgreSQL, las tablas, las
  consultas Prisma, las llamadas HTTP del frontend, los cálculos (motor
  presupuestario, checklist de validación, filtros).
- **Imágenes:** las fichas usan placeholders locales (`public/placeholders/`); no hay fotografías reales de activos.
- **De ejemplo, no de tu planta real:** el contenido de los datos (activos,
  proveedores, KPIs, presupuesto). Conectar esto a Odoo 19, SCADA/Historian o
  cualquier sistema real de la planta es trabajo aparte, pendiente de acceso
  a esa infraestructura (ver `public/ORO/*.md`, sección de HOLD/TBC).
