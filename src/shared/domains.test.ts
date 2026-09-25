import { describe, expect, it } from "vitest";
import { DOMAIN_LIST, DOMAINS } from "./domains";

describe("catálogo de redes transversales", () => {
  it("define exactamente las 10 redes del ecosistema FUR", () => {
    expect(DOMAIN_LIST).toHaveLength(10);
  });

  it("cada dominio tiene un color, ícono y descripción propios", () => {
    for (const domain of DOMAIN_LIST) {
      expect(domain.color).toBeTruthy();
      expect(domain.icon).toBeTruthy();
      expect(domain.description.length).toBeGreaterThan(0);
      expect(DOMAINS[domain.code]).toBe(domain);
    }
  });

  it("cuando declara fullTabs (megadocumento REV.01), siempre incluye Resumen, Documentos e Historial", () => {
    for (const domain of DOMAIN_LIST) {
      if (!domain.fullTabs) continue;
      expect(domain.fullTabs).toContain("Resumen");
      expect(domain.fullTabs).toContain("Documentos");
      expect(domain.fullTabs).toContain("Historial");
    }
  });
});
