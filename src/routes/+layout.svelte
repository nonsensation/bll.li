<script lang="ts">
	import '../app.postcss';
	import '../markdown.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import BreadNav from '$lib/components/BreadNav.svelte';
	import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
</script>

<div class="layout flex flex-col items-stretch gap-4 w-full h-full min-h-screen bg-red-white dark:bg-black text-black dark:text-white">
	<header class="flex">
		<!-- <Navigation /> -->

		<Navbar  >
			<NavBrand href="/">
			  <img src="/images/flowbite-svelte-icon-logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
			  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span>
			</NavBrand>
			<NavHamburger  />
			<NavUl >
			  <NavLi href="/">Home</NavLi>
			  <NavLi href="/about">About</NavLi>
			  <NavLi href="/docs/components/navbar">Navbar</NavLi>
			  <NavLi href="/pricing">Pricing</NavLi>
			  <NavLi href="/contact">Contact</NavLi>
			</NavUl>
		  </Navbar>
		  
		  
		  
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
		<!-- <Navigation /> -->
	</footer>
</div>

<style>

</style>
