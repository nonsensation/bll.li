export type ApiGetResponse = {
    success: boolean
} & ( DataProps | ErrorProps )

export type DataProps = {
    success: true
    source: 'url' | 'local-cache'
    data: any
}

export type ErrorProps = {
    success: false
    error: string
}

export async function fetchData(
    requestUrl: string,
    forceDownload: boolean = false
)
{
    const apiVersion = `api/v2`

    const apiUrls = [
        `https://bll.wik.li/cachedDownload.php?forceDownload=${ forceDownload ? 1 : 0 }&url=https://saisonmanager.de`,
        `https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data`,
        `https://saisonmanager.de`,
    ]

    for( const apiUrl of apiUrls )
    {
        const url = `${ apiUrl }/${ apiVersion }/${ requestUrl }`

        console.log( `fetching: ${ url }` )

        try
        {
            const data: ApiGetResponse = await fetch( url )
                .then( response => response.json() )
                .then( json => json as ApiGetResponse )
                .catch( err =>
                {
                    return {
                        success: false,
                        error: err,
                    } as ApiGetResponse
                } )

            return data
        } catch( error )
        {
            console.error( `Error fetching data: ${ url }`, error )

            return {
                success: false,
                error: `Error fetching data: ${ url }`,
            } as ApiGetResponse
        }
    }
}
