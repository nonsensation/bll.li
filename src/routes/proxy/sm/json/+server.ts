
import axios from 'axios'
import type { RequestEvent } from '../../$types'
import { cacheControl } from '../config'


const responseType = 'text'

const headers = {
    'Content-Type': 'text/text',
    'Cache-Control': cacheControl,
}


export async function GET( requestEvent: RequestEvent )
{
    try
    {
        const url = requestEvent.url.searchParams.get( 'url' )

        if( !url )
        {
            console.error( `ERROR: couldnt find url as query param.` )

            return new Response( 'Internal Server Error', { status: 500 } )
        }

        console.info( `/proxy/sm/json/GET: ${url}` )

        const response = await axios.get( url, { responseType } )

        return new Response( response.data, { status: 200, headers } )
    }
    catch( error )
    {
        console.error( error )

        return new Response( 'Internal Server Error', { status: 500 } )
    }
}
