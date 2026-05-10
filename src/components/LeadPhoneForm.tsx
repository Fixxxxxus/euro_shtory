"use client";

import { useState } from "react";
import { SITE, waLink } from "@/lib/site";

export function LeadPhoneForm({ className = "" }: { className?: string }) {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Здравствуйте! Прошу перезвонить: ${phone || "номер не указан"}. Интересуют системы EUROSHTHORY.`;
    window.open(waLink(body), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={submit} className={`glass rounded-2xl p-6 md:p-8 ${className}`}>
      <h3 className="font-display text-xl font-semibold text-white md:text-2xl">Нужна консультация?</h3>
      <p className="mt-2 text-sm text-brand-cream/70">Оставьте телефон — откроем WhatsApp с готовым текстом. Или напишите в Telegram.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="tel"
          name="phone"
          placeholder="+7 …"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none ring-brand-accent/40 placeholder:text-white/35 focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark transition hover:brightness-110"
        >
          Отправить в WhatsApp
        </button>
      </div>
      {sent && <p className="mt-3 text-xs text-brand-accent/90">Если окно не открылось, позвоните: {SITE.phoneDisplay}</p>}
    </form>
  );
}
