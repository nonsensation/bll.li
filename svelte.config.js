// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex, escapeSvelte } from 'mdsvex'
// import { getHighlighter } from 'shiki'
// import remarkUnwrapImages from 'remark-unwrap-images'
// import remarkToc from 'remark-toc'
// import rehypeSlug from 'rehype-slug'
import path from 'path';


/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: [ '.md' ],
	layout: {
		exercise: './src/lib/mdsvex/layouts/exercise.svelte',
		_: './src/lib/mdsvex/layouts/default.svelte',
	},
	// highlight: {
	// 	highlighter: async ( code, lang, meta ) =>
	// 	{

	// 		lang = lang ? lang : 'javascript'
	// 		const langTag = 'language-' + ( lang ? lang : 'javascript' )

	// 		const highlighter = await getHighlighter( {
	// 			themes: [ 'github-light', 'github-dark' ],
	// 			langs: [ 'javascript', 'javascript', 'typescript' ]
	// 		} )

	// 		if( !meta )
	// 			meta = { __raw: meta }

	// 		await highlighter.loadLanguage( 'javascript', 'javascript', 'typescript' )

	// 		const html = escapeSvelte( highlighter.codeToHtml( code, {
	// 			lang,
	// 			theme: {
	// 				light: 'github-light',
	// 				dark: 'github-dark',
	// 			},
	// 			defaultColor: 'light',
	// 			meta
	// 		} ) )
	// 		const parsed = Prism.highlight( code, Prism.languages[ lang ] )

	// 		return `{@html \`${ html }\` }`
	// 		// return `<Components.pre class=${langTag}><code class=${langTag}>${html}</code></Components.pre>`;

	// 	}
	// },
	// remarkPlugins: [ remarkUnwrapImages, [ remarkToc, { tight: true } ] ],
	// rehypePlugins: [ rehypeSlug ]
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [ '.svelte', '.md' ],
	content: [ './src/**/*.{html,js,svelte,ts}', ],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [ vitePreprocess(), mdsvex( mdsvexOptions ) ],

	vitePlugin: {
		inspector: true,
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'./$SM': 'src/lib/static/floorball-saisonmanager-data/data' ,
		}
	},
	
}
export default config