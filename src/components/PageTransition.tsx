"use client";

import { usePathname } from "next/navigation";

/** Раньше здесь был motion.main с opacity — оставляем простой main, контент всегда виден. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main key={pathname} className="min-h-[70vh]">
      {children}
    </main>
  );
}
