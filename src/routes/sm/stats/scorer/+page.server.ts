import * as schema from '$mysql/schema'
import { replaceQuestionMarks } from '$mysql/db'
import { and, asc, desc, eq, ne, inArray, isNotNull, like, gt, notLike, count } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { QueryBuilder, type MySqlSelectQueryBuilder } from 'drizzle-orm/mysql-core'
import { querySql } from '$mysql/db'
import type { PageServerLoadEvent } from './$types'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    return {
        scorers: getScorers( serverLoadEvent ),
        totalScorers: getTotalScorers( serverLoadEvent ),
    }
}

async function getTotalScorers( serverLoadEvent: PageServerLoadEvent )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            count: sql`COUNT(DISTINCT ${ schema.leagueScorers.playerId })`.as( 'count' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .$dynamic()

    query = filter( query, serverLoadEvent )

    const totalScorersSql = replaceQuestionMarks( query.toSQL() )
    const totalScorersData = await querySql( totalScorersSql, serverLoadEvent.fetch )
    const totalScorers = totalScorersData as typeof query

    return ( totalScorers[ 0 ]?.count as number ) || 0
}

async function getScorers( serverLoadEvent: PageServerLoadEvent )
{
    const qb = new QueryBuilder()

    let leagueScorerQuery = qb
        .select()
        .from( schema.leagueScorers )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .$dynamic()
    leagueScorerQuery = filter( leagueScorerQuery, serverLoadEvent )

    let leagueScorerSubQuery = leagueScorerQuery.as('leagueScorerSubQuery')

    let query = qb
        .select( {
            PlayerId: sql`${schema.players.id}`.as( 'PlayerId' ),
            FirstName: sql`${schema.players.firstName}`.as( 'FirstName' ),
            LastName: sql`${schema.players.lastName}`.as( 'LastName' ),
            PlayerRank: sql`RANK() OVER ( ORDER BY
                COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.goals }), 0) DESC,
                COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.assists }), 0) DESC,
                COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.games }), 0) ASC
                )`.as( 'PlayerRank' ),
            TotalGoals: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.goals }), 0)`.as( 'TotalGoals' ),
            TotalAssists: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.assists }), 0)`.as( 'TotalAssists' ),
            TotalGames: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.games }), 0)`.as( 'TotalGames' ),
            TotalPenalty2: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penalty2 }), 0)`.as( 'TotalPenalty2' ),
            TotalPenalty2and2: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penalty2and2 }), 0)`.as( 'TotalPenalty2and2' ),
            TotalPenalty5: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penalty5 }), 0)`.as( 'TotalPenalty5' ),
            TotalPenalty10: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penalty10 }), 0)`.as( 'TotalPenalty10' ),
            TotalPenaltyMs: sql`COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penaltyMs1 }), 0) +
                    COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penaltyMs2 }), 0) +
                    COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penaltyMs3 }), 0) +
                    COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penaltyMsTech }), 0) +
                    COALESCE(SUM(${ leagueScorerSubQuery.LeagueScorer.penaltyMsFull }), 0)`.as( 'TotalPenaltyMs' ),
        } )
        .from( leagueScorerSubQuery )
        .leftJoin( schema.players, eq( schema.players.id, leagueScorerSubQuery.LeagueScorer.playerId ) )
        // .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        // .groupBy( schema.players.id, schema.players.firstName, schema.players.lastName )
        // .orderBy( sql`TotalGoals DESC`, sql`TotalAssists DESC`, sql`TotalGames ASC`, sql`TotalPenaltyMs ASC` )
        .$dynamic()
    // query = filter( query, serverLoadEvent )
    query = query.groupBy( schema.players.id, schema.players.firstName, schema.players.lastName )
        // .orderBy( sql`TotalGoals DESC`, sql`TotalAssists DESC`, sql`TotalGames ASC`, sql`TotalPenaltyMs ASC` )
    query = withPagination( query, serverLoadEvent )

    const scorerQuerySql = replaceQuestionMarks( query.toSQL() )

    console.log( scorerQuerySql );
    const scorerData = await querySql( scorerQuerySql, serverLoadEvent.fetch )
    const scorers = scorerData as typeof query

    return scorers ?? []
}

function filter<T extends MySqlSelectQueryBuilder>( qb: T, serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const enableJuniorLeagues = url.searchParams.get( 'junior' )
    const enableFieldSize = url.searchParams.get( 'fieldSize' )

    if( enableFieldSize != null )
    {
        // TODO: use .FieldSize column
        if( enableFieldSize == 'KF' )
            qb = qb.where( like( schema.leagues.name, 'Kleinfeld' ) )
        else if( enableFieldSize == 'GF' )
            qb = qb.where( notLike( schema.leagues.name, 'Kleinfeld' ) )
    }

    if( enableJuniorLeagues != null )
    {
        if( enableJuniorLeagues == '1' )
            qb = qb.where( eq( schema.leagues.isJunior, true ) )
        else if( enableJuniorLeagues == '0' )
            qb = qb.where( eq( schema.leagues.isJunior, false ) )
    }

    return qb
}

function withPagination<T extends MySqlSelectQueryBuilder>( qb: T, serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const pageSize = Math.max( 0, Math.min( Number( url.searchParams.get( 'pageSize' ) ) || 100, 300 ) )
    const skip = Number( url.searchParams.get( 'skip' ) ) || 0
    const offset = Math.ceil( skip / pageSize ) * pageSize

    return qb.limit( pageSize ).offset( offset )
}
