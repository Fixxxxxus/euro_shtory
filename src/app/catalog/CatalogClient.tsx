"use client";

import { useMemo, useState } from "react";
import { systems } from "@/data";
import type { MountSystem, ProductType, WindowShape } from "@/types/catalog";
import { FilterSidebar, type CatalogFilters } from "@/components/FilterSidebar";
import { ProductCard } from "@/components/ProductCard";

const emptyFilters: CatalogFilters = { types: [], mounts: [], shapes: [] };

function matches(p: (typeof systems)[0], f: CatalogFilters): boolean {
  if (f.types.length && !f.types.includes(p.type)) return false;
  if (f.mounts.length && !p.mountSystems.some((m) => f.mounts.includes(m))) return false;
  if (f.shapes.length && !p.windowShapes.some((s) => f.shapes.includes(s))) return false;
  return true;
}

export function CatalogClient() {
  const [filters, setFilters] = useState<CatalogFilters>(emptyFilters);

  const list = useMemo(() => systems.filter((p) => matches(p, filters)), [filters]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:px-6">
      <div className="md:w-72 md:flex-shrink-0">
        <FilterSidebar value={filters} onChange={setFilters} />
      </div>
      <div className="flex-1">
        <header className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-white md:text-4xl">Каталог систем</h1>
          <p className="mt-2 max-w-2xl text-sm text-brand-cream/70">
            Карточки основаны на технических линейках из PDF-каталогов. Схемы можно заменить вырезками из исходных файлов — пути уже заданы в{" "}
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">systems.json</code>.
          </p>
          <p className="mt-2 text-xs text-brand-cream/50">Показано систем: {list.length}</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        {list.length === 0 && (
          <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm text-brand-cream/70">Нет систем под выбранные фильтры. Сбросьте фильтр или измените критерии.</p>
        )}
      </div>
    </div>
  );
}
