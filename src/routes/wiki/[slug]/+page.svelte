<script lang="ts">
	import { formatDate } from '$lib/utils';

	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="">
	<hgroup class="">
		<h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-5xl">
			<span class="text-transparent bg-clip-text bg-gradient-to-r to-primary-700 from-primary-900">
				{data.meta.title}
			</span>
		</h1>
		<!-- <p>Published at {formatDate(data.meta.date)}</p> -->
	</hgroup>

	<div class="flex tags flex-wrap m-4 text-center gap-2 justify-center text-sm font-light">
		{#each data.meta.categories as category}
			<a
				href="/wiki/tags/{category}"
				class="border rounded px-1 py-[0.1rem] shadow leading-4 hover:border-primary-400"
			>
				<div class="dark">&num;{category}</div>
			</a>
		{/each}
	</div>

	<div class="">
		<svelte:component this={data.content} />
	</div>
</article>

<style lang="postcss">
</style>
