import OrganizationView from "@/modules/organizations/ui/views/organization-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

interface PageProps {
  params: Promise<{
    organizationSlug: string;
  }>;
}

const OrganizationPage = async ({ params }: PageProps) => {
  const { organizationSlug } = await params;

  const data = await trpc.organizations.getOne({
    slug: organizationSlug,
  });

  void trpc.events.getMany.prefetchInfinite({
    limit: 5,
    organizationSlug: organizationSlug,
  });

  return (
    <HydrateClient>
      <OrganizationView organization={data} />;
    </HydrateClient>
  );
};

export default OrganizationPage;
