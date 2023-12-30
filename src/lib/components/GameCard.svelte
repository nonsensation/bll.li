<style lang="postcss">
    .gamecard {
        margin: 0.5rem;

        font-family: 'Quantico';

        border-radius: var(--border-radius);
        border: 1px solid gainsboro;

        --bg: linear-gradient(180deg, #501b1b 0, #000000);
        --bg: url(https://www.fcbarcelona.com/resources/v2.82.2-5582/i/bg-elements/stripes-horizontal-fade.png);
        --bg: url('$lib/bg-stripes-45.png');
        box-shadow: var(--shadow);

        width: 100%;
        width: 30rem;
        max-width: 80vw;
        min-width: 230px;
    }

    .content {
        display: grid;
        grid-template-rows: 1fr 3fr;
        align-items: stretch;
        height: 100%;
    }

    a {
        border-radius: var(--border-radius);
    }

    .grid-row-2 {
        grid-auto-flow: row;
        grid-template-columns: auto 1fr;
    }

    header {
        display: grid;
        grid-template-columns: auto auto 1fr;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.5rem;
        color: rgb(255, 255, 255);
        background-color: rgb(0, 0, 0);
        background-image: var(--bg);
        background-size: 100% 100%;
        box-shadow: var(--shadow);
        border-radius: var(--border-radius);
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        .day {
            font-size: 2rem;
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
            /* width: 80%; */
        }
    }

    .body {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;

        background-color: white;
        padding: 0.5rem;
        /* height: auto; */

        /* background: white url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0; */

        .league,
        .matchday,
        .status-title {
            text-align: center;
            font-weight: bold;
            font-size: 0.5rem;
            line-height: 0.5rem;
        }

        .score-or-time {
            padding: 0;
            font-weight: bold;
            font-size: 1.75rem;
            line-height: 90%;

            .live {
                font-size: 1rem;
                line-height: 50%;
            }

            .score,
            .time,
            .live {
                text-align: center;
                padding: 0.2rem;
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
            display: grid;
            place-items: center;
            gap: 0;
            width: 100%;

            .logo {
                max-height: 20vh;
                max-width: 10vw;
                width: 75%;
                height: auto;
                object-fit: contain;
                filter: drop-shadow(0 0 10px rgb(50, 50, 50));
            }

            .name {
                text-align: center;
                line-height: 90%;
                font-size: 75%;
                /* font-weight: bold; */
                /* display: none; */
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

    @media (min-width: 576px) {
        header {
            padding: 0.5rem 0.75rem;

            .day {
                font-size: 2.5rem;
            }
        }

        .body {
            padding: 0.5rem;

            .league,
            .matchday,
            .status-title {
                font-size: 0.75rem;
                line-height: 0.75rem;
            }

            .score-or-time {
                padding: 1rem;
                font-size: 3rem;

                .live {
                    font-size: 2rem;
                }

                .score,
                .time,
                .live {
                    padding: 0.4rem;
                }
            }

            .team {
                gap: 0.5rem;

                .logo {
                    width: 100%;
                }
            }
        }

        .full {
            display: block;
        }
        .short {
            display: none;
        }
    }

    @media (max-height: 330px) {
        header {
            padding: 0.5rem 0.75rem;

            .day {
                font-size: 2.5rem;
            }
        }

        .body {
            padding: 0.2rem 0.5rem;

            .league,
            .matchday,
            .status-title {
                font-size: 0.75rem;
                line-height: 0.75rem;
            }

            .score-or-time {
                padding: 1rem;
                font-size: 3rem;

                .live {
                    font-size: 2rem;
                }

                .score,
                .time,
                .live {
                    padding: 0.4rem;
                }
            }

            .team {
                gap: 0.2rem;

                .logo {
                    width: 100%;
                }
            }
        }
    }

    .full {
        display: none;
    }
    .short {
        display: block;
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
                    <span class="weekday full">{weekDay}</span>
                    <span class="weekday short">{weekDayShort}</span>
                    <span class="month full">{month}</span>
                    <span class="month short">{monthShort}</span>
                </span>
                <span class="rhs league full">{game.leagueName}</span>
                <span class="rhs league short">{game.leagueSlug}</span>
            </header>
            <div class="body">
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

    const weekDayShort = weekDay.slice(0, 2);
    const monthShort = month.slice(0, 3);

    console.log(weekDayShort);
    console.log(monthShort);

    const urlMatchReport = SM.UrlBuilder.getMatchReportUrl(game.gameId, game.leagueId, game.leagueSlug);
    // const urlLogoHome = SM.UrlBuilder.getLogoUrl(matchResult.home_team_small_logo);
    // const urlLogoGuest = SM.UrlBuilder.getLogoUrl(matchResult.guest_team_small_logo);
</script>
