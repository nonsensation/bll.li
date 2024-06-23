import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray, or } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { fetchFromMyDb, qb } from '$mysql/db'
import type { PageServerLoadEvent } from './$types'
import { SmData } from '$lib/sm/data'
import { Saisonmanager as SM } from 'floorball-saisonmanager';


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
            LeagueType: sql<string>`${ schema.leagues.leagueType }`.as( 'LeagueType' ), // TODO: do not display cup-tables
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
    const teamData = teamResult as unknown as typeof teamResult._.result

    return {
        teamId ,
        teams: teamData.map( async x =>
        {
            let clubIds = JSON.parse( x.ClubIds ) as number[]

            if( clubIds.length <= 0 ) clubIds = [ x.ClubId ]

            return {
                team: x,
                clubs: await getClubs( serverLoadEvent, clubIds ),
                goals: await getGoals( serverLoadEvent, x.LeagueId, teamId ),

                leagueType: x.LeagueType ,
                leagueTable: await SmData.getLeagueTeamTable( x.LeagueId ),
                leagueScorer: await SmData.getLeagueScorer( x.LeagueId ),
                leagueSchedule: await SmData.getLeagueSchedule( x.LeagueId ) ,
            }
        } ),
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

async function getGoals( serverLoadEvent: PageServerLoadEvent, leagueId: number, teamId: number )
{
    return {
        league: await getLeague( serverLoadEvent , leagueId ) ,
        goalsScored: await getGoalsColumn( schema.goals.scoringTeamId, serverLoadEvent, leagueId, teamId ),
        goalsRecieved: await getGoalsColumn( schema.goals.oponentTeamId, serverLoadEvent, leagueId, teamId ),
    };
}

async function getLeague( serverLoadEvent: PageServerLoadEvent, leagueId: number )
{
    let query = qb.select().from( schema.leagues ).where( eq( schema.leagues.id, leagueId ) ).$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}

async function getGoalsColumn( column: any , serverLoadEvent: PageServerLoadEvent, leagueId: number, teamId: number )
{
    let query = qb
        .select( {
            Time: sql<string>`${ schema.goals.time }`.as( 'Time' ),
            Period: sql<string>`${ schema.goals.period }`.as( 'Period' ),
            GoalType: sql<string>`${ schema.goals.goalType }`.as( 'GoalType' ),
            GameId: sql<number>`${ schema.goals.gameId }`.as( 'GameId' ),
            EventId: sql<number>`${ schema.goals.eventId }`.as( 'EventId' ),
        } )
        .from( schema.goals )
        .leftJoin( schema.games, eq( schema.goals.gameId, schema.games.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.games.leagueId ) )
        .where( and( eq( column , teamId ), eq( schema.games.leagueId, leagueId ) ) )
        .orderBy( asc( schema.goals.period ), asc( schema.goals.time ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}