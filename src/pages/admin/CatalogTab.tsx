import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import {
  createCatalogEntity,
  deleteCatalogEntity,
  fetchCatalog,
  fetchPlants,
  updateCatalogEntity,
  ApiError,
  type CreateCatalogEntityInput,
  type Plant,
} from "../../shared/api";
import type { CatalogEntity } from "../../shared/types";
import { DOMAIN_LIST } from "../../shared/domains";
import { STAGES } from "../../shared/stages";
import { matchesPlantOrGlobal } from "../../shared/plantStore";

const ENTITY_TYPES = [
  "Activos Físicos",
  "Procesos",
  "Personas",
  "Servicio",
  "Proveedor",
  "Curso (LMS)",
  "Documento",
  "Inventario (WMS)",
  "Laboratorio",
  "Dashboard",
  "Red Transversal",
  "Sitio / Mapa",
];
const STATUSES = ["Operativo", "Disponible", "Activo", "Certificado", "En proyecto", "Vigente"];

interface FormState {
  furCode: string;
  entityType: string;
  domain: string;
  plantCode: string;
  zone: string;
  title: string;
  subtitle: string;
  meta: string;
  status: string;
  price: string;
  rating: string;
}

const EMPTY: FormState = {
  furCode: "",
  entityType: ENTITY_TYPES[0],
  domain: "",
  plantCode: "",
  zone: "",
  title: "",
  subtitle: "",
  meta: "",
  status: STATUSES[0],
  price: "",
  rating: "",
};

function toBaseInput(f: FormState) {
  return {
    entityType: f.entityType,
    domain: (f.domain || undefined) as CreateCatalogEntityInput["domain"],
    plantCode: f.plantCode || undefined,
    zone: f.zone || undefined,
    title: f.title.trim(),
    subtitle: f.subtitle.trim(),
    meta: f.meta
      .split(",")
      .map((m) => m.trim())
      .filter(Boolean),
    status: f.status,
    price: f.price.trim() || undefined,
    rating: f.rating ? Number(f.rating) : undefined,
  };
}

function toInput(f: FormState): CreateCatalogEntityInput {
  return { furCode: f.furCode.trim().toUpperCase(), ...toBaseInput(f) };
}

function toUpdateInput(f: FormState) {
  return toBaseInput(f);
}

function fromEntity(e: CatalogEntity): FormState {
  return {
    furCode: e.furCode,
    entityType: e.entityType,
    domain: e.domain ?? "",
    plantCode: e.plantCode ?? "",
    zone: e.zone ?? "",
    title: e.title,
    subtitle: e.subtitle,
    meta: e.meta.join(", "),
    status: e.status,
    price: e.price ?? "",
    rating: e.rating != null ? String(e.rating) : "",
  };
}

