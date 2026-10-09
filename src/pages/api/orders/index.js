import { SIZES } from "@/constants/product";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { orderSchema } from "@/schemas/orderSchema";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { isAdminRequest, requireSessionEmail } from "@/server/guards";
import validate from "@/server/validate";

const roundPrice = (value) => Math.round(value * 100) / 100;

// Titles and prices are always read from the database; amounts sent by the client are never trusted.
const buildOrderItems = async (items) => {
  const products = await Product.find({
    _id: { $in: items.map((item) => item.productId) },
  }).lean();
  const productsById = new Map(products.map((product) => [String(product._id), product]));

  return items.map((item) => {
    const product = productsById.get(item.productId);
    const basePrice = product?.prices[item.sizeIndex];

    if (basePrice === undefined) {
      throw new HttpError(400, "A product in your cart is no longer available");
    }

    const extras = product.extraOptions.filter((extra) =>
      item.extraIds.includes(String(extra._id))
    );
    const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);

    return {
      productId: product._id,
      title: product.title,
      size: product.prices.length > 1 ? SIZES[item.sizeIndex] : undefined,
      extras: extras.map((extra) => extra.text),
      price: roundPrice(basePrice + extrasTotal),
      quantity: item.quantity,
    };
  });
};

export default createHandler({
  GET: async (req, res) => {
    const filter = isAdminRequest(req) ? {} : { email: await requireSessionEmail(req, res) };
    res.status(200).json(await Order.find(filter).sort({ createdAt: -1 }));
  },
  POST: async (req, res) => {
    const email = await requireSessionEmail(req, res);
    const user = await User.findOne({ email });
    if (!user) throw new HttpError(404, "User not found");

    const { items, method } = await validate(orderSchema, req.body);
    const orderItems = await buildOrderItems(items);
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      customer: user.fullName,
      email: user.email,
      address: user.address || "No address",
      items: orderItems,
      total: roundPrice(total),
      method,
    });
    res.status(201).json(order);
  },
});
