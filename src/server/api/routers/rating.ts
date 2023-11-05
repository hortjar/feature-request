import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { schemas } from "~/lib/zod-schemas";

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
        featureId: schemas.id,
        createdById: schemas.userId,
        value: schemas.ratingValue,
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
        id: schemas.id,
        featureId: schemas.id,
        createdById: schemas.userId,
        value: schemas.ratingValue,
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
