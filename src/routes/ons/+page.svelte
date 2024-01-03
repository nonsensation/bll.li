<style lang="postcss">
    main {
        scroll-snap-type: y mandatory;
    }
</style>

<svelte:head>
    <title>Black Lions Landsberg</title>
    <meta name="description" content="Black Lions Landsberg - Floorball Verein" />
</svelte:head>

<main class="">
    {#await data}
        Lade Spiele
    {:then data}
        {#if data}
            <StickySection {...matchesSection}>
                <GamesSlider {...data} />
            </StickySection>
        {:else}
            <StickySection {...matchesSection}></StickySection>
        {/if}
    {/await}

    <StickySection {...teamsSection}>
        <div class="flex flex-wrap justify-center gap-4 text-[1.5rem]">
            {#each SeasonTeams as team}
                <a
                    href="/ons~{team.slug}"
                    class="rounded border bg-[rgba(0,0,0,0.5)] border-white p-4 px-8 font-bold text-white hover:no-underline hover:bg-white hover:text-black"
                    >{team.name}</a
                >
            {/each}
        </div>
    </StickySection>

    {#each sections as section}
        <StickySection {...section}></StickySection>
    {/each}
</main>

<script lang="ts">
    import GamesSlider from '$lib/components/GamesSlider.svelte';
    import StickySection from './StickySection.svelte';
    import { SeasonTeams } from '$lib/config/TeamInfo';

    export let data;

    let matchesSection = {
        img: 'https://media.gettyimages.com/id/1188808424/de/foto/neuchatel-switzerland-krupnova-eliska-celebrates-her-goal-with-teammates-during-the-bronze.webp?s=1024x1024&w=gi&k=20&c=VAAklyuhfsB1ebMGT3P-1DmxcdkQnUBarrYzvVKVHJc=',
        imgLowRes: '',
        bgColor: 'red',
        title: 'Spiele',
    };

    let teamsSection = {
        img: 'https://live.staticflickr.com/65535/53393848457_18d383eac4_h.jpg',
        imgLowRes: '',
        bgColor: 'black',
        title: 'Teams',
    };

    let sections = [
        {
            img: 'https://www.kreisbote.de/assets/images/19/914/19914811-920768125-20121118_vfl_kaufering_vs_black_lions_landsberg-saale_05-O373.jpg',
            imgLowRes: '',
            bgColor: 'black',
            title: 'News',
        },
        {
            img: 'https://live.staticflickr.com/65535/52116272136_2b40d2e2a4_h.jpg',
            imgLowRes: '',
            bgColor: 'red',
            title: 'Kontakt',
        },
        {
            img: 'https://live.staticflickr.com/65535/53393848457_18d383eac4_h.jpg',
            imgLowRes: '',
            bgColor: 'red',
            title: 'Training',
        },
    ];
</script>
