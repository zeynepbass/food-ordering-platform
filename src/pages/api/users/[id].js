import bcrypt from "bcryptjs";
import User from "@/models/User";
import { passwordSchema } from "@/schemas/newPasswordSchema";
import { profileDetailsSchema } from "@/schemas/profileSchema";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { requireSessionEmail } from "@/server/guards";
import { LIMITS, enforceRateLimit } from "@/server/rateLimit";
import validate from "@/server/validate";

const findOwnUser = async (req, res) => {
  const email = await requireSessionEmail(req, res);
  const user = await User.findById(req.query.id).select("+password");

  if (!user) throw new HttpError(404, "User not found");
  if (user.email !== email) throw new HttpError(403, "Forbidden");
  return user;
};

const withoutPassword = (user) => {
  const { password, ...rest } = user.toObject();
  return rest;
};

// Accounts created through GitHub have no password yet and may set one without a current password.
const changePassword = async (req, res, user) => {
  await enforceRateLimit(res, `password:${user._id}`, LIMITS.passwordChange);

  const { password } = await validate(passwordSchema, req.body);
  const { currentPassword } = req.body;

  if (user.password) {
    const matches =
      typeof currentPassword === "string" && (await bcrypt.compare(currentPassword, user.password));
    if (!matches) throw new HttpError(400, "Current password is incorrect");
  }

  user.password = await bcrypt.hash(password, 10);
};

export default createHandler({
  GET: async (req, res) => {
    res.status(200).json(withoutPassword(await findOwnUser(req, res)));
  },
  PUT: async (req, res) => {
    const user = await findOwnUser(req, res);

    if (req.body?.password !== undefined) {
      await changePassword(req, res, user);
    } else {
      user.set(await validate(profileDetailsSchema, req.body));
    }

    await user.save();
    res.status(200).json(withoutPassword(user));
  },
});
