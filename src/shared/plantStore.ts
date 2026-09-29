import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPlants, type Plant } from "./api";
import type { CatalogEntity, FurRecord } from "./types";

const DEFAULT_PLANT_CODE = "PB01";

interface PlantState {
  plantCode: string;
  setPlantCode: (code: string) => void;
}

/**
 * Qué planta se está viendo ahora (megadocumento §4.2: filtro "planta"). Es un contexto global,
 * igual que el rol activo: se elige una vez en el header y el resto de la app se filtra sola —
 * no hay que volver a elegirla en cada página. Se persiste en localStorage (misma naturaleza que
 * el selector de rol: comodidad de la demo, no sesión real).
 */
export const usePlantStore = create<PlantState>()(
  persist(
    (set) => ({
      plantCode: DEFAULT_PLANT_CODE,
      setPlantCode: (code) => set({ plantCode: code }),
    }),
    { name: "fur-active-plant" }
  )
);

let plantsPromise: Promise<Plant[]> | null = null;
function loadPlants() {
  plantsPromise ??= fetchPlants();
  plantsPromise.catch(() => (plantsPromise = null));
  return plantsPromise;
}

/** Lista real de plantas (para el selector). */
export function usePlants(): Plant[] | null {
  const [plants, setPlants] = useState<Plant[] | null>(null);
  useEffect(() => {
    let active = true;
    loadPlants()
      .then((p) => active && setPlants(p))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return plants;
}

export function useActivePlant(): string {
  return usePlantStore((s) => s.plantCode);
}

/** Una ficha FUR siempre pertenece a una planta: se filtra directo. */
export function matchesPlant<T extends { plantCode: string }>(record: T, plantCode: string): boolean {
  return record.plantCode === plantCode;
}

/**
 * Una entidad de catálogo puede no tener planta (proveedor, curso, persona, servicio, red
 * transversal...): esas se ven desde cualquier planta, porque no son de un sitio en particular.
 */
export function matchesPlantOrGlobal(entity: { plantCode?: string | null }, plantCode: string): boolean {
  return !entity.plantCode || entity.plantCode === plantCode;
}

export const filterByPlant = (records: FurRecord[], plantCode: string) => records.filter((r) => matchesPlant(r, plantCode));

export const filterCatalogByPlant = (entities: CatalogEntity[], plantCode: string) =>
  entities.filter((e) => matchesPlantOrGlobal(e, plantCode));
