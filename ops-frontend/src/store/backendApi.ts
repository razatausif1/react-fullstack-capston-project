import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Supplier } from "../types/Supplier";
import type { LoginRequest } from "../types/LoginRequest";

interface LoginResponse {
  token: string;
}

interface CreateSupplierRequest {
  name: string;
  address: string;
}

const backendBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: backendBaseQuery,
  tagTypes: ["Supplier"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
    getSuppliers: builder.query<Supplier[], void>({
      query: () => "/suppliers",
      providesTags: ["Supplier"],
    }),
    createSupplier: builder.mutation<unknown, CreateSupplierRequest>({
      query: (body) => ({ url: "/suppliers", method: "POST", body }),
      invalidatesTags: ["Supplier"],
    }),
    deleteSupplier: builder.mutation<void, string>({
      query: (name) => ({ url: `/suppliers/${encodeURIComponent(name)}`, method: "DELETE" }),
      invalidatesTags: ["Supplier"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetSuppliersQuery,
  useCreateSupplierMutation,
  useDeleteSupplierMutation,
} = backendApi;
