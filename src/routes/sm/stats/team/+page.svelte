<style lang="postcss">
</style>

{#each data.teams as d, idx}
    {#await d then d}
        {#if idx == 0}
            <h2 class="text-center text-4xl">
                <div class="text-txt2">Mannschaft</div>
                <div class="">{d.team.TeamName}</div>
                <div class="text-lg text-txt2">{d.team.SeasonName}</div>
            </h2>

            <div class="flex w-full justify-center">
                <img src="https://bll.wik.li/{d.team.LogoUrl}" alt="Logo" class="max-w-[20%] text-center" />
            </div>
        {/if}

        <h2 class="py-16">
            <a href="/sm/stats/league?id={d.team.LeagueId}">{d.team.LeagueName}</a>
        </h2>

        <!-- {JSON.stringify(data.goals.goalsScored)} -->

        <!-- {data.goals.goalsScored.length}/{data.goals.goalsRecieved.length} -->

        <TimeLine goals={d.goals}></TimeLine>

        {#if d.clubs && d.clubs.length > 0}
            <h3>Verein</h3>
            <div class="*:rounded odd:*:bg-sf3">
                {#each d.clubs as club}
                    <a href="/sm/stats/club?id={club.Id}" class="flex items-center gap-4 pl-4">
                        <div class="flex items-center gap-4">
                            <img src="https://bll.wik.li/{club.LogoUrl}" alt="Logo" class="m-2 w-12" />
                            <div class="font-bold">{club.Name}</div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

        {#if d.leagueTable && d.leagueTable.length > 0}
            <h3>Tabelle</h3>
            <div class="*:rounded odd:*:bg-sf3">
                {#each d.leagueTable as team}
                    <a
                        href="/sm/stats/team?id={team.Id}"
                        class="grid grid-cols-[1fr,7fr,2fr] items-center justify-center gap-2 pl-4"
                    >
                        <div class="pr-4 text-center">{team.Position}.</div>
                        <div class="grid w-full grid-cols-[auto,1fr] items-center justify-start gap-4">
                            <img src="https://bll.wik.li/{team.LogoUrl}" alt="Logo" class="m-2 w-12" />
                            <div class="font-bold">{team.Name}</div>
                        </div>
                        <div class="flex flex-col items-center">
                            <div class="">{team.GamesWon} - {team.GamesLost}</div>
                            <div class="">({team.GoalsScored}/{team.GoalsReceived})</div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

        {#if d.scorer && d.scorer.length > 0}
            <h3 class="">Spieler</h3>
            <div class="*:p-2 odd:*:bg-sf3">
                <div class="grid grid-cols-[5fr,1fr,1fr,1fr] rounded-t border-b">
                    <div class="">Spieler</div>
                    <div class="text-center">Spiele</div>
                    <div class="text-center">Tore</div>
                    <div class="text-center">Vorlagen</div>
                </div>
                {#each d.scorer as s}
                    <a href="/sm/stats/player?id={s.PlayerId}" class="grid grid-cols-[5fr,1fr,1fr,1fr] rounded">
                        <div class="font-bold">{s.FirstName} {s.LastName}</div>
                        <div class="text-center">{s.Games}</div>
                        <div class="text-center">{s.Goals}</div>
                        <div class="text-center">{s.Assists}</div>
                    </a>
                {/each}
            </div>
        {/if}
    {/await}
{/each}

<script lang="ts">
    import TimeLine from './timeline.svelte';

    export let data;
</script>
