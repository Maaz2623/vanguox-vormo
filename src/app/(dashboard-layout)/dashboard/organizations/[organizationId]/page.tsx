import { trpc } from "@/trpc/server";
import React from "react";

interface PageProps {
  params: Promise<{
    organizationId: string;
  }>;
}

const OrganizationPage = async ({ params }: PageProps) => {
  const { organizationId } = await params;

  const data = await trpc.organizations.getOne({
    id: organizationId,
  });

  return <div>Organization Page {data.ownerEmail}</div>;
};

export default OrganizationPage;
