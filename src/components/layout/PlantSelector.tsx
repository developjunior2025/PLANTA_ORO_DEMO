import { useRef, useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import "./PlantSelector.css";
import { usePlantStore, usePlants } from "../../shared/plantStore";
import { useClickOutside } from "../../shared/useClickOutside";

/**
 * Selector global de planta (megadocumento §3/§4.2 — "ContextSelector" del AppShell). Cambiar de
 * planta aquí filtra sola toda la app (catálogo, activos, mapa...): no hay que volver a elegirla
 * en cada página.
 */
export function PlantSelector() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const plants = usePlants();
  const plantCode = usePlantStore((s) => s.plantCode);
  const setPlantCode = usePlantStore((s) => s.setPlantCode);

  useClickOutside(ref, open, () => setOpen(false));

  const active = plants?.find((p) => p.code === plantCode);

  return (
    <div className="plant-selector" ref={ref}>
      <button
        type="button"
        className="plant-selector__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        title={active ? `${active.name} · ${active.location}` : "Cargando plantas…"}
      >
        <MapPin size={15} />
        <span className="plant-selector__label">
          <small>Planta</small>
          {active ? active.name : plantCode}
        </span>
        <ChevronDown size={14} />
      </button>

      {open && (
        <div className="plant-selector__panel" role="menu">
          {!plants ? (
            <div className="plant-selector__item">Cargando…</div>
          ) : (
            plants.map((p) => (
              <button
                key={p.code}
                type="button"
                role="menuitem"
                className={"plant-selector__item" + (p.code === plantCode ? " plant-selector__item--active" : "")}
                onClick={() => {
                  setPlantCode(p.code);
                  setOpen(false);
                }}
              >
                <strong>{p.name}</strong>
                <span>
                  {p.code} · {p.location}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
