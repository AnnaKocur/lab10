import { auth } from "@/lib/auth";
import {
  getCartWithItems,
  getCartTotal,
  addSampleProductToCart,
  getAllUsersWithCarts,
  transferCart,
} from "@/lib/actions/cart";
import { SignIn, SignOut } from "@/components/auth-components";
import { redirect } from "next/navigation";

export default async function BasketPage() {
  const session = await auth();

  /* =========================
     NIEZALOGOWANY
     ========================= */
  if (!session?.user?.id) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl text-gray-600 mb-4">
          Musisz się zalogować, aby zobaczyć koszyk.
        </p>
        <SignIn provider="github" />
      </div>
    );
  }

  /* =========================
     ZALOGOWANY
     ========================= */
  const userId = session.user.id;
  const cart = await getCartWithItems(userId);
  const total = await getCartTotal(userId);
  const users = await getAllUsersWithCarts();

  /* =========================
     PUSTY KOSZYK
     ========================= */
  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="mb-2 text-gray-600">
          Zalogowany jako: <b>{session.user.email}</b>
        </p>

        <SignOut />

        <p className="mt-4 text-xl text-gray-600">
          Koszyk jest pusty
        </p>

        {/* DODANIE PRZYKŁADOWEGO PRODUKTU */}
        <form
          action={async () => {
            "use server";
            await addSampleProductToCart(userId);
            redirect("/basket");
          }}
          className="mt-6"
        >
          <button className="bg-[#5a4fcf] text-white px-6 py-3 rounded-md hover:scale-105 transition">
            Dodaj przykładowy produkt
          </button>
        </form>

        {/* TRANSFER KOSZYKA */}
        <TransferCartForm users={users} />
      </div>
    );
  }

  /* =========================
     KOSZYK Z PRODUKTAMI
     ========================= */
  return (
    <div className="max-w-3xl mx-auto mt-10">
      <p className="mb-2 text-gray-600">
        Zalogowany jako: <b>{session.user.email}</b>
      </p>

      <SignOut />

      <h1 className="text-2xl font-semibold mb-6 mt-4">Koszyk</h1>

      {cart.items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between border p-4 mb-4 rounded"
        >
          <div>
            <p className="font-semibold">{item.product.name}</p>
            <p>Ilość: {item.quantity}</p>
            <p>Cena: {Number(item.product.price)} zł</p>
          </div>

          <div className="font-bold">
            {Number(item.product.price) * item.quantity} zł
          </div>
        </div>
      ))}

      <div className="text-right text-xl font-bold mt-6">
        Suma: {total} zł
      </div>

      <div className="text-right mt-6">
        <button className="bg-[#5a4fcf] text-white px-6 py-3 rounded-md hover:scale-105 transition">
          Przejdź do kasy
        </button>
      </div>

      <TransferCartForm users={users} />
    </div>
  );
}

/* =========================
   KOMPONENT TRANSFERU
   ========================= */
function TransferCartForm({ users }: { users: any[] }) {
  return (
    <form
      action={async (formData) => {
        "use server";

        const fromUserId = formData.get("fromUserId") as string;
        const toUserId = formData.get("toUserId") as string;

        if (!fromUserId || !toUserId || fromUserId === toUserId) {
          redirect("/basket?error=same-user");
        }

        await transferCart(fromUserId, toUserId);
        redirect("/basket");
      }}
      className="mt-12 border-t pt-6"
    >
      <h2 className="text-lg font-semibold mb-4">
        Przenieś koszyk między użytkownikami
      </h2>

      <div className="flex gap-4 mb-4 flex-wrap">
        <select name="fromUserId" className="border p-2 rounded" required>
          <option value="">Od użytkownika</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email ?? "brak emaila"} ({u.cart?.items.length ?? 0})
            </option>
          ))}
        </select>

        <select name="toUserId" className="border p-2 rounded" required>
          <option value="">Do użytkownika</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.email ?? "brak emaila"}
            </option>
          ))}
        </select>
      </div>

      <button className="bg-gray-700 text-white px-4 py-2 rounded hover:scale-105 transition">
        Przenieś koszyk
      </button>
    </form>
  );
}
