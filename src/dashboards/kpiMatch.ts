import type { KpiDefinition } from "../shared/api";

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const tokens = (s: string) => new Set(norm(s).split(" ").filter((t) => t.length > 1));

/** Busca la ficha de definición (documento de dashboards §15) que corresponde al KPI mostrado, por similitud de nombre. */
export function matchDefinition(label: string, defs: KpiDefinition[]): KpiDefinition | undefined {
  const a = tokens(label);
  if (a.size === 0) return undefined;
  let best: { d: KpiDefinition; score: number } | undefined;
  for (const d of defs) {
    const b = tokens(d.name);
    let inter = 0;
    for (const t of a) if (b.has(t)) inter += 1;
    const score = inter / Math.min(a.size, b.size);
    if (inter > 0 && score >= 0.6 && (!best || score > best.score)) best = { d, score };
  }
  return best?.d;
}
