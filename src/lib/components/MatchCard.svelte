<style lang="postcss">
    .matchcard {
        font-family: Quantico;
    }
    .bg-stripes {
        --bg: url('$lib/bg-stripes-45.png');

        background-image: var(--bg);
        background-size: 100% 100%;
    }

    .isUpcoming .scoretext,
    .isToday .scoretext {
        background-clip: text;
        color: transparent;
        background-color: var(--color-text-highlight);
    }
    .isLive .scoretext {
        background-color: rgb(60, 207, 226);
        /* background-image: linear-gradient(60deg, rgb(115, 0, 255), rgb(255, 0, 170) ); */
    }
    .live {
        color: var(--color-text-highlight);
    }

    .isFinished .scoretext {
        background-color: var(--color-text-highlight);

    }

    .short {
        display: block;
    }
    .full {
        display: none;
    }
    @media (min-width: 640px) {
        .short {
            display: none;
        }
        .full {
            display: block;
        }
    }

    .short {
        display: none;
    }
    .full {
        display: block;
    }
</style>

<div
    id={game.gameId.toString()}
    class="matchcard grid w-[20rem] grid-rows-4 rounded shadow snap-center snap-proximity bg-white"
    class:isUpcoming={game.isUpcoming}
    class:isLive={game.isLive}
    class:isToday={game.isToday}
    class:isFinished={game.isFinished}
>
    <header class="bg-stripes row-span-1 grid grid-cols-2 gap-1.5 rounded-t bg-black p-1.5 text-white">
        <div class="flex-cols-2 flex gap-1.5 justify-self-start">
            <span
                class="p-r-1.5 self-center text-center leading-4 text-[2rem]"
                >{day}</span
            >
            <span class="grid grid-rows-2 justify-start leading-4 uppercase text-[0.7rem]">
                <span class="self-end font-bold">
                    <span class="full">{weekDay}</span>
                    <span class="short">{weekDayShort}</span>
                </span>
                <span class="self-start">
                    <span class="full">{month}</span>
                    <span class="short">{monthShort}</span>
                </span>
            </span>
        </div>
        <div class="self-center text-end text-ellipsis leading-4 max-h-[2.0rem] text-[0.8rem]">
            <span class="full">{game.leagueShortName}</span>
            <span class="short">{game.leagueSlug}</span>
        </div>
    </header>
    <main class="row-span-3 grid w-full grid-cols-3 content-stretch items-stretch gap-3.5 rounded-b p-1.5 text-center">
        <div class="grid place-items-center">
            <img
                src={game.imgLogoHome}
                alt="Logo {game.imgLogoHome}"
                class="px-2.5 h-auto object-contain"
                decoding="async"
                loading="lazy"
                transition:fade
            />
            <div class="text-[0.7rem] leading-4">{game.nameHome}</div>
        </div>
        <div class="grid items-center self-center justify-center justify-items-center">
            <div class="self-end text-[0.7rem]">{game.matchDay}. Spieltag</div>
            <div
                class="scoretext bg-stripes self-start rounded p-1.5 text-center text-[2rem] font-bold leading-tight text-white"
            >
                {#if game.isFinished || game.isLive}
                    <div class="px-1.5">{game.scoreHome}&nbsp;-&nbsp;{game.scoreGuest}</div>
                {:else}
                    <div class="py-1.5 px-0.5">{game.matchTime}</div>
                {/if}
            </div>
            {#if game.isLive}
                <div class="live uppercase font-bold self-start">Live</div>
            {/if}
        </div>
        <div class="grid place-items-center">
            <img
                src={game.imgLogoGuest}
                alt="Logo {game.nameGuest}"
                class="px-2.5 h-auto object-contain"
                decoding="async"
                loading="lazy"
                transition:fade
            />
            <div class="text-[0.7rem] leading-4 self-start">{game.nameGuest}</div>
        </div>
    </main>
</div>

<script lang="ts">
    import type { GameCardInfo } from '$lib/types';
    import { SM } from 'floorball-saisonmanager';
    import moment from 'moment';
    import { fade } from 'svelte/transition';

    export let game: GameCardInfo;

    const date = moment(game.matchDate, 'YYYY-MM-DD').toDate();
    const weekDaysNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    const monthNames = [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember',
    ];
    const weekDay = weekDaysNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');

    const weekDayShort = weekDay.slice(0, 2);
    const monthShort = month.slice(0, 3);

    console.log(weekDayShort);
    console.log(monthShort);

    const urlMatchReport = SM.UrlBuilder.getMatchReportUrl(game.gameId, game.leagueId, game.leagueSlug);
    // const urlLogoHome = SM.UrlBuilder.getLogoUrl(matchResult.home_team_small_logo);
    // const urlLogoGuest = SM.UrlBuilder.getLogoUrl(matchResult.guest_team_small_logo);
</script>
