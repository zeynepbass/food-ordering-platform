import Footer from "@/models/Footer";
import { footerPayloadSchema } from "@/schemas/footerSchema";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";
import validate from "@/server/validate";

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await Footer.find());
  },
  POST: async (req, res) => {
    requireAdmin(req);
    const footer = await validate(footerPayloadSchema, req.body);
    res.status(201).json(await Footer.create(footer));
  },
});
