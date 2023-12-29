import type { SM } from 'floorball-saisonmanager'

export interface GameCardInfo
{
    gameId: number

    leagueId: number
    leagueSlug: string
    leagueName: string

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

export interface GameCardv1
{
    league: SM.League
    matchResult: SM.MatchResult
    isUpcoming: boolean
    isToday: boolean
    isFinished: boolean
    imgDataLogoHome?: string
    imgDataLogoGuest?: string
}
