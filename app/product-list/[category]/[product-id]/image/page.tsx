import Image from "next/image";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function ImagePage({ params }: any) {
  const { "product-id": productId } = await params;

  const id = Number(productId);
  const product = getProductById(id);

  if (!product) return notFound();

  return (
    <div className="mt-[30px] px-6 flex flex-col items-center text-center">
      <h3 className="text-2xl font-semibold text-[#5a4fcf] mb-6">
        {product.name} – zdjęcie
      </h3>

      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
      />
    </div>
  );
}
