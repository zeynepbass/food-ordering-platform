import Product from "@/models/Product";
import { productSchema } from "@/schemas/productSchema";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";
import validate from "@/server/validate";

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await Product.find());
  },
  POST: async (req, res) => {
    requireAdmin(req);
    const product = await validate(productSchema, req.body);
    res.status(201).json(await Product.create(product));
  },
});
