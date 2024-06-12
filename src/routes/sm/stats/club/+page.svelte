<style lang="postcss">
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Verein</div>
    <div class="">{data.club.Name}</div>
</h2>

<div class="flex justify-center">
    <img src="https://bll.wik.li/{data.club.LogoUrl}" alt="Logo" class="max-w-[20%]" />
</div>

{#if data.teams && data.teams.length > 0}
    <h3 class="">Spielbetrieb</h3>
    {#each groupBy(data.teams, 'SeasonName') as g}
        {#if g.key != null}
            <h4 class="py-4 font-bold">Saison {g.key}</h4>
            {#if g.values}
                <div class="text-sm even:*:bg-sf3 *:md:text-base">
                    <div class="grid grid-cols-2 gap-2">
                        <div class="font-bold">Liga</div>
                        <div class="font-bold">Team</div>
                    </div>
                    {#each g.values as t}
                        <div class="grid grid-cols-2 gap-2 rounded border border-transparent p-1">
                            <div class=""><a href="/sm/stats/league?id={t.LeagueId}">{t.LeagueName}</a></div>
                            <div class=""><a href="/sm/stats/team?id={t.Id}">{t.Name}</a></div>
                        </div>
                    {/each}
                </div>
            {/if}
        {/if}
    {/each}
{/if}

{#if data.scorer && data.scorer.length > 0}
    <h3 class="">Ewige Bestenliste</h3>
    <div class="text-sm odd:*:bg-sf3 *:md:text-base">
        <div class="grid grid-cols-[4fr,1fr,1fr,1fr,1fr] gap-2 border-b p-2 *:text-center">
            <div class="text-center font-bold">Spieler</div>
            <div class="font-bold">Saisons</div>
            <div class="font-bold">Spiele</div>
            <div class="font-bold">Tore</div>
            <div class="font-bold">Vorlagen</div>
        </div>
        {#each data.scorer.slice(0, 10) as s}
            <a
                href="/sm/stats/player?id={s.PlayerId}"
                class="grid grid-cols-[4fr,1fr,1fr,1fr,1fr] gap-2 rounded border border-transparent p-1 *:text-center"
            >
                <div class="text-center">{s.FirstName} {s.LastName}</div>
                <div class="">{s.Seasons}</div>
                <div class="">{s.Games}</div>
                <div class="">{s.Goals}</div>
                <div class="">{s.Assists}</div>
            </a>
        {/each}
        {#if data.scorer.length > 10}
            <details class="py-2 text-sm odd:*:bg-sf3 *:md:text-base">
                <summary class="cursor-pointer rounded border border-txt2 p-2 text-txt2">Zeige alle Spieler an</summary>
                {#each data.scorer.slice(10) as s}
                    {#if s != null && s.LastName != null}
                        <a
                            href="/sm/stats/player?id={s.PlayerId}"
                            class="grid grid-cols-[4fr,1fr,1fr,1fr,1fr] gap-2 rounded border border-transparent p-1 *:text-center"
                        >
                            <div class="text-center">{s.FirstName} {s.LastName}</div>
                            <div class="">{s.Seasons}</div>
                            <div class="">{s.Games}</div>
                            <div class="">{s.Goals}</div>
                            <div class="">{s.Assists}</div>
                        </a>
                    {/if}
                {/each}
            </details>
        {/if}
    </div>
{/if}

<script lang="ts">
    import { groupBy } from '$lib/utils.js';

    export let data;

    async function loadData() {
        const s = await data.teams;
        const k = groupBy(s, 'SeasonName');

        return k;
    }
</script>
