<style lang="postcss">
    section {
        background-color: rgba(0, 0, 0.5, 0.8);
    }

    img {
        filter: brightness(0.75);
    }
</style>

<svelte:head>
    {#if imgLowRes}
        <link rel="preload" as="image" href={imgLowRes} />
    {/if}
</svelte:head>

<section
    class="sticky top-0 flex h-screen w-screen snap-start snap-always items-center justify-center text-white"
    style="background-color: {bgColor}"
>
    {#if img}
        <img
            src={img}
            alt=""
            loading="lazy"
            class="absolute left-0 top-0 z-10 h-full w-full object-cover"
            style="background-image: {imgLowRes}"
        />
    {/if}
    <div class="absolute left-0 top-0 z-20 grid h-full w-full justify-items-center items-center place-content-evenly p-4">
        <h2 class="text-[3rem] text-white tracking-widest uppercase">{title}</h2>
        {#if $$slots.default}
            <slot />
        {/if}
    </div>
</section>

<script lang="ts">
    const SLOTS = $$props;

    export let img: string;
    export let imgLowRes: string;
    export let bgColor: string = 'black';
    export let title: string;
</script>
