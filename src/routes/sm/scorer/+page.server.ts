import * as schema from '$mysql/schema'
import { fetchFromMyDb } from '$mysql/db'
import
    {
        and,
        asc,
        desc,
        eq,
        ne,
        inArray,
        isNotNull,
        like,
        gt,
        notLike,
        type SQLWrapper,
        or,
        max,
    } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { MySqlColumn, QueryBuilder, type MySqlSelectQueryBuilder } from 'drizzle-orm/mysql-core'
import type { Actions, PageServerLoadEvent } from './$types'
import { message, superValidate } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'

import { z } from 'zod'
import { fail } from '@sveltejs/kit'

enum FieldSize
{
    GF = 'GF',
    KF = 'KF',
}

const filterFormSchema = z.object( {
    name: z
        .string()
        .min( 1 )
        .max( 64 )
        .optional()
        .nullable()
        .default( '' as unknown as null ),
    fieldSize: z
        .nativeEnum( FieldSize )
        .optional()
        .nullable()
        .default( '' as unknown as null ),
    female: z
        .boolean()
        .optional()
        .nullable()
        .default( '' as unknown as null ),
    junior: z
        .boolean()
        .optional()
        .nullable()
        .default( '' as unknown as null ),
    season: z
        .number()
        .int()
        .positive()
        .min( 1 )
        .max(/*currentSeasonId*/ 15 )
        .optional()
        .nullable()
        .default( '' as unknown as null ),
} )

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { url, params } = serverLoadEvent
    const pageSize = getPageSize( url )

    return {
        pageSize: pageSize,
        scorers: getScorers( serverLoadEvent ),
        totalScorers: getTotalScorers( serverLoadEvent ),
        currentSeasonId,
        seasonIds,
        form: await superValidate( url, zod( filterFormSchema ) ),
    }
}

