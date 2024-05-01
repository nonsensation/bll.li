<script lang="ts">
    import Posts from "$lib/components/Posts.svelte";
    import Tags from "$lib/components/Tags.svelte";

    export let data;
</script>

<Tags tags={data.tags}></Tags>

<Posts posts={data.posts} />