import { z } from "zod";

export const createProjectInput = z.object({
  name: z.string().min(1).max(255),
  githubUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});
