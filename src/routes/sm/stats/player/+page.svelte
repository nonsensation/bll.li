<style lang="postcss">
</style>

{#await loadData()}
    Lade..
{:then seasons}
    <table class="w-full table-auto text-sm md:text-base">
        <thead class="bg-sf3">
            <tr class="*:py-4">
                <th class="text-center">Saison</th>
                <th class="text-left">Team</th>
                <th class="text-center">Spiele</th>
                <th class="text-center">Tore</th>
                <th class="text-center">Vorlagen</th>
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
                            <tr class:border-b={isLast} class="rounded hover:bg-sf3">
                                <td class="text-center">
                                    {#if teamIndex + leagueIndex == 0}
                                        <div class="hidden md:inline">{s.key}</div>
                                        <div class="md:hidden">{s.key.replace(/20(\d{2})\/20(\d{2})/, '$1/$2')}</div>
                                    {/if}
                                </td>
                                <td class="text-left">
                                    <div class="">
                                        <!-- img -->
                                        <div class="font-bold">{leagueIndex == 0 ? l.TeamName : ''}</div>
                                    </div>
                                    <div class="pl-8 text-xs md:text-sm">{l.LeagueName}</div>
                                </td>
                                <td class="text-center">{l.Games}</td>
                                <td class="text-center">{l.Goals}</td>
                                <td class="text-center">{l.Assists}</td>
                            </tr>
                        {/each}
                    {/if}
                {/each}
            {/each}
        </tbody>
    </table>

    {JSON.stringify(data)}
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
