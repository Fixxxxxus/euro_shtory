#!/usr/bin/env node
/**
 * Собирает src/data/realMedia.json из файлов в public/media/
 * (jpg/png/webp для карточек; mp4 пропускаются для сеток — их лучше в NEXT_PUBLIC_HERO_VIDEO_URL)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mediaDir = path.join(root, "public", "media");
const outFile = path.join(root, "src", "data", "realMedia.json");

const isImage = (f) => /\.(jpe?g|png|webp)$/i.test(f);
const rel = (f) => `/media/${f}`;

if (!fs.existsSync(mediaDir)) {
  console.error("Нет папки public/media/");
  process.exit(1);
}

const files = fs.readdirSync(mediaDir).filter((f) => !f.startsWith(".") && isImage(f)).sort();

const data = {
  _comment:
    "Сгенерировано scripts/sync-realMedia.mjs из public/media/. Перезапустите dev после изменений.",
  heroPlisseImage: files[0] ? rel(files[0]) : "",
  heroDuetteImage: files[1] ? rel(files[1]) : files[0] ? rel(files[0]) : "",
  showcase: files.slice(0, 16).map((f, i) => ({
    src: rel(f),
    title: `Фото ${i + 1}`,
  })),
  projects: files.map((f, i) => ({
    src: rel(f),
    title: `Объект ${i + 1}`,
    caption: "",
  })),
};

fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + "\n");
console.log(`Записано ${outFile} (${files.length} изображений).`);

const vids = fs.readdirSync(mediaDir).filter((f) => /\.(mp4|webm|mov)$/i.test(f));
if (vids.length) {
  const v = vids.sort().at(-1);
  console.log(`Найдены видео (${vids.length} шт.). Для фона hero добавьте в .env.local, например:`);
  console.log(`  NEXT_PUBLIC_HERO_VIDEO_URL=/media/${v}`);
}
