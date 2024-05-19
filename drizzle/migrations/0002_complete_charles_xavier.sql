ALTER TABLE "events" DROP CONSTRAINT "events_gameId_games_id_fk";
--> statement-breakpoint
ALTER TABLE "events" DROP CONSTRAINT "events_teamId_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_leagueId_leagues_id_fk";
--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_arenaId_arenas_id_fk";
--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_gameOperationId_game_operations_id_fk";
--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_teamHomeId_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "games" DROP CONSTRAINT "games_teamGuestId_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_eventId_events_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_gameId_games_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_teamId_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_playerId_players_id_fk";
--> statement-breakpoint
ALTER TABLE "goals" DROP CONSTRAINT "goals_assistId_players_id_fk";
--> statement-breakpoint
ALTER TABLE "leagues" DROP CONSTRAINT "leagues_seasonId_seasons_id_fk";
--> statement-breakpoint
ALTER TABLE "leagues" DROP CONSTRAINT "leagues_gameOperationId_game_operations_id_fk";
--> statement-breakpoint
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_eventId_events_id_fk";
--> statement-breakpoint
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_gameId_games_id_fk";
--> statement-breakpoint
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_playerId_players_id_fk";
--> statement-breakpoint
ALTER TABLE "penalties" DROP CONSTRAINT "penalties_teamId_teams_id_fk";
