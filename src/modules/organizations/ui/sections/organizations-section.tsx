"use client";
import { Button } from "@/components/ui/button";
import { ORGANIZATION_FETCH_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import React from "react";
import toast from "react-hot-toast";

const OrganizationsSection = () => {
  const [data] = trpc.organizations.getMany.useSuspenseInfiniteQuery(
    {
      limit: ORGANIZATION_FETCH_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const utils = trpc.useUtils();

  const create = trpc.organizations.create.useMutation({
    onSuccess: () => {
      utils.organizations.getMany.invalidate();
    },
  });

  const handleCreate = async () => {
    toast.promise(
      create.mutateAsync(), // This returns a Promise
      {
        loading: "Creating organization...",
        success: "Organization created successfully!",
        error: "Failed to create organization.",
      },
      {
        success: {
          icon: "🔥",
        },
      }
    );
  };

  return (
    <div>
      {JSON.stringify(data)}{" "}
      <div>
        <Button onClick={handleCreate} disabled={create.isPending}>
          Create Organization
        </Button>
      </div>
    </div>
  );
};

export default OrganizationsSection;
