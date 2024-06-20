<style lang="postcss">
</style>

<div class="">
    {#each data.teams as d, idx}{/each}
</div>

{#each data.teams as d, idx}
    {#await d then d}
        {#if idx == 0}
            <h2 class="text-center text-4xl">
                <div class="text-txt2">Mannschaft</div>
                <div class="">{d.team.TeamName}</div>
                <div class="text-lg text-txt2">{d.team.SeasonName}</div>
            </h2>

            <div class="flex w-full justify-center">
                <img
                    src="https://bll.wik.li/{d.team.LogoUrl}"
                    alt="Logo"
                    class="max-w-[20%] text-center"
                />
            </div>

            {#if d.clubs && d.clubs.length > 0}
                <h3>Verein</h3>
                <div class="*:rounded odd:*:bg-sf3">
                    {#each d.clubs as club}
                        <a
                            href="/sm/stats/club?id={club.Id}"
                            class="flex items-center gap-4 pl-4"
                        >
                            <div class="flex items-center gap-4">
                                <img
                                    src="https://bll.wik.li/{club.LogoUrl}"
                                    alt="Logo"
                                    class="m-2 w-12"
                                />
                                <div class="font-bold">{club.Name}</div>
                            </div>
                        </a>
                    {/each}
                </div>
            {/if}
        {/if}

        <h2 class="py-16 text-center">
            <div class="text-txt2">Liga</div>
            <a
                class="text-4xl"
                href="/sm/stats/league?id={d.team.LeagueId}">{d.team.LeagueName}</a
            >
        </h2>

        <TimeLine goals="{d.goals}"></TimeLine>

        {#if d.leagueType == SM.LeagueType.League}
            {#await d.leagueTable}
                <p>Lade leagueTable</p>
            {:then leagueTable}
                {#if leagueTable && leagueTable.length > 0}
                    <h3>Tabelle</h3>
                    <TeamTable teams="{leagueTable}" />
                {/if}
            {:catch error}
                <p>Something went wrong: {error.message}</p>
            {/await}
        {/if}

        {#await d.leagueSchedule}
            <p>Lade leagueSchedule</p>
        {:then leagueSchedule}
            {#if leagueSchedule && leagueSchedule.length > 0}
                <h3>Spiele</h3>
                <GameDays
                    scheduledGames="{leagueSchedule.filter(
                        x =>
                            x.home_team_name === d.team.TeamName ||
                            x.guest_team_name === d.team.TeamName
                    )}"
                    reverseDays="{d.leagueType == SM.LeagueType.Cup}"
                    showArena="{true}"
                    showGameDayTitle="{false}"
                />
            {/if}
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}

        {#await d.leagueScorer}
            <p>Lade leagueScorer</p>
        {:then leagueScorer}
            {@const scorer = leagueScorer?.filter(x => x.team_id === data.teamId)}
            {#if scorer && scorer.length > 0}
                <h3>Topscorer</h3>
                <TeamPlayer {scorer} />
            {/if}
        {:catch error}
            <p>Something went wrong: {error.message}</p>
        {/await}
    {/await}
{/each}

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';

import TimeLine from './timeline.svelte';

import GameDays from '$lib/components/sm/GameDays.svelte';
import TeamPlayer from '$lib/components/sm/TeamPlayer.svelte';
import TeamTable from '$lib/components/sm/TeamTable.svelte';

export let data;
</script>
