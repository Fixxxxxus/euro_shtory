/** Подкаталог на GitHub Pages (`/repo`). Задаётся только при сборке под Pages, см. `.github/workflows/pages.yml`. */
const raw = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim().replace(/\/$/, "");
export const BASE_PATH = raw === "" ? "" : raw.startsWith("/") ? raw : `/${raw}`;

export function withBasePath(path: string): string {
  if (!path || /^https?:\/\//i.test(path)) return path;
  if (!BASE_PATH) return path;
  if (path.startsWith(BASE_PATH)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
