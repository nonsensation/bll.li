import { mysqlTable, text, int, boolean } from 'drizzle-orm/mysql-core'
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'


const Table = mysqlTable
const integer = int;


export const arenas = Table( 'arenas', {
    id: integer( 'id' ).primaryKey(),
    arenaId: integer( 'arenaId' ).notNull(),
    name: text( 'name' ).notNull(),
    short: text( 'short' ).notNull(),
    address: text( 'address' ).notNull(),
} )

export const events = Table( 'events', {
    id: integer( 'id' ).primaryKey(),
    eventType: text( 'eventType' ).notNull(),
    gameId: integer( 'gameId' ).notNull(), //.references( () => games.id ),
    period: integer( 'period' ).notNull(),
    sortkey: text( 'sortkey' ).notNull(),
    teamId: integer( 'teamId' ).notNull(), //.references( () => teams.id ),
    time: text( 'time' ).notNull(),
    assist: integer( 'assist' ),
    goalType: text( 'goalType' ),
    guestGoals: integer( 'guestGoals' ), // TODO: notnull
    homeGoals: integer( 'homeGoals' ), // TODO: notnull
    isForfait: boolean( 'isForfait' ).notNull(),
    isOvertime: boolean( 'isOvertime' ).notNull(),
    number: integer( 'number' ),
    penaltyReason: integer( 'penaltyReason' ),
    penaltyType: text( 'penaltyType' ),
} )

export const gameOperations = Table( 'game_operations', {
    id: integer( 'id' ).primaryKey(),
    gameOperationId: integer( 'gameOperationId' ).notNull(),
    name: text( 'name' ).notNull(),
    logoQuadUrl: text( 'logoQuadUrl' ),
    logoUrl: text( 'logoUrl' ),
    path: text( 'path' ),
    shortName: text( 'shortName' ),
} )

export const games = Table( 'games', {
    id: integer( 'id' ).primaryKey(),
    gameNumber: text( 'gameNumber' ).notNull(),
    date: text( 'date' ).notNull(),
    leagueId: integer( 'leagueId' ).notNull(), //.references( () => leagues.id ),
    arenaId: integer( 'arenaId' ).notNull(), //.references( () => arenas.id ),
    gameOperationId: integer( 'gameOperationId' ).notNull(), //.references( () => gameOperations.id ),
    teamHomeId: integer( 'teamHomeId' ).notNull(), //.references( () => teams.id ),
    teamGuestId: integer( 'teamGuestId' ).notNull(), //.references( () => teams.id ),
    nominatedReferees: text( 'nominatedReferees' ).notNull(),
    audience: integer( 'audience' ),
    livestreamLink: text( 'livestreamLink' ),
    vodLink: text( 'vodLink' ),
} )

export const goals = Table( 'goals', {
    id: integer( 'id' ).primaryKey(),
    eventId: integer( 'eventId' ).notNull(), //.references( () => events.id ),
    gameId: integer( 'gameId' ).notNull(), //.references( () => games.id ),
    teamId: integer( 'teamId' ).notNull(), //.references( () => teams.id ),
    goalType: text( 'goalType' ).notNull(),
    playerId: integer( 'playerId' ), //.references( () => players.id ),
    assistId: integer( 'assistId' ), //.references( () => players.id ),
} )

export const leagues = Table( 'leagues', {
    id: integer( 'id' ).primaryKey(),
    leagueCategoryId: text( 'leagueCategoryId' ).notNull(),
    leagueClassId: text( 'leagueClassId' ).notNull(),
    leagueSystemId: text( 'leagueSystemId' ).notNull(),
    leagueType: text( 'leagueType' ).notNull(),
    name: text( 'name' ).notNull(),
    shortName: text( 'shortName' ).notNull(),
    sortKey: text( 'sortKey' ).notNull(),
    season: text( 'season' ).notNull(),
    seasonId: integer( 'seasonId' ).notNull(), //.references( () => seasons.id ),
    fieldSize: text( 'fieldSize' ),
    gameOperationId: integer( 'gameOperationId' ).notNull(), //.references( () => gameOperations.id ),
    hasPreround: boolean( 'hasPreround' ).notNull(),
    isFemale: boolean( 'isFemale' ).notNull(),
    isLegacyLeague: boolean( 'isLegacyLeague' ).notNull(),
    leagueModus: text( 'leagueModus' ),
    overtimeLength: text( 'overtimeLength' ),
    periodLength: text( 'periodLength' ),
    periods: text( 'periods' ),
    tableModus: text( 'tableModus' ).notNull(),
} )

