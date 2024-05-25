<!-- <div class="games flex flex-col w-full items-center gap-4">
    {#each games.slice(0, 2) as game}
        <GameCard {game} {leagueId} {leagueName} />
    {/each}
</div> -->

<style lang="postcss">
    .isCurrentPage {
        @apply font-bold text-prim;
    }

    .row {
        @apply grid grid-cols-[4fr,1fr,1fr,1fr] items-center gap-2 md:grid-cols-[4fr,1fr,1fr,1fr,6fr];
        /* grid-template-columns: 1fr 5fr 1fr 1fr 5fr; */
    }
</style>

<div class="">
    {#await data.scorers}
        Loading
    {:then scorers}
        <div class="row sticky top-0 w-full border-b border-b-prim bg-sf py-4 font-bold">
            <div class="text-right">Name</div>
            <div class="text-center">Platz</div>
            <div class="text-center">Tore</div>
            <div class="text-center md:mr-4">Assists</div>
            <div
                class="hidden grid-cols-9 justify-center justify-self-stretch text-center md:grid md:pl-4"
            >
                <div class="">2'</div>
                <div class="">2+2'</div>
                <div class="" title="Technische Matchstrafe">t. MS</div>
                <div class="" title="Matchstrafe">MS</div>
                <div class="">5'</div>
                <div class="">10'</div>
                <div class="" title="Matchstrafe 1">MS 1</div>
                <div class="" title="Matchstrafe 2">MS 2</div>
                <div class="" title="Matchstrafe 3">MS 3</div>
            </div>
        </div>
        {#each scorers.scorer as scorer, idx}
            <a
                href="/sm/stats/player?id={scorer.playerId}"
                class="row rounded border border-transparent *:py-2 odd:bg-sf3 hover:border-txt2"
            >
                <div class="text-right">{scorer.firstName} {scorer.lastName}</div>
                <div class="text-center font-bold">{(currentPage - 1) * pageSize + idx + 1}</div>
                <div class="text-center">{scorer.goalsCount}</div>
                <div class="text-center md:mr-4">{scorer.assistsCount}</div>
                <div
                    class="hidden grid-cols-9 justify-center justify-self-stretch text-center md:grid md:pl-4"
                >
                    <div class="">{scorer.penalty2Count}</div>
                    <div class="">{scorer.penalty2and2Count}</div>
                    <div class="">{scorer.penaltyMsTechCount}</div>
                    <div class="">{scorer.penaltyMsFullCount}</div>
                    <div class="">{scorer.penalty5Count}</div>
                    <div class="">{scorer.penalty10Count}</div>
                    <div class="">{scorer.penaltyMs1Count}</div>
                    <div class="">{scorer.penaltyMs2Count}</div>
                    <div class="">{scorer.penaltyMs3Count}</div>
                </div>
            </a>
        {/each}
    {/await}
</div>

<div class="my-8 flex w-full flex-wrap justify-center gap-2 *:rounded *:border *:px-4 *:py-2">
    {#if currentPage > count + 1}
        <a href="/sm/stats/scorer?pageSize={pageSize}">1</a>
        <div class="">...</div>
    {/if}
    {#each pages as idx}
        <a href="/sm/stats/scorer?pageSize={pageSize}&skip={pageSize * (idx - 1)}" class:isCurrentPage={currentPage === idx}>
            {idx}
        </a>
    {/each}
    {#if currentPage < totalPages - count}
        <div class="">...</div>
        <a href="/sm/stats/scorer?pageSize={pageSize}&skip={pageSize * (totalPages - 1)}">{totalPages}</a>
    {/if}
</div>

<script lang="ts">
    import { page } from '$app/stores';
    export let data;

    $: pageSize = Number($page.url.searchParams.get('pageSize')) || 100;
    $: skip = Number($page.url.searchParams.get('skip')) || 0;
    $: totalItems = data.scorers.totalScorers;

    $: totalPages = Math.ceil(totalItems / pageSize);
    $: currentPage = Math.floor(skip / pageSize) + 1;

    const count = 3;
    $: pages = Array.from({ length: count * 2 + 1 }, (_, i) => currentPage - count + i).filter(
        i => i > 0 && i <= totalPages
    );

    let value = '';
</script>
