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

export async function fetchData( requestUrl: string, forceDownload: boolean = true )
{
    const apiUrls = [
        // `https://bll.wik.li/cachedDownload.php?forceDownload=${ forceDownload ? 1 : 0 }&url=https://saisonmanager.de/api/v2`,
        // `https://raw.githubusercontent.com/nonsensation/floorball-saisonmanager-data/main/data/api/v2`,
        `https://saisonmanager.de/api/v2/`,
    ]

    for( const apiUrl of apiUrls )
    {
        const url = `${ apiUrl }/${ requestUrl }`

        try
        {
            const data: ApiGetResponse = await fetch( url )
                .then( response => response.json() )
                .then( json =>
                {
                    return {
                        success: true,
                        data: json,
                    } as DataProps
                } )
                .catch( err =>
                {
                    return {
                        success: false,
                        error: err,
                    } as ErrorProps
                } )

            return data
        } catch( error )
        {
            console.error( `Error fetching data: ${ url }`, error )

            return {
                success: false,
                error: `Error fetching data: ${ url }`,
            } as ErrorProps
        }
    }
}

export const SmData = {
    getGame: async ( gameId: number ) =>
    {
        const data = await fetchData( SM.getGameUrl( gameId ) )

        console.debug( data )

        if( data && data.success && data.data ) return data.data as SM.Game
    },

    getLeague: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.LeagueWithSimilarLeagues
    },

    getLeagues: async () =>
    {
        const data = await fetchData( SM.getLeaguesUrl() )

        if( data && data.success && data.data ) return data.data as SM.LeaguePreview[]
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
        return []
    },

    getLeagueSchedule: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueScheduleUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.ScheduledGame[]
        return []
    },

    getLeagueScorer: async ( leagueId: number ) =>
    {
        const data = await fetchData( SM.getLeagueScorerUrl( leagueId ) )

        if( data && data.success && data.data ) return data.data as SM.Scorer[]
        return []
    },

    getGameOperationLeagues: async ( gameOperationId: number ) =>
    {
        const data = await fetchData( SM.getGameOperationLeaguesUrl( gameOperationId ) )

        if( data && data.success && data.data ) return data.data as SM.League[]
        return []
    },

    getLeagueGameDayScheduledGames: async ( leagueId: number, gameDay: number | 'current' ) =>
    {
        const data = await fetchData( SM.getLeagueGameDayScheduleUrl( leagueId, gameDay ) )

        if( data && data.success && data.data ) return data.data as SM.ScheduledGame[]
        return []
    },
}
