

import { SM } from 'floorball-saisonmanager'
import type { PageLoadEvent } from '../$types.js'
import { error, type ServerLoadEvent } from '@sveltejs/kit'
import path from 'path'


export async function load( event )
{
    const { fetch , params , url } = event

    let gameId = 0

    if( url && url.searchParams )
    {
        const gameIdParam = url.searchParams.get( 'gameId' )

        if( gameIdParam )
            gameId = parseInt( gameIdParam ) || 0
    }

    if( gameId <= 0 )
    {
        // TODO: error handling

        gameId = 35477
    }

    try {
        return {
            gameId ,
            game: getData<SM.MatchReport>( event , `games/${gameId}.json` ) ,
        }
    }
    catch( err )
    {
        error( 404 , "LOL" )
    }
}

async function getData<T>( event : ServerLoadEvent , apiUrl : string  ) : Promise<T|void>
{
    try
    {
        // remove .json file extension for vite-import
        // const parsed = path.parse( apiUrl )
        // const apiName = path.join( parsed.dir , parsed.name )
        // const imported = await import( `./$SM/api/v2/${apiName}.json` )

        const imported = await import( /* @vite-ignore */ `/floorball-saisonmanager-data/data/api/v2/${apiUrl}` )
        
        return await imported.default
    }
    catch( err )
    {
        console.error( "floorball-saisonmanager-data api fail" )
    }

    try
    {
        // Timeout, see: https://stackoverflow.com/a/50101022/11341498
        AbortSignal.timeout ??= function timeout( ms ) {
            const ctrl = new AbortController()
            setTimeout( () => ctrl.abort() , ms )
            return ctrl.signal
        }

        const liveApi = 'https://saisonmanager.de/api/v2'
        const response = await event.fetch( path.normalize( `${liveApi}/${apiUrl}` ) , {
                // signal: AbortSignal.timeout( 5000 ) ,
            } )
    
        if( !response.ok )
        {
            error( 404 , 'saisonmanager.de api not ok' )
        }
    
        return await response.json() as T
    }
    catch( err )
    {
        error( 404 , "saisonmanager.de api fail: " + JSON.stringify(err) )
    }
}
