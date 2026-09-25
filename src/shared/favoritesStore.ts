import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  codes: string[];
  /** Slugs de dashboards marcados como favoritos (§65: galería con favoritos). */
  dashboards: string[];
  toggle: (furCode: string) => void;
  toggleDashboard: (slug: string) => void;
}

const flip = (list: string[], v: string) => (list.includes(v) ? list.filter((c) => c !== v) : [...list, v]);

/** Favoritos por navegador (localStorage): comodidad del visitante, no dato compartido. */
export const useFavorites = create<FavoritesState>()(
  persist(
    (set) => ({
      codes: [],
      dashboards: [],
      toggle: (furCode) => set((s) => ({ codes: flip(s.codes, furCode) })),
      toggleDashboard: (slug) => set((s) => ({ dashboards: flip(s.dashboards, slug) })),
    }),
    { name: "fur-favorites" }
  )
);
