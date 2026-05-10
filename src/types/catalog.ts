export type ProductType = "plisse" | "duette";

export type MountSystem =
  | "handle_on_frame"
  | "cord"
  | "chain"
  | "motor"
  | "day_night"
  | "literise"
  | "glue"
  | "clips";

export type WindowShape =
  | "rectangle"
  | "triangle"
  | "trapezoid"
  | "arch"
  | "winter_garden";

export interface ImageHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  caption?: string;
  isTelegramPlaceholder?: boolean;
  hotspots?: ImageHotspot[];
}

export interface SystemProduct {
  slug: string;
  name: string;
  shortDescription: string;
  type: ProductType;
  model: string;
  wabenWidth: number;
  fabricGroupId: string;
  minWidthCm: number;
  maxWidthCm: number;
  minHeightCm: number;
  maxHeightCm: number;
  maxAreaM2: number;
  mountSystems: MountSystem[];
  windowShapes: WindowShape[];
  hasVerspannung: boolean;
  architellaAvailable: boolean;
  roofPremium: boolean;
  roofStandard: boolean;
  profileColorsNote: string;
  optionsNote: string;
  whyCool: string;
  relatedSlugs: string[];
  images: ProductImage[];
  motorNote: string | null;
}

export interface FabricGroup {
  id: string;
  type: ProductType;
  label: string;
  description: string;
}
