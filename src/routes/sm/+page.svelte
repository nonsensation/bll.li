<style lang="postcss">
summary img {
    height: 100%;
}

.lol {
    height: 3rem;
}
</style>

<!-- <div class="">{JSON.stringify(data)}</div> -->

<h2 class="border-b pb-16 text-center text-3xl font-bold">
    <a
        href="/sm/scorer"
        class="flex w-full flex-col items-center justify-center"
    >
        <div class="text-4xl">Topscorer</div>
        <Icon
            icon="FLOORBALL2"
            class="w-16"
        ></Icon>
    </a>
</h2>

<h2 class="text-center">Spielbetrieb: {data.gameOperations[currentGameOperationId].name}</h2>

<LeagueFilter bind:filterEvent="{filter}" />

<div class="my-12 grid grid-cols-[1fr,2fr] justify-center gap-4 rounded p-4">
    <div class="flex flex-col items-center gap-4">
        {#each data.gameOperations as go, goIdx}
            <button
                class="flex w-full justify-center rounded border-2 p-4 hover:border-dashed"
                class:border-prim="{currentGameOperationId == goIdx}"
                onclick="{() => (currentGameOperationId = goIdx)}"
                title="Spielbetrieb: {go.name}"
            >
                <img
                    src="{go.logo_url}"
                    alt=""
                    class="hidden h-12 md:block"
                />
                <img
                    src="{go.logo_quad_url}"
                    alt=""
                    class="h-12 object-contain md:hidden"
                />
            </button>
        {/each}
    </div>

    {#if data.leagues[currentGameOperationId]}
        <div class="flex flex-col odd:*:bg-sf3">
            {#each data.leagues[currentGameOperationId].filter(filter) as l}
                <a
                    href="/sm/league?id={l.id}"
                    title="Liga: {l.name}"
                    class="rounded p-2 hover:bg-sf2">{l.name}</a
                >
            {/each}
        </div>
    {/if}
</div>

<!-- <div class="">{JSON.stringify(data.gameOperations)}</div> -->

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';
import Icon from '$lib/components/Icon.svelte';
import LeagueFilter from '$lib/components/sm/LeagueFilter.svelte';

export let data;

let filter;

$: currentGameOperationId = 0;
</script>
