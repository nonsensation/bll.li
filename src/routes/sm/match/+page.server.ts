import { SM } from 'floorball-saisonmanager'
import { error } from '@sveltejs/kit'

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
        const getGame = async () => await getData<SM.Game>( fetch, `games/${ gameId }.json` )
        return {
            gameId,
            game: await getData<SM.Game>( fetch, `games/${ gameId }.json` ),
        }
    } catch( err )
    {
        error( 404, 'LOL' )
    }
}

async function getData<T>( fetch: any, apiUrl: string, useSmApi: boolean = false ): Promise<T | void>
{
    try
    {
        // const liveApi = 'https://saisonmanager.de/api/v2'
        const liveApi = useSmApi
            ? 'https://saisonmanager.de/api/v2'
            : 'https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data/api/v2'
        const smUrl = `${ liveApi }/${ apiUrl }`
        const response = await fetch( smUrl )

        if( !response.ok )
        {

            if( !useSmApi )
            {
                console.log( `Try reverting to SM because game not yet downloaded in achw` )
                
                return getData( fetch, apiUrl, true )
            }

            error( 404, 'saisonmanager.de api not ok - tried: ' + smUrl )
        }

        const json = await response.json()
        const game = json as T

        if( 'ended' in game  && game.ended as boolean === false && !useSmApi )
        {
            console.log( `Try reverting to SM because game hasent ended yet` )
            return getData( fetch, apiUrl, true )
        }

        return game
    } catch( err )
    {
        error( 404, 'saisonmanager.de api fail: ' + JSON.stringify( err ) )
    }
}
