<script lang="ts">
    import type { Post } from "$lib/types";

	export let posts : Post[];
</script>

<div class="mx-auto gap-8 flex flex-col">
	<section>
		<ul class="posts grid gap-2">
			{#each posts as post}
				<li class="post rounded flex flex-grow border-sf2 border hover:border-prim">
					<a href="/wiki/{post.slug}" class="p-2 w-full h-full text-txt hover:no-underline hover:text-prim">
						<h2 class="font-bold">{post.title}</h2>
						<p>{post.description}</p>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	ul {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
	}
	a {
		
	}
</style>