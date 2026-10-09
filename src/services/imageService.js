import axios from "axios";
import apiClient from "@/services/apiClient";

const imageService = {
  upload: async (file) => {
    const { cloudName, fields } = await apiClient
      .post("/uploads/signature")
      .then((res) => res.data);

    const data = new FormData();
    data.append("file", file);
    Object.entries(fields).forEach(([name, value]) => data.append(name, value));

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      data
    );
    return res.data.secure_url;
  },
};

export default imageService;
