<script lang="ts">
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

{#if crumbs.length > 1}
	<div aria-label="Breadcrumbs" class="flex gap-2 items-center leading-5">
		{#each crumbs as c, i}
			{#if i == 0}
				<a href={c.href} class="flex gap-2">
					<!-- <img
						src="/icons/home.svg"
						alt=""
						class="text-black dark:text-white w-[1.25rem] h-full object-fill"
					/> -->
					<svg class="text-black dark:text-white">
						<use href="/icons/home.svg#img"></use>
					</svg>
				</a>
				<span class="">/</span>
			{:else if i == crumbs.length - 1}
				<span class="">{c.label}</span>
			{:else}
				<a href={c.href}>{c.label}</a>
				<span class="">/</span>
			{/if}
		{/each}
	</div>
{/if}
