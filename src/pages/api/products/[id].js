import Product from "@/models/Product";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    const product = await Product.findById(req.query.id);
    if (!product) throw new HttpError(404, "Product not found");
    res.status(200).json(product);
  },
  DELETE: async (req, res) => {
    requireAdmin(req);
    const product = await Product.findByIdAndDelete(req.query.id);
    if (!product) throw new HttpError(404, "Product not found");
    res.status(200).json(product);
  },
});
