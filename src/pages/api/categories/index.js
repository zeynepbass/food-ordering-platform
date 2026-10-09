import Category from "@/models/Category";
import { categorySchema } from "@/schemas/productSchema";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";
import validate from "@/server/validate";

const CASE_INSENSITIVE = { locale: "en", strength: 2 };

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await Category.find());
  },
  POST: async (req, res) => {
    requireAdmin(req);
    const { title } = await validate(categorySchema, req.body);

    const exists = await Category.exists({ title }).collation(CASE_INSENSITIVE);
    if (exists) throw new HttpError(409, "Category already exists");

    res.status(201).json(await Category.create({ title }));
  },
});
