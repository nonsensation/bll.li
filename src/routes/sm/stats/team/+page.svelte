<style lang="postcss">
</style>

<!-- {JSON.stringify(data)} -->

<h2>{data.team.TeamName}</h2>
<h3>Liga: <a href="/sm/stats/league?id={data.team.LeagueId}">{data.team.LeagueName}</a></h3>
<div class="">Saison: {data.team.SeasonName}</div>
<!-- <img src={data.team.LogoUrl} alt="Team-Logo" /> -->

Clubs:
<ul>
    {#each data.clubs as club}
        <li><a href="/sm/stats/club?id={club.Id}">{club.Name}</a></li>
    {/each}
</ul>

{#if data.leagueTable && data.leagueTable.length > 0}
    Tabelle:
    <ul>
        {#each data.leagueTable as team}
            <li><a href="/sm/stats/team?id={team.Id}">#{team.Position} - {team.Name}</a></li>
        {/each}
    </ul>
{/if}

{#if data.scorer && data.scorer.length > 0}
    Spieler:
    <ul>
        {#each data.scorer as scorer}
            <li>
                <a href="/sm/stats/player?id={scorer.PlayerId}"
                    >{scorer.FirstName}
                    {scorer.LastName} ({scorer.Games} Spiele, {scorer.Goals} Tore, {scorer.Assists} Vorlagen)</a
                >
            </li>
        {/each}
    </ul>
{/if}

<script lang="ts">
    export let data;
</script>
