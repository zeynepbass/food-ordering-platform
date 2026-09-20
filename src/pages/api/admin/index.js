import cookie from "cookie";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";

const cookieOptions = {
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export default createHandler(
  {
    POST: async (req, res) => {
      const { username, password } = req.body;
      const isValid =
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD;

      if (!isValid || !process.env.ADMIN_TOKEN) {
        throw new HttpError(400, "Wrong credentials");
      }

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.ADMIN_TOKEN, {
          ...cookieOptions,
          maxAge: 60 * 60,
        })
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
  { withDb: false }
);
