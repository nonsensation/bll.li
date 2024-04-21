<script lang="ts">
	import { noteStore } from '$lib/stores';
	import { getToastStore, type ModalSettings, getModalStore } from '@skeletonlabs/skeleton';

	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	import { Alert } from 'flowbite-svelte';
	import { AccordionItem, Accordion } from 'flowbite-svelte';

	export let data;

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	function deleteNote(noteId: string): void {
		const confirmDelete: ModalSettings = {
			type: 'confirm',
			title: 'Delete Note',
			body: 'Are you sure you want to delete this note?',
			response: (r: boolean) => {
				if (r) {
					noteStore.update((notes) => notes.filter((n) => n.id !== noteId));
					toastStore.trigger({
						message: 'Note deleted successfully',
						background: 'variant-filled-success'
					});
					return;
				}
				toastStore.trigger({
					message: 'Note not deleted',
					background: 'variant-ghost-error'
				});
			}
		};
		modalStore.trigger(confirmDelete);
	}
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="container h-full mx-auto gap-8 flex flex-col">
	<section>
		<ul class="posts grid gap-2">
			{#each data.posts as post}
				<li class="post">
					<a href="/wiki/{post.slug}" class="title">{post.title}</a>
					<p class="date">{formatDate(post.date)}</p>
					<p class="description">{post.description}</p>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style lang="postcss">
</style>
