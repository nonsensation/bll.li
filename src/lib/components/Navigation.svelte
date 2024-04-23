<script lang="ts">
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode } from 'flowbite-svelte';
	import BreadNav from './BreadNav.svelte';
	$: activeUrl = $page.url.pathname;
	let activeClass =
		'font-bold text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent';
	let nonActiveClass =
		'font-semibold text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>

<Navbar let:NavContainer class="border-b-2 text-black dark:text-white border-primary-500 dark:border-primary-500 bg-white dark:bg-black">
	<NavContainer class="">
		<NavBrand href="/">
			<img src="/favicon.png" class="me-3 h-12 sm:h-16" alt="Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Black Lions Landsberg
			</span>
		</NavBrand>

		<NavHamburger />
		<NavUl {activeUrl} {activeClass} {nonActiveClass}>
			<NavLi href="/">Start</NavLi>
			<NavLi href="/teams">Teams</NavLi>
			<NavLi href="/wiki">Wiki</NavLi>
			<NavLi href="/info">Info</NavLi>
		</NavUl>
		<DarkMode />
	</NavContainer>
</Navbar>

<style>
</style>
