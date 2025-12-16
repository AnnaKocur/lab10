"use server";

import prisma from "@/lib/prisma";

/**
 * Pobiera koszyk użytkownika wraz z pozycjami
 */
export async function getCartWithItems(userId: string) {
  return prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        orderBy: { createdAt: "desc" },
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Oblicza całkowitą wartość koszyka
 */
export async function getCartTotal(userId: string): Promise<number> {
  const cart = await getCartWithItems(userId);

  if (!cart || cart.items.length === 0) return 0;

  return cart.items.reduce(
    (sum: number, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );
}

/**
 * Pobiera wszystkich użytkowników z koszykami
 */
export async function getAllUsersWithCarts() {
  return prisma.user.findMany({
    include: {
      cart: {
        include: {
          items: true,
        },
      },
    },
  });
}

/**
 * Przenosi koszyk z jednego użytkownika do drugiego
 */
export async function transferCart(
  fromUserId: string,
  toUserId: string
) {
  if (fromUserId === toUserId) {
    throw new Error("Nie można przenieść koszyka do tego samego użytkownika");
  }

  const fromCart = await prisma.cart.findUnique({
    where: { userId: fromUserId },
    include: { items: true },
  });

  if (!fromCart || fromCart.items.length === 0) {
    return;
  }

  let toCart = await prisma.cart.findUnique({
    where: { userId: toUserId },
  });

  if (!toCart) {
    toCart = await prisma.cart.create({
      data: { userId: toUserId },
    });
  }

    for (const item of fromCart.items) {
    await prisma.cartItem.upsert({
        where: {
        cartId_productId: {
            cartId: toCart.id,
            productId: item.productId,
        },
        },
        update: {
        quantity: {
            increment: item.quantity,
        },
        },
        create: {
        cartId: toCart.id,
        productId: item.productId,
        quantity: item.quantity,
        },
    });
    }

  await prisma.cartItem.deleteMany({
    where: { cartId: fromCart.id },
  });
}
export async function addSampleProductToCart(userId: string) {
  // 1. znajdź lub utwórz koszyk
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // 2. weź pierwszy produkt z bazy
  const product = await prisma.product.findFirst();
  if (!product) return;

  // 3. dodaj lub zwiększ ilość
  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId: product.id,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      cartId: cart.id,
      productId: product.id,
      quantity: 1,
    },
  });
}
