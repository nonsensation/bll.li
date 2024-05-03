<style></style>

<h3 bind:this={data} {id} class="text-md font-bold py-2">
    <slot /><button on:click={() => navigator.clipboard.writeText(window.location.href.replace(/#.*$/, '') + '#' + id)}>
        <LINK href={$page.url.pathname + "#" + encodeURI( id )} />
    </button>
</h3>

<script lang="ts">
    // See: https://github.com/pngwn/MDsveX/discussions/549

	import { page } from '$app/stores';
    import LINK from '$lib/components/icons/LINK.svelte';

    let data: HTMLElement;
    let id: string;

    $: id = data?.innerText
        // .toLowerCase()
        .replaceAll(' ', '-')
        // .replace(/[^a-z\-]/g, '')
</script>
