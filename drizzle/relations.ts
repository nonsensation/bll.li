import { relations } from "drizzle-orm/relations";
// import { users, Post } from "./schema";

// export const PostRelations = relations(Post, ({one}) => ({
// 	user: one(users, {
// 		fields: [Post.authorId],
// 		references: [users.id]
// 	}),
// }));

// export const usersRelations = relations(users, ({many}) => ({
// 	Posts: many(Post),
// }));