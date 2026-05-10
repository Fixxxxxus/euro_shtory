import raw from "./realMedia.json";

const PLACEHOLDER = "/images/placeholders/telegram-placeholder.svg";

type ShowcaseTile = { id: string; src: string; title: string };
type ProjectItem = { id: string; src: string; title: string; caption: string };

type RealMediaFile = {
  _comment?: string;
  heroPlisseImage?: string;
  heroDuetteImage?: string;
  showcase?: { src: string; title: string }[];
  projects?: { src: string; title: string; caption?: string }[];
};

const data = raw as RealMediaFile;

function pickPath(v: string | undefined): string {
  const s = (v ?? "").trim();
  return s !== "" ? s : PLACEHOLDER;
}

/** Фон карточки «Плиссе» на главной */
export function getHeroPlisseImage(): string {
  return pickPath(data.heroPlisseImage);
}

/** Фон карточки «Duette» на главной */
export function getHeroDuetteImage(): string {
  return pickPath(data.heroDuetteImage);
}

const defaultShowcase: ShowcaseTile[] = Array.from({ length: 8 }, (_, i) => ({
  id: `ph-${i}`,
  src: PLACEHOLDER,
  title: `Объект ${i + 1}`,
}));

/** Горизонтальная лента на главной («реальные фото») */
export function getShowcaseTiles(): ShowcaseTile[] {
  const list = data.showcase?.filter((x) => x.src?.trim()) ?? [];
  if (!list.length) return defaultShowcase;
  return list.map((x, i) => ({
    id: `s-${i}-${x.src}`,
    src: x.src.trim(),
    title: x.title?.trim() || `Объект ${i + 1}`,
  }));
}

const defaultProjects: ProjectItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p-ph-${i}`,
  title: `Проект ${i + 1}`,
  caption: "Добавьте фото в realMedia.json и public/media/",
  src: PLACEHOLDER,
}));

/** Сетка страницы /projects/ */
export function getProjectItems(): ProjectItem[] {
  const list = data.projects?.filter((x) => x.src?.trim()) ?? [];
  if (!list.length) return defaultProjects;
  return list.map((x, i) => ({
    id: `p-${i}-${x.src}`,
    src: x.src.trim(),
    title: x.title?.trim() || `Проект ${i + 1}`,
    caption: x.caption?.trim() || "",
  }));
}

export function hasCustomHeroImages(): boolean {
  return Boolean(data.heroPlisseImage?.trim() && data.heroDuetteImage?.trim());
}

export function hasCustomShowcase(): boolean {
  return (data.showcase?.filter((x) => x.src?.trim()).length ?? 0) > 0;
}

export function hasCustomProjects(): boolean {
  return (data.projects?.filter((x) => x.src?.trim()).length ?? 0) > 0;
}
