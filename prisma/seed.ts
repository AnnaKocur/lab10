import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
    const dataPath = path.resolve("data", "data.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
  const products = JSON.parse(rawData);

  for (const item of products) {
    const category = await prisma.category.upsert({
      where: { name: item.category },
      update: {},
      create: { name: item.category },
    });

    await prisma.product.create({
      data: {
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

  console.log("✅ Seeding zakończony");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
