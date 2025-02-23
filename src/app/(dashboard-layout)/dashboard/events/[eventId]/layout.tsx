import EventLayout from "@/modules/events/ui/layouts/event-layout";

export default async function MainEventIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <EventLayout>{children}</EventLayout>;
}
