/**
 * §7.12 settings — Phase 0 surface: units, hemisphere, theme, notifications.
 * Location/climate joins in Phase 1; field/motion/performance (§32.7) get
 * their full surface in Phase 4.
 */

import { useAppStore } from "../store/appStore";
import type { Settings } from "../types/models";

export function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const update = useAppStore((s) => s.updateSettings);

  return (
    <section className="mx-auto max-w-xl px-4 py-6">
      <h1 className="mb-5 text-2xl font-bold">Settings</h1>
      <div className="space-y-5">
        <Choice
          label="Units"
          value={settings.unitSystem}
          options={[
            ["imperial", "Imperial (ft, °F)"],
            ["metric", "Metric (cm, °C)"],
          ]}
          onChange={(v) => update({ unitSystem: v as Settings["unitSystem"] })}
        />
        <Choice
          label="Hemisphere"
          value={settings.hemisphere}
          options={[
            ["northern", "Northern"],
            ["southern", "Southern"],
          ]}
          onChange={(v) => update({ hemisphere: v as Settings["hemisphere"] })}
        />
        <Choice
          label="Theme"
          value={settings.theme}
          options={[
            ["system", "System"],
            ["light", "Light"],
            ["dark", "Dark"],
          ]}
          onChange={(v) => update({ theme: v as Settings["theme"] })}
        />
        <label className="flex items-center justify-between gap-4">
          <span className="font-medium">In-app reminders</span>
          <input
            type="checkbox"
            checked={settings.notificationsEnabled}
            onChange={(e) => update({ notificationsEnabled: e.target.checked })}
            className="h-5 w-5 accent-[var(--color-canopy)]"
          />
        </label>
        <p className="text-xs text-[var(--color-ink-soft)]">
          Location & climate setup arrives with the Calendar (Phase 1). Field
          mode, motion, and performance controls arrive in Phase 4 (spec §32.7).
          All data stays on this device; export/import lands in Phase 5.
        </p>
      </div>
    </section>
  );
}

function Choice({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<[string, string]>;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 font-medium">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            aria-pressed={value === v}
            onClick={() => onChange(v)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              value === v
                ? "bg-[var(--color-canopy)] text-white"
                : "bg-[var(--color-paper-deep)] text-[var(--color-ink-soft)]"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

