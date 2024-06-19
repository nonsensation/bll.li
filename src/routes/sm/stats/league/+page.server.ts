import * as schema from '$mysql/schema'
import { and, asc, desc, eq, getTableColumns, gt, inArray, like, or } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { db, fetchFromMyDb, qb } from '$mysql/db'
import { QueryBuilder, alias } from 'drizzle-orm/mysql-core'
import type { PageServerLoadEvent } from './$types'
import { Saisonmanager as SM } from 'floorball-saisonmanager'
import { fetchData } from '$lib/sm/data'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent
    const leagueId = Number( url.searchParams.get( 'id' ) ?? -1 )

    const init = await getInit()
    const league = await getLeague( leagueId );
    const currentSeasonId = init?.current_season_id ?? 15; // TODO: make this configurable in case init.json changes?
    const leagueSeasonId = Number( league?.season_id ?? currentSeasonId.toString() );
    const leagueType = league?.league_type as SM.LeagueType;

    return {
        // league,init,leagueSeasonId,
        leagueType,
        leagueName: league?.name ?? "",
        seasonName: init?.seasons?.find( x => x.id == leagueSeasonId )?.name ?? "",
        leagueSchedule: await getLeagueSchedule( leagueId ) ,
        leagueTable: await getLeagueTeamTable( leagueId ) ,
        leagueScorer: await getLeagueScorer( leagueId ) ,
        leagueGroupedTable:
            leagueType == SM.LeagueType.Champ
                ? await getLeagueGroupedTeamTable( leagueId )
                : undefined,
    }
}

async function getLeague( leagueId: number )
{
    const data = await fetchData( SM.getLeagueUrl( leagueId , '' ) )

    if( !data ) return
    if( !data.success ) return
    if( !data.data ) return

    return data.data as SM.LeagueWithSimilarLeagues
}

async function getLeagueGroupedTeamTable( leagueId: number )
{
    const data = await fetchData( SM.getLeagueGroupedTableUrl( leagueId , '' ) )

    if( !data ) return
    if( !data.success ) return
    if( !data.data ) return

    return data.data as SM.GroupedTable
}

async function getInit()
{
    const data = await fetchData( SM.getInitUrl( '' ) )

    if( !data ) return
    if( !data.success ) return
    if( !data.data ) return

    return data.data as SM.Init
}

async function getLeagueTeamTable( leagueId: number )
{
    const data = await fetchData( SM.getLeagueTableUrl( leagueId , '' ) )

    if( !data ) return
    if( !data.success ) return
    if( !data.data ) return

    return data.data as SM.Team[]
}

async function getLeagueSchedule( leagueId: number )
{
    const data = await fetchData( SM.getLeagueScheduleUrl( leagueId , '' ) )

    if( !data ) return
    if( !data.success ) return
    if( !data.data ) return

    return data.data as SM.ScheduledGame[]
}

async function getLeagueScorer( leagueId: number )
{
    const data = await fetchData( SM.getLeagueScorerUrl( leagueId , '' ) )

    if( !data ) return
    if( !data.success ) return
    if( !data.data ) return

    return data.data as SM.Scorer[]
}
