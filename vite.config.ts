import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, normalizePath } from 'vite';

// import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'

export default defineConfig( {
	plugins:
	[
		sveltekit(),
		purgeCss(),
		// viteStaticCopy( {
		// 	targets:
		// 	[
		// 			{
		// 				src: normalizePath( path.resolve( __dirname ,
		// 					'./node_modules/floorball-saisonmanager/static/' ) ) ,
		// 				dest: 'SM' ,
		// 			} ,
		// 		]
		// 	} ) ,
	] ,
	// assetsInclude: [
	// 	"./node_modules/floorball-saisonmanager/static/**/*.json" ,
	// ],
} );