<style lang="postcss">
    article {
        font-weight: regular;
        line-height: 1.4;
    }

    h1 {
    }

    :global(.md h2) {
        margin-block: 1em;
        @apply text-2xl font-bold;
    }

    :global(.md h3) {
        margin-block: 1em;
        @apply text-xl font-semibold;
    }

    :global(.md h4) {
        margin-block: 1em;
        @apply text-lg font-semibold;
    }

    :global(.md h5) {
        margin-block: 1em;

        @apply text-base font-semibold;
    }

    :global(.md h6) {
        margin-block: 1em;

        @apply text-base font-normal;
    }

    :global(.md p) {
        margin-top: 0;
        hyphens: auto;
        text-align: justify;
        line-height: 150%;
        margin-block: 0.5em;
        letter-spacing: 120%;
    }

    :global(.md a) {
        @apply text-prim
    }

    :global(.md a:hover) {
        @apply underline
    }

    :global(.md ul li) {
        @apply list-disc ml-4 pl-2
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
