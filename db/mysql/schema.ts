import { text, int, boolean,json, mysqlTable } from 'drizzle-orm/mysql-core'
import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

const Table = mysqlTable
const integer = int

export const fileStates = Table('FileState', {
  id: integer('Id').primaryKey(),
  fileName: text('FileName').notNull(),
});

export const seasons = Table('Season', {
  id: integer('Id').primaryKey(),
  name: text('Name').notNull(),
  isCurrent: boolean('IsCurrent').notNull(),
});

export const gameOperations = Table('GameOperation', {
  id: integer('Id').primaryKey(),
  name: text('Name').notNull(),
  shortName: text('ShortName').notNull(),
});

export const games = Table('Game', {
  id: integer('Id').primaryKey(),
  leagueId: integer('LeagueId').notNull(),
  arenaId: integer('ArenaId').notNull(),
  homeTeamId: integer('HomeTeamId').notNull(),
  guestTeamId: integer('GuestTeamId').notNull(),
  date: text('Date').notNull(),
  gameDay: integer('GameDay').notNull(),
  gameNumber: text('GameNumber').notNull(),
  startTime: text('StartTime').notNull(),
  audience: integer('Audience').notNull(),
  homeGoals: integer('HomeGoals').notNull(),
  guestGoals: integer('GuestGoals').notNull(),
  nominatedReferees: text('NominatedReferees').notNull(),
  refereeIds: json('RefereeIds').notNull(),
  isForfait: boolean('IsForfait').notNull(),
  isOverTime: boolean('IsOverTime').notNull(),
  isPenaltyShootout: boolean('IsPenaltyShootout').notNull(),
});

export const arenas = Table('Arena', {
  id: integer('Id').primaryKey(),
  capacity: integer('Capacity').notNull(),
  name: text('Name').notNull(),
  city: text('City').notNull(),
  postCode: text('PostCode').notNull(),
  street: text('Street').notNull(),
  houseNumber: text('HouseNumber').notNull(),
  publicTransportNote: text('PublicTransportNote').notNull(),
  travelNote: text('TravelNote').notNull(),
  comment: text('Comment').notNull(),
  isDisabled: boolean('IsDisabled').notNull(),
});

export const clubs = Table('Club', {
  id: integer('Id').primaryKey(),
  name: text('Name').notNull(),
  longName: text('LongName').notNull(),
  shortName: text('ShortName').notNull(),
  state: text('State').notNull(),
  logoUrl: text('LogoUrl').notNull(),
});

export const teams = Table('Team', {
  id: integer('Id').primaryKey(),
  clubId: integer('ClubId').notNull(),
  name: text('Name').notNull(),
  shortName: text('ShortName').notNull(),
  logoUrl: text('LogoUrl').notNull(),
  syndicateClubIds: json('SyndicateClubIds').notNull(),
});

export const gameEvents = Table('GameEvent', {
  id: integer('Id').primaryKey(),
  eventType: text('EventType').notNull(),
  eventIndex: integer('EventIndex').notNull(),
  teamId: integer('TeamId').notNull(),
  gameId: integer('GameId').notNull(),
  period: integer('Period').notNull(),
  time: text('Time').notNull(),
});

export const gameStats = Table('GameStat', {
  id: integer('Id').primaryKey(),
  key: text('_Key').notNull(),
  statType: text('StatType').notNull(),
  teamId: integer('TeamId'),
  eventId: integer('EventId'),
  gameId: integer('GameId').notNull(),
  foreignId: integer('ForeignId').notNull(),
});

export const goals = Table('Goal', {
  id: integer('Id').primaryKey(),
  eventId: integer('EventId').notNull(),
  scoringTeamId: integer('ScoringTeamId').notNull(),
  oponentTeamId: integer('OponentTeamId').notNull(),
  gameId: integer('GameId').notNull(),
  period: integer('Period').notNull(),
  time: text('Time').notNull(),
  playerId: integer('PlayerId'),
  assistPlayerId: integer('AssistPlayerId'),
  goalType: text('GoalType').notNull(),
});

