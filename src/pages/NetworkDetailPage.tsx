import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Boxes, FileText, Network as NetworkIconLucide } from "lucide-react";
import "./NetworkDetailPage.css";
import { DOMAINS } from "../shared/domains";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { fetchFurList } from "../shared/api";
import type { DomainCode, FurRecord } from "../shared/types";
import { StatCard } from "../components/ui/StatCard";
import { StatusBadge } from "../components/ui/Badges";

export function NetworkDetailPage() {
  const { domain } = useParams();
  const code = domain?.toUpperCase() as DomainCode | undefined;

  if (!code || !DOMAINS[code]) {
    return <Navigate to="/app/redes" replace />;
  }

  // key={code} remounts the inner view on navigation between networks, so its
  // fetched records reset naturally instead of via an effect-driven reset.
  return <NetworkDetailInner key={code} code={code} />;
}

function NetworkDetailInner({ code }: { code: DomainCode }) {
  const meta = DOMAINS[code];
  const [records, setRecords] = useState<FurRecord[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchFurList([code]).then((r) => {
      if (active) setRecords(r);
    });
    return () => {
      active = false;
    };
  }, [code]);

  return (
    <div className="network-detail container">
      <div className="network-detail__head" style={{ ["--net-color" as string]: meta.color }}>
        <span className="network-detail__icon">
          <NetworkIcon domain={meta.code} size={26} color="#fff" />
        </span>
        <div>
          <span className="network-detail__eyebrow">Red transversal</span>
          <h1>{meta.shortLabel} — {meta.label}</h1>
          <p>{meta.description}</p>
        </div>
      </div>

      <div className="network-detail__stats">
        <StatCard icon={Boxes} label="Activos FUR registrados" value={records ? String(records.length) : "…"} />
        <StatCard icon={NetworkIconLucide} label="Relaciones transversales" value={records ? String(records.reduce((a, r) => a + r.relations.length, 0)) : "…"} />
        <StatCard icon={FileText} label="Documentos vinculados" value={records ? String(records.reduce((a, r) => a + r.documents.length, 0)) : "…"} />
      </div>

      <section className="panel">
        <h3>Activos / Entidades de {meta.shortLabel}</h3>
        {!records ? (
          <div className="skeleton-block" style={{ height: 160 }} aria-busy="true" />
        ) : records.length === 0 ? (
          <p className="network-detail__empty">
            Esta red aún no tiene fichas FUR de ejemplo cargadas en el prototipo. En la
            implementación real, listará todas las fichas del dominio {meta.label}.
          </p>
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>Código FUR</th>
                <th>Nombre</th>
                <th>Familia</th>
                <th>Zona</th>
                <th>Estado</th>
                <th>Madurez</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.furCode}>
                  <td>
                    <Link to={`/app/fur/${r.furCode}`} className="fur-table__link">
                      {r.furCode}
                    </Link>
                  </td>
                  <td>{r.name}</td>
                  <td>{r.family}</td>
                  <td>{r.zone}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.maturity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
