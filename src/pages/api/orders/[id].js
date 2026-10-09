import Order from "@/models/Order";
import { orderStatusSchema } from "@/schemas/orderSchema";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireAdmin, requireOrderAccess } from "@/server/guards";
import validate from "@/server/validate";

export default createHandler({
  GET: async (req, res) => {
    const order = await Order.findById(req.query.id);
    if (!order) throw new HttpError(404, "Order not found");
    await requireOrderAccess(req, res, order);
    res.status(200).json(order);
  },
  PUT: async (req, res) => {
    requireAdmin(req);
    const { status } = await validate(orderStatusSchema, req.body);
    const order = await Order.findByIdAndUpdate(
      req.query.id,
      { status },
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
