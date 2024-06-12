<style lang="postcss">
</style>

<h2>Club: {data.club.Name}</h2>

<img src="https://bll.wik.li/{data.club.LogoUrl}" alt="Logo" class="max-w-[20%]">

{#await loadData()}
    Lade..
{:then teams}
    <h3 class="">Spielbetrieb</h3>
    {#each teams as s}
        <h4 class="py-4 font-bold">Saison {s.key}</h4>
        {#if s.values}
            <div class="text-sm even:*:bg-sf3 *:md:text-base">
                <div class="grid grid-cols-2 gap-2">
                    <div class="font-bold">Liga</div>
                    <div class="font-bold">Team</div>
                </div>
                {#each s.values as t}
                    <div class="p-1 grid grid-cols-2 gap-2 rounded border border-transparent hover:border-sf2">
                        <div class=""><a href="/sm/stats/league?id={t.LeagueId}">{t.LeagueName}</a></div>
                        <div class=""><a href="/sm/stats/team?id={t.Id}">{t.Name}</a></div>
                    </div>
                {/each}
            </div>
        {/if}
    {/each}
{/await}

<script lang="ts">
    export let data;

    async function loadData() {
        const s = await data.teams;
        const k = groupBy(s, 'SeasonName');

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
