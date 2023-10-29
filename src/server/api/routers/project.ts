import { z } from "zod";
import { createId } from "~/lib/create-Id";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { projects } from "~/server/db/schema";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
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

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findFirst({
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.projects.findMany({
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
});
