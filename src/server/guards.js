import { createHash, timingSafeEqual } from "crypto";
import { getServerSession } from "next-auth/next";
import HttpError from "@/server/HttpError";
import { authOptions } from "@/server/auth";

const digest = (value) => createHash("sha256").update(String(value)).digest();

export const safeEqual = (a, b) => {
  if (typeof a !== "string" || typeof b !== "string") return false;
  return timingSafeEqual(digest(a), digest(b));
};

export const isAdminRequest = (req) => {
  const token = process.env.ADMIN_TOKEN;
  return Boolean(token) && safeEqual(req.cookies?.token, token);
};

export const requireAdmin = (req) => {
  if (!isAdminRequest(req)) {
    throw new HttpError(401, "Admin authorization required");
  }
};

export const getSessionEmail = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  return session?.user?.email?.toLowerCase() ?? null;
};

export const requireSessionEmail = async (req, res) => {
  const email = await getSessionEmail(req, res);
  if (!email) {
    throw new HttpError(401, "Please login first");
  }
  return email;
};

export const requireOrderAccess = async (req, res, order) => {
  if (isAdminRequest(req)) return;

  const email = await requireSessionEmail(req, res);
  if (order.email !== email) {
    throw new HttpError(403, "Forbidden");
  }
};
