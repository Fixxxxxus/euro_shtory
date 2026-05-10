const why = [
  "Профили и комплектующие из технических каталогов Hunter Douglas / партнёрских линеек.",
  "Подбор системы под форму окна: от прямоугольника до зимнего сада.",
  "Монтажные сценарии: ручка, шнур, цепь, мотор, LiteRise, SmartCord, клей, клипсы.",
  "Цвета профилей: от стандарта до RAL с прозрачной надбавкой в расчёте.",
];

export function WhySection() {
  return (
    <section className="bg-gradient-to-b from-brand-muted/50 to-brand-dark py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Почему выбирают нас</h2>
        <ul className="mt-8 space-y-4 text-sm text-brand-cream/80 md:text-base">
          {why.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-accent" />
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-brand-cream/55">Формулировки согласованы с содержанием PDF-каталогов; детали по каждой системе — в карточках каталога.</p>
      </div>
    </section>
  );
}
