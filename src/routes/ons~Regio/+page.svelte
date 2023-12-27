<style>
	section.matches {
		display: grid;
		grid-auto-flow: row;
		align-content: start;
		gap: 1em;
		overflow-y: scroll;
		padding: var(--gap);
		margin: var(--gap) 0;
	}

	.content {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		padding: 1rem;
		/* height: 100vh;
		height: 100%; */
		justify-self: stretch;
		align-self: stretch;
	}

	section.teamfoto {
		overflow-y: auto;
		flex-shrink: 0;
		flex-grow: 0;
		max-height: calc(100vh - 2em);
		/* height: 100%; */
		position: sticky;
	}

	.hline {
		/* border-top: 1px solid slategrey; */
		width: 100%;
	}

	span.title {
		text-align: center;
		border-bottom: 1px solid slategrey;
	}
</style>

<svelte:head>
	<title>Regio</title>
	<meta name="description" content="Regio" />
</svelte:head>

<div class="content">
	<section class="teamfoto">
		<img
			src="https://reddevils.org/wp-content/uploads/2018/11/pokal_runde3_vs_landsberg.jpg"
			alt="Teamfoto"
		/>
	</section>

	<section class="matches">
		{#await data}
			<span>Lade Spiele...</span>
		{:then data}
			{#if data.upcomingGames.length > 0}
				<span class="title">Kommende Spiele</span>
				{#each data.upcomingGames as gameCard}
					<GameCard {gameCard}></GameCard>
				{/each}
			{/if}

			{#if data.upcomingGames.length > 0 && data.finishedGames.length > 0}
				<div class="hline"></div>
			{/if}

			{#if data.finishedGames.length > 0}
				<span class="title">Vergangene Spiele</span>
				{#each data.finishedGames as gameCard}
					<GameCard {gameCard}></GameCard>
				{/each}
			{/if}
		{:catch error}
			<p>Fehler beim Laden der Spiele: {error.message}</p>
		{/await}
	</section>
</div>

<script lang="ts">
	import GameCard from './GameCard.svelte';

	export let data;
</script>
