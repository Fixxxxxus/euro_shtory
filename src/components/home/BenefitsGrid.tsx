const benefits = [
  { title: "Энергосбережение", text: "Воздушная прослойка Duette® и плотные ткани плиссе снижают теплопотери." },
  { title: "Защита от выгорания", text: "Диффузный свет и UV-стойкие покрытия продлевают жизнь интерьеру." },
  { title: "Детская безопасность", text: "LiteRise и продуманные шнуровые системы — меньше свисающих элементов." },
  { title: "Акустический комфорт", text: "Тканевые полотна поглощают часть уличного шума." },
];

export function BenefitsGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Преимущества для дома</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-display text-lg font-semibold text-brand-accent">{b.title}</h3>
            <p className="mt-2 text-sm text-brand-cream/75">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
