<script lang="ts">
	import ExRating from '$lib/components/ExRating.svelte';
import { Rating, Thumbup } from 'flowbite-svelte';

	let headerLabel = {
		// desc1: '8.7',
		// desc2: 'Alle Altersklassen',
		// desc3: 'Alle Altersklassen',
		// link: {
		// 	label: 'Read all reviews',
		// 	url: '/'
		// }
	};
</script>

<ExRating
	{headerLabel}
	ratings={[
		{ label: 'Schuss', rating: 2 },
		{ label: 'Laufen', rating: 8 },
		{ label: 'Technik', rating: 8 },
		{ label: 'Pass', rating: 5 },
	]}
	ratings2={[
		{ label: 'Angriff', rating: 8 },
		{ label: 'Verteidigung', rating: 7 },
		{ label: 'Goalie', rating: 8 },
		{ label: 'Team', rating: 8 },
	]}
>
	<!-- <span slot="rating">
		<Rating total={5} rating={3.8} icon={Thumbup} id="example-9">
			<p slot="text" class="text-sm font-medium text-gray-500 dark:text-gray-400 ms-2">
				3.8 out of 5
			</p>
		</Rating>
	</span>
	<p slot="globalText" class="mt-2 text-sm font-medium text-gray-500 dark:text-gray-400">
		1,745 global ratings
	</p> -->
</ExRating>
