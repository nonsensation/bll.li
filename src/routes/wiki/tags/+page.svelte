<script lang="ts">

	export let data;
</script>

<div class="tags">
	{#each data.uniqueTags as tag}
		<a href="/wiki/tags/{tag}">
			<div color="dark">&num;{tag}</div>
		</a>
	{/each}
</div>
