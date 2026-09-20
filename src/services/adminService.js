import apiClient from "@/services/apiClient";

const adminService = {
  login: (credentials) => apiClient.post("/admin", credentials).then((res) => res.data),
  logout: () => apiClient.delete("/admin").then((res) => res.data),
};

export default adminService;
