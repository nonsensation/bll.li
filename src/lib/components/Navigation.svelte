<script lang="ts">
	import { page } from '$app/stores';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, DarkMode, Dropdown, DropdownItem } from 'flowbite-svelte';
	$: activeUrl = $page.url.pathname;
	let activeClass =
		'p-4 font-bold text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent';
	let nonActiveClass =
		'p-4 font-semibold text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';
</script>


<Navbar  class="border-b-2 text-black dark:text-white border-primary-500 dark:border-primary-500 bg-white dark:bg-black">
		<NavBrand href="/">
			<img src="/favicon.png" class="me-3 h-12 sm:h-16" alt="Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Black Lions Landsberg
			</span>
		</NavBrand>
		<NavHamburger name={"Menu"} />
		<NavUl {activeUrl} {activeClass} {nonActiveClass}>
			<NavLi href="/">Start</NavLi>
			<NavLi>Teams</NavLi>
			<Dropdown>
				<DropdownItem href="/ons~Regio">Herren - Regio</DropdownItem>
				<DropdownItem href="/ons~U15">Jugend - U15</DropdownItem>
				<DropdownItem href="/ons~U11">Jugend - U11</DropdownItem>
			  </Dropdown>
			<NavLi href="/wiki">Wiki</NavLi>
			<NavLi href="/info">Info</NavLi>
			<NavLi><DarkMode btnClass="" /></NavLi>
		</NavUl>
</Navbar>



<style>
</style>
