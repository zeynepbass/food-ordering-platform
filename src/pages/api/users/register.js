import bcrypt from "bcryptjs";
import User from "@/models/User";
import createHandler from "@/server/createHandler";
import HttpError from "@/server/HttpError";

export default createHandler({
  POST: async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password || password.length < 8) {
      throw new HttpError(400, "Invalid registration data");
    }

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
