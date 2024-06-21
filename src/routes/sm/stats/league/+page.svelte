<style lang="postcss">
.teamname {
    @apply text-xs md:text-base;
}

h3 {
    @apply mb-8 mt-16 text-2xl;
}
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Liga</div>
    <div class="">{data.leagueName}</div>
    <div class="text-lg text-txt2">Saison {data.seasonName}</div>
    <a
        class="text-lg text-txt2 inline-block"
        title="{data.league?.game_operation_name}"
        href="/sm/stats/game-operation?id={data.league?.game_operation_id}"
    >
        <img
            src="{data.gameOpLogo}"
            alt="Spielbetrieb: {data.league?.game_operation_name}"
            class="h-[5rem]"
        />
    </a>
</h2>

{#await data.leagueTable}
    <div class="">Lade leagueTable</div>
{:then leagueTable}
    {#if leagueTable && leagueTable.length > 0}
        <h3>
            {#if data.leagueType == SM.LeagueType.League}
                Tabelle
            {:else}
                Platzierung
            {/if}
        </h3>
        <TeamTable teams="{leagueTable}" />
    {/if}

    {#await data.leagueScorer}
        <div class="">Lade leagueScorer</div>
    {:then leagueScorer}
        {#if leagueScorer && leagueScorer.length > 0}
            <h3>Topscorer</h3>
            <Scorer
                scorer="{leagueScorer}"
                teamIdLogoMap="{getLogos(leagueTable ?? [])}"
            />
        {/if}
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
{:catch error}
    <p>Something went wrong: {error.message}</p>
{/await}

{#if data.leagueGroupedTable}
    {#await data.leagueGroupedTable}
        <div class="">Lade leagueGroupedTable</div>
    {:then leagueGroupedTable}
        {#await data.leagueSchedule}
            Lade leagueSchedule
        {:then leagueSchedule}
            <GroupedTeamTable
                groupedTable="{leagueGroupedTable}"
                scheduledGames="{leagueSchedule}"
            />
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
{:else if data.leagueSchedule}
    {#await data.leagueSchedule}
        <div class="">Lade leagueSchedule</div>
    {:then leagueSchedule}
        <GameDays
            scheduledGames="{leagueSchedule}"
            reverseDays="{leagueType == SM.LeagueType.Cup}"
        />
    {:catch error}
        <p>Something went wrong: {error.message}</p>
    {/await}
{/if}

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';
import TeamTable from '$lib/components/sm/TeamTable.svelte';
import GroupedTeamTable from '$lib/components/sm/GroupedTeamTable.svelte';
import GameDays from '$lib/components/sm/GameDays.svelte';
import Scorer from '$lib/components/sm/Scorer.svelte';

export let data;

const { leagueType } = data;

function getLogos(teams: SM.Team[]) {
    return (
        teams.reduce(
            (map, team) => {
                map[team.team_id ?? -1] = team.team_logo ?? '';
                return map;
            },
            {} as Record<number, string>
        ) ?? {}
    );
}
</script>
