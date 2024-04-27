<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<div class="flex w-full justify-center">
	<img {src} {alt} loading="lazy" class="w-full rounded-lg" />
</div>

<style>

	img {
		filter: hue-rotate(160deg);
		border-radius: 1rem;
	}

</style>
