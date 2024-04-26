<script lang="ts">
	import '../app.postcss';
	import '../markdown.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import BreadNav from '$lib/components/BreadNav.svelte';
	import { DarkMode, NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
</script>

<div class="layout grid gap-4 w-full h-full min-h-screen justify-stretch bg-white dark:bg-black text-black dark:text-white">
	<header class="w-full flex justify-center border-b-2 border-primary-600">
		<div class="flex flex-col items-center md:flex-row md:justify-between w-full max-w-screen-xl px-[5%]">
			<div class="flex">
				<img src="/favicon.png" class="m-2 h-12 sm:h-16" alt="Logo" />
				<span
					class="hidden md:block self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white"
				>
					Black Lions Landsberg
				</span>
			</div>

			<ul class="flex gap-4 items-center">
				<li><a href="/">Start</a></li>
				<li><a href="/wiki">Wiki</a></li>
				<li><a href="/info">Info</a></li>
				<li><DarkMode></DarkMode></li>
			</ul>
		</div>
	</header>

	<main class="w-full flex justify-center">
		<div class="w-full max-w-screen-xl px-[5%]">
			<div class="page-header" >
				<BreadNav />
			</div>
			<div class="page-content">
				<slot />
			</div>
			<div class="page-footer">
				<BreadNav />
			</div>
		</div>
	</main>

	<!-- max-w-screen-xl px-[5%] -->

	<footer class="border-t-2 border-primary-600">
		<div class="w-full max-w-screen-xl px-[5%]">
			<!-- <Navigation /> -->
			FOOTER
		</div>
	</footer>
</div>

<style>
	.layout {
		grid-template-rows: auto 1fr auto;
	}
</style>
