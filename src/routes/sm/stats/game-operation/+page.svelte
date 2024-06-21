<style lang="postcss">
.teamname {
    @apply text-xs md:text-base;
}

h3 {
    @apply mb-8 mt-16 text-2xl;
}

.filter {
    @apply select-none;

    & label {
        @apply cursor-pointer rounded border bg-sf3 px-2 py-1 text-txt;

        &:has(input:checked) {
            @apply border-prim;
        }
        &:has(:not(input:checked)) {
            @apply border-sf2;
        }
        & input {
            display: none;
        }
    }
}
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Spielbetrieb</div>
    <div class="">{data.gameOperation?.name}</div>
    <div class="text-lg text-txt2">Saison {data.currentSeason?.name}</div>
</h2>

<LeagueFilter
    bind:filterEvent="{filter}"
    getLeagueFn="{x => x.league}"
/>

{#if data.leaguesWithGameDays && data.leaguesWithGameDays.length > 0}
    <div class="gap grid items-center justify-center py-8 lg:grid-cols-2 lg:justify-between">
        {#each data.leaguesWithGameDays.filter(filter) as l, lIdx}
            <a
                class="rounded hover:bg-sf2"
                href="/sm/stats/league?id={l.league.id}"
            >
                <div class="text-xs font-bold sm:text-sm md:text-base">{l.league.name}</div>
            </a>
        {/each}
    </div>

    {#each data.leaguesWithGameDays.filter(filter) as l, lIdx}
        <div class="flex justify-center pb-6 pt-16">
            <a
                class="text-center"
                href="/sm/stats/league?id={l.league.id}"
            >
                <div class="text-xl font-bold">{l.league.name}</div>
                <div class="">{l.currentGames[0].game_day}. Spieltag</div>
            </a>
        </div>

        <GameDays scheduledGames="{l.currentGames}"></GameDays>
    {/each}
{/if}

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';
import TeamTable from '$lib/components/sm/TeamTable.svelte';
import GroupedTeamTable from '$lib/components/sm/GroupedTeamTable.svelte';
import GameDays from '$lib/components/sm/GameDays.svelte';
import LeagueFilter from '$lib/components/sm/LeagueFilter.svelte';

export let data;

let filter;
</script>
