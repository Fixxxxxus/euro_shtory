"use client";

import { useState } from "react";
import { MediaFillImage } from "@/components/MediaFillImage";
import { SITE } from "@/lib/site";
import { getProjectItems } from "@/data/realMedia";

export function ProjectsGallery() {
  const projects = getProjectItems();
  const [openId, setOpenId] = useState<string | null>(null);
  const current = openId !== null ? projects.find((p) => p.id === openId) : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setOpenId(p.id)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 text-left"
          >
            <MediaFillImage src={p.src} alt={p.title} className="transition duration-700 group-hover:scale-[1.03]" sizes="(max-width:768px) 100vw, 33vw" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition group-hover:opacity-100" />
            <span className="absolute bottom-0 left-0 p-4">
              <span className="block text-sm font-medium text-white">{p.title}</span>
              {p.src.includes("telegram-placeholder") ? (
                <span className="mt-1 block text-[10px] uppercase tracking-wider text-brand-accent">заглушка</span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setOpenId(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-brand-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/11] w-full bg-black">
              <MediaFillImage src={current.src} alt={current.title} fit="contain" className="p-4" sizes="100vw" priority />
            </div>
            <div className="border-t border-white/10 p-4 text-sm text-brand-cream/80">
              <p className="font-medium text-white">{current.title}</p>
              {current.caption ? <p className="mt-1">{current.caption}</p> : null}
              <a href={SITE.telegramChannel} target="_blank" rel="noreferrer" className="mt-3 inline-block text-brand-accent hover:underline">
                Открыть канал
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
