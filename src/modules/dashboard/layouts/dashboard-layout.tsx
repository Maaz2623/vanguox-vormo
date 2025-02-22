import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../ui/components/app-sidebar";
import Navbar from "../ui/components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider className="">
      <Navbar />
        <AppSidebar />
        <main className="mt-12">{children}</main>
      </SidebarProvider>
    </div>
  );
}
