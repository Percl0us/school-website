import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const attachToken = (token) => {
  api.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
};
export default api;
