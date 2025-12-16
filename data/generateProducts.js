import fs from "fs";

const types = ["processor", "gpu", "ram", "disk"];

const typeNamesPL = {
  processor: "Procesor",
  gpu: "Karta graficzna",
  ram: "Pamięć RAM",
  disk: "Dysk",
};

const images = {
  processor: "procesor.jpg",
  gpu: "karta-graficzna.jpg",
  ram: "pamiec-ram.jpg",
  disk: "dysk.jpg",
};

function randomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function randomPrice() {
  return (Math.random() * 2000 + 100).toFixed(2);
}

function randomAmount() {
  return Math.floor(Math.random() * 50) + 1;
}

function randomDate() {
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
}

const products = [];

for (let i = 1; i <= 100; i++) {
  const type = types[Math.floor(Math.random() * types.length)];

  const name = `${typeNamesPL[type]} ${i}`;

  products.push({
    id: i,
    code: randomCode(),
    name: name,
    type: type,
    price: Number(randomPrice()),
    amount: randomAmount(),
    description: `Opis produktu ${name}`,
    date: randomDate(),
    image: `/images/products/${images[type]}`,
  });
}

fs.writeFileSync("products.json", JSON.stringify(products, null, 2));

console.log("Wygenerowano 100 produktów do pliku products.json");
