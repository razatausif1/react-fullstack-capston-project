import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: DummyJsonResponse): Product[] => response.products.map((product) => ({
        id: product.id,
        name: product.title,
        category: product.category,
        subcategory: product.tags?.[0] || product.brand || "general",
        availableQty: product.stock,
        price: product.price,
        thumbnail: product.thumbnail,
      })),
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
