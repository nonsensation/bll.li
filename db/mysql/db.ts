//
// USE PLANETSCALE ONLY TO GET DRIZZLE TO GENERATE SQL,
// WITHOUT THE NEED FOR AN ACTIVE CONNECTION TO A DATABASE
//
import { drizzle as drizzle_dummy } from 'drizzle-orm/planetscale-serverless'
import { Client } from '@planetscale/database'

import { drizzle as drizzle_local } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

import { DEV_MYSQL_HOST, DEV_MYSQL_PASSWORD, DEV_MYSQL_USERNAME, DEV_MYSQL_DATABASE } from '$env/static/private'
import { MySqlDialect, QueryBuilder, type MySqlSelect, type MySqlSelectQueryBuilder } from 'drizzle-orm/mysql-core'
import { sql, type Query } from 'drizzle-orm'

// const connection = await mysql.createConnection( {
//     host: DEV_MYSQL_HOST,
//     password: DEV_MYSQL_PASSWORD,
//     user: DEV_MYSQL_USERNAME,
//     database: DEV_MYSQL_DATABASE,
// } )

export const db_dummy = drizzle_dummy( new Client( {} ) )
// export const db_local = drizzle_local( connection )
export const db = db_dummy
export const dialect = new MySqlDialect()
export const qb = new QueryBuilder()

// Thanks to https://www.youtube.com/watch?v=9i38FPugxB8&t=308s
export type MySqlPostResponse = {
    success: boolean
} & ( DataProps | ErrorProps )

type DataProps = {
    success: true
    data: any
}

type ErrorProps = {
    success: false
    error: string
}

export const querySql = querySql_dummy
export const fetchFromMyDb = fetchFromMyDb_dummy

async function querySql_dummy( sqlQuery: string, fetchFunc: any )
{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: sqlQuery,
    }

    const response = await fetchFunc( '/api/db', options )
    const data: MySqlPostResponse = await response.json()

    console.dir( data );
    
    return data.success ? data.data : {}
}

// async function querySql_local( sqlQuery: string, fetch: any )
// {
//     const [ rows, fields ] = await db_local.execute( sql.raw( sqlQuery ) )

//     console.log( sqlQuery )

//     return rows
// }

async function fetchFromMyDb_dummy<T extends MySqlSelectQueryBuilder, R>( qb: T, fetchFunc: any ): Promise<R>
{
    const query = qb
    const rawSqlString = replaceQuestionMarks( query.toSQL() )
    const untypedData = await querySql( rawSqlString, fetchFunc )
    const data = untypedData as R

    return data
}

// async function fetchFromMyDb_local<T extends MySqlSelectQueryBuilder, R>( qb: T, fetchFunc: any ): Promise<R>
// {
//     const untypedData = await db_dummy.execute( qb )
//     const data = untypedData as R

//     return data
// }

export function replaceQuestionMarks( query: Query ): string
{
    let { sql, params } = query
    let strArr = sql.split( '?' )

    for( let i = 0; i < params.length; i++ )
    {
        switch( typeof params[ i ] )
        {
            case 'string':
                strArr[ i ] += `'${ params[ i ] }'`
                break
            case 'number':
            case 'boolean':
                strArr[ i ] += `${ params[ i ] }`
                break
            default:
                strArr[ i ] += `???`
                break
        }
    }

    return strArr.join( '' )
}

//
// Pagination from 'Cleber Gasparoto'@StackOverflow
// See: https://stackoverflow.com/a/78237611/11341498
//
type PaginationResult = {
    totalRecords: number
    totalPages: number
    currentPage: number
    limit: number
}

type Pagination = {
    page: number
    limit: number
}

// TODO: replace sb and .execute() with fetchFromMyDb(fetch)
async function paginateQuery<T extends MySqlSelect>(
    query: T,
    pagination: Pagination
): Promise<{ data: T[]; pagination: PaginationResult }>
{
    const subQuery = query.as( 'PaginationSubQuery' )
    const totalRecordsQuery = db.select( { total: sql<number>`COUNT(*)` } ).from( subQuery )

    const totalRecordsResult = await totalRecordsQuery.execute()
    const totalRecords = Number( totalRecordsResult[ 0 ].total )
    const totalPages = Math.ceil( totalRecords / pagination.limit )

    query.limit( pagination.limit ).offset( ( pagination.page - 1 ) * pagination.limit )

    const results = ( await query.execute() ) as T[]

    return {
        data: results,
        pagination: {
            totalRecords: totalRecords,
            totalPages: totalPages,
            currentPage: pagination.page,
            limit: pagination.limit,
        },
    }
}
