export const LeagueId_Regio = 1396 // Regio
export const LeagueId_u11_1 = 1412 // U11 St. 2
export const LeagueId_u11_2 = 1475 // U11 Platzierungsrunde
export const LeagueId_u15 = 1406 // U15 St. 2

export const Slug_Ost = 'ost'


export enum ResponseType
{
    Json = 'json', // should match route '/proxy/sm/json'
    Image = 'image', // should match route '/proxy/sm/image'
}


export function getSmUrl( url: string , useProxiedCache: boolean , responseType: ResponseType ): string
{
    if( useProxiedCache )
    {
        url = `/proxy/sm/${responseType}?url=${encodeURIComponent(url)}`
    }

    // console.warn( `getSmUrl: ${url}` )

    return url
}

export function getSmJsonUrl( url: string , useProxiedCache: boolean = true ): string
{
    return getSmUrl( url , useProxiedCache , ResponseType.Json )
}

export function getSmImageUrl( url: string , useProxiedCache: boolean = true ): string
{
    return getSmUrl( url , useProxiedCache , ResponseType.Image )
}

