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
    const id = Number( url.searchParams.get( 'id' ) ?? -1 )

    return {
        seasons: getAllSeasons( serverLoadEvent, id ),
    }
}

async function getAllSeasons( serverLoadEvent: PageServerLoadEvent, playerId: number )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            SeasonId: sql`${ schema.seasons.id }`.as( 'SeasonId' ),
            SeasonName: sql`${ schema.seasons.name }`.as( 'SeasonName' ),
            TeamName: sql`${ schema.teams.name }`.as( 'TeamName' ),
            TeamId: sql`${ schema.teams.id }`.as( 'TeamId' ),
            LeagueName: sql`${ schema.leagues.name }`.as( 'LeagueName' ),
            LeagueId: sql`${ schema.leagues.id }`.as( 'LeagueId' ),
            ClubName: sql`${ schema.clubs.name }`.as( 'ClubName' ),
            ClubId: sql`${ schema.clubs.id }`.as( 'ClubId' ),
            ClubIds: sql`${ schema.teams.syndicateClubIds }`.as( 'ClubIds' ),
            Goals: sql`${ schema.leagueScorers.goals }`.as( 'Goals' ),
            Assists: sql`${ schema.leagueScorers.assists }`.as( 'Assists' ),
            Rank: sql`${ schema.leagueScorers.position }`.as( 'Rank' ),
            Games: sql`${ schema.leagueScorers.games }`.as( 'Games' ),
            ScorerId: sql`${ schema.leagueScorers.id }`.as( 'ScorerId' ),
        } )
        .from( schema.leagueScorers )
        .where( eq( schema.leagueScorers.playerId, playerId ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .leftJoin( schema.seasons, eq( schema.leagues.seasonId, schema.seasons.id ) )
        .leftJoin( schema.teams, eq( schema.leagueScorers.teamId, schema.teams.id ) )
        .leftJoin( schema.clubs, eq( schema.teams.clubId, schema.clubs.id ) ) // TODO: syndicate
        .groupBy( schema.leagues.seasonId, schema.teams.id, schema.leagueScorers.id )
        .orderBy( desc( schema.seasons.id ), desc( schema.leagueScorers.games ) )
        .$dynamic()

    const data = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const d = data as unknown as typeof data._.result

    return d ?? []
}
