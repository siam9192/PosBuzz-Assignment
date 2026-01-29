import axios from "axios";
import { getNewTokensByRefreshToken, logout } from "../api-services/auth.api";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});



axiosInstance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 401) {
    try {
       await getNewTokensByRefreshToken();
       return axiosInstance(error.config);
    } catch (error) {
       await logout()
    } 
  }

  throw error;
});
