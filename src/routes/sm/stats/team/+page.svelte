<style lang="postcss">
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Mannschaft</div>
    <div class="">{data.team.TeamName}</div>
    <div class="text-txt2 text-lg">{data.team.SeasonName}</div>
</h2>

<div class="flex w-full justify-center">
    <img src="https://bll.wik.li/{data.team.LogoUrl}" alt="Logo" class="max-w-[20%] text-center" />
</div>

<h3 class="text-center"><a href="/sm/stats/league?id={data.team.LeagueId}">{data.team.LeagueName}</a></h3>

{#if data.clubs && data.clubs.length > 0}
    <h3>Verein</h3>
    <div class="*:rounded odd:*:bg-sf3">
        {#each data.clubs as club}
            <a href="/sm/stats/club?id={club.Id}" class="flex items-center gap-4 pl-4">
                <div class="flex items-center gap-4">
                    <img src="https://bll.wik.li/{club.LogoUrl}" alt="Logo" class="m-2 w-12" />
                    <div class="font-bold">{club.Name}</div>
                </div>
            </a>
        {/each}
    </div>
{/if}

{#if data.leagueTable && data.leagueTable.length > 0}
    <h3>Tabelle</h3>
    <div class="*:rounded odd:*:bg-sf3">
        {#each data.leagueTable as team}
            <a href="/sm/stats/team?id={team.Id}" class="flex items-center gap-4 pl-4">
                <div class="pr-4">{team.Position}. Platz</div>
                <div class="flex items-center gap-4">
                    <img src="https://bll.wik.li/{team.LogoUrl}" alt="Logo" class="m-2 w-12" />
                    <div class="font-bold">{team.Name}</div>
                </div>
            </a>
        {/each}
    </div>
{/if}

{#if data.scorer && data.scorer.length > 0}
    <h3 class="">Spieler</h3>
    <div class="*:p-2 odd:*:bg-sf3">
        <div class="grid grid-cols-[5fr,1fr,1fr,1fr] border-b rounded-t">
            <div class="">Spieler</div>
            <div class="text-center">Spiele</div>
            <div class="text-center">Tore</div>
            <div class="text-center">Vorlagen</div>
        </div>
        {#each data.scorer as s}
            <a href="/sm/stats/player?id={s.PlayerId}" class="rounded grid grid-cols-[5fr,1fr,1fr,1fr]">
                <div class="font-bold">{s.FirstName} {s.LastName}</div>
                <div class="text-center">{s.Games}</div>
                <div class="text-center">{s.Goals}</div>
                <div class="text-center">{s.Assists}</div>
            </a>
        {/each}
    </div>
{/if}

<script lang="ts">
    export let data;
</script>
