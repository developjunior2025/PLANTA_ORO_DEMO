import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderOpen, Plus, Trash2, X } from "lucide-react";
import { createBudgetProject, deleteBudgetProject, fetchBudgetProjects, ApiError } from "../../shared/api";
import type { BudgetProjectSummary } from "../../shared/budgetData";

const EMPTY = { code: "", name: "", currency: "USD" };

interface BudgetTabProps {
  lockPlantCode: string;
}

/** CRUD real de proyectos de presupuesto (LuloWin) acotado a la planta activa — Panel Planta.
 * El detalle de capítulos/partidas/APU se ve en /app/presupuestos/:code (solo lectura por ahora). */
export function BudgetTab({ lockPlantCode }: BudgetTabProps) {
  const [projects, setProjects] = useState<BudgetProjectSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  function load() {
    fetchBudgetProjects(lockPlantCode)
      .then(setProjects)
      .catch(() => setProjects([]));
  }
  useEffect(load, [lockPlantCode]);

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createBudgetProject({
        code: form.code.trim().toUpperCase(),
        plantCode: lockPlantCode,
        name: form.name.trim(),
        currency: form.currency.trim() || "USD",
      });
      setForm(EMPTY);
      setCreating(false);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear el proyecto de presupuesto.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(code: string) {
    if (!confirm(`¿Eliminar el proyecto de presupuesto ${code}? Se borran también sus capítulos, partidas y recursos. No se puede deshacer.`)) return;
    setError(null);
    try {
      await deleteBudgetProject(code);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar el proyecto.");
    }
  }

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <p className="admin-tab__hint" style={{ margin: 0 }}>
          Proyectos de presupuesto tipo LuloWin de esta planta. El detalle de capítulos, partidas y APU
          se ve en su página propia.
        </p>
        <button type="button" className="btn btn--navy" onClick={() => setCreating((c) => !c)}>
          {creating ? <X size={14} /> : <Plus size={14} />} {creating ? "Cancelar" : "Nuevo proyecto"}
        </button>
      </div>

      {creating && (
        <form className="panel admin-form" onSubmit={submitCreate}>
          <div className="admin-form__grid">
            <label>
              Código *
              <input required value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} placeholder="LW-PROY-002" />
            </label>
            <label>
              Nombre *
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ampliación circuito de molienda" />
            </label>
            <label>
              Moneda *
              <input required value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value.toUpperCase() }))} placeholder="USD" />
            </label>
          </div>
          {error && <div className="admin-form__error">{error}</div>}
          <div className="admin-form__actions">
            <button type="submit" className="btn btn--gold" disabled={saving}>
              Crear proyecto
            </button>
          </div>
        </form>
      )}

      <div className="panel">
        {!projects ? (
          <div className="skeleton-block" style={{ height: 160 }} aria-busy="true" />
        ) : projects.length === 0 ? (
          <p className="dash-empty">Sin proyectos de presupuesto para esta planta.</p>
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Moneda</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.code}>
                  <td>{p.code}</td>
                  <td className="admin__role">{p.name}</td>
                  <td>{p.currency}</td>
                  <td className="admin-tab__row-actions">
                    <Link to={`/app/presupuestos/${p.code}`} className="chip-btn" title="Ver detalle">
                      <FolderOpen size={13} />
                    </Link>
                    <button type="button" className="chip-btn" onClick={() => remove(p.code)} title="Eliminar">
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
