import apiClient from "@/services/apiClient";

const footerService = {
  getAll: () => apiClient.get("/footer").then((res) => res.data),
  save: (id, footer) =>
    (id ? apiClient.put(`/footer/${id}`, footer) : apiClient.post("/footer", footer)).then(
      (res) => res.data
    ),
};

export default footerService;
