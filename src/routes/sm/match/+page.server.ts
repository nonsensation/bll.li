import { Saisonmanager as SM } from 'floorball-saisonmanager'
import { error } from '@sveltejs/kit'
import { fetchData } from '$lib/sm/data.js'

export async function load( { fetch, url } )
{
    let gameId = 0

    if( url && url.searchParams )
    {
        const gameIdParam = url.searchParams.get( 'gameId' )

        if( gameIdParam ) gameId = parseInt( gameIdParam ) || 0
    }

    if( gameId <= 0 )
    {
        error( 404, 'Spiel nicht gefunden!' )
    }

    try
    {
        // const getGame = async () => await getData<SM.Game>( fetch, `games/${ gameId }.json` )

        return {
            gameId,
            game: await getData<SM.Game>( fetch, `games/${ gameId }.json` ),
            // game: await getData<SM.Game>( fetch, SM.getGameUrl( gameId ) ),
            // game: await getData<SM.Game>( fetch, { gameId } ),
        }
    } catch( err )
    {
        error( 404, JSON.stringify( err ) )
    }
}

async function getData<T extends object>(
    fetch: any,
    apiUrl: string,
    forceDownload: boolean = false
): Promise<T | void>
{
    // async function getData<T>( fetch: any, apiUrl: string, useSmApi: boolean = false ): Promise<T | void>
    try
    {
        const jsonResponse = await fetchData( apiUrl, forceDownload )

        if( !jsonResponse )
        {
            error( 404, 'saisonmanager.de api not ok - undefined: ' + apiUrl )
        }

        if( !jsonResponse.success )
        {
            if( !forceDownload )
            {
                return getData<T>( fetch, apiUrl, ( forceDownload = true ) )
            } else
            {
                return error( 404, 'saisonmanager.de api not ok - tried: ' + apiUrl )
            }
        }
        const game = jsonResponse.data as T

        if( 'ended' in game && ( game.ended as boolean ) === false && !forceDownload )
        {
            console.log( `Try reverting to SM because game hasent ended yet` )

            return getData<T>( fetch, apiUrl, ( forceDownload = true ) )
        }

        return game
    } catch( err )
    {
        error( 404, 'saisonmanager.de api fail: ' + JSON.stringify( err ) )
    }
}
