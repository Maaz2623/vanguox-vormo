import OrganizationLayout from "@/modules/organizations/ui/layouts/organization-layout";

export default async function MainOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OrganizationLayout>{children}</OrganizationLayout>;
}
