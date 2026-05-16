import axios from "axios";

const api = axios.create({
  baseURL: "https://villages-api-backend.vercel.app",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("b2b_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
