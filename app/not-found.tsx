import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Nie znaleziono strony
            </h1>

            <p className="text-gray-600 mb-2">
                Nie znaleziono strony, której szukasz.
            </p>

            <p className="text-gray-600">
                Sprawdź adres URL lub{" "}
                <Link
                    href="/"
                    className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
                >
                    wróć na stronę główną
                </Link>
                .
            </p>
        </main>
    );
}
