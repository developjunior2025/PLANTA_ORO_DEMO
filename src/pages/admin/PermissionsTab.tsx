import { ShieldAlert } from "lucide-react";
import { ROLES } from "../../shared/roles";

/**
 * Referencia de roles funcionales y alcance de acceso (megadocumento §63, RBAC por rol × dominio).
 * Sigue siendo informativa a propósito: sin autenticación real (Etapa 5) no hay permisos que aplicar
 * de verdad todavía — mostrarlo como "editable" sería fingir un control que no existe.
 */
export function PermissionsTab() {
  return (
    <div className="admin-tab">
      <div className="panel admin__notice">
        <ShieldAlert size={16} />
        Sin backend de autenticación real, este RBAC es documentación viva del modelo objetivo — el
        selector de rol del menú de usuario simula la sesión, pero ningún control de acceso se aplica
        todavía a las peticiones.
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
