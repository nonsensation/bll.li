<script lang="ts">
	import { Badge } from 'flowbite-svelte';

	export let data;
</script>

<div class="tags">
	{#each data.uniqueCategories as category}
		<a href="/wiki/categories/{category}">
			<Badge color="dark">&num;{category}</Badge>
		</a>
	{/each}
</div>
