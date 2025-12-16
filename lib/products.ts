import productsData from "../data/products.json";

export interface Product {
  id: number;
  code: string;
  name: string;
  type: string;
  price: number;
  amount: number;
  description: string;
  date: string;
  image: string;
}

const products: Product[] = productsData as Product[];


export function getAllProductsAlphabetically(): Product[] {
  return [...products].sort((a, b) => a.name.localeCompare(b.name));
}

export function getAllProductsNewest(): Product[] {
  return [...products].sort((a, b) => (b.date.localeCompare(a.date)));
}

export function getProductsInStock(): Product[] {
  return products.filter((p) => p.amount > 0);
}

export function getProductsOutOfStock(): Product[] {
  return products.filter((p) => p.amount === 0);
}

export function getProductsByType(type: string): Product[] {
  return products.filter((p) => p.type === type);
}

export function getProductById(id: number): Product {
  return products.find((p) => p.id === id)!;
}

