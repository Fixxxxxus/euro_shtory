import type { MountSystem, WindowShape } from "@/types/catalog";

export const MOUNT_LABELS: Record<MountSystem, string> = {
  handle_on_frame: "С ручкой на раму",
  cord: "Со шнуром",
  chain: "С цепочкой",
  motor: "С мотором",
  day_night: "Система день-ночь",
  literise: "LiteRise",
  glue: "На клею",
  clips: "На клипсах",
};

export const SHAPE_LABELS: Record<WindowShape, string> = {
  rectangle: "Прямоугольные",
  triangle: "Треугольник",
  trapezoid: "Трапеция",
  arch: "Арка",
  winter_garden: "Зимний сад",
};
