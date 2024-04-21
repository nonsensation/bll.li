<script lang="ts">
	import '../app.postcss';
	import {
		LightSwitch,
		autoModeWatcher,
		AppBar,
		AppShell,
		Avatar,
		Drawer,
		Modal,
		Toast,
		getDrawerStore
	} from '@skeletonlabs/skeleton';

	import Navigation from '$lib/components/Navigation.svelte';

	import { initializeStores } from '@skeletonlabs/skeleton';
	import Logos from '$lib/components/Logos.svelte';
	import BreadNav from '$lib/components/BreadNav.svelte';
	import { DarkMode } from 'flowbite-svelte';
	initializeStores();

	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open();
	}
</script>

<Toast position="tr" />
<Modal />
<Drawer>
	<Navigation />
</Drawer>

<svelte:head>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}
</svelte:head>

<AppShell
	slotHeader="border-b-2 border-primary-500 shadow"
	slotFooter="border-t border-primary-500 bg-surface-500/10 shadow"
	slotSidebarLeft="md:border-r-0 md:border-primary-500 bg-surface-500/10 w-0 md:w-52 shadow"
>
	<svelte:fragment slot="header">
		<div class="">
			<AppBar background="bg-surface-500/10" padding="px-4 py-2">
				<svelte:fragment slot="lead">
					<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<a href="/">
						<img
							class="h-10 w-auto px-10"
							src="https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D"
							alt=""
						/>
					</a>
					<strong class="text-xl uppercase">Black Lions Landsberg</strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<DarkMode />
				</svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<div class="border-b border-surface-100 dark:border-surface-800">
			<BreadNav></BreadNav>
		</div>
	</svelte:fragment>

	<div class="container p-10 mx-auto w-full">
		<slot />
	</div>

	<svelte:fragment slot="pageFooter">
		<BreadNav></BreadNav>
	</svelte:fragment>

	<svelte:fragment slot="footer">
		<BreadNav></BreadNav>
	</svelte:fragment>
</AppShell>

<style>
	.striped {
		--bg: url('$lib/assets/bg-stripes-45.png');

		background-image: var(--bg);
		background-size: 100% 100%;
	}
</style>
