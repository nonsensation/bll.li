<style lang="postcss">
    .row {
        @apply flex items-center gap-4 pl-4;
    }
    h3 {
        @apply mb-8 mt-16 text-2xl;
    }
</style>

{#if groupedTable}
    <div class="flex flex-col gap-8">
        {#if scheduledGames}
            {#if showHeader}
                <h3>Platzierungsspiele</h3>
            {/if}

            <RankingGameDays gameDays={scheduledGames.filter(x => !x.group_identifier)} />

            {#if showHeader}
                <h3>Gruppenphase</h3>
            {/if}
        {/if}
        {#each getGroups(groupedTable) as grp, grpIdx}
            <div class="">
                <div class="mt-8 border-b-2 text-center text-xl font-bold" id={grp.group_identifier}>
                    {grp.name}
                </div>
                <div class="flex flex-col gap-12 rounded rounded-t-none pt-8">
                    <div class="">
                        <div class="text-center">Tabelle</div>
                        <TeamTable teams={grp.values} showHeader />
                    </div>

                    {#if scheduledGames}
                        <div class="">
                            <div class="text-center">Spiele</div>
                            <GameDays
                                scheduledGames={scheduledGames.filter(x => x.group_identifier === grp.group_identifier)}
                            />
                        </div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{/if}

<script lang="ts">
    import type { Saisonmanager as SM } from 'floorball-saisonmanager';
    import TeamTable from '$lib/components/sm/TeamTable.svelte';
    import GameDays from '$lib/components/sm/GameDays.svelte';
    import RankingGameDays from '$lib/components/sm/RankingGameDays.svelte';

    export let groupedTable: SM.GroupedTable | undefined;
    export let scheduledGames: SM.ScheduledGame[] | undefined;
    export let showHeader: boolean = true;

    function getGroups(leagueGroupedTable: SM.GroupedTable) {
        return Object.entries(leagueGroupedTable).map(([key, value]) => {
            const { table, ...rest } = value;
            return { key, ...rest, values: table };
        });
    }
</script>
