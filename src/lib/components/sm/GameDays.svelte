<style lang="postcss">
.teamname {
    @apply text-xs sm:text-sm md:text-base;
}
</style>

{#if scheduledGames && scheduledGames.length > 0}
    <div
        class="rounded"
        class:odd:*:bg-sf3="{!showGameDayTitle && groups.length == 1}"
    >
        {#each groups as gd}
            {#if groups.length > 1 && showGameDayTitle}
                <div class="text-center">
                    <div class="my-12 text-xl font-bold underline">{gd.key}. Spieltag</div>
                </div>
            {/if}

            <div
                class=""
                class:odd:*:bg-sf3="{showGameDayTitle || groups.length > 1}"
            >
                {#if gd.values}
                    {#each gd.values as g}
                        <a
                            href="/sm/match?gameId={g.game_id}"
                            class="grid grid-cols-[1fr,auto,1fr] items-center justify-center gap-4 rounded"
                        >
                            <div
                                class="flex h-full items-center justify-center gap-4 place-self-end"
                            >
                                <div class="teamname text-right">{g.home_team_name}</div>
                                <img
                                    src="https://bll.wik.li/{g.home_team_logo}"
                                    alt="Logo"
                                    class="m-2 w-12"
                                />
                            </div>
                            <div class="py-2 text-center *:leading-tight">
                                {#if g.result}
                                    <div class="text-xl font-bold">
                                        {g.result?.home_goals ?? 0} - {g.result?.guest_goals ?? 0}
                                    </div>
                                {:else}
                                    <div class="text-xs">
                                        <div class="">{getDate(g.date)}</div>
                                        <div class="hiddenmd:block md:text-base md:font-bold">
                                            {getWeekday(g.date)}
                                        </div>
                                        <div class="md:text-base md:font-bold">
                                            {g.time} Uhr
                                        </div>
                                        {#if showArena}
                                            <div class="hidden md:block">{g.arena_name}</div>
                                            <div class="hidden md:block">{g.arena_address}</div>
                                        {/if}
                                    </div>
                                {/if}
                            </div>
                            <div class="flex items-center gap-4">
                                <img
                                    src="https://bll.wik.li/{g.guest_team_logo}"
                                    alt="Logo"
                                    class="m-2 w-12"
                                />
                                <div class="teamname text-left">{g.guest_team_name}</div>
                            </div>
                        </a>
                    {/each}
                {/if}
            </div>
        {/each}
    </div>
{/if}

<script lang="ts">
import { groupBy } from '$lib/utils';
import type { Saisonmanager as SM } from 'floorball-saisonmanager';

export let scheduledGames: SM.ScheduledGame[] | undefined = [];
export let reverseDays: boolean = false;
export let showArena: boolean = true;
export let showGameDayTitle: boolean = true;

$: groups = groupBy(scheduledGames ?? [], 'game_day');

$: {
    if (reverseDays) groups = groups.toSorted((a, b) => Number(b.key) - Number(a.key));
}

function getWeekday(dateStr: string) {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
    };
    return date.toLocaleDateString('de-DE', options);
}
function getDate(dateStr: string) {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit',
        month: 'short',
        day: 'numeric',
    };
    return date.toLocaleDateString('de-DE', options);
}
</script>
