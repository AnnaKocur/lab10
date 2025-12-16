"use client";

import { useState } from "react";
import {
  getAllProductsAlphabetically,
  getAllProductsNewest,
  getProductsInStock,
} from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

const typeNamesPL: Record<string, string> = {
  processor: "Procesory",
  gpu: "Karty graficzne",
  ram: "Pamięci RAM",
  disk: "Dyski",
};

export default function ProductList() {
  const [sortType, setSortType] = useState<"alphabetical" | "newest">(
    "alphabetical"
  );
  const [onlyInStock, setOnlyInStock] = useState(false);

  const sortedProducts =
    sortType === "alphabetical"
      ? getAllProductsAlphabetically()
      : getAllProductsNewest();

  const products = onlyInStock
    ? getProductsInStock().sort((a, b) =>
        sortType === "alphabetical"
          ? a.name.localeCompare(b.name)
          : b.date.localeCompare(a.date)
      )
    : sortedProducts;

  return (
    <div className="mt-[30px] px-6">
      {/* Tytuł */}
      <h3 className="text-2xl font-semibold text-[#5a4fcf] text-center">
        PRODUKTY
      </h3>

      {/* Kategorie */}
      <div className="text-center mt-6">
        <p className="text-[18px] text-gray-700 mb-3">
          Wybierz kategorię
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link href="/product-list/disk" className="text-[#5a4fcf] underline">
            Dyski
          </Link>
          <Link href="/product-list/gpu" className="text-[#5a4fcf] underline">
            Karty graficzne
          </Link>
          <Link href="/product-list/ram" className="text-[#5a4fcf] underline">
            Pamięci RAM
          </Link>
          <Link
            href="/product-list/processor"
            className="text-[#5a4fcf] underline"
          >
            Procesory
          </Link>
        </div>
      </div>

      {/* Filtry */}
      <div className="mt-8 text-center text-[16px] text-gray-700">
        <div className="flex justify-center gap-6 flex-wrap">
          <label className="cursor-pointer">
            <input
              type="radio"
              checked={sortType === "alphabetical"}
              onChange={() => setSortType("alphabetical")}
              className="mr-1"
            />
            Alfabetycznie
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              checked={sortType === "newest"}
              onChange={() => setSortType("newest")}
              className="mr-1"
            />
            Najnowsze
          </label>

          <label className="cursor-pointer">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={() => setOnlyInStock(!onlyInStock)}
              className="mr-1"
            />
            Tylko dostępne
          </label>
        </div>
      </div>

      {/* Lista produktów */}
      <div
        className="
          grid
          grid-cols-[repeat(auto-fill,minmax(240px,1fr))]
          gap-6
          mt-10
        "
      >
        {products.map((p) => (
          <div
            key={p.id}
            className="
              text-center
              flex flex-col
              items-center
            "
          >
            <Link
              href={`/product-list/${p.type}/${p.id}`}
              className="text-[18px] font-semibold text-[#5a4fcf] underline mb-2"
            >
              {p.name}
            </Link>

            <Image
              className="rounded-lg mb-3"
              src={p.image}
              alt={p.name}
              width={160}
              height={160}
            />

            <p className="text-gray-700">
              Typ: {typeNamesPL[p.type] ?? p.type}
            </p>
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
