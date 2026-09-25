import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ChevronDown, ChevronRight, FolderTree } from "lucide-react";
import "./BudgetPage.css";
import { fetchBudgetProject } from "../shared/api";
import {
  costoDirecto,
  precioUnitario,
  totalCapitulo,
  totalPartida,
  totalPresupuesto,
  type BudgetItem,
  type BudgetProject,
} from "../shared/budgetData";

function money(v: number, currency: string) {
  return `${currency} ${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export function BudgetPage() {
  const [project, setProject] = useState<BudgetProject | null>(null);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchBudgetProject().then((p) => {
      if (active) setProject(p);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="budget container">
      <div className="budget__head">
        <h1>Presupuestos tipo LuloWin</h1>
        <p>
          Jerarquía Proyecto → Presupuesto → Capítulo → Partida → APU → Recursos (sección 10 /
          Etapa 14). Cálculo: <code>CD = ΣMateriales+ΣManoObra+ΣEquipos+ΣOtros</code>,{" "}
          <code>PU = CD × factor</code>, <code>TOTAL = Cantidad × PU</code>. Los nombres{" "}
          <code>lw_*</code> son convenciones lógicas — quedan HOLD hasta inspeccionar la licencia
          e instalación real de LuloWin.
        </p>
      </div>

      {!project ? (
        <div className="skeleton-block" style={{ height: 320 }} aria-busy="true" />
      ) : (
        <>
          <div className="panel budget__summary">
            <div>
              <span className="budget__summary-label">Proyecto</span>
              <strong>{project.name}</strong>
              <span className="budget__summary-code">{project.code}</span>
            </div>
            <div className="budget__summary-total">
              <span className="budget__summary-label">Presupuesto total</span>
              <strong>{money(totalPresupuesto(project), project.currency)}</strong>
            </div>
          </div>

          <div className="panel">
            <h3>
              <FolderTree size={15} /> Capítulos y Partidas
            </h3>
            <table className="fur-table budget__table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descripción</th>
                  <th>Und.</th>
                  <th>Cant.</th>
                  <th>CD (APU)</th>
                  <th>Factor</th>
                  <th>P.U.</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {project.chapters.map((chapter) => (
                  <Fragment key={chapter.code}>
                    <tr className="budget__chapter-row">
                      <td colSpan={7}>
                        {chapter.code} — {chapter.name}
                      </td>
                      <td className="budget__amount">{money(totalCapitulo(chapter), project.currency)}</td>
                    </tr>
                    {chapter.items.map((item) => (
                      <ItemRow
                        key={item.code}
                        item={item}
                        currency={project.currency}
                        open={openItem === item.code}
                        onToggle={() => setOpenItem(openItem === item.code ? null : item.code)}
                      />
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function ItemRow({
  item,
  currency,
  open,
  onToggle,
}: {
  item: BudgetItem;
  currency: string;
  open: boolean;
  onToggle: () => void;
}) {
  const cd = costoDirecto(item);
  const pu = precioUnitario(item);
  const total = totalPartida(item);

  return (
    <>
      <tr className="budget__item-row" onClick={onToggle}>
        <td>
          <button type="button" className="budget__expand">
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {item.code}
          </button>
        </td>
        <td>{item.name}</td>
        <td>{item.unit}</td>
        <td>{item.quantity}</td>
        <td>{money(cd, currency)}</td>
        <td>{item.factor.toFixed(2)}</td>
        <td>{money(pu, currency)}</td>
        <td className="budget__amount">{money(total, currency)}</td>
      </tr>
      {open && (
        <tr className="budget__apu-row">
          <td colSpan={8}>
            <div className="budget__apu">
              <div className="budget__apu-head">
                <Calculator size={13} /> Análisis de Precios Unitarios (APU)
                {item.linkedFur && (
                  <Link to={`/app/fur/${item.linkedFur}`} className="fur-table__link">
                    Ver ficha FUR vinculada ({item.linkedFur})
                  </Link>
                )}
              </div>
              <table className="fur-table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Recurso</th>
                    <th>Und.</th>
                    <th>Cant.</th>
                    <th>Precio unit.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {item.resources.map((r) => (
                    <tr key={r.name}>
                      <td>{r.type}</td>
                      <td>{r.name}</td>
                      <td>{r.unit}</td>
                      <td>{r.quantity}</td>
                      <td>{money(r.unitPrice, currency)}</td>
                      <td>{money(r.quantity * r.unitPrice, currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
