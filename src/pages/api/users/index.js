import User from "@/models/User";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireSession } from "@/server/guards";

export default createHandler({
  GET: async (req, res) => {
    const session = await requireSession(req, res);
    const email = String(req.query.email || "").toLowerCase();

    if (!email || email !== session.user.email.toLowerCase()) {
      throw new HttpError(403, "Forbidden");
    }

    const user = await User.findOne({ email });
    if (!user) throw new HttpError(404, "User not found");
    res.status(200).json(user);
  },
});
