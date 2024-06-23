<style lang="postcss">
.clubs {
    grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
}
</style>

<div class="">{JSON.stringify(data)}</div>

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';
import Icon from '$lib/components/Icon.svelte';

export let data;
</script>
