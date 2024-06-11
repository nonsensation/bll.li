<style lang="postcss">
</style>

<!-- {JSON.stringify(data)} -->

<h1>{data.team.TeamName}</h1>
<!-- <img src={data.team.LogoUrl} alt="Team-Logo" /> -->

Clubs:
<ul>
    {#each data.clubs as club}
        <li><a href="/sm/stats/club?id={club.Id}">{club.Name}</a></li>
    {/each}
</ul>

Tabelle:
<ul>
    {#each data.leagueTable as team}
        <li><a href="/sm/stats/team?id={team.Id}">#{team.Position} - {team.Name}</a></li>
    {/each}
</ul>

Spieler:
<ul>
    {#each data.scorer as scorer}
        <li><a href="/sm/stats/player?id={scorer.PlayerId}">{scorer.FirstName} {scorer.LastName} ({scorer.Games} Spiele, {scorer.Goals} Tore, {scorer.Assists} Vorlagen)</a></li>
    {/each}
</ul>

<script lang="ts">
    export let data;
</script>
