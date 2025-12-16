import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  /* =========================
     1. Produkty + Kategorie
     ========================= */
  const dataPath = path.resolve("data", "data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const products = JSON.parse(rawData);

  for (const item of products) {
    const category = await prisma.category.upsert({
      where: { name: item.category },
      update: {},
      create: { name: item.category },
    });

    await prisma.product.upsert({
      where: { code: item.code },
      update: {},
      create: {
        code: item.code,
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        imagePath: item.imagePath,
        categoryId: category.id,
      },
    });
  }

  /* =========================
     2. Użytkownik (Auth.js)
     ========================= */
    const user = await prisma.user.upsert({
    where: {
        email: "test@example.com",
    },
    update: {},
    create: {
        email: "test@example.com",
        name: "Jan Testowy",
    },
    });


  /* =========================
     3. Koszyk
     ========================= */
  const cart = await prisma.cart.create({
    data: {
      userId: user.id,
    },
  });

  const firstProduct = await prisma.product.findFirst();

  if (firstProduct) {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: firstProduct.id,
        quantity: 2,
      },
    });
  }

  /* =========================
     4. Zamówienia (4 szt.)
     ========================= */
  const orderStatuses = [
    "DELIVERED",
    "DELIVERED",
    "CANCELLED",
    "SHIPPED",
  ] as const;

  for (let i = 0; i < orderStatuses.length; i++) {
    if (!firstProduct) continue;

    const order = await prisma.order.create({
      data: {
        orderNumber: `ORDER-2025-${i + 1}`,
        status: orderStatuses[i],
        totalAmount: firstProduct.price,
        userId: user.id,
      },
    });

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: firstProduct.id,
        quantity: 1,
        price: firstProduct.price,
        productName: firstProduct.name,
        productCode: firstProduct.code,
      },
    });
  }

  console.log("✅ Full seeding zakończony (Task 8.3)");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
