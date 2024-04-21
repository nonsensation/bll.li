<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

    const drawerStore = getDrawerStore();

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li><a href="/" on:click={drawerClose}>Start</a></li>
		<li><a href="/teams" on:click={drawerClose}>Teams</a></li>
		<li><a href="/wiki" on:click={drawerClose}>Wiki</a></li>
		<li><a href="/info" on:click={drawerClose}>Info</a></li>
	</ul>
</nav>