<script lang="ts">
    import Icon from "./Icon.svelte";

	export let btnClass: string =
		'hover:text-prim w-8';

	const toggleTheme = (ev: MouseEvent) => {
		const target = ev.target as HTMLElement;
		const isDark = target.ownerDocument.documentElement.classList.toggle('dark');
		if (target.ownerDocument === document)
			localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
	};
</script>

<svelte:head>
	<script>
		if ('color-theme' in localStorage) {
			localStorage.getItem('color-theme') === 'dark'
				? window.document.documentElement.classList.add('dark')
				: window.document.documentElement.classList.remove('dark');
		} else {
			if (window.matchMedia('(prefers-color-scheme: dark)').matches)
				window.document.documentElement.classList.add('dark');
		}
	</script>
</svelte:head>

<button
	on:click={toggleTheme}
	type="button"
	{...$$restProps}
	class=" {btnClass + ' ' + $$props.class}"
>
	<span class="hidden dark:block">
		<slot name="lightIcon">
			<Icon icon="LIGHTMODE"/>
		</slot>
	</span>
	<span class="block dark:hidden">
		<slot name="darkIcon">
			<Icon icon="DARKMODE"/>
		</slot>
	</span>
</button>
