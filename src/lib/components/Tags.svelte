<script lang="ts">
	export let categories;
</script>

<div class="flex tags flex-wrap m-4 text-center gap-2 justify-center text-[75%]">
	{#each categories as category}
		<a
			href="/wiki/tags/{category}"
			class="category rounded border-sf2 px-1 pt-[0.2rem] pb-[0.1rem] leading-4 border hover:bg-transparent hover:no-underline hover:border-prim hover:shadow"
		>
			<div class="dark">&num;{category}</div>
		</a>
	{/each}
</div>
