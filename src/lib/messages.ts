import type { SystemProduct } from "@/types/catalog";

export function buildInquiryMessage(
  product: SystemProduct,
  fabricLabel: string,
  widthCm: string,
  heightCm: string,
): string {
  return `Здравствуйте! Меня интересует ${product.name} с типом ткани ${fabricLabel}. Мои размеры: ширина ${widthCm} см, высота ${heightCm} см. Спасибо.`;
}
