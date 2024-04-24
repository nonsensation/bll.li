import type { Post } from '$lib/types'

export async function load({ fetch , params }) {
	const response = await fetch('/api/posts')
	const allPosts: Post[] = await response.json()

	const posts = allPosts.filter( p => p.categories.indexOf( params.tag ) !== -1 );

	return { posts }
}