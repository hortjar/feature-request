import { type InferSelectModel } from "drizzle-orm";
import type {
  featureComments,
  features,
  projects,
  ratings,
  userFeatureAsignees,
  users,
} from "./schema";

export type UserSimple = {
  name: string | null;
  image: string | null;
  id: string | null;
};

export type User = InferSelectModel<typeof users> | UserSimple;

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

export type FeatureComment = InferSelectModel<typeof featureComments> & {
  user: UserSimple;
};

export type FeatureAsignee = { id: string; userId: string; user: UserSimple };

export const FeatureStatusStyles = {
  Pending: "bg-gray-500",
  "In Progress": "bg-indigo-500",
  Rejected: "bg-red-500",
  Completed: "bg-green-600",
};

export type FeatureStatus = keyof typeof FeatureStatusStyles;
