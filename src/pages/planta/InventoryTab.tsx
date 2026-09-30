import { useEffect, useState } from "react";
import { ArrowLeftRight, Pencil, Plus, Trash2, X } from "lucide-react";
import "../InventoryPage.css";
import {
  createStockItem,
  deleteStockItem,
  fetchStock,
  registerStockMovement,
  updateStockItem,
  ApiError,
} from "../../shared/api";
import type { StockItem } from "../../shared/wmsData";

const EMPTY = { sku: "", name: "", category: "", warehouse: "", location: "", qty: "", uom: "", reorderPoint: "", linkedFur: "" };
type EditState = { name: string; category: string; warehouse: string; location: string; uom: string; reorderPoint: string; linkedFur: string };

interface InventoryTabProps {
  lockPlantCode: string;
}

/** CRUD real de inventario (WMS) acotado a la planta activa — Panel Planta. */
export function InventoryTab({ lockPlantCode }: InventoryTabProps) {
  const [items, setItems] = useState<StockItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editingSku, setEditingSku] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditState>({ name: "", category: "", warehouse: "", location: "", uom: "", reorderPoint: "", linkedFur: "" });
  const [movementSku, setMovementSku] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function load() {
    fetchStock(lockPlantCode)
      .then(setItems)
      .catch(() => setItems([]));
  }
  useEffect(load, [lockPlantCode]);

  async function submitCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await createStockItem({
        sku: form.sku.trim().toUpperCase(),
        plantCode: lockPlantCode,
        name: form.name.trim(),
        category: form.category.trim(),
        warehouse: form.warehouse.trim(),
        location: form.location.trim(),
        qty: Number(form.qty) || 0,
        uom: form.uom.trim(),
        reorderPoint: Number(form.reorderPoint) || 0,
        linkedFur: form.linkedFur.trim() || undefined,
      });
      setForm(EMPTY);
      setCreating(false);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear el ítem.");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(i: StockItem) {
    setEditingSku(i.sku);
    setEditForm({
      name: i.name,
      category: i.category,
      warehouse: i.warehouse,
      location: i.location,
      uom: i.uom,
      reorderPoint: String(i.reorderPoint),
      linkedFur: i.linkedFur ?? "",
    });
    setError(null);
  }

  async function submitEdit(sku: string, e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await updateStockItem(sku, {
        name: editForm.name.trim(),
        category: editForm.category.trim(),
        warehouse: editForm.warehouse.trim(),
        location: editForm.location.trim(),
        uom: editForm.uom.trim(),
        reorderPoint: Number(editForm.reorderPoint) || 0,
        linkedFur: editForm.linkedFur.trim() || undefined,
      });
      setEditingSku(null);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo actualizar el ítem.");
    } finally {
      setSaving(false);
    }
  }

  async function remove(sku: string) {
    if (!confirm(`¿Eliminar ${sku} del inventario? No se puede deshacer.`)) return;
    setError(null);
    try {
      await deleteStockItem(sku);
      load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo eliminar el ítem.");
    }
  }

  return (
    <div className="admin-tab">
      <div className="admin-tab__toolbar">
        <p className="admin-tab__hint" style={{ margin: 0 }}>
          Stock por almacén y ubicación de esta planta. En Odoo 19 nativo corresponde a stock.warehouse /
          stock.location / stock.quant.
        </p>
        <button type="button" className="btn btn--navy" onClick={() => setCreating((c) => !c)}>
          {creating ? <X size={14} /> : <Plus size={14} />} {creating ? "Cancelar" : "Nuevo ítem"}
        </button>
      </div>

      {creating && (
        <form className="panel admin-form" onSubmit={submitCreate}>
          <div className="admin-form__grid">
            <label>
              SKU *
              <input required value={form.sku} onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value.toUpperCase() }))} placeholder="WMS-000100" />
            </label>
            <label>
              Nombre *
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Liner acero al manganeso" />
            </label>
            <label>
              Categoría *
              <input required value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Repuestos mecánicos" />
            </label>
            <label>
              Almacén *
              <input required value={form.warehouse} onChange={(e) => setForm((f) => ({ ...f, warehouse: e.target.value }))} placeholder="Almacén Central" />
            </label>
            <label>
              Ubicación *
              <input required value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="Estante A-3" />
            </label>
            <label>
              Cantidad inicial *
              <input required type="number" min={0} step="any" value={form.qty} onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))} />
            </label>
            <label>
              Unidad *
              <input required value={form.uom} onChange={(e) => setForm((f) => ({ ...f, uom: e.target.value }))} placeholder="und" />
            </label>
            <label>
              Punto de reorden *
              <input required type="number" min={0} step="any" value={form.reorderPoint} onChange={(e) => setForm((f) => ({ ...f, reorderPoint: e.target.value }))} />
            </label>
            <label>
              FUR vinculado (opcional)
              <input value={form.linkedFur} onChange={(e) => setForm((f) => ({ ...f, linkedFur: e.target.value.toUpperCase() }))} placeholder="FUR-MNT-…" />
            </label>
          </div>
          {error && <div className="admin-form__error">{error}</div>}
          <div className="admin-form__actions">
            <button type="submit" className="btn btn--gold" disabled={saving}>
              Crear ítem
            </button>
          </div>
        </form>
      )}

      <div className="panel">
        {!items ? (
          <div className="skeleton-block" style={{ height: 220 }} aria-busy="true" />
        ) : items.length === 0 ? (
          <p className="dash-empty">Sin ítems de inventario para esta planta.</p>
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Almacén</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) =>
                editingSku === i.sku ? (
                  <tr key={i.sku}>
                    <td colSpan={6}>
                      <form className="panel admin-form" onSubmit={(e) => submitEdit(i.sku, e)}>
                        <div className="admin-form__grid">
                          <label>
                            Nombre *
                            <input required value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))} />
                          </label>
                          <label>
                            Categoría *
                            <input required value={editForm.category} onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value }))} />
                          </label>
                          <label>
                            Almacén *
                            <input required value={editForm.warehouse} onChange={(e) => setEditForm((f) => ({ ...f, warehouse: e.target.value }))} />
                          </label>
                          <label>
                            Ubicación *
                            <input required value={editForm.location} onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))} />
                          </label>
                          <label>
                            Unidad *
                            <input required value={editForm.uom} onChange={(e) => setEditForm((f) => ({ ...f, uom: e.target.value }))} />
                          </label>
                          <label>
                            Punto de reorden *
                            <input required type="number" min={0} step="any" value={editForm.reorderPoint} onChange={(e) => setEditForm((f) => ({ ...f, reorderPoint: e.target.value }))} />
                          </label>
                          <label>
                            FUR vinculado (opcional)
                            <input value={editForm.linkedFur} onChange={(e) => setEditForm((f) => ({ ...f, linkedFur: e.target.value.toUpperCase() }))} />
                          </label>
                        </div>
                        {error && <div className="admin-form__error">{error}</div>}
                        <div className="admin-form__actions">
                          <button type="button" className="chip-btn" onClick={() => setEditingSku(null)}>
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
                  <>
                    <tr key={i.sku}>
                      <td>{i.sku}</td>
                      <td className="admin__role">{i.name}</td>
                      <td>{i.category}</td>
                      <td>{i.warehouse} · {i.location}</td>
                      <td className={i.qty < i.reorderPoint ? "inventory__qty--low" : undefined}>
                        {i.qty.toLocaleString()} {i.uom}
                      </td>
                      <td className="admin-tab__row-actions">
                        <button type="button" className="chip-btn" onClick={() => setMovementSku(movementSku === i.sku ? null : i.sku)} title="Movimiento">
                          <ArrowLeftRight size={13} />
                        </button>
                        <button type="button" className="chip-btn" onClick={() => startEdit(i)} title="Editar">
                          <Pencil size={13} />
                        </button>
                        <button type="button" className="chip-btn" onClick={() => remove(i.sku)} title="Eliminar">
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                    {movementSku === i.sku && (
                      <tr>
                        <td colSpan={6}>
                          <MovementForm item={i} onSaved={(updated) => { setItems((prev) => prev && prev.map((it) => (it.sku === updated.sku ? updated : it))); setMovementSku(null); }} onCancel={() => setMovementSku(null)} />
                        </td>
                      </tr>
                    )}
                  </>
                )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function MovementForm({ item, onSaved, onCancel }: { item: StockItem; onSaved: (updated: StockItem) => void; onCancel: () => void }) {
  const [reason, setReason] = useState<"Entrada" | "Salida" | "Ajuste">("Entrada");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(amount);
    if (!value || value <= 0) {
      setError("Ingresa una cantidad mayor a 0.");
      return;
    }
    const delta = reason === "Salida" ? -value : value;
    setSaving(true);
    setError(null);
    try {
      const updated = await registerStockMovement(item.sku, delta, reason, note || undefined);
      onSaved(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo registrar el movimiento.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="inventory__movement-form" onSubmit={submit}>
      <span className="inventory__movement-current">
        Stock actual: <strong>{item.qty.toLocaleString()} {item.uom}</strong>
      </span>
      <select value={reason} onChange={(e) => setReason(e.target.value as typeof reason)}>
        <option value="Entrada">Entrada</option>
        <option value="Salida">Salida</option>
        <option value="Ajuste">Ajuste (+)</option>
      </select>
      <input type="number" min="0" step="any" placeholder={`Cantidad (${item.uom})`} value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input placeholder="Nota (opcional)" value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit" className="btn btn--gold" disabled={saving}>
        Registrar
      </button>
      <button type="button" className="inventory__movement-cancel" onClick={onCancel} disabled={saving}>
        Cancelar
      </button>
      {error && <span className="inventory__movement-error">{error}</span>}
    </form>
  );
}
