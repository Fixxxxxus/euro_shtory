"use client";

import type { MountSystem, ProductType, WindowShape } from "@/types/catalog";
import { MOUNT_LABELS, SHAPE_LABELS } from "@/lib/labels";

export type CatalogFilters = {
  types: ProductType[];
  mounts: MountSystem[];
  shapes: WindowShape[];
};

const TYPE_OPTIONS: { id: ProductType; label: string }[] = [
  { id: "plisse", label: "Плиссе" },
  { id: "duette", label: "Duette®" },
];

const MOUNT_OPTIONS: MountSystem[] = [
  "handle_on_frame",
  "cord",
  "chain",
  "motor",
  "day_night",
  "literise",
  "glue",
  "clips",
];

const SHAPE_OPTIONS: WindowShape[] = ["rectangle", "triangle", "trapezoid", "arch", "winter_garden"];

type FilterSidebarProps = {
  value: CatalogFilters;
  onChange: (next: CatalogFilters) => void;
};

export function FilterSidebar({ value, onChange }: FilterSidebarProps) {
  function toggle<T extends string>(key: keyof CatalogFilters, id: T, list: T[]) {
    const set = new Set(list);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange({ ...value, [key]: Array.from(set) as never });
  }

  function reset() {
    onChange({ types: [], mounts: [], shapes: [] });
  }

  const activeCount = value.types.length + value.mounts.length + value.shapes.length;

  return (
    <aside className="glass sticky top-24 h-fit rounded-2xl p-5 md:top-28">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-cream/60">Фильтр</h2>
        <button
          type="button"
          onClick={reset}
          className="text-xs text-brand-accent underline-offset-4 hover:underline disabled:opacity-40"
          disabled={activeCount === 0}
        >
          Сбросить
        </button>
      </div>

      <fieldset className="mb-6 space-y-2 border-0 p-0">
        <legend className="mb-2 text-xs font-medium text-white/90">Тип</legend>
        {TYPE_OPTIONS.map((t) => (
          <label key={t.id} className="flex cursor-pointer items-center gap-2 text-sm text-brand-cream/85">
            <input
              type="checkbox"
              checked={value.types.includes(t.id)}
              onChange={() => toggle("types", t.id, value.types)}
              className="size-4 rounded border-white/30 bg-transparent accent-brand-accent"
            />
            {t.label}
          </label>
        ))}
      </fieldset>

      <fieldset className="mb-6 space-y-2 border-0 p-0">
        <legend className="mb-2 text-xs font-medium text-white/90">Система монтажа / управления</legend>
        <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
          {MOUNT_OPTIONS.map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-2 text-sm text-brand-cream/85">
              <input
                type="checkbox"
                checked={value.mounts.includes(m)}
                onChange={() => toggle("mounts", m, value.mounts)}
                className="size-4 rounded border-white/30 bg-transparent accent-brand-accent"
              />
              {MOUNT_LABELS[m]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2 border-0 p-0">
        <legend className="mb-2 text-xs font-medium text-white/90">Форма окна</legend>
        {SHAPE_OPTIONS.map((s) => (
          <label key={s} className="flex cursor-pointer items-center gap-2 text-sm text-brand-cream/85">
            <input
              type="checkbox"
              checked={value.shapes.includes(s)}
              onChange={() => toggle("shapes", s, value.shapes)}
              className="size-4 rounded border-white/30 bg-transparent accent-brand-accent"
            />
            {SHAPE_LABELS[s]}
          </label>
        ))}
      </fieldset>
    </aside>
  );
}
