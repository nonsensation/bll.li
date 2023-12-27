// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true



import { SM } from 'floorball-saisonmanager'
import { LeagueId_Regio, LeagueId_u11_1, LeagueId_u11_2 } from '$lib/Saisonmanger'
import type { LoadEvent } from '@sveltejs/kit'
import type { GameCard } from '$lib/types'


export async function load( loadEvent: LoadEvent )
{
    const { fetch , setHeaders } = loadEvent

    const upcomingGamesCount = 1
    const finishedGamesCount = 2
    const teamName = "Black Lions Landsberg"

    const games_regio = await prepareGames( fetch, LeagueId_Regio, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u11_1 = await prepareGames( fetch, LeagueId_u11_1, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u11_2 = await prepareGames( fetch, LeagueId_u11_2, upcomingGamesCount, finishedGamesCount, teamName )


    const _g = games_regio[ 0 ]
    const _logoUrl = SM.UrlBuilder.getLogoUrl( _g.matchResult.guest_team_logo )
    console.log( _logoUrl )
    const _logoResponse = await fetch( _logoUrl )

    debugger







    const upcomingGames = games_regio.filter( g => g.isUpcoming )
        .concat( games_u11_1.filter( g => g.isUpcoming ) )
        .concat( games_u11_2.filter( g => g.isUpcoming ) )
        .sort( ( gc1, gc2 ) => gc1.matchResult.date.localeCompare( gc2.matchResult.date ) )

    const finishedGames = games_regio.filter( g => !g.isUpcoming )
        .concat( games_u11_1.filter( g => !g.isUpcoming ) )
        .concat( games_u11_2.filter( g => !g.isUpcoming ) )
        .sort( ( gc1, gc2 ) => gc1.matchResult.date.localeCompare( gc2.matchResult.date ) )
        .toReversed()

    return {
        upcomingGames,
        finishedGames,
    }
}

async function prepareGames( fetch: LoadEvent[ "fetch" ], leagueId: number, upcomingGamesCount: number , finishedGamesCount: number, teamName: string )
    : Promise<GameCard[]>
{
    const currentDateStr = new Date().toISOString().split( 'T' )[ 0 ] // 2023-12-27T09:57:34.671Z

    const leagueUrl = SM.UrlBuilder.getLeagueUrl( leagueId )
    const leagueResponse = await fetch( leagueUrl )
    const league: SM.League = await leagueResponse.json()

    const gamesUrl = SM.UrlBuilder.getMatchSheduleUrl( leagueId )
    const gamesResponse = await fetch( gamesUrl )
    const games: SM.MatchResult[] = await gamesResponse.json()

    const filteredGames = games.filter( g => g.home_team_name === teamName || g.guest_team_name === teamName )

    let upcomingGames = filteredGames.filter( g => g.date.localeCompare( currentDateStr ) >= 0 )
    let finishedGames = filteredGames.filter( g => g.date.localeCompare( currentDateStr ) < 0 )

    upcomingGames = upcomingGames.sort( ( g1, g2 ) => g1.date.localeCompare( g2.date ) )
    finishedGames = finishedGames.sort( ( g1, g2 ) => g1.date.localeCompare( g2.date ) )

    finishedGames.reverse()

    if( upcomingGamesCount > 0 )
        upcomingGames = upcomingGames.slice( 0, upcomingGamesCount )

    if( finishedGamesCount > 0 )
        finishedGames = finishedGames.slice( 0, finishedGamesCount )

    const gs = [
        ...upcomingGames ,
        ...finishedGames ,
    ]

    const gameCards = gs.map( game => ( {
        league,
        matchResult: game,
        isUpcoming: game.date.localeCompare( currentDateStr ) > 0,
        isToday: game.date.localeCompare( currentDateStr ) == 0,
        isFinished: game.date.localeCompare( currentDateStr ) < 0,
    } as GameCard ) )

    return gameCards
}