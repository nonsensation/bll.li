import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { db, fetchFromMyDb, qb } from '$mysql/db'
import { QueryBuilder, alias, type MySqlSelectBase, type MySqlSelectQueryBuilderBase } from 'drizzle-orm/mysql-core'
import { SocketAddress } from 'net'
import type { PageServerLoadEvent } from './$types'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent
    const playerId = Number( url.searchParams.get( 'id' ) ?? -1 )

    const qb = new QueryBuilder()
    let query = qb
        .select( {
            FirstName: sql`${ schema.players.firstName }`.as( 'FirstName' ),
            LastName: sql`${ schema.players.lastName }`.as( 'LastName' ),
        } )
        .from( schema.players )
        .where( eq( schema.players.id, playerId ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const player = (data as unknown as typeof data._.result)[0]

    return {
        player,
        seasons: getAllSeasons( serverLoadEvent, playerId ),
        goals: await getGoals( serverLoadEvent, playerId ) ,
    }
}

async function getAllSeasons( serverLoadEvent: PageServerLoadEvent, playerId: number )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            SeasonId: sql<number>`${ schema.seasons.id }`.as( 'SeasonId' ),
            SeasonName: sql`${ schema.seasons.name }`.as( 'SeasonName' ),
            TeamName: sql`${ schema.teams.name }`.as( 'TeamName' ),
            TeamId: sql<number>`${ schema.teams.id }`.as( 'TeamId' ),
            LeagueName: sql`${ schema.leagues.name }`.as( 'LeagueName' ),
            LeagueId: sql<number>`${ schema.leagues.id }`.as( 'LeagueId' ),
            ClubName: sql`${ schema.clubs.name }`.as( 'ClubName' ),
            TeamLogoUrl: sql`${ schema.teams.logoUrl }`.as( 'TeamLogoUrl' ),
            ClubId: sql<number>`${ schema.clubs.id }`.as( 'ClubId' ),
            ClubIds: sql`${ schema.teams.syndicateClubIds }`.as( 'ClubIds' ),
            Goals: sql<number>`${ schema.leagueScorers.goals }`.as( 'Goals' ),
            Assists: sql<number>`${ schema.leagueScorers.assists }`.as( 'Assists' ),
            Rank: sql<number>`${ schema.leagueScorers.position }`.as( 'Rank' ),
            Games: sql<number>`${ schema.leagueScorers.games }`.as( 'Games' ),
            // ScorerId: sql<number>`${ schema.leagueScorers.id }`.as( 'ScorerId' ),
        } )
        .from( schema.leagueScorers )
        .where( eq( schema.leagueScorers.playerId, playerId ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .leftJoin( schema.seasons, eq( schema.leagues.seasonId, schema.seasons.id ) )
        .leftJoin( schema.teams, eq( schema.leagueScorers.teamId, schema.teams.id ) )
        .leftJoin( schema.clubs, eq( schema.teams.clubId, schema.clubs.id ) ) // TODO: syndicate
        .groupBy( schema.leagues.seasonId, schema.teams.id , schema.leagueScorers.playerId , schema.leagueScorers.leagueId  )
        .orderBy( desc( schema.seasons.id ), desc( schema.leagueScorers.games ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const d = data as unknown as typeof data._.result

    return d ?? []
}

async function getGoals( serverLoadEvent: PageServerLoadEvent, playerId: number )
{
    let scored_query = qb
        .select( {
            Time: sql<string>`${ schema.goals.time }`.as( 'Time' ),
            Period: sql<string>`${ schema.goals.period }`.as( 'Period' ),
            GoalType: sql<string>`${ schema.goals.goalType }`.as( 'GoalType' ),
            // Id: sql<number>`${ schema.goals.id }`.as( 'Id' ),
        } )
        .from( schema.goals )
        .where( eq( schema.goals.scoringPlayerId, playerId ) )
        .orderBy( asc( schema.goals.period ), asc( schema.goals.time ) )
        .$dynamic()

    let recieved_query = qb
        .select( {
            Time: sql<string>`${ schema.goals.time }`.as( 'Time' ),
            Period: sql<string>`${ schema.goals.period }`.as( 'Period' ),
            GoalType: sql<string>`${ schema.goals.goalType }`.as( 'GoalType' ),
            // Id: sql<number>`${ schema.goals.id }`.as( 'Id' ),
        } )
        .from( schema.goals )
        .where( eq( schema.goals.assistPlayerId, playerId ) )
        .orderBy( asc( schema.goals.period ), asc( schema.goals.time ) )
        .$dynamic()

    // console.log(scored_query.toSQL().sql)
    // console.log(teamId)
    // console.log(leagueId)

    const scored_data = await fetchFromMyDb( scored_query, serverLoadEvent.fetch )
    const recieved_data = await fetchFromMyDb( recieved_query, serverLoadEvent.fetch )

    return {
        goalsScored: ( scored_data as unknown as typeof scored_data._.result ) ?? [],
        goalsRecieved: ( recieved_data as unknown as typeof recieved_data._.result ) ?? [],
    };
}