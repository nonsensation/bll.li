<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<div class="flex w-full justify-center">
	<img {src} {alt} loading="lazy" class="w-full" />
</div>

<style>

</style>
