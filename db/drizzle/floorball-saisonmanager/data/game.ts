
// /* Game https://saisonmanager.de/api/v2/games/32217.json */

// import { z } from 'zod'
// import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
// import
// {
//     integer,
//     text,
//     boolean,
//     json,
//     pgTable,
// } from 'drizzle-orm/pg-core'
// import { type InferInsertModel, type InferSelectModel } from "drizzle-orm"
// import { SM } from 'floorball-saisonmanager'
// import { createPgEnum } from './../../util'

// const Table = pgTable

// const createEnum = createPgEnum

// export const teamSideEnum = createEnum( 'teamSide', SM.TeamSide )
// export const eventTypeEnum = createEnum( 'eventType', SM.EventType )
// export const goalTypeEnum = createEnum( 'goalType', SM.GoalType )
// export const penaltyTypeEnum = createEnum( 'penaltyType', SM.PenaltyType )

// export const team = Table( 'team', {
//     id: integer( 'id' ).notNull(),
//     name: text( 'name' ).notNull(),
//     logo_url: text( 'logo_url' ).notNull(),
// } )

// export const gamePlayer = Table( 'gamePlayers', {
//     player_id: integer( 'player_id' ), //.references( () => player.id ),
//     trikot_number: integer( 'trikot_number' ).notNull(),
//     team_side: teamSideEnum( 'team_side' ).notNull(),
//     is_captain: boolean( 'is_captain' ).default( false ),
//     is_goalkeeper: boolean( 'is_goalkeeper' ).default( false ),
// } )

// export const player = Table( 'player', {
//     id: integer( 'id' ).notNull(),
//     first_name: text( 'first_name' ).notNull(),
//     last_name: text( 'last_name' ).notNull(),
// } )

// export const referee = Table( 'referee', {
//     licence_id: integer( 'licence_id' ).notNull(),
//     first_name: text( 'first_name' ).notNull(),
//     last_name: text( 'last_name' ).notNull(),
// } )

// export const gameEvent = Table( 'gameEvent', {
//     id: integer( 'id' ).notNull(),
//     game_id: integer( 'game_id' ).notNull(),
//     team_side: teamSideEnum( 'team_side' ).notNull(),
//     event_type: eventTypeEnum( 'event_type' ).notNull(),
//     sortkey: text( 'sortkey' ).notNull(),
//     period: integer( 'period' ).notNull(),
//     time: text( 'time' ).notNull(),
//     // goal
//     home_goals: integer( 'home_goals' ).default( 0 ).notNull(),
//     guest_goals: integer( 'guest_goals' ).default( 0 ).notNull(),
//     trikot_number: integer( 'trikot_number' ).notNull(),
//     assist_trikot_number: integer( 'assist_trikot_number' ),
//     player_id: integer( 'player_id' ), //.references( () => player.id ),
//     assist_player_id: integer( 'assist_player_id' ), //.references( () => player.id ),
//     goal_type: goalTypeEnum( 'goal_type' ).notNull(),
//     // penalty
//     penalty_type: penaltyTypeEnum( 'penalty_type' ),
//     penalty_reason: text( 'penalty_reason' ), // use SM.PenaltyType for this..
// } )

// export const game = Table( 'game', {
//     id: integer( 'id' ).notNull(),
//     game_number: text( 'game_number' ).notNull(),
//     start_time: text( 'start_time' ).notNull(),
//     date: text( 'date' ).notNull(),
//     game_day: integer( 'game_day' ).notNull(),
//     audience: integer( 'audience' ),
//     home_team_id: integer( 'home_team_id' ).notNull(), //.references( () => team.id ),
//     guest_team_id: integer( 'guest_team_id' ).notNull(), //.references( () => team.id ),
//     live_stream_link: text( 'live_stream_link' ),
//     vod_link: text( 'vod_link' ),
//     league_id: integer( 'league_id' ).notNull(), //.references( () => league.id ),
//     game_operation_id: integer( 'game_operation_id' ).notNull(), //.references( () => gameOperation.id ),
//     arena_id: integer( 'arena' ).notNull(),
//     nominated_referees: text( 'nominated_referees' ),
//     referee_ids: json( 'referee_ids' ).notNull(),
//     is_forfait: boolean( 'is_forfait' ).default( false ).notNull(),
// } )

// export const gameOperation = Table( 'gameOperation', {
//     id: integer( 'id' ).notNull(),
// } )

// export const league = Table( 'league', {
//     id: integer( 'id' ).notNull(),
// } )






// type game_references = {
//     events: Event[],
//     referees: Referee[],
//     league: League,
//     game_operation: GameOperation,
//     home_team: Team,
//     guest_team: Team,
// }

// type gameEvent_references = {
//     player: Player,
//     assist_player?: Player,
// }

// type gamePlayer_references = {
//     player: Player,
//     game: Game,
// }

// export type SelectTeam = InferSelectModel<typeof team>
// export type InsertTeam = InferInsertModel<typeof team>
// export type Team = SelectTeam

// export type SelectGamePlayer = InferSelectModel<typeof gamePlayer> & gamePlayer_references
// export type InsertGamePlayer = InferInsertModel<typeof gamePlayer>
// export type GamePlayer = SelectGamePlayer

// export type SelectPlayer = InferSelectModel<typeof player>
// export type InsertPlayer = InferInsertModel<typeof player>
// export type Player = SelectPlayer

// export type SelectReferee = InferSelectModel<typeof referee>
// export type InsertReferee = InferInsertModel<typeof referee>
// export type Referee = SelectReferee

// export type SelectLeague = InferSelectModel<typeof league>
// export type InsertLeague = InferInsertModel<typeof league>
// export type League = SelectLeague

// export type SelectGameOperation = InferSelectModel<typeof gameOperation>
// export type InsertGameOperation = InferInsertModel<typeof gameOperation>
// export type GameOperation = SelectGameOperation

// export type SelectGame = InferSelectModel<typeof game> & game_references
// export type InsertGame = InferInsertModel<typeof game>
// export type Game = SelectGame

// export type SelectGameEvent = InferSelectModel<typeof gameEvent> & gameEvent_references
// export type InsertGameEvent = InferInsertModel<typeof gameEvent>




// export const selectGameSchema = createSelectSchema( game )
// export const insertGameSchema = createInsertSchema( game )

// export const selectGameEventSchema = createSelectSchema( gameEvent )
// export const insertGameEventSchema = createInsertSchema( gameEvent )

// export const selectPlayerSchema = createSelectSchema( player )
// export const insertPlayerSchema = createInsertSchema( player )

// export const selectGamePlayerSchema = createSelectSchema( gamePlayer )
// export const insertGamePlayerSchema = createInsertSchema( gamePlayer )

// export const selectLeagueSchema = createSelectSchema( league )
// export const insertLeagueSchema = createInsertSchema( league )

// export const selectRefereeSchema = createSelectSchema( referee )
// export const insertRefereeSchema = createInsertSchema( referee )

// export const selectGameOperationSchema = createSelectSchema( gameOperation )
// export const insertGameOperationSchema = createInsertSchema( gameOperation )

// export const selectTeamSchema = createSelectSchema( team )
// export const insertTeamSchema = createInsertSchema( team )




