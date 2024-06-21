import type { PageServerLoadEvent } from './$types'
import { Saisonmanager as SM } from 'floorball-saisonmanager'
import { SmData } from '$lib/sm/data'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { url } = serverLoadEvent
    const leagueId = Number( url.searchParams.get( 'id' ) ?? -1 )

    const init = await SmData.getInit()
    const league = await SmData.getLeague( leagueId )
    const currentSeasonId = init?.current_season_id ?? 15 // TODO: make this configurable in case init.json changes?
    const leagueSeasonId = Number( league?.season_id ?? currentSeasonId.toString() )
    const leagueType = league?.league_type as SM.LeagueType

    return {
        league,
        // init,
        // leagueSeasonId,
        gameOpLogo: init?.game_operations.find( x => x.id === league.game_operation_id)?.logo_url ?? "",
        leagueType,
        leagueName: league?.name ?? '',
        seasonName: init?.seasons?.find( x => x.id == leagueSeasonId )?.name ?? '',

        leagueSchedule: SmData.getLeagueSchedule( leagueId ),
        leagueScorer: SmData.getLeagueScorer( leagueId ),
        leagueTable:
            leagueType != SM.LeagueType.Cup ? SmData.getLeagueTeamTable( leagueId ) : undefined,
        leagueGroupedTable:
            leagueType == SM.LeagueType.Champ
                ? SmData.getLeagueGroupedTeamTable( leagueId )
                : undefined,
    }
}

