import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";
import { schemas } from "~/lib/zod-schemas";

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
});
