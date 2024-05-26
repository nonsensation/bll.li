//
// USE PLANETSCALE ONLY TO GET DRIZZLE TO GENERATE SQL,
// WITHOUT THE NEED FOR AN ACTIVE CONNECTION TO A DATABASE
//
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { Client } from '@planetscale/database'
import
    {
        MySqlDialect,
        type MySqlSelectQueryBuilderBase,
        QueryBuilder,
        type MySqlSelect,
        type MySqlSelectQueryBuilder,
        MySqlSelectBuilder,
        MySqlSelectBase,
        type MySqlSelectHKTBase,
        type PreparedQueryHKTBase,
    } from 'drizzle-orm/mysql-core'
import { sql, type ColumnsSelection, type Query } from 'drizzle-orm'
import type { SelectMode } from 'drizzle-orm/query-builders/select.types'

export const db = drizzle( new Client( {} ) )
export const dialect = new MySqlDialect()
export const qb = new QueryBuilder()

export async function querySql( sqlQuery: string, fetch: any )
{
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: sqlQuery,
    }

    const response = await fetch( '/api/db', options )
    const data = await response.json()

    return data
}

export async function fetchFromMyDb<
    T extends MySqlSelectQueryBuilder,
    R
>( qb: T, fetchFunc: any ) : Promise<R>
{
    const query = qb
    const rawSqlString = replaceQuestionMarks( query.toSQL() )
    const untypedData = await querySql( rawSqlString, fetchFunc )
    const data = untypedData as R

    return data
}

function replaceQuestionMarks( query: Query ): string
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
