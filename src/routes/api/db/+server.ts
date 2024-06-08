import { MYSQL_HOST, MYSQL_USERNAME, MYSQL_DATABASE, MYSQL_PASSWORD } from '$env/static/private'
import { json } from '@sveltejs/kit'
import { type MySqlPostResponse } from '$mysql/db'

export async function POST( { fetch, request } )
{
    // const apiUrl = 'https://bll.wik.li'
    const apiUrl = 'https://bll.wik.li'

    const queryStr = await request.text()

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

    const dbData: MySqlPostResponse = await fetch( apiUrl, options )
        .then( response =>
        {
            if( !response.ok )
            {
                // throw new Error( 'Network response was not ok: ' + response.statusText )
                return {
                    success: false,
                    error: 'Network response was not ok: ' + response.statusText,
                } as MySqlPostResponse
            }

            return response.json()
        } )
        .then( jsonResponse =>
        {
            const response = jsonResponse as MySqlPostResponse

            if( !response.success )
            {
                // throw new Error( 'MYSQL Error: ' + response.error )
                return {
                    success: false,
                    error: 'MYSQL Error: ' + response.error,
                } as MySqlPostResponse
            }

            return response
        } )
        .catch( error =>
        {
            // console.error( 'There was a problem with the fetch operation:', error )

            return {
                success: false,
                error: 'There was a problem with the fetch operation:' + error,
            } as MySqlPostResponse
        } )

    return json( dbData )
}
