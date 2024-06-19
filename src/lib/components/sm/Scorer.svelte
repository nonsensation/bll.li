<style lang="postcss">
    .row {
        @apply grid grid-cols-[1fr,2fr,3fr,1fr] items-center justify-center text-center md:grid-cols-[1fr,2fr,3fr,2fr];
    }
</style>

{#if scorer && scorer.length > 0}
    <div class="even:*:bg-sf3">
        {#if showHeader}
            <div class="row border-b font-bold">
                <div class="font-bold">Platz</div>
                <div class="font-bold">Spieler:in</div>
                <div class="flex items-center justify-center sm:justify-start">Team</div>
                <div class="">Spiele • Tore • Vorlagen</div>
            </div>
        {/if}

        {#each scorer.slice(0, topCount) as s}
            <div class="row rounded">
                <div class="font-bold">{s.position}.</div>
                <a href="/sm/stats/player?id={s.player_id}" class="font-bold">{s.first_name} {s.last_name}</a>
                <a href="/sm/stats/team?id={s.team_id}" class="flex items-center justify-center sm:justify-start">
                    <img src="https://bll.wik.li/{getLogo(s.team_id)}" alt="Logo" class="m-2 w-12" />
                    <div class="teamname hidden text-left sm:inline">{s.team_name}</div>
                </a>
                <div class="">{s.games} • {s.goals} • {s.assists}</div>
            </div>
        {/each}
    </div>
    {#if scorer.length > topCount}
        <details>
            <summary class="cursor-pointer select-none rounded border hover:text-prim hover:border-prim border-dashed border-txt2 p-2 text-txt2">Zeige alle Scorer an</summary>
            <div class="*:rounded odd:*:bg-sf3">
                {#each scorer.slice(topCount) as s}
                    {#if s != null}
                        <div class="row">
                            <div class="font-bold">{s.position}.</div>
                            <a href="/sm/stats/player?id={s.player_id}" class="font-bold"
                                >{s.first_name} {s.last_name}</a
                            >
                            <a
                                href="/sm/stats/teams?id={s.team_id}"
                                class="flex items-center justify-center sm:justify-start"
                            >
                                <img src="https://bll.wik.li/{getLogo(s.team_id)}" alt="Logo" class="m-2 w-12" />
                                <div class="teamname hidden text-left sm:inline">{s.team_name}</div>
                            </a>
                            <div class="">{s.games} • {s.goals} • {s.assists}</div>
                        </div>
                    {/if}
                {/each}
            </div>
        </details>
    {/if}
{/if}

<script lang="ts">
    import type { Saisonmanager as SM } from 'floorball-saisonmanager';

    export let scorer: SM.Scorer[] | undefined = [];
    export let showHeader: boolean = true;
    export let teamIdLogoMap: Record<number, string> = {};

    const topCount = 10;

    function getLogo(teamId: number | null) {
        return teamId && teamId in teamIdLogoMap ? teamIdLogoMap[teamId] : '';
    }
</script>
