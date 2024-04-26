<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
</script>

<div class="flex w-full justify-center">
	<img {src} {alt} {title} loading="lazy" class="w-full"/>
</div>

<style>
	img {
		filter: hue-rotate(var(--hue, 160deg));
	}
</style>