export const penalties = Table('Penalty', {
  id: integer('Id').primaryKey(),
  eventId: integer('EventId').notNull(),
  teamId: integer('TeamId').notNull(),
  gameId: integer('GameId').notNull(),
  playerId: integer('PlayerId').notNull(),
  penaltyCode: integer('PenaltyCode').notNull(),
  penaltyType: text('PenaltyType').notNull(),
});

export const referees = Table('Referee', {
  id: integer('Id').primaryKey(),
  licenseId: integer('LicenseId').notNull(),
  firstName: text('FirstName').notNull(),
  lastName: text('LastName').notNull(),
});

export const players = Table('Player', {
  id: integer('Id').primaryKey(),
  firstName: text('FirstName').notNull(),
  lastName: text('LastName').notNull(),
});

export const leagueTableTeams = Table('LeagueTableTeam', {
  id: integer('Id').primaryKey(),
  orderKey: integer('OrderKey').notNull(),
  position: integer('Position').notNull(),
  teamId: integer('TeamId').notNull(),
  leagueId: integer('LeagueId').notNull(),
  goalsScored: integer('GoalsScored').notNull(),
  goalsReceived: integer('GoalsReceived').notNull(),
  gamesWon: integer('GamesWon').notNull(),
  gamesLost: integer('GamesLost').notNull(),
  gamesDraw: integer('GamesDraw').notNull(),
  gamesWonOt: integer('GamesWonOt').notNull(),
  gamesLostOt: integer('GamesLostOt').notNull(),
  pointsCorrection: integer('PointsCorrection').notNull(),
  points: integer('Points').notNull(),
});

export const leagueScorers = Table('LeagueScorer', {
  id: integer('Id').primaryKey(),
  playerId: integer('PlayerId').notNull(),
  teamId: integer('TeamId').notNull(),
  leagueId: integer('LeagueId').notNull(),
  orderKey: integer('OrderKey').notNull(),
  position: integer('Position').notNull(),
  games: integer('Games').notNull(),
  goals: integer('Goals').notNull(),
  assists: integer('Assists').notNull(),
  penalty2: integer('Penalty2').notNull(),
  penalty5: integer('Penalty5').notNull(),
  penalty2and2: integer('Penalty2and2').notNull(),
  penalty10: integer('Penalty10').notNull(),
  penaltyMs1: integer('PenaltyMs1').notNull(),
  penaltyMs2: integer('PenaltyMs2').notNull(),
  penaltyMs3: integer('PenaltyMs3').notNull(),
  penaltyMsFull: integer('PenaltyMsFull').notNull(),
  penaltyMsTech: integer('PenaltyMsTech').notNull(),
});

export const leagues = Table('League', {
  id: integer('Id').primaryKey(),
  gameOperationId: integer('GameOperationId').notNull(),
  seasonId: integer('SeasonId').notNull(),
  name: text('Name').notNull(),
  shortName: text('ShortName').notNull(),
  isFemale: boolean('IsFemale').notNull(),
  isCurrent: boolean('IsCurrent').notNull(),
  isJunior: boolean('IsJunior').notNull(),
  orderKey: text('OrderKey').notNull(),
  fieldSize: text('FieldSize').notNull(),
  leagueType: text('LeagueType').notNull(),
});


export type SelectGameStats = InferSelectModel<typeof gameStats>
export type InsertGameStats = InferInsertModel<typeof gameStats>
export type GameStats = SelectGameStats

export type SelectArena = InferSelectModel<typeof arenas>
export type InsertArena = InferInsertModel<typeof arenas>
export type Arena = SelectArena

export type SelectEvent = InferSelectModel<typeof gameEvents>
export type InsertEvent = InferInsertModel<typeof gameEvents>
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

export const selectGameStatsSchema = createSelectSchema( gameStats )
export const insertGameStatsSchema = createInsertSchema( gameStats )

export const selectArenaSchema = createSelectSchema( arenas )
export const insertArenaSchema = createInsertSchema( arenas )

export const selectEventSchema = createSelectSchema( gameEvents )
export const insertEventSchema = createInsertSchema( gameEvents )

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
