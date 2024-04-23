<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	export let data;
</script>

<div class="tags">
	{#each data.uniqueTags as tag}
		<a href="/wiki/tags/{tag}">
			<Badge color="dark">&num;{tag}</Badge>
		</a>
	{/each}
</div>
