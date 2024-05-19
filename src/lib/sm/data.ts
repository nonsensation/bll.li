

export async function fetchData<T>( fetch: ( url: string ) => Promise<Response>, requestUrl: string )
{
    const apiVersion = `api/v2`
    const staticUrl = `https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data`
    const liveUrl = `https::saisonmanager.de`

    const apiUrls = [
        staticUrl,
        liveUrl,
    ]

    for( const apiUrl of apiUrls )
    {
        const url = `${ apiUrl }/${ apiVersion }/${ requestUrl }`

        console.log( `fetching: ${ url }` )

        try
        {
            return fetch( url )
                .then( r => r.json() )
                .then( j => j as T )
                .catch( err => console.log( err ) )
        } catch( error )
        {
            console.error( `Error fetching data: ${ url }`, error )
        }
    }
}