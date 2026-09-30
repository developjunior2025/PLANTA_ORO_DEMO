import { useEffect, useState } from "react";
import { Factory, Pencil, Plus, Trash2, X } from "lucide-react";
import { createPlant, deletePlant, fetchPlants, updatePlant, ApiError, type Plant } from "../../shared/api";

const EMPTY = { code: "", name: "", location: "" };

export function PlantsTab() {
  const [plants, setPlants] = useState<Plant[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: "", location: "" });
  const [saving, setSaving] = useState(false);

  function load() {
    fetchPlants()
      .then(setPlants)
      .catch(() => setPlants([]));
  }
  useEffect(load, []);

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createPlant(form);
      setForm(EMPTY);
      setCreating(false);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear la planta.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(p: Plant) {
    setEditingCode(p.code);
    setEditForm({ name: p.name, location: p.location });
    setError(null);
  }

  async function submitEdit(code: string, e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updatePlant(code, editForm);
      setEditingCode(null);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo actualizar la planta.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(code: string) {
    setError(null);
    try {
      await deletePlant(code);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar la planta.");
    }
  }

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <p className="admin-tab__hint" style={{ margin: 0 }}>
          Las fichas FUR y entidades del catálogo se agrupan por planta (selector del header). Una planta
          con fichas registradas no se puede eliminar, para no dejar datos huérfanos.
        </p>
        <button type="button" className="btn btn--navy" onClick={() => setCreating((c) => !c)}>
          {creating ? <X size={14} /> : <Plus size={14} />} {creating ? "Cancelar" : "Nueva planta"}
        </button>
      </div>

      {creating && (
        <form className="panel admin-form" onSubmit={submitCreate}>
          <div className="admin-form__grid">
            <label>
              Código *
              <input
                required
                placeholder="PB03"
                value={form.code}
                onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
              />
            </label>
            <label>
              Nombre *
              <input
                required
                placeholder="Planta Los Andes"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>
            <label className="admin-form__span2">
              Ubicación *
              <input
                required
                placeholder="Ej: Cerro Alto, Antioquia, Colombia"
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </label>
          </div>
          {error && <div className="admin-form__error">{error}</div>}
          <div className="admin-form__actions">
            <button type="submit" className="btn btn--gold" disabled={saving}>
              Crear planta
            </button>
          </div>
        </form>
      )}

      <div className="panel">
        {!plants ? (
          <div className="skeleton-block" style={{ height: 160 }} aria-busy="true" />
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Ubicación</th>
                <th>Fichas FUR</th>
                <th>Catálogo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {plants.map((p) =>
                editingCode === p.code ? (
                  <tr key={p.code}>
                    <td colSpan={6}>
                      <form className="admin-form admin-form--inline" onSubmit={(e) => submitEdit(p.code, e)}>
                        <strong>{p.code}</strong>
                        <input
                          required
                          value={editForm.name}
                          onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Nombre"
                        />
                        <input
                          required
                          value={editForm.location}
                          onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                          placeholder="Ubicación"
                        />
                        <button type="submit" className="btn btn--gold" disabled={saving}>
                          Guardar
                        </button>
                        <button type="button" className="chip-btn" onClick={() => setEditingCode(null)}>
                          Cancelar
                        </button>
                      </form>
                      {error && <div className="admin-form__error">{error}</div>}
                    </td>
                  </tr>
                ) : (
                  <tr key={p.code}>
                    <td>
                      <span className="admin__role">
                        <Factory size={13} /> {p.code}
                      </span>
                    </td>
                    <td>{p.name}</td>
                    <td>{p.location}</td>
                    <td>{p.furCount ?? 0}</td>
                    <td>{p.catalogCount ?? 0}</td>
                    <td className="admin-tab__row-actions">
                      <button type="button" className="chip-btn" onClick={() => startEdit(p)} title="Editar">
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        className="chip-btn"
                        onClick={() => remove(p.code)}
                        disabled={(p.furCount ?? 0) > 0 || (p.catalogCount ?? 0) > 0}
                        title={
                          (p.furCount ?? 0) > 0 || (p.catalogCount ?? 0) > 0
                            ? "No se puede eliminar: tiene fichas registradas"
                            : "Eliminar"
                        }
                      >
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
