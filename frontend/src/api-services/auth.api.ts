import { axiosInstance } from "../lib/axiosInstance";
import type { LoginPayload, RegisterPayload } from "../types/auth.type";
import type { Response } from "../types/response.type";
import type { User } from "../types/user.type";

export async function register(payload: RegisterPayload) {
  try {
    const res = await axiosInstance.post<Response<null>>("/auth/register", payload);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}

export async function login(payload: LoginPayload) {
  try {
    const res = await axiosInstance.post<Response<null>>("/auth/login", payload);
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}

export async function logout() {
  try {
    const res = await axiosInstance.post<Response<null>>("/auth/logout");
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}

export async function getMe() {
  try {
    const res = await axiosInstance.get<Response<User>>("/auth/me");
    return res.data;
  } catch (error: any) {
    const message = error?.response?.data?.message ?? "Something went wrong";
    throw new Error(message);
  }
}
