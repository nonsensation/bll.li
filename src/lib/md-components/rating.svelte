<script lang="ts">
	export let ratings: { label: string; rating: number }[] = [];
	export let headerLabel: {
		desc1?: string;
		desc2?: string;
		desc3?: string;
		link?: { label: string; url: string };
	} = {};
	export let desc1Class: string =
		'bg-psf w-8 text-prim text-sm font-semibold inline-flex items-center p-1.5 rounded';
	export let desc2Class: string = 'ms-2 w-24 font-medium text-sf2';
	export let desc3spanClass: string = 'mx-2 w-1 h-1 bg-sf2 rounded-full';
	export let desc3pClass: string = 'text-sm  w-24 font-medium text-gray-500';
	export let linkClass: string =
		'ms-auto w-32 text-sm font-medium text-prim hover:underline';
	export let barColor: string = 'bg-prim h-2.5 rounded';
</script>

<div class="flex items-center mb-5">
	{#if headerLabel.desc1}
		<p class={desc1Class}>{headerLabel.desc1}</p>
	{/if}
	{#if headerLabel.desc2}
		<p class={desc2Class}>{headerLabel.desc2}</p>
	{/if}
	{#if headerLabel.desc3}
		<span class={desc3spanClass} />
		<p class={desc3pClass}>{headerLabel.desc3}</p>
	{/if}
	{#if headerLabel.link}
		<a href={headerLabel.link.url} class={linkClass}>{headerLabel.link.label}</a>
	{/if}
</div>

{#if $$slots.rating}
	<slot name="rating" />
{/if}

{#if $$slots.globalText}
	<slot name="globalText" />
{/if}

<div class="flex flex-wrap">
		{#each ratings as { label, rating }}
			<dl class="px-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
				<dt class="mt-4 text-sm font-medium text-txt2">{label}</dt>
				<dd class="w-full flex items-center my-0 ps-0">
					<div class="w-full rounded h-2.5 bg-sf2 me-2">
						<div class={barColor} style="width: {rating * 10}%" />
					</div>
					<span class="text-sm font-medium text-txt2">{rating}</span>
				</dd>
			</dl>
		{/each}

</div>
