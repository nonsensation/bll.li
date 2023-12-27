// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true


import { SM } from 'floorball-saisonmanager'
import { LeagueId_Regio, LeagueId_u11_1, LeagueId_u11_2 } from '$lib/Saisonmanger'
import type { LoadEvent } from '@sveltejs/kit'
import type { GameCard } from '$lib/types'
import { cachedFetch } from '$lib/server/redis'


const expirationTime = 60


export async function load( loadEvent: LoadEvent )
{
    const { fetch, setHeaders } = loadEvent

    const upcomingGamesCount = 1
    const finishedGamesCount = 1
    const teamName = "Black Lions Landsberg"

    const games_regio = await prepareGames( loadEvent, LeagueId_Regio, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u11_1 = await prepareGames( loadEvent, LeagueId_u11_1, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u11_2 = await prepareGames( loadEvent, LeagueId_u11_2, upcomingGamesCount, finishedGamesCount, teamName )

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

async function getImage( loadEvent: LoadEvent, imgUrl: string ): Promise<string | null>
{
    const { fetch, setHeaders } = loadEvent
    const logoUrl = SM.UrlBuilder.getLogoUrl( imgUrl )

    try
    {
        const logoResponse = await fetch( `/proxy?url=${ encodeURIComponent( logoUrl ) }` )
        const imgData = await logoResponse.arrayBuffer()
        const buffer = Buffer.from( imgData )

        return "data:image/*;base64," + buffer.toString( 'base64' )
    }
    catch( error )
    {
        console.error( error )
    }

    return null
}

async function prepareGames( loadEvent: LoadEvent, leagueId: number, upcomingGamesCount: number, finishedGamesCount: number, teamName: string )
    : Promise<GameCard[]>
{
    const { fetch, setHeaders } = loadEvent
    const currentDateStr = new Date().toISOString().split( 'T' )[ 0 ] // 2023-12-27T09:57:34.671Z

    const leagueUrl = SM.UrlBuilder.getLeagueUrl( leagueId )
    const league: SM.League = await cachedFetch( loadEvent, leagueUrl, expirationTime )

    const gamesUrl = SM.UrlBuilder.getMatchSheduleUrl( leagueId )
    const games: SM.MatchResult[] = await cachedFetch( loadEvent, gamesUrl, expirationTime )

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
        ...upcomingGames,
        ...finishedGames,
    ]

    let gameCards: GameCard[] = []

    for( const game of gs )
    {
        // const imgDataLogoHome = await getImage( loadEvent, game.guest_team_logo )
        // const imgDataLogoGuest = await getImage( loadEvent, game.home_team_logo )

        const gameCard = {
            league,
            matchResult: game,
            isUpcoming: game.date.localeCompare( currentDateStr ) > 0,
            isToday: game.date.localeCompare( currentDateStr ) == 0,
            isFinished: game.date.localeCompare( currentDateStr ) < 0,
            // imgDataLogoHome,
            // imgDataLogoGuest,
        } as GameCard

        gameCards.push( gameCard )
    }

    return gameCards
}