<style lang="postcss">
</style>

<h2>{data.leagueName} ({data.seasonName})</h2>

{#if data.leagueTable && data.leagueTable.length > 0}
    Tabelle:
    <ul>
        {#each data.leagueTable as team}
            <li><a href="/sm/stats/team?id={team.Id}">#{team.Position} - {team.Name}</a></li>
        {/each}
    </ul>
{/if}

{#if data.leagueScorer && data.leagueScorer.length > 0}
    Scorer:
    <ul>
        {#each data.leagueScorer as s}
            <li>
                <a href="/sm/stats/player?id={s.PlayerId}"
                    >#{s.Position} - {s.FirstName} {s.LastName} | {s.TeamName} ({s.Games} • {s.Goals} • {s.Assists})</a
                >
            </li>
        {/each}
    </ul>
{/if}

{#if data.games && data.games.length > 0}
    Spieltage:
    <ul>
        {#each data.games as g, gameIndex}
            {#if gameIndex % data.leagueTable.length == 0}
                <li>{Math.round(gameIndex / data.leagueTable.length) + 1}. Spieltag</li>
            {/if}
            <li>
                <a href="/sm/match?gameId={g.GameId}">
                    {g.HomeTeamName}
                    {g.HomeGoals} - {g.GuestGoals}
                    {g.GuestTeamName}
                </a>
            </li>
        {/each}
    </ul>
{/if}

<script lang="ts">
    export let data;
</script>
