import User from "@/models/User";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireSessionEmail } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    const sessionEmail = await requireSessionEmail(req, res);
    const email = String(req.query.email || "").toLowerCase();

    if (email !== sessionEmail) {
      throw new HttpError(403, "Forbidden");
    }

    const user = await User.findOne({ email });
    if (!user) throw new HttpError(404, "User not found");
    res.status(200).json(user);
  },
});
