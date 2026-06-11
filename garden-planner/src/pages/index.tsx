/**
 * Tab pages (§21.2). All stubs at scaffold time; each is replaced by its real
 * module in the phase noted. Kept in one file until the modules land — each
 * real page will move to its own lazy-loaded file (§25 lazy-load tabs).
 */

import { StubPage } from "./StubPage";

export function EncyclopediaPage() {
  return (
    <StubPage
      title="Encyclopedia"
      purpose="Browse, search, and filter the plant catalog; deep-dive varieties, recipes, companions, and per-plant planting windows."
      specRef="§10"
      phase={0}
    />
  );
}

export function CalendarPage() {
  return (
    <StubPage
      title="Calendar"
      purpose="Location-aware planting windows per plant and for the whole garden, as a banded season timeline."
      specRef="§11"
      phase={1}
    />
  );
}

export function DesignerPage() {
  return (
    <StubPage
      title="Designer"
      purpose="Tile-based 2D garden layout: areas and satellites, plants, structures, hardscape, water, elevation, orientation, and the sun map."
      specRef="§12"
      phase={2}
    />
  );
}

export function TrackerPage() {
  return (
    <StubPage
      title="Tracker"
      purpose="Growth stages over real time: projected timelines, auto-advance, manual advance/rollback with diagnostics."
      specRef="§13–14"
      phase={3}
    />
  );
}

export function PlantNextPage() {
  return (
    <StubPage
      title="Plant Next"
      purpose="What can go in now or soon, bed handoffs as harvests finish, and succession schedules piped onto the grid."
      specRef="§15"
      phase={4}
    />
  );
}

export function SuggestPage() {
  return (
    <StubPage
      title="Suggest"
      purpose="Site-aware ranked recommendations: zone, season, sun, space, water, companions, and rotation."
      specRef="§16"
      phase={4}
    />
  );
}

export function TasksPage() {
  return (
    <StubPage
      title="Tasks"
      purpose="Unified sow / transplant / water / fertilize / harvest / remedy reminders, grouped by due date."
      specRef="§19"
      phase={4}
    />
  );
}

export function SettingsPage() {
  return (
    <StubPage
      title="Settings"
      purpose="Units, hemisphere, theme, notifications, location — plus field mode, motion, and performance controls."
      specRef="§7.12, §32.7"
      phase={0}
    />
  );
}
