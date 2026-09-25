import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  MapPin,
  QrCode,
  ShoppingCart,
  CheckCircle2,
  XCircle,
  AlertCircle,
  History,
  FileText,
  Network,
  ShieldCheck,
  ListChecks,
  Pencil,
  Save,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";
import "./FurDetailPage.css";
import { fetchFurByCode, fetchFurList, updateFur, fetchAuditEvents, ApiError, type AuditEvent } from "../shared/api";
import { DOMAINS, DOMAIN_LIST } from "../shared/domains";
import { NetworkIcon } from "../components/ui/NetworkIcon";
import { StatusBadge, ConditionBadge, MaturityBadge, CriticalityBadge } from "../components/ui/Badges";
import type { AssetStatus, Criticality, DataMaturity, FurHold, FurRecord } from "../shared/types";

const STATUS_OPTIONS: AssetStatus[] = ["Operativo", "En mantenimiento", "Fuera de servicio", "En proyecto"];
const CRITICALITY_OPTIONS: Criticality[] = ["Alta", "Media", "Baja"];
const MATURITY_OPTIONS: DataMaturity[] = ["D0", "D1", "D2", "D3", "D4", "D5"];

const TABS = ["Resumen", "Técnico", "Relaciones", "Documentos", "Calidad del Dato", "Historial"];

export function FurDetailPage() {
  const { furCode } = useParams();
  if (!furCode) {
    return <Navigate to="/app/catalogo" replace />;
  }
  // key={furCode} remounts FurDetailInner on navigation between fichas, so its
  // local state (tab, fetched record) resets naturally instead of via effects.
  return <FurDetailInner key={furCode} furCode={furCode} />;
}

