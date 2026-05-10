"use client";

import Link from "next/link";
import Image from "next/image";
import { withBasePath } from "@/lib/basePath";
import type { SystemProduct } from "@/types/catalog";

type ProductCardProps = {
  product: SystemProduct;
  index?: number;
};

export function ProductCard({ product }: ProductCardProps) {
  const cover = withBasePath(product.images[0]?.src ?? "/images/placeholders/telegram-placeholder.svg");

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-lg transition hover:border-brand-accent/40 hover:shadow-brand-accent/10">
      <Link href={`/catalog/${product.slug}/`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image src={cover} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-[1.04]" sizes="(max-width:768px) 100vw, 33vw" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
          <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs uppercase tracking-wider text-brand-cream/90 backdrop-blur-md">
            {product.type === "plisse" ? "Плиссе" : "Duette®"}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-display text-lg font-semibold text-white transition group-hover:text-brand-accent">{product.name}</h3>
          <p className="line-clamp-2 text-sm text-brand-cream/70">{product.shortDescription}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-2 text-xs text-brand-cream/55">
            <span>
              до {product.maxWidthCm} см × {product.maxHeightCm} см
            </span>
            <span>·</span>
            <span>макс. {product.maxAreaM2} м²</span>
          </div>
          <span className="inline-flex pt-2 text-sm font-medium text-brand-accent">Уточнить наличие →</span>
        </div>
      </Link>
    </article>
  );
}
