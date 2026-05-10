import type { Metadata } from "next";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Системы плиссе и Duette® с фильтрами по монтажу и форме окна.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
