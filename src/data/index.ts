import type { FabricGroup, SystemProduct } from "@/types/catalog";
import fabricGroupsJson from "./fabricGroups.json";
import systemsJson from "./systems.json";

export const fabricGroups = fabricGroupsJson as FabricGroup[];
export const systems = systemsJson as SystemProduct[];

export function getSystemBySlug(slug: string): SystemProduct | undefined {
  return systems.find((s) => s.slug === slug);
}

export function getRelatedSystems(slugs: string[]): SystemProduct[] {
  return slugs
    .map((slug) => getSystemBySlug(slug))
    .filter((s): s is SystemProduct => Boolean(s));
}

export function fabricLabelForProduct(product: SystemProduct): string {
  const g = fabricGroups.find((f) => f.id === product.fabricGroupId);
  return g?.label ?? `Ткань ${product.wabenWidth} мм`;
}
