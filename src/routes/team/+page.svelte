<div class="games flex flex-col w-full items-center gap-4">
    {#each games.slice(0, 2) as game}
        <GameCard {game} {leagueId} {leagueName} />
    {/each}
</div>

<hr />

{#await data}
    Lade posts..
{:then data}
    Posts: {data.posts}
{:catch err}
    ERROR: {err}
{/await}

<script lang="ts">
    import GameCard from '$lib/components/GameCard/GameCard.svelte';
    import type { SM } from 'floorball-saisonmanager';

    import leagues from '$lib/static/floorball-saisonmanager-data/data/api/v2/leagues.json';
    import gameSchedule from '$lib/static/floorball-saisonmanager-data/data/api/v2/leagues/601/schedule.json';

    let games = gameSchedule;

    let leagueId = 601;
    let leagueName = leagues.filter((l: any) => l.id == leagueId)[0].name;


    export let data;
</script>
