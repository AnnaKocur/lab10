import { getAllProductsAlphabetically } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

export default function DiscountsPage() {
  const all = getAllProductsAlphabetically();
  const random = [...all].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div className="mt-[30px] px-6">
      <h3 className="text-2xl font-semibold text-[#5a4fcf] text-center mb-6">
        🔥 Promocje
      </h3>

      <div className="flex gap-8 justify-center flex-wrap">
        {random.map((p) => (
          <div
            key={p.id}
            className="text-center flex flex-col items-center"
          >
            <Link
              href={`/product-list/${p.type}/${p.id}`}
              className="underline text-[#5a4fcf] font-semibold mb-2"
            >
              {p.name}
            </Link>

            <Image
              src={p.image}
              alt={p.name}
              width={120}
              height={120}
              className="rounded-lg mb-2"
            />

            <p className="text-gray-500 line-through">
              {p.price.toFixed(2)} zł
            </p>
            <p className="text-gray-700 font-semibold">
              {(p.price * 0.9).toFixed(2)} zł
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
