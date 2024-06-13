<style lang="postcss">
    .timeline {
        position: relative;
        margin: 20px auto;
        padding: 10px 0;
    }

    .period {
        position: relative;
        height: 10px; /* Adjust as needed */
        border-bottom: 2px solid #000;
        margin-bottom: 50px;
    }

    .goal {
        position: absolute;
        top: 0;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        /* border: 1px solid; */
    }

    .goal-s {
        top: -5px;
        background-color: teal;
        /* @apply bg-prim2; */
    }

    .goal-r {
        top: 15px;
        background-color: darkviolet;
        /* @apply bg-prim; */
    }

    .penalty_shot {
        background-color: blue;
        z-index: 10;
    }

    .owngoal {
        background-color: violet;
        z-index: 10;
    }

    .regular {
    }
</style>

<h2 class="text-center text-4xl">
    <div class="text-txt2">Mannschaft</div>
    <div class="">{data.team.TeamName}</div>
    <div class="text-lg text-txt2">{data.team.SeasonName}</div>
</h2>

<div class="flex w-full justify-center">
    <img src="https://bll.wik.li/{data.team.LogoUrl}" alt="Logo" class="max-w-[20%] text-center" />
</div>

<h3 class="text-center"><a href="/sm/stats/league?id={data.team.LeagueId}">{data.team.LeagueName}</a></h3>

<!-- {JSON.stringify(data.goals.goalsScored)} -->

<!-- {data.goals.goalsScored.length}/{data.goals.goalsRecieved.length} -->

<div class="timeline grid grid-cols-3 gap-8">
    <!-- TODO: extratime & penaltyshots -->
    <!-- TODO: link to game#eventIndex -->
    {#each [1, 2, 3] as period}
        <div class="period">
            {#each data.goals.goalsScored.filter(g => +g.Period === period) as g}
                <div class="goal goal-s {g.GoalType}" style="left: {calculatePosition(g.Time)}%">{g.Period}</div>
            {/each}

            {#each data.goals.goalsRecieved.filter(g => +g.Period === period) as g}
                <div class="goal goal-r {g.GoalType}" style="left: {calculatePosition(g.Time)}%">{g.Period}</div>
            {/each}
        </div>
    {/each}
</div>

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
                <div class="">{team.GamesWon} - {team.GamesLost} ({team.GoalsScored}/{team.GoalsReceived})</div>
            </a>
        {/each}
    </div>
{/if}

{#if data.scorer && data.scorer.length > 0}
    <h3 class="">Spieler</h3>
    <div class="*:p-2 odd:*:bg-sf3">
        <div class="grid grid-cols-[5fr,1fr,1fr,1fr] rounded-t border-b">
            <div class="">Spieler</div>
            <div class="text-center">Spiele</div>
            <div class="text-center">Tore</div>
            <div class="text-center">Vorlagen</div>
        </div>
        {#each data.scorer as s}
            <a href="/sm/stats/player?id={s.PlayerId}" class="grid grid-cols-[5fr,1fr,1fr,1fr] rounded">
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

    function timeToMinutes(time) {
        const [minutes, seconds] = time.split(':').map(Number);
        return minutes + seconds / 60;
    }

    // Calculate the position of each goal within its period
    function calculatePosition(time) {
        const totalMinutes = 20; // Each period is 20 minutes
        const minutes = timeToMinutes(time);
        return (minutes / totalMinutes) * 100;
    }
</script>
