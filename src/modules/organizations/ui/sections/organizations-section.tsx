"use client";
import { Button } from "@/components/ui/button";
import { ORGANIZATION_FETCH_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import toast from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { InfiniteScroll } from "@/components/infinite-scroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export const OrganizationsSection = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <OrganizationsSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

const OrganizationsSectionSuspense = () => {
  const [data, query] = trpc.organizations.getMany.useSuspenseInfiniteQuery(
    {
      limit: ORGANIZATION_FETCH_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const { data: session } = useSession();

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
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Views</TableHead>
              <TableHead className="">Comments</TableHead>
              <TableHead className="pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pages
              .flatMap((page) => page.items)
              .map((organization) => (
                <Link
                  href={`/dashboard/organizations/${organization.id}`}
                  key={organization.id}
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer">
                    <TableCell>{organization.name}</TableCell>
                    <TableCell>
                      {session?.user?.email === organization.ownerEmail
                        ? "You"
                        : organization.ownerEmail}
                    </TableCell>
                    <TableCell>
                      {format(organization.createdAt, "yyyy-MMM-dd")}
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <Button onClick={handleCreate} disabled={create.isPending}>
          Create Organization
        </Button>
      </div>
      <InfiniteScroll
        // isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      />
    </div>
  );
};