function EntityFormFields({
  f,
  setF,
  editing,
  plants,
  lockPlantCode,
}: {
  f: FormState;
  setF: (u: FormState) => void;
  editing: boolean;
  plants: Plant[];
  lockPlantCode?: string;
}) {
  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF({ ...f, [k]: v });
  return (
    <div className="admin-form__grid">
      <label>
        Código *
        <input required disabled={editing} value={f.furCode} onChange={(e) => set("furCode", e.target.value.toUpperCase())} placeholder="FUR-SER-000200" />
      </label>
      <label>
        Tipo *
        <select required value={f.entityType} onChange={(e) => set("entityType", e.target.value)}>
          {ENTITY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      {!lockPlantCode && (
        <label>
          Planta (opcional)
          <select value={f.plantCode} onChange={(e) => set("plantCode", e.target.value)}>
            <option value="">Sin planta (global)</option>
            {plants.map((p) => (
              <option key={p.code} value={p.code}>{p.code} — {p.name}</option>
            ))}
          </select>
        </label>
      )}
      <label>
        Red (opcional)
        <select value={f.domain} onChange={(e) => set("domain", e.target.value)}>
          <option value="">Sin red</option>
          {DOMAIN_LIST.map((d) => (
            <option key={d.code} value={d.code}>{d.shortLabel} — {d.label}</option>
          ))}
        </select>
      </label>
      <label>
        Etapa (opcional)
        <select value={f.zone} onChange={(e) => set("zone", e.target.value)}>
          <option value="">Sin etapa</option>
          {STAGES.map((s) => (
            <option key={s.code} value={s.code}>D{s.code} — {s.label}</option>
          ))}
        </select>
      </label>
      <label className="admin-form__span2">
        Título *
        <input required value={f.title} onChange={(e) => set("title", e.target.value)} placeholder="Nombre visible en el catálogo" />
      </label>
      <label className="admin-form__span2">
        Subtítulo *
        <input required value={f.subtitle} onChange={(e) => set("subtitle", e.target.value)} placeholder='Ej: "Proveedor: ABB Perú S.A."' />
      </label>
      <label className="admin-form__span2">
        Etiquetas (separadas por coma)
        <input value={f.meta} onChange={(e) => set("meta", e.target.value)} placeholder="Ej: Mantenimiento, RCM, Vibraciones" />
      </label>
      <label>
        Estado *
        <select required value={f.status} onChange={(e) => set("status", e.target.value)}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <label>
        Precio (opcional)
        <input value={f.price} onChange={(e) => set("price", e.target.value)} placeholder="Desde USD 900" />
      </label>
      <label>
        Calificación 0–5 (opcional)
        <input type="number" min={0} max={5} step={0.1} value={f.rating} onChange={(e) => set("rating", e.target.value)} />
      </label>
    </div>
  );
}

interface CatalogTabProps {
  /** Fija la planta (crea entidades nuevas con esta planta, oculta el selector, muestra también
   * las entidades globales sin planta) — uso: pestaña "Catálogo" del Panel Planta. */
  lockPlantCode?: string;
}

/** CRUD real de entidades del catálogo (proveedores, servicios, cursos, documentos...): hoy solo existía
 * para fichas FUR (CreateFurPage); el resto del catálogo era de solo lectura. */
export function CatalogTab({ lockPlantCode }: CatalogTabProps = {}) {
  const [entities, setEntities] = useState<CatalogEntity[] | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FormState>({ ...EMPTY, plantCode: lockPlantCode ?? "" });
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function load() {
    fetchCatalog()
      .then(setEntities)
      .catch(() => setEntities([]));
  }
  useEffect(load, []);
  useEffect(() => {
    if (!lockPlantCode) fetchPlants().then(setPlants).catch(() => {});
  }, [lockPlantCode]);

  const filtered = useMemo(
    () =>
      (entities ?? []).filter(
        (e) =>
          (!lockPlantCode || matchesPlantOrGlobal(e, lockPlantCode)) &&
          (!query || e.title.toLowerCase().includes(query.toLowerCase()) || e.furCode.toLowerCase().includes(query.toLowerCase()))
      ),
    [entities, query, lockPlantCode]
  );

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createCatalogEntity(toInput(form));
      setForm({ ...EMPTY, plantCode: lockPlantCode ?? "" });
      setCreating(false);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear la entidad.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(e: CatalogEntity) {
    setEditingCode(e.furCode);
    setEditForm(fromEntity(e));
    setError(null);
  }

  async function submitEdit(furCode: string, ev: React.FormEvent) {
    ev.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateCatalogEntity(furCode, toUpdateInput(editForm));
      setEditingCode(null);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo actualizar la entidad.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(furCode: string) {
    if (!confirm(`¿Eliminar ${furCode} del catálogo? No se puede deshacer.`)) return;
    setError(null);
    try {
      await deleteCatalogEntity(furCode);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar la entidad.");
    }
  }

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <input
          type="search"
          placeholder="Buscar por código o título…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" className="btn btn--navy" onClick={() => setCreating((c) => !c)}>
          {creating ? <X size={14} /> : <Plus size={14} />} {creating ? "Cancelar" : "Nueva entidad"}
        </button>
      </div>

      {creating && (
        <form className="panel admin-form" onSubmit={submitCreate}>
          <EntityFormFields f={form} setF={setForm} editing={false} plants={plants} lockPlantCode={lockPlantCode} />
          {error && <div className="admin-form__error">{error}</div>}
          <div className="admin-form__actions">
            <button type="submit" className="btn btn--gold" disabled={saving}>
              Crear entidad
            </button>
          </div>
        </form>
      )}

      <div className="panel">
        {!entities ? (
          <div className="skeleton-block" style={{ height: 240 }} aria-busy="true" />
        ) : filtered.length === 0 ? (
          <p className="dash-empty">Sin resultados.</p>
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Tipo</th>
                <th>Título</th>
                {!lockPlantCode && <th>Planta</th>}
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) =>
                editingCode === e.furCode ? (
                  <tr key={e.furCode}>
                    <td colSpan={lockPlantCode ? 5 : 6}>
                      <form className="panel admin-form" onSubmit={(ev) => submitEdit(e.furCode, ev)}>
                        <EntityFormFields f={editForm} setF={setEditForm} editing plants={plants} lockPlantCode={lockPlantCode} />
                        {error && <div className="admin-form__error">{error}</div>}
                        <div className="admin-form__actions">
                          <button type="button" className="chip-btn" onClick={() => setEditingCode(null)}>
                            Cancelar
                          </button>
                          <button type="submit" className="btn btn--gold" disabled={saving}>
                            Guardar
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                ) : (
                  <tr key={e.furCode}>
                    <td>
                      <span className="dash-sub">{e.furCode}</span>
                    </td>
                    <td>{e.entityType}</td>
                    <td className="admin__role">{e.title}</td>
                    {!lockPlantCode && <td>{plants.find((p) => p.code === e.plantCode)?.name ?? (e.plantCode ?? "—")}</td>}
                    <td>{e.status}</td>
                    <td className="admin-tab__row-actions">
                      <button type="button" className="chip-btn" onClick={() => startEdit(e)} title="Editar">
                        <Pencil size={13} />
                      </button>
                      <button type="button" className="chip-btn" onClick={() => remove(e.furCode)} title="Eliminar">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
