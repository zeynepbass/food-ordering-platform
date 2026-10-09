import cookie from "cookie";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { safeEqual } from "@/server/guards";
import { LIMITS, enforceRateLimit, getClientIp, resetRateLimit } from "@/server/rateLimit";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export default createHandler(
  {
    POST: async (req, res) => {
      const { ADMIN_USERNAME, ADMIN_PASSWORD, ADMIN_TOKEN } = process.env;

      if (!ADMIN_USERNAME || !ADMIN_PASSWORD || !ADMIN_TOKEN) {
        throw new HttpError(503, "Admin access is not configured");
      }

      const limitKey = `admin-login:${getClientIp(req)}`;
      await enforceRateLimit(res, limitKey, LIMITS.adminLogin);

      const usernameMatches = safeEqual(req.body?.username, ADMIN_USERNAME);
      const passwordMatches = safeEqual(req.body?.password, ADMIN_PASSWORD);

      if (!usernameMatches || !passwordMatches) {
        throw new HttpError(401, "Wrong credentials");
      }

      await resetRateLimit(limitKey);
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", ADMIN_TOKEN, { ...cookieOptions, maxAge: 60 * 60 })
      );
      res.status(200).json({ message: "Success" });
    },
    DELETE: (req, res) => {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", { ...cookieOptions, maxAge: -1 })
      );
      res.status(200).json({ message: "Success" });
    },
  },
  // Signing out must work without a database; the rate limiter connects on its own when signing in.
  { withDb: false }
);
