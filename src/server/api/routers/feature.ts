import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { features } from "~/server/db/schema";

export const featureRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        content: z.string().min(1),
        projectId: z.string().min(1).max(31),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(features).values({
        id: createId(),
        name: input.name,
        content: input.content,
        projectId: input.projectId,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.features.findFirst({
      orderBy: (features, { desc }) => [desc(features.createdAt)],
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.features.findMany({
      orderBy: (features, { desc }) => [desc(features.createdAt)],
    });
  }),

  getForProject: publicProcedure
    .input(z.string().min(1).max(31))
    .query(({ ctx, input }) => {
      return ctx.db.query.features.findMany({
        where: (features, { eq }) => eq(features.projectId, input),
        with: {
          createdBy: {
            columns: {
              name: true,
              image: true,
              id: true,
            },
          },
          ratings: {
            columns: {
              id: true,
              value: true,
              createdById: true,
            },
          },
        },
      });
    }),
});
