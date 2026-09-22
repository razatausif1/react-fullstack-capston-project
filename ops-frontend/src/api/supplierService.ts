//Filepath: src/api/supplierService.ts
import axiosClient from "./axiosClient";

export const getSuppliers = async () => await axiosClient.get("/suppliers");
export const createSupplier = async (supplier: { name: string; address: string }) =>
	await axiosClient.post("/suppliers", supplier);
export const deleteSupplier = async (name: string) => await axiosClient.delete(`/suppliers/${name}`)