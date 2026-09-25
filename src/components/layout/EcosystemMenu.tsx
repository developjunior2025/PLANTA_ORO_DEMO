import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "./EcosystemMenu.css";
import { DOMAIN_LIST } from "../../shared/domains";
import { NetworkIcon } from "../ui/NetworkIcon";
import { useClickOutside } from "../../shared/useClickOutside";

const SECTIONS = [
  {
    title: "Catálogo y activos",
    links: [
      { label: "Catálogo global", to: "/app/catalogo" },
      { label: "Activos Físicos", to: "/app/activos" },
      { label: "Procesos", to: "/app/procesos" },
      { label: "Mapa de Planta", to: "/app/mapas" },
    ],
  },
  {
    title: "Operación",
    links: [
      { label: "Dashboards (20)", to: "/app/dashboards" },
      { label: "Mantenimiento", to: "/app/mantenimiento" },
      { label: "WMS / Inventario", to: "/app/inventario" },
      { label: "Laboratorio y Calidad", to: "/app/laboratorio" },
    ],
  },
  {
    title: "Comercial",
    links: [
      { label: "Marketplace", to: "/app/marketplace" },
      { label: "Proveedores", to: "/app/proveedores" },
      { label: "Requisiciones y Ofertas", to: "/app/requisiciones" },
      { label: "Presupuestos (LULO)", to: "/app/presupuestos" },
    ],
  },
  {
    title: "Conocimiento",
    links: [
      { label: "Servicios Profesionales", to: "/app/profesionales" },
      { label: "Cursos (LMS)", to: "/app/cursos" },
      { label: "Documentos", to: "/app/documentos" },
      { label: "Administración", to: "/app/admin" },
    ],
  },
];

export function EcosystemMenu() {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useClickOutside([buttonRef, panelRef], open, () => setOpen(false));

  // El botón vive dentro de un contenedor con overflow-x:auto (la barra de
  // navegación con scroll horizontal), que recortaría un panel absoluto. Se
  // porta a <body> con position:fixed calculada desde el botón para evitar el clip.
  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setCoords({ top: rect.bottom + 6, left: rect.left });
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="app-subnav__menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Menu size={16} /> Todo el ecosistema
      </button>

      {open &&
        createPortal(
          <div
            className="ecosystem-menu__panel"
            role="menu"
            ref={panelRef}
            style={{ top: coords.top, left: coords.left }}
          >
            <div className="ecosystem-menu__columns">
              {SECTIONS.map((section) => (
                <div key={section.title} className="ecosystem-menu__col">
                  <span className="ecosystem-menu__col-title">{section.title}</span>
                  {section.links.map((link) => (
                    <Link key={link.label} to={link.to} className="ecosystem-menu__link" onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>

            <div className="ecosystem-menu__networks">
              <span className="ecosystem-menu__col-title">10 redes transversales</span>
              <div className="ecosystem-menu__networks-grid">
                {DOMAIN_LIST.map((d) => (
                  <Link
                    key={d.code}
                    to={`/app/redes/${d.code.toLowerCase()}`}
                    className="ecosystem-menu__network"
                    onClick={() => setOpen(false)}
                    style={{ ["--net-color" as string]: d.color }}
                  >
                    <NetworkIcon domain={d.code} size={14} color={d.color} />
                    {d.shortLabel}
                  </Link>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
