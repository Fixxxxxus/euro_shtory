import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/data";
import { ProductCard } from "@/components/ProductCard";
import { ComparisonPanel } from "./ComparisonPanel";

export const metadata: Metadata = {
  title: "Плиссе",
  description: "Технология плиссе, системы 20 и 32 мм, каталог решений EUROSHTHORY.",
};

export default function PlissePage() {
  const list = systems.filter((s) => s.type === "plisse");

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-brand-accent/90">Технология</p>
      <h1 className="mt-2 font-display text-4xl font-semibold text-white md:text-5xl">Плиссе</h1>
      <ComparisonPanel highlight="plisse" />
      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-white">Системы плиссе</h2>
        <p className="mt-2 max-w-2xl text-sm text-brand-cream/70">
          Сетка ниже строится из локальных данных. Замените превью на вырезки схем из PDF (BB24, BB10, LiteRise, SmartCord, TruFit, PB/PR и т.д.).
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
      <div className="mt-14 text-center">
        <Link href="/catalog/" className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm text-white hover:bg-white/10">
          Весь каталог с фильтрами
        </Link>
      </div>
    </div>
  );
}
