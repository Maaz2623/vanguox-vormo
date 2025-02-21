import { ORGANIZATION_FETCH_LIMIT } from "@/constants";
import OrganizationsView from "@/modules/organizations/ui/views/organizations-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const OrganizationsPage = async () => {
  void trpc.organizations.getMany.prefetchInfinite({
    limit: ORGANIZATION_FETCH_LIMIT,
  });

  return (
    <HydrateClient>
      <OrganizationsView />
    </HydrateClient>
  );
};

export default OrganizationsPage;
