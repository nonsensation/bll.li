import type { PageServerLoadEvent } from './$types'
import { SmData } from '$lib/sm/data'
import { Saisonmanager as SM } from 'floorball-saisonmanager'

export async function load( serverLoadEvent: PageServerLoadEvent )
{
    const { fetch, url } = serverLoadEvent

    const init = await SmData.getInit()

    return {
        init,
    }
}
