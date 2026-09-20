import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message = error.response?.data?.message || error.message;
    return Promise.reject(error);
  }
);

export default apiClient;
