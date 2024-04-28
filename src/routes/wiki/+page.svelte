<script lang="ts">
    import Tags from "$lib/components/Tags.svelte";

    export let data;
</script>

<Tags tags={data.tags}></Tags>
