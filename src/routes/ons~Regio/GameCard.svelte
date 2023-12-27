<style lang="postcss">
	a {
		color: var(--color-text);

		&:hover {
			border-radius: var(--border-radius);
			text-decoration: none;
			outline: 2px solid var(--color-text-highlight);
			border: 1px solid transparent;
		}

		border-radius: var(--border-radius);
		padding: 0.25em;
		background-color: var(--color-bg);
		box-shadow: var(--shadow);
		border: 1px solid slategrey;

		section {
			border-radius: var(--border-radius);
			padding: 0.25em;
		}
	}

	.isToday {
		/* outline: 4px solid blueviolet; */
		/* background-color: cornflowerblue; */
	}

	.isUpcoming {
		/* outline: 1px solid orange; */
		/* background-color: cornflowerblue; */
		/* box-shadow: var(--shadow); */
		/* border: none; */
	}

	.inner {
		display: grid;
		grid-template-rows: 33% auto;
	}

	header {
		align-self: center;
		justify-self: center;
		align-items: center;
		display: grid;
		grid-auto-flow: row;
		font-size: 0.75rem;

		.league {
			color: var(--color-text-highlight);
		}

		.title {
			text-align: center;
		}

		.date-time {
			text-align: center;
		}
	}

	main {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;

		place-content: center;
		place-items: center;
	}

	.home,
	.guest {
		display: grid;
		grid-auto-flow: row;
		place-content: center;
		place-items: center;

		.name {
			text-transform: uppercase;
			font-weight: bold;
			font-size: 0.8rem;
			text-align: center;
		}

		img {
			padding: 0.5rem;

			max-width: 8rem;
			min-width: 1rem;
			width: 100%;
			height: auto;

			border-radius: var(--border-radius);
			/* filter: drop-shadow(0 0 1rem var(--color-shadow)); */
		}
	}

	.score {
		display: flex;
		justify-content: center;
		align-items: center;

		color: var(--color-text-highlight);
		font-family: 'Quantico', sans-serif;
		font-size: 3.75rem;
		/* font-size: 3.5vw; */
		font-weight: 700;
		/* font-style: italic; */
		white-space: nowrap;
	}

	.isToday {
		/* outline: 4px solid blueviolet; */
		/* background-color: cornflowerblue; */
	}

	@keyframes rotate {
		100% {
			transform: rotate(1turn);
		}
	}

	.isUpcoming {
		position: relative;
		z-index: 0;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			z-index: -2;
			width: 200%;
			height: 200%;
			left: -50%;
			top: -50%;

			background-repeat: no-repeat;
			background-image: conic-gradient(
				from 0deg,
				var(--color-text-highlight),
				var(--color-text-highlight) 25%,
				var(--color-text) 25%,
				var(--color-text) 50%,
				var(--color-text-highlight) 50%,
				var(--color-text-highlight) 75%,
				var(--color-bg) 75%,
				var(--color-bg) 100%
			);
			animation: rotate 15s linear infinite;
		}

		&::after {
			content: '';
			position: absolute;
			z-index: -1;
			--w: 2px;
			left: var(--w);
			top: var(--w);
			width: calc(100% - 2 * var(--w));
			height: calc(100% - 2 * var(--w));
			background: white;
			/* background: transparent; */
		}
	}
</style>

<a href={urlMatchReport} target="_blank">
	<section class:isToday class:isUpcoming class="rainbow">
		<div class="inner">
			<header>
				<div class="league">{league.name}</div>
				<div class="title">Spieltag&nbsp;{game_day}</div>
				<div class="date-time">{date}&nbsp;{time}</div>
			</header>
			<main>
				<div class="home">
					<img
						class="logo"
						alt="Logo {home_team_name}"
						src={urlLogoHome}
						decoding="async"
						loading="lazy"
					/>
					<span class="name">{home_team_name}</span>
				</div>
				<div class="score">
					{#if result}
						{result.home_goals}<span>:</span>{result.guest_goals}
					{:else}
						<span>vs</span>
					{/if}
				</div>
				<div class="guest">
					<img
						class="logo"
						alt="Logo {guest_team_name}"
						src={urlLogoGuest}
						decoding="async"
						loading="lazy"
					/>
					<span class="name">{guest_team_name}</span>
				</div>
			</main>
		</div>
	</section>
</a>

<script lang="ts">
	import type { GameCard } from '$lib/types';
	import { SM } from 'floorball-saisonmanager';

	export let gameCard: GameCard;

	const { matchResult, league, isToday, isUpcoming, isFinished } = gameCard;
	const { game_day, time, date, guest_team_name, home_team_name, result } = matchResult;

	const urlMatchReport = SM.UrlBuilder.getMatchReportUrl(
		matchResult.game_id,
		SM.LeagueId_Regio,
		SM.Slug_Ost
	);
	const urlLogoHome = SM.UrlBuilder.getLogoUrl(matchResult.home_team_small_logo);
	const urlLogoGuest = SM.UrlBuilder.getLogoUrl(matchResult.guest_team_small_logo);
</script>
