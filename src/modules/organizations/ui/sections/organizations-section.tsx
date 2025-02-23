"use client";
import { ORGANIZATION_FETCH_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { OrganizationTableActions } from "../components/organization-table-actions";

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

  return (
    <div>
      <div className="border-y rounded-lg overflow-hidden">
        <Table className="">
          <TableHeader className="">
            <TableRow className="bg-neutral-100">
              <TableHead className="w-[350px] font-bold">
                Organization name
              </TableHead>
              <TableHead className="font-bold">Slug</TableHead>
              <TableHead className="font-bold">Owned by</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Created At</TableHead>
              <TableHead className="font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.pages
              .flatMap((page) => page.items)
              .map((organization) => {
                const isOwner =
                  organization.ownerEmail === session?.user?.email;

                return (
                  <Link
                    href={`/dashboard/organizations/${organization.slug}`}
                    key={organization.id}
                    legacyBehavior
                  >
                    <TableRow className="cursor-pointer">
                      <TableCell>{organization.name}</TableCell>
                      <TableCell>{organization.slug}</TableCell>
                      <TableCell>
                        {session?.user?.email === organization.ownerEmail
                          ? "You"
                          : organization.ownerEmail}
                      </TableCell>
                      <TableCell>
                        {organization.active ? (
                          <Badge
                            variant="outline"
                            className="bg-green-200/80 border border-green-500 text-green-700 w-[70px] text-center flex justify-center items-center"
                          >
                            active
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="bg-rose-200/80 border border-rose-500 text-rose-700 text-center flex justify-center items-center w-[70px]"
                          >
                            inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {format(organization.createdAt, "yyyy-MMM-dd")}
                      </TableCell>
                      <TableCell className="pl-4">
                        <OrganizationTableActions
                          isOwner={isOwner}
                          organizationSlug={organization.slug}
                        />
                      </TableCell>
                    </TableRow>
                  </Link>
                );
              })}
          </TableBody>
        </Table>
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
