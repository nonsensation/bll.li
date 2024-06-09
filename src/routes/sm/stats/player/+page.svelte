{#await loadData()}
    Loading Seasons
{:then seasons}
    <div class="flex flex-col gap-4">
        {#each seasons as s}
            <div class="p-4 border rounded border-sf2">
                <div class="font-bold pb-4">Saison: {s.key}</div>
                {#if s.values}
                    <div class="flex flex-col gap-2">
                        {#each s.values as tl}
                            <div class="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-[1fr,2fr,1.5fr] gap-4 break-words">
                                <div class="">{tl.TeamName}</div>
                                <div class="">{tl.LeagueName}</div>
                                <div class="hidden md:block">
                                    #{tl.Rank} ({tl.Games} Spiele | {tl.Goals} Tore | {tl.Assists} Vorlagen)
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
{/await}

<script lang="ts">
    export let data;

    async function loadData() {
        const s = await data.seasons;

        return groupBy(s, 'SeasonName');
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
