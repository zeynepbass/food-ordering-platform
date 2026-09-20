import Product from "@/models/Product";
import createHandler from "@/server/createHandler";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await Product.find());
  },
  POST: async (req, res) => {
    requireAdmin(req);
    const { title, desc, img, category, prices, extraOptions } = req.body;
    const product = await Product.create({
      title,
      desc,
      img,
      category,
      prices,
      extraOptions,
    });
    res.status(201).json(product);
  },
});
