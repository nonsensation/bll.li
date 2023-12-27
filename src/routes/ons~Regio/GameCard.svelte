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

	.test {
		width: 50px;
		height: auto;
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
					{#await imgGuestBase64String }
						Loading Image...
					{:then img }
						<img
						class="logo"
						alt="Logo {guest_team_name}"
						src={img}
						decoding="async"
						loading="lazy"
					/>
					{/await}
					<span class="name">{guest_team_name}</span>
				</div>
			</main>
		</div>
	</section>
</a>

<script lang="ts">
	import type { GameCard } from '$lib/types';
	import { SM } from 'floorball-saisonmanager';
    import { onMount } from 'svelte';

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

	let imgHomeBase64String: Promise<string>
	let imgGuestBase64String: Promise<string>


	async function getImage( imgUrl: string ): Promise<string>
	{
		const logoUrl = SM.UrlBuilder.getLogoUrl( imgUrl )

		try
		{
			const logoResponse = await fetch( `/proxy?url=${ encodeURIComponent( logoUrl ) }` )
			const imgData = await logoResponse.arrayBuffer()
			// const buffer = Buffer.from( imgData )

			return "data:image/*;base64," + base64ArrayBuffer( imgData )
		}
		catch( error )
		{
			console.error( error )
		}

		return ""
	}

	onMount(async () => {

		imgHomeBase64String = getImage( matchResult.home_team_small_logo )
		imgGuestBase64String = getImage( matchResult.guest_team_small_logo )

	})


	function base64ArrayBuffer(arrayBuffer: ArrayBuffer) {
  var base64    = ''
  var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

  var bytes         = new Uint8Array(arrayBuffer)
  var byteLength    = bytes.byteLength
  var byteRemainder = byteLength % 3
  var mainLength    = byteLength - byteRemainder

  var a, b, c, d
  var chunk

  // Main loop deals with bytes in chunks of 3
  for (var i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder == 1) {
    chunk = bytes[mainLength]

    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder == 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }

  return base64
}
</script>
