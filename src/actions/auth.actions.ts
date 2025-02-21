"use server";

import { signIn, signOut } from "@/auth";

export const handleSignin = async () => {
  await signIn("google");
};

export const handleSignOut = async () => {
  await signOut({
    redirectTo: "/",
  });
};
