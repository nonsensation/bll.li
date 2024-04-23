<style lang="postcss">

</style>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article class="">
    <hgroup class="">
        <h1 class="text-xl font-extrabold text-gray-900 dark:text-white md:text-2xl lg:text-5xl">
            <span class="text-transparent bg-clip-text bg-gradient-to-r to-primary-700 from-primary-900">
                {data.meta.title}
            </span>
        </h1>
        <!-- <p>Published at {formatDate(data.meta.date)}</p> -->
    </hgroup>

    <div class="tags m-4 text-center">
        {#each data.meta.categories as category}
            <a href="/wiki/tags/{category}">
                <Badge color="dark">&num;{category}</Badge>
            </a>
        {/each}
    </div>

    <div class="">
        <svelte:component this={data.content} />
    </div>
</article>

<script lang="ts">
    import { formatDate } from '$lib/utils';
	import { Badge } from 'flowbite-svelte';

    export let data;
</script>
