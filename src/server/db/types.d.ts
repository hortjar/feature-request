import { type InferSelectModel } from "drizzle-orm";
import type { features, projects, users } from "./schema";

export type User =
  | InferSelectModel<typeof users>
  | {
      name: string | null;
      image: string | null;
    };

export type Project = InferSelectModel<typeof projects> & {
  createdBy: User;
};
export type Feature = InferSelectModel<typeof features> & {
  createdBy: User;
};
