<style lang="postcss">
.timeline {
    --icon-size: 0.5rem;
    --line-size: 2px;
    --border-size: 2px;
    position: relative;
    
    @apply relative py-16;

    & .period {
        position: relative;
        height: 0px;
    }

    .line {
        height: var(--line-size);
    }

    .top,
    .bot {
        position: relative;
        height: var(--icon-size);
    }

    & .goal {
        --color: teal;
        position: absolute;
        top: 0;
        width: var(--icon-size);
        height: var(--icon-size);
        border: var(--border-size) solid var(--color);
        border-radius: 50%;
    }

    & .regular {
        --color: green;
    }

    & .received {
        --color: crimson;
    }

    & .penalty_shot {
        --color: cornflowerblue;
        z-index: 10;
        /* background-color: var(--color); */
    }

    & .owngoal {
        --color: sandybrown;
        color: sandybrown;
        z-index: 10;
        /* background-color: var(--color); */
    }

    & .goal {
        &:hover,
        &:focus-within {
            background-color: var(--color);
        }
    }
}

.icon {
    @apply h-10 w-10;
}
</style>

<div class="timeline flex flex-col gap-12 md:grid md:grid-cols-{numPeriods}">
    {#each periodsArray as period}
        <div class="period">
            <div class="top">
                {#each goals.goalsScored.filter(g => +g.Period === period) as g}
                    <a
                        href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                        class="goal {g.GoalType}"
                        style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--icon-size))"
                        title="{g.GoalType == 'penalty_shot'
                            ? 'Strafschuss'
                            : g.GoalType == 'owngoal'
                              ? 'Eigentor'
                              : 'Tor'} - {g.Period}. Drittel {g.Time}"
                    >
                        <!-- <Icon
                            icon="GOAL"
                            class="icon"
                        ></Icon> -->
                    </a>
                {/each}
            </div>
            <div class="line bg-txt my-1"></div>
            <div class="bot">
                {#each goals.goalsRecieved.filter(g => +g.Period === period) as g}
                    <a
                        href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                        class="goal received {g.GoalType}"
                        style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--icon-size))"
                        title="{g.GoalType == 'penalty_shot'
                            ? 'Strafschuss'
                            : g.GoalType == 'owngoal'
                              ? 'Eigentor'
                              : 'Tor'} - {g.Period}. Drittel {g.Time}"
                    >
                        <span></span>
                        <!-- <Icon
                            icon="FLOORBALL2"
                            class="icon"
                        ></Icon> -->
                    </a>
                {/each}
            </div>
        </div>
    {/each}
</div>

<!-- <h1>Periods Information</h1>
<p>Number of Periods: {numPeriods}</p>
<p>Periods Array: {JSON.stringify(periodsArray)}</p>
<p>Periods Array: {JSON.stringify(goals)}</p> -->

<script lang="ts">
import Icon from '$lib/components/Icon.svelte';

export let goals;

export let periodLength = 20;

function timeToMinutes(timeStr: string) {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return (minutes % 21) + seconds / 60;
}

function calculatePosition(timeStr: string) {
    const minutes = timeToMinutes(timeStr);
    return (minutes / periodLength) * 100;
}

$: combinedEvents = [...goals.goalsScored, ...goals.goalsRecieved];
$: periods = [...new Set(combinedEvents.map(ev => Number(ev.Period)))];
$: numPeriods = periods.length;
$: periodsArray = periods.sort((a, b) => a - b);
</script>
