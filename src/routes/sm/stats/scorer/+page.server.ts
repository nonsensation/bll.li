import type { PageServerLoad } from './$types'
// import { type QueryResult } from '@vercel/postgres'
// import { drizzle } from 'drizzle-orm/vercel-postgres'
import { drizzle } from 'drizzle-orm/mysql2'
import * as schema from '$mysql/schema'
// import * as schema from '$drizzle/schema'
import { db } from '$mysql/db'
// import { db } from '$drizzle/db'
import { fetchData } from '$lib/sm/data'
import { and, arrayContains, asc, desc, eq , ne , inArray, isNotNull, like, gt } from 'drizzle-orm'
import { setTimeout } from 'timers/promises'
import { parse } from 'csv-parse/sync'
import { any, z } from 'zod'
import { sql } from 'drizzle-orm'
import { MySqlDialect, QueryBuilder } from 'drizzle-orm/mysql-core'

import { SQL } from 'drizzle-orm'
// import { PgColumn, type PgSelect } from 'drizzle-orm/pg-core'
import { MySqlColumn, type MySqlSelect } from 'drizzle-orm/mysql-core'
import { querySql } from '$lib/db'

const mysqlDialect = new MySqlDialect()

function withPagination<T extends MySqlSelect>(
    qb: T,
    orderByColumn: MySqlColumn[] | SQL[] | SQL.Aliased[],
    page = 1,
    pageSize = 10
)
{
    return qb
        .orderBy( ...orderByColumn )
        .limit( pageSize )
        .offset( ( page - 1 ) * pageSize )
}

