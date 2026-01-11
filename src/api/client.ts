import axios from "axios";
import { cookies } from "@/lib/utils";

export const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "/custom"
    : "https://kandil-glass-stage-26832699.dev.odoo.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to inject auth token
api.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token && config.headers) {
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
