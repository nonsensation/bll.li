<style lang="postcss">
    .content {
        max-width: 100vw;
    }

    .matches {
        scroll-padding: 0;
        scroll-snap-align: center;
        scroll-snap-type: x mandatory;

        max-width: 80vw;
        display: flex;
        flex-direction: row;
        list-style: none;
        gap: 1rem;
        overflow: scroll;
        padding: 3rem;

        border-radius: var(--border-radius);
        box-shadow: inset var(--shadow);
        background-color: gainsboro;
        /* background: white url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0; */
    }

    ul {
        li {
            display: flex;
        }

        /* writing-mode changes padding-right...*/
        .previous {
            /* writing-mode: sideways-lr; */
        }
        .upcoming {
            /* writing-mode: sideways-rl; */
        }

        .upcoming,
        .previous,
        .info {
            font-weight: bold;
            --bg: url(https://www.fcbarcelona.com/resources/v2.82.2-5582/i/bg-elements/stripes-horizontal-fade.png);
            box-shadow: var(--shadow);
            color: rgb(255, 255, 255);
            background-color: rgb(255, 0, 89);
            background-color: rgb(0, 0, 0);
            background-size: 100% 100%;
            background-image: var(--bg);
            text-align: center;
            padding: 1rem;

            border-radius: var(--border-radius);
        }

        .info {
            writing-mode: vertical-lr;
            text-orientation: upright;
            padding: 0 0.5rem;
            display: none;
        }
    }
</style>

<ul id="GamesSlider" class="matches scrollable-content">
    {#if finishedGames.length > 0}
        <li>
            <a href="/" class="btn previous">Vergangene Spiele</a>
        </li>

        {#each finishedGames as game}
            <li>
                <GameCard {game}></GameCard>
            </li>
        {/each}
    {/if}

    {#if todayGames.length > 0}
        {#each todayGames as game}
            <li>
                <GameCard {game}></GameCard>
            </li>
        {/each}
    {/if}

    {#if liveGames.length > 0}
        {#each liveGames as game}
            <li>
                <GameCard {game}></GameCard>
            </li>
        {/each}
    {/if}

    {#if upcomingGames.length > 0}
        {#each upcomingGames as game}
            <li>
                <GameCard {game}></GameCard>
            </li>
        {/each}

        <li>
            <a href="/" class="btn upcoming">Weitere Spiele</a>
        </li>
    {/if}
</ul>

<script lang="ts">
    import GameCard from '$lib/components/GameCard.svelte';
    import { type GameCardInfo } from '$lib/types';
    import { onMount } from 'svelte';

    export let upcomingGames: GameCardInfo[] = [];
    export let todayGames: GameCardInfo[] = [];
    export let liveGames: GameCardInfo[] = [];
    export let finishedGames: GameCardInfo[] = [];

    onMount(() => {
        console.log('MOUNTIND');
        let id = 0;
        if (liveGames.length > 0) id = liveGames[0].gameId;
        else if (todayGames.length > 0) id = todayGames[0].gameId;
        else if (upcomingGames.length > 0) id = upcomingGames[0].gameId;
        else if (finishedGames.length > 0) id = finishedGames[finishedGames.length - 1].gameId;

        console.log(id);

        if (id > 0) {
            var element = document.getElementById(id.toString());
            element!.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
        }
    });
</script>
