import bcrypt from "bcryptjs";
import User from "@/models/User";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireSession } from "@/server/guards";

const EDITABLE_FIELDS = ["fullName", "phoneNumber", "address", "job", "bio"];

const findOwnUser = async (req, res) => {
  const session = await requireSession(req, res);
  const user = await User.findById(req.query.id);

  if (!user) throw new HttpError(404, "User not found");
  if (user.email !== session.user.email.toLowerCase()) {
    throw new HttpError(403, "Forbidden");
  }
  return user;
};

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(await findOwnUser(req, res));
  },
  PUT: async (req, res) => {
    const user = await findOwnUser(req, res);

    EDITABLE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();
    res.status(200).json(await User.findById(user._id));
  },
});
