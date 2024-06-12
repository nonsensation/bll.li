<style lang="postcss">
</style>

<h2 class="text-center text-4xl">Verein: {data.club.Name}</h2>

<img src="https://bll.wik.li/{data.club.LogoUrl}" alt="Logo" class="max-w-[20%]" />

{#await loadData()}
    Lade..
{:then teams}
    <h3 class="">Spielbetrieb</h3>
    {#each teams as g}
        {#if g.key != null}
            <h4 class="py-4 font-bold">Saison {g.key}</h4>
            {#if g.values}
                <div class="text-sm even:*:bg-sf3 *:md:text-base">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="font-bold">Liga</div>
                        <div class="font-bold">Team</div>
                    </div>
                    {#each g.values as t}
                        <div class="grid grid-cols-2 gap-2 rounded border border-transparent p-1 hover:border-sf2">
                            <div class=""><a href="/sm/stats/league?id={t.LeagueId}">{t.LeagueName}</a></div>
                            <div class=""><a href="/sm/stats/team?id={t.Id}">{t.Name}</a></div>
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
    {/each}
    <!-- {JSON.stringify(teams)} -->
{/await}

<script lang="ts">
    import { groupBy } from '$lib/utils.js';

    export let data;

    async function loadData() {
        const s = await data.teams;
        const k = groupBy(s, 'SeasonName');

        return k;
    }
</script>
