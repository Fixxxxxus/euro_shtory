import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-brand-muted/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <p className="font-display text-xl font-semibold text-white">{SITE.name}</p>
          <p className="mt-2 max-w-sm text-sm text-brand-cream/70">{SITE.tagline}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-widest text-brand-cream/50">Разделы</span>
          <FooterLink href="/catalog/">Каталог</FooterLink>
          <FooterLink href="/plisse/">Плиссе</FooterLink>
          <FooterLink href="/duette/">Duette®</FooterLink>
          <FooterLink href="/projects/">Проекты</FooterLink>
          <FooterLink href="/contacts/">Контакты</FooterLink>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <span className="text-xs uppercase tracking-widest text-brand-cream/50">Связь</span>
          <a className="text-brand-cream/80 hover:text-white" href={`tel:${SITE.phoneTel}`}>
            {SITE.phoneDisplay}
          </a>
          <a className="text-brand-cream/80 hover:text-white" href={SITE.telegram} target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a className="text-brand-cream/80 hover:text-white" href={SITE.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-brand-accent px-5 py-2 text-sm font-medium text-brand-dark transition hover:brightness-110"
          >
            Связаться
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 py-4 text-center text-xs text-brand-cream/40">
        © {new Date().getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-brand-cream/80 transition hover:text-white">
      {children}
    </Link>
  );
}
