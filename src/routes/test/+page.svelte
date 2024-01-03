<style lang="postcss">
    h3 {
        font-size: 3rem;
        font-weight: bold;
        letter-spacing: 0.5rem;
    }
</style>

<div class="flex h-full w-full flex-col flex-wrap content-center items-center justify-center gap-x-10 p-10">

    <h3>Goalies</h3>

    <div class="gap-x-20 flex flex-wrap content-evenly items-center justify-center">
        {#each [...Array(3)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Defense</h3>

    <div class="gap-x-20 flex flex-wrap content-evenly items-center justify-center">
        {#each [...Array(7)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Center</h3>

    <div class="gap-x-20 flex flex-wrap content-evenly items-center justify-center">
        {#each [...Array(3)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Offensiv</h3>

    <div class="gap-x-20 flex flex-wrap content-evenly items-center justify-center">
        {#each [...Array(7)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

    <h3>Trainer</h3>

    <div class="gap-x-20 flex flex-wrap content-evenly items-center justify-center">
        {#each [...Array(1)] as i}
            <PlayerCard {...playerInfo}></PlayerCard>
        {/each}
    </div>

</div>

<script lang="ts">
    import PlayerCard from './PlayerCard.svelte';
    import imgPoster from './poster.png';
    import imgPopup from './popup.png';

    const playerInfo = {
        name: 'Kim Nilsson',
        imgPoster,
        imgPopup,
        position: 'Offense',
    };
</script>
