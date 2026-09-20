import Order from "@/models/Order";
import User from "@/models/User";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { isAdminRequest, requireSession } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    if (isAdminRequest(req)) {
      return res.status(200).json(await Order.find().sort({ createdAt: -1 }));
    }
    const session = await requireSession(req, res);
    const orders = await Order.find({ email: session.user.email.toLowerCase() }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  },
  POST: async (req, res) => {
    const session = await requireSession(req, res);
    const user = await User.findOne({ email: session.user.email.toLowerCase() });
    if (!user) throw new HttpError(404, "User not found");

    const { address, total, method } = req.body;
    const order = await Order.create({
      customer: user.fullName,
      email: user.email,
      address: address || user.address || "No address",
      total,
      method,
    });
    res.status(201).json(order);
  },
});
