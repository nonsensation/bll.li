import type { SM } from "floorball-saisonmanager"


export interface GameCard
{
    league: SM.League
    matchResult: SM.MatchResult
    isUpcoming: boolean
    isToday: boolean
    isFinished: boolean
    imgDataLogoHome?: string
    imgDataLogoGuest?: string
}

