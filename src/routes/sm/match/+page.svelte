<style lang="postcss">
    .event {
        display: grid;
        grid-template-columns:
            [middle] 4em
            [status home_status guest_status] 1fr
            [player home_player guest_player] 2fr
            [logo home_logo guest_logo] 4em;
    }

    @media (min-width: 768px) {
        .event {
            display: grid;
            grid-template-columns:
                [home_logo] 5em
                [home_player] 2fr
                [home_status] 1fr
                [middle] 8em
                [guest_status] 1fr
                [guest_player] 2fr
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

    @media (max-height: 600px) {
        .header {
            position: relative;
        }
    }

    .ingame {
        @apply text-prim;
    }
    .paused {
        @apply text-prim;
    }

    .score {
        font-size: min(10vw, 5rem);
        line-height: 75%;
    }
    .sc {
        font-family: 'Quantico';
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .even {
    }

    @keyframes pulse {
        50% {
            opacity: 0.5;
        }
    }

    .min::after {
        /* content: "'"; */
    }
    .sec::after {
        /* content: "''"; */
    }

    .timeline {
        word-break: normal;
    }

    .highlighted {
        animation: fade 10s ease-in-out 0s;
    }

    @keyframes fade {
        from {
            background-color: var(--color-primary);
        }
    }
</style>

<div transition:fade class="timeline flex w-full flex-col gap-8 py-8">
    <div class="events mb-8 flex flex-col gap-8">
        <div
            class="header sticky top-0 z-10 mb-4 grid grid-cols-3 border-b border-b-prim bg-sf py-4 *:flex *:flex-col *:place-content-center *:items-center"
        >
            <div class="home">
                <img src="https://saisonmanager.de/{game.home_team_logo}" alt="" class="h-[15vw] max-h-32 max-w-full" />
                <div class="name pt-4 text-center text-sm sm:font-bold">{game.home_team_name}</div>
            </div>
            <div class="items-between flex w-full flex-col justify-between">
                <div
                    class="sc score grid grid-cols-3 text-center font-bold"
                    class:ingame={(game.game_status ?? SM.GameState.NoRecord) === SM.GameState.Ingame}
                    class:paused={game.ingame_status?.startsWith('pause') ?? false}
                >
                    <div class="">{game.result?.home_goals ?? 0}</div>
                    <div class="" class:animate-pulse={game.game_status === SM.GameState.Ingame}>
                        {scoreSep}
                    </div>
                    <div class="">{game.result?.guest_goals ?? 0}</div>
                </div>
                <div class="period pt-4 text-xs font-bold md:text-base">
                    {#if !game.ended}
                        {game.current_period_title?.title}
                    {:else if game.result?.postfix?.long && game.result?.postfix?.short}
                        <span class="hidden md:inline">{game.result?.postfix?.long}</span>
                        <span class="md:hidden">{game.result?.postfix?.short}</span>
                    {/if}
                </div>
                <div class="sc hidden gap-4 pt-4 text-xs text-txt2 sm:flex md:text-base">
                    {#each range(game.result?.overtime ?? false ? 4 : 3) as p}
                        <div class="">
                            {game.result?.home_goals_period[p] ?? 0}
                            {scoreSep}
                            {game.result?.guest_goals_period[p] ?? 0}
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
                <div class="name pt-4 text-center text-sm sm:font-bold">{game.guest_team_name}</div>
            </div>
        </div>
        <div class="info flex flex-col items-center gap-16 border-b py-8">
            <div class="maps">
                {#if !game.ended && game.arena_name && game.arena_address}
                    <div class="maps arena">
                        <a
                            href="https://www.google.de/maps/search/{encodeURI(
                                game.arena_address + ', ' + game.arena_name
                            )}"
                            title="Google Maps: {game.arena_name}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Icon icon="VIDEO" />
                            <span class="">{game.arena_name}</span>
                            <span class="">({game.arena_address})</span>
                        </a>
                    </div>
                {/if}
            </div>
            <div class="media">
                {#if game.live_stream_link}
                    <div class="live_stream_link">
                        <a href={game.live_stream_link} title="Livestream" target="_blank" rel="noopener noreferrer">
                            <Icon icon="VIDEO" /> Livestream
                        </a>
                    </div>
                {:else if game.vod_link}
                    <div class="vod_link">
                        <a href={game.vod_link} title="Video" target="_blank" rel="noopener noreferrer">
                            <Icon icon="VIDEO" /> Video
                        </a>
                    </div>
                {/if}
            </div>
        </div>
        <h2 class="grid-cols-3">Spielverlauf</h2>

        {#each game.events as e, idx}
            {@const { min, sec } = extractTime(e.time)}
            {@const team = e.event_team}
            {@const displayGoals = e.event_type == SM.EventType.Goal}
            {@const displayNumber =
                e.number &&
                ((e.event_type == SM.EventType.Goal && e.goal_type != SM.GoalType.Owngoal) ||
                    e.event_type == SM.EventType.Penalty)}
            {@const displayLogo =
                displayNumber ||
                e.event_type == SM.EventType.Timeout ||
                (e.event_type == SM.EventType.Goal && e.goal_type == SM.GoalType.Owngoal)}

            {#if checkPeriod(e.period)}
                <h3 class="w-full py-8 font-normal text-txt2 md:text-center">{getPeriodTitle(game, e)}</h3>
            {/if}

            <div
                class:even={idx % 2 === 0}
                class:highlighted={$page.url.hash?.slice(1) == 'event-' + idx}
                class="event event-{idx} relative border-l border-r border-transparent px-1 *:row-start-1 *:border-b-2 *:border-b-txt *:py-4 hover:border-prim"
            >
                <span id="event-{idx}" class="invisible absolute top-[50vw]"></span>
                <div class="sc col-middle">
                    <div class="time grid grid-cols-[1fr,auto,1fr] text-txt2">
                        <span class="min place-self-end">{min}</span>
                        <span class="">{timeSep}</span>
                        <span class="sec">{sec}</span>
                    </div>
                    {#if displayGoals}
                        <div class="goals grid grid-cols-[1fr,auto,1fr] text-center text-xl font-bold sm:text-3xl">
                            <span class="">{e.home_goals}</span>
                            <span class="">{scoreSep}</span>
                            <span class="">{e.guest_goals}</span>
                        </div>
                    {:else}
                        <div class="flex w-full justify-center">
                            <Icon icon="WHISTLE" class="w-8" />
                        </div>
                    {/if}
                </div>

                <div
                    class="col-{team}-status text-center *:flex *:flex-col *:items-center *:justify-stretch *:text-sm md:*:text-base"
                >
                    {#if e.event_type == SM.EventType.Goal}
                        <div class="">
                            {#if e.goal_type && e.goal_type_string}
                                <div class="flex flex-col items-center text-xs md:text-sm">
                                    <Icon icon="GOAL" />
                                    {e.goal_type_string}
                                    <!-- {#if e.goal_type == SM.GoalType.Owngoal}
                                                <Icon icon="FLOORBALL2" /> {e.goal_type_string}
                                            {:else if e.goal_type == SM.GoalType.Regular}
                                                <Icon icon="FLOORBALL2" /> {e.goal_type_string}
                                            {:else if e.goal_type == 'penalty_shot'}
                                                <Icon icon="FLOORBALL2" /> {e.goal_type_string}
                                            {:else}
                                                ERROR: e.goal_type = {e.goal_type}
                                            {/if} -->
                                </div>
                            {:else}
                                <div class="error">ERROR: if e.goal_type && e.goal_type_string</div>
                                <div class="">e.goal_type = {e.goal_type}</div>
                                <div class="">>e.goal_type_string = {e.goal_type_string}</div>
                            {/if}
                        </div>
                    {:else if e.event_type == SM.EventType.Penalty}
                        <div class="">
                            <div class="text-sm md:text-base">
                                Strafe <span class="font-bold">{e.penalty_type_string}</span>
                            </div>
                            <div class="text-xs text-txt2 md:text-sm">
                                {e.penalty_reason_string}
                            </div>
                        </div>
                    {:else if e.event_type == SM.EventType.Timeout}
                        <div class="">
                            <Icon icon="TIMEOUT" />
                            <div class="">Auszeit</div>
                        </div>
                    {:else}
                        <div class=""><div class="">???</div></div>
                    {/if}
                </div>

                <div class="col-{team}-player">
                    {#if displayNumber && e.number}
                        {@const p = getPlayerByNumber(game, team, e.number)}
                        <div class="">
                            <div class="">
                                <span class="font-bold">{p.player_firstname} {p.player_name}</span>
                                <!-- <span class="sc text-txt2">#{e.number}</span> -->
                            </div>
                            {#if e.assist}
                                {@const a = getPlayerByNumber(game, team, e.assist)}
                                <div class="text-sm text-txt2">
                                    <span class="font-bold">{a.player_firstname} {a.player_name}</span>
                                    <!-- <span class="sc">#{e.assist}</span> -->
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

    <!-- player roster -->
    <div class="teams grid grid-cols-1 gap-8 lg:grid-cols-2">
        <h2 class="roster col-span-full mt-0 pt-0">Aufstellung</h2>
        {#each ['home', 'guest'] as team}
            <div class="team team-{team}">
                <h3 class="teamname">{game[team + '_team_name']}</h3>
                {#each sortPlayers(game.players[team]) as p}
                    {@const { goals, assists, penaltiesString } = getScorer(game, team, p.trikot_number)}
                    <div
                        class="player grid grid-cols-[3em,1fr,4em,2em] items-center gap-2 border border-transparent border-b-sf2 py-1 hover:border-l-prim hover:border-r-prim"
                    >
                        <div
                            class="sc flex h-full items-center place-self-end border-r border-prim px-4 font-bold"
                            class:captain={p.captain}
                            class:goalkeeper={p.goalkeeper}
                        >
                            {p.trikot_number}
                        </div>
                        <div class="name px-2">
                            <a href="/sm/stats/player?id={p.player_id}">
                                {p.player_firstname}
                                {p.player_name}
                                {#if p.captain}
                                    (C)
                                {/if}
                            </a>
                        </div>
                        <div class="name flex cursor-help flex-col text-sm leading-3 text-txt2">
                            {#if goals}
                                <div class="goals flex gap-2" title="Tore: {goals}">
                                    <Icon icon="GOAL" class="w-4" />
                                    {goals}
                                </div>
                            {/if}
                            {#if assists}
                                <div class="assists flex gap-2" title="Vorlagen: {assists}">
                                    <Icon icon="FLOORBALL2" class="w-4" />
                                    {assists}
                                </div>
                            {/if}
                            {#if penaltiesString}
                                <div class="penalties flex gap-2" title="Strafen: {penaltiesString}">
                                    <Icon icon="WHISTLE" class="w-4" />
                                    {penaltiesString}
                                </div>
                            {/if}
                        </div>
                        <div class="name text-center text-sm leading-3 text-txt2">
                            <!-- {p.position} -->
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
    <!-- player roster -->

    <!-- info -->
    <div class="info">
        <h3>Spielinfos</h3>
        <div
            class="grid gap-2 *:flex *:flex-nowrap *:justify-between *:border-b *:border-sf2 lg:grid-cols-2 lg:gap-x-8"
        >
            <div class="">
                <div class="">Liga</div>
                <div class="text-right font-bold">
                    <a href="/sm/stats/league?id={game.league_id}">{game.league_name ?? '-'}</a>
                </div>
            </div>
            <div class="">
                <div class="">Spielnummer</div>
                <div class="text-right font-bold">{game.game_number ?? '-'}</div>
            </div>
            <div class="">
                <div class="">Datum</div>
                <div class="text-right font-bold">{game.date ?? '-'}</div>
            </div>
            <div class="">
                <div class="">Austragungshalle</div>
                <div class="text-right font-bold">{game.arena_name ?? '-'}</div>
            </div>
            <div class="">
                <div class="">Austragungsort</div>
                <div class="text-right font-bold">{game.arena_address ?? '-'}</div>
            </div>
            <div class="">
                <div class="">Spielbeginn</div>
                <div class="text-right font-bold">{game.actual_start_time ?? game.start_time ?? '-'}</div>
            </div>
            <div class="">
                <div class="">Zuschauerzahl</div>
                <div class="text-right font-bold">{game.audience ?? '-'}</div>
            </div>
            <div class="">
                <div class="">Schiedsrichter</div>
                <div class="text-right font-bold">{game.nominated_referees ?? '-'}</div>
            </div>
        </div>
    </div>
    <!-- info -->
</div>

<script lang="ts">
    import Icon from '$lib/components/Icon.svelte';
    import { onMount, afterUpdate } from 'svelte';
    import { fade } from 'svelte/transition';
    import { SM } from 'floorball-saisonmanager';
    import { page } from '$app/stores';

    export let data;

    const game = data.game;

    const timeSep = ':';
    const scoreSep = '-';

    let visible = false;
    let lastPeriod = -1;

    afterUpdate(() => {
        setTimeout(() => {
            const { hash } = document.location;
            const scrollTo = hash && document.getElementById(hash.slice(1));
            if (scrollTo) scrollTo.scrollIntoView(false);
        }, 1000);
    });

    function checkPeriod(period: number) {
        // gameId=20114 period is 9..?!
        if (period <= 0 || period > 5) return false;

        const isCurrentPeriod = period != lastPeriod;

        lastPeriod = period;

        return isCurrentPeriod;
    }

    function getPeriodTitle(game: SM.Game, e: SM.Event) {
        // do this in checkPeriod() or some strange bug where it
        // only updates/runs it at consistent random times
        // when using {#if e.period != lastPeriod}
        //
        // with {#if checkPeriod(e.period)} it works..
        //
        // See: https://github.com/sveltejs/svelte/issues/11572
        //
        //// lastPeriod = e.period;

        if (game.period_titles) {
            for (const period of game.period_titles) {
                if (period.period === e.period) {
                    return period.title;
                }
            }
        }

        return e.period + '. Drittel';
    }

    function sortPlayers(players: SM.Player[]) {
        players.sort((p1, p2) => p1.trikot_number - p2.trikot_number);

        return players;
    }

    function getPlayerByNumber(game: SM.Game, team: string, num: number) {
        const teamPlayers: SM.Player[] = game.players[team];

        return (
            teamPlayers.filter(p => p.trikot_number == num)[0] ?? {
                player_id: -1,
                player_name: '',
                player_firstname: '',
            }
        );
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

    function getScorer(game: SM.Game, team: string, trikotNumber: number) {
        const teamEvents = game.events.filter(e => e.event_team == team);
        const numberEvents = teamEvents.filter(e => (e.number ?? -1) == trikotNumber);

        const penaltiesString = numberEvents
            .filter(e => e.event_type == SM.EventType.Penalty)
            .filter(e => (e.number ?? -1) == trikotNumber)
            .map(e => e.penalty_type_string ?? '')
            .join(' , ');

        const goals = numberEvents.filter(e => e.event_type == SM.EventType.Goal).length;
        const assists = teamEvents
            .filter(e => e.event_type == SM.EventType.Goal)
            .filter(e => e.assist && e.assist == trikotNumber).length;

        return {
            goals,
            assists,
            penaltiesString,
        };
    }

    const range = (stop: number, start: number = 0, step: number = 1) =>
        Array.from(
            {
                length: (stop - 1 - start) / step + 1,
            },
            (_, i) => start + i * step
        );
</script>
