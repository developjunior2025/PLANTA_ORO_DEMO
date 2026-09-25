import { Fragment, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowLeftRight, Boxes, Loader2, PackageSearch, Warehouse } from "lucide-react";
import "./InventoryPage.css";
import { fetchStock, registerStockMovement, ApiError } from "../shared/api";
import { StatCard } from "../components/ui/StatCard";
import type { StockItem } from "../shared/wmsData";

export function InventoryPage() {
  const [items, setItems] = useState<StockItem[] | null>(null);
  const [query, setQuery] = useState("");
  const [movementSku, setMovementSku] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchStock().then((r) => {
      if (active) setItems(r);
    });
    return () => {
      active = false;
    };
  }, []);

  const belowReorder = useMemo(() => (items ?? []).filter((i) => i.qty < i.reorderPoint), [items]);
  const warehouses = useMemo(() => new Set((items ?? []).map((i) => i.warehouse)).size, [items]);
  const filtered = useMemo(
    () =>
      (items ?? []).filter(
        (i) =>
          !query ||
          i.name.toLowerCase().includes(query.toLowerCase()) ||
          i.sku.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  function onMovementSaved(updated: StockItem) {
    setItems((prev) => (prev ? prev.map((i) => (i.sku === updated.sku ? updated : i)) : prev));
    setMovementSku(null);
  }

  return (
    <div className="inventory container">
      <div className="inventory__head">
        <h1>WMS / Inventario</h1>
        <p>
          Stock por almacén y ubicación (Etapa 9.1). En Odoo 19 nativo corresponde a
          <code> stock.warehouse / stock.location / stock.quant / stock.move</code> — FUR no
          duplica estas tablas, solo referencia el repuesto crítico desde la ficha del activo.
        </p>
      </div>

      <div className="inventory__stats">
        <StatCard icon={Boxes} label="SKU registrados" value={items ? String(items.length) : "…"} />
        <StatCard icon={Warehouse} label="Almacenes" value={items ? String(warehouses) : "…"} />
        <StatCard
          icon={AlertTriangle}
          label="Bajo punto de reorden"
          value={items ? String(belowReorder.length) : "…"}
          tone={belowReorder.length > 0 ? "warning" : "success"}
        />
      </div>

      <div className="panel">
        <div className="inventory__toolbar">
          <h3>
            <PackageSearch size={15} /> Stock actual
          </h3>
          <input
            placeholder="Buscar por SKU o nombre…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {!items ? (
          <div className="skeleton-block" style={{ height: 220 }} aria-busy="true" />
        ) : (
          <table className="fur-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Almacén</th>
                <th>Ubicación</th>
                <th>Stock</th>
                <th>Reorden</th>
                <th>FUR vinculado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.map((i) => (
                <Fragment key={i.sku}>
                  <tr>
                    <td>{i.sku}</td>
                    <td>{i.name}</td>
                    <td>{i.category}</td>
                    <td>{i.warehouse}</td>
                    <td>{i.location}</td>
                    <td className={i.qty < i.reorderPoint ? "inventory__qty--low" : undefined}>
                      {i.qty.toLocaleString()} {i.uom}
                    </td>
                    <td>{i.reorderPoint.toLocaleString()} {i.uom}</td>
                    <td>
                      {i.linkedFur ? (
                        <Link to={`/app/fur/${i.linkedFur}`} className="fur-table__link">
                          {i.linkedFur}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="inventory__movement-btn"
                        onClick={() => setMovementSku(movementSku === i.sku ? null : i.sku)}
                      >
                        <ArrowLeftRight size={13} /> Movimiento
                      </button>
                    </td>
                  </tr>
                  {movementSku === i.sku && (
                    <tr className="inventory__movement-row">
                      <td colSpan={9}>
                        <MovementForm item={i} onSaved={onMovementSaved} onCancel={() => setMovementSku(null)} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function MovementForm({
  item,
  onSaved,
  onCancel,
}: {
  item: StockItem;
  onSaved: (updated: StockItem) => void;
  onCancel: () => void;
}) {
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
      <input
        type="number"
        min="0"
        step="any"
        placeholder={`Cantidad (${item.uom})`}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input placeholder="Nota (opcional)" value={note} onChange={(e) => setNote(e.target.value)} />
      <button type="submit" className="btn btn--gold" disabled={saving}>
        {saving ? <Loader2 size={14} className="fur-spin" /> : null} Registrar
      </button>
      <button type="button" className="inventory__movement-cancel" onClick={onCancel} disabled={saving}>
        Cancelar
      </button>
      {error && <span className="inventory__movement-error">{error}</span>}
    </form>
  );
}
