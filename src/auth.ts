import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Check if user already exists

      if (!profile || !profile.email) return false;

      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, profile.email))
        .limit(1);
      if (existingUser) return true;

      // Insert the new user
      await db
        .insert(users)
        .values({
          oauthId: profile.sub as string,
          name: profile.name,
          email: profile.email,
          imageUrl: profile.picture,
        })
        .execute();

      return true;
    },
  },
});
