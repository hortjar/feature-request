import { sql } from "drizzle-orm";
import { z } from "zod";
import { createId } from "~/lib/create-Id";
import { createProjectInput } from "~/lib/inputs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { projects } from "~/server/db/schema";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createProjectInput)
    .output(z.string().min(1).max(31))
    .mutation(async ({ ctx, input }) => {
      const id = createId();
      await ctx.db.insert(projects).values({
        id: id,
        name: input.name,
        createdById: ctx.session.user.id,
      });
      return id;
    }),

  getById: publicProcedure
    .input(z.string().min(1).max(31))
    .query(({ ctx, input }) => {
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
    .input(z.string().min(1).max(255))
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
        limit: z.number().finite().positive(),
        offset: z.number().finite().positive(),
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

  getAllCount: publicProcedure.query(({ ctx }) => {
    return ctx.db.select({ count: sql`COUNT(*)` }).from(projects);
  }),
});
