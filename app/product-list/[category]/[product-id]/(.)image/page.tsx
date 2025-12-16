"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProductById } from "@/lib/products";
import { use } from "react";

export default function ImageModal({ params }: { params: Promise<{ category: string; "product-id": string }> }) {
    const router = useRouter();

    const { "product-id": productId } = use(params);  // ⬅️ używamy React.use() !!!

    const id = Number(productId);
    const product = getProductById(id);

    if (!product) return <div>Nie znaleziono produktu!</div>;

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-xl shadow-xl relative">
                <button onClick={() => router.back()} className="absolute top-2 right-2 text-xl font-bold">
                    ✕
                </button>

                <Image
                    src={product.image}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="rounded-xl"
                />
            </div>
        </div>
    );
}
