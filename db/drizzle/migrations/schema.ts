import { pgTable, pgEnum, integer, text, boolean } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const eventType = pgEnum("eventType", ['goal', 'timeout', 'penalty'])
export const goalType = pgEnum("goalType", ['regular', 'owngoal', 'penalty_shot'])
export const penaltyType = pgEnum("penaltyType", ['penalty_2', 'penalty_2and2', 'penalty_5', 'penalty_10', 'penalty_ms_tech', 'penalty_ms_full', 'penalty_ms1', 'penalty_ms2', 'penalty_ms3'])
export const teamSide = pgEnum("teamSide", ['home', 'guest'])


export const referees = pgTable("referees", {
	id: integer("id").primaryKey().notNull(),
	firstName: text("firstName").notNull(),
	lastName: text("lastName").notNull(),
	licenseId: integer("licenseId").notNull(),
});

export const events = pgTable("events", {
	id: integer("id").primaryKey().notNull(),
	eventType: text("eventType").notNull(),
	gameId: integer("gameId").notNull(),
	period: integer("period").notNull(),
	sortkey: text("sortkey").notNull(),
	teamId: integer("teamId").notNull(),
	time: text("time").notNull(),
	assist: integer("assist"),
	goalType: text("goalType"),
	guestGoals: integer("guestGoals"),
	homeGoals: integer("homeGoals"),
	isForfait: boolean("isForfait").notNull(),
	isOvertime: boolean("isOvertime").notNull(),
	number: integer("number"),
	penaltyReason: integer("penaltyReason"),
	penaltyType: text("penaltyType"),
});

export const teams = pgTable("teams", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	logo: text("logo").notNull(),
});

export const leagues = pgTable("leagues", {
	id: integer("id").primaryKey().notNull(),
	leagueCategoryId: text("leagueCategoryId").notNull(),
	leagueClassId: text("leagueClassId").notNull(),
	leagueSystemId: text("leagueSystemId").notNull(),
	leagueType: text("leagueType").notNull(),
	name: text("name").notNull(),
	shortName: text("shortName").notNull(),
	sortKey: text("sortKey").notNull(),
	season: text("season").notNull(),
	seasonId: integer("seasonId").notNull(),
	fieldSize: text("fieldSize"),
	gameOperationId: integer("gameOperationId").notNull(),
	hasPreround: boolean("hasPreround").notNull(),
	isFemale: boolean("isFemale").notNull(),
	isLegacyLeague: boolean("isLegacyLeague").notNull(),
	leagueModus: text("leagueModus"),
	overtimeLength: text("overtimeLength"),
	periodLength: text("periodLength"),
	periods: text("periods"),
	tableModus: text("tableModus").notNull(),
});

export const arenas = pgTable("arenas", {
	id: integer("id").primaryKey().notNull(),
	arenaId: integer("arenaId").notNull(),
	name: text("name").notNull(),
	short: text("short").notNull(),
	address: text("address").notNull(),
});

export const game_operations = pgTable("game_operations", {
	id: integer("id").primaryKey().notNull(),
	gameOperationId: integer("gameOperationId").notNull(),
	name: text("name").notNull(),
	logoQuadUrl: text("logoQuadUrl"),
	logoUrl: text("logoUrl"),
	path: text("path"),
	shortName: text("shortName"),
});

export const goals = pgTable("goals", {
	id: integer("id").primaryKey().notNull(),
	eventId: integer("eventId").notNull(),
	gameId: integer("gameId").notNull(),
	teamId: integer("teamId").notNull(),
	goalType: text("goalType").notNull(),
	playerId: integer("playerId"),
	assistId: integer("assistId"),
});

export const players = pgTable("players", {
	id: integer("id").primaryKey().notNull(),
	firstName: text("firstName").notNull(),
	lastName: text("lastName").notNull(),
});

export const seasons = pgTable("seasons", {
	id: integer("id").primaryKey().notNull(),
	seasonId: integer("seasonId").notNull(),
	name: text("name").notNull(),
	isCurrent: boolean("isCurrent").notNull(),
});

export const penalties = pgTable("penalties", {
	id: integer("id").primaryKey().notNull(),
	eventId: integer("eventId").notNull(),
	gameId: integer("gameId").notNull(),
	playerId: integer("playerId").notNull(),
	teamId: integer("teamId").notNull(),
	penaltyReason: integer("penaltyReason").notNull(),
	penaltyType: text("penaltyType").notNull(),
});

export const games = pgTable("games", {
	id: integer("id").primaryKey().notNull(),
	gameNumber: text("gameNumber").notNull(),
	date: text("date").notNull(),
	leagueId: integer("leagueId").notNull(),
	arenaId: integer("arenaId").notNull(),
	gameOperationId: integer("gameOperationId").notNull(),
	teamHomeId: integer("teamHomeId").notNull(),
	teamGuestId: integer("teamGuestId").notNull(),
	nominatedReferees: text("nominatedReferees").notNull(),
	audience: integer("audience"),
	livestreamLink: text("livestreamLink"),
	vodLink: text("vodLink"),
});