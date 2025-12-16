import { getProductsByType } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

const categoryNamesPL: Record<string, string> = {
  processor: "Procesory",
  gpu: "Karty graficzne",
  ram: "Pamięci RAM",
  disk: "Dyski",
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  const products = getProductsByType(category.toLowerCase());
  if (products.length === 0) return notFound();

  return (
    <div className="mt-[30px] px-6">
      {/* Tytuł kategorii */}
      <h3 className="text-2xl font-semibold text-[#5a4fcf] text-center mb-8">
        {categoryNamesPL[category] ?? category.toUpperCase()}
      </h3>

      {/* Lista produktów */}
      <div
        className="
          grid
          grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
          gap-8
        "
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="text-center flex flex-col items-center"
          >
            <Link
              href={`/product-list/${category}/${p.id}`}
              className="text-[18px] font-semibold text-[#5a4fcf] underline mb-2"
            >
              {p.name}
            </Link>

            <Image
              src={p.image}
              alt={p.name}
              width={160}
              height={160}
              className="rounded-lg mb-3"
            />

            <p className="text-gray-700">
              Ilość: {p.amount}
            </p>
            <p className="text-gray-700">
              Cena: {p.price.toFixed(2)} zł
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
