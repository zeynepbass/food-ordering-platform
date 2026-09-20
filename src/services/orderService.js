import apiClient from "@/services/apiClient";

const orderService = {
  getAll: () => apiClient.get("/orders").then((res) => res.data),
  create: (order) => apiClient.post("/orders", order).then((res) => res.data),
  updateStatus: (id, status) =>
    apiClient.put(`/orders/${id}`, { status }).then((res) => res.data),
};

export default orderService;
