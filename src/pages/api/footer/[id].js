import Footer from "@/models/Footer";
import { footerPayloadSchema } from "@/schemas/footerSchema";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";
import validate from "@/server/validate";

export default createHandler({
  GET: async (req, res) => {
    const footer = await Footer.findById(req.query.id);
    if (!footer) throw new HttpError(404, "Footer not found");
    res.status(200).json(footer);
  },
  PUT: async (req, res) => {
    requireAdmin(req);
    const values = await validate(footerPayloadSchema, req.body);
    const footer = await Footer.findByIdAndUpdate(req.query.id, values, {
      new: true,
      runValidators: true,
    });
    if (!footer) throw new HttpError(404, "Footer not found");
    res.status(200).json(footer);
  },
});
