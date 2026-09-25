import { useEffect, useState } from "react";
import { fetchChartSeries, fetchFurList, fetchStock } from "./api";

export interface AppAlert {
  id: string;
  severity: "alta" | "media";
  title: string;
  detail: string;
  to: string;
}

interface WorkOrder {
  code: string;
  title: string;
  status: string;
}

/** Alertas calculadas con datos reales de la base: stock bajo reorden, fichas con HOLD y OT retrasadas. */
async function computeAlerts(): Promise<AppAlert[]> {
  const [stock, fur, orders] = await Promise.all([
    fetchStock(),
    fetchFurList(),
    fetchChartSeries<WorkOrder[]>("upcoming_work_orders"),
  ]);
  const alerts: AppAlert[] = [];
  for (const s of stock) {
    if (s.qty < s.reorderPoint) {
      alerts.push({
        id: `stock-${s.sku}`,
        severity: "alta",
        title: `Stock bajo punto de reorden: ${s.name}`,
        detail: `${s.qty} ${s.uom} disponibles, reorden en ${s.reorderPoint} ${s.uom} (${s.warehouse}, ${s.location})`,
        to: "/app/inventario",
      });
    }
  }
  for (const r of fur) {
    const holds = r.holds.filter((h) => h.level === "HOLD");
    if (holds.length > 0) {
      alerts.push({
        id: `hold-${r.furCode}`,
        severity: "media",
        title: `HOLD abierto en ${r.name}`,
        detail: holds.map((h) => h.description).join(" · "),
        to: `/app/fur/${r.furCode}`,
      });
    }
  }
  for (const o of orders) {
    if (o.status === "Retrasada") {
      alerts.push({
        id: `ot-${o.code}`,
        severity: "alta",
        title: `Orden de trabajo retrasada: ${o.code}`,
        detail: o.title,
        to: "/app/dashboards/mantenimiento",
      });
    }
  }
  return alerts;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<AppAlert[] | null>(null);
  useEffect(() => {
    let active = true;
    computeAlerts()
      .then((a) => active && setAlerts(a))
      .catch(() => active && setAlerts([]));
    return () => {
      active = false;
    };
  }, []);
  return alerts;
}
