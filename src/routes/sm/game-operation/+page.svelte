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
    {@const leaguesWithGameDays = data.leaguesWithGameDays.filter(filter)}
    {#if leaguesWithGameDays && leaguesWithGameDays.length > 0}
        <div class="flex flex-col py-8 gap-1 lg:grid-cols-2 lg:justify-between odd:*:bg-sf3">
            {#each leaguesWithGameDays as l, lIdx}
                <a
                    class="rounded hover:bg-sf2 p-1"
                    href="/sm/league?id={l.league.id}"
                >
                    <div class="text-xs sm:text-sm md:text-base">{l.league.name}</div>
                </a>
            {/each}
        </div>

        {#each leaguesWithGameDays as l, lIdx}
            {#if l.currentGames && l.currentGames.length > 0}
                <div class="flex justify-center pb-6 pt-16">
                    <a
                        class="text-center"
                        href="/sm/league?id={l.league.id}"
                    >
                        <div class="text-2xl font-bold">{l.league.name}</div>
                        <div class="text-lg font-bold text-txt2">
                            {l.currentGames[0].game_day}. Spieltag
                        </div>
                        <div class="text-txt2">{getGameDayDate(l.currentGames)}</div>
                    </a>
                </div>

                <GameDays
                    showArena="{false}"
                    scheduledGames="{l.currentGames.filter(x => x.notice_type !== 'Canceled')}"
                ></GameDays>
            {/if}
        {/each}
    {/if}
{/if}

{#if data.allLeagues && data.allLeagues.length > 0}
    {@const legacyLeagues = data.allLeagues
        .filter(x => x.season != String(data.currentSeasonId))
        .filter(x => x.operation_id === data.gameOperation?.id)
        }
    {#if legacyLeagues && legacyLeagues.length > 0}
        <h2>Vergangene Saisons</h2>
        <div class="flex flex-col gap-2">
            {#each groupBy(legacyLeagues, 'season').toReversed() as llg}
            <details class="flex flex-col border rounded cursor-pointer hover:border-prim">
                <summary class="p-4 font-bold">Saison: {data.init?.seasons?.find( x => x.id == Number( llg.key ))?.name ?? ""}</summary>
                <div class="flex flex-col odd:*:bg-sf3">
                    {#each llg.values.toReversed() as l}
                        <!-- <div class="">{JSON.stringify(l)}</div> -->
                        <a href="/sm/league?id={l.id}" class="p-2 rounded hover:bg-sf2">{l.name}</a>
                    {/each}
                </div>
            </details>
            {/each}
        </div>
    {/if}
{/if}

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';
import TeamTable from '$lib/components/sm/TeamTable.svelte';
import GroupedTeamTable from '$lib/components/sm/GroupedTeamTable.svelte';
import GameDays from '$lib/components/sm/GameDays.svelte';
import LeagueFilter from '$lib/components/sm/LeagueFilter.svelte';
import { groupBy } from '$lib/utils';

export let data;

let filter;

function getGameDayDate(games: SM.ScheduledGame[]) {
    const dates = games.filter(x => x.date != null).map(game => new Date(game.date ?? Date.now()));
    const earliestDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const latestDate = new Date(Math.max(...dates.map(date => date.getTime())));

    const formatDate = dateStr => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            // year: 'numeric',
        };
        return date.toLocaleDateString('de-DE', options);
    };

    if (earliestDate.getTime() === latestDate.getTime()) {
        return formatDate(earliestDate) + ' ' + earliestDate.getFullYear();
    } else if (earliestDate.getMonth() === latestDate.getMonth()) {
        const earliestFormatted = formatDate(earliestDate);
        const latestFormatted = formatDate(latestDate);
        return `${earliestFormatted} bis ${latestFormatted} ${latestDate.getFullYear()}`;
    } else if (earliestDate.getFullYear() === latestDate.getFullYear()) {
        const earliestFormatted = formatDate(earliestDate);
        const latestFormatted = formatDate(latestDate);
        return `${earliestFormatted} bis ${latestFormatted} ${latestDate.getFullYear()}`;
    } else {
        const earliestFormatted = formatDate(earliestDate);
        const latestFormatted = formatDate(latestDate);
        return `${earliestFormatted} ${earliestDate.getFullYear()} bis ${latestFormatted} ${latestDate.getFullYear()}`;
    }
}
</script>
