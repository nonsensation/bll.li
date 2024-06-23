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

        &:hover,
        &:focus-within {
            border-width: 2px;
            --size: 10px;
        }
    }

    & .goal-s {
        top: calc(var(--size) * -1.5);
        @apply border-teal-500;
    }

    & .goal-r {
        top: calc(var(--size) * 0.5);
        @apply border-violet-500;
    }

    & .penalty_shot {
        @apply bg-orange-500;
        z-index: 10;
    }
}
</style>

<div class="my-10">
    <LeagueFilter
        bind:filterEvent="{filter}"
        getJuniorFn="{league => league.IsJunior === '1'}"
        getFemaleFn="{league => league.IsFemale === '1'}"
        getLeagueFn="{league => league}"
        getLeagueTypeFn={null}
    />

    <div class="mb-4 border-r-4 border-teal-500 pr-2 text-right text-sm">{gls.length} Tore</div>
    <div class="timeline flex flex-col gap-10 md:grid md:grid-cols-{numPeriods}">
        {#each periodsArray as period}
            <div class="period period-{period}">
                {#each gls.filter(g => +g.Period === period) as g}
                    <a
                        href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                        class="goal goal-s {g.GoalType}"
                        style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--size))"
                        title="{g.GoalType == 'penalty_shot'
                            ? 'Strafschuss'
                            : 'Tor'} - {g.Period}. Drittel {g.Time}"><span></span></a
                    >
                {/each}

                {#each ass.filter(g => +g.Period === period) as g}
                    <a
                        href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                        class="goal goal-r {g.GoalType}"
                        style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--size))"
                        title="Vorlage - {g.Period}. Drittel {g.Time}"><span></span></a
                    >
                {/each}
            </div>
        {/each}
    </div>
    <div class="mt-4 border-r-4 border-violet-500 pr-2 text-right text-sm">
        {ass.length} Vorlagen
    </div>
</div>

<!-- <h1>Periods Information</h1>
<p>Number of Periods: {numPeriods}</p>
<p>Periods Array: {JSON.stringify(periodsArray)}</p> -->
<!-- <p>Periods Array: {JSON.stringify(goals)}</p>  -->

<script lang="ts">
import LeagueFilter from '$lib/components/sm/LeagueFilter.svelte';

let filter;

export let goals;

// $:console.dir(goals.goals)

export let periodLength = 20;

function timeToMinutes(timeStr: string) {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return Math.min(Math.max(0, (minutes % 21) + seconds / 60), periodLength);
}

function calculatePosition(timeStr: string) {
    const minutes = timeToMinutes(timeStr);
    return (minutes / periodLength) * 100;
}

$: combinedEvents = [...gls, ...ass];
$: periods = [...new Set(combinedEvents.map(ev => Number(ev.Period)))];
$: numPeriods = periods.length;
$: periodsArray = periods.sort((a, b) => a - b);

$: ass = filter ? goals.assists.filter(filter) : [];
$: gls = filter ? goals.goals.filter(filter) : [];
</script>