function FurDetailInner({ furCode }: { furCode: string }) {
  const [tab, setTab] = useState("Resumen");
  const [record, setRecord] = useState<FurRecord | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<{ status: AssetStatus; criticality: Criticality; maturity: DataMaturity; holds: FurHold[] } | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [knownCodes, setKnownCodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    fetchFurList().then((all) => {
      if (active) setKnownCodes(new Set(all.map((r) => r.furCode)));
    });
    fetchFurByCode(furCode).then((r) => {
      if (active) setRecord(r ?? null);
    });
    return () => {
      active = false;
    };
  }, [furCode]);

  if (record === undefined) {
    return <FurDetailSkeleton />;
  }

  if (record === null) {
    return <Navigate to="/app/catalogo" replace />;
  }

  const domain = DOMAINS[record.domain];

  function startEditing() {
    if (!record) return;
    setDraft({ status: record.status, criticality: record.criticality, maturity: record.maturity, holds: record.holds });
    setSaveError(null);
    setEditing(true);
  }

  function cancelEditing() {
    setEditing(false);
    setDraft(null);
    setSaveError(null);
  }

  async function saveEditing() {
    if (!draft) return;
    setSaving(true);
    setSaveError(null);
    try {
      const updated = await updateFur(furCode, draft);
      setRecord(updated);
      setEditing(false);
      setDraft(null);
    } catch (e) {
      setSaveError(e instanceof ApiError ? e.message : "No se pudo guardar. Verifica que el backend esté corriendo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fur-detail">
      <div className="fur-detail__header panel">
        <div className="fur-detail__id">
          <div className="fur-detail__id-icon">
            <QrCode size={30} />
          </div>
          <div>
            <div className="fur-detail__code-row">
              <strong>{record.furCode}</strong>
              <StatusBadge status={record.status} />
              {!editing ? (
                <button type="button" className="fur-detail__edit-btn" onClick={startEditing}>
                  <Pencil size={13} /> Editar
                </button>
              ) : (
                <span className="fur-detail__edit-btn fur-detail__edit-btn--active">
                  <Pencil size={13} /> Editando
                </span>
              )}
            </div>
            <span className="fur-detail__uuid">ID interno (UUID): {record.uuid}</span>
            <span
              className="fur-detail__domain"
              style={{ color: domain.color }}
            >
              <NetworkIcon domain={domain.code} size={14} color={domain.color} /> {domain.shortLabel} ({domain.label})
            </span>
            <div className="fur-detail__meta-row">
              <span>Nombre del activo: <strong>{record.name}</strong></span>
              <span>Tipo / Familia: {record.family}</span>
            </div>

            {!editing ? (
              <div className="fur-detail__badges">
                <MaturityBadge maturity={record.maturity} />
                <CriticalityBadge criticality={record.criticality} />
                <span className="badge badge--sm badge--maturity">v{record.version}</span>
              </div>
            ) : (
              draft && (
                <div className="fur-detail__edit-form">
                  <label>
                    Estado
                    <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as AssetStatus })}>
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Criticidad
                    <select value={draft.criticality} onChange={(e) => setDraft({ ...draft, criticality: e.target.value as Criticality })}>
                      {CRITICALITY_OPTIONS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Madurez
                    <select value={draft.maturity} onChange={(e) => setDraft({ ...draft, maturity: e.target.value as DataMaturity })}>
                      {MATURITY_OPTIONS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </label>
                  <div className="fur-detail__edit-actions">
                    <button type="button" className="btn btn--gold" onClick={saveEditing} disabled={saving}>
                      {saving ? <Loader2 size={14} className="fur-spin" /> : <Save size={14} />} Guardar
                    </button>
                    <button type="button" className="fur-detail__edit-cancel" onClick={cancelEditing} disabled={saving}>
                      Cancelar
                    </button>
                  </div>
                  {saveError && <span className="fur-detail__edit-error">{saveError}</span>}
                </div>
              )
            )}
          </div>
        </div>

        <div className="fur-detail__media">
          <img src={record.image} alt={record.name} />
          <div className="fur-detail__media-caption">
            <strong>{record.name}</strong>
            <span>{record.furCode} · {record.zone}</span>
          </div>
        </div>

        <div className="fur-detail__location panel panel--nested">
          <h4>
            <MapPin size={14} /> Ubicación en la Planta
          </h4>
          <dl>
            <div>
              <dt>Zona</dt>
              <dd>{record.zone}</dd>
            </div>
            <div>
              <dt>Área</dt>
              <dd>{record.area}</dd>
            </div>
            <div>
              <dt>Proceso</dt>
              <dd>{record.process}</dd>
            </div>
            <div>
              <dt>Coordenadas</dt>
              <dd>{record.coordinates}</dd>
            </div>
          </dl>
          <Link to={`/app/mapas?fur=${encodeURIComponent(record.furCode)}`} className="btn btn--navy fur-detail__map-btn">
            Ver en Mapa Interactivo
          </Link>

          <h4 className="fur-detail__quality-head">Calidad del Dato</h4>
          <div className="fur-detail__quality">
            <div
              className="fur-detail__quality-ring"
              style={{
                background: `conic-gradient(var(--color-gold-500) ${record.dataQualityPercent}%, var(--color-gray-200) 0)`,
              }}
            >
              <span>{record.dataQualityPercent}%</span>
            </div>
            <span>Madurez del activo</span>
          </div>
        </div>
      </div>

      <div className="fur-detail__networks panel">
        <h3>
          <Network size={15} /> 10 Redes Transversales del Ecosistema FUR
        </h3>
        <div className="fur-detail__networks-grid">
          {DOMAIN_LIST.map((d) => (
            <span
              key={d.code}
              className={"fur-net-chip" + (d.code === domain.code ? " fur-net-chip--active" : "")}
              style={{ ["--net-color" as string]: d.color }}
            >
              <NetworkIcon domain={d.code} size={15} color={d.code === domain.code ? "#fff" : d.color} />
              {d.shortLabel}
            </span>
          ))}
        </div>
      </div>

      <div className="fur-detail__tabs">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            className={"fur-detail__tab" + (tab === t ? " fur-detail__tab--active" : "")}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Resumen" && (
        <>
        <div className="fur-detail__grid">
          <section className="panel">
            <h3>Bloques Comunes (Información Maestra)</h3>
            <div className="fur-common-grid">
              <CommonBlock n={1} title="Identidad" text={`Código, nombre y estado únicos. Versión ${record.version}.`} />
              <CommonBlock n={2} title="Jerarquía y ubicación" text={`${record.zone} · ${record.area} · ${record.process}`} />
              <CommonBlock n={3} title="Clasificación" text={record.family} />
              <CommonBlock n={4} title="Responsabilidad" text={`Proveedor / fabricante: ${record.manufacturer}`} />
              <CommonBlock n={5} title="Ciclo de vida" text={`Alta el ${record.createdAt}`} />
              <CommonBlock n={6} title="Documentación" text={`${record.documents.length} documentos vinculados`} />
              <CommonBlock n={7} title="Relaciones" text={`${record.relations.length} relaciones transversales`} />
              <CommonBlock n={8} title="Auditoría" text="Historial de cambios trazable" />
              <CommonBlock n={9} title="Búsqueda / alias" text={`${record.furCode} · ${record.model}`} />
            </div>
          </section>

          <section className="panel">
            <h3>
              <ShoppingCart size={15} /> Bloque Comercial / Sourcing
            </h3>
            <dl className="fur-kv">
              <div><dt>Fabricante</dt><dd>{record.manufacturer}</dd></div>
              <div><dt>Modelo</dt><dd>{record.model}</dd></div>
              <div><dt>N° de serie</dt><dd>{record.serial}</dd></div>
              <div><dt>Proveedor</dt><dd>{record.supplier}</dd></div>
            </dl>
          </section>
        </div>
        {domain.fullTabs && <TabsRoadmapPanel domainCode={domain.shortLabel} fullTabs={domain.fullTabs} />}
        </>
      )}

      {tab === "Técnico" && (
        <section className="panel">
          <h3>Bloque Técnico Especializado — {domain.shortLabel}</h3>
          <table className="fur-table">
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Valor</th>
                <th>Unidad</th>
                <th>Condición</th>
                <th>Madurez</th>
              </tr>
            </thead>
            <tbody>
              {record.technicalFields.map((f) => (
                <tr key={f.label}>
                  <td>{f.label}</td>
                  <td>{f.value}</td>
                  <td>{f.unit}</td>
                  <td><ConditionBadge condition={f.condition} /></td>
                  <td><MaturityBadge maturity={f.maturity} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "Relaciones" && (
        <section className="panel">
          <h3>Relaciones Transversales</h3>
          <table className="fur-table">
            <thead>
              <tr>
                <th>Tipo de relación</th>
                <th>FUR destino</th>
                <th>Cardinalidad</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {record.relations.map((r) => (
                <tr key={r.type + r.target}>
                  <td>{r.type}</td>
                  <td>
                    {knownCodes.has(r.target) ? (
                      <Link to={`/app/fur/${r.target}`} className="fur-table__link">
                        {r.targetLabel} <span>({r.target})</span>
                      </Link>
                    ) : (
                      <span className="fur-table__external" title="Registro de un sistema externo (CMMS, SCADA, NMS…) que aún no tiene ficha FUR">
                        {r.targetLabel} <span>({r.target})</span>
                        <em>referencia externa</em>
                      </span>
                    )}
                  </td>
                  <td>{r.cardinality}</td>
                  <td>{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "Documentos" && (
        <section className="panel">
          <h3>
            <FileText size={15} /> Documentos y Evidencia
          </h3>
          <table className="fur-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Versión</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {record.documents.map((d) => (
                <tr key={d.name}>
                  <td>{d.type}</td>
                  <td>{d.name}</td>
                  <td>{d.version}</td>
                  <td>
                    <span className={"badge badge--sm " + (d.status === "Vigente" ? "badge--success" : "badge--warning")}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "Calidad del Dato" && (
        <section className="panel">
          <h3>
            <ShieldCheck size={15} /> Calidad del Dato y Pendientes TBC / HOLD
          </h3>
          <div className="fur-quality-detail">
            <div
              className="fur-detail__quality-ring fur-detail__quality-ring--lg"
              style={{
                background: `conic-gradient(var(--color-gold-500) ${record.dataQualityPercent}%, var(--color-gray-200) 0)`,
              }}
            >
              <span>{record.dataQualityPercent}%</span>
            </div>
            <ul className="fur-hold-list">
              {(editing && draft ? draft.holds : record.holds).map((h, i) => (
                <li key={`${h.description}-${i}`} className={`fur-hold-list__item fur-hold-list__item--${h.level.toLowerCase()}`}>
                  <AlertCircle size={14} />
                  <span className="fur-hold-list__level">{h.level}</span>
                  {h.description}
                  {editing && draft && (
                    <button
                      type="button"
                      className="fur-hold-list__remove"
                      aria-label="Quitar pendiente"
                      onClick={() => setDraft({ ...draft, holds: draft.holds.filter((_, j) => j !== i) })}
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </li>
              ))}
              {editing && draft && draft.holds.length === 0 && (
                <li className="fur-hold-list__empty">Sin pendientes TBC/HOLD.</li>
              )}
            </ul>
            {editing && draft && <AddHoldForm onAdd={(hold) => setDraft({ ...draft, holds: [...draft.holds, hold] })} />}
          </div>
          <ChecklistPanel record={editing && draft ? { ...record, holds: draft.holds } : record} />
        </section>
      )}

      {tab === "Historial" && <AuditTab furCode={record.furCode} />}
    </div>
  );
}

function FurDetailSkeleton() {
  return (
    <div className="fur-detail" aria-busy="true" aria-live="polite">
      <div className="fur-detail__header panel fur-skeleton">
        <div className="skeleton-block" style={{ height: 120 }} />
        <div className="skeleton-block" style={{ height: 160 }} />
        <div className="skeleton-block" style={{ height: 160 }} />
      </div>
      <div className="panel fur-skeleton">
        <div className="skeleton-block" style={{ height: 60 }} />
      </div>
      <div className="skeleton-block" style={{ height: 260 }} />
    </div>
  );
}

function CommonBlock({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <div className="fur-common-block">
      <span className="fur-common-block__n">{n}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ChecklistPanel({ record }: { record: FurRecord }) {
  const items = [
    { label: "Código único y formato correcto", ok: /^FUR-[A-Z]+-/.test(record.furCode) },
    { label: "Claves y relaciones definidas", ok: record.relations.length > 0 },
    { label: "Bloque técnico completo", ok: record.technicalFields.length > 0 },
    { label: "Documentos obligatorios", ok: record.documents.length > 0 },
    { label: "Madurez de datos asignada", ok: record.maturity !== "D0" },
    { label: "Sin duplicidad de maestros nativos", ok: true },
    { label: "Lista para operación", ok: record.holds.every((h) => h.level !== "HOLD") },
  ];
  const allOk = items.every((i) => i.ok);

  return (
    <div className="fur-checklist-panel">
      <h4>
        <ListChecks size={14} /> Checklist de Validación
      </h4>
      <ul className="fur-checklist-panel__list">
        {items.map((i) => (
          <li key={i.label} className={i.ok ? "fur-checklist-panel__item--ok" : "fur-checklist-panel__item--pending"}>
            {i.ok ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
            {i.label}
          </li>
        ))}
      </ul>
      <div className={`fur-checklist ${allOk ? "" : "fur-checklist--pending"}`}>
        <CheckCircle2 size={16} />
        {allOk ? "FUR apta para el ecosistema" : "FUR con pendientes — requiere cierre de HOLD antes de certificación"}
      </div>
    </div>
  );
}

function TabsRoadmapPanel({ domainCode, fullTabs }: { domainCode: string; fullTabs: string[] }) {
  return (
    <div className="fur-tabs-roadmap">
      <h4>Pestañas completas de {domainCode} (roadmap)</h4>
      <p>
        Este prototipo implementa el núcleo común de la ficha (Resumen, Técnico, Relaciones,
        Documentos, Calidad del Dato, Historial). El megadocumento REV.01 define pestañas
        adicionales específicas de esta red, a construir en la oleada correspondiente:
      </p>
      <div className="fur-tabs-roadmap__chips">
        {fullTabs.map((t) => (
          <span key={t} className="fur-tabs-roadmap__chip">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function AddHoldForm({ onAdd }: { onAdd: (hold: FurHold) => void }) {
  const [level, setLevel] = useState<"TBC" | "HOLD">("TBC");
  const [description, setDescription] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    onAdd({ level, description: description.trim() });
    setDescription("");
  }

  return (
    <form className="fur-add-hold" onSubmit={submit}>
      <select value={level} onChange={(e) => setLevel(e.target.value as "TBC" | "HOLD")}>
        <option value="TBC">TBC</option>
        <option value="HOLD">HOLD</option>
      </select>
      <input
        placeholder="Describe el pendiente…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="btn btn--navy">
        <Plus size={14} /> Agregar
      </button>
    </form>
  );
}

function AuditTab({ furCode }: { furCode: string }) {
  const [events, setEvents] = useState<AuditEvent[] | null>(null);

  useEffect(() => {
    let active = true;
    fetchAuditEvents(furCode).then((e) => {
      if (active) setEvents(e);
    });
    return () => {
      active = false;
    };
  }, [furCode]);

  return (
    <section className="panel">
      <h3>
        <History size={15} /> Historial / Auditoría
      </h3>
      {!events ? (
        <div className="skeleton-block" style={{ height: 120 }} aria-busy="true" />
      ) : events.length === 0 ? (
        <p className="fur-timeline__empty">
          Sin eventos de auditoría todavía. Los cambios que hagas en "Editar" o en Inventario
          quedan registrados aquí de verdad (tabla <code>AuditEvent</code> en PostgreSQL).
        </p>
      ) : (
        <ul className="fur-timeline">
          {events.map((e) => (
            <li key={e.id}>
              <span className="fur-timeline__dot" />
              <div>
                <strong>{e.eventType}</strong>
                <span>{new Date(e.createdAt).toLocaleString("es")} · {e.description}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
