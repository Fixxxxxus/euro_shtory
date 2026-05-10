"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SystemProduct } from "@/types/catalog";
import { MediaGallery } from "@/components/MediaGallery";
import { MOUNT_LABELS, SHAPE_LABELS } from "@/lib/labels";
import { buildInquiryMessage } from "@/lib/messages";
import { SITE, tgShareLink, waLink } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";

type Props = {
  product: SystemProduct;
  related: SystemProduct[];
  fabricLabel: string;
};

export function ProductDetailClient({ product, related, fabricLabel }: Props) {
  const [w, setW] = useState("120");
  const [h, setH] = useState("160");
  const [copied, setCopied] = useState(false);

  const message = useMemo(
    () => buildInquiryMessage(product, fabricLabel, w, h),
    [product, fabricLabel, w, h],
  );

  async function copyTemplate() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <nav className="mb-8 text-xs text-brand-cream/50">
        <Link href="/catalog/" className="hover:text-white">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-cream/80">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <MediaGallery images={product.images} />
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-accent/90">
            {product.type === "plisse" ? "Плиссе" : "Duette®"} · модель {product.model}
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-white md:text-4xl">{product.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-cream/75">{product.shortDescription}</p>
          <p className="mt-4 text-sm text-brand-cream/80">{product.whyCool}</p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Характеристики</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-brand-cream/50">Тип ткани / ячейка</dt>
                <dd className="text-white">{fabricLabel}</dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Управление / монтаж</dt>
                <dd className="text-white">{product.mountSystems.map((m) => MOUNT_LABELS[m]).join(", ")}</dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Ширина (мин–макс)</dt>
                <dd className="text-white">
                  {product.minWidthCm}–{product.maxWidthCm} см
                </dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Высота (мин–макс)</dt>
                <dd className="text-white">
                  {product.minHeightCm}–{product.maxHeightCm} см
                </dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Макс. площадь</dt>
                <dd className="text-white">{product.maxAreaM2} м²</dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Формы окна</dt>
                <dd className="text-white">{product.windowShapes.map((s) => SHAPE_LABELS[s]).join(", ")}</dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Боковое натяжение</dt>
                <dd className="text-white">{product.hasVerspannung ? "Да" : "Нет / уточняется"}</dd>
              </div>
              <div>
                <dt className="text-brand-cream/50">Architella®</dt>
                <dd className="text-white">
                  {product.architellaAvailable ? "Доступна для части тканей (по PDF)" : "Не для всех комбинаций / нет"}
                </dd>
              </div>
            </dl>
            <div className="mt-5 border-t border-white/10 pt-4 text-sm text-brand-cream/75">
              <p className="font-medium text-white/90">Цвет профиля</p>
              <p className="mt-1">{product.profileColorsNote}</p>
              <p className="mt-3 font-medium text-white/90">Опции</p>
              <p className="mt-1">{product.optionsNote}</p>
              {product.motorNote && (
                <>
                  <p className="mt-3 font-medium text-white/90">Моторизация</p>
                  <p className="mt-1">{product.motorNote}</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-brand-accent/25 bg-brand-accent/5 p-5">
            <h2 className="text-sm font-semibold text-brand-accent">Как формируется стоимость (без фикс. цен в евро)</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-brand-cream/80">
              <li>Площадь и габариты в пределах max по каталогу.</li>
              <li>Тип ткани (20–64 мм), степень затемнения, фактура.</li>
              <li>Система управления: ручка, шнур, цепь, LiteRise, SmartCord, мотор.</li>
              <li>Цвет профиля: стандарт или RAL с надбавкой.</li>
              <li>Опции: боковые направляющие S1/S3, Klemmträger K1, порошковое покрытие.</li>
              <li>Сложность монтажа: форма окна, зимний сад, мансард.</li>
            </ul>
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Рассчитать стоимость</h2>
            <div className="flex flex-wrap gap-3">
              <label className="flex flex-col text-xs text-brand-cream/60">
                Ширина, см
                <input value={w} onChange={(e) => setW(e.target.value)} className="mt-1 w-28 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white" />
              </label>
              <label className="flex flex-col text-xs text-brand-cream/60">
                Высота, см
                <input value={h} onChange={(e) => setH(e.target.value)} className="mt-1 w-28 rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm text-white" />
              </label>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-brand-cream/85">
              <p className="text-xs uppercase tracking-wider text-brand-cream/45">Шаблон сообщения</p>
              <p className="mt-2 whitespace-pre-wrap">{message}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyTemplate}
                className="rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.98]"
              >
                {copied ? "Скопировано" : "Скопировать текст"}
              </button>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-110"
              >
                WhatsApp
              </a>
              <a
                href={tgShareLink(message)}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-brand-accent/50 px-5 py-3 text-sm font-medium text-brand-accent transition hover:bg-brand-accent/10"
              >
                Telegram
              </a>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/90">Полезные материалы</h2>
            <ul className="mt-3 space-y-2 text-sm text-brand-accent/90">
              <li>
                <Link href="/plisse/" className="hover:underline">
                  Сравнение технологий: Плиссе
                </Link>
              </li>
              <li>
                <Link href="/duette/" className="hover:underline">
                  Сравнение технологий: Duette®
                </Link>
              </li>
              <li>
                <a href={SITE.telegramChannel} target="_blank" rel="noreferrer" className="hover:underline">
                  Фото и видео объектов в Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-white">Похожие системы</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
