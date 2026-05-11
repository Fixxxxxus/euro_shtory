"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/basePath";

type Props = {
  src: string;
  className: string;
  ariaLabel: string;
  prefersReducedMotion: boolean;
};

/**
 * Фон карточки: видео на весь блок без растягивания (object-cover + object-center).
 */
export function HeroCardBackgroundVideo({ src, className, ariaLabel, prefersReducedMotion }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const resolved = withBasePath(src);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    void el.play().catch(() => {
      /* автовоспроизведение может быть заблокировано */
    });
  }, [prefersReducedMotion, resolved]);

  return (
    <video
      ref={ref}
      src={resolved}
      className={`absolute inset-0 h-full w-full object-cover object-center ${className}`}
      muted
      loop
      playsInline
      autoPlay={!prefersReducedMotion}
      preload="metadata"
      aria-label={ariaLabel}
    />
  );
}
