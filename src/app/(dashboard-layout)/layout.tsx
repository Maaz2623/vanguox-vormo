import DashboardLayout from "@/modules/dashboard/layouts/dashboard-layout";

export default async function DashboardMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
