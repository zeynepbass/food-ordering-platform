import Footer from "@/models/Footer";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await Footer.find());
  },
  POST: async (req, res) => {
    requireAdmin(req);
    res.status(201).json(await Footer.create(req.body));
  },
});
