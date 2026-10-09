import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/server/dbConnect";
import { LIMITS, consumeRateLimit, getClientIp, resetRateLimit } from "@/server/rateLimit";

const INVALID_CREDENTIALS = "Invalid email or password.";
const TOO_MANY_ATTEMPTS = "Too many attempts. Please try again later.";

export const isGithubEnabled = Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET);

const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, req) {
    const email = credentials?.email;
    const password = credentials?.password;

    if (typeof email !== "string" || typeof password !== "string") {
      throw new Error(INVALID_CREDENTIALS);
    }

    const limitKey = `login:${getClientIp(req)}:${email.toLowerCase()}`;
    if (!(await consumeRateLimit(limitKey, LIMITS.login)).allowed) {
      throw new Error(TOO_MANY_ATTEMPTS);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");

    if (!user?.password || !(await bcrypt.compare(password, user.password))) {
      throw new Error(INVALID_CREDENTIALS);
    }

    await resetRateLimit(limitKey);

    return {
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      image: user.image,
    };
  },
});

const githubProvider = GithubProvider({
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
});

export const authOptions = {
  providers: isGithubEnabled ? [githubProvider, credentialsProvider] : [credentialsProvider],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider !== "github") {
        return true;
      }
      if (!user.email) {
        return false;
      }

      await dbConnect();
      const email = user.email.toLowerCase();
      await User.findOneAndUpdate(
        { email },
        { $setOnInsert: { email, fullName: user.name || email, image: user.image } },
        { upsert: true }
      );
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
