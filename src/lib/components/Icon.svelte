<style>
    :global(.icon svg) {
        @apply inline;
    }
</style>

<span class="icon {classes}" >
    {#if icon in iconsSvgImport}
        {@html iconsSvgImport[icon]}
<!--
    {:else if icon in iconsSvgFetch}
        {#await fetchSvg(iconsSvgFetch[icon]) then value}
            {@html value}
        {/await}
-->
    {:else if icon in iconsSvelte}
        <svelte:component this={iconsSvelte[icon]}></svelte:component>
    {:else}
        [?]
    {/if}
</span>

<script lang="ts">
    // Use: <Icon icon="CAPTAIN" class=""/>

    export let icon: IconKey;
    type IconKey = keyof typeof iconsSvelte | keyof typeof iconsSvgImport ; // | keyof typeof iconsSvgFetch;

    const classes = $$restProps.class ?? 'w-6';

    // svg
    // import HOME from '$lib/assets/icons/HOME.svg?raw';
    import LIGHTMODE from '$lib/assets/icons/LIGHTMODE.svg?raw';
    import DARKMODE from '$lib/assets/icons/DARKMODE.svg?raw';

    import CAPTAIN from '$lib/assets/icons/floorball/CAPTAIN.svg?raw';
    import CARD from '$lib/assets/icons/floorball/CARD.svg?raw';
    import FLOORBALL from '$lib/assets/icons/floorball/FLOORBALL.svg?raw';
    import FLOORBALL2 from '$lib/assets/icons/floorball/FLOORBALL2.svg?raw';
    import GOAL from '$lib/assets/icons/floorball/GOAL.svg?raw';
    import HELMET from '$lib/assets/icons/floorball/HELMET.svg?raw';
    import HELMET2 from '$lib/assets/icons/floorball/HELMET2.svg?raw';
    import REFEREE from '$lib/assets/icons/floorball/REFEREE.svg?raw';
    import TRIKOT from '$lib/assets/icons/floorball/TRIKOT.svg?raw';
    import WHISTLE from '$lib/assets/icons/floorball/WHISTLE.svg?raw';

    import YT from '$lib/assets/icons/logos/YT.svg?raw';
    import DISCORD from '$lib/assets/icons/logos/DISCORD.svg?raw';

    const iconsSvgImport = {
        // HOME,
        LIGHTMODE,
        DARKMODE ,

        CARD ,
        FLOORBALL ,
        FLOORBALL2 ,
        GOAL ,
        HELMET ,
        HELMET2 ,
        REFEREE ,
        TRIKOT ,
        WHISTLE ,
        CAPTAIN ,

        DISCORD ,
        YT ,
    };

    // import SvelteIcon from '$lib/assets/icons/logos/DISCORD.svelte';
    const iconsSvelte = {
        // SvelteIcon: SvelteIcon,
    };

    // function fetchSvg(svgRoute: string) {
    //     return new Promise((resolve) => {
    //         fetch(svgRoute + '?raw')
    //             .then((response) => response.text())
    //             .then((svg) => resolve(svg))
    //             .catch((e) => console.error('ERROR: ' + e));
    //     });
    // }
    //
    // // See: https://stackoverflow.com/a/75950500/11341498
    // const iconsSvgFetch = {
    //      // yt1: '$lib/assets/icons/home.svg', // doesnt work
    //      home: '/icons/home.svg',
    //      'light-mode': '/icons/light-mode.svg',
    //      'dark-mode': '/icons/dark-mode.svg',
    //      'logo-discord': '/icons/logo-discord.svg',
    // };
</script>
