import React from "react";
import { OrganizationsSection } from "../sections/organizations-section";
import CreateOrganization from "../components/create-organization";

const OrganizationsView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5 w-full">
      <div className="px-4 flex justify-between items-center w-full">
        <div>
          <h1 className="text-2xl font-bold">Organizations</h1>
          <p className="text-xs text-muted-foreground">
            Manage your organizations
          </p>
        </div>
        <CreateOrganization />
      </div>
      <OrganizationsSection />
    </div>
  );
};

export default OrganizationsView;
