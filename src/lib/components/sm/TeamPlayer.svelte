<style lang="postcss">
.row {
    @apply grid grid-cols-[1fr,3fr,2fr] items-center
    justify-center text-center md:grid-cols-[1fr,3fr,1fr,1fr,1fr,1fr,2fr];
}
</style>

{#if scorer && scorer.length > 0}
    <div class="flex flex-col *:p-2 even:*:bg-sf3">
        {#if showHeader}
            <div class="row border-b font-bold">
                <div class="">Platz</div>
                <div class="">Spieler:in</div>
                <div class="hidden md:inline">Punkte</div>
                <div class="md:hidden">
                    <span title="Spiele">S</span> • <span title="Tore">T</span> •
                    <span title="Vorlagen">V</span>
                </div>
                <div class="hidden md:inline">Spiele</div>
                <div class="hidden md:inline">Tore</div>
                <div class="hidden md:inline">Vorlagen</div>
                <div class="hidden md:inline">
                    <div class="">Strafen</div>
                    <div class="text-xs text-txt2">2' • 2+2' • 10' • MS</div>
                </div>
            </div>
        {/if}

        {#each scorer as s}
            <a
                href="/sm/stats/player?id={s.player_id}"
                class="row rounded hover:bg-sf2"
            >
                <div class="text-sm md:text-base">{s.position}.</div>
                <div class="">{s.first_name} {s.last_name}</div>
                <div class="hidden md:inline">{(s.goals ?? 0) + (s.assists ?? 0)}</div>
                <div class="text-sm md:hidden md:text-base">
                    {s.games} • {s.goals} • {s.assists}
                </div>
                <div class="hidden text-sm md:inline md:text-base">{s.games}</div>
                <div class="hidden text-sm md:inline md:text-base">{s.goals}</div>
                <div class="hidden text-sm md:inline md:text-base">{s.assists}</div>
                <div class="hidden md:inline">
                    {s.penalty_2} •
                    {s.penalty_2and2} •
                    {s.penalty_10} •
                    {(s.penalty_ms_tech ?? 0) + (s.penalty_ms_full ?? 0)}
                </div>
            </a>
        {/each}
    </div>
{/if}

<script lang="ts">
import type { Saisonmanager as SM } from 'floorball-saisonmanager';

export let scorer: SM.Scorer[] | undefined = [];
export let showHeader: boolean = true;
</script>
