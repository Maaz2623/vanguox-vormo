import { organizations } from "@/db/schema";
import React from "react";
import { OrganizationProfileOverview } from "../components/organization-profile-overview";
import { OrganizationDetailsSection } from "../sections/organization-details-section";

const OrganizationView = ({
  organization,
}: {
  organization: typeof organizations.$inferSelect;
}) => {
  return (
    <div className="border-green-500 border p-4">
      <OrganizationProfileOverview organization={organization} />
      <OrganizationDetailsSection organization={organization} />
    </div>
  );
};

export default OrganizationView;
