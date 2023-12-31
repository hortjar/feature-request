import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  smallint,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";
import { type FeatureStatus } from "./types.d";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `feature-request_${name}`,
);

export const projects = mysqlTable(
  "project",
  {
    id: varchar("id", { length: 31 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    createdByIdIdx: index("createdById_idx").on(table.createdById),
    nameIndex: index("name_idx").on(table.name),
  }),
);

export const projectRelations = relations(projects, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [projects.createdById],
    references: [users.id],
  }),
  features: many(features),
}));

export const features = mysqlTable(
  "feature",
  {
    id: varchar("id", { length: 31 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    content: text("content").notNull(),
    projectId: varchar("projectId", { length: 31 }).notNull(),
    status: text("status").$type<FeatureStatus>().default("Pending"),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    createdByIdIdx: index("createdById_idx").on(table.createdById),
    nameIndex: index("name_idx").on(table.name),
  }),
);

export const featuresRelations = relations(features, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [features.createdById],
    references: [users.id],
  }),
  project: one(projects, {
    fields: [features.projectId],
    references: [projects.id],
  }),
  ratings: many(ratings),
  asignees: many(userFeatureAsignees),
  comments: many(featureComments),
}));

export const ratings = mysqlTable(
  "rating",
  {
    id: varchar("id", { length: 31 }).primaryKey(),
    value: smallint("value").notNull(),
    featureId: varchar("featureId", { length: 31 }).notNull(),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (table) => ({
    createdByIdIdx: index("createdById_idx").on(table.createdById),
  }),
);

export const ratingsRelations = relations(ratings, ({ one }) => ({
  createdBy: one(users, {
    fields: [ratings.createdById],
    references: [users.id],
  }),
  feature: one(features, {
    fields: [ratings.featureId],
    references: [features.id],
  }),
}));

export const featureComments = mysqlTable("featureComments", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull().primaryKey(),
  featureId: varchar("featureId", { length: 255 }).notNull().primaryKey(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const featureCommentsRelations = relations(
  featureComments,
  ({ one }) => ({
    user: one(users, {
      fields: [featureComments.userId],
      references: [users.id],
    }),
    feature: one(features, {
      fields: [featureComments.featureId],
      references: [features.id],
    }),
  }),
);

export const featureTags = mysqlTable("featureTag", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  createdUserId: varchar("createdUserId", { length: 255 })
    .notNull()
    .primaryKey(),
  featureId: varchar("featureId", { length: 255 }).notNull().primaryKey(),
  content: varchar("content", { length: 255 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const featureTagsRelations = relations(featureTags, ({ one }) => ({
  user: one(users, {
    fields: [featureTags.createdUserId],
    references: [users.id],
  }),
  feature: one(features, {
    fields: [featureTags.featureId],
    references: [features.id],
  }),
}));

export const userFeatureAsignees = mysqlTable("userFeatureAsignee", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull().primaryKey(),
  featureId: varchar("featureId", { length: 255 }).notNull().primaryKey(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const userFeatureAsigneesRelations = relations(
  userFeatureAsignees,
  ({ one }) => ({
    user: one(users, {
      fields: [userFeatureAsignees.userId],
      references: [users.id],
    }),
    feature: one(features, {
      fields: [userFeatureAsignees.featureId],
      references: [features.id],
    }),
  }),
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (table) => ({
    compoundKey: primaryKey(table.provider, table.providerAccountId),
    userIdIdx: index("userId_idx").on(table.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    userIdIdx: index("userId_idx").on(table.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (table) => ({
    compoundKey: primaryKey(table.identifier, table.token),
  }),
);
