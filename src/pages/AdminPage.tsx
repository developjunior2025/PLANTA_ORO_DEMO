import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, FileClock, Network, Plug, UsersRound, Workflow } from "lucide-react";
import "./AdminPage.css";
import { FurTab } from "./admin/FurTab";
import { PlantsTab } from "./admin/PlantsTab";
import { PermissionsTab } from "./admin/PermissionsTab";
import { RedesTab } from "./admin/RedesTab";
import { AuditTab } from "./admin/AuditTab";
import { IntegrationsTab } from "./admin/IntegrationsTab";

function ProcesosTab() {
  return <FurTab lockDomain="PROC" />;
}

const TABS = [
  { id: "plantas", label: "Plantas", icon: Building2, Component: PlantsTab },
  { id: "usuarios", label: "Usuarios", icon: UsersRound, Component: PermissionsTab },
  { id: "redes", label: "Redes", icon: Network, Component: RedesTab },
  { id: "procesos", label: "Procesos", icon: Workflow, Component: ProcesosTab },
  { id: "auditoria", label: "Auditoría", icon: FileClock, Component: AuditTab },
  { id: "integraciones", label: "Integraciones", icon: Plug, Component: IntegrationsTab },
] as const;

/**
 * Panel de Administración: gestión del ecosistema completo, no de una planta en particular —
 * plantas (el listado físico), usuarios/roles, las 10 redes transversales y procesos. La gestión
 * operativa de cada planta (fichas FUR, catálogo, inventario, presupuesto) vive en Panel Planta
 * (/app/planta), separado a pedido explícito: el administrador no debe mezclar ambas cosas.
 * Usuarios e Integraciones son honestamente de solo lectura — no hay autenticación ni conectores
 * reales todavía (megadocumento Etapa 5, pendiente).
 */
export function AdminPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("plantas");
  const Active = TABS.find((t) => t.id === tab)!.Component;

  return (
    <div className="admin container">
      <div className="admin__head">
        <h1>Administración</h1>
        <p>
          Gestión del ecosistema, no de una planta puntual: plantas, usuarios, redes y procesos.
          La gestión de cada planta (fichas FUR, catálogo, inventario, presupuesto) está en{" "}
          <Link to="/app/planta">Panel Planta</Link>.
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

      <Active />
    </div>
  );
}
