# PLOT — Garden Planner PWA

**P**lanting, **L**ayout & **O**perations **T**racker: an offline-first,
installable garden planner. A living garden model (a tile grid with real
plants at real growth stages) tied to a climate-aware planting engine
(location, frost dates, sun exposure), so the advice is specific to this
site, this bed, this day.

Built section-by-section against **[docs/SPEC.md](docs/SPEC.md)** (v1.2),
following its implementation protocol (§0.1): one phase per turn, domain
engines ship with unit tests, all network behind cached adapters.

## Stack

Vite · React 19 · TypeScript (strict) · Zustand · Dexie (IndexedDB) ·
React Router · Tailwind CSS 4 · vite-plugin-pwa (Workbox) · Vitest

## Commands

```bash
npm install
npm run dev       # dev server
npm run build     # type-check + production build (PWA assets generated here)
npm test          # vitest run
python3 scripts/make_icons.py   # regenerate PWA icons from the pixel map
```

## Build phases (SPEC §29)

| Phase | Scope | Status |
| ----- | ----- | ------ |
| **Scaffold** | Project init, all §7/§31 model types, Dexie stores, PWA shell, tab routing, tokens, icons | ✅ this commit |
| **0 — Skeleton & data** | Bundled catalog (~15 plants, full records), encyclopedia list, settings persistence, offline verify | next |
| **1 — Climate & calendar** | WeatherAdapter + ClimateEngine (frost dates, normals, zone, manual fallback), PlantingWindowEngine, band chart, waterlogging risk model | |
| **2 — Designer core** | Konva canvas grid, areas/satellites, orientation, palette, elevation, placement checks, aerial underlay, accessible mirror | |
| **3 — Tracking & diagnostics** | Instance lifecycle, projections, auto-advance (GDD-aware), stage sprites, rollback → diagnostics, harvest logging | |
| **4 — Plan-ahead & care** | Plant Next + succession, RecommendationEngine, WateringEngine, tasks/reminders, seed inventory, settings surface | |
| **5 — Depth & polish** | Varieties/recipes, companions/rotation, sun overlay, journal, export/import (JSON + tidy CSV), pests/diseases, Time Machine, analytics, field mode, full catalog | |
| **6 — Optional** | Sync backend stub, plant-ID hook, 3D hardware viewer, hardware refs | |

## Builder decisions log (per SPEC §0.1 rule 6 / §30)

| # | Decision | Choice | Why |
| - | -------- | ------ | --- |
| §6 | IndexedDB wrapper | **Dexie** over `idb` | typed tables, compound/multi-entry indexes, ergonomic queries for the append-heavy stores (instances, events, journal) that §23 says must be DB-queried, not held in memory |
| §30.1 | Grid renderer | **Konva** (decided now, lands Phase 2) | spec-recommended; 64×64 + hundreds of sprites at 60fps wants Canvas, with the §24 accessible table mirror |
| §30.3 | Sync backend | **Stub** | spec default; offline-first local store stays authoritative |
| §22 | SW update flow | `autoUpdate` for now | becomes `prompt` + "new version" toast when the toast UI lands (Phase 5); avoids stale-build confusion during early phases |
| §7.10 | `InstanceStatus` | added `"planned"` to the union | §12.6/§15 require ghost placements with no logged planting date; §7.10's union lacked a state for them — flagged as a spec reconciliation, not a silent change |
| §7.12 | Default `unitSystem` | `"imperial"` (display only) | storage is always metric (§0); owner gardens in US units (1 ft default cell, §12.1) |
| schema | `tasks.done` not indexed | query by `dueOn` range instead | IndexedDB cannot index booleans |
| repo | App lives in `garden-planner/` | | keeps the PWA separate from the pre-existing PyCitySchools coursework at the repo root |

Still open (decided in the phase that touches them): §30.2 stage-pacing hybrid
(recommended: GDD when climate data exists, calendar fallback), §30.4 frost
percentile labeling, §30.5 sprite-sheet format, §30.6 sun-model sampling,
§30.7 notification strategy, §31.8 + §32.9 items.

## Layout

```
docs/SPEC.md           the governing specification (v1.2)
scripts/make_icons.py  PWA icon generator (16×16 pixel map → PNG/SVG)
src/
  types/models.ts      every §7 + §31 model — the data contract
  types/adapters.ts    §8 network adapter interfaces
  db/db.ts             Dexie schema: every §23 store, v1
  store/appStore.ts    Zustand app state (settings + active garden)
  shell/AppShell.tsx   §21.2 tab shell (bottom bar / side rail)
  pages/               one stub per tab, replaced phase-by-phase
  engines/             §5.1 domain engines land here with their tests
```
