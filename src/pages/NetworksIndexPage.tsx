import { Link } from "react-router-dom";
import "./NetworksIndexPage.css";
import { DOMAIN_LIST } from "../shared/domains";
import { NetworkIcon } from "../components/ui/NetworkIcon";

export function NetworksIndexPage() {
  return (
    <div className="networks-index container">
      <div className="networks-index__head">
        <h1>Redes Transversales del Ecosistema FUR</h1>
        <p>
          Diez redes conectan cada activo, proceso y entidad de la planta: desde la potencia
          eléctrica y la instrumentación hasta el laboratorio, el mantenimiento y las compras.
        </p>
      </div>
      <div className="networks-index__grid">
        {DOMAIN_LIST.map((d) => (
          <Link to={`/app/redes/${d.code.toLowerCase()}`} key={d.code} className="network-tile">
            <span className="network-tile__icon" style={{ background: d.color }}>
              <NetworkIcon domain={d.code} size={22} color="#fff" />
            </span>
            <div>
              <strong>{d.shortLabel}</strong>
              <span>{d.label}</span>
              <p>{d.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