async function getTotalScorers( serverLoadEvent: PageServerLoadEvent )
{
    const qb = new QueryBuilder()
    let query = qb
        .select( {
            count: sql<number>`COUNT(DISTINCT ${ schema.leagueScorers.playerId })`.as( 'count' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .$dynamic()

    query = query.where( and( ...filter( serverLoadEvent ), ...filterName( serverLoadEvent ) ) )

    const totalScorers = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const t = totalScorers as unknown as typeof totalScorers._.result

    return t[ 0 ]?.count || 0
}

async function getScorers( serverLoadEvent: PageServerLoadEvent )
{
    const qb = new QueryBuilder()

    let subQuery = qb
        .select( {
            LeagueName: sql`${ schema.leagues.name }`.as( 'LeagueName' ),
            IsJunior: sql`${ schema.leagues.isJunior }`.as( 'IsJunior' ),
            PlayerId: sql`${ schema.leagueScorers.playerId }`.as( 'PlayerId' ),
            Goals: sql`${ schema.leagueScorers.goals }`.as( 'Goals' ),
            Assists: sql`${ schema.leagueScorers.assists }`.as( 'Assists' ),
            Games: sql`${ schema.leagueScorers.games }`.as( 'Games' ),
            Penalty2: sql`${ schema.leagueScorers.penalty2 }`.as( 'Penalty2' ),
            Penalty2and2: sql`${ schema.leagueScorers.penalty2and2 }`.as( 'Penalty2and2' ),
            Penalty5: sql`${ schema.leagueScorers.penalty5 }`.as( 'Penalty5' ),
            Penalty10: sql`${ schema.leagueScorers.penalty10 }`.as( 'Penalty10' ),
            PenaltyMsTech: sql`${ schema.leagueScorers.penaltyMsTech }`.as( 'PenaltyMsTech' ),
            PenaltyMsFull: sql`${ schema.leagueScorers.penaltyMsFull }`.as( 'PenaltyMsFull' ),
            PenaltyMs1: sql`${ schema.leagueScorers.penaltyMs1 }`.as( 'PenaltyMs1' ),
            PenaltyMs2: sql`${ schema.leagueScorers.penaltyMs2 }`.as( 'PenaltyMs2' ),
            PenaltyMs3: sql`${ schema.leagueScorers.penaltyMs3 }`.as( 'PenaltyMs3' ),
        } )
        .from( schema.leagueScorers )
        .leftJoin( schema.leagues, eq( schema.leagues.id, schema.leagueScorers.leagueId ) )
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .leftJoin( schema.seasons, eq( schema.seasons.id, schema.leagues.seasonId ) )
        .$dynamic()
    subQuery = subQuery.where( and( ...filter( serverLoadEvent ) ) )

    let sub = subQuery.as( 'subQuery' )

    let query = qb
        .select( {
            LeagueName: sql`${ sub.LeagueName }`.as( 'LeagueName' ),
            PlayerId: sql`${ schema.players.id }`.as( 'PlayerId' ),
            FirstName: sql`${ schema.players.firstName }`.as( 'FirstName' ),
            LastName: sql`${ schema.players.lastName }`.as( 'LastName' ),
            PlayerRank: sql`RANK() OVER ( ORDER BY
                COALESCE(SUM(${ sub.Goals }), 0) DESC,
                COALESCE(SUM(${ sub.Assists }), 0) DESC,
                COALESCE(SUM(${ sub.Games }), 0) ASC
                )`.as( 'PlayerRank' ),
            TotalGoals: sql`COALESCE(SUM(${ sub.Goals }), 0)`.as( 'TotalGoals' ),
            TotalAssists: sql`COALESCE(SUM(${ sub.Assists }), 0)`.as( 'TotalAssists' ),
            TotalGames: sql`COALESCE(SUM(${ sub.Games }), 0)`.as( 'TotalGames' ),
            TotalPenalty2: sql`COALESCE(SUM(${ sub.Penalty2 }), 0)`.as( 'TotalPenalty2' ),
            TotalPenalty2and2: sql`COALESCE(SUM(${ sub.Penalty2and2 }), 0)`.as( 'TotalPenalty2and2' ),
            TotalPenalty5: sql`COALESCE(SUM(${ sub.Penalty5 }), 0)`.as( 'TotalPenalty5' ),
            TotalPenalty10: sql`COALESCE(SUM(${ sub.Penalty10 }), 0)`.as( 'TotalPenalty10' ),
            TotalPenaltyMs: sql`COALESCE(SUM(${ sub.PenaltyMs1 }), 0) +
                    COALESCE(SUM(${ sub.PenaltyMs2 }), 0) +
                    COALESCE(SUM(${ sub.PenaltyMs3 }), 0) +
                    COALESCE(SUM(${ sub.PenaltyMsTech }), 0) +
                    COALESCE(SUM(${ sub.PenaltyMsFull }), 0)`.as( 'TotalPenaltyMs' ),
        } )
        .from( sub )
        .leftJoin( schema.players, eq( schema.players.id, sub.PlayerId ) )
        .$dynamic()
    query = query.where( and( ...filterName( serverLoadEvent ) ) )
    query = query
        .groupBy( sql`PlayerId`, sql`FirstName`, sql`LastName` /*, sql`LeagueName`*/ )
        .orderBy(
            sql`TotalGoals DESC`,
            sql`TotalAssists DESC`,
            sql`TotalGames ASC`,
            sql`TotalPenaltyMs ASC`
        )
    query = withPagination( query, serverLoadEvent )

    const scorers = await fetchFromMyDb( query, serverLoadEvent.fetch )
    const s = scorers as unknown as typeof scorers._.result

    // console.log( s[ 0 ].PlayerId, typeof s[ 0 ].PlayerId )

    return s ?? []
}

// TODO
const currentSeasonId = 15
const seasonIds = Array.from( { length: currentSeasonId }, ( _, i ) => currentSeasonId - i )

function filter( serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const enableJuniorLeagues = url.searchParams.get( 'junior' )
    const enableFemaleLeagues = url.searchParams.get( 'female' )
    const enableFieldSize = url.searchParams.get( 'fieldSize' )
    const enableSeason = url.searchParams.get( 'season' )
    const filters: MySqlColumn[] = []

    if( enableFieldSize != null )
    {
        if( enableFieldSize == 'KF' ) filters.push( eq( schema.leagues.fieldSize, 'KF' ) )
        else if( enableFieldSize == 'GF' ) filters.push( eq( schema.leagues.fieldSize, 'GF' ) )
    }

    if( enableJuniorLeagues != null )
    {
        if( enableJuniorLeagues == '1' ) filters.push( eq( schema.leagues.isJunior, true ) )
        else if( enableJuniorLeagues == '0' ) filters.push( eq( schema.leagues.isJunior, false ) )
    }

    if( enableFemaleLeagues != null )
    {
        if( enableFemaleLeagues == '1' ) filters.push( eq( schema.leagues.isFemale, true ) )
        else if( enableFemaleLeagues == '0' ) filters.push( eq( schema.leagues.isFemale, false ) )
    }

    if( enableSeason != null )
    {
        const season = Number( enableSeason )

        if( seasonIds.includes( season ) ) filters.push( eq( schema.leagues.seasonId, season ) )
    }

    return filters
}

function filterName( serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const name = url.searchParams.get( 'name' )
    const filters = []

    if( name != null )
    {
        const likeStr = `%${ name }%`
        filters.push(
            sql`CONCAT( ${ schema.players.firstName } , ' ' , ${ schema.players.lastName } ) LIKE ${ likeStr }`
        )
    }

    return filters
}

function withPagination<T extends MySqlSelectQueryBuilder>(
    qb: T,
    serverLoadEvent: PageServerLoadEvent
)
{
    const { url } = serverLoadEvent
    const pageSize = getPageSize( url )
    const skip = clamp( url.searchParams.get( 'skip' ), 0, 0 )
    const offset = Math.ceil( skip / pageSize ) * pageSize

    return qb.limit( pageSize ).offset( offset )
}

const getPageSize = ( url: URL ) => clamp( url.searchParams.get( 'pageSize' ), 10, 100, 300 )

const clamp = ( val: any | null, min: number, def: number, max: number = Infinity ) =>
    Math.min( Math.max( min, Number( val ?? def ) ), max )
