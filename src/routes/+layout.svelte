<script lang="ts">
	import '../app.postcss';
	import BreadNav from '$lib/components/BreadNav.svelte';
	import DarkMode from '$lib/components/DarkMode.svelte';
</script>

<div
	class="layout grid gap-2 w-full h-full min-h-screen justify-stretch bg-sf text-txt"
>
	<header class="w-full flex justify-center border-b-2 border-prim">
		<div
			class="flex flex-col items-center md:flex-row md:justify-between w-full max-w-screen-xl px-[5%]"
		>
			<a class="flex" href="/">
				<img src="/favicon.png" class="m-2 h-12 sm:h-16" alt="Logo" />
				<span
					class="hidden md:block self-center whitespace-nowrap text-xl font-semibold"
				>
					Black Lions Landsberg
				</span>
			</a>

			<ul class="flex gap-4 items-center">
				<li class="list-none"><DarkMode></DarkMode></li>
				<li class="list-none"><a class="text-txt font-bold hover:text-prim" href="/">Start</a></li>
				<li class="list-none"><a class="text-txt font-bold hover:text-prim" href="/wiki">Wiki</a></li>
				<li class="list-none"><a class="text-txt font-bold hover:text-prim" href="/info">Info</a></li>
			</ul>
		</div>
	</header>

	<main class="w-full flex justify-center">
		<div class="w-full max-w-screen-xl px-[5%] flex flex-col gap-2">
			<div class="page-header">
				<BreadNav />
			</div>
			<div class="page-content flex-grow w-full">
				<slot />
			</div>
			<div class="page-footer">
				<BreadNav />
			</div>
		</div>
	</main>

	<footer class="border-t-2 border-prim">

	</footer>
</div>

<style>
	.layout {
		grid-template-rows: auto 1fr auto;
	}

	.page-content {
		flex: 1 1 0;
	}
</style>
