<style lang="postcss">
</style>

{#await loadData()}
    Lade..
{:then teams}
    <div class="">Teams:</div>
    {#each teams as s}
        <div class="font-bold py-4">Saison {s.key}</div>
        {#if s.values}
            {#each s.values as t}
                <div class="">
                    <a href="/sm/stats/league?id={t.LeagueId}">{t.LeagueName}</a>
                    <a href="/sm/stats/team?id={t.Id}">{t.Name}</a>
                </div>
            {/each}
        {/if}
    {/each}
{/await}

<script lang="ts">
    export let data;

    async function loadData() {
        const s = await data.teams;

        const k = groupBy(s, 'SeasonName');

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
