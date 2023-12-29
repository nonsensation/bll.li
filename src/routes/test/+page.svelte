<style lang="postcss">
    .content {
        max-width: 100vw;
    }

    .matches {
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
</style>

<svelte:head>
    <title>Black Lions Landsberg</title>
    <meta name="description" content="Black Lions Landsberg - Floorball Verein" />
</svelte:head>

<div class="content">
    <h1>Black Lions Landsberg</h1>
    <GamesSlider/>
</div>

<script lang="ts">
    import GamesSlider from '$lib/components/GamesSlider.svelte';
</script>
