import { join } from 'path'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin'
import { bllTheme } from './theme'

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'),
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
	],
	theme: {
		extend: {
			colors: {
			  // flowbite-svelte
			  primary: {
				50: '#ffdbe2',
				100: '#ffcfd8',
				200: '#ffc3cf',
				300: '#ff9eb2',
				400: '#ff5678',
				500: '#ff0d3e',
				600: '#e60c38',
				700: '#bf0a2f',
				800: '#990825',
				900: '#7d061e',
			  }
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
		forms,
		typography,
		skeleton({
			themes: {
				// preset: [
				// 	{
				// 		name: 'crimson',
				// 		enhancements: true,
				// 	},
				// ],
				custom: [
					bllTheme ,
				]
			},
		}),
	],
} satisfies Config;
