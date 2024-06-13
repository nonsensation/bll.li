import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray, isNotNull, like, or } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { fetchFromMyDb, qb } from '$mysql/db'
import { QueryBuilder } from 'drizzle-orm/mysql-core'
import type { PageServerLoadEvent } from './$types'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent
    const clubId = Number( url.searchParams.get( 'id' ) ?? -1 )

    return {
        club: await getClub( serverLoadEvent, clubId ),
        teams: await getTeams( serverLoadEvent, clubId ),
        scorer: await getScorer( serverLoadEvent, clubId ),
    }
}

async function getClub( serverLoadEvent: PageServerLoadEvent, clubId: number )
{
    let query = qb
        .select( {
            Name: sql`${ schema.clubs.name }`.as( 'Name' ),
            LogoUrl: sql`${ schema.clubs.logoUrl }`.as( 'LogoUrl' ),
        } )
        .from( schema.clubs )
        .where( eq( schema.clubs.id, clubId ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return ( data as unknown as typeof data._.result )[ 0 ]
}

async function getTeams( serverLoadEvent: PageServerLoadEvent, clubId: number )
{
    let query = qb
        .select( {
            Id: sql<number>`${ schema.teams.id }`.as( 'Id' ),
            Name: sql<string>`${ schema.teams.name }`.as( 'Name' ),
            LogoUrl: sql<string>`${ schema.teams.logoUrl }`.as( 'LogoUrl' ),
            LeagueId: sql<number>`${ schema.leagues.id }`.as( 'LeagueId' ),
            LeagueName: sql<string>`${ schema.leagues.name }`.as( 'LeagueName' ),
            IsFemale: sql<boolean>`${ schema.leagues.isFemale }`.as( 'IsFemale' ),
            IsJunior: sql<boolean>`${ schema.leagues.isJunior }`.as( 'IsJunior' ),
            FieldSize: sql<string>`${ schema.leagues.fieldSize }`.as( 'FieldSize' ),
            LeagueType: sql<string>`${ schema.leagues.leagueType }`.as( 'LeagueType' ),
            SeasonName: sql<string>`${ schema.seasons.name }`.as( 'SeasonName' ),
        } )
        .from( schema.teams )
        .leftJoin( schema.leagueTableTeams, eq( schema.leagueTableTeams.teamId, schema.teams.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueTableTeams.leagueId ) )
        .leftJoin( schema.seasons, eq( schema.seasons.id, schema.leagues.seasonId ) )
        .leftJoin( schema.gameOperations, eq( schema.gameOperations.id, schema.leagues.gameOperationId ) )
        .where(
            and(
                or(
                    eq( schema.teams.clubId, clubId ),
                    sql`JSON_CONTAINS( ${ schema.teams.syndicateClubIds } , '${ clubId }', '$' )`
                ),
                // isNotNull( schema.leagueTableTeams.leagueId )
            )
        )
        .groupBy(
            schema.seasons.id,
            schema.gameOperations.id,
            schema.leagueTableTeams.id,
            schema.leagues.id,
            schema.leagues.leagueType,
            schema.teams.id
        )
        .orderBy(
            desc( schema.seasons.id ), 
            asc( schema.gameOperations.id ),
            asc( schema.leagues.orderKey )
            )
        .$dynamic()

    // console.log( query.toSQL().sql )

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )
    return data as unknown as typeof data._.result
}

async function getScorer( serverLoadEvent: PageServerLoadEvent, clubId: number )
{
    let query = qb
        .select( {
            PlayerId: sql`${ schema.players.id }`.as( 'PlayerId' ),
            FirstName: sql`${ schema.players.firstName }`.as( 'FirstName' ),
            LastName: sql`${ schema.players.lastName }`.as( 'LastName' ),
            Games: sql`SUM( ${ schema.leagueScorers.games } )`.as( 'Games' ),
            Goals: sql`SUM( ${ schema.leagueScorers.goals } )`.as( 'Goals' ),
            Assists: sql`SUM( ${ schema.leagueScorers.assists } )`.as( 'Assists' ),
            Seasons: sql`COUNT( DISTINCT ${ schema.seasons.id } )`.as( 'Seasons' ),
        } )
        .from( schema.teams )
        .leftJoin( schema.leagueScorers, eq( schema.leagueScorers.teamId, schema.teams.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .leftJoin( schema.seasons, eq( schema.seasons.id, schema.leagues.seasonId ) )
        // .where( and( eq( schema.teams.clubId, clubId ) , eq( schema.leagues.isJunior , false ),eq( schema.leagues.fieldSize , "GF" ) ) )
        .where(
            or(
                eq( schema.teams.clubId, clubId ),
                sql`JSON_CONTAINS( ${ schema.teams.syndicateClubIds } , '${ clubId }', '$' )`
            )
        )
        .groupBy( schema.players.id )
        .orderBy(
            desc( sql`SUM( ${ schema.leagueScorers.games }`.as( 'Games' ) ),
            desc( sql`COUNT( DISTINCT ${ schema.seasons.id }`.as( 'Seasons' ) ),
            desc( sql`SUM( ${ schema.leagueScorers.goals }`.as( 'Goals' ) ),
            desc( sql`SUM( ${ schema.leagueScorers.assists }`.as( 'Assists' ) )
        )
        .$dynamic()

    // console.log( query.toSQL().sql )

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )
    return data as unknown as typeof data._.result
}
