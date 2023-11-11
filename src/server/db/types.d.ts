import { type InferSelectModel } from "drizzle-orm";
import type { features, projects, ratings, users } from "./schema";

export type User =
  | InferSelectModel<typeof users>
  | {
      name: string | null;
      image: string | null;
      id: string | null;
    };

export type Rating =
  | InferSelectModel<typeof ratings>
  | {
      id: string;
      value: number;
      createdById: string;
    };

export type Project = InferSelectModel<typeof projects> & {
  createdBy: User;
  features: Array<{ id: string }>;
};
export type Feature = InferSelectModel<typeof features> & {
  createdBy: User;
  ratings: Array<Rating>;
};
