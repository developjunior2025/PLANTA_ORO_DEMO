import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import "./EntityListPage.css";
import { fetchCatalog } from "../shared/api";
import { useFavorites } from "../shared/favoritesStore";
import { EntityCard } from "../components/ui/EntityCard";
import type { CatalogEntity } from "../shared/types";

export function FavoritesPage() {
  const codes = useFavorites((s) => s.codes);
  const [all, setAll] = useState<CatalogEntity[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchCatalog().then((r) => active && setAll(r));
    return () => {
      active = false;
    };
  }, []);

  const favs = (all ?? []).filter((e) => codes.includes(e.furCode));

  return (
    <div className="entity-list container">
      <div className="entity-list__head">
        <div>
          <h1>
            <Heart size={22} /> Mis favoritos
          </h1>
          <p>Elementos del catálogo que marcaste con el corazón. Se guardan en este navegador.</p>
        </div>
      </div>
      {!all ? (
        <div className="skeleton-block" style={{ height: 240 }} aria-busy="true" />
      ) : favs.length === 0 ? (
        <div className="panel entity-list__empty">
          Todavía no marcaste favoritos. Toca el corazón en cualquier tarjeta del{" "}
          <Link to="/app/catalogo">catálogo</Link>.
        </div>
      ) : (
        <div className="entity-list__grid">
          {favs.map((e) => (
            <EntityCard entity={e} key={e.furCode} />
          ))}
        </div>
      )}
    </div>
  );
}
