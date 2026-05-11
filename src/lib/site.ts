import { withBasePath } from "@/lib/basePath";

/** Публичные переменные: NEXT_PUBLIC_* (задаются в .env / хостинге). См. `.env.example`. */

function env(name: string, fallback: string): string {
  const v = process.env[name];
  return typeof v === "string" && v.trim() !== "" ? v.trim() : fallback;
}

/** Query из mtime файлов (next.config.ts → NEXT_PUBLIC_HERO_ASSET_REVISION), только для локальных путей. */
function withHeroAssetCache(url: string): string {
  const rev = env("NEXT_PUBLIC_HERO_ASSET_REVISION", "0");
  if (!url || rev === "0") return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}hc=${rev}`;
}

/** Дефолты совпадают с контактами из канала @euroshtory_ru (можно переопределить в .env.local). */
const phoneTel = env("NEXT_PUBLIC_PHONE_TEL", "+79637123515");
const waDigits = phoneTel.replace(/\D/g, "");

export const SITE = {
  name: env("NEXT_PUBLIC_SITE_NAME", "EUROSHTHORY"),
  tagline: env(
    "NEXT_PUBLIC_SITE_TAGLINE",
    "Премиальные системы затемнения для вашего дома",
  ),
  telegramChannel: env("NEXT_PUBLIC_TELEGRAM_CHANNEL_URL", "https://t.me/euroshtory_ru"),
  telegram: env("NEXT_PUBLIC_TELEGRAM_URL", "https://t.me/euroshtory_ru"),
  /** Полный URL вида https://wa.me/79991234567 или пусто → соберём из телефона */
  whatsapp: env("NEXT_PUBLIC_WHATSAPP_URL", `https://wa.me/${waDigits}`),
  phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "+7 (963) 712-35-15"),
  phoneTel,
  address: env("NEXT_PUBLIC_ADDRESS", "Адрес уточняется"),
  workHours: env("NEXT_PUBLIC_WORK_HOURS", "Пн–Сб: 10:00–19:00 · Вс: по договорённости"),
} as const;

/** Фон главного экрана: HTTPS URL или путь от корня сайта. По умолчанию — оптимизированный ролик из public/videos/. */
const heroVideoRaw = env("NEXT_PUBLIC_HERO_VIDEO_URL", "/videos/hero.mp4");
const heroPosterRaw = env("NEXT_PUBLIC_HERO_VIDEO_POSTER_URL", "/images/hero-video-poster.jpg");

export const HERO_VIDEO_URL = withBasePath(withHeroAssetCache(heroVideoRaw));
export const HERO_VIDEO_POSTER = withBasePath(withHeroAssetCache(heroPosterRaw));

/**
 * Как вести себя с вертикальным (9:16) роликом в широком hero.
 * auto — по loadedmetadata: портрет → по центру object-contain, альбом — object-cover на весь блок.
 * true/1 — всегда «столбик» по центру (если источник горизонтальный, будут поля).
 * false/0 — всегда object-cover на весь блок.
 */
const verticalRaw = env("NEXT_PUBLIC_HERO_VIDEO_VERTICAL", "auto").toLowerCase();
export const HERO_VIDEO_VERTICAL_MODE: "auto" | "on" | "off" =
  verticalRaw === "true" || verticalRaw === "1"
    ? "on"
    : verticalRaw === "false" || verticalRaw === "0"
      ? "off"
      : "auto";

export function messengerBody(text: string): string {
  return encodeURIComponent(text);
}

export function waLink(body: string): string {
  const base = SITE.whatsapp.split("?")[0] ?? SITE.whatsapp;
  return `${base}?text=${messengerBody(body)}`;
}

export function telegramTextLink(body: string): string {
  const base = SITE.telegram.split("?")[0] ?? SITE.telegram;
  return `${base}?text=${messengerBody(body)}`;
}

export function tgShareLink(body: string): string {
  return `https://t.me/share/url?url=${encodeURIComponent(SITE.telegramChannel)}&text=${messengerBody(body)}`;
}
