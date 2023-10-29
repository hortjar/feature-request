import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { ratings } from "~/server/db/schema";

export const ratingRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        featureId: z.string().min(1).max(31),
        createdById: z.string().min(1).max(255),
        value: z.number().min(-1).max(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(ratings).values({
        id: createId(),
        featureId: input.featureId,
        createdById: input.createdById,
        value: input.value,
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1).max(31),
        featureId: z.string().min(1).max(31),
        createdById: z.string().min(1).max(255),
        value: z.number().min(-1).max(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(ratings)
        .set({
          id: createId(),
          featureId: input.featureId,
          createdById: input.createdById,
          value: input.value,
        })
        .where(eq(ratings.id, input.id));
    }),
});
