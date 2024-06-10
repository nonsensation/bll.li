<style lang="postcss">
</style>

{#await loadData()}
    Lade..
{:then seasons}
    <table class="w-full table-auto text-sm md:text-base break-keep border-separate border-spacing-0">
        <thead class="sticky top-0 bg-sf">
            <tr class="*:py-4 *:border-b *:border-sf2 ">
                <th class="text-center">Saison</th>
                <th class="text-left">Team</th>
                <th class="text-center">Spiele</th>
                <th class="text-center">Tore</th>
                <th class="text-center">Vorlagen</th>
            </tr>
        </thead>
        <tbody class="hover:*:bg-sf3">
            {#each seasons as s, seasonIndex}
                {#each s.values as t, teamIndex}
                    {#if t.values}
                        {#each t.values as l, leagueIndex}
                            {@const isLast =
                                seasonIndex < seasons.length - 1 &&
                                teamIndex == s.values.length - 1 &&
                                leagueIndex == t.values.length - 1}
                            {#if leagueIndex == 0}
                                <tr class:border-b={isLast} class="mt-4">
                                    <td class="text-center">
                                        {#if teamIndex == 0}
                                            <div class="hidden md:inline">{s.key}</div>
                                            <div class="md:hidden">
                                                {s.key.replace(/20(\d{2})\/20(\d{2})/, '$1/$2')}
                                            </div>
                                        {/if}
                                    </td>
                                    <td class="text-left">
                                        <!-- img -->
                                        <a href="" class="font-bold">{l.TeamName}</a>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            {/if}
                            <tr class:border-b={isLast} class="">
                                <td></td>
                                <td class="text-left text-xs md:text-sm md:pl-8"><a href="">{l.LeagueName}</a></td>
                                <td class="text-center"><a href="" class="px-4">{l.Games}</a></td>
                                <td class="text-center"><a href="" class="px-4">{l.Goals}</a></td>
                                <td class="text-center"><a href="" class="px-4">{l.Assists}</a></td>
                            </tr>
                        {/each}
                    {/if}
                {/each}
            {/each}
        </tbody>
    </table>
{/await}

<script lang="ts">
    export let data;

    async function loadData() {
        const s = await data.seasons;

        const k = groupBy(s, 'SeasonName').map(x => {
            return { ...x, values: groupBy(x.values!, 'TeamName') };
        });
        console.dir(k);

        return k;
    }

    function groupBy<T>(array: T[], key: string) {
        const groups = Object.groupBy(array, (item: T) => item[key]);
        const groupedArray = Object.keys(groups).map(groupKey => ({
            key: groupKey,
            values: groups[groupKey],
        }));
        return groupedArray;
    }
</script>
