import * as schema from '$mysql/schema'
import { querySql, replaceQuestionMarks } from '$mysql/db'
import { and, asc, desc, eq, ne, inArray, isNotNull, like, gt, notLike, type SQLWrapper, or, max } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { QueryBuilder, type MySqlSelectQueryBuilder } from 'drizzle-orm/mysql-core'
import type { PageServerLoadEvent } from './$types'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const pageSize = getPageSize( url )

    return {
        pageSize: pageSize,
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
        .leftJoin( schema.players, eq( schema.players.id, schema.leagueScorers.playerId ) )
        .$dynamic()

    query = filter( query, serverLoadEvent )
    query = filterName( query, serverLoadEvent )

    const totalScorersSql = replaceQuestionMarks( query.toSQL() )
    const totalScorersData = await querySql( totalScorersSql, serverLoadEvent.fetch )
    const totalScorers = totalScorersData as typeof query
    const total = ( totalScorers[ 0 ]?.count as number ) || 0

    console.log( total )

    return total
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
        .$dynamic()
    subQuery = filter( subQuery, serverLoadEvent )

    let sub = subQuery.as( 'subQuery' )

    let query = qb
        .select( {
            cnt: sql`count(*)`.as('cnt'),
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
    query = filterName( query, serverLoadEvent )
    query = query
        .groupBy( sql`PlayerId`, sql`FirstName`, sql`LastName` )
        .orderBy( sql`TotalGoals DESC`, sql`TotalAssists DESC`, sql`TotalGames ASC`, sql`TotalPenaltyMs ASC` )
    query = withPagination( query, serverLoadEvent )

    const scorerQuerySql = replaceQuestionMarks( query.toSQL() )
    console.error( '\n\n\n' + scorerQuerySql )
    const scorerData = await querySql( scorerQuerySql, serverLoadEvent.fetch )
    const scorers = scorerData as typeof query

    return scorers ?? []
}

function filter<T extends MySqlSelectQueryBuilder>( qb: T, serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const enableJuniorLeagues = url.searchParams.get( 'junior' )
    const enableFieldSize = url.searchParams.get( 'fieldSize' )
    const filters = []

    if( enableFieldSize != null )
    {
        // TODO: use .FieldSize column
        if( enableFieldSize == 'KF' )
            filters.push( or( like( schema.leagues.name, '%Kleinfeld%' ), like( schema.leagues.name, '%KF%' ) ) )
        else if( enableFieldSize == 'GF' )
            filters.push( or( notLike( schema.leagues.name, '%Kleinfeld%' ), notLike( schema.leagues.name, '%KF%' ) ) )
    }

    if( enableJuniorLeagues != null )
    {
        if( enableJuniorLeagues == '1' ) filters.push( eq( schema.leagues.isJunior, true ) )
        else if( enableJuniorLeagues == '0' ) filters.push( eq( schema.leagues.isJunior, false ) )
    }

    return qb.where( and( ...filters ) )
}

function filterName<T extends MySqlSelectQueryBuilder>( qb: T, serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const name = url.searchParams.get( 'name' )
    const filters = []

    if( name != null )
    {
        const likeStr = `%${ name }%`
        filters.push( sql`CONCAT( ${ schema.players.firstName } , ' ' , ${ schema.players.lastName } ) LIKE ${ likeStr }` )
    }

    return qb.where( and( ...filters ) )
}

function withPagination<T extends MySqlSelectQueryBuilder>( qb: T, serverLoadEvent: PageServerLoadEvent )
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
