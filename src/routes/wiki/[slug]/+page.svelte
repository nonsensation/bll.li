<script lang="ts">
	import Tags from "$lib/components/Tags.svelte";

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="">
	<hgroup class="">
		<h1 class="my-16 font-black text-3xl text-center border-double border-b-4">
			<span class="text-transparent bg-clip-text bg-gradient-to-r to-prim from-prim2">
				{data.meta.title}
			</span>
		</h1>
	</hgroup>


	<Tags categories={data.meta.categories} />

	<div class="">
		<svelte:component this={data.content} />
	</div>
</article>

<style lang="postcss">
	article {
		font-weight: regular;
		line-height: 1.4;
	}

	h1 {
		font-family: "Exo2";
		font-size: 2.5rem;
	}

	:global(article h2) {
		margin-block: 1em;
		font-weight: normal;
		@apply text-2xl underline font-bold;
	}

	:global(article h3) {
		font-weight: normal;
		font-style: italic;
		margin-top: 3em;
		@apply text-xl font-semibold;
	}

	:global(article p) {
		margin-top: 0;
		hyphens: auto;
		text-align: justify;
		line-height: 150%;
		margin-block: 0.5em;
		letter-spacing: 120%;
	}

	:global(article a) {
		text-decoration: none;
	}

	:global(article a:hover) {
		text-decoration: underline;
	}

	.category:hover {
		text-decoration: none;
	}
</style>
