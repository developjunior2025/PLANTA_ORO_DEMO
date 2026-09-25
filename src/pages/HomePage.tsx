import { Link, useNavigate } from "react-router-dom";
import {
  Boxes,
  Cog,
  Users,
  Cpu,
  BarChart3,
  BookOpen,
  Award,
  ShoppingCart,
  Wrench,
  GraduationCap,
  FileText,
  Calculator,
  Handshake,
  HardHat,
  ArrowRight,
  MapPin,
  Gauge,
  AlertTriangle,
  ClipboardPlus,
  UploadCloud,
  LayoutDashboard,
} from "lucide-react";
import "./HomePage.css";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { DOMAIN_LIST } from "../shared/domains";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { StatCard } from "../components/ui/StatCard";
import { EntityCard } from "../components/ui/EntityCard";
import { fetchCatalog, fetchChartSeries, fetchDocuments, fetchFurList, fetchStock } from "../shared/api";
import { useAlerts } from "../shared/alerts";
import type { CatalogEntity } from "../shared/types";

interface ProductionPoint {
  hour: string;
  tonPerHour: number;
}

const PILLARS = [
  { label: "Activos", icon: Boxes },
  { label: "Procesos", icon: Cog },
  { label: "Personas", icon: Users },
  { label: "Tecnología", icon: Cpu },
  { label: "Datos", icon: BarChart3 },
  { label: "Conocimiento", icon: BookOpen },
  { label: "Resultados", icon: Award },
];

type CountKey = "activos" | "procesos" | "pte" | "iot" | "gpon" | "lab" | "mnt" | "stock" | "presupuestos" | "proveedores" | "cursos" | "documentos";

const QUICK_ACCESS: { icon: typeof Boxes; label: string; key: CountKey; unit: string; to: string }[] = [
  { icon: Boxes, label: "Activos Físicos", key: "activos", unit: "fichas", to: "/app/activos" },
  { icon: Cog, label: "Procesos Metalúrgicos", key: "procesos", unit: "fichas", to: "/app/procesos" },
  { icon: Gauge, label: "Potencia Eléctrica", key: "pte", unit: "fichas", to: "/app/redes/pte" },
  { icon: Cpu, label: "IoT / Automatización", key: "iot", unit: "fichas", to: "/app/redes/iot" },
  { icon: Handshake, label: "GPON / Comunicaciones", key: "gpon", unit: "fichas", to: "/app/redes/gpon" },
  { icon: BarChart3, label: "Laboratorios / QA-QC", key: "lab", unit: "fichas", to: "/app/laboratorio" },
  { icon: Wrench, label: "Mantenimiento", key: "mnt", unit: "fichas", to: "/app/mantenimiento" },
  { icon: ShoppingCart, label: "WMS / Inventarios", key: "stock", unit: "SKU", to: "/app/inventario" },
  { icon: Calculator, label: "Presupuestos LULO", key: "presupuestos", unit: "proyecto", to: "/app/presupuestos" },
  { icon: Users, label: "Proveedores", key: "proveedores", unit: "empresas", to: "/app/proveedores" },
  { icon: GraduationCap, label: "Cursos (LMS)", key: "cursos", unit: "cursos", to: "/app/cursos" },
  { icon: FileText, label: "Documentos", key: "documentos", unit: "archivos", to: "/app/documentos" },
];

const SERVICES = [
  { icon: ShoppingCart, title: "Comprar Productos", desc: "Repuestos, equipos y consumibles", to: "/app/marketplace" },
  { icon: HardHat, title: "Contratar Servicios", desc: "Ingeniería, mantenimiento, consultoría", to: "/app/profesionales" },
  { icon: BookOpen, title: "Capacitarse (LMS)", desc: "Cursos técnicos y especializados", to: "/app/cursos" },
  { icon: Boxes, title: "Gestionar Activos (WMS)", desc: "Inventarios y almacenes", to: "/app/inventario" },
  { icon: Calculator, title: "Calcular Presupuestos", desc: "Motor LULO", to: "/app/presupuestos" },
  { icon: FileText, title: "Consultar Documentos", desc: "Manuales, planos, SOP", to: "/app/documentos" },
];

