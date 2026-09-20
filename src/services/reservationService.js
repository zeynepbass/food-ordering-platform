import apiClient from "@/services/apiClient";

const reservationService = {
  getAll: () => apiClient.get("/reservations").then((res) => res.data),
  create: (reservation) =>
    apiClient.post("/reservations", reservation).then((res) => res.data),
};

export default reservationService;
