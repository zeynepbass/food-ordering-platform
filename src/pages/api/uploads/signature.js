import { getUploadConfig } from "@/server/cloudinary";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";

export default createHandler(
  {
    POST: (req, res) => {
      requireAdmin(req);

      const config = getUploadConfig();
      if (!config) throw new HttpError(503, "Image upload is not configured");

      res.status(200).json(config);
    },
  },
  { withDb: false }
);
