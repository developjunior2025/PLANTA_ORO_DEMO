import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, PlusCircle } from "lucide-react";
import "./CreateFurPage.css";
import { createFur, ApiError } from "../shared/api";
import { DOMAIN_LIST } from "../shared/domains";
import type { CreateFurInput } from "../shared/api";
import type { DomainCode } from "../shared/types";

const EMPTY: CreateFurInput = {
  furCode: "",
  domain: "PROC",
  name: "",
  family: "",
  zone: "",
  area: "",
  process: "",
  criticality: "Media",
  manufacturer: "",
  model: "",
  supplier: "",
};

export function CreateFurPage() {
  const [params] = useSearchParams();
  const presetDomain = params.get("domain")?.toUpperCase();
  const [form, setForm] = useState<CreateFurInput>(() => ({
    ...EMPTY,
    domain: DOMAIN_LIST.some((d) => d.code === presetDomain) ? (presetDomain as DomainCode) : EMPTY.domain,
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function set<K extends keyof CreateFurInput>(key: K, value: CreateFurInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const created = await createFur(form);
      navigate(`/app/fur/${created.furCode}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear la ficha. Verifica que el backend esté corriendo.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="create-fur container">
      <div className="create-fur__head">
        <h1>
          <PlusCircle size={22} /> Registrar Ficha FUR
        </h1>
        <p>
          Crea un registro real en PostgreSQL vía <code>POST /api/v1/fur</code>. Queda con
          estado "En proyecto", madurez D1 y un pendiente TBC automático hasta que se complete
          el bloque técnico — igual que describe la Etapa 4 del plan para una ficha recién
          creada.
        </p>
      </div>

      <form className="panel create-fur__form" onSubmit={submit}>
        <div className="create-fur__grid">
          <label>
            Código FUR *
            <input
              required
              placeholder="FUR-PROC-00200"
              value={form.furCode}
              onChange={(e) => set("furCode", e.target.value.toUpperCase())}
            />
          </label>
          <label>
            Red / Dominio *
            <select value={form.domain} onChange={(e) => set("domain", e.target.value as DomainCode)}>
              {DOMAIN_LIST.map((d) => (
                <option key={d.code} value={d.code}>{d.shortLabel} — {d.label}</option>
              ))}
            </select>
          </label>
          <label className="create-fur__span2">
            Nombre del activo *
            <input required placeholder="Ej: Bomba de pulpa BP-04" value={form.name} onChange={(e) => set("name", e.target.value)} />
          </label>
          <label className="create-fur__span2">
            Tipo / Familia *
            <input required placeholder="Ej: Equipo de proceso / Bombeo" value={form.family} onChange={(e) => set("family", e.target.value)} />
          </label>
          <label>
            Zona *
            <input required placeholder="Ej: 04 - Espesamiento" value={form.zone} onChange={(e) => set("zone", e.target.value)} />
          </label>
          <label>
            Área *
            <input required placeholder="Ej: Espesamiento" value={form.area} onChange={(e) => set("area", e.target.value)} />
          </label>
          <label>
            Proceso *
            <input required placeholder="Ej: Espesamiento de relaves" value={form.process} onChange={(e) => set("process", e.target.value)} />
          </label>
          <label>
            Criticidad
            <select value={form.criticality} onChange={(e) => set("criticality", e.target.value)}>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </label>
          <label>
            Fabricante
            <input placeholder="Opcional" value={form.manufacturer} onChange={(e) => set("manufacturer", e.target.value)} />
          </label>
          <label>
            Modelo
            <input placeholder="Opcional" value={form.model} onChange={(e) => set("model", e.target.value)} />
          </label>
          <label className="create-fur__span2">
            Proveedor
            <input placeholder="Opcional" value={form.supplier} onChange={(e) => set("supplier", e.target.value)} />
          </label>
        </div>

        {error && <div className="create-fur__error">{error}</div>}

        <div className="create-fur__actions">
          <button type="submit" className="btn btn--gold" disabled={saving}>
            {saving ? <Loader2 size={15} className="fur-spin" /> : <PlusCircle size={15} />} Crear ficha FUR
          </button>
        </div>
      </form>
    </div>
  );
}
