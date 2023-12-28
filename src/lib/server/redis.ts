import { Redis, ReplyError } from 'ioredis';
import { REDIS_URI } from '$env/static/private';
import { error, type LoadEvent } from '@sveltejs/kit';

// export const redis = new Redis( REDIS_URI )

export async function cachedFetch<T>(loadEvent: LoadEvent, url: string, expirationTime: number): Promise<T> {
    const { fetch, setHeaders } = loadEvent;

    let responseText = '';
    let canUseRedis = false;
    let fetchedFromCache = false;

    try {
        // const cachedText = await redis.get( url )
        // if( cachedText )
        // {
        //     responseText = cachedText
        //     const ttl = await redis.ttl( url )
        //     // setHeaders( { 'cache-control': `max-age=${ ttl }` } )
        //     fetchedFromCache = true
        // }
    } catch (err) {
        if (err instanceof ReplyError) {
            canUseRedis = false;
            console.warn('ReplyError');
        } else {
            canUseRedis = false;
            console.error('err: ' + err);
        }
    }

    try {
        if (!fetchedFromCache) {
            const response = await fetch(url);

            if (!response.ok) {
                error(response.status, response.statusText);
            }

            responseText = await response.text();

            const cacheControl = response.headers.get('cache-control');

            if (cacheControl) {
                // setHeaders( { 'cache-control': `max-age=${ expirationTime }` } )
                response.headers['cache-control'] = `public, max-age=${expirationTime}`;
            }

            if (canUseRedis) {
                // const success = await redis.set( url, responseText, 'EX', expirationTime )
                // if( success != 'OK' )
                // {
                //     error( 500, 'Couldnt store in redis!' )
                // }
            }
        }

        const jsonData = JSON.parse(responseText);

        return jsonData as T;
    } catch (err: any) {
        console.error(err);

        error(500, 'Error!');
    }
}
