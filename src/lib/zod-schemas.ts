import { z } from "zod";

export const schemas = {
  userId: z.string().min(1).max(255),
  id: z.string().min(1).max(31),
  ratingValue: z.number().min(-1).max(1),
  limit: z.number().finite().positive(),
  offset: z.number().finite().positive(),
  name: z.string().min(1).max(255),
  content: z.string().min(1).max(1023),
  githubUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
};
