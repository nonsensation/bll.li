<style lang="postcss">
    .teamname {
        @apply text-xs md:text-base;
    }

    h3 {
        @apply mt-16 mb-8 text-2xl;
    }
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Liga</div>
    <div class="">{data.leagueName}</div>
    <div class="text-lg text-txt2">Saison {data.seasonName}</div>
</h2>

{#if leagueTable && leagueTable.length > 0}
    <h3>Platzierung</h3>
    <TeamTable teams={leagueTable} />
{/if}

{#if leagueScorer && leagueScorer.length > 0}
    <h3>Topscorer</h3>
    <Scorer scorer={leagueScorer} teamIdLogoMap={logos} />
{/if}

{#if leagueGroupedTable}
    <GroupedTeamTable groupedTable={leagueGroupedTable} scheduledGames={leagueSchedule} />
{:else if leagueSchedule}
    <GameDays scheduledGames={leagueSchedule} reverseDays={leagueType == SM.LeagueType.Cup} />
{/if}

<script lang="ts">
    import { Saisonmanager as SM } from 'floorball-saisonmanager';
    import TeamTable from '$lib/components/sm/TeamTable.svelte';
    import GroupedTeamTable from '$lib/components/sm/GroupedTeamTable.svelte';
    import GameDays from '$lib/components/sm/GameDays.svelte';
    import Scorer from '$lib/components/sm/Scorer.svelte';

    export let data;

    const { leagueGroupedTable, leagueScorer, leagueTable, leagueSchedule, leagueType } = data;

    $: logos =
        leagueTable?.reduce(
            (map, team) => {
                map[team.team_id ?? -1] = team.team_logo ?? '';
                return map;
            },
            {} as Record<number, string>
        ) ?? {};
</script>
