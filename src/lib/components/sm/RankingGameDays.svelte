<style lang="postcss">
.teamname {
    @apply text-xs sm:text-sm md:text-base;
}
</style>

{#if gameDays && gameDays.length > 0}
    <div class="flex flex-col gap-2 rounded even:*:bg-sf3">
        {#each gameDays.toSorted(x => x.game_number ?? -1) as g}
            <!-- <div class="">{JSON.stringify(g)}</div> -->
            <div class="text-center">
                <div class="text-xl font-bold underline">{g.series_title}</div>
            </div>

            <a
                href="/sm/match?gameId={g.game_id}"
                class="mb-8 grid grid-cols-[1fr,auto,1fr] items-center gap-4 rounded"
            >
                <div class="flex h-full items-center gap-4 place-self-end">
                    <div class="teamname text-center">
                        <div class="font-bold md:text-lg">
                            {g.home_team_name ?? g.home_team_filling_title}
                        </div>
                        <div
                            class="text-xs text-txt2 md:inline"
                            class:hidden="{g.home_team_name}"
                        >
                            {g.home_team_filling_title}
                        </div>
                    </div>
                    <img
                        src="https://bll.wik.li/{g.home_team_logo}"
                        alt="Logo"
                        class="m-2 w-12"
                    />
                </div>
                <div class="text-center">
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
                        </div>
                    {/if}
                </div>

                <div class="flex items-center gap-4">
                    <img
                        src="https://bll.wik.li/{g.guest_team_logo}"
                        alt="Logo"
                        class="m-2 w-12"
                    />
                    <div class="teamname text-center">
                        <div class="font-bold md:text-lg">
                            {g.guest_team_name ?? g.guest_team_filling_title}
                        </div>
                        <div
                            class="text-xs text-txt2 md:inline"
                            class:hidden="{g.guest_team_name}"
                        >
                            {g.guest_team_filling_title}
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
{/if}

<script lang="ts">
import type { Saisonmanager as SM } from 'floorball-saisonmanager';

export let gameDays: SM.ScheduledGame[] | undefined = [];

function getDate(dateStr: string | null) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        // weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: '2-digit',
    };
    return date.toLocaleDateString('de-DE', options);
}

function getWeekday(dateStr: string | null) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
    };
    return date.toLocaleDateString('de-DE', options);
}
</script>
