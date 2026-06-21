import axios from "axios";
import { getAuthSession } from "../../features/auth/services/auth.storage";

const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthSession()?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
