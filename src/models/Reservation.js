import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, maxlength: 100 },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    persons: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);
