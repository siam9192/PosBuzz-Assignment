import { axiosInstance } from "../lib/axiosInstance";
import type { Response } from "../types/response.type";
import type { CreateSalePayload, Sale } from "../types/sale";

export async function createSale(payload: CreateSalePayload) {
  try {
    const res = await axiosInstance.post<Response<Sale>>("/sales", payload);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}
