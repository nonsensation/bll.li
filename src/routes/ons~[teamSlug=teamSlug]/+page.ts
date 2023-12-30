
import { Sm, type TeamMatchInfo } from '$lib/Saisonmanger'
import { SeasonTeams, getTeamBySlug } from '$lib/config/TeamInfo'
import type { GameCardInfo } from '$lib/types'
import { error, type LoadEvent } from '@sveltejs/kit'


export async function load( loadEvent: LoadEvent )
{
    const { teamSlug } = loadEvent.params

    if( !teamSlug )
    {
        error( 404, `Team-Slug not found in URL!` )
    }

    const team = getTeamBySlug( teamSlug )

    if( !team )
    {
        const validSlugs = SeasonTeams.map( x => x.slug )

        error( 404, `Team-Slug of '${ teamSlug }' is not a valid Team! (valid: ${ validSlugs })` )
    }

    const sm = new Sm( loadEvent )

    sm.upcomingGamesCount = 1
    sm.finishedGamesCount = 1

    const teamMatchInfo: TeamMatchInfo = await sm.getGameCards( team )

    teamMatchInfo.team = team

    return teamMatchInfo
}
