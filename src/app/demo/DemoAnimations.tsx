"use client";

import { useState } from "react";

export function DemoAnimations() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 space-y-16">
      <section>
        <h2 className="text-lg font-semibold text-white">Сетка блоков (Tailwind)</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 w-40 animate-fade-in-up rounded-xl border border-white/10 bg-white/5 opacity-0"
              style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "forwards" }}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Hover (CSS)</h2>
        <div className="mt-4 inline-block rounded-2xl border border-brand-accent/40 bg-brand-accent/10 px-8 py-6 text-brand-cream transition hover:scale-105">
          Наведите курсор
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Модальное окно</h2>
        <button type="button" onClick={() => setOpen(true)} className="mt-4 rounded-full bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/20">
          Открыть
        </button>
        {open ? (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-6"
            onClick={() => setOpen(false)}
          >
            <div
              className="max-w-md rounded-2xl border border-white/15 bg-brand-muted p-8 text-sm text-brand-cream/85 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              Пример модального окна. Клик по фону закрывает.
              <button type="button" className="mt-6 text-brand-accent underline" onClick={() => setOpen(false)}>
                Закрыть
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
