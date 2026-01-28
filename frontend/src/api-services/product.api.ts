import { axiosInstance } from "../lib/axiosInstance";
import type { CreateProductPayload, Product, UpdateProductPayload } from "../types/product.type";
import type { Response } from "../types/response.type";
import type { Params } from "../types/util.type";

export async function getProducts(params: Params) {
  try {
    const res = await axiosInstance.get<Response<Product[]>>("/products", { params });
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}

export async function createProduct(payload: CreateProductPayload) {
  try {
    const res = await axiosInstance.post<Response<Product>>("/products", payload);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}

export async function updateProduct({
  id,
  payload,
}: {
  id: string;
  payload: UpdateProductPayload;
}) {
  try {
    const res = await axiosInstance.put<Response<Product>>(`/products/${id}`, payload);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await axiosInstance.delete<Response<Product>>(`/products/${id}`);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}
