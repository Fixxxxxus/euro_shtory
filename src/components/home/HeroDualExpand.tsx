"use client";

import Link from "next/link";
import { useState } from "react";
import { HeroCardBackgroundVideo } from "@/components/home/HeroCardBackgroundVideo";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const HERO_PLISSE_VIDEO = "/videos/hero-plisse.mp4";
const HERO_DUETTE_VIDEO = "/videos/hero-duette.mp4";

export function HeroDualExpand() {
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const reduce = usePrefersReducedMotion();

  const leftFlexStr = side === "right" ? "1 1 0%" : side === "left" ? "3 1 0%" : "1 1 0%";
  const rightFlexStr = side === "left" ? "1 1 0%" : side === "right" ? "3 1 0%" : "1 1 0%";

  const flexStyle = (flex: string) =>
    reduce
      ? undefined
      : ({
          flex,
          transition: "flex 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        } as React.CSSProperties);

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-6">
      <div className="flex min-h-[420px] flex-col gap-3 md:h-[min(68vh,560px)] md:flex-row md:gap-2 md:overflow-hidden md:rounded-3xl">
        <div
          className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl md:min-h-0 md:flex-none"
          style={flexStyle(leftFlexStr)}
          onMouseEnter={() => setSide("left")}
          onMouseLeave={() => setSide(null)}
        >
          <Link href="/plisse/" className="group absolute inset-0 block">
            <HeroCardBackgroundVideo
              src={HERO_PLISSE_VIDEO}
              ariaLabel="Плиссе — видео"
              prefersReducedMotion={reduce}
              className={`transition duration-500 ${side === "right" ? "scale-105 blur-sm brightness-75" : "scale-100"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/90 via-brand-dark/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent/90">Коллекция</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-4xl">Плиссе (20 / 32 мм)</h3>
              <p className="mt-2 max-w-md text-sm text-brand-cream/75 md:text-base">Одна гармошка, широкая палитра тканей и систем под любой проём.</p>
              <span className="mt-4 inline-flex text-sm font-medium text-brand-accent md:opacity-0 md:transition md:group-hover:opacity-100">
                Подробнее о плиссе →
              </span>
            </div>
          </Link>
        </div>

        <div
          className="relative min-h-[220px] flex-1 overflow-hidden rounded-2xl md:min-h-0 md:flex-none"
          style={flexStyle(rightFlexStr)}
          onMouseEnter={() => setSide("right")}
          onMouseLeave={() => setSide(null)}
        >
          <Link href="/duette/" className="group absolute inset-0 block">
            <HeroCardBackgroundVideo
              src={HERO_DUETTE_VIDEO}
              ariaLabel="Duette — видео"
              prefersReducedMotion={reduce}
              className={`transition duration-500 ${side === "left" ? "scale-105 blur-sm brightness-75" : "scale-100"}`}
            />
            <div className="absolute inset-0 bg-gradient-to-tl from-brand-dark/90 via-brand-dark/40 to-transparent" />
            <div className="absolute bottom-0 right-0 p-6 text-right md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-accent/90">Коллекция</p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-4xl">Duette® (25 / 32 / 64 мм)</h3>
              <p className="mt-2 ml-auto max-w-md text-sm text-brand-cream/75 md:text-base">
                Двойная сэндвич-ткань: тепло, тишина, полотно без сквозных отверстий.
              </p>
              <span className="mt-4 inline-flex text-sm font-medium text-brand-accent md:opacity-0 md:transition md:group-hover:opacity-100">
                Подробнее о Duette® →
              </span>
            </div>
          </Link>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-brand-cream/45 md:hidden">Нажмите карточку, чтобы открыть раздел. На десктопе карточка плавно занимает ~75% ряда при наведении.</p>
    </div>
  );
}
