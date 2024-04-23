<script lang="ts">
	import '../app.postcss';
	import Navigation from '$lib/components/Navigation.svelte';
	import BreadNav from '$lib/components/BreadNav.svelte';
</script>

<div class="layout flex flex-col items-stretch gap-4 w-full h-screen bg-red-white dark:bg-black text-black dark:text-white">
	<header class="flex">
		<Navigation />
	</header>
	<main class="flex flex-col flex-grow w-full justify-start items-center gap-4 px-[5%]">
		<div class="page-header self-start">
			<BreadNav />
		</div>
		<div class="page-content w-full max-w-screen-xl flex-grow">
			<slot />
		</div>
		<div class="page-footer self-start">
			<BreadNav />
		</div>
	</main>
	<footer class="flex">
		<Navigation />
	</footer>
</div>

<style>

</style>
