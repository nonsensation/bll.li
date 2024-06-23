<style lang="postcss">
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

<h2 class="text-center">
    <a href="/sm/game-operation?id={data.gameOperations[currentGameOperationId].id}">
        <div class="">Spielbetrieb: {data.gameOperations[currentGameOperationId].name}</div>
        <img
            class="h-16 w-full object-contain"
            title="Gehe zu SPielbetrieb {data.gameOperations[currentGameOperationId].name}"
            src="https://bll.wik.li/sm-data/images/GameOperationLogos/{data.gameOperations[
                currentGameOperationId
            ].short_name}.png"
            alt=""
        />
    </a>
</h2>

<LeagueFilter bind:filterEvent="{filter}" />

<div class="my-12 grid grid-cols-[1fr,2fr] justify-center gap-4 rounded shadow-inner">
    <div class="flex h-full flex-col items-center gap-4">
        {#each data.gameOperations as go, goIdx}
            <button
                class="flex w-full flex-col justify-center gap-2
                    rounded border-2
                    hover:border-prim
                    md:p-4"
                class:border-prim="{currentGameOperationId == goIdx}"
                class:border-sf2="{currentGameOperationId != goIdx}"
                class:bg-sf3="{currentGameOperationId == goIdx}"
                onclick="{() => (currentGameOperationId = goIdx)}"
                title="Spielbetrieb: {go.name}"
            >
                <img
                    src="https://bll.wik.li/sm-data/images/GameOperationLogos/{go.short_name}.png"
                    alt=""
                    class="hidden h-12 object-contain md:block dark:hue-rotate-180 dark:invert"
                />
                <img
                    src="https://bll.wik.li/sm-data/images/GameOperationLogos/{go.short_name}_quad.png"
                    alt=""
                    class="h-12 object-contain md:hidden dark:hue-rotate-180 dark:invert"
                />

                <div class="text-xs font-normal md:text-sm md:font-bold">{go.name}</div>
            </button>
        {/each}
    </div>

    {#if data.leagues[currentGameOperationId]}
        <div class="flex flex-col odd:*:bg-sf3">
            {#each data.leagues[currentGameOperationId].filter(filter) as l}
                <a
                    href="/sm/league?id={l.id}"
                    title="Liga: {l.name}"
                    class="rounded p-2 text-sm hover:bg-sf2 md:text-base">{l.name}</a
                >
            {/each}
        </div>
    {/if}
</div>

<div class="">
    {JSON.stringify(
        data.gameOperations.map(x => {
            return { slug: x.short_name, logo: x.logo_url, quad: x.logo_quad_url };
        })
    )}
</div>

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';
import Icon from '$lib/components/Icon.svelte';
import LeagueFilter from '$lib/components/sm/LeagueFilter.svelte';

export let data;

let filter;

$: currentGameOperationId = 0;

$: console.dir(
    data.gameOperations.map(x => {
        return { slug: x.short_name, logo: x.logo_url, quad: x.logo_quad_url };
    })
);

const blendModes = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
    'plus-darker',
    'plus-lighter',
];
</script>
