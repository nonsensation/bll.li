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
        <div class="flex gap-4 justify-between text-[1.5rem] ">
            {#each SeasonTeams as team }
                <a href="/ons~{team.slug}" class="text-white font-bold p-4 border border-white rounded hover:bg-white hover:text-black">{team.name}</a>
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
        img: 'https://www.kreisbote.de/assets/images/19/914/19914818-1287666944-20121118_vfl_kaufering_vs_black_lions_landsberg-saale_12-QA73.jpg',
        imgLowRes: '',
        bgColor: 'red',
        title: 'Spiele',
    };

    let teamsSection = {
            img: 'https://www.kreisbote.de/assets/images/19/914/19914819-1629421876-20121118_vfl_kaufering_vs_black_lions_landsberg-saale_13-Qw73.jpg',
            imgLowRes: '',
            bgColor: 'black',
            title: 'Teams',
        }

    let sections = [
        {
            img: 'https://www.kreisbote.de/assets/images/19/914/19914811-920768125-20121118_vfl_kaufering_vs_black_lions_landsberg-saale_05-O373.jpg',
            imgLowRes: '',
            bgColor: 'black',
            title: 'News',
        },
        {
            img: 'https://www.kreisbote.de/assets/images/19/914/19914816-1185979811-20121118_vfl_kaufering_vs_black_lions_landsberg-saale_10-NG73.jpg',
            imgLowRes: '',
            bgColor: 'red',
            title: 'Kontakt',
        },
        {
            img: 'https://www.kreisbote.de/assets/images/19/914/19914821-1486218390-20121118_vfl_kaufering_vs_black_lions_landsberg-saale_15-OE73.jpg',
            imgLowRes: '',
            bgColor: 'red',
            title: 'Training',
        },
    ];
</script>
