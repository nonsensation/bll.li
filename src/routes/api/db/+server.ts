import { MYSQL_HOST, MYSQL_USERNAME, MYSQL_DATABASE, MYSQL_PASSWORD } from '$env/static/private'
import { json } from '@sveltejs/kit'

// Thanks to https://www.youtube.com/watch?v=9i38FPugxB8&t=308s
type MySqlPostResponse = {
    success: boolean
} & ( DataProps | ErrorProps )

type DataProps = {
    success: true
    data: any
}

type ErrorProps = {
    success: false
    error: string
}

export async function POST( { fetch, request } )
{
    const apiUrl = 'https://bll.wik.li'

    const queryStr = await request.text()

    console.info( queryStr )

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
                throw new Error( 'Network response was not ok: ' + response.statusText )
            }

            return response.json()
        } )
        .then( jsonResponse =>
        {
            const response = jsonResponse as MySqlPostResponse

            if( !response.success )
            {
                throw new Error( 'MYSQL Error: ' + response.error )
            }

            return response.data
        } )
        .catch( error =>
        {
            console.error( 'There was a problem with the fetch operation:', error )
        } )

    return json( dbData )
}
