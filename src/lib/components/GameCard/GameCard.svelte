<style lang="postcss">
    .sc {
        font-family: 'Quantico';
        font-weight: bold;
    }

    .live {
        @apply text-prim;
    }
</style>

<div
    class="w-full max-w-[30rem] border hover:border-prim grid grid-rows-[auto,1fr,auto] rounded shadow hover:shadow-xl"
>
    <div class=" bg-sf3 px-2 grid grid-cols-[auto,1fr] border-b items-center">
        <div class="flex gap-2">
            <div class="sc text-4xl">{day}</div>
            <div class="leading-3 flex flex-col justify-evenly text-txt2">
                <div class="font-bold">{month} {year}</div>
                <div class="">{weekday}</div>
            </div>
        </div>
        <div class="text-right leading-5">
            <div class="">{game.game_day}. Spieltag</div>
            <div class="text-txt2">{leagueName ?? ''}</div>
        </div>
    </div>
    <div class="grid grid-cols-[1fr,1fr,1fr] items-center p-4 gap-4">
        <div class="">
            <img src="https://saisonmanager.de/{game.home_team_logo}" alt="" class="" />
        </div>
        <div class="text-center gap-1 md:gap-2 grid grid-rows-3">
            <div class=""></div>
            <div class="sc text-3xl md:text-5xl" class:live={game.started && !game.ended}>
                {#if game.started}
                    {game.result.home_goals}:{game.result.guest_goals}
                {:else}
                    {game.time}
                {/if}
            </div>
            <div class="text-xs text-txt2 leading-3">
                <div>{game.arena_short}</div>
                <!-- <div>{game.arena_name}</div>
                <div>{game.arena_address}</div> -->
            </div>
        </div>
        <div class="">
            <img src="https://saisonmanager.de/{game.guest_team_logo}" alt="" class="" />
        </div>
    </div>
    <div class="text-center border-t" class:live={game.started && !game.ended}>
        {#await fetchFullGame(game.game_id)}
            Loading Game #{game.game_id}
        {:then fullGame}
            {#if fullGame.live_stream_link}
                <a href={fullGame.live_stream_link} class="w-full block hover:bg-sf2">Livestream</a>
            {:else if fullGame.vod_link}
                <a href={fullGame.vod_link} class="w-full block hover:bg-sf2">Video</a>
            {:else}
                <a
                    href="https://saisonmanager.de/{fullGame.game_operation_slug}/{leagueId}/spiel/{game.game_id}"
                    class="w-full block hover:bg-sf2"
                >Saisonmanager</a>
            {/if}
        {:catch err}
            Error: {err}
        {/await}
    </div>
</div>

<script lang="ts">
    import type { SM } from 'floorball-saisonmanager';


    function fetchFullGame(gameId: string) {
        return new Promise((resolve) => {
            fetch(`https://saisonmanager.de/api/v2/games/${gameId}.json`)
                .then((response) => response.json())
                // .then( g => console.dir(g))
                .then((g) => resolve(g))
                // .then((g) => g as SM.Game)
                .catch((e) => console.error('fetchGame-ERROR: ' + e));
        });
    }

    export let game;
    export let leagueName;
    export let leagueId;

    let day: string;
    let weekday: string;
    let month: string;
    let year: string;

    $: day = String(new Date(game.date).getDate()).padStart(2, '0');
    $: weekday = new Date(game.date).toLocaleDateString('de-DE', { weekday: 'long' });
    $: month = new Date(game.date).toLocaleDateString('de-DE', { month: 'short' });
    $: year = new Date(game.date).toLocaleDateString('de-DE', { year: 'numeric' });
</script>
