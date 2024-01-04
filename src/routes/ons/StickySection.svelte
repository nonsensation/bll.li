<style lang="postcss">
    section {
        background-color: rgba(0, 0, 0.5, 0.8);
    }

    picture {
        position: relative;
    }
    picture::after {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 30;
        background: linear-gradient(to top, black 0%, transparent 15%, transparent 85%, black 100%);
    }
    img {
        /* filter: brightness(0.85); */
    }
</style>

<svelte:head>
    {#if imgLowRes}
        <link rel="preload" as="image" href={imgLowRes} />
    {/if}
</svelte:head>

<section
    class:sticky
    class="top-0 flex h-screen w-screen snap-start snap-always items-center justify-center border-y-2 border-white text-white"
    style="background-color: {bgColor}"
>
    {#if img}
        <picture class="absolute left-0 top-0 z-10 h-full w-full">
            <img
                src={img}
                alt=""
                loading="lazy"
                class="h-full w-full object-cover"
                style="background-image: {imgLowRes}"
            /></picture
        >
    {/if}
    <div
        class="absolute left-0 top-0 z-20 grid h-full w-full place-content-evenly items-center justify-items-center p-10"
    >
        <h2 class="rounded border-2 border-white bg-[#0008] p-2 px-4 text-[3rem] uppercase tracking-widest text-white">
            {title}
        </h2>
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
    export let sticky: boolean = false;
</script>
