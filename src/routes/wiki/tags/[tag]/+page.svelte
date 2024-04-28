<style>

</style>

<svelte:head>
    <title>{config.title}</title>
</svelte:head>

<Tags tags={data.uniqueTags} />
<Posts posts={data.tagPosts} />

<script lang="ts">
    import Tags from '$lib/components/Tags.svelte';
    import Posts from '$lib/components/Posts.svelte';
    import * as config from '$lib/config';

    export let data;
</script>
