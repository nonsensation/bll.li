import { MYSQL_HOST, MYSQL_USERNAME, MYSQL_DATABASE, MYSQL_PASSWORD } from '$env/static/private'
import { json } from '@sveltejs/kit'
import type { RequestEvent } from './$types'

export async function POST( { fetch, request } )
{
    const apiUrl = 'https://bll.wik.li'

    const queryStr = await request.text()

    // console.dir( queryStr )

    const dbInfo = {
        servername: MYSQL_HOST,
        username: MYSQL_USERNAME,
        password: MYSQL_PASSWORD,
        database: MYSQL_DATABASE,
        queryStr,
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( dbInfo ),
    }

    const dbData = await fetch( apiUrl, options )
        .then( response =>
        {
            if( !response.ok )
            {
                throw new Error( 'Network response was not ok ' + response.statusText )
            }

            const r = response.json()

            return r
        } )
        .then( response =>
        {
            // console.dir( response )

            return response
        } )
        .catch( error =>
        {
            console.error( 'There was a problem with the fetch operation:', error )
        } )

    return json( dbData )
}
