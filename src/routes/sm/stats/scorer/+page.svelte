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
        @apply grid grid-cols-[4fr,1fr,1fr,1fr,1fr] items-center gap-2 md:grid-cols-[4fr,1fr,1fr,1fr,1fr,4fr];
        /* grid-template-columns: 1fr 5fr 1fr 1fr 5fr; */
    }

    .skeleton {
        animation: skeleton-loading 1s linear infinite alternate;
        @apply h-4 w-full rounded;
    }

    @keyframes skeleton-loading {
        0% {
            background-color: hsla(201, 10%, 73%, 0.3);
        }
        100% {
            background-color: hsla(204, 20%, 95%, 0.1);
        }
    }

    input,
    select {
        @apply w-full cursor-pointer rounded bg-sf;
    }

    /* a:hover, a:active, a:focus {
   border: 1px dotted #f00;
} */
</style>

<!-- <SuperDebug data={$form} /> -->

<h2 class="text-center text-4xl">
    <div class="">Topscorer</div>
</h2>

<div class="*:focus:outline-prim">
    <form method="GET" class="my-8 flex w-full flex-wrap justify-center gap-2">
        <div class="">
            <input type="text" bind:value={$form.name} name="name" placeholder="Spielername" />
        </div>

        <div class="">
            <select name="fieldSize" bind:value={$form.fieldSize}>
                <option value="">Alle Spielfeldgrößen</option>
                <option value="GF">Großfeld</option>
                <option value="KF">Kleinfeld</option>
            </select>
        </div>

        <div class="">
            <select name="junior" bind:value={$juniorProxy}>
                <option value="">Alle Altersstufen</option>
                <option value="true">Jugend</option>
                <option value="false">Erwachsene</option>
            </select>
        </div>

        <div class="">
            <select name="female" bind:value={$femaleProxy}>
                <option value="">Alle Ligen</option>
                <option value="1">Damen</option>
                <option value="0">Herren</option>
            </select>
        </div>

        <div class="">
            <select name="season" id="season" class="" bind:value={$form.season}>
                <option value="">Alle Saisons</option>
                {#each data.seasonIds as seasonId}
                    <option value={seasonId}>{2008 + seasonId}/{2009 + seasonId}</option>
                {/each}
            </select>
        </div>

        <div class="">
            <input
                type="submit"
                value="Suchen"
                class="cursor-pointer rounded border border-txt2 bg-sf2 px-4 py-2 text-center hover:bg-sf3"
            />
        </div>
    </form>
</div>

<div class="">
    <div class="row sticky top-0 w-full border-b border-b-prim bg-sf py-4 font-bold">
        <div class="text-right">Name</div>
        <div class="text-center">Platz</div>
        <div class="text-center">Tore</div>
        <div class="text-center">Assists</div>
        <div class="text-center md:mr-4">Spiele</div>
        <div class="hidden grid-cols-5 justify-center justify-self-stretch text-center md:grid md:pl-4">
            <div class="">2'</div>
            <div class="">2+2'</div>
            <div class="">5'</div>
            <div class="">10'</div>
            <div class="" title="Matchstrafe">MS</div>
        </div>
    </div>

    {#await data.scorers}
        {#each Array(data.pageSize) as _, idx}
            <div class="row rounded border border-transparent *:py-2 odd:bg-sf3">
                <div class="skeleton text-right">&nbsp;</div>
                <div class="text-center font-bold">{(currentPage - 1) * data.pageSize + idx + 1}</div>
                <div class="skeleton text-center">&nbsp;</div>
                <div class="skeleton text-center">&nbsp;</div>
                <div class="skeleton text-center md:mr-4">&nbsp;</div>
                <div class="hidden grid-cols-5 justify-center justify-self-stretch text-center md:grid md:pl-4">
                    <div class="skeleton">&nbsp;</div>
                    <div class="skeleton">&nbsp;</div>
                    <div class="skeleton">&nbsp;</div>
                    <div class="skeleton">&nbsp;</div>
                    <div class="skeleton">&nbsp;</div>
                </div>
            </div>
        {/each}

        {#await loadTotalScorers()}
            <div class="w-full py-2 text-center">Lade Spieler</div>
        {:then totalScorers}
            <div class="w-full py-2 text-center">
                Lade Platz {(currentPage - 1) * data.pageSize + 1} bis {currentPage * data.pageSize} von insgesamt {totalScorers}
                Spielern.
            </div>
        {/await}
    {:then scorers}
        {#each scorers as scorer, idx}
            <a
                href="/sm/stats/player?id={scorer.PlayerId}"
                class="row rounded border border-transparent *:py-2 odd:bg-sf3 hover:border-txt2"
            >
                <div class="text-right">{scorer.FirstName} {scorer.LastName}</div>
                <div class="text-center font-bold">{scorer.PlayerRank}.</div>
                <div class="text-center">{scorer.TotalGoals}</div>
                <div class="text-center">{scorer.TotalAssists}</div>
                <div class="text-center md:mr-4">{scorer.TotalGames}</div>
                <div class="hidden grid-cols-5 justify-center justify-self-stretch text-center md:grid md:pl-4">
                    <div class="">{scorer.TotalPenalty2}</div>
                    <div class="">{scorer.TotalPenalty2and2 ?? 0}</div>
                    <div class="">{scorer.TotalPenalty5 ?? 0}</div>
                    <div class="">{scorer.TotalPenalty10 ?? 0}</div>
                    <div class="">{scorer.TotalPenaltyMs ?? 0}</div>
                </div>
            </a>
        {/each}
    {/await}
</div>

<div class="my-8 flex w-full flex-wrap justify-center gap-2 *:rounded *:border *:px-4 *:py-2">
    {#if currentPage > count + 1}
        <a href="/sm/stats/scorer?">1</a>
        <div class="">...</div>
    {/if}
    {#each pages as idx}
        <a href="{generateUrl(data.pageSize * (idx - 1))}" class:isCurrentPage={currentPage === idx}>
            {idx}
        </a>
    {/each}
    {#if currentPage < totalPages - count}
        <div class="">...</div>
        <a href="{generateUrl(data.pageSize * (totalPages - 1))}">{totalPages}</a>
    {/if}
</div>

<script lang="ts">
    function generateUrl(skip: number) {
        const filters = Object.keys($form)
            .filter( key => $form[key] != null )
            .map( key => `${key}=${$form[key]}`)
            .join('&')
        return `/sm/stats/scorer?skip=${skip}&${filters}`
    }

    import SuperDebug from 'sveltekit-superforms';

    import { page } from '$app/stores';
    import { superForm, booleanProxy, intProxy } from 'sveltekit-superforms';

    export let data;

    const { form, enhance, capture, restore } = superForm(data.form);

    export const snapshot = { capture, restore };

    const seasonProxy = intProxy(form, 'season', { empty: 'null' });
    const femaleProxy = booleanProxy(form, 'female');
    const juniorProxy = booleanProxy(form, 'junior');

    $: skip = Math.max(0, Math.min(Number($page.url.searchParams.get('skip')) || 0, totalItems));
    $: totalItems = 0;

    $: totalPages = Math.ceil(totalItems / data.pageSize);
    $: currentPage = Math.floor(skip / data.pageSize) + 1;

    const count = 3;
    $: pages = Array.from({ length: count * 2 + 1 }, (_, i) => currentPage - count + i).filter(
        i => i > 0 && i <= totalPages
    );

    const loadTotalScorers = async () => {
        const totalScorers = await data.totalScorers;
        totalItems = totalScorers;
        return totalScorers;
    };
</script>
