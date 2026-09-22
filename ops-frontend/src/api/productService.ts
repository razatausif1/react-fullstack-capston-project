import axios from "axios";
import type { Product } from "../types/Product";

interface DummyJsonProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  brand?: string;
  tags?: string[];
  thumbnail?: string;
}

interface DummyJsonResponse {
  products: DummyJsonProduct[];
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<DummyJsonResponse>("https://dummyjson.com/products");
  return response.data.products.map((product) => ({
    id: product.id,
    name: product.title,
    category: product.category,
    subcategory: product.tags?.[0] || product.brand || "general",
    availableQty: product.stock,
    price: product.price,
    thumbnail: product.thumbnail,
  }));
};
