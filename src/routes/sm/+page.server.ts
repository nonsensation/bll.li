import type { PageServerLoadEvent } from './$types'
import { SmData } from '$lib/sm/data'
import { Saisonmanager as SM } from 'floorball-saisonmanager'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent

    const init = await SmData.getInit()
    const gameOperations = init?.game_operations ?? []
    const leagues = gameOperations.map( async x => await SmData.getGameOperationLeagues( x.id ) )

    return {
        init,
        gameOperations: init?.game_operations ?? [],
        leagues: await Promise.all( leagues ),
    }
}
