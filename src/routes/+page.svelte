<style lang="postcss">
</style>

<svelte:head>
    <title>Black Lions Landsberg</title>
    <meta name="description" content="Black Lions Landsberg - Floorball Verein" />
</svelte:head>

<div class="justify-center">
    {#await data}
        <span>Loading Games...</span>
    {:then data}
        <div class="gamesSlider"><GamesSlider {...data} /></div>
    {/await}
</div>

<script lang="ts">
    import GamesSlider from '$lib/components/GamesSlider.svelte';
    import { SeasonTeams } from '$lib/config/TeamInfo.js';
    import { UrlBuilder } from 'floorball-saisonmanager/lib/Saisonmanager/Api';
    import { onMount } from 'svelte';

    // this gets renamed when I rename the route folder..
    //export let data../ons/$types.js;
    export let data;
</script>
