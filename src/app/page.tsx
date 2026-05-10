import Link from "next/link";
import { HeroCinematic } from "@/components/home/HeroCinematic";
import { HeroDualExpand } from "@/components/home/HeroDualExpand";
import { TelegramShowcase } from "@/components/home/TelegramShowcase";
import { BenefitsGrid } from "@/components/home/BenefitsGrid";
import { WhySection } from "@/components/home/WhySection";
import { LeadPhoneForm } from "@/components/LeadPhoneForm";
import { SITE, waLink } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <section className="border-t border-white/10 bg-brand-dark py-10 md:py-16">
        <HeroDualExpand />
      </section>
      <BenefitsGrid />
      <WhySection />
      <TelegramShowcase />
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <LeadPhoneForm />
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={`tel:${SITE.phoneTel}`} className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10">
            Позвонить
          </a>
          <a href={SITE.telegram} target="_blank" rel="noreferrer" className="rounded-full border border-brand-accent/40 px-5 py-2 text-sm text-brand-accent hover:bg-brand-accent/10">
            Telegram
          </a>
          <a href={waLink("Здравствуйте! Хочу консультацию по плиссе / Duette®.")} target="_blank" rel="noreferrer" className="rounded-full bg-brand-accent px-5 py-2 text-sm font-semibold text-brand-dark hover:brightness-110">
            WhatsApp
          </a>
          <Link href="/catalog/" className="rounded-full border border-white/15 px-5 py-2 text-sm text-brand-cream/85 hover:text-white">
            Открыть каталог
          </Link>
        </div>
      </section>
    </>
  );
}
