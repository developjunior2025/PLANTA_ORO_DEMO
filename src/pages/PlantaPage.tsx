import { useState } from "react";
import { Link } from "react-router-dom";
import { Boxes, Calculator, Factory, Layers3, LayoutDashboard, Warehouse } from "lucide-react";
import "./AdminPage.css";
import { useActivePlant, usePlants } from "../shared/plantStore";
import { FurTab } from "./admin/FurTab";
import { CatalogTab } from "./admin/CatalogTab";
import { InventoryTab } from "./planta/InventoryTab";
import { BudgetTab } from "./planta/BudgetTab";

type TabId = "fur" | "catalogo" | "inventario" | "presupuesto" | "dashboards";

const TABS: { id: TabId; label: string; icon: typeof Layers3 }[] = [
  { id: "fur", label: "Fichas FUR", icon: Layers3 },
  { id: "catalogo", label: "Catálogo", icon: Boxes },
  { id: "inventario", label: "Inventario", icon: Warehouse },
  { id: "presupuesto", label: "Presupuesto", icon: Calculator },
  { id: "dashboards", label: "Dashboards", icon: LayoutDashboard },
];

/**
 * Panel Planta: lo que gestiona cada planta sobre sus propios datos (fichas FUR, catálogo,
 * inventario, presupuesto), a diferencia del Panel de Administración que gestiona el ecosistema
 * completo (plantas, usuarios/roles, redes, procesos). Opera siempre sobre la planta activa del
 * selector global del header — cambiar de planta ahí cambia qué gestiona este panel.
 */
export function PlantaPage() {
  const plantCode = useActivePlant();
  const plants = usePlants();
  const plant = plants?.find((p) => p.code === plantCode);
  const [tab, setTab] = useState<TabId>("fur");

  return (
    <div className="admin container">
      <div className="admin__head">
        <h1>
          <Factory size={20} style={{ verticalAlign: "-3px", marginRight: 8 }} />
          Panel Planta {plant ? `— ${plant.name}` : ""}
        </h1>
        <p>
          Gestión operativa de esta planta: fichas FUR, catálogo, inventario y presupuesto propios.
          Para cambiar de planta, usá el selector "Planta" del encabezado.
        </p>
      </div>

      <div className="admin__tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={"admin__tab" + (tab === t.id ? " admin__tab--active" : "")}
            onClick={() => setTab(t.id)}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "fur" && <FurTab lockPlantCode={plantCode} />}
      {tab === "catalogo" && <CatalogTab lockPlantCode={plantCode} />}
      {tab === "inventario" && <InventoryTab lockPlantCode={plantCode} />}
      {tab === "presupuesto" && <BudgetTab lockPlantCode={plantCode} />}
      {tab === "dashboards" && (
        <div className="admin-tab">
          <div className="panel">
            <p className="dash-sub" style={{ marginBottom: 10 }}>
              Los dashboards ya se filtran solos por la planta activa del selector global.
            </p>
            <Link to="/app/dashboards" className="btn btn--gold" style={{ display: "inline-flex" }}>
              <LayoutDashboard size={14} /> Ir a Dashboards
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
