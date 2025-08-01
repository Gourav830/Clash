import { AuthOptions, ISODateString, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { LOGIN_URL } from "@/lib/apiEndPoint";
import axios from "axios";

// interface JWT {
// user?: Customuser;
// }

export type customSession = {
  user?: Customuser;
  expires: ISODateString;
};
export type Customuser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: customSession;
      token: JWT;
      user: Customuser;
    }) {
      session.user = token.user as Customuser;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: Customuser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const { data } = await axios.post(LOGIN_URL, credentials);
        const user = data?.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
