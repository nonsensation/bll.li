import type { SM } from 'floorball-saisonmanager'

export interface GameCardInfo
{
    gameId: number

    leagueId: number
    leagueSlug: string
    leagueName: string
    leagueShortName: string

    scoreHome: number
    scoreGuest: number

    nameHome: string
    nameGuest: string

    matchDate: string
    matchDay: number
    matchTime: string

    isUpcoming: boolean
    isLive: boolean
    isToday: boolean
    isFinished: boolean

    imgLogoHome: string
    imgLogoGuest: string
}