export function HomePage() {
  const [offers, setOffers] = useState<CatalogEntity[] | null>(null);
  const [trend, setTrend] = useState<ProductionPoint[] | null>(null);
  const [counts, setCounts] = useState<Record<CountKey, number> | null>(null);
  const [search, setSearch] = useState("");
  const alerts = useAlerts();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    fetchChartSeries<ProductionPoint[]>("production_trend_24h").then((t) => active && setTrend(t));
    Promise.all([fetchCatalog(), fetchFurList(), fetchStock(), fetchDocuments()]).then(([catalog, fur, stock, docs]) => {
      if (!active) return;
      setOffers(catalog.slice(0, 4));
      const byDomain = (d: string) => fur.filter((r) => r.domain === d).length;
      const byType = (t: string) => catalog.filter((c) => c.entityType === t).length;
      setCounts({
        activos: fur.filter((r) => ["PTE", "IOT", "GPON", "MNT", "CAM"].includes(r.domain)).length,
        procesos: byDomain("PROC"),
        pte: byDomain("PTE"),
        iot: byDomain("IOT"),
        gpon: byDomain("GPON"),
        lab: byDomain("CC") + byDomain("LAB"),
        mnt: byDomain("MNT"),
        stock: stock.length,
        presupuestos: 1,
        proveedores: byType("Proveedor"),
        cursos: byType("Curso (LMS)"),
        documentos: docs.length,
      });
    });
    return () => {
      active = false;
    };
  }, []);

  function goSearch(q: string) {
    navigate(q.trim() ? `/app/catalogo?q=${encodeURIComponent(q.trim())}` : "/app/catalogo");
  }

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero__copy">
          <h1>
            UNA PLANTA CONECTADA,
            <br />
            <span>UN FUTURO MÁS PRODUCTIVO</span>
          </h1>
          <p>
            Marketplace industrial, gestión de activos, conocimiento y datos en un solo
            ecosistema para la planta de beneficio de oro.
          </p>
          <div className="home-hero__pillars">
            {PILLARS.map(({ label, icon: Icon }) => (
              <span key={label} className="home-hero__pill">
                <Icon size={14} /> {label}
              </span>
            ))}
          </div>
          <div className="home-hero__cta">
            <Link to="/app/activos" className="btn btn--gold">
              Explorar Activos
            </Link>
            <Link to="/app/catalogo" className="btn btn--outline">
              Conocer el Ecosistema
            </Link>
          </div>
        </div>

        <div className="home-hero__status">
          <div className="home-hero__status-head">
            <div>
              <strong>Planta REVMIN II</strong>
              <span>Estado Operativo General</span>
            </div>
            <span className="badge badge--success">
              <span className="badge__dot" /> Operativa
            </span>
          </div>
          <div className="home-hero__status-grid">
            <div>
              <span className="home-hero__status-value">95.2%</span>
              <span className="home-hero__status-label">Disponibilidad</span>
            </div>
            <div>
              <span className="home-hero__status-value">3,450 t/d</span>
              <span className="home-hero__status-label">Producción</span>
            </div>
            <div>
              <span className="home-hero__status-value">{counts ? counts.activos + counts.procesos : "…"}</span>
              <span className="home-hero__status-label">Activos</span>
            </div>
            <div>
              <span className="home-hero__status-value" style={{ color: "var(--color-warning)" }}>
                {alerts ? alerts.length : "…"}
              </span>
              <span className="home-hero__status-label">Alarmas</span>
            </div>
          </div>
          <Link to="/app/dashboards" className="home-hero__status-link">
            Ver dashboard en tiempo real <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <section className="home-quickaccess">
        {QUICK_ACCESS.map((q) => (
          <Link to={q.to} key={q.label} className="quickaccess-item">
            <q.icon size={22} />
            <span className="quickaccess-item__label">{q.label}</span>
            <span className="quickaccess-item__value">{counts ? `${counts[q.key]} ${q.unit}` : "…"}</span>
          </Link>
        ))}
      </section>

      <section className="home-search-row">
        <div className="panel home-search-panel">
          <h2>Buscar en todo el ecosistema</h2>
          <form
            className="home-search-panel__box"
            onSubmit={(e) => {
              e.preventDefault();
              goSearch(search);
            }}
          >
            <input
              placeholder="Buscar activos, procesos, proveedores, repuestos, cursos…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn--gold">
              Buscar
            </button>
          </form>
          <div className="home-search-panel__popular">
            <span>Búsquedas populares:</span>
            {["Molino de bolas", "Bomba de pulpa", "Carbón activado", "Sensor de nivel", "PMSM", "NaCN", "Manual", "Curso"].map(
              (t) => (
                <button key={t} type="button" className="chip-btn" onClick={() => goSearch(t)}>
                  {t}
                </button>
              )
            )}
          </div>

          <h3>Filtros por Red Transversal</h3>
          <div className="home-networks-grid">
            {DOMAIN_LIST.map((d) => (
              <Link
                to={`/app/redes/${d.code.toLowerCase()}`}
                key={d.code}
                className="home-network-chip"
                style={{ ["--net-color" as string]: d.color }}
              >
                <NetworkIcon domain={d.code} size={18} color={d.color} />
                <span>{d.shortLabel.replace("FUR-", "")}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="panel home-realtime-panel">
          <div className="home-realtime-panel__head">
            <h2>Dashboards en Tiempo Real</h2>
            <Link to="/app/dashboards">Ver todos los dashboards</Link>
          </div>
          <div className="home-realtime-panel__stats">
            <StatCard icon={LayoutDashboard} label="Producción actual" value="3,450 t/d" trend="+5.2%" tone="success" />
            <StatCard icon={Gauge} label="Disponibilidad planta" value="95.2%" />
            <StatCard icon={AlertTriangle} label="Alarmas activas" value="12" tone="warning" trend="+3" />
          </div>
          <span className="home-realtime-panel__chart-label">Tendencia de producción (últimas 24 h)</span>
          {trend ? (
            <ResponsiveContainer width="100%" height={90}>
              <AreaChart data={trend} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="homeGoldFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f5a623" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#f5a623" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => [`${v} t/h`, "Producción"]} contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="tonPerHour" stroke="#f5a623" strokeWidth={2} fill="url(#homeGoldFade)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="skeleton-block" style={{ height: 90 }} aria-busy="true" />
          )}
        </div>
      </section>

      <section className="home-services">
        <div className="home-section-head">
          <h2>Servicios del Ecosistema</h2>
          <Link to="/app/catalogo">Ver todos los servicios</Link>
        </div>
        <div className="home-services__grid">
          {SERVICES.map((s) => (
            <Link to={s.to} key={s.title} className="home-service-card">
              <span className="home-service-card__icon">
                <s.icon size={20} />
              </span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-offers">
        <div className="home-section-head">
          <h2>Ofertas Destacadas del Marketplace</h2>
          <Link to="/app/catalogo">Ver más en Marketplace</Link>
        </div>
        <div className="home-offers__grid" aria-busy={!offers}>
          {offers
            ? offers.map((e) => <EntityCard entity={e} key={e.furCode} />)
            : Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="home-offers__skeleton-card skeleton-block" />
              ))}
        </div>
      </section>

      <section className="home-quickactions">
        <Link to="/app/mantenimiento" className="home-quickaction">
          <ClipboardPlus size={18} /> Crear Orden de Trabajo
        </Link>
        <Link to="/app/fur/nuevo?domain=RQ" className="home-quickaction">
          <FileText size={18} /> Solicitar Cotización (RFQ)
        </Link>
        <Link to="/app/documentos" className="home-quickaction">
          <UploadCloud size={18} /> Subir Documento
        </Link>
        <Link to="/app/fur/nuevo" className="home-quickaction">
          <Boxes size={18} /> Registrar Activo FUR
        </Link>
        <Link to="/app/mapas" className="home-quickaction">
          <MapPin size={18} /> Ir al Mapa de Planta
        </Link>
      </section>
    </div>
  );
}
