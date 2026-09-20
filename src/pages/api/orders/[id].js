import Order from "@/models/Order";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    const order = await Order.findById(req.query.id);
    if (!order) throw new HttpError(404, "Order not found");
    res.status(200).json(order);
  },
  PUT: async (req, res) => {
    requireAdmin(req);
    const order = await Order.findByIdAndUpdate(
      req.query.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );
    if (!order) throw new HttpError(404, "Order not found");
    res.status(200).json(order);
  },
  DELETE: async (req, res) => {
    requireAdmin(req);
    const order = await Order.findByIdAndDelete(req.query.id);
    if (!order) throw new HttpError(404, "Order not found");
    res.status(200).json(order);
  },
});
