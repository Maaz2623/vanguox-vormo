import { db } from "@/db";
import { organizations } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, lt, or } from "drizzle-orm";
import z from "zod";

export const organizationsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const [organization] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.id, input.id));

      if (!organization) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return organization;
    }),
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { email } = ctx.user;

    const [video] = await db
      .insert(organizations)
      .values({
        ownerEmail: email,
        name: "Untitled",
      })
      .returning();

    return {
      video,
    };
  }),
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
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit } = input;
      const { email } = ctx.user;

      const data = await db
        .select()
        .from(organizations)
        .where(
          and(
            eq(organizations.ownerEmail, email),
            cursor
              ? or(
                  lt(organizations.updatedAt, cursor.updatedAt),
                  and(
                    eq(organizations.updatedAt, cursor.updatedAt),
                    lt(organizations.id, cursor.id)
                  )
                )
              : undefined
          )
        )
        .orderBy(desc(organizations.updatedAt), desc(organizations.id))
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
});
