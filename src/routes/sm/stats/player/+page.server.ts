import * as schema from '$mysql/schema'
import { and, asc, desc, eq, gt, inArray } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import { db, fetchFromMyDb, qb } from '$mysql/db'
import { alias, type MySqlSelectBase, type MySqlSelectQueryBuilderBase } from 'drizzle-orm/mysql-core'
import { SocketAddress } from 'net'

export async function load( { fetch, url } )
{
    const id = Number( url.searchParams.get( 'id' ) ?? -1 )

    const playerQuery = qb
        .select()
        .from( schema.players )
        .where( eq( schema.players.id, id ) )
        .orderBy( desc( schema.players.id ) )
        .limit( 1 )

    const [ playerData ] = await fetchFromMyDb<ReturnType<typeof playerQuery.$dynamic>, typeof playerQuery._.result>(
        playerQuery.$dynamic(),
        fetch
    )

    const gameStatsQuery = qb
        .select( {
            gameId: schema.gameStats.gameId,
            teamId: schema.gameStats.teamId,
        } )
        .from( schema.gameStats )
        .where( and( eq( schema.gameStats.statsType, 'player' ), eq( schema.gameStats.playerId, id ) ) )

    const gameStats = await fetchFromMyDb<ReturnType<typeof gameStatsQuery.$dynamic>, typeof gameStatsQuery._.result>(
        gameStatsQuery.$dynamic(),
        fetch
    )

    const teamGames = new Map<number,number[]>()

    for( const stat of gameStats )
    {
        if( teamGames.has( stat.teamId! ) )
            teamGames.get( stat.teamId! )?.push( stat.gameId! )
        else
            teamGames.set( stat.gameId! , [stat.gameId!] )
    }

    const gamesQuery = qb
        .select()
        .from( schema.games )
        .where( inArray( schema.games.gameId, Array.from( teamGames.values() ).flat() ) )

    const games = await fetchFromMyDb<ReturnType<typeof gamesQuery.$dynamic>, typeof gamesQuery._.result>(
        gamesQuery.$dynamic(),
        fetch
    )

    const teamsQuery = qb
        .select()
        .from( schema.teams )
        .where( inArray( schema.teams.teamId , [...teamGames.keys()] ) )

    const teams = await fetchFromMyDb<ReturnType<typeof teamsQuery.$dynamic>, typeof teamsQuery._.result>(
        teamsQuery.$dynamic(),
        fetch
    )

    const homeTeams = alias( schema.teams , 'homeTeams' ) 
    const guestTeams = alias( schema.teams , 'guestTeams' ) 

    const leaguesQuery = qb
        .select({
            gameId: schema.games.gameId ,
            homeTeam: homeTeams.name ,
            guestTeam: guestTeams.name ,
            leagueName: schema.leagues.name,
            season: schema.seasons.name,
        })
        .from( schema.leagues )
        .where( inArray( schema.leagues.leagueId, games.map( x => x.leagueId ) ) )
        .leftJoin( schema.games , inArray( schema.games.gameId , games.map( x => x.gameId! ) ) )
        .leftJoin( schema.seasons , eq( schema.leagues.seasonId , schema.seasons.seasonId ) )
        .leftJoin( homeTeams , eq( schema.games.teamHomeId , homeTeams.teamId ) )
        .leftJoin( guestTeams , eq( schema.games.teamGuestId , guestTeams.teamId ) )
        .groupBy( schema.games.gameId )
        .orderBy( schema.games.date )

    const leagues = await fetchFromMyDb<ReturnType<typeof leaguesQuery.$dynamic>, typeof leaguesQuery._.result>(
        leaguesQuery.$dynamic(),
        fetch
    )

    return {
        // foreach season select team + matches + SocketAddress

        playerData,
        gameStats,
        games,
        teams,
        leagues,
    }
}
