import AuthorizationLayout from "@/modules/auth/layouts/authorization-layout";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthorizationLayout>{children}</AuthorizationLayout>;
}
