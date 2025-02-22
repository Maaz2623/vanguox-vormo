import { db } from "@/db";
import { memberships, organizations } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { and, desc, eq, getTableColumns, lt, or } from "drizzle-orm";
import z from "zod";

export const organizationsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [organization] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.slug, input.slug));

      if (!organization) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }

      return organization;
    }),
  create: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = ctx.user;

      const [existingOrganization] = await db
        .select()
        .from(organizations)
        .where(eq(organizations.slug, input.slug));

      if (existingOrganization) {
        throw new TRPCError({
          code: "CONFLICT",
        });
      }

      const [organization] = await db
        .insert(organizations)
        .values({
          ownerEmail: email,
          name: input.name,
          slug: input.slug,
        })
        .returning();

      await db
        .insert(memberships)
        .values({
          userEmail: email,
          organizationId: organization.id,
          memberRole: "ADMIN",
        })
        .returning();

      return {
        organization,
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

      // Create a valid subquery for counting members per organization
      const memberCountSubquery = db
        .select({
          organizationId: memberships.organizationId,
          count: db.$count(memberships).as("count"),
        })
        .from(memberships)
        .where(eq(memberships.userEmail, email))
        .groupBy(memberships.organizationId)
        .as("memberCounts");

      const data = await db
        .select({
          ...getTableColumns(organizations),
          memberCount: memberCountSubquery.count, // Select the count properly
        })
        .from(organizations)
        .leftJoin(
          memberCountSubquery,
          eq(organizations.id, memberCountSubquery.organizationId)
        ) // Proper join
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
