<style lang="postcss">
    .timeline {
        --size: 8px;
        position: relative;

        & .period {
            position: relative;
            height: 0px;
            border-bottom: 1px solid var(--color-text);
        }

        & .goal {
            position: absolute;
            top: 0;
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            border: 1px solid var(--color-text);
            background-color: var(--color-surface);

            &:hover , &:focus-within {
                border-width: 2px;
                --size: 10px;
            }
        }

        & .goal-s {
            top: calc(var(--size)*-1.5);
            border-color: teal;
        }

        & .goal-r {
            top: calc(var(--size)*0.5);
            border-color: crimson;
        }

        & .penalty_shot {
            background-color: violet;
            z-index: 10;
        }

        & .owngoal {
            background-color: orange;
            z-index: 10;
        }

        & .regular {
        }
    }
</style>

<div class="timeline flex flex-col gap-12 md:grid md:grid-cols-{numPeriods}">
    {#each periodsArray as period}
        <div class="period">
            {#each goals.goalsScored.filter(g => +g.Period === period) as g}
                <a
                    href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                    class="goal goal-s {g.GoalType}"
                    style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--size))"
                    title="{g.GoalType == 'penalty_shot'
                        ? 'Strafschuss'
                        : g.GoalType == 'owngoal'
                          ? 'Eigentor'
                          : 'Tor'} - {g.Period}. Drittel {g.Time}"><span></span></a
                >
            {/each}

            {#each goals.goalsRecieved.filter(g => +g.Period === period) as g}
                <a
                    href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                    class="goal goal-r {g.GoalType}"
                    style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--size))"
                    title="{g.GoalType == 'penalty_shot'
                        ? 'Strafschuss'
                        : g.GoalType == 'owngoal'
                          ? 'Eigentor'
                          : 'Tor'} - {g.Period}. Drittel {g.Time}"><span></span></a
                >
            {/each}
        </div>
    {/each}
</div>

<!-- <h1>Periods Information</h1>
<p>Number of Periods: {numPeriods}</p>
<p>Periods Array: {JSON.stringify(periodsArray)}</p>
<p>Periods Array: {JSON.stringify(goals)}</p> -->

<script lang="ts">
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
