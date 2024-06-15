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
            border-color: teal;
        }

        & .goal-r {
            top: calc(var(--size) * 0.5);
            border-color: darkviolet;
        }

        & .penalty_shot {
            background-color: violet;
            z-index: 10;
        }
    }

    .filter {
        @apply  select-none;

        & label {
            @apply cursor-pointer rounded border-2 px-2 py-1 text-txt bg-sf3;

            &:has(input:checked) {
                @apply border-green-500;
            }
            &:has(:not(input:checked)) {
                @apply border-sf2;
            }
            & input {
                display: none;
            }
        }
    }
</style>

<div class="my-10">
    <div class="flex flex-wrap justify-center gap-8 gap-y-2 text-sm filter *:flex *:gap-2">
        <div class="">
            <label><input type="checkbox" bind:checked={isFemale} />Damen</label>
            <label><input type="checkbox" bind:checked={isNotFemale} />Herren</label>
        </div>
        <div class="">
            <label><input type="checkbox" bind:checked={isJunior} />Jugend</label>
            <label><input type="checkbox" bind:checked={isNotJunior} />Erwachsen</label>
        </div>
        <div class="">
            <label><input type="checkbox" bind:checked={fieldSizeKF} />Kleinfeld</label>
            <label><input type="checkbox" bind:checked={fieldSizeGF} />Großfeld</label>
        </div>
    </div>

    <div class="mb-4 text-sm">{gls.length} Tore</div>
    <div class="timeline flex flex-col gap-10 md:grid md:grid-cols-{numPeriods}">
        {#each periodsArray as period}
            <div class="period period-{period}">
                {#each gls.filter(g => +g.Period === period) as g}
                    <a
                        href="/sm/match?gameId={g.GameId}#event-{g.EventId}"
                        class="goal goal-s {g.GoalType}"
                        style="left: calc({calculatePosition(g.Time)}% - 0.5 * var(--size))"
                        title="{g.GoalType == 'penalty_shot' ? 'Strafschuss' : 'Tor'} - {g.Period}. Drittel {g.Time}"
                        ><span></span></a
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
    <div class="mt-4 text-sm">{ass.length} Vorlagen</div>
</div>

<!-- <h1>Periods Information</h1>
<p>Number of Periods: {numPeriods}</p>
<p>Periods Array: {JSON.stringify(periodsArray)}</p> -->
<!-- <p>Periods Array: {JSON.stringify(goals)}</p>  -->

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

    $: combinedEvents = [...gls, ...ass];
    $: periods = [...new Set(combinedEvents.map(ev => Number(ev.Period)))];
    $: numPeriods = periods.length;
    $: periodsArray = periods.sort((a, b) => a - b);

    $: isFemale = true;
    $: isNotFemale = true;
    $: isJunior = true;
    $: isNotJunior = true;
    $: fieldSizeGF = true;
    $: fieldSizeKF = true;

    $: ass = goals.assists.filter(x => filterEvent(x));
    $: gls = goals.goals.filter(x => filterEvent(x));

    // TODO: why is .IsFemale a string?!
    $: filterEvent = item => {
        const genderMatch =
            (isFemale && isNotFemale) || (isFemale && item.IsFemale === '1') || (isNotFemale && item.IsFemale === '0');
        const juniorMatch =
            (isJunior && isNotJunior) || (isJunior && item.IsJunior === '1') || (isNotJunior && item.IsJunior === '0');
        const fieldSizeMatch =
            (fieldSizeGF && fieldSizeKF) ||
            (fieldSizeGF && item.FieldSize === 'GF') ||
            (fieldSizeKF && item.FieldSize === 'KF');

        return genderMatch && juniorMatch && fieldSizeMatch;
    };
</script>
