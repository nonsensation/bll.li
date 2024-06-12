<style lang="postcss">
    td {
        @apply py-1;
    }

    th {
        @apply py-4;
    }

    .sm-season {
        @apply pb-4 pt-8;
    }

    .row-team {
        margin-top: 3rem;
        color: red;
    }
</style>

<h2>{data.player.FirstName} {data.player.LastName}</h2>

{#await loadData()}
    Lade..
{:then seasons}
    <h3>Karriere</h3>
    <table class="w-full table-auto border-separate border-spacing-0 break-keep md:text-base">
        <thead class="sticky top-0 bg-sf">
            <tr class="*:border-b *:border-sf2 *:py-8">
                <th class="text-center max-md:hidden">Saison</th>
                <th class="text-left">Team</th>

                <th class="hidden text-center md:table-cell">Spiele</th>
                <th class="hidden text-center md:table-cell">Tore</th>
                <th class="hidden text-center md:table-cell">Vorlagen</th>
                <th class="table-cell text-center md:hidden">Spiele • Tore • Vorlagen</th>
            </tr>
        </thead>
        <tbody class="">
            {#each seasons as s, seasonIndex}
                {#each s.values as t, teamIndex}
                    {#if t.values}
                        {#each t.values as l, leagueIndex}
                            {@const isLast =
                                seasonIndex < seasons.length - 1 &&
                                teamIndex == s.values.length - 1 &&
                                leagueIndex == t.values.length - 1}
                            {#if leagueIndex == 0}
                                {#if teamIndex == 0}
                                    <tr class="md:hidden">
                                        <td colSpan={1337} class="sm-season text-center">Saison {s.key}</td>
                                    </tr>
                                {/if}
                                <tr class:border-b={isLast} class="hover:bg-sf3">
                                    <td class="text-center max-md:hidden">
                                        {#if teamIndex == 0}
                                            <div class="hidden md:inline">{s.key}</div>
                                            <div class="md:hidden">
                                                {s.key.replace(/20(\d{2})\/20(\d{2})/, '$1/$2')}
                                            </div>
                                        {/if}
                                    </td>
                                    <td class="pt-8 text-left">
                                        <!-- img -->
                                        <div class="">
                                            <a href="/sm/stats/team?id={l.TeamId}" class="font-bold">{l.TeamName}</a>
                                        </div>
                                    </td>
                                    <td class="md:hidden"></td>
                                    <td class="hidden md:inline"></td>
                                    <td class="hidden md:inline"></td>
                                    <td class="hidden md:inline"></td>
                                </tr>
                            {/if}
                            <tr class:border-b={isLast} class="hover:bg-sf3">
                                <td class="max-md:hidden"></td>
                                <td class="pl-4 text-left text-sm md:pl-8 md:text-base"
                                    ><a href="/sm/stats/league?id={l.LeagueId}">{l.LeagueName}</a></td
                                >
                                <td class="text-center md:hidden">
                                    <a href="/sm/stats/league?id={l.LeagueId}" class="px-4"
                                        >{l.Games} • {l.Goals} • {l.Assists}</a
                                    >
                                </td>
                                <td class="hidden text-center md:table-cell"><a href="" class="px-4">{l.Games}</a></td>
                                <td class="hidden text-center md:table-cell"><a href="" class="px-4">{l.Goals}</a></td>
                                <td class="hidden text-center md:table-cell"><a href="" class="px-4">{l.Assists}</a></td
                                >
                            </tr>
                        {/each}
                    {/if}
                {/each}
            {/each}
        </tbody>
    </table>
{/await}

<script lang="ts">
    import { groupBy } from '$lib/utils.js';

    export let data;

    async function loadData() {
        const s = await data.seasons;

        const k = groupBy(s, 'SeasonName').map(x => {
            return { ...x, values: groupBy(x.values!, 'TeamId') };
        });

        return k;
    }
</script>
