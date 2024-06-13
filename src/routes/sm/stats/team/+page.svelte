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
        background-color: crimson;
        /* @apply bg-prim; */
    }

    .penalty_shot {
        background-color: yellow;
        z-index: 10;
    }

    .owngoal {
        background-color: orange;
        z-index: 10;
    }

    .regular {
    }

    .goal-bar {
        position: absolute;
        bottom: 0;
        width: 4px; /* Adjust width as needed */
        height: 100%;
    }

    .timeline2 {
        width: 100%;
        height: auto;
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

<div class="timeline grid grid-cols-3 gap-0">
    <!-- TODO: extratime & penaltyshots -->
    <!-- TODO: link to game#eventIndex -->
    {#each [1, 2, 3] as period}
        <div class="period">
            {#each data.goals.goalsScored.filter(g => +g.Period === period) as g}
                <div class="goal goal-s {g.GoalType}" style="left: {calculatePosition(g.Time)}%"></div>
            {/each}

            {#each data.goals.goalsRecieved.filter(g => +g.Period === period) as g}
                <div class="goal goal-r {g.GoalType}" style="left: {calculatePosition(g.Time)}%"></div>
            {/each}
        </div>
    {/each}
</div>

<svg viewBox={`0 0 ${width} ${height}`} class="timeline2">
    <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="black" />
    <line x1={(width / 3) * 1} y1={height / 2 + 5} x2={(width / 3) * 1} y2={height / 2 - 5} stroke="black" />
    <line x1={(width / 3) * 2} y1={height / 2 + 5} x2={(width / 3) * 2} y2={height / 2 - 5} stroke="black" />

    {#each new Array(20 * 3) as m, i}
        <line
            x1={(width / 20 / 3) * i}
            y1={height / 2 + 1}
            x2={(width / 20 / 3) * i}
            y2={height / 2 - 1}
            stroke="black"
        />
    {/each}

    <polyline
        points={_data_s
            .map((g, i) => `${i * interval + interval / 2 - 5},${height / 2 - (g / maxGoals_s) * (height / 2)}`)
            .join(' ')}
        fill="none"
        stroke="teal"
        stroke-width="1"
    />

    <polyline
        points={_data_r
            .map((g, i) => `${i * interval + interval / 2 - 5},${height / 2 + (g / maxGoals_r) * (height / 2)}`)
            .join(' ')}
        fill="none"
        stroke="crimson"
        stroke-width="1"
    />

    <!-- <path
        d="{_data_r.map((g, i) => (i===0?'M':'L')+`${i * interval + 20 + interval / 2},${height / 2 + (g / maxGoals_r) * (height /2)}`).join(' ')}"
        fill="none"
        stroke="blue"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
    /> -->
</svg>

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

    const periodLength = 20; // TODO: from league

    function timeToMinutes(timeStr: string) {
        const [minutes, seconds] = timeStr.split(':').map(Number);
        return (minutes % periodLength) + seconds / 60;
    }

    function calculatePosition(timeStr: string) {
        const minutes = timeToMinutes(timeStr);
        return (minutes / periodLength) * 100;
    }

    let _data_s = new Array((3 * 20) / 1).fill(0);
    let _data_r = new Array((3 * 20) / 1).fill(0);

    $: data.goals.goalsScored.forEach(goal => {
            let [minutes, seconds] = goal.Time.split(':').map(Number);
            let period = Number(goal.Period);
            let totalMinutes = (period - 1) * 20 + (minutes % 20);
            let intervalIndex = Math.floor(totalMinutes / 1);
            _data_s[intervalIndex]++;
        });
    $: data.goals.goalsRecieved.forEach(goal => {
            let [minutes, seconds] = goal.Time.split(':').map(Number);
            let period = Number(goal.Period);
            let totalMinutes = (period - 1) * 20 + (minutes % 20);
            let intervalIndex = Math.floor(totalMinutes / 1);
            _data_r[intervalIndex]++;
        });


    const width = 756;
    $: height = maxGoals_s + 50;
    const interval = width / _data_s.length;
    $: maxGoals_s = Math.max(..._data_s);
    $: maxGoals_r = Math.max(..._data_r);
</script>
