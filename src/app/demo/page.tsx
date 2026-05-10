import type { Metadata } from "next";
import { DemoAnimations } from "./DemoAnimations";

export const metadata: Metadata = {
  title: "Демо анимаций",
  description: "Все ключевые motion-эффекты для показа клиенту.",
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <h1 className="font-display text-4xl font-semibold text-white">Демонстрация эффектов</h1>
      <p className="mt-3 max-w-2xl text-sm text-brand-cream/70">
        Страница для презентации: появление блоков, масштаб, пружинные карточки, модальное окно, кастомные классы Tailwind.
      </p>
      <DemoAnimations />
    </div>
  );
}
