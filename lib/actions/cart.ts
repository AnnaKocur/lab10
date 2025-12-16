'use server';

import prisma from '@/lib/prisma';

/**
 * Pobiera koszyk użytkownika wraz z pozycjami
 */
export async function getCartWithItems(userId: number) {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
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

  return cart;
}

/**
 * Oblicza całkowitą wartość koszyka
 */
export async function getCartTotal(userId: number): Promise<number> {
  const cart = await getCartWithItems(userId);

  if (!cart || !cart.items || cart.items.length === 0) {
    return 0;
  }

  return cart.items.reduce(
    (sum: number, item) =>
      sum + Number(item.product.price) * item.quantity,
    0
  );
}
