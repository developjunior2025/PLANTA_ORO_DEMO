import { CircleDashed, CircleCheck } from "lucide-react";

interface Integration {
  name: string;
  domain: string;
  status: "connected" | "pending";
  note: string;
}

/**
 * Estado real de las integraciones del ecosistema (megadocumento §13 fuentes de datos / §2.2 "Dashboard
 * no es sistema de autoridad"). Nada aquí es un interruptor: es honesto sobre lo que sí está conectado
 * (esta misma base PostgreSQL) y lo que todavía no, para no fingir integraciones que no existen.
 */
const INTEGRATIONS: Integration[] = [
  {
    name: "PostgreSQL / FUR (esta base de datos)",
    domain: "Identidad, relaciones, catálogo, auditoría",
    status: "connected",
    note: "Es la fuente real de todo lo que se ve como \"Real\" en la app: fichas FUR, catálogo, presupuesto, plantas, auditoría.",
  },
  {
    name: "Odoo 19 (ERP)",
    domain: "Compras, inventario, mantenimiento, partners, documentos",
    status: "pending",
    note: "No hay instancia de Odoo conectada. Los módulos de compras/inventario del prototipo corren sobre esta misma base, no sobre Odoo.",
  },
  {
    name: "SCADA / Historian",
    domain: "Series temporales operacionales (producción, variables de proceso)",
    status: "pending",
    note: "Los valores de \"Ejemplo\" en dashboards y KPIs son ilustrativos hasta que se conecte un Historian real.",
  },
  {
    name: "NMS GPON",
    domain: "Topología, puertos, potencia óptica",
    status: "pending",
    note: "Sin acceso al sistema de gestión de la red GPON de la planta.",
  },
  {
    name: "VMS / NVR (CCTV)",
    domain: "Video, salud de cámaras, evidencias",
    status: "pending",
    note: "Sin acceso al servidor de video de la planta.",
  },
  {
    name: "LIMS / Laboratorio",
    domain: "Resultados, TAT, QA/QC",
    status: "pending",
    note: "Los resultados de laboratorio del prototipo son de ejemplo, no de un LIMS real.",
  },
  {
    name: "LULO / motor de presupuesto",
    domain: "Estructuras presupuestarias, APU",
    status: "pending",
    note: "El motor de presupuesto de este prototipo recalcula la fórmula CD × factor × cantidad sobre datos propios, no sobre LuloWin.",
  },
];

export function IntegrationsTab() {
  return (
    <div className="admin-tab">
      <p className="admin-tab__hint">
        Cada número del ecosistema debe poder trazarse a su fuente de autoridad (megadocumento §2.2). Esta
        es la lista real de qué está conectado hoy y qué falta — no hay nada aquí que se pueda "activar"
        desde la pantalla: conectar un sistema real requiere acceso a su infraestructura.
      </p>
      <div className="panel">
        <table className="fur-table">
          <thead>
            <tr>
              <th>Sistema</th>
              <th>Dominio</th>
              <th>Estado</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {INTEGRATIONS.map((i) => (
              <tr key={i.name}>
                <td className="admin__role">{i.name}</td>
                <td>{i.domain}</td>
                <td>
                  {i.status === "connected" ? (
                    <span className="admin-status admin-status--ok">
                      <CircleCheck size={13} /> Conectado
                    </span>
                  ) : (
                    <span className="admin-status admin-status--pending">
                      <CircleDashed size={13} /> Pendiente
                    </span>
                  )}
                </td>
                <td className="admin-tab__note-cell">{i.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
