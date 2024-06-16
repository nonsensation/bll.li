import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray, like, or } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { db, fetchFromMyDb, qb } from '$mysql/db'
import { QueryBuilder, alias } from 'drizzle-orm/mysql-core'
import type { PageServerLoadEvent } from './$types'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent
    const leagueId = Number( url.searchParams.get( 'id' ) ?? -1 )

    const qb = new QueryBuilder()
    let query = qb
        .select( {
            Name: sql<string>`${ schema.leagues.name }`.as( 'Name' ),
            SeasonName: sql<string>`${ schema.seasons.name }`.as( 'SeasonName' ),
            LeagueType: sql<string>`${ schema.leagues.leagueType }`.as( 'LeagueType' ),
        } )
        .from( schema.leagues )
        .leftJoin( schema.seasons, eq( schema.seasons.id, schema.leagues.seasonId ) )
        .where( eq( schema.leagues.id, leagueId ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    const league = ( data as unknown as typeof data._.result )[ 0 ]
    const isLeague = league.Name.includes( 'League' )
    return {
        leagueName: league.Name,
        seasonName: league.SeasonName,
        leagueType: league.LeagueType,
        leagueTable: await getLeagueTable( serverLoadEvent, leagueId ),
        leagueScorer: await getLeagueScorer( serverLoadEvent, leagueId ),
        games: await getGames( serverLoadEvent, leagueId, isLeague ),
    }
}

async function getLeagueTable( serverLoadEvent: PageServerLoadEvent, leagueId: number )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            Id: sql<string>`${ schema.leagueTableTeams.teamId }`.as( 'Id' ),
            Name: sql<string>`${ schema.teams.name }`.as( 'Name' ),
            Position: sql<number>`${ schema.leagueTableTeams.position }`.as( 'Position' ),
            GamesDraw: sql<number>`${ schema.leagueTableTeams.gamesDraw }`.as( 'GamesDraw' ),
            GamesLost: sql<number>`${ schema.leagueTableTeams.gamesLost }`.as( 'GamesLost' ),
            GamesLostOt: sql<number>`${ schema.leagueTableTeams.gamesLostOt }`.as( 'GamesLostOt' ),
            GamesWon: sql<number>`${ schema.leagueTableTeams.gamesWon }`.as( 'GamesWon' ),
            GamesWonOt: sql<number>`${ schema.leagueTableTeams.gamesWonOt }`.as( 'GamesWonOt' ),
            Points: sql<number>`${ schema.leagueTableTeams.points }`.as( 'Points' ),
            PointsCorrection: sql<number>`${ schema.leagueTableTeams.pointsCorrection }`.as( 'PointsCorrection' ),
            GoalsScored: sql<number>`${ schema.leagueTableTeams.goalsScored }`.as( 'GoalsScored' ),
            GoalsReceived: sql<number>`${ schema.leagueTableTeams.goalsReceived }`.as( 'GoalsReceived' ),
            OrderKey: sql<string>`${ schema.leagueTableTeams.orderKey }`.as( 'OrderKey' ),
            LogoUrl: sql<string>`${ schema.teams.logoUrl }`.as( 'LogoUrl' ),
        } )
        .from( schema.leagueTableTeams )
        .leftJoin( schema.teams, eq( schema.teams.id, schema.leagueTableTeams.teamId ) )
        .where( eq( schema.leagueTableTeams.leagueId, leagueId ) )
        .orderBy( asc( schema.leagueTableTeams.orderKey ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}

async function getLeagueScorer( serverLoadEvent: PageServerLoadEvent, leagueId: number )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            TeamId: sql<number>`${ schema.leagueScorers.teamId }`.as( 'TeamId' ),
            TeamName: sql<string>`${ schema.teams.name }`.as( 'TeamName' ),
            PlayerId: sql<number>`${ schema.leagueScorers.playerId }`.as( 'PlayerId' ),
            FirstName: sql<string>`${ schema.players.firstName }`.as( 'FirstName' ),
            LastName: sql<string>`${ schema.players.lastName }`.as( 'LastName' ),
            Games: sql<number>`${ schema.leagueScorers.games }`.as( 'Games' ),
            Goals: sql<number>`${ schema.leagueScorers.goals }`.as( 'Goals' ),
            Assists: sql<number>`${ schema.leagueScorers.assists }`.as( 'Assists' ),
            Position: sql<number>`${ schema.leagueScorers.position }`.as( 'Position' ),
            LogoUrl: sql<string>`${ schema.teams.logoUrl }`.as( 'LogoUrl' ),
            OrderKey: sql<string>`${ schema.leagueScorers.orderKey }`.as( 'OrderKey' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .leftJoin( schema.teams, eq( schema.teams.id, schema.leagueScorers.teamId ) )
        .where( eq( schema.leagueScorers.leagueId, leagueId ) )
        .orderBy( asc( schema.leagueScorers.orderKey ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}

async function getGames( serverLoadEvent: PageServerLoadEvent, leagueId: number, isLeague: boolean = false )
{
    const qb = new QueryBuilder()
    const homeTeams = alias( schema.teams, 'homeTeams' )
    const guestTeams = alias( schema.teams, 'guestTeams' )
    let query = qb
        .select( {
            GameId: sql<string>`${ schema.games.id }`.as( 'GameId' ),
            Date: sql<string>`${ schema.games.date }`.as( 'Date' ),
            HomeGoals: sql<number>`${ schema.games.homeGoals }`.as( 'HomeGoals' ),
            GuestGoals: sql<number>`${ schema.games.guestGoals }`.as( 'GuestGoals' ),
            HomeTeamId: sql<number>`${ schema.games.homeTeamId }`.as( 'HomeTeamId' ),
            HomeTeamName: sql<number>`${ homeTeams.name }`.as( 'HomeTeamName' ),
            GuestTeamId: sql<number>`${ schema.games.guestTeamId }`.as( 'GuestTeamId' ),
            GuestTeamName: sql<number>`${ guestTeams.name }`.as( 'GuestTeamName' ),
            HomeTeamLogoUrl: sql<string>`${ homeTeams.logoUrl }`.as( 'HomeTeamLogoUrl' ),
            GuestTeamLogoUrl: sql<string>`${ guestTeams.logoUrl }`.as( 'GuestTeamLogoUrl' ),
            GameDay: sql<string>`${ schema.games.gameDay }`.as( 'GameDay' ),
        } )
        .from( schema.games )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.games.leagueId ) )
        .leftJoin( homeTeams, eq( homeTeams.id, schema.games.homeTeamId ) )
        .leftJoin( guestTeams, eq( guestTeams.id, schema.games.guestTeamId ) )
        .where( eq( schema.games.leagueId, leagueId ) )
        .groupBy( schema.games.gameDay, schema.games.gameNumber )
        .orderBy( asc( schema.games.gameDay ) )
        .$dynamic()

    console.log( 'leagueId: ' + leagueId )
    console.log( query.toSQL().sql )

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}
