const benefits = [
  { title: "Тепло зимой", text: "У Duette® воздух в ячейке, у плотного плиссе меньше продувов — батарею не крутите на максимум." },
  { title: "Свет без выгорания", text: "Ткань рассеивает солнце; UV-покрытия в нормальных линейках есть — мебель и пол не «выцветают» за сезон." },
  { title: "Дети и питомцы", text: "LiteRise и аккуратные шнуровые схемы: меньше болтающихся хвостов под рукой." },
  { title: "Тише с улицы", text: "Полотно не «звукоизоляция кинозала», но гул трафика приглушает заметно." },
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
