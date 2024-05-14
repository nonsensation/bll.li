<style>
</style>

{#if icon}
    {#if iconsSrc[icon]}
        {#await fetchSvg(iconsSrc[icon])}
        {:then value}
            <div class={cls}>{@html value}</div>
        {:catch}
        {/await}
    {:else if svicons[icon]}
        <div class={cls}>
            <svelte:component this={svicons[icon]}></svelte:component>
        </div>
    {:else}
    {/if}
{:else}
{/if}

<script lang="ts">
    export let icon = '';
    export let classes = 'w-6 color-text';

    $: cls = classes || "w-6"

    function fetchSvg(svgRoute: string) {
        return new Promise((resolve) => {
            fetch(svgRoute + '?raw')
                .then((response) => response.text())
                .then((svg) => resolve(svg))
                .catch( e => console.error("ERROR: " + e));
        });
    }

    // See: https://stackoverflow.com/a/75950500/11341498
    // svg
    // import YT1 from '/icons/home.svg';
    // import YT2 from '/icons/logo-discord.svg';

    // svelte
    import YT3 from '$lib/components/icons/FLOORBALL.svelte';
    import YT4 from '$lib/components/icons/CAPTAIN.svelte';

    const iconsSrc = {
        // yt1: '$lib/assets/icons/home.svg', // doesnt work
        yt1: '/icons/dark-mode.svg',
        yt2: '/icons/home.svg',
    };

    const svicons = {
        yt3: YT3,
        yt4: YT4,
    };
</script>
