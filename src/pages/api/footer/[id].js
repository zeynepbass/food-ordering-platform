import Footer from "@/models/Footer";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    const footer = await Footer.findById(req.query.id);
    if (!footer) throw new HttpError(404, "Footer not found");
    res.status(200).json(footer);
  },
  PUT: async (req, res) => {
    requireAdmin(req);
    const footer = await Footer.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!footer) throw new HttpError(404, "Footer not found");
    res.status(200).json(footer);
  },
});
