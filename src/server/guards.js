import { getServerSession } from "next-auth/next";
import HttpError from "@/server/HttpError";
import { authOptions } from "@/server/auth";

export const isAdminRequest = (req) => {
  const token = process.env.ADMIN_TOKEN;
  return Boolean(token) && req.cookies?.token === token;
};

export const requireAdmin = (req) => {
  if (!isAdminRequest(req)) {
    throw new HttpError(401, "Admin authorization required");
  }
};

export const requireSession = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    throw new HttpError(401, "Please login first");
  }
  return session;
};
