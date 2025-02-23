import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrganizationEventsTab from "../components/organization-events-tab";
import OrganizationMembersTab from "../components/organization-members-tab";
import { organizations } from "@/db/schema";

export const OrganizationDetailsSection = ({
  organization,
}: {
  organization: typeof organizations.$inferSelect;
}) => {
  return (
    <div className="border border-red-500 p-4 mt-4">
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="w-full justify-between items-center">
          <TabsTrigger value="events" className="w-full">
            Events
          </TabsTrigger>
          <TabsTrigger value="members" className="w-full">
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value="events">
          <OrganizationEventsTab slug={organization.slug} />
        </TabsContent>
        <TabsContent value="members">
          <OrganizationMembersTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};
