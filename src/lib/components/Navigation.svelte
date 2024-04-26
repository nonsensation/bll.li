<script lang="ts">
	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		DarkMode,
		Dropdown,
		DropdownItem
	} from 'flowbite-svelte';

</script>

<Navbar
	class="max-w-screen-xl text-black dark:text-white bg-white dark:bg-black"
>
	<NavBrand href="/">
		<img src="/favicon.png" class="me-3 h-12 sm:h-16" alt="Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Black Lions Landsberg
		</span>
	</NavBrand>
	<NavHamburger name={""} />
	<NavUl>
		<NavLi href="/">Start</NavLi>
		<NavLi href="/wiki">Wiki</NavLi>
		<NavLi href="/info">Info</NavLi>
		<NavLi><DarkMode btnClass="" /></NavLi>
	</NavUl>
</Navbar>

<style>
</style>
