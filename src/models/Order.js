import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    items: {
      type: [
        {
          _id: false,
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          title: { type: String, required: true },
          size: { type: String },
          extras: { type: [String], default: [] },
          price: { type: Number, required: true, min: 0 },
          quantity: { type: Number, required: true, min: 1 },
        },
      ],
      default: [],
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: Number,
      default: 0,
      min: 0,
      max: 2,
    },
    method: {
      type: Number,
      required: true,
      enum: [0, 1],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
