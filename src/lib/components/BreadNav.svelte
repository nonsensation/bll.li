<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	import { page } from '$app/stores';

	let crumbs: Array<{ label: string; href: string }> = [];

	$: {
		const tokens = $page.url.pathname.split('/').filter((t) => t !== '');

		let tokenPath = '';

		crumbs = tokens.map((t) => {
			tokenPath += '/' + t;
			t = t.charAt(0).toUpperCase() + t.slice(1);
			return { label: t, href: tokenPath };
		});

		crumbs.unshift({ label: 'Start', href: '/' });
	}
</script>

<Breadcrumb
	aria-label="Solid background breadcrumb example"
	class="px-4 py-2"
> 
	{#each crumbs as c, i}
		{#if i == crumbs.length - 1}
			<BreadcrumbItem home={i==0}>{c.label}</BreadcrumbItem>
		{:else}
			<BreadcrumbItem home={i==0} href={c.href}>{c.label}</BreadcrumbItem>
		{/if}
	{/each}

</Breadcrumb>
