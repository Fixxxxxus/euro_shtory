"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/basePath";

type LazyImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  onClick?: () => void;
};

export function LazyImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  onClick,
}: LazyImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) setInView(true);
      },
      { rootMargin: "120px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-white/5 ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
    >
      {inView ? (
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition duration-700 ${loaded ? "scale-100 blur-0" : "scale-105 blur-sm"}`}
          onLoadingComplete={() => setLoaded(true)}
        />
      ) : (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]" />
      )}
    </div>
  );
}
