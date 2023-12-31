<style lang="postcss">
    ul {
        scroll-padding: 0;
        scroll-snap-align: center;
        scroll-snap-type: x mandatory;
        user-select: none;
    }
    li {
        width: 100%;
        display: flex;
    }
</style>

<ul class="flex w-full list-none flex-row gap-3.5 overflow-x-scroll px-4 py-2.5 bg-transparent max-w-[80vw]">
    {#if finishedGames.length > 0}
        <!-- <li>
            <a href="/" class="">Vergangene Spiele</a>
        </li> -->

        {#each finishedGames as game}
            <li>
                <MatchCard {game}></MatchCard>
            </li>
        {/each}
    {/if}

    {#if todayGames.length > 0}
        {#each todayGames as game}
            <li>
                <MatchCard {game}></MatchCard>
            </li>
        {/each}
    {/if}

    {#if liveGames.length > 0}
        {#each liveGames as game}
            <li>
                <MatchCard {game}></MatchCard>
            </li>
        {/each}
    {/if}

    {#if upcomingGames.length > 0}
        {#each upcomingGames as game}
            <li>
                <MatchCard {game}></MatchCard>
            </li>
        {/each}

        <!-- <li>
            <a href="/" class="">Weitere Spiele</a>
        </li> -->
    {/if}
</ul>

<script lang="ts">
    import MatchCard from '$lib/components/MatchCard.svelte';
    import { type GameCardInfo } from '$lib/types';
    import { onMount } from 'svelte';

    export let upcomingGames: GameCardInfo[] = [];
    export let todayGames: GameCardInfo[] = [];
    export let liveGames: GameCardInfo[] = [];
    export let finishedGames: GameCardInfo[] = [];

    onMount(() => {
        let id = 0;
        if (liveGames.length > 0) id = liveGames[0].gameId;
        else if (todayGames.length > 0) id = todayGames[0].gameId;
        else if (upcomingGames.length > 0) id = upcomingGames[0].gameId;
        else if (finishedGames.length > 0) id = finishedGames[finishedGames.length - 1].gameId;

        if (id > 0) {
            var element = document.getElementById(id.toString());
            element?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' });
        }
    });
</script>
