import apiClient from "@/services/apiClient";

const productService = {
  getAll: () => apiClient.get("/products").then((res) => res.data),
  create: (product) => apiClient.post("/products", product).then((res) => res.data),
  remove: (id) => apiClient.delete(`/products/${id}`).then((res) => res.data),
};

export default productService;
