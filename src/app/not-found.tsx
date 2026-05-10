import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <h1 className="font-display text-4xl font-semibold text-white">Страница не найдена</h1>
      <p className="mt-4 text-sm text-brand-cream/70">Проверьте адрес или перейдите в каталог.</p>
      <Link href="/catalog/" className="mt-8 rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-dark hover:brightness-110">
        В каталог
      </Link>
    </div>
  );
}
