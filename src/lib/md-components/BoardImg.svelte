<script lang="ts">
	export let src: string;
	export let alt: string;
	export let title: string;
</script>

<div class="faded flex w-full justify-center flex-grow items-stretch bg-sf">
	<img {src} {alt} {title} loading="lazy" class="w-full rounded" />
</div>

<style>
	img {
		filter: hue-rotate(var(--hue, 160deg));
	}

	.faded {
		position: relative;
		display: inline-block;
	}
	.faded:after {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-collapse: separate;
		/* box-shadow: inset 0 0 0.35rem 0.35rem var(--color-surface); */
	}
</style>
