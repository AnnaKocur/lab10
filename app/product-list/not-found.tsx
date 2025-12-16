import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        min-h-[60vh]
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
      "
    >
      <h3 className="text-2xl font-semibold text-[#5a4fcf]">
        NIE ZNALEZIONO STRONY
      </h3>

      <p className="mt-3 text-[18px] text-gray-700">
        Nie znaleziono strony produktów.
      </p>

      <p className="mt-2 text-[18px] text-gray-700">
        Sprawdź adres URL lub{" "}
        <Link
          href="/"
          className="text-[#5a4fcf] underline hover:opacity-80 focus:outline-none transition-colors"
        >
          wróć na stronę główną
        </Link>
        .
      </p>
    </main>
  );
}
