import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import "./EntityDetailPage.css";
import { fetchCatalog, fetchCatalogEntity } from "../shared/api";
import { EntityCard } from "../components/ui/EntityCard";
import { StatusBadge } from "../components/ui/Badges";
import { DOMAINS } from "../shared/domains";
import type { CatalogEntity } from "../shared/types";

const SECTION_BY_TYPE: Record<string, { to: string; label: string }> = {
  "Curso (LMS)": { to: "/app/cursos", label: "Cursos (LMS)" },
  Proveedor: { to: "/app/proveedores", label: "Proveedores" },
  Servicio: { to: "/app/marketplace", label: "Marketplace" },
  Personas: { to: "/app/profesionales", label: "Servicios Profesionales" },
  Documento: { to: "/app/conocimiento", label: "Biblioteca de Conocimiento" },
  "Activos Físicos": { to: "/app/activos", label: "Activos Físicos" },
  Procesos: { to: "/app/procesos", label: "Procesos" },
  "Inventario (WMS)": { to: "/app/inventario", label: "WMS / Inventario" },
  Laboratorio: { to: "/app/laboratorio", label: "Laboratorio" },
  Dashboard: { to: "/app/dashboards", label: "Dashboards" },
  "Sitio / Mapa": { to: "/app/mapas", label: "Mapa de Planta" },
};

export function EntityDetailPage() {
  const { furCode } = useParams();
  if (!furCode) return <Navigate to="/app/catalogo" replace />;
  // key remonta el detalle al navegar entre entidades relacionadas.
  return <EntityDetailInner key={furCode} furCode={furCode} />;
}

function EntityDetailInner({ furCode }: { furCode: string }) {
  const [entity, setEntity] = useState<CatalogEntity | null | undefined>(undefined);
  const [related, setRelated] = useState<CatalogEntity[]>([]);

  useEffect(() => {
    let active = true;
    fetchCatalogEntity(furCode).then((e) => {
      if (!active) return;
      setEntity(e ?? null);
      if (e) {
        fetchCatalog().then((all) => {
          if (active) setRelated(all.filter((x) => x.entityType === e.entityType && x.furCode !== e.furCode).slice(0, 4));
        });
      }
    });
    return () => {
      active = false;
    };
  }, [furCode]);

  if (entity === undefined) {
    return (
      <div className="entity-detail container" aria-busy="true">
        <div className="skeleton-block" style={{ height: 320 }} />
      </div>
    );
  }
  if (entity === null) {
    return <Navigate to="/app/catalogo" replace />;
  }

  const section = SECTION_BY_TYPE[entity.entityType];
  const domain = entity.domain ? DOMAINS[entity.domain] : undefined;

  return (
    <div className="entity-detail container">
      <Link to={section?.to ?? "/app/catalogo"} className="entity-detail__back">
        <ArrowLeft size={14} /> Volver a {section?.label ?? "Catálogo"}
      </Link>

      <div className="panel entity-detail__hero">
        <div className="entity-detail__media">
          <img src={entity.image} alt={entity.title} />
        </div>
        <div className="entity-detail__info">
          <span className="entity-detail__type">{entity.entityType}</span>
          <h1>{entity.title}</h1>
          <p className="entity-detail__subtitle">{entity.subtitle}</p>

          <div className="entity-detail__badges">
            <StatusBadge status={entity.status} />
            {entity.rating != null && (
              <span className="entity-detail__rating">
                <Star size={14} fill="currentColor" /> {entity.rating}
              </span>
            )}
            {entity.price && <span className="entity-detail__price">{entity.price}</span>}
          </div>

          {entity.meta.length > 0 && (
            <div className="entity-detail__meta">
              {entity.meta.map((m) => (
                <span key={m} className="entity-detail__chip">
                  {m}
                </span>
              ))}
            </div>
          )}

          <dl className="entity-detail__facts">
            <div>
              <dt>Código FUR</dt>
              <dd>{entity.furCode}</dd>
            </div>
            <div>
              <dt>Tipo de entidad</dt>
              <dd>{entity.entityType}</dd>
            </div>
            {domain && (
              <div>
                <dt>Red transversal</dt>
                <dd>
                  <Link to={`/app/redes/${domain.code.toLowerCase()}`}>{domain.shortLabel} — {domain.label}</Link>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="entity-detail__related-title">Más en {section?.label ?? entity.entityType}</h2>
          <div className="entity-detail__related">
            {related.map((r) => (
              <EntityCard key={r.furCode} entity={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
