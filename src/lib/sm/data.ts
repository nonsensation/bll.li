
import { Saisonmanager as SM } from 'floorball-saisonmanager'


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

export async function fetchData( requestUrl: string, forceDownload: boolean = false )
{
    const apiUrls = [
        `https://bll.wik.li/cachedDownload.php?forceDownload=${ forceDownload ? 1 : 0 }&url=https://saisonmanager.de/api/v2`,
        `https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data/api/v2`,
        `https://saisonmanager.de/api/v2`,
    ]

    for( const apiUrl of apiUrls )
    {
        const url = `${ apiUrl }/${ requestUrl }`

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


export const SmData = {
    getLeague: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.LeagueWithSimilarLeagues
    },

    getLeagueGroupedTeamTable: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueGroupedTableUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.GroupedTable
    },

    getInit: async () =>
    {
        const data = await fetchData( SM.getInitUrl() )

        if( data && data.success && data.data ) return data.data as SM.Init
    },

    getLeagueTeamTable: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueTableUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.Team[]
    },

    getLeagueSchedule: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueScheduleUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.ScheduledGame[]
    },

    getLeagueScorer: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueScorerUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.Scorer[]
    },
}
