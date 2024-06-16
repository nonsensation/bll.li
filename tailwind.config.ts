
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
	darkMode: 'selector',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
	],
	theme: {
		extend: {
			colors: {
			  // flowbite-svelte
			  prim: 'var(--color-primary,crimson)',
			  prim2: 'var(--color-secondary,teal)',
			  sf: 'var(--color-surface,white)',
			  sf2: 'var(--color-surface-secondary,#dddddd)',
			  sf3: 'var(--color-surface-secondary2,#dddddd)',
			  txt: 'var(--color-text,#dddddd)',
			  txtinv: 'var(--color-text-inverted,#dddddd)',
			  txt2: 'var(--color-text-secondary,#dddddd)',

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
			  },
			  surface: {
				light: '#ffffff',
				dark: '#000000',
			  },
			}
		},
	},
	plugins: [
		// require('flowbite/plugin'),
		forms,
		typography,
	],
} satisfies Config;
