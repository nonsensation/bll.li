<style lang="postcss">
    .teamname {
        @apply text-xs md:text-base;
    }
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Liga</div>
    <div class="">{data.leagueName}</div>
    <div class="text-txt2 text-lg">{data.seasonName}</div>
</h2>

{#if data.leagueTable && data.leagueTable.length > 0}
    <h3>Tabelle</h3>
    <div class="*:rounded odd:*:bg-sf3">
        {#each data.leagueTable as team}
            <div class="flex items-center gap-4 pl-4">
                <div class="pr-4">{team.Position}. Platz</div>
                <a href="/sm/stats/team?id={team.Id}" class="flex items-center gap-4">
                    <img src="https://bll.wik.li/{team.LogoUrl}" alt="Logo" class="m-2 w-12" />
                    <div class="font-bold">{team.Name}</div>
                </a>
            </div>
        {/each}
    </div>
{/if}

{#if data.leagueScorer && data.leagueScorer.length > 0}
    <h3>Top-Scorer</h3>
    <div class="*:rounded odd:*:bg-sf3">
        {#each data.leagueScorer.slice(0, 10) as s}
            <div class="grid grid-cols-[1fr,2fr,3fr,1fr] items-center justify-center text-center">
                <div class="font-bold">{s.Position}.</div>
                <a href="/sm/stats/player?id={s.PlayerId}" class="font-bold">{s.FirstName} {s.LastName}</a>
                <a href="/sm/stats/teams?id={s.TeamId}" class="flex items-center justify-center sm:justify-start">
                    <img src="https://bll.wik.li/{s.LogoUrl}" alt="Logo" class="m-2 w-12" />
                    <div class="teamname hidden text-left sm:inline">{s.TeamName}</div>
                </a>
                <div class="">{s.Games} • {s.Goals} • {s.Assists}</div>
            </div>
        {/each}
    </div>
    {#if data.leagueScorer.length > 10}
        <details>
            <summary class="cursor-pointer rounded border border-txt2 p-2 text-txt2">Zeige alle Scorer an</summary>
            <div class="*:rounded odd:*:bg-sf3">
                {#each data.leagueScorer.slice(10) as s}
                    {#if s != null}
                        <div class="grid grid-cols-[1fr,2fr,3fr,1fr] items-center justify-center text-center">
                            <div class="font-bold">{s.Position}.</div>
                            <a href="/sm/stats/player?id={s.PlayerId}" class="font-bold">{s.FirstName} {s.LastName}</a>
                            <a
                                href="/sm/stats/teams?id={s.TeamId}"
                                class="flex items-center justify-center sm:justify-start"
                            >
                                <img src="https://bll.wik.li/{s.LogoUrl}" alt="Logo" class="m-2 w-12" />
                                <div class="teamname hidden text-left sm:inline">{s.TeamName}</div>
                            </a>
                            <div class="">{s.Games} • {s.Goals} • {s.Assists}</div>
                        </div>
                    {/if}
                {/each}
            </div>
        </details>
    {/if}
{/if}

{#if data.games && data.games.length > 0}
    <h3>Spieltage</h3>
    <div class="rounded even:*:bg-sf3">
        {#each groupBy(data.games, 'GameDay') as gd}
            <div class="col-span-full py-4 text-center font-bold">
                {gd.key}. Spieltag
            </div>
            {#if gd.values}
                {#each gd.values as g}
                    <a
                        href="/sm/match?gameId={g.GameId}"
                        class="grid grid-cols-[1fr,auto,1fr] items-center justify-center gap-4"
                    >
                        <div class="flex items-center gap-4 place-self-end">
                            <div class="teamname text-right">{g.HomeTeamName}</div>
                            <img src="https://bll.wik.li/{g.HomeTeamLogoUrl}" alt="Logo" class="m-2 w-12" />
                        </div>
                        <div class="text-xl font-bold">
                            {g.HomeGoals} - {g.GuestGoals}
                        </div>
                        <div class="flex items-center gap-4">
                            <img src="https://bll.wik.li/{g.GuestTeamLogoUrl}" alt="Logo" class="m-2 w-12" />
                            <div class="teamname text-left">{g.GuestTeamName}</div>
                        </div>
                    </a>
                {/each}
            {/if}
        {/each}
    </div>
{/if}

<script lang="ts">
    import { groupBy } from '$lib/utils.js';

    export let data;
</script>
