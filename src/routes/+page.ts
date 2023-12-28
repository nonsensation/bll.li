
import { SM } from 'floorball-saisonmanager'
import { LeagueId_Regio, LeagueId_u11_1, LeagueId_u11_2, LeagueId_u15, getSmJsonUrl, getSmUrl } from '$lib/Saisonmanger'
import type { LoadEvent } from '@sveltejs/kit'
import type { GameCard } from '$lib/types'
// import { cachedFetch } from '$lib/server/redis'

const expirationTime = 60 * 60

export async function load( loadEvent: LoadEvent )
{
    const upcomingGamesCount = 1
    const finishedGamesCount = 3
    const teamName = 'Black Lions Landsberg'

    const games_regio = await prepareGames( loadEvent, LeagueId_Regio, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u11_1 = await prepareGames( loadEvent, LeagueId_u11_1, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u11_2 = await prepareGames( loadEvent, LeagueId_u11_2, upcomingGamesCount, finishedGamesCount, teamName )
    const games_u15 = await prepareGames( loadEvent, LeagueId_u15, upcomingGamesCount, finishedGamesCount, teamName )

    const gameCardSorter = ( a: GameCard, b: GameCard ) => matchResultSorter( a.matchResult, b.matchResult )

    const games = [ ...games_regio, ...games_u11_1, ...games_u11_2, ...games_u15 ].sort( gameCardSorter )

    const liveGames = games.filter( ( g ) => g.isToday )
    const upcomingGames = games.filter( ( g ) => g.isUpcoming )
    const finishedGames = games.filter( ( g ) => !g.isUpcoming ).toReversed()

    return {
        liveGames,
        upcomingGames,
        finishedGames,
    }
}

const matchResultSorter = ( a: SM.MatchResult, b: SM.MatchResult ): number =>
{
    const dateComparison = a.date.localeCompare( b.date )

    if( dateComparison != 0 ) return dateComparison

    const timeComparison = a.time.localeCompare( b.time )

    return timeComparison
}

async function getImage( loadEvent: LoadEvent, imgUrl: string ): Promise<string | null>
{
    const { fetch } = loadEvent
    const logoUrl = SM.UrlBuilder.getLogoUrl( imgUrl )

    try
    {
        const logoResponse = await fetch( `/proxy?url=${ encodeURIComponent( logoUrl ) }` )
        const imgData = await logoResponse.arrayBuffer()
        const buffer = Buffer.from( imgData )

        return 'data:image/*;base64,' + buffer.toString( 'base64' )
    } catch( error )
    {
        console.error( error )
    }

    return null
}

async function cachedFetch<T>( loadEvent: LoadEvent, url: string, expirationTime: number ): Promise<T>
{
    const { fetch } = loadEvent

    // const smUrl = getSmJsonUrl( url, true )
    const smUrl = url

    const response = await fetch( smUrl )

    if( !response.ok )
    {
        console.error( `response failed for smUrl: ${ smUrl }` )

        return {} as T
    }

    const textData = await response.text()

    try
    {
        const jsonData = JSON.parse( textData )

        const typeData = jsonData as T

        return typeData
    }
    catch( err )
    {
        if( err instanceof SyntaxError )
        {
            console.error( err )
            console.error( "SyntaxError: " + textData )
        }
        else
        {
            console.error( err )
            console.error( textData )
        }
    }

    return {} as T
}

async function prepareGames(
    loadEvent: LoadEvent,
    leagueId: number,
    upcomingGamesCount: number,
    finishedGamesCount: number,
    teamName: string,
): Promise<GameCard[]>
{
    const currentDateStr = new Date().toISOString().split( 'T' )[ 0 ] // 2023-12-27T09:57:34.671Z

    const leagueUrl = SM.UrlBuilder.getLeagueUrl( leagueId )
    const gamesUrl = SM.UrlBuilder.getMatchSheduleUrl( leagueId )

    const league: SM.League = await cachedFetch( loadEvent, leagueUrl, expirationTime )
    const games: SM.MatchResult[] = await cachedFetch( loadEvent, gamesUrl, expirationTime )

    const filteredGames = games
        .filter( ( g ) => g.home_team_name === teamName || g.guest_team_name === teamName )
        .sort( matchResultSorter )

    let liveGames = filteredGames.filter( ( g ) => g.date.localeCompare( currentDateStr ) == 0 )
    let upcomingGames = filteredGames.filter( ( g ) => g.date.localeCompare( currentDateStr ) > 0 )
    let finishedGames = filteredGames.filter( ( g ) => g.date.localeCompare( currentDateStr ) < 0 )

    finishedGames.reverse()

    if( upcomingGamesCount > 0 ) upcomingGames = upcomingGames.slice( 0, upcomingGamesCount )

    if( finishedGamesCount > 0 ) finishedGames = finishedGames.slice( 0, finishedGamesCount )

    const gameCards: GameCard[] = []

    for( const game of [ ...upcomingGames, ...liveGames, ...finishedGames ] )
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
