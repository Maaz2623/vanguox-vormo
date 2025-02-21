import React from "react";

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-3">{children}</div>;
}
