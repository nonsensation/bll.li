<style lang="postcss">
    section {
        .title {
        }

        main {
            display: grid;
            place-items: center;

            .gamecard {
            }
        }
    }

    @media (min-width: 576px) {
        section {
            .title {
            }
            max-height: 75vh;

            main {
                .gamecard {
                }
            }
        }
    }
</style>

<!-- <svelte:head>
    <title>Black Lions - {data.team.name}</title>
    <meta name="description" content="Black Lions - {data.team.name}" />
</svelte:head> -->

{#await data}
    <span>Loading..</span>
{:then data}
    <article class="content grid grid-flow-row items-center gap-3.5 p-3.5">
        <h2 class="title pb-3.5 text-center text-[2rem] font-bold underline">{data.team.name}</h2>

        {#if data.upcomingGames && data.upcomingGames.length > 0}
            <section>
                <h3 class="title pb-3.5 text-center text-[1.5rem] font-bold">
                    {#if data.upcomingGames.length > 1}
                        Kommende Spiele
                    {:else}
                        Nächstes Spiel
                    {/if}
                </h3>
                <main class="">
                    {#each data.upcomingGames as game}
                        {@const url = SM.UrlBuilder.getMatchReportUrl(game.gameId, game.leagueId, game.leagueSlug)}
                        <a href={url} class=""><MatchCard {game} /></a>
                    {/each}
                </main>
            </section>
        {/if}

        {#if data.finishedGames && data.finishedGames.length > 0}
            <section>
                <h3 class="title pb-3.5 text-center text-[1.5rem] font-bold">
                    {#if data.finishedGames.length > 1}
                        Vergangene Spiele
                    {:else}
                        Letztes Spiel
                    {/if}
                </h3>
                <main class="grid gap-1.5">
                    {#each data.finishedGames as game}
                        {@const url = SM.UrlBuilder.getMatchReportUrl(game.gameId, game.leagueId, game.leagueSlug)}
                        <a href={url} class=""><MatchCard {game} /></a>
                    {/each}
                </main>
            </section>
        {/if}
    </article>
{/await}

<script lang="ts">
    import type { TeamMatchInfo } from '$lib/Saisonmanger';
    import MatchCard from '$lib/components/MatchCard.svelte';
    import { SM } from 'floorball-saisonmanager';

    export let data: TeamMatchInfo;
</script>
