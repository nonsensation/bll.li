import type { PageServerLoad } from './$types'
import { type QueryResult } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
// import * as schema from '$drizzle/schema'
import * as schema from '$mysql/schema'
// import { db } from '$drizzle/db'
import { db } from '$mysql/db'
import { fetchData } from '$lib/sm/data'
import { and, arrayContains, asc, desc, eq, inArray, isNotNull } from 'drizzle-orm'
import { setTimeout } from 'timers/promises'
import { parse } from 'csv-parse/sync'
import { any, z } from 'zod'
import { sql } from 'drizzle-orm'
import { SQL } from 'drizzle-orm'
import { PgColumn, type PgSelect } from 'drizzle-orm/pg-core'
import { querySql } from '$lib/db'

function withPagination<T extends PgSelect>(
    qb: T,
    orderByColumn: PgColumn[] | SQL[] | SQL.Aliased[],
    page = 1,
    pageSize = 10
)
{
    return qb
        .orderBy( ...orderByColumn )
        .limit( pageSize )
        .offset( ( page - 1 ) * pageSize )
}

export async function load( { fetch } )
{
    const totalScorersQuery = db
        .select( {
            count: sql`COUNT(*)`.as( 'count' ),
        } )
        .from( schema.penalties )

    const totalScorersSql = totalScorersQuery.toSQL().sql

    const myData = await querySql( totalScorersSql, fetch )

    console.dir( myData )

    return {
        totalScorers: myData,
        totalScorersSql,
    }
}
