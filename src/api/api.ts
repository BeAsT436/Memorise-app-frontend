import { baseURL } from "@/consts/api-urls";
import { getToken } from "@/utils/auth";
import axios, { InternalAxiosRequestConfig } from "axios";

const api = axios.create({ baseURL });

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api