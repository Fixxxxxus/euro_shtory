"use client";

import Image from "next/image";
import { useState } from "react";
import { withBasePath } from "@/lib/basePath";
import type { ProductImage } from "@/types/catalog";

type MediaGalleryProps = {
  images: ProductImage[];
};

export function MediaGallery({ images }: MediaGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [hoverHotspot, setHoverHotspot] = useState<string | null>(null);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30">
        <button type="button" onClick={() => setLightbox(true)} className="group relative block w-full outline-none">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={withBasePath(current.src)}
              alt={current.alt}
              fill
              className="object-contain p-4 transition duration-500 group-hover:ring-2 group-hover:ring-brand-accent/70"
              sizes="(max-width:768px) 100vw, 60vw"
            />
            {current.hotspots?.map((h) => (
              <span key={h.id}>
                <span
                  className="absolute z-10 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border border-brand-accent bg-brand-accent/90 text-[10px] font-bold text-brand-dark shadow-lg transition hover:scale-110"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onMouseEnter={() => setHoverHotspot(h.id)}
                  onMouseLeave={() => setHoverHotspot(null)}
                >
                  i
                </span>
                {hoverHotspot === h.id ? (
                  <span
                    className="absolute z-20 max-w-[200px] -translate-x-1/2 rounded-lg border border-white/15 bg-brand-dark/95 px-3 py-2 text-xs text-brand-cream shadow-xl"
                    style={{ left: `${h.x}%`, top: `calc(${h.y}% + 22px)` }}
                  >
                    {h.label}
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        </button>
        {current.caption && (
          <p className="border-t border-white/10 px-4 py-3 text-xs text-brand-cream/65">
            {current.caption}
            {current.isTelegramPlaceholder ? (
              <span className="ml-2 rounded bg-brand-accent/20 px-2 py-0.5 text-[10px] uppercase tracking-wide text-brand-accent">
                реальное фото по ссылке
              </span>
            ) : null}
          </p>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img.src + i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition ${active === i ? "border-brand-accent ring-1 ring-brand-accent/50" : "border-white/10 hover:border-white/30"}`}
          >
            <Image src={withBasePath(img.src)} alt={img.alt} fill className="object-cover" sizes="96px" />
          </button>
        ))}
      </div>

      {lightbox ? (
        <div
          role="presentation"
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-dark">
              <Image src={withBasePath(current.src)} alt={current.alt} fill className="object-contain p-6" sizes="100vw" />
            </div>
            <p className="mt-3 text-center text-sm text-brand-cream/70">{current.caption}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
