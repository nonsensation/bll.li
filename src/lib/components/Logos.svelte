<script lang="ts">
	import { Carousel, Thumbnails, Button, Indicator } from 'flowbite-svelte';

	import { scale, fade } from 'svelte/transition';
	import { quintOut, elasticInOut, elasticOut, bounceIn, linear } from 'svelte/easing';

	const images = [
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/653ybfff9bjzvw1jys2wybxq4r2c?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2284-weissenfels.png%22%3B+filename*%3DUTF-8%27%2784-weissenfels.png&rsct=image%2Fpng&sr=b&sig=1oBglt%2F6rbwK3P09324uk%2BEixx3eFvAPNnlO%2BKlK%2FW4%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/4snmvw8cps27074lj9pio2eiiklh?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2216-dresdenigels.png%22%3B+filename*%3DUTF-8%27%2716-dresdenigels.png&rsct=image%2Fpng&sr=b&sig=Kgoko5lhcjGr2lh0g4QlF8CZJVooi2a3%2B%2Fdnq2tOAho%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/wgvx8g387no6ocic7r6guc5lha7q?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%22125-dhfkleipzig.png%22%3B+filename*%3DUTF-8%27%27125-dhfkleipzig.png&rsct=image%2Fpng&sr=b&sig=x%2BxNSxuOz08p7S8w2DvOCwobEprNRtUjgvDhvSeyJcE%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/hml1ruykot07zezbktpz5di2zfij?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2282-mfbcleipzig.png%22%3B+filename*%3DUTF-8%27%2782-mfbcleipzig.png&rsct=image%2Fpng&sr=b&sig=9NJHTtDtfv1Ma5hiEnaWwF1lWYT87ikJr6wZ2S%2BkBfY%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/653ybfff9bjzvw1jys2wybxq4r2c?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2284-weissenfels.png%22%3B+filename*%3DUTF-8%27%2784-weissenfels.png&rsct=image%2Fpng&sr=b&sig=1oBglt%2F6rbwK3P09324uk%2BEixx3eFvAPNnlO%2BKlK%2FW4%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/4snmvw8cps27074lj9pio2eiiklh?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2216-dresdenigels.png%22%3B+filename*%3DUTF-8%27%2716-dresdenigels.png&rsct=image%2Fpng&sr=b&sig=Kgoko5lhcjGr2lh0g4QlF8CZJVooi2a3%2B%2Fdnq2tOAho%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/wgvx8g387no6ocic7r6guc5lha7q?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%22125-dhfkleipzig.png%22%3B+filename*%3DUTF-8%27%27125-dhfkleipzig.png&rsct=image%2Fpng&sr=b&sig=x%2BxNSxuOz08p7S8w2DvOCwobEprNRtUjgvDhvSeyJcE%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/hml1ruykot07zezbktpz5di2zfij?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2282-mfbcleipzig.png%22%3B+filename*%3DUTF-8%27%2782-mfbcleipzig.png&rsct=image%2Fpng&sr=b&sig=9NJHTtDtfv1Ma5hiEnaWwF1lWYT87ikJr6wZ2S%2BkBfY%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/653ybfff9bjzvw1jys2wybxq4r2c?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2284-weissenfels.png%22%3B+filename*%3DUTF-8%27%2784-weissenfels.png&rsct=image%2Fpng&sr=b&sig=1oBglt%2F6rbwK3P09324uk%2BEixx3eFvAPNnlO%2BKlK%2FW4%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/4snmvw8cps27074lj9pio2eiiklh?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2216-dresdenigels.png%22%3B+filename*%3DUTF-8%27%2716-dresdenigels.png&rsct=image%2Fpng&sr=b&sig=Kgoko5lhcjGr2lh0g4QlF8CZJVooi2a3%2B%2Fdnq2tOAho%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/wgvx8g387no6ocic7r6guc5lha7q?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%22125-dhfkleipzig.png%22%3B+filename*%3DUTF-8%27%27125-dhfkleipzig.png&rsct=image%2Fpng&sr=b&sig=x%2BxNSxuOz08p7S8w2DvOCwobEprNRtUjgvDhvSeyJcE%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/hml1ruykot07zezbktpz5di2zfij?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2282-mfbcleipzig.png%22%3B+filename*%3DUTF-8%27%2782-mfbcleipzig.png&rsct=image%2Fpng&sr=b&sig=9NJHTtDtfv1Ma5hiEnaWwF1lWYT87ikJr6wZ2S%2BkBfY%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/653ybfff9bjzvw1jys2wybxq4r2c?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2284-weissenfels.png%22%3B+filename*%3DUTF-8%27%2784-weissenfels.png&rsct=image%2Fpng&sr=b&sig=1oBglt%2F6rbwK3P09324uk%2BEixx3eFvAPNnlO%2BKlK%2FW4%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/4snmvw8cps27074lj9pio2eiiklh?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2216-dresdenigels.png%22%3B+filename*%3DUTF-8%27%2716-dresdenigels.png&rsct=image%2Fpng&sr=b&sig=Kgoko5lhcjGr2lh0g4QlF8CZJVooi2a3%2B%2Fdnq2tOAho%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/wgvx8g387no6ocic7r6guc5lha7q?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%22125-dhfkleipzig.png%22%3B+filename*%3DUTF-8%27%27125-dhfkleipzig.png&rsct=image%2Fpng&sr=b&sig=x%2BxNSxuOz08p7S8w2DvOCwobEprNRtUjgvDhvSeyJcE%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/hml1ruykot07zezbktpz5di2zfij?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2282-mfbcleipzig.png%22%3B+filename*%3DUTF-8%27%2782-mfbcleipzig.png&rsct=image%2Fpng&sr=b&sig=9NJHTtDtfv1Ma5hiEnaWwF1lWYT87ikJr6wZ2S%2BkBfY%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/653ybfff9bjzvw1jys2wybxq4r2c?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2284-weissenfels.png%22%3B+filename*%3DUTF-8%27%2784-weissenfels.png&rsct=image%2Fpng&sr=b&sig=1oBglt%2F6rbwK3P09324uk%2BEixx3eFvAPNnlO%2BKlK%2FW4%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/4snmvw8cps27074lj9pio2eiiklh?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2216-dresdenigels.png%22%3B+filename*%3DUTF-8%27%2716-dresdenigels.png&rsct=image%2Fpng&sr=b&sig=Kgoko5lhcjGr2lh0g4QlF8CZJVooi2a3%2B%2Fdnq2tOAho%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/wgvx8g387no6ocic7r6guc5lha7q?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%22125-dhfkleipzig.png%22%3B+filename*%3DUTF-8%27%27125-dhfkleipzig.png&rsct=image%2Fpng&sr=b&sig=x%2BxNSxuOz08p7S8w2DvOCwobEprNRtUjgvDhvSeyJcE%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/hml1ruykot07zezbktpz5di2zfij?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2282-mfbcleipzig.png%22%3B+filename*%3DUTF-8%27%2782-mfbcleipzig.png&rsct=image%2Fpng&sr=b&sig=9NJHTtDtfv1Ma5hiEnaWwF1lWYT87ikJr6wZ2S%2BkBfY%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/b22k0w92dekivhp3smp3h533fmdl?sp=r&sv=2018-11-09&se=2024-04-20T12%3A54%3A18Z&rscd=inline%3B+filename%3D%2240-blacklionslandsberg.png%22%3B+filename*%3DUTF-8%27%2740-blacklionslandsberg.png&rsct=image%2Fpng&sr=b&sig=CSW8QBB8uWYuADYoaMvHFgy2e%2FP2i81iV1kY7yCCJCU%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/653ybfff9bjzvw1jys2wybxq4r2c?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2284-weissenfels.png%22%3B+filename*%3DUTF-8%27%2784-weissenfels.png&rsct=image%2Fpng&sr=b&sig=1oBglt%2F6rbwK3P09324uk%2BEixx3eFvAPNnlO%2BKlK%2FW4%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/4snmvw8cps27074lj9pio2eiiklh?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2216-dresdenigels.png%22%3B+filename*%3DUTF-8%27%2716-dresdenigels.png&rsct=image%2Fpng&sr=b&sig=Kgoko5lhcjGr2lh0g4QlF8CZJVooi2a3%2B%2Fdnq2tOAho%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/wgvx8g387no6ocic7r6guc5lha7q?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%22125-dhfkleipzig.png%22%3B+filename*%3DUTF-8%27%27125-dhfkleipzig.png&rsct=image%2Fpng&sr=b&sig=x%2BxNSxuOz08p7S8w2DvOCwobEprNRtUjgvDhvSeyJcE%3D',
			title: 'Black Lions Landsberg'
		},
		{
			alt: 'Black Lions Landsberg Logo',
			src: 'https://saisonmanagercdn.blob.core.windows.net/smlive/hml1ruykot07zezbktpz5di2zfij?sp=r&sv=2018-11-09&se=2024-04-20T14%3A46%3A57Z&rscd=inline%3B+filename%3D%2282-mfbcleipzig.png%22%3B+filename*%3DUTF-8%27%2782-mfbcleipzig.png&rsct=image%2Fpng&sr=b&sig=9NJHTtDtfv1Ma5hiEnaWwF1lWYT87ikJr6wZ2S%2BkBfY%3D',
			title: 'Black Lions Landsberg'
		}
	];

	let index = 3;
	let forward = true; // sync animation direction between Thumbnails and Carousel
	const animation = (x: any) => fade(x, { duration: 500, easing: linear });
</script>

<div class="w-full mx-auto py-6">
	<div class="max-w-lg">
		<Carousel
			{images}
			{forward}
			let:Indicators
			let:Controls
			bind:index
			duration={5000}
			transition={animation}
			imgClass="object-contain h-full w-fit rounded-sm"
			class="rounded-md m-auto min-h-[320px] "
		>
			<Controls />
			<Indicators />
		</Carousel>
	</div>
</div>