export async function load( { fetch, url } )
{
    const qb = db //new QueryBuilder()

    let search = url.searchParams.get( 'search' )
    let pageSize = Number( url.searchParams.get( 'pageSize' ) ) || 100
    const skip = Number( url.searchParams.get( 'skip' ) ) || 0

    pageSize = Math.max( 0, Math.min( pageSize, 1000 ) )

    async function getScorers( limit: number = 100, offset: number = 0 )
    {
        const goalsCountQuery = qb
            .select( {
                playerId: schema.goals.playerId,
                goalsCount: sql`COUNT(*)`.as( 'goalsCount' ),
            } )
            .from( schema.goals )
            .where( gt( schema.goals.playerId , 0 ) )
            .groupBy( schema.goals.playerId )
            .as( 'goalsCountSubquery' )

        const assistsCountQuery = qb
            .select( {
                assistId: schema.goals.assistId,
                assistsCount: sql`COUNT(*)`.as( 'assistsCount' ),
            } )
            .from( schema.goals )
            .where( gt( schema.goals.assistId , 0 ) )
            .groupBy( schema.goals.assistId )
            .as( 'assistsCountSubquery' )

        const penalties2CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty2Count: sql`COUNT(*)`.as( 'penalty2Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ), eq( schema.penalties.penaltyType, 'penalty_2' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties2CountQuery' )

        const penaltiesMs1CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMs1Count: sql`COUNT(*)`.as( 'penaltyMs1Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_ms1' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMs1CountQuery' )
        const penalties2and2CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty2and2Count: sql`COUNT(*)`.as( 'penalty2and2Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_2and2' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties2and2CountQuery' )
        const penaltiesMs2CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMs2Count: sql`COUNT(*)`.as( 'penaltyMs2Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_ms2' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMs2CountQuery' )
        const penaltiesMs3CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMs3Count: sql`COUNT(*)`.as( 'penaltyMs3Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_ms3' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMs3CountQuery' )
        const penaltiesMsTechCountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMsTechCount: sql`COUNT(*)`.as( 'penaltyMsTechCount' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_ms_tech' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMsTechCountQuery' )
        const penaltiesMsFullCountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMsFullCount: sql`COUNT(*)`.as( 'penaltyMsFullCount' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_ms_full' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMsFullCountQuery' )
        const penalties5CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty5Count: sql`COUNT(*)`.as( 'penalty5Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_5' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties5CountQuery' )
        const penalties10CountQuery = qb
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty10Count: sql`COUNT(*)`.as( 'penalty10Count' ),
            } )
            .from( schema.penalties )
            .where( and( gt( schema.penalties.playerId , 0 ) , eq( schema.penalties.penaltyType, 'penalty_10' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties10CountQuery' )

        const scorerQuery = qb
            .select( {
                playerId: sql`${ schema.players.playerId }`.as( 'playerId' ),
                firstName: sql`${ schema.players.firstName }`.as( 'firstName' ),
                lastName: sql`${ schema.players.lastName }`.as( 'lastName' ),
                goalsCount: sql`COALESCE(${ goalsCountQuery.goalsCount }, 0)`.as( 'goalsCount' ),
                assistsCount: sql`COALESCE(${ assistsCountQuery.assistsCount }, 0)`.as( 'assistsCount' ),
                penalty2Count: sql`COALESCE(${ penalties2CountQuery.penalty2Count }, 0)`.as( 'penalty2Count' ),
                penaltyMs1Count: sql`COALESCE(${ penaltiesMs1CountQuery.penaltyMs1Count }, 0)`.as( 'penaltyMs1Count' ),
                penalty2and2Count: sql`COALESCE(${ penalties2and2CountQuery.penalty2and2Count }, 0)`.as(
                    'penalty2and2Count'
                ),
                penaltyMs2Count: sql`COALESCE(${ penaltiesMs2CountQuery.penaltyMs2Count }, 0)`.as( 'penaltyMs2Count' ),
                penaltyMs3Count: sql`COALESCE(${ penaltiesMs3CountQuery.penaltyMs3Count }, 0)`.as( 'penaltyMs3Count' ),
                penaltyMsTechCount: sql`COALESCE(${ penaltiesMsTechCountQuery.penaltyMsTechCount }, 0)`.as(
                    'penaltyMsTechCount'
                ),
                penaltyMsFullCount: sql`COALESCE(${ penaltiesMsFullCountQuery.penaltyMsFullCount }, 0)`.as(
                    'penaltyMsFullCount'
                ),
                penalty5Count: sql`COALESCE(${ penalties5CountQuery.penalty5Count }, 0)`.as( 'penalty5Count' ),
                penalty10Count: sql`COALESCE(${ penalties10CountQuery.penalty10Count }, 0)`.as( 'penalty10Count' ),
            } )
            .from( schema.players )
            .leftJoin( goalsCountQuery, eq( schema.players.playerId, goalsCountQuery.playerId ) )
            .leftJoin( assistsCountQuery, eq( schema.players.playerId, assistsCountQuery.assistId ) )
            .leftJoin( penalties2CountQuery, eq( schema.players.playerId, penalties2CountQuery.penaltyPlayerId ) )
            .leftJoin( penalties5CountQuery, eq( schema.players.playerId, penalties5CountQuery.penaltyPlayerId ) )
            .leftJoin( penalties10CountQuery, eq( schema.players.playerId, penalties10CountQuery.penaltyPlayerId ) )
            .leftJoin( penalties2and2CountQuery, eq( schema.players.playerId, penalties2and2CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMsTechCountQuery, eq( schema.players.playerId, penaltiesMsTechCountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMs1CountQuery, eq( schema.players.playerId, penaltiesMs1CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMs2CountQuery, eq( schema.players.playerId, penaltiesMs2CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMs3CountQuery, eq( schema.players.playerId, penaltiesMs3CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMsFullCountQuery, eq( schema.players.playerId, penaltiesMsFullCountQuery.penaltyPlayerId ) )
            .orderBy(
                desc( goalsCountQuery.goalsCount ),
                desc( goalsCountQuery.goalsCount ),
                desc( assistsCountQuery.assistsCount ),
                asc( penalties2CountQuery.penalty2Count ),
                asc( penalties5CountQuery.penalty5Count ),
                asc( penalties10CountQuery.penalty10Count ),
                asc( penalties2and2CountQuery.penalty2and2Count ),
                asc( penaltiesMsTechCountQuery.penaltyMsTechCount ),
                asc( penaltiesMs1CountQuery.penaltyMs1Count ),
                asc( penaltiesMs2CountQuery.penaltyMs2Count ),
                asc( penaltiesMs3CountQuery.penaltyMs3Count ),
                asc( penaltiesMsFullCountQuery.penaltyMsFullCount ),
                asc( schema.players.lastName ),
                asc( schema.players.firstName )
            )
            .limit( pageSize )
            .offset( Math.ceil( skip / pageSize ) * pageSize )

        const q = mysqlDialect.sqlToQuery( scorerQuery.getSQL() )

        const replaceQuestionMarks = ( str: string, arr: any[] ) =>
        {
            let strArr = str.split( '?' )
            for( let i = 0; i < arr.length; i++ )
            {
                strArr[ i ] +=
                    typeof arr[ i ] === 'string' ? `'${ arr[ i ] }'` : typeof arr[ i ] === 'number' ? `${ arr[ i ] }` : '?'
            }
            return strArr.join( '' )
        }

        const rawSql = replaceQuestionMarks( q.sql, q.params )

        console.dir( rawSql )

        const totalScorersQuery = qb
            .select( {
                count: sql`COUNT(*)`.as( 'count' ),
            } )
            .from( schema.players )
        const totalScorersSql = totalScorersQuery.toSQL().sql

        const totalScorersData = await querySql( totalScorersSql, fetch )
        const scorerData = await querySql( rawSql, fetch )

        const totalScorers: Awaited<typeof totalScorersQuery> = totalScorersData
        const scorer: Awaited<typeof scorerQuery> = scorerData

        console.dir( scorer )

        return {
            scorer,
            totalScorers: ( totalScorers[ 0 ]?.count as number ) || 0,
        }
    }

    return {
        scorers: await getScorers( pageSize, skip ),
    }
}