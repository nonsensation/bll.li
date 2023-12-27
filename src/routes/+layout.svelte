<style>
	.app {
		display: flex;
		flex-direction: column;

		display: grid;
		grid-template-columns: 1fr;
		align-items: stretch;
		justify-items: stretch;

		height: 100%;

		width: 100%;

		background: var(--color-bg);
		border-radius: var(--border-radius);
		box-shadow: var(--shadow);
		/* margin: 1.5rem; */
	}

	main {
		display: grid;
		grid-template-columns: 1fr;
		align-items: stretch;
		justify-items: stretch;

		height: 100%;
	}

</style>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<script>
	import './styles.css';
</script>
