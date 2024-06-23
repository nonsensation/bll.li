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
    <h3 class="py-8 text-center">Spielbetrieb</h3>
    <div class="flex flex-col gap-2">
        {#each groupBy(data.teams, 'SeasonName') as g, groupIndex}
            {#if g.key != null}
                <details open={groupIndex == 0} class="">
                    <summary class="cursor-pointer rounded border border-dashed border-sf2 p-2 hover:border-prim">
                        <span class="font-bold">Saison {g.key}</span>
                    </summary>
                    <div class="py-4 text-sm even:*:bg-sf3 *:md:text-base flex flex-col gap-2">
                        <div class="grid grid-cols-2 gap-4">
                            <div class="font-bold">Liga</div>
                            <div class="font-bold">Team</div>
                        </div>
                        {#each g.values as t}
                            <div class="grid grid-cols-2 gap-4 rounded border border-transparent p-2">
                                <div class="">
                                    <a href="/sm/league?id={t.LeagueId}" class="flex justify-between">
                                        <div class="">{t.LeagueName}</div>
                                        <div class="hidden md:flex opacity-25">
                                            <!-- {#if t.IsFemale == true}
                                                <Icon icon="PLAYER" />
                                            {/if}
                                            {#if t.IsJunior == true}
                                                <Icon icon="WHISTLE" />
                                            {/if}
                                            {#if t.LeagueType == 'League'}
                                                <Icon icon="DISCORD" />
                                            {:else if t.LeagueType == 'Cup'}
                                                <Icon icon="HELMET" />
                                            {:else if t.LeagueType == 'Champ'}
                                                <Icon icon="STICKS_FULL" />
                                            {/if} -->
                                            <span class="font-bold px-1">{t.FieldSize}</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="">
                                    <a href="/sm/team?id={t.Id}" class="flex gap-2">
                                        <img class="h-6" src="http://bll.wik.li/{t.LogoUrl}" alt="Logo" />
                                        <div class="">{t.Name}</div>
                                    </a>
                                </div>
                            </div>
                        {/each}
                    </div>
                </details>
            {/if}
        {/each}
    </div>
{/if}

{#if data.scorer && data.scorer.length > 0}
    <h3 class="py-8 text-center">Ewige Bestenliste</h3>
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
                href="/sm/player?id={s.PlayerId}"
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
                <summary class="cursor-pointer rounded border border-txt2 p-2 text-txt2 hover:border-prim"
                    >Zeige alle Spieler an</summary
                >
                {#each data.scorer.slice(10) as s}
                    {#if s != null && s.LastName != null}
                        <a
                            href="/sm/player?id={s.PlayerId}"
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
    import Icon from '$lib/components/Icon.svelte';

    export let data;

    async function loadData() {
        const s = await data.teams;
        const k = groupBy(s, 'SeasonName');

        return k;
    }
</script>
