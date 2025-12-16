import { getProductById } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const typeNamesPL: Record<string, string> = {
  processor: "Procesor",
  gpu: "Karta graficzna",
  ram: "Pamięć RAM",
  disk: "Dysk",
};

type Props = {
  params: Promise<{ category: string; "product-id": string }>;
};

export default async function ProductPage({ params }: Props) {
  const { "product-id": productId } = await params;

  const id = Number(productId);
  if (isNaN(id)) return notFound();

  const product = getProductById(id);
  if (!product) return notFound();

  return (
    <div className="mt-[30px] px-6">
      {/* Nazwa produktu */}
      <h3 className="text-2xl font-semibold text-[#5a4fcf] text-center mb-8">
        {product.name}
      </h3>

      {/* Obraz + info */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
        
        {/* LEWA STRONA – obraz */}
        <div className="flex justify-center">
          <Link href={`${product.id}/image`} scroll={false}>
            <Image
              src={product.image}
              alt={product.name}
              width={420}
              height={420}
              className="rounded-lg"
            />
          </Link>
        </div>

        {/* PRAWA STRONA – informacje */}
        <div className="max-w-md text-[18px] text-gray-700 leading-relaxed space-y-2">
          <p><span className="font-semibold">Id:</span> {product.id}</p>
          <p><span className="font-semibold">Kod:</span> {product.code}</p>
          <p>
            <span className="font-semibold">Typ:</span>{" "}
            {typeNamesPL[product.type] ?? product.type}
          </p>
          <p><span className="font-semibold">Cena:</span> {product.price} zł</p>
          <p><span className="font-semibold">Data dodania:</span> {product.date}</p>
          <p><span className="font-semibold">Ilość:</span> {product.amount}</p>
          <p><span className="font-semibold">Opis:</span> {product.description}</p>
        </div>

      </div>
    </div>
  );
}
