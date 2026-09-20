import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 300,
    },
    prices: {
      type: [Number],
      required: true,
      validate: (value) => value.length > 0,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    img: {
      type: String,
      required: true,
    },
    extraOptions: {
      type: [
        {
          text: { type: String },
          price: { type: Number },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
