import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Area,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./widgets.css";
import "../components/dashboard/CategoryCharts.css";
import {
  fetchChartSeries,
  fetchDashboardEvents,
  fetchDashboardTable,
  fetchDocuments,
  fetchStock,
  type AuditEvent,
  type DashboardFilters,
  type DashboardKpis,
  type DashboardRow,
  type LibraryDocument,
} from "../shared/api";
import { StatusBadge, MaturityBadge } from "../components/ui/Badges";
import type { StockItem } from "../shared/wmsData";
import { resolvePath, type Provenance, type WidgetSpec } from "./spec";
import { PROV_LABEL } from "./kpiReading";
import { filtersKey } from "./filters";

const tooltipStyle = { fontSize: 12, borderRadius: 8, border: "1px solid #e2e6ec" };

function useSeries<T>(key: string) {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    let active = true;
    fetchChartSeries<T>(key)
      .then((d) => active && setData(d))
      .catch(() => active && setData(null));
    return () => {
      active = false;
    };
  }, [key]);
  return data;
}

function Card({ title, prov, children }: { title: string; prov: Provenance; children: React.ReactNode }) {
  return (
    <section className="dash-widget">
      <header>
        <h4>{title}</h4>
        <span className={`kpi-tile__prov kpi-tile__prov--${prov}`}>{PROV_LABEL[prov]}</span>
      </header>
      {children}
    </section>
  );
}

const Loading = () => <div className="skeleton-block" style={{ height: 200 }} aria-busy="true" />;

type Row = Record<string, string | number | null>;

