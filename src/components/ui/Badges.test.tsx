import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConditionBadge, CriticalityBadge, MaturityBadge, StatusBadge } from "./Badges";

describe("Badges", () => {
  it("muestra el estado y usa un tono de éxito para Operativo", () => {
    render(<StatusBadge status="Operativo" />);
    const badge = screen.getByText("Operativo");
    expect(badge).toBeInTheDocument();
    expect(badge.closest(".badge")).toHaveClass("badge--success");
  });

  it("usa tono de peligro para el estado Fuera de servicio", () => {
    render(<StatusBadge status="Fuera de servicio" />);
    expect(screen.getByText("Fuera de servicio").closest(".badge")).toHaveClass("badge--danger");
  });

  it("un dominio con condición HOLD nunca puede verse como confirmado", () => {
    render(<ConditionBadge condition="HOLD" />);
    const badge = screen.getByText("HOLD");
    expect(badge).toHaveClass("badge--danger");
    expect(badge).not.toHaveClass("badge--success");
  });

  it("muestra la madurez del dato tal cual (D0-D5)", () => {
    render(<MaturityBadge maturity="D4" />);
    expect(screen.getByText("D4")).toBeInTheDocument();
  });

  it("etiqueta la criticidad con su nivel", () => {
    render(<CriticalityBadge criticality="Alta" />);
    expect(screen.getByText("Criticidad: Alta")).toHaveClass("badge--danger");
  });
});
