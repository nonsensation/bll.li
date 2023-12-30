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
    <article class="content">
        <h2>Team: {data.team.name}</h2>

        {#if data.upcomingGames && data.upcomingGames.length > 0}
            <section>
                <h3 class="title">Kommende Spiele</h3>
                <main>
                    {#each data.upcomingGames as game}
                        <div class="gamecard"><GameCard {game} /></div>
                    {/each}
                </main>
            </section>
        {/if}

        {#if data.finishedGames && data.finishedGames.length > 0}
            <section>
                <h3 class="title">Vorherige Spiele</h3>
                <main>
                    {#each data.finishedGames as game}
                        <div class="gamecard"><GameCard {game} /></div>
                    {/each}
                </main>
            </section>
        {/if}
    </article>
{/await}

<script lang="ts">
    import type { TeamMatchInfo } from '$lib/Saisonmanger';
    import GameCard from '$lib/components/GameCard.svelte';
    import { onMount } from 'svelte';

    export let data: TeamMatchInfo;
</script>
