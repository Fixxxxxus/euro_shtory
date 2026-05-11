"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_VIDEO_POSTER,
  HERO_VIDEO_URL,
  HERO_VIDEO_VERTICAL_MODE,
  SITE,
} from "@/lib/site";

const slides = [
  { id: 1, gradient: "from-[#1a1510] via-brand-dark to-[#0a1620]", label: "Плиссе — текстура и контроль света" },
  { id: 2, gradient: "from-[#101820] via-[#14202c] to-brand-dark", label: "Duette® — изоляция и глубина ячейки" },
  { id: 3, gradient: "from-brand-dark via-[#1a1a12] to-[#2a2218]", label: "Реальные объекты — в нашем Telegram" },
];

type HeroVideoLayout = "portrait" | "landscape";

function resolveLayoutFromVideo(el: HTMLVideoElement): HeroVideoLayout | null {
  const w = el.videoWidth;
  const h = el.videoHeight;
  if (!w || !h) return null;
  return h > w ? "portrait" : "landscape";
}

export function HeroCinematic() {
  const [i, setI] = useState(0);
  const reduce = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const layoutRaf = useRef<number | null>(null);
  const layoutGen = useRef(0);
  const hasVideo = Boolean(HERO_VIDEO_URL);
  /** В auto на мобилке до измерения ролик скрыт (без мигания). На md+ всегда горизонтальный full-bleed — см. классы md:. */
  const [videoLayout, setVideoLayout] = useState<HeroVideoLayout>(() => {
    if (HERO_VIDEO_VERTICAL_MODE === "on") return "portrait";
    return "landscape";
  });
  const [heroVideoRevealed, setHeroVideoRevealed] = useState(() => HERO_VIDEO_VERTICAL_MODE !== "auto");

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

  const scheduleLayoutSync = useCallback(() => {
    if (HERO_VIDEO_VERTICAL_MODE === "on") {
      setVideoLayout("portrait");
      setHeroVideoRevealed(true);
      return;
    }
    if (HERO_VIDEO_VERTICAL_MODE === "off") {
      setVideoLayout("landscape");
      setHeroVideoRevealed(true);
      return;
    }
    const gen = ++layoutGen.current;
    if (layoutRaf.current != null) cancelAnimationFrame(layoutRaf.current);
    layoutRaf.current = requestAnimationFrame(() => {
      layoutRaf.current = requestAnimationFrame(() => {
        layoutRaf.current = null;
        if (gen !== layoutGen.current) return;
        const el = videoRef.current;
        if (!el) return;
        const next = resolveLayoutFromVideo(el);
        if (next) {
          setVideoLayout(next);
          setHeroVideoRevealed(true);
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!hasVideo || HERO_VIDEO_VERTICAL_MODE !== "auto") return;
    scheduleLayoutSync();
    const onWinResize = () => scheduleLayoutSync();
    window.addEventListener("resize", onWinResize);
    return () => {
      window.removeEventListener("resize", onWinResize);
      layoutGen.current += 1;
      if (layoutRaf.current != null) {
        cancelAnimationFrame(layoutRaf.current);
        layoutRaf.current = null;
      }
    };
  }, [hasVideo, scheduleLayoutSync]);

  useEffect(() => {
    if (!hasVideo || HERO_VIDEO_VERTICAL_MODE !== "auto") return;
    const t = window.setTimeout(() => {
      const el = videoRef.current;
      const next = el ? resolveLayoutFromVideo(el) : null;
      setVideoLayout((prev) => (next ?? prev));
      setHeroVideoRevealed(true);
    }, 2500);
    return () => window.clearTimeout(t);
  }, [hasVideo]);

  const onVideoReady = useCallback(() => {
    scheduleLayoutSync();
  }, [scheduleLayoutSync]);

  const displayLayout =
    !heroVideoRevealed && HERO_VIDEO_VERTICAL_MODE === "auto" ? "landscape" : videoLayout;

  return (
    <section className="relative -mt-[73px] h-[min(100svh,900px)] overflow-hidden pt-[73px]">
      {hasVideo && (
        <div className="absolute inset-0 bg-[#080a0c]">
          <div
            className={
              displayLayout === "portrait"
                ? "flex h-full w-full items-center justify-center md:relative md:block md:h-full md:w-full"
                : "relative h-full w-full"
            }
          >
            <video
              key={HERO_VIDEO_URL}
              ref={videoRef}
              className={
                (displayLayout === "portrait"
                  ? "max-h-full w-auto max-w-full object-contain object-center max-md:max-h-[min(100%,92svh)] md:h-full md:w-full md:max-w-none md:max-h-none md:object-cover md:object-center"
                  : "h-full w-full object-cover object-center") +
                (heroVideoRevealed ? " opacity-100" : " opacity-0 md:opacity-100") +
                " transition-opacity duration-300 ease-out"
              }
              src={HERO_VIDEO_URL}
              poster={HERO_VIDEO_POSTER || undefined}
              muted
              loop
              playsInline
              autoPlay={!reduce}
              preload="metadata"
              onLoadedMetadata={onVideoReady}
              onLoadedData={onVideoReady}
              onCanPlay={onVideoReady}
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
        <p
          className={
            hasVideo && slides[i].id === 3
              ? "mt-6 max-w-none text-sm text-brand-cream/75 md:text-base whitespace-nowrap overflow-x-auto overflow-y-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "mt-6 max-w-xl text-sm text-brand-cream/75 md:text-base"
          }
        >
          {hasVideo ? (
            <>
              {slides[i].label}. Ещё кадры — в{" "}
              <a className="text-brand-accent underline-offset-4 hover:underline" href={SITE.telegramChannel} target="_blank" rel="noreferrer">
                Telegram-канале
              </a>
              .
            </>
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
