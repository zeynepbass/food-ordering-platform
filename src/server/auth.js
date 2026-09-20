import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import dbConnect from "@/server/dbConnect";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({
          email: credentials?.email?.toLowerCase(),
        }).select("+password");

        if (!user?.password) {
          throw new Error("You haven't registered yet!");
        }

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Incorrect password!");
        }

        return {
          id: user._id.toString(),
          name: user.fullName,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
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
