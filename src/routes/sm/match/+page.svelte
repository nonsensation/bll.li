<style lang="postcss">
    .event {
        display: grid;
        grid-template-columns:
            [middle] 7ch
            [status home_status guest_status] 1fr
            [player home_player guest_player] 3fr
            [logo home_logo guest_logo] 3em;
    }

    @media (min-width: 768px) {
        .event {
            display: grid;
            grid-template-columns:
                [home_logo] 5em
                [home_player] 3fr
                [home_status] 1fr
                [middle] 5em
                [guest_status] 1fr
                [guest_player] 3fr
                [guest_logo] 5em;
        }
    }

    .col-home-logo {
        grid-column: home_logo;
    }
    .col-home-player {
        grid-column: home_player;
    }
    .col-home-status {
        grid-column: home_status;
    }
    .col-middle {
        grid-column: middle;
    }
    .col-logo {
        grid-column: logo;
    }
    .col-status {
        grid-column: status;
    }
    .col-player {
        grid-column: player;
    }
    .col-guest-status {
        grid-column: guest_status;
    }
    .col-guest-player {
        grid-column: guest_player;
    }
    .col-guest-logo {
        grid-column: guest_logo;
    }

    .ingame {
        @apply text-prim;
    }
    .paused {
        @apply text-prim;
    }

    .score {
        font-size: min(15vw, 1000%);
        line-height: 75%;
    }
    .sc {
        font-family: 'Quantico';
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @keyframes pulse {
        50% {
            opacity: 0.5;
        }
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
            <div class="events flex flex-col gap-y-4 mb-8">
                <div
                    class="header sticky top-0 grid grid-cols-3 border-b border-b-prim py-4 mb-4 bg-sf *:flex *:place-content-center *:flex-col *:items-center"
                >
                    <div class="home">
                        <img
                            src="https://saisonmanager.de/{game.home_team_logo}"
                            alt=""
                            class="h-[15vw] max-h-32 max-w-full"
                        />
                        <div class="name sm:font-bold pt-4 text-center text-sm">{game.home_team_name}</div>
                    </div>
                    <div class="flex flex-col justify-between items-between w-full">
                        <div
                            class="sc score font-bold grid grid-cols-3 text-center"
                            class:ingame={game.game_status === SM.GameState.Ingame}
                            class:paused={game.ingame_status.startsWith('pause')}
                        >
                            <div class="">{game.result?.home_goals ?? 0}</div>
                            <div class="" class:animate-pulse={game.game_status === SM.GameState.Ingame}>:</div>
                            <div class="">{game.result?.guest_goals ?? 0}</div>
                        </div>
                        <div class="period font-bold pt-4 md:text-base text-xs">{game.current_period_title?.title}</div>
                        <div class="gap-4 pt-4 text-txt2 hidden sm:flex md:text-base text-xs sc">
                            {#each [0, 1, 2] as p}
                                <div class="">
                                    {game.result?.home_goals_period[p] ?? 0} : {game.result?.guest_goals_period[p] ?? 0}
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="guest">
                        <img
                            src="https://saisonmanager.de/{game.guest_team_logo}"
                            alt=""
                            class="h-[15vw] max-h-32 max-w-full"
                        />
                        <div class="name sm:font-bold pt-4 text-center text-sm">{game.guest_team_name}</div>
                    </div>
                </div>
                <div class="info grid-cols-3 gird justify-center border-b py-8">
                    <div class="maps"></div>
                    <div class="media">
                        {#if game.live_stream_link}
                            <div class="live_stream_link">
                                <a
                                    href={game.live_stream_link}
                                    title="Livestream"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <GOAL /> Livestream
                                </a>
                            </div>
                        {:else if game.vod_link}
                            <div class="vod_link"></div>
                        {/if}
                    </div>
                </div>
                <h2 class="grid-cols-3">Spielverlauf</h2>
                {#each game.events.slice().reverse() as event, eventIdx}
                    {@const { min, sec } = extractTime(event.time)}
                    {@const team = event.event_team}
                    {@const displayGoals = event.event_type == SM.EventType.Goal}
                    {@const displayNumber =
                        event.number &&
                        ((event.event_type == SM.EventType.Goal && event.goal_type != SM.GoalType.Owngoal) ||
                            event.event_type == SM.EventType.Penalty)}
                    {@const displayLogo =
                        displayNumber ||
                        event.event_type == SM.EventType.Timeout ||
                        (event.event_type == SM.EventType.Goal && event.goal_type == SM.GoalType.Owngoal)}

                    <div class="event *:row-start-1 *:border-b *:border-sf2 *:p-2 hover:bg-sf3">
                        <div class="sc col-middle *:grid *:grid-cols-[1fr,auto,1fr]">
                            <div class="time text-txt2">
                                <span class="min place-self-end">{min}</span>
                                <span class="">:</span>
                                <span class="sec">{sec}</span>
                            </div>
                            {#if displayGoals}
                                <div class="goals font-bold text-xl sm:text-3xl border-sf2 text-center">
                                    <span class="">{event.home_goals}</span>
                                    <span class="">-</span>
                                    <span class="">{event.guest_goals}</span>
                                </div>
                            {/if}
                        </div>

                        <div class="col-{team}-status *:text-sm md:*:text-base *:flex *:items-center *:justify-stretch *:flex-col text-center">
                            {#if event.event_type == SM.EventType.Goal}
                                <div class="">
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
                            {:else if event.event_type == SM.EventType.Penalty}
                                <div class="">
                                    <div class="">Strafe <span class="font-bold">{event.penalty_type_string}</span></div>
                                    <div class="text-txt2 text-xs md:text-sm">
                                        {event.penalty_reason_string}
                                    </div>
                                </div>
                            {:else if event.event_type == SM.EventType.Timeout}
                                <div class="">
                                    <TIMEOUT />
                                    <div class="">Auszeit</div>
                                </div>
                            {:else}
                                <div class=""><div class="">???</div></div>
                            {/if}
                        </div>

                        <div class="col-{team}-player">
                            {#if displayNumber && event.number}
                                {@const p = getPlayerByNumber(game, team, event.number)}
                                <div class="">
                                    <div class="">
                                        {p.player_firstname}
                                        {p.player_name}
                                        <span class="sc text-txt2">#{event.number}</span>
                                    </div>
                                    {#if event.assist}
                                        {@const a = getPlayerByNumber(game, team, event.assist)}
                                        <div class="text-txt2 text-sm">
                                            {a.player_firstname}
                                            {a.player_name}
                                            <span class="sc">#{event.assist}</span>
                                        </div>
                                    {/if}
                                </div>
                            {/if}
                        </div>

                        {#if displayLogo}
                            <div class="col-{team}-logo">
                                <img
                                    src="https://saisonmanager.de/{game[team + '_team_logo']}"
                                    alt=""
                                    class="w-[3em] md:w-[4em]"
                                />
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
            <!-- events -->

            <div class="teams grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
                <h2 class="roster col-span-full mt-0 pt-0">Aufstellung</h2>
                {#each ['home', 'guest'] as team}
                    <div class="team team-{team}">
                        <h3 class="teamname">{game[team + '_team_name']}</h3>
                        {#each sortPlayers(game.players[team]) as p}
                            {@const { goals, assists, penaltiesString } = getScorer(game, team, p.trikot_number)}
                            <div
                                class="player grid grid-cols-[2em,1fr,4em,2em] gap-2 px-2 py-1 border justify-center items-center border-transparent hover:border-l-prim hover:border-r-prim border-b-sf2"
                            >
                                <div
                                    class="sc h-full font-bold border-r border-prim place-self-end self-center px-4"
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
                                <div class="name text-txt2 text-xs leading-3 flex flex-col">
                                    {#if goals}
                                        <div class="goals flex gap-2" title="Tore">
                                            <div class="text-[50%]"><GOAL /></div>
                                            {goals}
                                        </div>
                                    {/if}
                                    {#if assists}
                                        <div class="assists flex gap-2" title="Vorlagen">
                                            <div class="text-[50%]"><FLOORBALL /></div>
                                            {assists}
                                        </div>
                                    {/if}
                                    {#if penaltiesString}
                                        <div class="penalties" title="Strafen">{penaltiesString}</div>
                                    {/if}
                                </div>
                                <div class="name text-txt2 text-sm leading-3 text-center">
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
    import GOAL from '$lib/components/icons/GOAL.svelte';
    import TIMEOUT from '$lib/components/icons/GOAL.svelte';

    import { fade } from 'svelte/transition';
    import { SM } from 'floorball-saisonmanager';

    export let data;

    let visible = false;

    function sortPlayers(players: SM.Player[]) {
        players.sort((p1, p2) => p1.trikot_number - p2.trikot_number);

        return players;
    }

    function getPlayerByNumber(game: SM.Game, team: string, num: number) {
        const teamPlayers: SM.Player[] = game.players[team];

        return teamPlayers.filter((p) => p.trikot_number == num)[0];
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

    function getLogo() {
        'https://saisonmanagercdn.blob.core.windows.net/smlive/wiuzh0rzfkfwj539tetfderb3t9p?sp=r&sv=2018-11-09&se=2024-05-12T11%3A16%3A52Z&rscd=inline%3B+filename%3D%22184-fbcmuenchen.png%22%3B+filename*%3DUTF-8%27%27184-fbcmuenchen.png&rsct=image%2Fpng&sr=b&sig=WFP1oT9p79wNNu4Af%2BNdX31l2ObsIfQk9bYRMe5IjYM%3D';
    }

    function getScorer(game: SM.Game, team: string, trikotNumber: number) {
        const teamEvents = game.events.filter((e) => e.event_team == team);
        const numberEvents = teamEvents.filter((e) => (e.number ?? -1) == trikotNumber);

        const penaltiesString = numberEvents
            .filter((e) => e.event_type == SM.EventType.Penalty)
            .filter((e) => (e.number ?? -1) == trikotNumber)
            .map((e) => e.penalty_type_string ?? '')
            .join(' , ');

        const goals = numberEvents.filter((e) => e.event_type == SM.EventType.Goal).length;
        const assists = teamEvents
            .filter((e) => e.event_type == SM.EventType.Goal)
            .filter((e) => e.assist && e.assist == trikotNumber).length;

        return {
            goals,
            assists,
            penaltiesString,
        };
    }
</script>
