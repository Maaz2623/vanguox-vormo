import React from "react";
import { OrganizationsSection } from "../sections/organizations-section";


const OrganizationsView = () => {
  return (
    <div className="flex flex-col gap-y-6 pt-2.5 ">
      <div className="px-4">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <p className="text-xs text-muted-foreground">Manage your organizations</p>

      </div>
      <OrganizationsSection />
    </div>
  );
};

export default OrganizationsView;
