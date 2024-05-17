import { pgTable, uniqueIndex, text, timestamp, foreignKey, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email"),
	created_at: timestamp("created_at", { precision: 3, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { precision: 3, mode: 'string' }).notNull(),
},
(table) => {
	return {
		email_key: uniqueIndex("users_email_key").on(table.email),
	}
});

export const Post = pgTable("Post", {
	id: text("id").primaryKey().notNull(),
	title: text("title").notNull(),
	content: text("content"),
	published: boolean("published").default(false).notNull(),
	authorId: text("authorId").references(() => users.id, { onDelete: "set null", onUpdate: "cascade" } ),
});

