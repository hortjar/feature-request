import { createTRPCRouter } from "~/server/api/trpc";
import { featureRouter } from "./routers/feature";
import { projectRouter } from "./routers/project";
import { ratingRouter } from "./routers/rating";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  feature: featureRouter,
  project: projectRouter,
  rating: ratingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
