import type { Post } from '$lib/types'

export async function load({ fetch , params }) {
	const response = await fetch('/api/posts')
	const allPosts: Post[] = await response.json()

	const posts = allPosts.filter( p => p.categories.indexOf( params.category ) !== -1 );

	console.dir( allPosts );
	console.dir( posts );
	console.dir( params );

	return { posts }
}