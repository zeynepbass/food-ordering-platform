import Category from "@/models/Category";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    const category = await Category.findById(req.query.id);
    if (!category) throw new HttpError(404, "Category not found");
    res.status(200).json(category);
  },
  DELETE: async (req, res) => {
    requireAdmin(req);
    const category = await Category.findByIdAndDelete(req.query.id);
    if (!category) throw new HttpError(404, "Category not found");
    res.status(200).json(category);
  },
});
