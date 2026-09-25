import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { FurListPage } from "./pages/FurListPage";
import { EntityListPage } from "./pages/EntityListPage";
import { useCurrentRole } from "./shared/sessionStore";
import { dashboardPath } from "./dashboards/spec";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const CatalogPage = lazy(() => import("./pages/CatalogPage").then((m) => ({ default: m.CatalogPage })));
const FurDetailPage = lazy(() => import("./pages/FurDetailPage").then((m) => ({ default: m.FurDetailPage })));
const NetworksIndexPage = lazy(() => import("./pages/NetworksIndexPage").then((m) => ({ default: m.NetworksIndexPage })));
const NetworkDetailPage = lazy(() => import("./pages/NetworkDetailPage").then((m) => ({ default: m.NetworkDetailPage })));
const DashboardViewPage = lazy(() => import("./pages/DashboardViewPage").then((m) => ({ default: m.DashboardViewPage })));
const DashboardsIndexPage = lazy(() => import("./pages/DashboardsIndexPage").then((m) => ({ default: m.DashboardsIndexPage })));
const DashboardsLayout = lazy(() => import("./dashboards/DashboardsLayout").then((m) => ({ default: m.DashboardsLayout })));
const InventoryPage = lazy(() => import("./pages/InventoryPage").then((m) => ({ default: m.InventoryPage })));
const BudgetPage = lazy(() => import("./pages/BudgetPage").then((m) => ({ default: m.BudgetPage })));
const DocumentsPage = lazy(() => import("./pages/DocumentsPage").then((m) => ({ default: m.DocumentsPage })));
const MapPage = lazy(() => import("./pages/MapPage").then((m) => ({ default: m.MapPage })));
const AdminPage = lazy(() => import("./pages/AdminPage").then((m) => ({ default: m.AdminPage })));
const EntityDetailPage = lazy(() => import("./pages/EntityDetailPage").then((m) => ({ default: m.EntityDetailPage })));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage").then((m) => ({ default: m.FavoritesPage })));
const AlertsPage = lazy(() => import("./pages/AlertsPage").then((m) => ({ default: m.AlertsPage })));
const SystemStatusPage = lazy(() => import("./pages/InfoPages").then((m) => ({ default: m.SystemStatusPage })));
const ApiDocsPage = lazy(() => import("./pages/InfoPages").then((m) => ({ default: m.ApiDocsPage })));
const TextPage = lazy(() => import("./pages/InfoPages").then((m) => ({ default: m.TextPage })));
const CreateFurPage = lazy(() => import("./pages/CreateFurPage").then((m) => ({ default: m.CreateFurPage })));

/** /app/dashboard → dashboard inicial del rol activo (megadocumento §64.2). */
function DashboardRedirect() {
  const role = useCurrentRole();
  return <Navigate to={dashboardPath(role.dashboardSlug)} replace />;
}

function RouteFallback() {
  return <div className="skeleton-block" style={{ height: 320, margin: 24 }} aria-busy="true" />;
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/app/inicio" replace />} />
          <Route path="/planta" element={<AppShell />}>
            <Route path="tiempo-real" element={<DashboardsLayout />}>
              <Route index element={<DashboardViewPage fixedSlug="tiempo-real" />} />
            </Route>
          </Route>
          <Route path="/app" element={<AppShell />}>
            <Route path="inicio" element={<HomePage />} />
            <Route path="catalogo" element={<CatalogPage />} />
            <Route path="favoritos" element={<FavoritesPage />} />
            <Route path="alertas" element={<AlertsPage />} />
            <Route path="sistema" element={<SystemStatusPage />} />
            <Route path="api" element={<ApiDocsPage />} />
            <Route path="terminos" element={<TextPage slug="terminos" />} />
            <Route path="privacidad" element={<TextPage slug="privacidad" />} />
            <Route path="soporte" element={<TextPage slug="soporte" />} />
            <Route path="entidad/:furCode" element={<EntityDetailPage />} />
            <Route path="fur/nuevo" element={<CreateFurPage />} />
            <Route path="fur/:furCode" element={<FurDetailPage />} />
            <Route path="redes" element={<NetworksIndexPage />} />
            <Route path="redes/:domain" element={<NetworkDetailPage />} />
            <Route
              path="activos"
              element={
                <FurListPage
                  title="Activos Físicos"
                  description="Equipos e instalaciones físicas de la planta: potencia eléctrica, IoT/instrumentación, comunicaciones, mantenimiento y seguridad."
                  domains={["PTE", "IOT", "GPON", "MNT", "CAM"]}
                />
              }
            />
            <Route
              path="procesos"
              element={
                <FurListPage
                  title="Procesos"
                  description="Etapas, subprocesos y activos de proceso de la cadena metalúrgica."
                  domains={["PROC"]}
                />
              }
            />
            <Route
              path="mantenimiento"
              element={
                <FurListPage
                  title="Mantenimiento"
                  description="Estrategias, planes, órdenes de trabajo y condición de los activos mantenibles."
                  domains={["MNT"]}
                />
              }
            />
            <Route path="inventario" element={<InventoryPage />} />
            <Route
              path="laboratorio"
              element={
                <FurListPage
                  title="Laboratorio y Control de Calidad"
                  description="Muestras físicas, cadena de custodia y análisis / resultados QA-QC."
                  domains={["CC", "LAB"]}
                />
              }
            />
            <Route
              path="requisiciones"
              element={
                <FurListPage
                  title="Requisiciones y Ofertas"
                  description="Necesidades internas, aprobaciones y ofertas comerciales de proveedores."
                  domains={["RQ", "OF"]}
                />
              }
            />
            <Route path="presupuestos" element={<BudgetPage />} />
            <Route path="documentos" element={<DocumentsPage />} />
            <Route path="dashboard" element={<DashboardRedirect />} />
            <Route path="dashboards" element={<DashboardsLayout />}>
              <Route index element={<DashboardsIndexPage />} />
              <Route path=":slug" element={<DashboardViewPage />} />
            </Route>
            <Route path="mapas" element={<MapPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route
              path="marketplace"
              element={
                <EntityListPage
                  title="Marketplace Industrial"
                  description="Productos y servicios comerciales del ecosistema, separados del catálogo técnico interno."
                  entityTypes={["Servicio", "Activos Físicos"]}
                />
              }
            />
            <Route
              path="proveedores"
              element={
                <EntityListPage
                  title="Proveedores"
                  description="Directorio de proveedores certificados: identidad, productos, certificaciones y evaluación."
                  entityTypes={["Proveedor"]}
                />
              }
            />
            <Route
              path="profesionales"
              element={
                <EntityListPage
                  title="Servicios Profesionales"
                  description="Perfiles, especialidades y disponibilidad de profesionales del ecosistema."
                  entityTypes={["Personas"]}
                />
              }
            />
            <Route
              path="cursos"
              element={
                <EntityListPage
                  title="Cursos (LMS)"
                  description="Catálogo de cursos, rutas de aprendizaje y certificaciones vinculadas a activos/procesos/redes."
                  entityTypes={["Curso (LMS)"]}
                />
              }
            />
            <Route
              path="conocimiento"
              element={
                <EntityListPage
                  title="Biblioteca de Conocimiento"
                  description="Manuales, SOP, planos, datasheets y otros documentos técnicos públicos."
                  entityTypes={["Documento"]}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/app/inicio" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
