import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '$mysql/schema'
import { db, replaceQuestionMarks } from '$mysql/db'
import { and, asc, desc, eq, ne, inArray, isNotNull, like, gt, notLike, count } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { MySqlDialect, QueryBuilder, alias } from 'drizzle-orm/mysql-core'
import { SQL } from 'drizzle-orm'
import { MySqlColumn, type MySqlSelect } from 'drizzle-orm/mysql-core'
import { querySql } from '$mysql/db'
import { setTimeout } from 'timers/promises'

const mysqlDialect = new MySqlDialect()

export async function load( { fetch, url } )
{
    const search = url.searchParams.get( 'search' )
    const pageSize = Math.max( 0, Math.min( Number( url.searchParams.get( 'pageSize' ) ) || 100, 300 ) )
    const offset = Number( url.searchParams.get( 'skip' ) ) || 0

    return {
        scorers: getScorers( pageSize, offset, fetch ),
        totalScorers: getTotalScorers( fetch ),
    }
}

async function getTotalScorers( fetchFunc: any )
{
    const qb = new QueryBuilder()
    const totalScorersQuery = qb
        .select( {
            count: sql`COUNT(DISTINCT ${schema.leagueScorers.playerId})`.as( 'count' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        // SAME FILTER AS IN ORIG QUERY
        .where( and( eq( schema.leagues.isJunior, false ), notLike( schema.leagues.name, '%Kleinfeld%' ) ) )
    const totalScorersSql = replaceQuestionMarks( totalScorersQuery.toSQL() )
    const totalScorersData = await querySql( totalScorersSql, fetchFunc )
    const totalScorers = totalScorersData.data as typeof totalScorersQuery

    return ( totalScorers[ 0 ]?.count as number ) || 0
}

async function getScorers( pageSize: number = 100, skip: number = 0, fetchFunc: any )
{
    const qb = new QueryBuilder()

    const query = qb
        .select( {
            PlayerId: schema.players.id,
            FirstName: schema.players.firstName,
            LastName: schema.players.lastName,
            PlayerRank: sql`RANK() OVER ( ORDER BY
                COALESCE(SUM(${ schema.leagueScorers.goals }), 0) DESC,
                COALESCE(SUM(${ schema.leagueScorers.assists }), 0) DESC,
                COALESCE(SUM(${ schema.leagueScorers.games }), 0) ASC
                )`.as( 'Rank' ),
            TotalGoals: sql`COALESCE(SUM(${ schema.leagueScorers.goals }), 0)`.as( 'TotalGoals' ),
            TotalAssists: sql`COALESCE(SUM(${ schema.leagueScorers.assists }), 0)`.as( 'TotalAssists' ),
            TotalGames: sql`COALESCE(SUM(${ schema.leagueScorers.games }), 0)`.as( 'TotalGames' ),
            TotalPenalty2: sql`COALESCE(SUM(${ schema.leagueScorers.penalty2 }), 0)`.as( 'TotalPenalty2' ),
            TotalPenalty2and2: sql`COALESCE(SUM(${ schema.leagueScorers.penalty2and2 }), 0)`.as( 'TotalPenalty2and2' ),
            TotalPenaltyMsTech: sql`COALESCE(SUM(${ schema.leagueScorers.penaltyMsTech }), 0)`.as( 'TotalPenaltyMsTech' ),
            TotalPenaltyMsFull: sql`COALESCE(SUM(${ schema.leagueScorers.penaltyMsFull }), 0)`.as( 'TotalPenaltyMsFull' ),
            TotalPenalty5: sql`COALESCE(SUM(${ schema.leagueScorers.penalty5 }), 0)`.as( 'TotalPenalty5' ),
            TotalPenalty10: sql`COALESCE(SUM(${ schema.leagueScorers.penalty10 }), 0)`.as( 'TotalPenalty10' ),
            TotalPenaltyMs1: sql`COALESCE(SUM(${ schema.leagueScorers.penaltyMs1 }), 0)`.as( 'TotalPenaltyMs1' ),
            TotalPenaltyMs2: sql`COALESCE(SUM(${ schema.leagueScorers.penaltyMs2 }), 0)`.as( 'TotalPenaltyMs2' ),
            TotalPenaltyMs3: sql`COALESCE(SUM(${ schema.leagueScorers.penaltyMs3 }), 0)`.as( 'TotalPenaltyMs3' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .where( and( eq( schema.leagues.isJunior, false ), notLike( schema.leagues.name, '%Kleinfeld%' ) ) )
        .groupBy( schema.players.id, schema.players.firstName, schema.players.lastName )
        .orderBy(
            sql`TotalGoals DESC`,
            sql`TotalAssists DESC`,
            sql`TotalGames ASC`
        )
        .limit( pageSize )
        .offset( Math.ceil( skip / pageSize ) * pageSize )

    const scorerQuerySql = replaceQuestionMarks( query.toSQL() )
    const scorerData = await querySql( scorerQuerySql, fetchFunc )
    const scorers = scorerData.data as typeof query

    return scorers ?? []
}
