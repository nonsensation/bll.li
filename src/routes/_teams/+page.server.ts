import type { PageServerLoad } from './$types'
import { sql, type QueryResult } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import * as schema from '$drizzle/schema'
import { db } from '$drizzle/db'
import { fetchData } from '$lib/sm/data'
import { desc, eq } from 'drizzle-orm'
import { setTimeout } from 'timers/promises'

export async function load( { fetch } )
{
    return {}
    
    const dataUrl =
        'https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data/generated/data-2024-05-19.min.json'
    // // const dataUrl = "https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data/generated/data.json"
    const response = await fetch( dataUrl )
    const json = await response.json()

    const arenas = json[ 'arenas' ] as schema.Arena[]
    const gameOperations = json[ 'gameOperations' ] as schema.GameOperation[]
    const leagues = json[ 'leagues' ] as schema.League[]
    const players = json[ 'players' ] as schema.Player[]
    const referees = json[ 'referees' ] as schema.Referee[]
    const seasons = json[ 'seasons' ] as schema.Season[]
    const teams = ( json[ 'teams' ] as schema.Team[] ).filter( x => x.logo )
    const games = ( json[ 'games' ] as schema.Game[] )
        .filter( g => !!teams.find( ( t: any ) => t.id == g.teamHomeId ) )
        .filter( g => !!teams.find( ( t: any ) => t.id == g.teamGuestId ) )
    const events = ( json[ 'events' ] as schema.Event[] )
        .filter( ev => !!games.find( ( g: any ) => g.id == ev.gameId ) )
        .filter( ev => !!teams.find( ( t: any ) => t.id == ev.teamId ) )
        .filter( ev => ev.period != null )
    const goals = ( json[ 'goals' ] as schema.Goal[] )
        .filter( g => !!events.find( ( ev: any ) => ev.id == g.eventId ) )
        .filter( g => !!teams.find( ( t: any ) => t.id == g.teamId ) )
    const penalties = ( json[ 'penalties' ] as schema.Penalty[] )
        .filter( p => p.playerId != null )
        .filter( p => !!players.find( ( pl: any ) => pl.id == p.playerId ) )
        .filter( p => !!events.find( ( ev: any ) => ev.id == p.eventId ) )
        .filter( p => !!teams.find( ( t: any ) => t.id == p.teamId ) )

    const upsert = async ( vals: any[], table: any, id: any ) =>
        await db.insert( table ).values( vals ).onConflictDoNothing( { target: id } )

    await chunked( gameOperations, async ( vals: any[] ) => upsert( vals, schema.gameOperations, schema.gameOperations.id ) )
    await chunked( arenas, async ( vals: any[] ) => upsert( vals, schema.arenas, schema.arenas.id ) )
    await chunked( seasons, async ( vals: any[] ) => upsert( vals, schema.seasons, schema.seasons.id ) )
    await chunked( referees, async ( vals: any[] ) => upsert( vals, schema.referees, schema.referees.id ) )
    await chunked( games, async ( vals: any[] ) => upsert( vals, schema.games, schema.games.id ) )
    await chunked( leagues, async ( vals: any[] ) => upsert( vals, schema.leagues, schema.leagues.id ) )
    await chunked( players, async ( vals: any[] ) => upsert( vals, schema.players, schema.players.id ) )
    await chunked( teams, async ( vals: any[] ) => upsert( vals, schema.teams, schema.teams.id ) )
    await chunked( goals, async ( vals: any[] ) => upsert( vals, schema.goals, schema.goals.id ) )
    await chunked( penalties, async ( vals: any[] ) => upsert( vals, schema.penalties, schema.penalties.id ) )
    await chunked( events, async ( vals: any[] ) => upsert( vals, schema.events, schema.events.id ) )

    return {}
}

type ProcessFn<T> = ( chnk: T[] ) => Promise<QueryResult<never>>
async function chunked<T>( arr: T[], processFn: ProcessFn<T>, chunkSize: number = 1 ): Promise<void>
{
    let hasErr = false

    for( let i = 0; i < arr.length; i += chunkSize )
    {
        const chunk = arr.slice( i, i + chunkSize )

        console.log( `Start batch ${ i } - ${ i + chunkSize } [${ chunk.map( x => x.id ).join( ',' ) }]` )

        await processFn( chunk )
            .then( x => console.error( `Batch #${ i } done.` ) )
            .catch( err =>
            {
                hasErr = true
                console.error( `Error in chunk #${ i }!`, err )
            } )

        if( hasErr )
        {
            if( chunk.length < 10 ) console.dir( chunk )
            break
        }
    }
}
