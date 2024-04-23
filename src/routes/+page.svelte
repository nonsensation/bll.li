<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	export let data;

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="container h-full mx-auto gap-8 flex flex-col">
	<section>
		<ul class="posts grid gap-2">
			{#each data.posts as post}
				<li class="post">
					<a href="/wiki/{post.slug}" class="title">{post.title}</a>
					<p class="date">{formatDate(post.date)}</p>
					<p class="description">{post.description}</p>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style lang="postcss">
</style>
