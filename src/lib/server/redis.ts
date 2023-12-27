

import { Redis } from 'ioredis'
import { REDIS_URI } from '$env/static/private'
import { error, type LoadEvent } from '@sveltejs/kit'


export const redis = new Redis( REDIS_URI )


export async function cachedFetch<T>( loadEvent: LoadEvent, url: string, expirationTime: number ): Promise<T>
{
    const { fetch, setHeaders } = loadEvent

    let responseText = ""

    try
    {
        const cachedText = await redis.get( url )

        if( false && cachedText )
        {
            console.log( "CACHE HIT for: " + url )

            responseText = cachedText

            const ttl = await redis.ttl( url )

            setHeaders( { 'cache-control': `max-age=${ ttl }` } )
        }
        else
        {
            console.log( "CACHE MISS for: " + url )

            const response = await fetch( url )

            if( !response.ok )
                error( response.status, response.statusText )

            responseText = await response.text()

            const cacheControl = response.headers.get( 'cache-control' )

            if( cacheControl )
            {
                // setHeaders( { 'cache-control': `max-age=${ expirationTime }` } )
                response.headers[ 'cache-control' ] = `public, max-age=${ expirationTime }`

                console.log( response.headers[ 'cache-control' ] )
            }

            console.log( "STORING to redis: " + responseText.length )

            const success = await redis.set( url, responseText, "EX", expirationTime )

            if( success != "OK" )
                error( 500, "Couldnt store in redis!" )
        }

        const jsonData = JSON.parse( responseText )

        return jsonData as T

    }
    catch( error )
    {
        console.error( "error" )
        console.error( error )

        return {} as T
    }
}




