<style lang="postcss">
    .content {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;

        position: relative;
    }

    .matches {
        z-index: 2;
        display: grid;
        gap: 1em;
        padding: calc(2 * var(--gap));
        overflow: scroll;
        max-height: 50vh;
        overflow-y: scroll;
        overflow-x: hidden;
        border-top: 0.2rem dashed lightgrey;
        border-bottom: 0.2rem dashed lightgrey;
    }

    .hline {
        /* border-top: 1px solid slategrey; */
        width: 100%;
    }

    span.title {
        text-align: center;
        font-weight: bold;
        font-size: 3rem;
        padding: 2rem 0;

        &.live {
            color: var(--color-text-highlight);
            font-size: 4rem;
        }
    }

    .scrollable-content::-webkit-scrollbar {
        display: none;
    }
    .scrollable-content {
        -ms-overflow-style: none;
    }

    .svg-box {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;

        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
    }
    .svg {
        filter: opacity(15%);
        object-fit: contain;
        width: 100%;
        height: 100%;
    }
    @media (orientation: landscape) {
        .vert {
            display: none;
        }
    }
    @media (orientation: portrait) {
        .horz {
            display: none;
        }
    }
</style>

<svelte:head>
    <title>Black Lions Landsberg</title>
    <meta name="description" content="Black Lions Landsberg - Floorball Verein" />
</svelte:head>

<div class="content">
    <section class="matches scrollable-content">
        {#await data}
            <span>Lade Spiele...</span>
        {:then data}
            {#if data.liveGames.length > 0}
                <span class="title live">LIVE</span>
                {#each data.liveGames as gameCard}
                    <GameCard {gameCard}></GameCard>
                {/each}
            {/if}

            {#if data.upcomingGames.length > 0}
                <span class="title">Kommende Spiele</span>
                {#each data.upcomingGames as gameCard}
                    <GameCard {gameCard}></GameCard>
                {/each}
            {/if}

            {#if data.finishedGames.length > 0}
                <span class="title">Vergangene Spiele</span>
                {#each data.finishedGames as gameCard}
                    <GameCard {gameCard}></GameCard>
                {/each}
            {/if}
        {:catch error}
            <p>Fehler beim Laden der Spiele: {error.message}</p>
        {/await}
    </section>

    <div class="svg-box">
        <img src={FloorballFieldHorz} alt="" class="svg horz" />
        <img src={FloorballFieldVert} alt="" class="svg vert" />
    </div>
</div>

<script lang="ts">
    import GameCard from './GameCard.svelte';

    import FloorballFieldVert from '$lib/FloorballFieldVert.svg';
    import FloorballFieldHorz from '$lib/FloorballFieldHorz.svg';

    // this gets renamed when I rename the route folder..
    //export let data../ons/$types.js;
    export let data;
</script>
