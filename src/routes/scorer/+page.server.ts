import type { PageServerLoad } from './$types'
import { type QueryResult } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from '$drizzle/schema'
import { db } from '$drizzle/db'
import { fetchData } from '$lib/sm/data'
import { arrayContains, asc, desc, eq, inArray } from 'drizzle-orm'
import { setTimeout } from 'timers/promises'
import { parse } from 'csv-parse/sync'
import { any, z } from 'zod'
import { sql } from 'drizzle-orm'

import { SQL } from 'drizzle-orm'
import { PgColumn, type PgSelect } from 'drizzle-orm/pg-core'

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

export async function load( { fetch, url } )
{
    let pageSize = Number( url.searchParams.get( 'pageSize' ) ) || 10
    const skip = Number( url.searchParams.get( 'skip' ) ) || 0

    pageSize = Math.max( 0, Math.min( pageSize, 100 ) )

    async function getScorers( limit: number = 10, offset: number = 0 )
    {
        const scorerQuery = db
            .select( {
                playerId: schema.goals.playerId,
                firstName: schema.players.firstName,
                lastName: schema.players.lastName,
                goalsCount: sql`COUNT(${ schema.goals.id })`.as( 'goalsCount' ),
                // assistsCount:
                //     sql`(SELECT COUNT(*) FROM ${ schema.goals } WHERE ${ schema.goals.assistId } = ${ schema.players.id })`.as(
                //         'assistsCount'
                //     ),
            } )
            .from( schema.goals )
            .innerJoin( schema.players, eq( schema.players.id, schema.goals.playerId ) )
            .groupBy( schema.goals.playerId, schema.players.firstName, schema.players.lastName, schema.players.id )
        // .orderBy( desc( sql`COUNT(${ schema.goals.id })` ), asc( schema.players.lastName ) )
        // .offset( offset )
        // .limit( limit )

        const scorer = await withPagination(
            scorerQuery.$dynamic(),
            [ desc( sql`COUNT(${ schema.goals.id })` ), asc( schema.players.lastName ) ],
            Math.ceil( skip / pageSize ) + 1,
            pageSize
        )

        const totalScorers = await db
            .select( {
                count: sql`COUNT(DISTINCT ${ schema.goals.playerId })`.as( 'count' ),
            } )
            .from( schema.goals )

        const playerIds = scorer.map( x => x.playerId ?? 0 )
        const assistsQuery = await db
            .select( {
                assistId: schema.goals.assistId,
                assistsCount: sql`COUNT(${ schema.goals.id })`.as( 'assistsCount' ),
            } )
            .from( schema.goals )
            .where( inArray( schema.goals.assistId, playerIds ) )
            .groupBy( schema.goals.assistId )
        const assists = {}

        assistsQuery.forEach( x => ( assists[ x.assistId ?? 0 ] = x.assistsCount ) )

        return {
            scorer,
            assists,
            totalScorers: ( totalScorers[ 0 ]?.count as number ) || 0,
        }
    }

    return {
        scorers: await getScorers( pageSize, skip ),
    }
}

// async function lol()
// {
//     const teams = await fetchCsv<schema.Team>( fetch, schema.insertTeamSchema.safeParse, 'teams' )
//     const arenas = await fetchCsv<schema.Arena>( fetch, schema.insertArenaSchema.safeParse, 'arenas' )
//     const leagues = await fetchCsv<schema.League>( fetch, schema.insertLeagueSchema.safeParse, 'leagues' )
//     const penalties = await fetchCsv<schema.Penalty>( fetch, schema.insertPenaltySchema.safeParse, 'penalties' )
//     const goals = await fetchCsv<schema.Goal>( fetch, schema.insertGoalSchema.safeParse, 'goals' )
//     const games = await fetchCsv<schema.Game>( fetch, schema.insertGameSchema.safeParse, 'games' )
//     const referees = await fetchCsv<schema.Referee>( fetch, schema.insertRefereeSchema.safeParse, 'referees' )
//     const gameOperations = await fetchCsv<schema.GameOperation>(
//         fetch,
//         schema.insertGameOperationSchema.safeParse,
//         'gameOperations'
//     )
//     const seasons = await fetchCsv<schema.Season>( fetch, schema.insertSeasonSchema.safeParse, 'seasons' )
//     const players = await fetchCsv<schema.Player>( fetch, schema.insertPlayerSchema.safeParse, 'players' )
//     const events = await fetchCsv<schema.Event>( fetch, schema.insertEventSchema.safeParse, 'events' )

