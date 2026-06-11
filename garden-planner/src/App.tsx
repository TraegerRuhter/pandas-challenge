import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import {
  CalendarPage,
  DesignerPage,
  EncyclopediaPage,
  PlantNextPage,
  SettingsPage,
  SuggestPage,
  TasksPage,
  TrackerPage,
} from "./pages";

/**
 * §21.2: Designer is the default landing once a garden exists; until gardens
 * exist (Phase 2) the Encyclopedia leads, since it is the first tab with
 * content (Phase 0 exit: "lists plants").
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/encyclopedia" replace />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/designer" element={<DesignerPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="/plant-next" element={<PlantNextPage />} />
          <Route path="/suggest" element={<SuggestPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/encyclopedia" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
