import apiClient from "@/services/apiClient";

const userService = {
  getByEmail: (email) =>
    apiClient.get("/users", { params: { email } }).then((res) => res.data),
  register: (values) => apiClient.post("/users/register", values).then((res) => res.data),
  update: (id, values) => apiClient.put(`/users/${id}`, values).then((res) => res.data),
};

export default userService;
