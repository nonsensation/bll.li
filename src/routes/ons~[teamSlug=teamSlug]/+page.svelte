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

    h3 {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 0.5rem;

        padding-top: 2rem;
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
                        <a href={url} class="text-black hover:no-underline"><MatchCard {game} /></a>
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
                        <a href={url} class="text-black hover:no-underline"><MatchCard {game} /></a>
                    {/each}
                </main>
            </section>
        {/if}
    </article>
{/await}

<h2 class="title pb-3.5 text-center text-[2rem] font-bold underline">Kader</h2>


<div class="flex h-full w-full flex-col flex-wrap content-center items-center justify-center  gap-0 gap-x-10  p-10">
    <h3>Goalies</h3>

    <div class="flex flex-wrap content-evenly items-center justify-center gap-x-20">
        {#each [...Array(3)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Defense</h3>

    <div class="flex flex-wrap content-evenly items-center justify-center gap-x-20">
        {#each [...Array(7)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Center</h3>

    <div class="flex flex-wrap content-evenly items-center justify-center gap-x-20">
        {#each [...Array(3)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Offensiv</h3>

    <div class="flex flex-wrap content-evenly items-center justify-center gap-x-20">
        {#each [...Array(7)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Trainer</h3>

    <div class="flex flex-wrap content-evenly items-center justify-center gap-x-20">
        {#each [...Array(1)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>
</div>

<script lang="ts">
    import type { TeamMatchInfo } from '$lib/Saisonmanger';
    import MatchCard from '$lib/components/MatchCard.svelte';
    import { SM } from 'floorball-saisonmanager';
    import PlayerCard from './PlayerCard.svelte';

    export let data: TeamMatchInfo;

    import imgPoster from './poster.png';
    import imgPopup from './popup.png';

    const playerInfo = {
        name: 'Kim Nilsson',
        imgPoster,
        imgPopup,
        position: 'Offense',
    };
</script>
