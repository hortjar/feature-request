import type { features, projects } from "./schema";

export type Project = typeof projects.$inferSelect;
export type Feature = typeof features.$inferSelect;
