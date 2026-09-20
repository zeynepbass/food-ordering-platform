import Category from "@/models/Category";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await Category.find());
  },
  POST: async (req, res) => {
    requireAdmin(req);
    const category = await Category.create({ title: req.body.title });
    res.status(201).json(category);
  },
});
