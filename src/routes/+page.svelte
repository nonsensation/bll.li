<style lang="postcss">
    h1 {
        z-index: 2;
        padding: 0;
        margin: 0;
        font-size: 4rem;
        font-weight: bolder;
        text-align: center;
        filter: drop-shadow(0 0 1rem var(--color-shadow));
    }

    .content {
        display: grid;
        grid-template-rows: auto 1fr;
        place-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        position: relative;
    }

    .gamesSlider {
        padding: 1rem;
        width: 100%;
        overflow-y: scroll;
    }

    .hline {
        /* border-top: 1px solid slategrey; */
        width: 100%;
    }

    span.title {
        text-align: center;
        font-weight: bold;
        font-size: 2rem;
        padding: 1rem 0;
        /* filter: drop-shadow(0 0 1rem var(--color-shadow)); */

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
        filter: opacity(100%);
        object-fit: contain;
        width: 100%;
        height: 100%;

        /* filter: drop-shadow(0 0 1rem var(--color-shadow)); */
        filter: invert();
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
    <h1 style="text-align: center; width: 100%;">Black Lions Landsberg</h1>
    {#await data}
        <span>Loading Games...</span>
    {:then data}
        <div class="gamesSlider"><GamesSlider {...data} /></div>
    {/await}
</div>

<script lang="ts">
    import GamesSlider from '$lib/components/GamesSlider.svelte';
    import { onMount } from 'svelte';

    // this gets renamed when I rename the route folder..
    //export let data../ons/$types.js;
    export let data;
</script>
