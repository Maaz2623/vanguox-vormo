import { db } from "@/db";
import { events } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { and, desc, eq, lt, or } from "drizzle-orm";
import { z } from "zod";

export const eventsRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z
          .object({
            id: z.string().uuid(),
            updatedAt: z.date(),
          })
          .nullish(),
        limit: z.number().min(1).max(100),
        organizationSlug: z.string(), // Fetch events for a specific organization
      })
    )
    .query(async ({ input }) => {
      const { cursor, limit, organizationSlug } = input;

      // Fetch events with pagination
      const data = await db
        .select()
        .from(events)
        .where(
          and(
            eq(events.organizationSlug, organizationSlug),
            cursor
              ? or(
                  lt(events.updatedAt, cursor.updatedAt),
                  and(
                    eq(events.updatedAt, cursor.updatedAt),
                    lt(events.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(events.updatedAt), desc(events.id))
        .limit(limit + 1);

      const hasMore = data.length > limit;
      const items = hasMore ? data.slice(0, -1) : data;
      const lastItem = items[items.length - 1];

      const nextCursor = hasMore
        ? {
            id: lastItem.id,
            updatedAt: lastItem.updatedAt,
          }
        : null;

      return {
        items,
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        organizationSlug: z.string(),
        type: z.enum(["PRIVATE", "PUBLIC"]),
      })
    )
    .mutation(async ({ input }) => {
      const [event] = await db
        .insert(events)
        .values({
          name: input.name,
          type: input.type,
          organizationSlug: input.organizationSlug,
        })
        .returning();

      return {
        event,
      };
    }),
});
