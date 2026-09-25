import { Link } from "react-router-dom";
import "./FurCard.css";
import { StatusBadge, CriticalityBadge } from "./Badges";
import { NetworkIcon } from "./NetworkIcon";
import { DOMAINS } from "../../shared/domains";
import type { FurRecord } from "../../shared/types";

export function FurCard({ record }: { record: FurRecord }) {
  const domain = DOMAINS[record.domain];

  return (
    <Link to={`/app/fur/${record.furCode}`} className="fur-card">
      <div className="fur-card__media">
        <img src={record.image} alt="" loading="lazy" />
        <span className="fur-card__domain" style={{ background: domain.color }}>
          <NetworkIcon domain={domain.code} size={12} color="#fff" /> {domain.shortLabel}
        </span>
      </div>
      <div className="fur-card__body">
        <span className="fur-card__code">{record.furCode}</span>
        <h3>{record.name}</h3>
        <p>{record.family}</p>
        <span className="fur-card__zone">{record.zone}</span>
        <div className="fur-card__footer">
          <StatusBadge status={record.status} />
          <CriticalityBadge criticality={record.criticality} />
        </div>
      </div>
    </Link>
  );
}
