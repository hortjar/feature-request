import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { features } from "~/server/db/schema";

export const featureRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(features).values({
        name: input.name,
        content: input.content,
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
    .input(z.number().finite().safe())
    .query(({ ctx, input }) => {
      return ctx.db.query.features.findMany({
        where: (features, { eq }) => eq(features.projectId, input),
      });
    }),
});
