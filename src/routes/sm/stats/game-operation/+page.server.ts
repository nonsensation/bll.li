import type { PageServerLoadEvent } from './$types'
import { Saisonmanager as SM } from 'floorball-saisonmanager'
import { SmData } from '$lib/sm/data'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const goId = Number( url.searchParams.get( 'id' ) ?? -1 )

    const init = await SmData.getInit()
    const gameOperation = init?.game_operations?.find( x => x.id == goId )
    const currentSeasonId = init?.current_season_id ?? 15 // TODO: make this configurable in case init.json changes?
    const leagues = await SmData.getGameOperationLeagues( goId )
    const leaguesWithGameDays = leagues.map( async league =>
    {
        const currentGames = await SmData.getLeagueGameDayScheduledGames( league.id, 'current' )
        return { league, currentGames }
    } )

    return {
        init,
        currentSeason: init?.seasons?.find( x => x.current ),
        currentSeasonId,
        gameOperation,
        leagues,
        leaguesWithGameDays: await Promise.all( leaguesWithGameDays ) ,
    }
}
