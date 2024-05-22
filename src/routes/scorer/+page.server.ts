import type { PageServerLoad } from './$types'
import { type QueryResult } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from '$drizzle/schema'
import { db } from '$drizzle/db'
import { fetchData } from '$lib/sm/data'
import { and, arrayContains, asc, desc, eq, inArray, isNotNull } from 'drizzle-orm'
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
    let search = url.searchParams.get( 'search' )
    let pageSize = Number( url.searchParams.get( 'pageSize' ) ) || 10
    const skip = Number( url.searchParams.get( 'skip' ) ) || 0

    pageSize = Math.max( 0, Math.min( pageSize, 100 ) )

    async function getScorers( limit: number = 10, offset: number = 0 )
    {
        const goalsCountQuery = db
            .select( {
                playerId: schema.goals.playerId,
                goalsCount: sql`COUNT(*)`.as( 'goalsCount' ),
            } )
            .from( schema.goals )
            .groupBy( schema.goals.playerId )
            .as( 'goalsCountSubquery' )

        const assistsCountQuery = db
            .select( {
                assistId: schema.goals.assistId,
                assistsCount: sql`COUNT(*)`.as( 'assistsCount' ),
            } )
            .from( schema.goals )
            .where( isNotNull( schema.goals.assistId ) )
            .groupBy( schema.goals.assistId )
            .as( 'assistsCountSubquery' )

        const penalties2CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty2Count: sql`COUNT(*)`.as( 'penalty2Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_2' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties2CountQuery' )

        const penaltiesMs1CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMs1Count: sql`COUNT(*)`.as( 'penaltyMs1Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_ms1' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMs1CountQuery' )
        const penalties2and2CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty2and2Count: sql`COUNT(*)`.as( 'penalty2and2Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_2and2' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties2and2CountQuery' )
        const penaltiesMs2CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMs2Count: sql`COUNT(*)`.as( 'penaltyMs2Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_ms2' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMs2CountQuery' )
        const penaltiesMs3CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMs3Count: sql`COUNT(*)`.as( 'penaltyMs3Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_ms3' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMs3CountQuery' )
        const penaltiesMsTechCountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMsTechCount: sql`COUNT(*)`.as( 'penaltyMsTechCount' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_ms_tech' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMsTechCountQuery' )
        const penaltiesMsFullCountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penaltyMsFullCount: sql`COUNT(*)`.as( 'penaltyMsFullCount' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_ms_full' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penaltiesMsFullCountQuery' )
        const penalties5CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty5Count: sql`COUNT(*)`.as( 'penalty5Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_5' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties5CountQuery' )
        const penalties10CountQuery = db
            .select( {
                penaltyPlayerId: schema.penalties.playerId,
                penalty10Count: sql`COUNT(*)`.as( 'penalty10Count' ),
            } )
            .from( schema.penalties )
            .where( and( isNotNull( schema.penalties.playerId ), eq( schema.penalties.penaltyType, 'penalty_10' ) ) )
            .groupBy( schema.penalties.playerId )
            .as( 'penalties10CountQuery' )

        const scorerQuery = db
            .select( {
                playerId: schema.players.id,
                firstName: schema.players.firstName,
                lastName: schema.players.lastName,
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
            .where(sql`${ schema.players.firstName } || ' ' || ${ schema.players.lastName } LIKE ${'%' + search + '%'}`)
            .leftJoin( goalsCountQuery, eq( schema.players.id, goalsCountQuery.playerId ) )
            .leftJoin( assistsCountQuery, eq( schema.players.id, assistsCountQuery.assistId ) )
            .leftJoin( penalties2CountQuery, eq( schema.players.id, penalties2CountQuery.penaltyPlayerId ) )
            .leftJoin( penalties5CountQuery, eq( schema.players.id, penalties5CountQuery.penaltyPlayerId ) )
            .leftJoin( penalties10CountQuery, eq( schema.players.id, penalties10CountQuery.penaltyPlayerId ) )
            .leftJoin( penalties2and2CountQuery, eq( schema.players.id, penalties2and2CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMsTechCountQuery, eq( schema.players.id, penaltiesMsTechCountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMs1CountQuery, eq( schema.players.id, penaltiesMs1CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMs2CountQuery, eq( schema.players.id, penaltiesMs2CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMs3CountQuery, eq( schema.players.id, penaltiesMs3CountQuery.penaltyPlayerId ) )
            .leftJoin( penaltiesMsFullCountQuery, eq( schema.players.id, penaltiesMsFullCountQuery.penaltyPlayerId ) )

        let ordering = [
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
            asc( schema.players.firstName ),
        ]

        if( search )
            ordering = [
                desc( sql`levenshtein(${ schema.players.firstName } || ' ' || ${ schema.players.lastName }, ${ search })` ),
                ...ordering,
            ]
        const scorer = await withPagination( scorerQuery.$dynamic(), ordering, Math.ceil( skip / pageSize ) + 1, pageSize )

        const totalScorers = await db
            .select( {
                count: sql`COUNT(*)`.as( 'count' ),
            } )
            .from( schema.players )

        return {
            scorer,
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
