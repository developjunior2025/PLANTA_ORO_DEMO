import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, LogOut, Repeat, ShieldQuestion } from "lucide-react";
import "./UserMenu.css";
import { useSessionStore, useCurrentRole } from "../../shared/sessionStore";
import { ROLES } from "../../shared/roles";
import { useClickOutside } from "../../shared/useClickOutside";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const userName = useSessionStore((s) => s.userName);
  const setRoleId = useSessionStore((s) => s.setRoleId);
  const role = useCurrentRole();

  useClickOutside(ref, open, () => {
    setOpen(false);
    setSwitching(false);
  });

  return (
    <div className="user-menu" ref={ref}>
      <button
        type="button"
        className="app-header__user"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="app-header__avatar">{initials(userName)}</span>
        <span className="app-header__user-info">
          {userName}
          <small>{role.label}</small>
        </span>
        <ChevronDown size={15} />
      </button>

      {open && (
        <div className="user-menu__panel" role="menu">
          {!switching ? (
            <>
              <div className="user-menu__head">
                <span className="app-header__avatar app-header__avatar--lg">{initials(userName)}</span>
                <div>
                  <strong>{userName}</strong>
                  <span>{role.label}</span>
                </div>
              </div>

              <div className="user-menu__section">
                <span className="user-menu__section-label">Accesos rápidos de tu rol</span>
                {role.quickLinks.map((link) => (
                  <Link key={link.label} to={link.to} className="user-menu__item" onClick={() => setOpen(false)}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="user-menu__section">
                <button type="button" className="user-menu__item user-menu__item--action" onClick={() => setSwitching(true)}>
                  <Repeat size={14} /> Cambiar de rol (demo)
                </button>
                <Link to="/app/admin" className="user-menu__item" onClick={() => setOpen(false)}>
                  <ShieldQuestion size={14} /> Ver todos los roles y permisos
                </Link>
                <button type="button" className="user-menu__item user-menu__item--disabled" disabled title="Requiere backend real (Etapa 5)">
                  <LogOut size={14} /> Cerrar sesión
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="user-menu__head user-menu__head--switch">
                <button type="button" className="user-menu__back" onClick={() => setSwitching(false)}>
                  ← Volver
                </button>
                <span className="user-menu__section-label">
                  Simular sesión como… (no hay autenticación real, Etapa 5 pendiente)
                </span>
              </div>
              <div className="user-menu__role-list">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={"user-menu__item" + (r.id === role.id ? " user-menu__item--active" : "")}
                    onClick={() => {
                      setRoleId(r.id);
                      setSwitching(false);
                      setOpen(false);
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
