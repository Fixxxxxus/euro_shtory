"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** По умолчанию cover */
  fit?: "cover" | "contain";
};

/**
 * Локальные пути (/media/...) — через next/image.
 * Полные https://… (например CDN Telegram) — обычный img, чтобы не настраивать remotePatterns.
 */
export function MediaFillImage({ src, alt, className = "", sizes = "100vw", priority = false, fit = "cover" }: Props) {
  const external = /^https?:\/\//i.test(src);
  const object = fit === "contain" ? "object-contain" : "object-cover";
  const resolved = external ? src : withBasePath(src);

  if (external) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={resolved} alt={alt} className={`absolute inset-0 h-full w-full ${object} ${className}`} loading={priority ? "eager" : "lazy"} />
    );
  }

  return <Image src={resolved} alt={alt} fill className={`${object} ${className}`} sizes={sizes} priority={priority} />;
}
