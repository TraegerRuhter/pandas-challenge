/**
 * Tab pages (§21.2). Real modules export from their own files as phases land;
 * the rest remain stubs that name their spec section and phase.
 */

import { StubPage } from "./StubPage";

export { EncyclopediaPage } from "./encyclopedia/EncyclopediaPage";
export { PlantDetailPage } from "./encyclopedia/PlantDetailPage";
export { SettingsPage } from "./SettingsPage";
export { CalendarPage } from "./CalendarPage";
export { TrackerPage } from "./tracker/TrackerPage";

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
