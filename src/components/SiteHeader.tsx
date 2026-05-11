"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site";

const links = [
  { href: "/", label: "Главная" },
  { href: "/catalog/", label: "Каталог" },
  { href: "/plisse/", label: "Плиссе" },
  { href: "/duette/", label: "Duette®" },
  { href: "/projects/", label: "Проекты" },
  { href: "/contacts/", label: "Контакты" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-dark/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-white md:text-xl">
          {SITE.name}
        </Link>
        <nav className="site-nav-desktop hidden flex-wrap items-center justify-end gap-1 md:flex">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href} className="relative px-3 py-2 text-sm text-brand-cream/80 transition hover:text-white">
                {active ? <span className="absolute inset-0 -z-10 rounded-lg bg-white/10" aria-hidden /> : null}
                {l.label}
              </Link>
            );
          })}
          <a
            href={`tel:${SITE.phoneTel}`}
            className="ml-2 rounded-full border border-brand-accent/45 px-4 py-2 text-sm font-medium text-brand-accent transition hover:bg-brand-accent/10"
          >
            Связаться
          </a>
        </nav>
        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  return (
    <details className="site-nav-mobile group relative md:hidden">
      <summary className="list-none cursor-pointer rounded-lg border border-white/15 px-3 py-2 text-sm text-white marker:hidden [&::-webkit-details-marker]:hidden">
        Меню
      </summary>
      <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-brand-muted/95 p-2 shadow-2xl backdrop-blur-xl">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`block rounded-lg px-3 py-2 text-sm ${pathname === l.href ? "bg-white/10 text-white" : "text-brand-cream/85 hover:bg-white/5"}`}
          >
            {l.label}
          </Link>
        ))}
        <a href={`tel:${SITE.phoneTel}`} className="mt-1 block rounded-lg px-3 py-2 text-sm text-brand-accent hover:bg-white/5">
          Связаться
        </a>
      </div>
    </details>
  );
}
