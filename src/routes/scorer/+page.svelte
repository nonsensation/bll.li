<!-- <div class="games flex flex-col w-full items-center gap-4">
    {#each games.slice(0, 2) as game}
        <GameCard {game} {leagueId} {leagueName} />
    {/each}
</div> -->

<style lang="postcss">
    .isCurrentPage {
        @apply text-prim;
    }
</style>

<div class="">
    currentPage: {currentPage}
    {#await data.scorers}
        Loading
    {:then scorers}
        <div class="grid grid-cols-5">
            <div class="">Platz</div>
            <div class="">Name</div>
            <div class="">Tore</div>
            <div class="">Assists</div>
            <div class="">ID</div>
            {#each scorers.scorer as scorer, idx}
                <div class="">#{currentPage * pageSize + idx + 1}</div>
                <div class="">
                    <a href="">
                        {scorer.firstName}
                        {scorer.lastName}
                    </a>
                </div>
                <div class="">{scorer.goalsCount}</div>
                <div class="" class:isCurrentPage={Number(data.scorers.assists[scorer.playerId] ?? 0) >= Number(scorer.goalsCount)}>
                    {data.scorers.assists[scorer.playerId] ?? 0} ({Math.round(((data.scorers.assists[scorer.playerId] ?? 0 )/scorer.goalsCount*100))}%)
                </div>
                <div class="">({scorer.playerId})</div>
            {/each}
        </div>
    {/await}
</div>

<div class="">
    {#each Array(totalPages) as _, idx}
        <a href="/scorer?pageSize={pageSize}&skip={pageSize * idx}" class:isCurrentPage={currentPage === idx}>
            {idx + 1}
        </a>
    {/each}
</div>

<script lang="ts">
    import { page } from '$app/stores';
    export let data;

    $: pageSize = Number($page.url.searchParams.get('pageSize')) || 10;
    $: skip = Number($page.url.searchParams.get('skip')) || 0;
    $: totalItems = data.scorers.totalScorers;
    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = Math.floor(skip / pageSize);
</script>
