<script lang="ts">
    import Posts from "$lib/components/Posts.svelte";
    import Tags from "$lib/components/Tags.svelte";

    export let data;
</script>

<h2 class="font-extrabold text-2xl">
    <a href="/ABC">Floorball-ABC</a>
</h2>

<Tags tags={data.tags}></Tags>

<Posts posts={data.posts} />


