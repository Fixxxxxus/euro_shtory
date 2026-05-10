import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fabricLabelForProduct, getRelatedSystems, getSystemBySlug, systems } from "@/data";
import { ProductDetailClient } from "./ProductDetailClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getSystemBySlug(slug);
  if (!p) return { title: "Не найдено" };
  return {
    title: p.name,
    description: p.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getSystemBySlug(slug);
  if (!product) notFound();
  const related = getRelatedSystems(product.relatedSlugs);
  const fabricLabel = fabricLabelForProduct(product);

  return <ProductDetailClient product={product} related={related} fabricLabel={fabricLabel} />;
}
