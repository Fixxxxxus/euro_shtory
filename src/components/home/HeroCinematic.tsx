"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_POSTER,
  HERO_VIDEO_URL,
  SITE,
} from "@/lib/site";

const slides = [
  { id: 1, gradient: "from-[#1a1510] via-brand-dark to-[#0a1620]", label: "Плиссе — текстура и контроль света" },
  { id: 2, gradient: "from-[#101820] via-[#14202c] to-brand-dark", label: "Duette® — изоляция и глубина ячейки" },
  { id: 3, gradient: "from-brand-dark via-[#1a1a12] to-[#2a2218]", label: "Реальные объекты — в нашем Telegram" },
];

export function HeroCinematic() {
  const [i, setI] = useState(0);
  const reduce = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(HERO_VIDEO_URL);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [reduce]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !hasVideo || reduce) return;
    void el.play().catch(() => {
      /* автовоспроизведение может быть заблокировано */
    });
  }, [hasVideo, reduce]);

  return (
    <section className="relative -mt-[73px] h-[100svh] overflow-hidden pt-[73px] md:h-[min(100svh,900px)]">
      {hasVideo && (
        <div className="absolute inset-0 bg-[#080a0c]">
          <div className="relative h-full min-h-0 w-full">
            <video
              key={HERO_VIDEO_URL}
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover object-center"
              src={HERO_VIDEO_URL}
              poster={HERO_VIDEO_POSTER || undefined}
              muted
              loop
              playsInline
              autoPlay={!reduce}
              preload="metadata"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/75 via-brand-dark/55 to-brand-dark/90" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.15),_transparent_55%)]" />
        </div>
      )}

      {!hasVideo && (
        <div
          key={slides[i].id}
          className={`absolute inset-0 bg-gradient-to-br ${slides[i].gradient} transition-opacity duration-[1100ms]`}
        />
      )}

      {!hasVideo && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,169,98,0.12),_transparent_55%)]" />
      )}

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-4 pb-28 pt-20 md:px-6 md:pb-32 md:pt-24">
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-brand-accent/90">EUROSHTHORY</p>
        <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight text-white md:text-6xl lg:text-7xl">
          <span className="text-gradient">{SITE.tagline}</span>
        </h1>
        <p className="mt-6 max-w-xl text-sm text-brand-cream/75 md:text-base">
          {hasVideo ? (
            slides[i].id === 3 ? (
              <>
                Реальные объекты — в нашем{" "}
                <a className="text-brand-accent underline-offset-4 hover:underline" href={SITE.telegramChannel} target="_blank" rel="noreferrer">
                  Telegram
                </a>
                .
              </>
            ) : (
              <>
                {slides[i].label}. Ещё кадры — в{" "}
                <a className="text-brand-accent underline-offset-4 hover:underline" href={SITE.telegramChannel} target="_blank" rel="noreferrer">
                  Telegram-канале
                </a>
                .
              </>
            )
          ) : (
            <>
              {slides[i].label}. Включите фоновое видео через{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">NEXT_PUBLIC_HERO_VIDEO_URL</code> или слайды из{" "}
              <a className="text-brand-accent underline-offset-4 hover:underline" href={SITE.telegramChannel} target="_blank" rel="noreferrer">
                Telegram
              </a>
              .
            </>
          )}
        </p>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent" />
    </section>
  );
}
