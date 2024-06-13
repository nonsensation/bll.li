import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray, or } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { db, fetchFromMyDb, qb } from '$mysql/db'
import { QueryBuilder, alias, type MySqlSelectBase, type MySqlSelectQueryBuilderBase } from 'drizzle-orm/mysql-core'
import { SocketAddress } from 'net'
import type { PageServerLoadEvent } from './$types'
import { groupBy } from '$lib/utils'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent
    const teamId = Number( url.searchParams.get( 'id' ) ?? -1 )

    let query = qb
        .select( {
            TeamName: sql<string>`${ schema.teams.name }`.as( 'TeamName' ),
            LogoUrl: sql<string>`${ schema.teams.logoUrl }`.as( 'LogoUrl' ),
            ClubId: sql<number>`${ schema.teams.clubId }`.as( 'ClubId' ),
            ClubIds: sql<string>`${ schema.teams.syndicateClubIds }`.as( 'ClubIds' ),
            LeagueId: sql<number>`${ schema.leagues.id }`.as( 'LeagueId' ),
            LeagueName: sql<string>`${ schema.leagues.name }`.as( 'LeagueName' ),
            // LeagueType: sql<string>`${ schema.leagues.leagueType }`.as( 'LeagueType' ), // TODO: do not display cup-tables
            SeasonName: sql<string>`${ schema.seasons.name }`.as( 'SeasonName' ),
        } )
        .from( schema.teams )
        .leftJoin( schema.leagueTableTeams, eq( schema.leagueTableTeams.teamId, schema.teams.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueTableTeams.leagueId ) )
        .leftJoin( schema.seasons, eq( schema.seasons.id, schema.leagues.seasonId ) )
        .groupBy( schema.leagues.id )
        .where( eq( schema.teams.id, teamId ) )
        .$dynamic()

    const teamResult = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const teamData = ( teamResult as unknown as typeof teamResult._.result )[ 0 ]

    let clubIds = JSON.parse( teamData.ClubIds ) as number[]

    if( clubIds.length <= 0 ) clubIds = [ teamData.ClubId ]

    return {
        team: teamData,
        clubs: await getClubs( serverLoadEvent, clubIds ),
        leagueTable: teamData.LeagueName.includes( 'Pokal' )
            ? []
            : await getLeagueTable( serverLoadEvent, teamData.LeagueId ),
        scorer: await getScorer( serverLoadEvent, teamData.LeagueId, teamId ),
        goals: await getGoals( serverLoadEvent, teamData.LeagueId, teamId ),
    }
}

async function getClubs( serverLoadEvent: PageServerLoadEvent, clubIds: number[] )
{
    let query = qb
        .select( {
            Id: sql`${ schema.clubs.id }`.as( 'Id' ),
            Name: sql`${ schema.clubs.name }`.as( 'Name' ),
            LogoUrl: sql`${ schema.clubs.logoUrl }`.as( 'LogoUrl' ),
        } )
        .from( schema.clubs )
        .where( inArray( schema.clubs.id, clubIds ) )
        .$dynamic()

    // console.log(query.toSQL().sql)

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const d = data as unknown as typeof data._.result

    return d ?? []
}

async function getLeagueTable( serverLoadEvent: PageServerLoadEvent, leagueId: number )
{
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

    // console.log(query.toSQL().sql)

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}

async function getScorer( serverLoadEvent: PageServerLoadEvent, leagueId: number, teamId: number )
{
    let query = qb
        .select( {
            PlayerId: sql<string>`${ schema.players.id }`.as( 'PlayerId' ),
            FirstName: sql<string>`${ schema.players.firstName }`.as( 'FirstName' ),
            LastName: sql<string>`${ schema.players.lastName }`.as( 'LastName' ),
            Position: sql<number>`${ schema.leagueScorers.position }`.as( 'Position' ),
            Goals: sql<number>`${ schema.leagueScorers.goals }`.as( 'Goals' ),
            Assists: sql<number>`${ schema.leagueScorers.assists }`.as( 'Assists' ),
            Games: sql<number>`${ schema.leagueScorers.games }`.as( 'Games' ),
            OrderKey: sql<string>`${ schema.leagueScorers.orderKey }`.as( 'OrderKey' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .where( and( eq( schema.leagueScorers.leagueId, leagueId ), eq( schema.leagueScorers.teamId, teamId ) ) )
        .orderBy( asc( schema.leagueScorers.orderKey ) )
        .$dynamic()

    // console.log(query.toSQL().sql)

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}

async function getGoals( serverLoadEvent: PageServerLoadEvent, leagueId: number, teamId: number )
{
    let scored_query = qb
        .select( {
            Time: sql<string>`${ schema.goals.time }`.as( 'Time' ),
            Period: sql<string>`${ schema.goals.period }`.as( 'Period' ),
            GoalType: sql<string>`${ schema.goals.goalType }`.as( 'GoalType' ),
            Id: sql<number>`${ schema.goals.id }`.as( 'Id' ),
        } )
        .from( schema.goals )
        .leftJoin( schema.games, eq( schema.goals.gameId, schema.games.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.games.leagueId ) )
        .where( and( eq( schema.goals.scoringTeamId, teamId ) , eq( schema.games.leagueId, leagueId ) ) )
        .orderBy( asc( schema.goals.period ) , asc( schema.goals.time ) )
        .$dynamic()

    let recieved_query = qb
        .select( {
            Time: sql<string>`${ schema.goals.time }`.as( 'Time' ),
            Period: sql<string>`${ schema.goals.period }`.as( 'Period' ),
            GoalType: sql<string>`${ schema.goals.goalType }`.as( 'GoalType' ),
            Id: sql<number>`${ schema.goals.id }`.as( 'Id' ),
        } )
        .from( schema.goals )
        .leftJoin( schema.games, eq( schema.goals.gameId, schema.games.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.games.leagueId ) )
        .where( and( eq( schema.goals.oponentTeamId, teamId ) , eq( schema.games.leagueId, leagueId ) ) )
        .orderBy( asc( schema.goals.period ) , asc( schema.goals.time ) )
        .$dynamic()

    // console.log(scored_query.toSQL().sql)
    // console.log(teamId)
    // console.log(leagueId)

    const scored_data = await fetchFromMyDb( scored_query, serverLoadEvent.fetch )
    const recieved_data = await fetchFromMyDb( recieved_query, serverLoadEvent.fetch )

    return {
        goalsScored: scored_data as unknown as typeof scored_data._.result ,
        goalsRecieved: recieved_data as unknown as typeof recieved_data._.result ,
    }
}
