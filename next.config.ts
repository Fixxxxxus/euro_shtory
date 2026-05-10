import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

/** Смена query у hero-ассетов при обновлении файлов, иначе браузер держит старый MP4/JPEG по тому же URL. */
function heroAssetRevision(): string {
  const root = process.cwd();
  const video = path.join(root, "public", "videos", "hero.mp4");
  const poster = path.join(root, "public", "images", "hero-video-poster.jpg");
  const mtimes = [video, poster].map((p) => {
    try {
      return fs.statSync(p).mtimeMs;
    } catch {
      return 0;
    }
  });
  const rev = Math.max(...mtimes);
  return rev > 0 ? String(Math.round(rev)) : "0";
}

const basePathRaw = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();
const basePath =
  basePathRaw === ""
    ? undefined
    : basePathRaw.startsWith("/")
      ? basePathRaw
      : `/${basePathRaw}`;

const nextConfig: NextConfig = {
  ...(basePath ? { basePath } : {}),
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_HERO_ASSET_REVISION: heroAssetRevision(),
    NEXT_PUBLIC_BASE_PATH: basePath ?? "",
  },
};

export default nextConfig;
