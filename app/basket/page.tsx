import Image from "next/image";
import { getCartWithItems, getCartTotal } from "@/lib/actions/cart";

const USER_ID = Number(process.env.CART_USER_ID);

export default async function Basket() {
  if (!USER_ID) {
    return (
      <div className="text-center mt-10">
        Brak użytkownika
      </div>
    );
  }

  const cart = await getCartWithItems(USER_ID);
  const total = await getCartTotal(USER_ID);

  // 🟡 PUSTY KOSZYK
  if (!cart || cart.items.length === 0) {
    return (
      <div className="mx-auto mt-[30px] p-[30px] text-center">
        <h3 className="text-2xl font-semibold text-[#5a4fcf]">
          KOSZYK
        </h3>
        <p className="mt-3 text-[18px] text-gray-700">
          Koszyk jest pusty.
        </p>
      </div>
    );
  }

  // 🟢 KOSZYK Z PRODUKTAMI
  return (
    <div className="max-w-3xl mx-auto mt-[30px] p-[30px]">
      <h3 className="text-2xl font-semibold text-[#5a4fcf] text-center mb-6">
        KOSZYK
      </h3>

      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex gap-4 items-center border p-4 rounded-lg"
          >
            {item.product.imagePath && (
              <Image
                src={item.product.imagePath}
                alt={item.product.name}
                width={80}
                height={80}
                className="rounded"
              />
            )}

            <div className="flex-1">
              <p className="font-semibold">{item.product.name}</p>
              <p className="text-sm text-gray-600">
                Cena: {Number(item.product.price).toFixed(2)} zł
              </p>
              <p className="text-sm text-gray-600">
                Ilość: {item.quantity}
              </p>
            </div>

            <div className="font-semibold">
              {(Number(item.product.price) * item.quantity).toFixed(2)} zł
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="text-xl font-bold">
          Suma: {total.toFixed(2)} zł
        </p>
      </div>
    </div>
  );
}
