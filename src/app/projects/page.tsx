import type { Metadata } from "next";
import { ProjectsGallery } from "./ProjectsGallery";

export const metadata: Metadata = {
  title: "Проекты",
  description: "Галерея реальных монтажей EUROSHTHORY — визуал из Telegram-канала.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
      <h1 className="font-display text-4xl font-semibold text-white md:text-5xl">Проекты</h1>
      <p className="mt-3 max-w-2xl text-sm text-brand-cream/70">
        Добавьте элементы в массив <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">projects</code> в файле{" "}
        <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">src/data/realMedia.json</code> — локальные пути вида{" "}
        <code className="text-xs">/media/photo.jpg</code> (файл лежит в <code className="text-xs">public/media/</code>) или прямые ссылки <code className="text-xs">https://…</code>.
      </p>
      <div className="mt-10">
        <ProjectsGallery />
      </div>
    </div>
  );
}
