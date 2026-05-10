"use client";

export function ComparisonPanel({ highlight }: { highlight: "plisse" | "duette" }) {
  const pActive = highlight === "plisse";
  const dActive = highlight === "duette";

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2">
      <div
        className={`rounded-2xl border p-6 md:p-8 ${pActive ? "border-brand-accent/60 bg-brand-accent/10 shadow-lg shadow-brand-accent/10" : "border-white/10 bg-white/[0.03] opacity-90"}`}
      >
        <h2 className="font-display text-xl font-semibold text-brand-accent">Плиссе</h2>
        <ul className="mt-4 space-y-3 text-sm text-brand-cream/85">
          <li>Одна гармошка — классическая геометрия складки.</li>
          <li>Ткань прошивается для нитей управления: есть микроотверстия, в том числе у блэкаута.</li>
          <li>Складка 20 мм (стандарт) и 32 мм для больших окон.</li>
        </ul>
      </div>
      <div
        className={`rounded-2xl border p-6 md:p-8 ${dActive ? "border-brand-accent/60 bg-brand-accent/10 shadow-lg shadow-brand-accent/10" : "border-white/10 bg-white/[0.03] opacity-90"}`}
      >
        <h2 className="font-display text-xl font-semibold text-brand-accent">Duette®</h2>
        <ul className="mt-4 space-y-3 text-sm text-brand-cream/85">
          <li>Двойная гармошка — сэндвич с воздушной прослойкой.</li>
          <li>Верёвочки внутри ткани, наружу полотно без сквозных отверстий.</li>
          <li>Выше тепло- и шумоизоляция за счёт ячеистой структуры.</li>
        </ul>
      </div>
    </div>
  );
}
