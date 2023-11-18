import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { schemas } from "~/lib/zod-schemas";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { featureComments, features } from "~/server/db/schema";

export const featureRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: schemas.name,
        content: schemas.content,
        projectId: schemas.id,
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

  getById: publicProcedure.input(schemas.id).query(({ ctx, input }) => {
    return ctx.db.query.features.findFirst({
      where: (features, { eq }) => eq(features.id, input),
      with: {
        ratings: {
          columns: {
            id: true,
            value: true,
            createdById: true,
          },
        },
        asignees: {
          columns: {
            id: true,
            userId: true,
          },
          with: {
            user: {
              columns: {
                id: true,
                image: true,
                name: true,
              },
            },
          },
        },
        comments: {
          columns: {
            id: true,
            content: true,
            featureId: true,
            createdAt: true,
            userId: true,
            updatedAt: true,
          },
          with: {
            user: {
              columns: {
                id: true,
                image: true,
                name: true,
              },
            },
          },
          orderBy: (featureComments, { desc }) => [
            desc(featureComments.createdAt),
          ],
        },
        createdBy: {
          columns: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
    });
  }),

  getForProject: publicProcedure.input(schemas.id).query(({ ctx, input }) => {
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

  submitComment: protectedProcedure
    .input(
      z.object({
        content: schemas.content,
        featureId: schemas.id,
        userId: schemas.userId,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(featureComments).values({
        content: input.content,
        id: createId(),
        featureId: input.featureId,
        userId: input.userId,
      });
    }),
});
