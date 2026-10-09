import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 },
  // TTL index: MongoDB removes the counter once its window has passed.
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.models.RateLimit || mongoose.model("RateLimit", RateLimitSchema);
