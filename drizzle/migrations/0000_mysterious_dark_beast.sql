CREATE TABLE IF NOT EXISTS "arenas" (
	"id" integer PRIMARY KEY NOT NULL,
	"arenaId" integer NOT NULL,
	"name" text NOT NULL,
	"short" text NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" integer PRIMARY KEY NOT NULL,
	"eventType" text NOT NULL,
	"gameId" integer NOT NULL,
	"period" integer NOT NULL,
	"sortkey" text NOT NULL,
	"teamId" integer NOT NULL,
	"time" text NOT NULL,
	"assist" integer,
	"goalType" text,
	"guestGoals" integer,
	"homeGoals" integer,
	"isForfait" boolean NOT NULL,
	"isOvertime" boolean NOT NULL,
	"number" integer NOT NULL,
	"penaltyReason" integer,
	"penaltyType" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_operations" (
	"id" integer PRIMARY KEY NOT NULL,
	"gameOperationId" integer NOT NULL,
	"name" text NOT NULL,
	"logoQuadUrl" text,
	"logoUrl" text,
	"path" text,
	"shortName" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "games" (
	"id" integer PRIMARY KEY NOT NULL,
	"gameNumber" text NOT NULL,
	"date" timestamp NOT NULL,
	"leagueId" integer NOT NULL,
	"arenaId" integer NOT NULL,
	"gameOperationId" integer NOT NULL,
	"teamHomeId" integer NOT NULL,
	"teamGuestId" integer NOT NULL,
	"nominatedReferees" text NOT NULL,
	"audience" integer,
	"livestreamLink" text,
	"vodLink" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "goals" (
	"id" integer PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"gameId" integer NOT NULL,
	"teamId" integer NOT NULL,
	"goalType" text NOT NULL,
	"playerId" integer,
	"assistId" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "leagues" (
	"id" integer PRIMARY KEY NOT NULL,
	"leagueCategoryId" text NOT NULL,
	"leagueClassId" text NOT NULL,
	"leagueSystemId" text NOT NULL,
	"leagueType" text NOT NULL,
	"name" text NOT NULL,
	"shortName" text NOT NULL,
	"sortKey" text NOT NULL,
	"season" text NOT NULL,
	"seasonId" integer NOT NULL,
	"fieldSize" text,
	"gameOperationId" integer NOT NULL,
	"hasPreround" boolean NOT NULL,
	"isFemale" boolean NOT NULL,
	"isLegacyLeague" boolean NOT NULL,
	"leagueModus" text,
	"overtimeLength" text,
	"periodLength" text,
	"periods" text,
	"tableModus" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "penalties" (
	"id" integer PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"gameId" integer NOT NULL,
	"playerId" integer NOT NULL,
	"teamId" integer NOT NULL,
	"penaltyReason" integer NOT NULL,
	"penaltyType" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "players" (
	"id" integer PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "referees" (
	"id" integer PRIMARY KEY NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"licenseId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seasons" (
	"id" integer PRIMARY KEY NOT NULL,
	"seasonId" integer NOT NULL,
	"name" text NOT NULL,
	"isCurrent" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teams" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_leagueId_leagues_id_fk" FOREIGN KEY ("leagueId") REFERENCES "public"."leagues"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_arenaId_arenas_id_fk" FOREIGN KEY ("arenaId") REFERENCES "public"."arenas"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_gameOperationId_game_operations_id_fk" FOREIGN KEY ("gameOperationId") REFERENCES "public"."game_operations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_teamHomeId_teams_id_fk" FOREIGN KEY ("teamHomeId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "games" ADD CONSTRAINT "games_teamGuestId_teams_id_fk" FOREIGN KEY ("teamGuestId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_playerId_players_id_fk" FOREIGN KEY ("playerId") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals" ADD CONSTRAINT "goals_assistId_players_id_fk" FOREIGN KEY ("assistId") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leagues" ADD CONSTRAINT "leagues_seasonId_seasons_id_fk" FOREIGN KEY ("seasonId") REFERENCES "public"."seasons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "leagues" ADD CONSTRAINT "leagues_gameOperationId_game_operations_id_fk" FOREIGN KEY ("gameOperationId") REFERENCES "public"."game_operations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "penalties" ADD CONSTRAINT "penalties_eventId_events_id_fk" FOREIGN KEY ("eventId") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "penalties" ADD CONSTRAINT "penalties_gameId_games_id_fk" FOREIGN KEY ("gameId") REFERENCES "public"."games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "penalties" ADD CONSTRAINT "penalties_playerId_players_id_fk" FOREIGN KEY ("playerId") REFERENCES "public"."players"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "penalties" ADD CONSTRAINT "penalties_teamId_teams_id_fk" FOREIGN KEY ("teamId") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
