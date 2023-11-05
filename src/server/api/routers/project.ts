import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { createId } from "~/lib/create-Id";
import { schemas } from "~/lib/zod-schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { projects } from "~/server/db/schema";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: schemas.name,
        githubUrl: schemas.githubUrl,
        websiteUrl: schemas.websiteUrl,
      }),
    )
    .output(schemas.id)
    .mutation(async ({ ctx, input }) => {
      const id = createId();
      await ctx.db.insert(projects).values({
        id: id,
        name: input.name,
        createdById: ctx.session.user.id,
      });
      return id;
    }),

  getById: publicProcedure.input(schemas.id).query(({ ctx, input }) => {
    return ctx.db.query.projects.findFirst({
      where: (projects, { eq }) => eq(projects.id, input),
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany({
      with: {
        features: {
          columns: {
            id: true,
          },
        },
        createdBy: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });
  }),

  getAllForUser: protectedProcedure
    .input(schemas.userId)
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findMany({
        where: (projects, { eq }) => eq(projects.createdById, input),
        with: {
          createdBy: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
      });
    }),

  getPaged: publicProcedure
    .input(
      z.object({
        limit: schemas.limit,
        offset: schemas.offset,
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findMany({
        offset: (input.offset - 1) * input.limit,
        limit: input.limit,
        with: {
          features: {
            columns: {
              id: true,
            },
          },
          createdBy: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
      });
    }),

  getPagedForUser: publicProcedure
    .input(
      z.object({
        limit: schemas.limit,
        offset: schemas.offset,
        userId: schemas.userId,
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.query.projects.findMany({
        offset: (input.offset - 1) * input.limit,
        limit: input.limit,
        with: {
          features: {
            columns: {
              id: true,
            },
          },
          createdBy: {
            columns: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: (projects, { desc }) => [desc(projects.createdAt)],
        where: (projects, { eq }) => eq(projects.createdById, input.userId),
      });
    }),

  getAllCount: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({ count: sql`COUNT(*)` })
      .from(projects)
      .limit(1);
  }),

  getAllCountForUser: publicProcedure
    .input(schemas.userId)
    .query(({ ctx, input }) => {
      return ctx.db
        .select({ count: sql`COUNT(*)` })
        .from(projects)
        .where(eq(projects.createdById, input))
        .limit(1);
    }),
});
