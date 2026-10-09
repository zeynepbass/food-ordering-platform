import bcrypt from "bcryptjs";
import User from "@/models/User";
import { accountSchema } from "@/schemas/registerSchema";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";
import { LIMITS, enforceRateLimit, getClientIp } from "@/server/rateLimit";
import validate from "@/server/validate";

export default createHandler({
  POST: async (req, res) => {
    await enforceRateLimit(res, `register:${getClientIp(req)}`, LIMITS.register);

    const { fullName, email, password } = await validate(accountSchema, req.body);

    const exists = await User.exists({ email: email.toLowerCase() });
    if (exists) {
      throw new HttpError(409, "User already exists");
    }

    const user = await User.create({
      fullName,
      email,
      password: await bcrypt.hash(password, 10),
    });

    res.status(201).json({ _id: user._id, fullName: user.fullName, email: user.email });
  },
});
