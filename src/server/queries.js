import mongoose from "mongoose";
import Category from "@/models/Category";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import dbConnect from "@/server/dbConnect";
import serialize from "@/utils/serialize";

const findById = async (Model, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }
  await dbConnect();
  return serialize(await Model.findById(id).lean());
};

export const getCategories = async () => {
  await dbConnect();
  return serialize(await Category.find().lean());
};

export const getProducts = async () => {
  await dbConnect();
  return serialize(await Product.find().lean());
};

export const getProductById = (id) => findById(Product, id);

export const getOrderById = (id) => findById(Order, id);

export const getUserById = (id) => findById(User, id);

export const getUserByEmail = async (email) => {
  await dbConnect();
  return serialize(await User.findOne({ email: email.toLowerCase() }).lean());
};
