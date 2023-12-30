import { SM } from "floorball-saisonmanager"
import type { GameCardInfo } from "./types"
import type { LoadEvent } from "@sveltejs/kit"
import { UrlBuilder } from "floorball-saisonmanager/lib/Saisonmanager/Api"
import type { TeamInfo } from "$lib/config/TeamInfo"

export const LeagueId_Regio = 1396 // Regio
export const LeagueId_u11_1 = 1412 // U11 St. 2
export const LeagueId_u11_2 = 1475 // U11 Platzierungsrunde
export const LeagueId_u15 = 1406 // U15 St. 2

export const Slug_Ost = 'ost'


export enum ResponseType
{
    Json = 'json', // should match route '/proxy/sm/json'
    Image = 'image', // should match route '/proxy/sm/image'
}


export function getSmUrl( url: string, useProxiedCache: boolean, responseType: ResponseType ): string
{
    if( useProxiedCache )
    {
        url = `/proxy/sm/${ responseType }?url=${ encodeURIComponent( url ) }`
    }

    // console.warn( `getSmUrl: ${url}` )

    return url
}

export function getSmJsonUrl( url: string, useProxiedCache: boolean = true ): string
{
    return getSmUrl( url, useProxiedCache, ResponseType.Json )
}

export function getSmImageUrl( url: string, useProxiedCache: boolean = true ): string
{
    return getSmUrl( url, useProxiedCache, ResponseType.Image )
}




export const TEAMNAME = 'Black Lions Landsberg' // filter out team by name in SM


export interface TeamMatchInfo
{
    team: TeamInfo
    liveGames: GameCardInfo[]
    upcomingGames: GameCardInfo[]
    finishedGames: GameCardInfo[]
    todayGames: GameCardInfo[]
}

export class Sm
{
    upcomingGamesCount: number = 1
    finishedGamesCount: number = 1

    loadEvent: LoadEvent
    teamName: string

    constructor ( loadEvent: LoadEvent, teamName: string = TEAMNAME )
    {
        this.loadEvent = loadEvent
        this.teamName = teamName
    }

    getGameCards = async ( team: TeamInfo ): Promise<TeamMatchInfo> =>
    {
        let matches: GameCardInfo[] = []

        const leagueIds = [
            team.leagueId,
            team.cupLeagueId,
            team.rankingLeagueId,
        ]
            .filter( leagueId => leagueId > 0 )

        for( const leagueId of leagueIds )
        {
            const m = await this.prepareGames( leagueId )

            matches = matches.concat( m )
        }

        matches = matches.sort( this.gameCardSorter )

        const liveGames = matches.filter( ( g ) => g.isToday )
        const todayGames = matches.filter( ( g ) => g.isToday )
        const upcomingGames = matches.filter( ( g ) => g.isUpcoming )
        const finishedGames = matches.filter( ( g ) => !g.isUpcoming ).toReversed()

        return {
            liveGames,
            upcomingGames,
            finishedGames,
            todayGames,
        } as TeamMatchInfo
    }

    prepareGames = async ( leagueId: number ): Promise<GameCardInfo[]> =>
    {
        const currentDateStr = new Date().toISOString().split( 'T' )[ 0 ] // 2023-12-27T09:57:34.671Z

        const leagueUrl = SM.UrlBuilder.getLeagueUrl( leagueId )
        const gamesUrl = SM.UrlBuilder.getMatchSheduleUrl( leagueId )

        const league: SM.League = await this.cachedFetch( leagueUrl )
        const games: SM.MatchResult[] = await this.cachedFetch( gamesUrl )

        const filteredGames = games
            .filter( g => g.home_team_name === this.teamName || g.guest_team_name === this.teamName )

        let liveGames = filteredGames.filter( ( g ) => g.date.localeCompare( currentDateStr ) == 0 )
        let upcomingGames = filteredGames.filter( ( g ) => g.date.localeCompare( currentDateStr ) > 0 )
        let finishedGames = filteredGames.filter( ( g ) => g.date.localeCompare( currentDateStr ) < 0 )

        finishedGames.reverse()

        if( this.upcomingGamesCount > 0 )
            upcomingGames = upcomingGames.slice( 0, this.upcomingGamesCount )

        if( this.finishedGamesCount > 0 )
            finishedGames = finishedGames.slice( 0, this.finishedGamesCount )

        let gameCards: GameCardInfo[] = []

        for( const game of [ ...upcomingGames, ...liveGames, ...finishedGames ] )
        {
            // const imgDataLogoHome = await getImage( loadEvent, game.guest_team_logo )
            // const imgDataLogoGuest = await getImage( loadEvent, game.home_team_logo )

            const gameCard = {
                gameId: game.game_id,
                leagueId: league.id,
                leagueSlug: league.game_operation_slug,
                leagueName: league.name,
                scoreHome: game.result?.home_goals ?? 0,
                scoreGuest: game.result?.guest_goals ?? 0,
                matchDate: game.date,
                matchDay: game.game_day,
                matchTime: game.time,
                isUpcoming: game.date.localeCompare( currentDateStr ) > 0,
                isToday: game.date.localeCompare( currentDateStr ) == 0,
                isFinished: game.date.localeCompare( currentDateStr ) < 0,
                isLive: new Date( game.time ).getHours() == 16,
                imgLogoHome: UrlBuilder.getLogoUrl( game.home_team_small_logo ),
                imgLogoGuest: UrlBuilder.getLogoUrl( game.guest_team_small_logo ),
                nameHome: game.home_team_name,
                nameGuest: game.guest_team_name,
            } as GameCardInfo

            gameCards.push( gameCard )
        }

        gameCards = gameCards.sort( this.gameCardSorter )

        return gameCards
    }

    cachedFetch = async <T>( url: string ): Promise<T> =>
    {
        const { fetch } = this.loadEvent
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


    gameCardSorter = ( a: GameCardInfo, b: GameCardInfo ): number =>
    {
        const dateComparison = a.matchDate.localeCompare( b.matchDate )

        if( dateComparison != 0 )
            return dateComparison

        const timeComparison = a.matchTime.localeCompare( b.matchTime )

        return timeComparison
    }

    getImage = async ( imgUrl: string ): Promise<string | null> =>
    {
        const { fetch } = this.loadEvent
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

}






