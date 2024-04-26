<script lang="ts">
	import '../app.postcss';
	import '../markdown.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import BreadNav from '$lib/components/BreadNav.svelte';
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
</script>

<div
	class="layout flex flex-col items-stretch gap-4 w-full h-full min-h-screen bg-red-white dark:bg-black text-black dark:text-white"
>
	<header
		class="flex w-full justify-center border-b-2 border-primary-500 dark:border-primary-500 bg-white dark:bg-black"
	>
		<Navigation />
	</header>

	<main class="flex flex-col flex-grow w-full justify-start items-center px-[5%]">
		<div class="max-w-screen-xl flex flex-col flex-grow w-full justify-start items-center gap-4">	
			<div class="page-header self-start">
				<BreadNav />
			</div>
			<div class="page-content w-full flex-grow">
				<slot />
			</div>
			<div class="page-footer self-start">
				<BreadNav />
			</div>
		</div>
	</main>

	<footer class="flex max-w-screen-xl">
		<!-- <Navigation /> -->
	</footer>
</div>

<style>
</style>
