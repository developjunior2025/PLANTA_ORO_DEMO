import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight, MapPin } from "lucide-react";
import "./MapPage.css";
import { fetchFurList } from "../shared/api";
import { DOMAINS } from "../shared/domains";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { StatusBadge } from "../components/ui/Badges";
import type { FurRecord } from "../shared/types";

export function MapPage() {
  const [records, setRecords] = useState<FurRecord[] | null>(null);
  const [params] = useSearchParams();
  const focusCode = params.get("fur");
  const [openZone, setOpenZone] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchFurList().then((r) => {
      if (active) setRecords(r);
    });
    return () => {
      active = false;
    };
  }, []);

  // Zona a abrir: la que eligió el usuario, o la del activo enlazado desde su ficha (?fur=).
  const focusZone = records?.find((r) => r.furCode === focusCode)?.zone ?? null;
  const shownZone = openZone ?? focusZone;

  const byZone = useMemo(() => {
    const map = new Map<string, FurRecord[]>();
    for (const r of records ?? []) {
      const list = map.get(r.zone) ?? [];
      list.push(r);
      map.set(r.zone, list);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [records]);

  return (
    <div className="map-page container">
      <div className="map-page__head">
        <h1>Mapa / Sitio</h1>
        <p>
          Navegación Planta → Área → Activo / FUR (Etapa 11 / sección 3.2.E). La librería GIS
          definitiva queda como <strong>ADR-004 pendiente</strong> — este prototipo representa la
          jerarquía como árbol navegable en vez de un mapa geográfico real, para no simular datos
          de georreferenciación que no existen todavía.
        </p>
      </div>

      {!records ? (
        <div className="skeleton-block" style={{ height: 320 }} aria-busy="true" />
      ) : (
        <div className="panel map-page__tree">
          {byZone.map(([zone, items]) => (
            <div className="map-zone" key={zone}>
              <button
                type="button"
                className="map-zone__head"
                onClick={() => setOpenZone(shownZone === zone ? "" : zone)}
              >
                {shownZone === zone ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                <MapPin size={15} />
                {zone}
                <span className="map-zone__count">{items.length} activos FUR</span>
              </button>
              {shownZone === zone && (
                <div className="map-zone__items">
                  {items.map((r) => {
                    const domain = DOMAINS[r.domain];
                    return (
                      <Link to={`/app/fur/${r.furCode}`} key={r.furCode} className={"map-zone__item" + (r.furCode === focusCode ? " map-zone__item--focus" : "")}>
                        <span className="map-zone__item-domain" style={{ background: domain.color }}>
                          <NetworkIcon domain={domain.code} size={13} color="#fff" />
                        </span>
                        <div>
                          <strong>{r.name}</strong>
                          <span>{r.furCode} · {r.area} · {r.process}</span>
                        </div>
                        <StatusBadge status={r.status} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
