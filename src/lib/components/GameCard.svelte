<style lang="postcss">
    .gamecard {
        font-family: 'Quantico';

        border-radius: var(--border-radius);
        border: 1px solid gainsboro;

        --bg: linear-gradient(180deg, #501b1b 0, #000000);
        --bg: url(https://www.fcbarcelona.com/resources/v2.82.2-5582/i/bg-elements/stripes-horizontal-fade.png);
        box-shadow: var(--shadow);
    }

    .content {
        display: grid;
        align-items: stretch;
        height: 100%;
    }

    a {
        border-radius: var(--border-radius);
    }

    .grid {
        display: grid;
        padding: 0.5rem;
    }

    .grid-col-3 {
        grid-auto-flow: column;
        grid-template-columns: 1fr 1fr 1fr;
        align-items: center;
    }

    .grid-row-2 {
        grid-auto-flow: row;
        grid-template-columns: auto 1fr;
    }

    header {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        color: rgb(255, 255, 255);
        background-color: rgb(0, 0, 0);
        background-image: var(--bg);
        background-size: 100% 100%;
        box-shadow: var(--shadow);
        border-radius: var(--border-radius);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .day {
            font-size: 2.5rem;
            font-weight: bold;
            line-height: 50%;
        }

        .lhs {
            justify-self: start;
        }
        .mid {
            justify-self: start;
        }
        .rhs {
            justify-self: end;
        }

        .mid {
            display: grid;
            grid-template-rows: 1fr 1fr;
            justify-items: start;
        }

        .weekday,
        .month {
            text-transform: uppercase;
            line-height: 90%;
        }

        .weekday {
            font-weight: bold;
        }

        .league {
            text-align: end;
            font-size: 80%;
            width: 80%;
        }
    }

    .body {
        display: grid;
        grid-auto-flow: row;
        align-items: center;
        background-color: white;
        padding: 0.5rem;

        /* background: white url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0; */

        .league,
        .matchday,
        .status-title {
            text-align: center;
            font-weight: bold;
            font-size: 0.75rem;
            line-height: 0.75rem;
        }

        .score-or-time {
            padding: 1rem;
            font-weight: bold;
            font-size: 3.5rem;
            line-height: 90%;

            .live {
                text-align: center;
                font-size: 2rem;
                line-height: 50%;
            }

            .score,
            .time,
            .live {
                padding: 0.4rem;
            }

            .score,
            .live {
                font-family: 'Quantico';
                color: white;
                background-color: var(--color-text-highlight);
                background-size: 100% 100%;
                background-image: var(--bg);
                border-radius: var(--border-radius);
            }

            .livescore {
                background-color: slateblue;
            }

            .today {
                background-color: cyan;
            }

            .time {
                background-color: var(--color-text-highlight);
                background-size: 100% 100%;
                background-image: var(--bg);
                background-clip: text;
                color: transparent;
            }
        }

        .team {
            .logo {
                width: 10vw;
                height: auto;
                object-fit: contain;
                filter: drop-shadow(0 0 10px rgb(50, 50, 50));
            }

            .name {
                text-align: center;
                text-transform: capitalize;
                line-height: 90%;
                font-weight: bold;
            }
        }
    }

    .isUpcoming {
        /* outline: 2px solid lightseagreen; */
    }
    .isLive {
        /* outline: 2px solid crimson; */
        header {
            background-color: var(--color-text-highlight);
            background-color: slateblue;
        }
    }
    .isToday {
        /* outline: 2px solid slateblue; */
    }
    .isFinished {
        /* outline: 2px solid goldenrod; */
    }

    .btn-gamecard {
        height: 100%;
    }
</style>

<div
    id={game.gameId.toString()}
    class="gamecard"
    class:isUpcoming={game.isUpcoming}
    class:isLive={game.isLive}
    class:isToday={game.isToday}
    class:isFinished={game.isFinished}
>
    <a href={urlMatchReport} target="_blank" class="btn-gamecard">
        <div class="content">
            <header>
                <span class="lhs day">{day}</span>
                <span class="mid">
                    <span class="weekday">{weekDay}</span>
                    <span class="month">{month}</span>
                </span>
                <span class="rhs league">{game.leagueName}</span>
            </header>
            <div class="body">
                <div class="grid grid-col-3">
                    <div class="team home">
                        <img
                            src={game.imgLogoHome}
                            alt="Logo {game.imgLogoHome}"
                            class="logo"
                            decoding="async"
                            loading="lazy"
                        />
                        <div class="name">{game.nameHome}</div>
                    </div>
                    <div class="score-or-time">
                        <div class="matchday">{game.matchDay}. Spieltag</div>
                        {#if game.isFinished}
                            <div class="score">{game.scoreHome}&nbsp;-&nbsp;{game.scoreGuest}</div>
                        {:else if game.isUpcoming}
                            <div class="time">{game.matchTime}</div>
                        {:else if game.isToday}
                            <div class="time">{game.matchTime}</div>
                            <div class="time live">Heute</div>
                        {:else if game.isLive}
                            <div class="score livescore">{game.scoreHome}&nbsp;-&nbsp;{game.scoreGuest}</div>
                            <div class="time live">Live</div>
                        {:else}
                            <div>ERROR</div>
                        {/if}
                    </div>
                    <div class="team guest">
                        <img
                            src={game.imgLogoGuest}
                            alt="Logo {game.nameGuest}"
                            class="logo"
                            decoding="async"
                            loading="lazy"
                        />
                        <div class="name">{game.nameGuest}</div>
                    </div>
                </div>
            </div>
        </div>
    </a>
</div>

<script lang="ts">
    import type { GameCardInfo } from '$lib/types';
    import { SM } from 'floorball-saisonmanager';
    import moment from 'moment';

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

    const urlMatchReport = SM.UrlBuilder.getMatchReportUrl(game.gameId, game.leagueId, game.leagueSlug);
    // const urlLogoHome = SM.UrlBuilder.getLogoUrl(matchResult.home_team_small_logo);
    // const urlLogoGuest = SM.UrlBuilder.getLogoUrl(matchResult.guest_team_small_logo);
</script>
