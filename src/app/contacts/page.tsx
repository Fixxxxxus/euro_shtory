import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Телефон, Telegram и WhatsApp EUROSHTHORY.",
};

export default function ContactsPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-display text-4xl font-semibold text-white">Контакты</h1>
      <p className="mt-4 text-sm text-brand-cream/70">Без сложных форм — только прямой контакт.</p>

      <div className="mt-10 space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-cream/50">Телефон</p>
          <a href={`tel:${SITE.phoneTel}`} className="mt-2 block font-display text-2xl text-white hover:text-brand-accent">
            {SITE.phoneDisplay}
          </a>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-4 inline-flex rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-110"
          >
            Позвонить
          </a>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-widest text-brand-cream/50">Мессенджеры</p>
          <div className="mt-4 flex flex-col gap-3">
            <a href={SITE.telegram} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white hover:bg-white/10">
              Telegram
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="rounded-xl border border-white/15 px-4 py-3 text-sm text-white hover:bg-white/10">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-sm text-brand-cream/75">
          <p className="text-xs uppercase tracking-widest text-brand-cream/50">Адрес</p>
          <p className="mt-2">{SITE.address}</p>
          <p className="mt-4 text-xs uppercase tracking-widest text-brand-cream/50">Режим</p>
          <p className="mt-2">{SITE.workHours}</p>
        </div>
      </div>
    </div>
  );
}
