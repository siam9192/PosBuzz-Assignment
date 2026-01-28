import axios from "axios";

export const axiosInstance = axios.create({
    url:import.meta.env.VITE_API_BASE_URL
})
