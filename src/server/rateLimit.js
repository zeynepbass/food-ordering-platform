import RateLimit from "@/models/RateLimit";
import dbConnect from "@/server/dbConnect";
import HttpError from "@/server/HttpError";

const MINUTE = 60 * 1000;
const DUPLICATE_KEY = 11000;

export const LIMITS = {
  login: { limit: 10, windowMs: 15 * MINUTE },
  adminLogin: { limit: 5, windowMs: 15 * MINUTE },
  register: { limit: 10, windowMs: 60 * MINUTE },
  passwordChange: { limit: 5, windowMs: 15 * MINUTE },
};

export const getClientIp = (req) => {
  const forwarded = req.headers?.["x-forwarded-for"];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0];
  return first?.trim() || req.socket?.remoteAddress || "unknown";
};

const increment = (key, now, windowMs) =>
  RateLimit.findOneAndUpdate(
    { key, expiresAt: { $gt: now } },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date(now.getTime() + windowMs) } },
    { upsert: true, new: true }
  );

// Counters live in MongoDB, so the limit is shared by every server instance.
export const consumeRateLimit = async (key, { limit, windowMs }) => {
  await dbConnect();
  const now = new Date();
  let bucket;

  try {
    bucket = await increment(key, now, windowMs);
  } catch (error) {
    if (error.code !== DUPLICATE_KEY) throw error;

    // An expired counter the TTL monitor has not removed yet blocks the upsert; drop it and retry.
    await RateLimit.deleteOne({ key, expiresAt: { $lte: now } });
    bucket = await increment(key, now, windowMs);
  }

  return {
    allowed: bucket.count <= limit,
    retryAfter: Math.max(1, Math.ceil((bucket.expiresAt - now) / 1000)),
  };
};

export const resetRateLimit = (key) => RateLimit.deleteOne({ key });

export const enforceRateLimit = async (res, key, options) => {
  const { allowed, retryAfter } = await consumeRateLimit(key, options);

  if (!allowed) {
    res.setHeader("Retry-After", retryAfter);
    throw new HttpError(429, "Too many attempts. Please try again later.");
  }
};
