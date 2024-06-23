<style lang="postcss">
    .row {
        @apply grid
        grid-cols-[1fr,5fr,2fr]
        items-center
        justify-center gap-4 pl-4 text-center
        sm:grid-cols-[1fr,5fr,2fr,2fr]
        md:grid-cols-[1fr,5fr,1fr,2fr,2fr];
    }
    .teamname {
        @apply text-xs sm:text-sm md:text-base;
    }
</style>


{#if teams && teams.length > 0}
    <div class="even:*:bg-sf3">
        {#if showHeader}
            <div class="row font-bold border-b">
                <div class="">Platz</div>
                <div class="text-left">Team</div>
                <div class="">Punkte</div>
                <div class="hidden flex-col items-center sm:flex">
                    <div class="">Spiele</div>
                    <div class="text-sm font-normal text-txt2">S • U • N</div>
                </div>
                <div class="hidden md:inline">
                    <div class="">Tore</div>
                    <div class="text-sm font-normal text-txt2">(Diff)</div>
                </div>
            </div>
        {/if}
        {#each teams as team}
            <a class="row rounded" href="/sm/team?id={team.team_id}">
                <div class="pr-4 font-bold text-lg">{team.position}.</div>
                <div class="flex items-center gap-4">
                    <img src="https://bll.wik.li/{team.team_logo}" alt="Logo" class="m-2 w-12" />
                    <div class="teamname text-center font-bold">{team.team_name}</div>
                </div>
                <div class="">{team.points}</div>
                <div class="hidden sm:inline">{team.won} • {team.draw} • {team.lost}</div>
                <div class="hidden md:grid">
                    <div class="">{team.goals_scored} : {team.goals_received}</div>
                    <div class="text-sm text-txt2">
                        ({(team.goals_diff ?? 0) > 0 ? '+' + team.goals_diff : team.goals_diff})
                    </div>
                </div>
            </a>
        {/each}
    </div>
{/if}

<script lang="ts">
    import type { Saisonmanager as SM } from 'floorball-saisonmanager';

    export let teams: SM.Team[] = [];
    export let showHeader: boolean = true;
</script>
