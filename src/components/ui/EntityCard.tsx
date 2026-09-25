import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import "./EntityCard.css";
import { StatusBadge } from "./Badges";
import { useFavorites } from "../../shared/favoritesStore";
import type { CatalogEntity } from "../../shared/types";

export function EntityCard({ entity }: { entity: CatalogEntity }) {
  const isFav = useFavorites((s) => s.codes.includes(entity.furCode));
  const toggle = useFavorites((s) => s.toggle);
  const to = entity.entityType === "Red Transversal" && entity.domain
    ? `/app/redes/${entity.domain.toLowerCase()}`
    : `/app/entidad/${entity.furCode}`;

  return (
    <Link to={to} className="entity-card">
      <div className="entity-card__media">
        <img src={entity.image} alt="" loading="lazy" />
        <span className="entity-card__type">{entity.entityType}</span>
        <button
          type="button"
          className={"entity-card__fav" + (isFav ? " entity-card__fav--on" : "")}
          aria-label={isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
          aria-pressed={isFav}
          onClick={(e) => {
            e.preventDefault();
            toggle(entity.furCode);
          }}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="entity-card__body">
        <h3 className="entity-card__title">{entity.title}</h3>
        <p className="entity-card__subtitle">{entity.subtitle}</p>
        <div className="entity-card__meta">
          {entity.meta.map((m) => (
            <span key={m} className="entity-card__chip">
              {m}
            </span>
          ))}
        </div>
        <div className="entity-card__footer">
          <StatusBadge status={entity.status} />
          {entity.rating && (
            <span className="entity-card__rating">
              <Star size={13} fill="currentColor" /> {entity.rating}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
