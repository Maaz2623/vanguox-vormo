import OrganizationView from "@/modules/organizations/ui/views/organization-view";
import { trpc } from "@/trpc/server";
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

  return <OrganizationView organization={data} />;
};

export default OrganizationPage;