export const penalties = Table( 'penalties', {
    id: integer( 'id' ).primaryKey(),
    eventId: integer( 'eventId' ).notNull(), //.references( () => events.id ),
    gameId: integer( 'gameId' ).notNull(), //.references( () => games.id ),
    playerId: integer( 'playerId' ).notNull(), //.references( () => players.id ),
    teamId: integer( 'teamId' ).notNull(), //.references( () => teams.id ),
    penaltyReason: integer( 'penaltyReason' ).notNull(),
    penaltyType: text( 'penaltyType' ).notNull(),
} )

export const players = Table( 'players', {
    id: integer( 'id' ).primaryKey(),
    firstName: text( 'firstName' ).notNull(),
    lastName: text( 'lastName' ).notNull(),
} )

export const referees = Table( 'referees', {
    id: integer( 'id' ).primaryKey(),
    firstName: text( 'firstName' ).notNull(),
    lastName: text( 'lastName' ).notNull(),
    licenseId: integer( 'licenseId' ).notNull(),
} )

export const seasons = Table( 'seasons', {
    id: integer( 'id' ).primaryKey(),
    seasonId: integer( 'seasonId' ).notNull(),
    name: text( 'name' ).notNull(),
    isCurrent: boolean( 'isCurrent' ).notNull(),
} )

export const teams = Table( 'teams', {
    id: integer( 'id' ).primaryKey(),
    name: text( 'name' ).notNull(),
    logo: text( 'logo' ).notNull(),
} )



export type SelectArena = InferSelectModel<typeof arenas>
export type InsertArena = InferInsertModel<typeof arenas>
export type Arena = SelectArena

export type SelectEvent = InferSelectModel<typeof events>
export type InsertEvent = InferInsertModel<typeof events>
export type Event = SelectEvent

export type SelectGameOperation = InferSelectModel<typeof gameOperations>
export type InsertGameOperation = InferInsertModel<typeof gameOperations>
export type GameOperation = SelectGameOperation

export type SelectGame = InferSelectModel<typeof games>
export type InsertGame = InferInsertModel<typeof games>
export type Game = SelectGame

export type SelectGoal = InferSelectModel<typeof goals>
export type InsertGoal = InferInsertModel<typeof goals>
export type Goal = SelectGoal

export type SelectLeague = InferSelectModel<typeof leagues>
export type InsertLeague = InferInsertModel<typeof leagues>
export type League = SelectLeague

export type SelectPenalty = InferSelectModel<typeof penalties>
export type InsertPenalty = InferInsertModel<typeof penalties>
export type Penalty = SelectPenalty

export type SelectPlayer = InferSelectModel<typeof players>
export type InsertPlayer = InferInsertModel<typeof players>
export type Player = SelectPlayer

export type SelectReferee = InferSelectModel<typeof referees>
export type InsertReferee = InferInsertModel<typeof referees>
export type Referee = SelectReferee

export type SelectSeason = InferSelectModel<typeof seasons>
export type InsertSeason = InferInsertModel<typeof seasons>
export type Season = SelectSeason

export type SelectTeam = InferSelectModel<typeof teams>
export type InsertTeam = InferInsertModel<typeof teams>
export type Team = SelectTeam







export const selectArenaSchema = createSelectSchema( arenas )
export const insertArenaSchema = createInsertSchema( arenas )

export const selectEventSchema = createSelectSchema( events )
export const insertEventSchema = createInsertSchema( events )

export const selectGameOperationSchema = createSelectSchema( gameOperations )
export const insertGameOperationSchema = createInsertSchema( gameOperations )

export const selectGameSchema = createSelectSchema( games )
export const insertGameSchema = createInsertSchema( games )

export const selectGoalSchema = createSelectSchema( goals )
export const insertGoalSchema = createInsertSchema( goals )

export const selectLeagueSchema = createSelectSchema( leagues )
export const insertLeagueSchema = createInsertSchema( leagues )

export const selectPenaltySchema = createSelectSchema( penalties )
export const insertPenaltySchema = createInsertSchema( penalties )

export const selectPlayerSchema = createSelectSchema( players )
export const insertPlayerSchema = createInsertSchema( players )

export const selectRefereeSchema = createSelectSchema( referees )
export const insertRefereeSchema = createInsertSchema( referees )

export const selectSeasonSchema = createSelectSchema( seasons )
export const insertSeasonSchema = createInsertSchema( seasons )

export const selectTeamSchema = createSelectSchema( teams )
export const insertTeamSchema = createInsertSchema( teams )