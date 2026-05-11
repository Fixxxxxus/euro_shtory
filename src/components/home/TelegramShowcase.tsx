import Link from "next/link";
import { MediaFillImage } from "@/components/MediaFillImage";
import { SITE } from "@/lib/site";
import { getShowcaseTiles, hasCustomShowcase } from "@/data/realMedia";

export function TelegramShowcase() {
  const tiles = getShowcaseTiles();
  const custom = hasCustomShowcase();

  return (
    <section className="border-y border-white/10 bg-brand-muted/40 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Проекты</h2>
            <p className="mt-2 max-w-xl text-sm text-brand-cream/70">
              {custom ? (
                <>Подборка из нашей медиатеки — по мере съёмок будем подменять кадры.</>
              ) : (
                <>
                  Пока здесь заглушки: живые фото и короткие ролики смотрите в{" "}
                  <a href={SITE.telegramChannel} className="text-brand-accent hover:underline" target="_blank" rel="noreferrer">
                    Telegram
                  </a>
                  . Свои объекты на сайт — по договорённости, напишите.
                </>
              )}
            </p>
          </div>
          <Link
            href="/projects/"
            className="inline-flex w-fit items-center justify-center rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            Все проекты
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 pt-2 [scrollbar-width:thin]">
          {tiles.map((t) => (
            <figure
              key={String(t.id)}
              className="relative w-[min(280px,78vw)] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10"
            >
              <div className="relative aspect-[4/5]">
                <MediaFillImage src={t.src} alt={t.title} sizes="280px" />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-sm text-white">
                  {t.title}
                  {t.src.includes("telegram-placeholder") ? (
                    <span className="mt-1 block text-[10px] uppercase tracking-wider text-brand-accent">заглушка</span>
                  ) : null}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
