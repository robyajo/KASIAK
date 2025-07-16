import { AuthOptions, User, Account, SessionStrategy } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

// Extend the Session and User types to include our custom properties
declare module "next-auth" {
  interface Session {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresInSecond: number;
    user: {
      id: string | number;
      uuid: string;
      name: string;
      email: string;
      role: string;
      verified: string;
      created_at: string;
      avatar: string | null;
    };
  }

  interface User {
    id: string | number;
    uuid: string;
    name: string;
    email: string;
    role: string;
    verified: string;
    created_at: string;
    avatar: string | null;
    accessToken: string;
    tokenType: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tokenType: string;
    accessToken: string;
    refreshToken: string;
    expiresInSecond: number;
    user: {
      id: string | number;
      uuid: string;
      name: string;
      email: string;
      role: string;
      verified: string;
      created_at: string;
      avatar: string | null;
    };
  }
}

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 60 * 60, // 1 hour
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const signinUrl = process.env.NEXT_PUBLIC_API_URL + "/api/auth/login";

          const res = await axios.post(
            signinUrl,
            {
              email: credentials.email.trim(),
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (res.headers["content-type"]?.includes("application/json")) {
            const response = res.data;

            if (response.status === "success" && response.data?.user) {
              return {
                ...response.data.user,
                accessToken: response.data.access_token,
                tokenType: response.data.token_type,
              };
            } else if (response.status === "error" && response.errors) {
              // Format the validation errors into a single string
              const errorMessage = response.errors.join(", ");
              throw new Error(`[${errorMessage}]`);
            } else {
              throw new Error(response.message || "Authentication failed");
            }
          } else {
            throw new Error("Received invalid response from server");
          }
        } catch (error: any) {
          if (error.response?.data) {
            // Handle Axios error response
            const { message, errors } = error.response.data;
            if (errors && Array.isArray(errors)) {
              throw new Error(`[${errors.join(", ")}]`);
            }
            throw new Error(message || "Authentication failed");
          }
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      account: Account | null;
      user?: User | AdapterUser;
      trigger?: "update" | string;
      session?: any;
    }) {
      // Initial sign in
      if (user) {
        const typedUser = user as User;
        token.accessToken = typedUser.accessToken;
        token.tokenType = typedUser.tokenType;
        // Store all user data in the token
        token.user = {
          id: typedUser.id,
          uuid: typedUser.uuid,
          name: typedUser.name,
          email: typedUser.email,
          role: typedUser.role,
          verified: typedUser.verified,
          created_at: typedUser.created_at,
          avatar: typedUser.avatar,
        };
      }

      if (trigger === "update" && session?.user) {
        token.user = session.user;
      }

      return token;
    },
    async session({
      session,
      token,
      trigger,
      newSession,
    }: {
      session: any;
      token: any;
      trigger?: "update" | string;
      newSession?: any;
    }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.tokenType = token.tokenType;

      // Include user data in the session
      if (token.user) {
        session.user = {
          ...token.user,
        };
      }

      return session;
    },
    async signIn({
      user,
      account,
      profile,
      email,
      credentials,
    }: {
      user: User | AdapterUser;
      account: Account | null;
      profile?: any;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      if (user) return true;
      else return false;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // CUSTOM
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
};