function ChartWidget({ w }: { w: Extract<WidgetSpec, { kind: "chart" }> }) {
  const data = useSeries<Row[]>(w.series);
  const hasRight = w.ys.some((y) => y.axis === "right");
  return (
    <Card title={w.title} prov="ejemplo">
      {!data ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="100%" height={230}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef1f5" />
            <XAxis dataKey={w.x} tick={{ fontSize: 10 }} interval={0} angle={data.length > 8 ? -15 : 0} textAnchor={data.length > 8 ? "end" : "middle"} height={data.length > 8 ? 50 : 30} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} width={44} />
            {hasRight && <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} width={40} />}
            <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}${w.unit ?? ""}`} />
            {w.ys.map((y) => {
              const axis = y.axis ?? "left";
              if (y.type === "bar" || !y.type) return <Bar key={y.key} yAxisId={axis} dataKey={y.key} name={y.name} fill={y.color} radius={[4, 4, 0, 0]} />;
              if (y.type === "area") return <Area key={y.key} yAxisId={axis} type="monotone" dataKey={y.key} name={y.name} stroke={y.color} fill={y.color} fillOpacity={0.18} strokeWidth={2} />;
              return <Line key={y.key} yAxisId={axis} type="monotone" dataKey={y.key} name={y.name} stroke={y.color} strokeWidth={2} dot={{ r: 3 }} connectNulls />;
            })}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

function HBars({ title, prov, data }: { title: string; prov: Provenance; data: { label: string; value: number; color?: string }[] | null }) {
  return (
    <Card title={title} prov={prov}>
      {!data ? (
        <Loading />
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(160, data.length * 44 + 40)}>
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 16 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef1f5" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis type="category" dataKey="label" tick={{ fontSize: 11 }} width={130} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="value" name="Valor" radius={[0, 4, 4, 0]}>
              {data.map((d, i) => (
                <Cell key={i} fill={d.color ?? "#123063"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

function SeriesHBars({ w }: { w: Extract<WidgetSpec, { kind: "hbars" }> }) {
  const data = useSeries<{ label?: string; status?: string; value?: number; count?: number; color?: string }[]>(w.series);
  const norm = data?.map((d) => ({ label: d.label ?? d.status ?? "", value: d.value ?? d.count ?? 0, color: d.color }));
  return <HBars title={w.title} prov="ejemplo" data={norm ?? null} />;
}

function KpiBars({ w, kpis }: { w: Extract<WidgetSpec, { kind: "kpiBars" }>; kpis: DashboardKpis | null }) {
  const data = kpis
    ? w.items.map((i) => ({ label: i.label, value: Number(resolvePath(kpis, i.path) ?? 0), color: i.color }))
    : null;
  return <HBars title={w.title} prov="real" data={data} />;
}

function Matrix({ w }: { w: Extract<WidgetSpec, { kind: "matrix" }> }) {
  const data = useSeries<{ label: string; status: "ok" | "warn" | "fail" }[]>(w.series);
  return (
    <Card title={w.title} prov="ejemplo">
      {!data ? (
        <Loading />
      ) : (
        <div className="health-matrix">
          {data.map((d) => (
            <div key={d.label} className={`health-matrix__cell health-matrix__cell--${d.status}`} title={d.status}>
              <strong>{d.label}</strong>
              <span>{d.status === "ok" ? "OK" : d.status === "warn" ? "Alerta" : "Falla"}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

interface Ctx {
  slug: string;
  kpis: DashboardKpis | null;
  filters: DashboardFilters;
}

function useTable(ctx: Ctx, domains: string[], preset?: Record<string, string>) {
  const [rows, setRows] = useState<DashboardRow[] | null>(null);
  const [failed, setFailed] = useState(false);
  const key = filtersKey(ctx.filters) + domains.join(",") + JSON.stringify(preset ?? {});
  useEffect(() => {
    const ac = new AbortController();
    const f: DashboardFilters = { ...preset, ...ctx.filters };
    if (!f.domain && domains.length) f.domain = domains.join(",");
    fetchDashboardTable(ctx.slug, f, ac.signal)
      .then(setRows)
      .catch((e) => e.name !== "AbortError" && setFailed(true));
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.slug, key]);
  return { rows, failed };
}

const NoRows = () => (
  <p className="dash-empty">Ninguna ficha FUR cumple los filtros activos. Quita algún filtro para ver más resultados.</p>
);

function Records({ w, ctx }: { w: Extract<WidgetSpec, { kind: "records" }>; ctx: Ctx }) {
  const { rows, failed } = useTable(ctx, w.domains, w.preset);
  return (
    <Card title={w.title} prov="real">
      {failed ? (
        <p className="dash-empty">No se pudo consultar el backend.</p>
      ) : !rows ? (
        <Loading />
      ) : rows.length === 0 ? (
        <NoRows />
      ) : (
        <table className="fur-table">
          <thead>
            <tr>
              <th>Ficha FUR</th>
              <th>Estado</th>
              <th>Criticidad</th>
              <th>Madurez</th>
              <th>Condición</th>
              <th>Calidad</th>
              <th>HOLD/TBC</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.furCode}>
                <td>
                  <Link to={`/app/fur/${r.furCode}`} className="fur-table__link">
                    {r.name}
                  </Link>
                  <div className="dash-sub">
                    {r.furCode} · {r.area} · {r.zone}
                  </div>
                </td>
                <td><StatusBadge status={r.status as never} /></td>
                <td>{r.criticality}</td>
                <td><MaturityBadge maturity={r.maturity as never} /></td>
                <td>{r.condition}</td>
                <td>{r.dataQualityPercent}%</td>
                <td>{r.holds.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function HoldsPanel({ title, ctx }: { title: string; ctx: Ctx }) {
  const { rows, failed } = useTable(ctx, []);
  const withHolds = rows?.filter((r) => r.holds.length > 0) ?? [];
  return (
    <Card title={title} prov="real">
      {failed ? (
        <p className="dash-empty">No se pudo consultar el backend.</p>
      ) : !rows ? (
        <Loading />
      ) : withHolds.length === 0 ? (
        <p className="dash-empty">Ninguna ficha del alcance actual tiene TBC/HOLD abiertos.</p>
      ) : (
        <table className="fur-table">
          <thead>
            <tr>
              <th>Ficha FUR</th>
              <th>Nivel</th>
              <th>Pendiente / evidencia requerida</th>
            </tr>
          </thead>
          <tbody>
            {withHolds.flatMap((r) =>
              r.holds.map((h, i) => (
                <tr key={`${r.furCode}-${i}`}>
                  <td>
                    <Link to={`/app/fur/${r.furCode}`} className="fur-table__link">
                      {r.furCode}
                    </Link>
                    <div className="dash-sub">{r.name}</div>
                  </td>
                  <td>{h.level}</td>
                  <td>{h.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function AuditFeed({ title, type, ctx }: { title: string; type?: string; ctx: Ctx }) {
  const [events, setEvents] = useState<AuditEvent[] | null>(null);
  const key = filtersKey({ from: ctx.filters.from, to: ctx.filters.to }) + (type ?? "");
  useEffect(() => {
    const ac = new AbortController();
    fetchDashboardEvents(ctx.slug, { from: ctx.filters.from, to: ctx.filters.to }, 100, ac.signal)
      .then((e) => setEvents(type ? e.filter((x) => x.eventType === type) : e))
      .catch(() => {});
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.slug, key]);
  return (
    <Card title={title} prov="real">
      {!events ? (
        <Loading />
      ) : events.length === 0 ? (
        <p className="dash-empty">
          No hay eventos{ctx.filters.from || ctx.filters.to ? " en el rango elegido" : " todavía"}. Edita una ficha FUR, registra
          un movimiento de inventario o exporta un dashboard y aparecerá aquí.
        </p>
      ) : (
        <ul className="fur-timeline">
          {events.slice(0, 12).map((e) => (
            <li key={e.id}>
              <span className="fur-timeline__dot" />
              <div>
                <strong>{e.eventType} · {e.subjectCode}</strong>
                <span>{new Date(e.createdAt).toLocaleString("es")} · {e.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function MaturityPanel({ title, kpis }: { title: string; kpis: DashboardKpis | null }) {
  const data = kpis
    ? ["D0", "D1", "D2", "D3", "D4", "D5"].map((d) => ({
        label: d,
        value: Number(resolvePath(kpis, `fur.byMaturity.${d}`) ?? 0),
        color: d === "D4" || d === "D5" ? "#1f9d55" : "#123063",
      }))
    : null;
  return <HBars title={title} prov="real" data={data} />;
}

function DocsPanel({ title }: { title: string }) {
  const [docs, setDocs] = useState<LibraryDocument[] | null>(null);
  useEffect(() => {
    let active = true;
    fetchDocuments()
      .then((d) => active && setDocs(d))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return (
    <Card title={title} prov="real">
      {!docs ? (
        <Loading />
      ) : docs.length === 0 ? (
        <p className="dash-empty">No hay documentos vinculados a fichas FUR.</p>
      ) : (
        <table className="fur-table">
          <thead>
            <tr>
              <th>Documento</th>
              <th>Tipo</th>
              <th>Versión</th>
              <th>Estado</th>
              <th>FUR</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((d) => (
              <tr key={`${d.furCode}-${d.name}`}>
                <td>{d.name}</td>
                <td>{d.type}</td>
                <td>{d.version}</td>
                <td>{d.status}</td>
                <td>
                  <Link to={`/app/fur/${d.furCode}`} className="fur-table__link">
                    {d.furCode}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

function Gantt({ title }: { title: string }) {
  const data = useSeries<{ code: string; title: string; startOffsetPct: number; durationPct: number; status: string }[]>("upcoming_work_orders");
  const cls = (s: string) => (s === "Retrasada" ? "late" : s === "En ejecución" ? "active" : "planned");
  return (
    <Card title={title} prov="ejemplo">
      {!data ? (
        <Loading />
      ) : (
        <div className="wo-timeline">
          {data.map((wo) => (
            <div className="wo-timeline__row" key={wo.code}>
              <div className="wo-timeline__label">
                <strong>{wo.code}</strong>
                <span>{wo.title}</span>
              </div>
              <div className="wo-timeline__track">
                <div className={`wo-timeline__bar wo-timeline__bar--${cls(wo.status)}`} style={{ marginLeft: `${wo.startOffsetPct}%`, width: `${wo.durationPct}%` }} />
              </div>
              <span className={`wo-timeline__status wo-timeline__status--${cls(wo.status)}`}>{wo.status}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function StockWidget({ title }: { title: string }) {
  const [rows, setRows] = useState<StockItem[] | null>(null);
  useEffect(() => {
    let active = true;
    fetchStock().then((r) => active && setRows(r));
    return () => {
      active = false;
    };
  }, []);
  const low = rows?.filter((r) => r.qty < r.reorderPoint) ?? [];
  return (
    <Card title={title} prov="real">
      {!rows ? (
        <Loading />
      ) : low.length === 0 ? (
        <p className="dash-empty">Ningún ítem bajo su punto de reorden.</p>
      ) : (
        <table className="fur-table">
          <thead>
            <tr>
              <th>Ítem</th>
              <th>Stock</th>
              <th>Reorden</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {low.map((r) => (
              <tr key={r.sku}>
                <td>
                  <Link to="/app/inventario" className="fur-table__link">{r.name}</Link>
                  <div className="dash-sub">{r.sku}</div>
                </td>
                <td className="inventory__qty--low">{r.qty} {r.uom}</td>
                <td>{r.reorderPoint} {r.uom}</td>
                <td>{r.warehouse} · {r.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

export function Widget({ w, ctx }: { w: WidgetSpec; ctx: Ctx }) {
  // key: al cambiar los filtros el widget se remonta y vuelve a pedir sus datos.
  const k = filtersKey(ctx.filters);
  switch (w.kind) {
    case "chart":
      return <ChartWidget w={w} />;
    case "hbars":
      return <SeriesHBars w={w} />;
    case "kpiBars":
      return <KpiBars w={w} kpis={ctx.kpis} />;
    case "matrix":
      return <Matrix w={w} />;
    case "records":
      return <Records key={k} w={w} ctx={ctx} />;
    case "holds":
      return <HoldsPanel key={k} title={w.title} ctx={ctx} />;
    case "audit":
      return <AuditFeed key={k} title={w.title} type={w.type} ctx={ctx} />;
    case "maturity":
      return <MaturityPanel title={w.title} kpis={ctx.kpis} />;
    case "docs":
      return <DocsPanel title={w.title} />;
    case "gantt":
      return <Gantt title={w.title} />;
    case "stock":
      return <StockWidget title={w.title} />;
  }
}

export type { Ctx as WidgetCtx };
