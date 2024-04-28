<script lang="ts">
    import Posts from '$lib/components/Posts.svelte';
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<Posts posts={data.posts} />


<style lang="postcss">

</style>
