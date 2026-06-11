import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./shell/AppShell";
import { useAppStore } from "./store/appStore";
import { useApplyTheme } from "./lib/useApplyTheme";
import {
  CalendarPage,
  DesignerPage,
  EncyclopediaPage,
  PlantDetailPage,
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
  const bootState = useAppStore((s) => s.bootState);
  const bootError = useAppStore((s) => s.bootError);
  const init = useAppStore((s) => s.init);
  useApplyTheme();

  useEffect(() => {
    if (bootState === "loading") void init();
  }, [bootState, init]);

  if (bootState === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[var(--color-paper)] text-[var(--color-ink-soft)]">
        Preparing the garden…
      </div>
    );
  }
  if (bootState === "error") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-2 bg-[var(--color-paper)] p-6 text-center">
        <p className="font-semibold">Couldn't open local storage.</p>
        <p className="max-w-md text-sm text-[var(--color-ink-soft)]">{bootError}</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/encyclopedia" replace />} />
          <Route path="/encyclopedia" element={<EncyclopediaPage />} />
          <Route path="/encyclopedia/:plantId" element={<PlantDetailPage />} />
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
