import { ShieldAlert } from "lucide-react";
import "./AdminPage.css";
import { ROLES } from "../shared/roles";

export function AdminPage() {
  return (
    <div className="admin container">
      <div className="admin__head">
        <h1>Administración</h1>
        <p>
          Referencia de roles funcionales y alcance de acceso (sección 12.2 / megadocumento §63
          RBAC por rol × dominio). Esta vista es informativa: la autenticación, sesiones y
          políticas reales se implementan en la Etapa 5 (API Core y Seguridad) contra un backend
          real — este prototipo no autentica usuarios. Puedes simular la sesión de cada rol desde
          el menú de usuario, arriba a la derecha.
        </p>
      </div>

      <div className="panel admin__notice">
        <ShieldAlert size={16} />
        Sin backend real no hay autorización real. Ningún control de esta pantalla está aplicado
        — es documentación viva del modelo de permisos objetivo.
      </div>

      <div className="panel">
        <table className="fur-table">
          <thead>
            <tr>
              <th>Rol funcional</th>
              <th>Alcance</th>
              <th>Acceso previsto</th>
            </tr>
          </thead>
          <tbody>
            {ROLES.map((r) => (
              <tr key={r.id}>
                <td className="admin__role">{r.label}</td>
                <td>{r.scope}</td>
                <td>{r.access}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
