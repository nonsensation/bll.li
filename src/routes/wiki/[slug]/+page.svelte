<style lang="postcss">
    article {
        font-weight: regular;
        line-height: 1.4;
    }

    h1 {
    }


</style>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="">
    <hgroup class="">
        <h1 class="my-16 font-black text-2xl text-center border-double border-b-4">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-prim2 from-prim tracking-widest">
                {data.meta.title}
            </span>
        </h1>
    </hgroup>

    <Tags tags={data.meta.tags} />

    <div class="md">
        <svelte:component this={data.content} />
    </div>
</article>

<script lang="ts">
    import Tags from '$lib/components/Tags.svelte';

    export let data;
</script>
