import apiClient from "@/services/apiClient";

const categoryService = {
  getAll: () => apiClient.get("/categories").then((res) => res.data),
  create: (title) => apiClient.post("/categories", { title }).then((res) => res.data),
  remove: (id) => apiClient.delete(`/categories/${id}`).then((res) => res.data),
};

export default categoryService;
