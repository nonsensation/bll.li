
// import { SM } from 'floorball-saisonmanager'


// export async function load({ fetch }) {


//     // const response = await fetch('$SM/api/v2/leagues.json?url')
//     // const leagues = await response.json() as SM.LeaguePreview[]

//     const response = await import( /* @vite-ignore */ '/floorball-saisonmanager-data/data/api/v2/leagues.json' )
//     const leagues = response.default as SM.LeaguePreview[]

//     leagues.sort((lhs, rhs) => {
//         const seasonComparison = parseInt(rhs.season) - parseInt(lhs.season);
        
//         if( seasonComparison !== 0 )
//             return seasonComparison;

//         const orderKeyComparison = parseInt(lhs.order_key) - parseInt(rhs.order_key);
        
//         if( orderKeyComparison !== 0 )
//             return orderKeyComparison;

//         return 0;
//     });

//     const currentSeason = leagues[0].season;
//     const currentLeagues = leagues.filter(league => league.season === currentSeason);
//     const groupedLeagues: any = {};

//     leagues.forEach(item => {
//         if (!groupedLeagues[item.game_operation])
//             groupedLeagues[item.game_operation] = [];
//         groupedLeagues[item.game_operation].push(item);
//     });

// 	return {
//         currentSeason,
//         currentLeagues,
//         groupedLeagues,
//         leagues,
//     };
// }
