<script lang="ts">
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="h-full mx-auto gap-8 flex flex-col">
	<section>
		<ul class="grid gap-4">
			{#each data.posts as post}
				<li class="flex">
					<a
						href="/wiki/{post.slug}"
						class="border rounded border-sf2 p-4 hover:no-underline w-full hover:border-prim"
					>
						<span class="font-bold text-lg">{post.title}</span>
						<p class="text-txt2">{post.description}</p>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style lang="postcss">
	ul {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
	}
</style>
