import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phoneNumber: { type: String },
    address: { type: String },
    job: { type: String },
    bio: { type: String },
    image: { type: String },
    password: { type: String, select: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
