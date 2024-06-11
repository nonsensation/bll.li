import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray, like, or } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { db, fetchFromMyDb, qb } from '$mysql/db'
import { QueryBuilder, alias, type MySqlSelectBase, type MySqlSelectQueryBuilderBase } from 'drizzle-orm/mysql-core'
import { SocketAddress } from 'net'
import type { PageServerLoadEvent } from './$types'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent
    const id = Number( url.searchParams.get( 'id' ) ?? -1 )

    return {
        club: await getClub( serverLoadEvent, id ),
        teams: getTeams( serverLoadEvent, id ),
    }
}

async function getClub( serverLoadEvent: PageServerLoadEvent, clubId: number )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            Name: sql`${ schema.clubs.name }`.as( 'Name' ),
            LogoUrl: sql`${ schema.clubs.logoUrl }`.as( 'LogoUrl' ),
        } )
        .from( schema.clubs )
        .where( eq( schema.clubs.id, clubId ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return (data as unknown as typeof data._.result)[0]
}

async function getTeams( serverLoadEvent: PageServerLoadEvent, clubId: number )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            Id: sql`${ schema.teams.id }`.as( 'Id' ),
            Name: sql`${ schema.teams.name }`.as( 'Name' ),
            LeagueId: sql`${ schema.leagues.id }`.as( 'LeagueId' ),
            LeagueName: sql`${ schema.leagues.name }`.as( 'LeagueName' ),
            SeasonName: sql`${ schema.seasons.name }`.as( 'SeasonName' ),
        } )
        .from( schema.teams )
        .leftJoin( schema.leagueTableTeams, eq( schema.leagueTableTeams.teamId, schema.teams.id ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueTableTeams.leagueId ) )
        .leftJoin( schema.seasons, eq( schema.seasons.id, schema.leagues.seasonId ) )
        .leftJoin( schema.gameOperations, eq( schema.gameOperations.id, schema.leagues.gameOperationId ) )
        .where( or( eq( schema.teams.clubId, clubId ) , like( schema.teams.syndicateClubIds, `%${clubId}%` ) ) )
        .groupBy( schema.seasons.id , schema.gameOperations.id , schema.leagues.id , schema.teams.id )
        .orderBy( desc( schema.seasons.id ) , asc( schema.gameOperations.id ) , asc( schema.leagues.orderKey ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )

    return data as unknown as typeof data._.result
}
