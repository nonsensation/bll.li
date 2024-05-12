<style lang="postcss">
    .event {
        display: grid;
        grid-template-columns:
            [home-logo] 5em
            [home-player] 1fr
            [home-status] 5em
            [middle] 7ch
            [guest-status] 5em
            [guest-player] 1fr
            [guest-logo] 5em;
    }
</style>

{#await data.game}
    <div class="" transition:fade>
        Lade Spiel #{data.gameId}
    </div>
    <div class="" transition:fade on:introstart={() => (visible = false)} on:outroend={() => (visible = true)}></div>
{:then game}
    {#if game && visible}
        <div transition:fade class="timeline w-full">
            <div class="events">
                <div class="header sticky top-0 grid grid-cols-3 border-b rounded py-4 mb-4 bg-sf *:flex *:place-content-center">
                    <div class="home">
                        <img src="/favicon.png" alt="" class="max-h-32 max-w-full" />
                    </div>
                    <div class="score flex-col items-center">
                        <div class="score">8-2</div>
                        <div class="score">8-2</div>
                        <div class="score">8-2</div>
                        <div class="score">8-2</div>
                    </div>
                    <div class="guest">
                        <img src="/favicon.png" alt="" class="max-h-32 max-w-full" />
                    </div>
                </div>
                {#each game.events as event}
                    {@const { min, sec } = extractTime(event.time)}
                    {@const team = event.event_team}
                    <div class="event *:row-start-1 *:border-b *:border-sf2 *:p-2">
                        {#if event.event_type == SM.EventType.Goal}
                            <div class="col-[{team}-status]">
                                {#if event.goal_type}
                                    {#if event.goal_type == SM.GoalType.Owngoal}
                                        <FLOORBALL /> Eigentor
                                    {:else if event.goal_type == SM.GoalType.Regular}
                                        <FLOORBALL /> Tor
                                    {:else if event.goal_type == 'penalty_shot'}
                                        <FLOORBALL /> Penalty
                                    {:else}
                                        ???
                                    {/if}
                                {/if}
                            </div>

                            <div class="col-[{team}-player]">
                                {event.number}
                            </div>
                            <div class="col-[{team}-logo]">
                                <img src="/favicon.png" alt="" class="md:hidden" />
                            </div>

                            <div class="col-[middle] *:grid *:grid-cols-[1fr,auto,1fr]">
                                <div class="time text-txt2">
                                    <span class="min place-self-end">{min}</span>
                                    <span class="">:</span>
                                    <span class="sec">{sec}</span>
                                </div>
                                <div class="goals font-bold text-3xl border-sf2 rounded-xl text-center">
                                    <span class="">{event.home_goals}</span>
                                    <span class="">-</span>
                                    <span class="">{event.guest_goals}</span>
                                </div>
                            </div>
                        {:else if event.event_type == SM.EventType.Penalty}
                            <div class="col-[{team}-status]">Strafe</div>
                        {:else if event.event_type == SM.EventType.Timeout}
                            <div class="col-[{team}-status]">Auszeit</div>
                        {:else}
                            <div class="col-[{team}-status]">???</div>
                        {/if}
                    </div>
                {/each}
            </div>
            <!-- events -->

            <div class="teams grid grid-cols-1 md:grid-cols-2 gap-16">
                {#each ['home', 'guest'] as team}
                    <div class="team team-{team}">
                        {#each sortPlayers(game.players[team]) as p}
                            <div
                                class="player grid grid-cols-[2em,1fr,auto,auto] gap-2 px-4 py-1 border justify-center items-center border-transparent hover:border-l-prim hover:border-r-prim border-b-sf2"
                            >
                                <div
                                    class="h-full font-bold border-r border-prim place-self-end self-center px-4"
                                    class:captain={p.captain}
                                    class:goalkeeper={p.goalkeeper}
                                >
                                    {p.trikot_number}
                                </div>
                                <div class="name px-2">
                                    {p.player_firstname}
                                    {p.player_name}
                                    {#if p.captain}
                                        (C)
                                    {/if}
                                </div>
                                <div class="name text-txt2 text-sm leading-3">
                                    {#if p.goalkeeper}
                                        Tor
                                    {:else}
                                        Feld
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/each}
            </div>
        </div>
    {/if}
{:catch error}
    <div class="error">{error.message}</div>
{/await}

<script lang="ts">
    import FLOORBALL from '$lib/components/icons/FLOORBALL2.svelte';
    import TRIKOT from '$lib/components/icons/TRIKOT.svelte';
    import CAPTAIN from '$lib/components/icons/CAPTAIN.svelte';
    import HELMET from '$lib/components/icons/GOAL.svelte';

    import { fade } from 'svelte/transition';
    import { SM } from 'floorball-saisonmanager';

    export let data;

    let visible = false;

    function sortPlayers(players: SM.Player[]) {
        players.sort((p1, p2) => p1.trikot_number - p2.trikot_number);

        return players;
    }

    function extractTime(time: string) {
        const parts = time.split(':');

        let min = parts[0] ?? '00';
        let sec = parts[1] ?? '00';

        if (min.length < 2) min = '0' + min;
        if (sec.length < 2) sec = '0' + sec;

        return {
            min,
            sec,
        };
    }
</script>
