
import axios from 'axios'
import type { RequestEvent } from '../../$types'
import { cacheControl } from '../config'


const responseType = 'arraybuffer'
const headers = {
    'Content-Type': 'image/*',
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

        // console.warn( `/proxy/sm/image/GET: ${url}` )

        const response = await axios.get( url, { responseType } )
        const data = Buffer.from( response.data, 'binary' )

        return new Response( data, { status: 200, headers } )
    }
    catch( error )
    {
        console.error( error )

        return new Response( 'Internal Server Error', { status: 500 } )
    }
}
