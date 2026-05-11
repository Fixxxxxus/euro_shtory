"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";

function ChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8 10h.01M12 10h.01M16 10h.01M21 11.5c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4.255-.949L3 21v-4.637A8.965 8.965 0 013 11.5C3 7.082 7.03 3 12 3s9 3.582 9 8.5z"
        stroke="currentColor"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      {open ? (
        <div className="glass flex flex-col gap-2 rounded-2xl p-3 shadow-2xl">
          <a
            href={`tel:${SITE.phoneTel}`}
            className="rounded-xl px-4 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Позвонить
          </a>
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-4 py-3 text-sm text-white transition hover:bg-white/10"
          >
            WhatsApp
          </a>
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-4 py-3 text-sm text-white transition hover:bg-white/10"
          >
            Telegram
          </a>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-brand-dark shadow-lg shadow-brand-accent/30 transition hover:scale-105 hover:brightness-110 active:scale-95"
        aria-expanded={open}
        aria-label="Контакты"
      >
        <ChatBubbleIcon className="h-7 w-7" />
      </button>
    </div>
  );
}
