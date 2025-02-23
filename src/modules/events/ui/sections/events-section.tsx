"use client";
import { EventCard } from "@/components/event-card";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { EVENTS_FETCH_LIMIT } from "@/constants";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import React from "react";

const EventsSection = ({ organizationSlug }: { organizationSlug: string }) => {
  const [data, query] = trpc.events.getMany.useSuspenseInfiniteQuery(
    {
      limit: EVENTS_FETCH_LIMIT,
      organizationSlug: organizationSlug,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      <div
        className={cn(
          "flex flex-wrap justify-center items-center gap-x-8 transition-all duration-300 gap-y-8 border border-green-500 mt-4"
        )}
      >
        {data.pages
          .flatMap((page) => page.items)
          .map((event) => {
            return (
              <EventCard
                key={event.id}
                name={event.name}
                organizationSlug={event.organizationSlug}
                id={event.id}
              />
            );
          })}
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

export default EventsSection;