//     // await chunked( gameOperations, async ( vals: any[] ) => upsert( vals, schema.gameOperations, schema.gameOperations.id ) )
//     // await chunked( arenas, async ( vals: any[] ) => upsert( vals, schema.arenas, schema.arenas.id ) )
//     // await chunked( seasons, async ( vals: any[] ) => upsert( vals, schema.seasons, schema.seasons.id ) )
//     // await chunked( referees, async ( vals: any[] ) => upsert( vals, schema.referees, schema.referees.id ) )
//     // await chunked( teams, async ( vals: any[] ) => upsert( vals, schema.teams, schema.teams.id ) )
//     // await chunked( leagues, async ( vals: any[] ) => upsert( vals, schema.leagues, schema.leagues.id ) )
//     // await chunked( players, async ( vals: any[] ) => upsert( vals, schema.players, schema.players.id ) )
//     // await chunked( games, async ( vals: any[] ) => upsert( vals, schema.games, schema.games.id ) )
//     // await chunked( goals, async ( vals: any[] ) => upsert( vals, schema.goals, schema.goals.id ) )
//     // await chunked( penalties, async ( vals: any[] ) => upsert( vals, schema.penalties, schema.penalties.id ) )
//     // await chunked( events, async ( vals: any[] ) => upsert( vals, schema.events, schema.events.id ) )

//     return {
//         // teams: teams(),
//         // arenas: arenas(),
//         // leagues: leagues(),
//         // penalties: penalties(),
//         // goals: goals(),
//         // games: games(),
//         // referees: referees(),
//         // gameOperations: gameOperations(),

//         events,
//         teams,
//         players,
//         seasons,
//         arenas,
//         leagues,
//         penalties,
//         goals,
//         games,
//         referees,
//         gameOperations,
//     }
// }

// const upsert = async ( vals: any[], table: any, id: any ) =>
//     await db.insert( table ).values( vals ).onConflictDoNothing( { target: id } )

// async function fetchCsv<T>( fetch: any, validate: any, csv: string ): Promise<T[]>
// {
//     const parseOptions = {
//         delimiter: '|',
//         columns: true,
//         skip_empty_lines: true,
//         trim: true,
//         comment: '#',
//         cast: ( value, context ) =>
//         {
//             if( context.header ) return value

//             const col: string = context.column

//             if( col === 'leagueCategoryId' || col === 'leagueClassId' || col === 'leagueSystemId' ) return String( value )

//             if( col.endsWith( 'Id' ) ) return Number( value )
//             if( col.endsWith( 'Goals' ) ) return Number( value )

//             if( col.startsWith( 'is' ) ) return Boolean( value )
//             if( col.startsWith( 'has' ) ) return Boolean( value )

//             switch( col )
//             {
//                 case 'id':
//                 case 'period':
//                 case 'number':
//                 case 'assist':
//                 case 'penaltyReason':
//                 case 'audience':
//                     return Number( value )
//                 default:
//                     return String( value )
//             }
//         },
//     }

//     const url = `https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data/generated/csv/${ csv }.csv`

//     const response = await fetch( url )
//     const csvString = await response.text()
//     const records = parse( csvString, parseOptions )
//     const arr: T[] = []

//     console.log( 'Records: ' + records.length )

//     for( const record of records )
//     {
//         const result = validate( record )

//         if( result.success )
//         {
//             arr.push( result.data as T )
//         } else
//         {
//             console.error( 'Validation failed:', result.error.errors )
//         }
//     }

//     return arr
// }

// type ProcessFn<T> = ( chnk: T[] ) => Promise<QueryResult<never>>
// async function chunked<T>( arr: T[], processFn: ProcessFn<T>, chunkSize: number = 1000 ): Promise<void>
// {
//     let hasErr = false

//     let len = arr.length

//     // len = 3

//     console.log( `Baching ${ len } values in ${ Math.ceil( len / chunkSize ) } batches` )

//     for( let i = 0; i < len; i += chunkSize )
//     {
//         const chunk = arr.slice( i, i + chunkSize )

//         console.log( `Start Batch #${ i } - ${ i + chunkSize } [${ chunk.map( x => x.id ).join( ',' ) }]` )

//         await processFn( chunk )
//             .then( x => console.error( `Batch #${ i } done.` ) )
//             .catch( err =>
//             {
//                 hasErr = true
//                 console.error( `Error in chunk #${ i }!`, err )
//             } )

//         if( hasErr )
//         {
//             if( chunk.length < 10 ) console.dir( chunk )
//             break
//         }
//     }
// }