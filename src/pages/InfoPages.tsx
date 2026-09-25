import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import "./InfoPages.css";
import { fetchCatalog, fetchFurList, fetchHealth, fetchStock } from "../shared/api";

interface Check {
  name: string;
  ok: boolean;
  detail: string;
}

export function SystemStatusPage() {
  const [checks, setChecks] = useState<Check[] | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const results: Check[] = [{ name: "Frontend (React)", ok: true, detail: "Sirviendo esta página" }];
      try {
        const h = await fetchHealth();
        results.push({ name: "API NestJS", ok: h.status === "ok", detail: `${h.service} · ${h.ms} ms` });
      } catch {
        results.push({ name: "API NestJS", ok: false, detail: "Sin respuesta en /api/v1/health" });
      }
      const db = async (name: string, fn: () => Promise<unknown[]>) => {
        try {
          const rows = await fn();
          results.push({ name, ok: true, detail: `${rows.length} registros leídos de PostgreSQL` });
        } catch {
          results.push({ name, ok: false, detail: "Error consultando la base de datos" });
        }
      };
      await db("Base de datos · fichas FUR", () => fetchFurList());
      await db("Base de datos · catálogo", () => fetchCatalog());
      await db("Base de datos · inventario", () => fetchStock());
      if (active) setChecks(results);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="info-page container">
      <h1>Estado del Sistema</h1>
      <p>Verificación en vivo, hecha ahora mismo desde tu navegador contra el backend real.</p>
      {!checks ? (
        <div className="skeleton-block" style={{ height: 200 }} aria-busy="true" />
      ) : (
        <ul className="info-page__checks">
          {checks.map((c) => (
            <li key={c.name} className={c.ok ? "ok" : "fail"}>
              {c.ok ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              <strong>{c.name}</strong>
              <span>{c.detail}</span>
            </li>
          ))}
        </ul>
      )}
      <p className="info-page__note">
        No incluye Odoo, SCADA/Historian ni redes OT: esos sistemas aún no están conectados (ver plan, HOLD/TBC).
      </p>
    </div>
  );
}

const ENDPOINTS = [
  ["GET", "/api/v1/health", "Estado del servicio"],
  ["GET", "/api/v1/fur?domain=PTE,IOT", "Lista de fichas FUR (filtro opcional por red)"],
  ["POST", "/api/v1/fur", "Crea una ficha FUR"],
  ["GET", "/api/v1/fur/:furCode", "Detalle de una ficha FUR"],
  ["PATCH", "/api/v1/fur/:furCode", "Edita estado, criticidad, madurez y pendientes TBC/HOLD"],
  ["GET", "/api/v1/fur/:furCode/relations", "Relaciones de la ficha"],
  ["GET", "/api/v1/fur/:furCode/audit", "Historial de auditoría de la ficha"],
  ["GET", "/api/v1/catalog", "Catálogo global"],
  ["GET", "/api/v1/catalog/:furCode", "Detalle de una entidad del catálogo"],
  ["GET", "/api/v1/inventory", "Stock por almacén y ubicación"],
  ["PATCH", "/api/v1/inventory/:sku/movement", "Registra entrada, salida o ajuste de stock"],
  ["GET", "/api/v1/lulo/projects/:code", "Proyecto de presupuesto con capítulos, partidas y APU"],
  ["GET", "/api/v1/documents", "Biblioteca técnica agregada"],
  ["GET", "/api/v1/charts/:key", "Series para los dashboards"],
];

export function ApiDocsPage() {
  return (
    <div className="info-page container">
      <h1>API / Integraciones</h1>
      <p>
        Endpoints reales del backend NestJS (base <code>http://localhost:3000</code>). Aún no existen integraciones con
        Odoo 19, SCADA/Historian ni LuloWin.
      </p>
      <table className="fur-table">
        <thead>
          <tr>
            <th>Método</th>
            <th>Ruta</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {ENDPOINTS.map(([m, path, d]) => (
            <tr key={m + path}>
              <td>
                <span className={`info-page__method info-page__method--${m}`}>{m}</span>
              </td>
              <td>
                <code>{path}</code>
              </td>
              <td>{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TEXTS = {
  terminos: {
    title: "Términos y condiciones",
    body: "El texto legal debe redactarlo y aprobarlo la organización propietaria de la planta. Este prototipo no lo inventa.",
  },
  privacidad: {
    title: "Política de privacidad",
    body: "La política de tratamiento de datos debe definirla la organización. Hoy el prototipo solo guarda en tu navegador el rol de demo y tus favoritos.",
  },
  soporte: {
    title: "Soporte",
    body: "Aún no hay un canal de soporte definido. Cuando exista (correo, mesa de ayuda), su información se publicará aquí.",
  },
};

export function TextPage({ slug }: { slug: keyof typeof TEXTS }) {
  const t = TEXTS[slug];
  return (
    <div className="info-page container">
      <h1>{t.title}</h1>
      <p>{t.body}</p>
      <p>
        Mientras tanto puedes revisar el <Link to="/app/sistema">estado del sistema</Link>.
      </p>
    </div>
  );
}
