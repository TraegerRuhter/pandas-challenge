/**
 * App-level state (§23): Zustand for low ceremony. Holds settings and light
 * UI state; the large/append-heavy collections (instances, events, journal)
 * are queried straight from Dexie, never held wholesale in memory.
 *
 * Persistence of settings to the Dexie `settings` store is wired in the
 * Phase 0 completion turn alongside catalog seeding.
 */

import { create } from "zustand";
import type { Settings } from "../types/models";

/** Spec-mandated defaults: §7.12 and §32.7. */
export const defaultSettings: Settings = {
  // Internally everything is metric (§0); imperial is only the display
  // default because the product owner gardens in US units (§12.1's 1 ft cell).
  unitSystem: "imperial",
  hemisphere: "northern",
  notificationsEnabled: false,
  theme: "system",
  pauseAdvanceOnWaterloggingStress: false, // §31.8 decision 9: default OFF
  fieldMode: false,
  reducedMotion: "system",
  performanceTier: "auto",
  feel: {
    soundEnabled: false, // §32.6: sound defaults OFF, gesture-gated
    hapticsEnabled: true, // no-ops where unsupported (iOS)
    ambientWeather: true,
    placementJuice: true,
  },
};

interface AppState {
  settings: Settings;
  activeGardenId?: string;
  updateSettings: (patch: Partial<Settings>) => void;
  setActiveGarden: (id?: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  settings: defaultSettings,
  activeGardenId: undefined,
  updateSettings: (patch) =>
    set((s) => ({ settings: { ...s.settings, ...patch } })),
  setActiveGarden: (id) => set({ activeGardenId: id }),
}));
