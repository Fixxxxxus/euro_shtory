const why = [
  "Работаем с тем, что есть в техкаталогах Hunter Douglas и смежных линейках — не с «рисунками из головы».",
  "Окно кривое, арка, зимний сад — подбираем систему так, чтобы потом не стыдно было смотреть на крепёж.",
  "Управление: ручка, шнур, цепь, мотор, LiteRise, SmartCord, клей, клипсы — что уместно по месту, то и ставим.",
  "Профили: от стандартных до RAL; отдельная строка в смете, без «сюрприза» в конце.",
];

export function WhySection() {
  return (
    <section className="bg-gradient-to-b from-brand-muted/50 to-brand-dark py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">Как мы к этому подходим</h2>
        <ul className="mt-8 space-y-4 text-sm text-brand-cream/80 md:text-base">
          {why.map((line, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-accent" />
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-brand-cream/55">Цифры и комплектация по каждой системе — в карточках каталога, там же PDF, если нужно копнуть глубже.</p>
      </div>
    </section>
  );
}
