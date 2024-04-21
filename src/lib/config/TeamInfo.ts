
export interface TeamInfo
{
    leagueId: number // normale Liga
    cupLeagueId: number // Pokal
    rankingLeagueId: number // PlayOff/PlayDown bzw. Meitserrunde/Platzierungsrunde
    slug: string // für Url etc
    name: string // display-name
    leagueName: string // league display-name
}

export const TeamRegio: TeamInfo =
{
    leagueId: 1396,
    cupLeagueId: -1,
    rankingLeagueId: -1,
    slug: 'Regio',
    name: 'Herren',
    leagueName: 'Herren Regionalliga',
}

export const TeamU11: TeamInfo =
{
    leagueId: 1412,
    cupLeagueId: -1,
    rankingLeagueId: 1475,
    slug: 'U11',
    name: 'U11 Junioren',
    leagueName: 'U11 Kleinfeld Regionalliga',
}

export const TeamU15: TeamInfo =
{
    leagueId: 1406,
    cupLeagueId: -1,
    rankingLeagueId: 1495,
    slug: 'U15',
    name: 'U15 Junioren',
    leagueName: 'U15 Kleinfeld Regionalliga',
}

const SeasonTeams_2324: TeamInfo[] = [
    TeamRegio,
    TeamU15,
    TeamU11,
]

export const SeasonTeams: TeamInfo[] = SeasonTeams_2324

export function getTeamBySlug( slug: string ) : TeamInfo | undefined
{
    return SeasonTeams.find( x => x.slug.toLowerCase() === slug.toLowerCase() )
}


