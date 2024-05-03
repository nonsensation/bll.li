import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const tagsResponse = await fetch('/api/tags')
	const postsResponse = await fetch('/api/content?all')
	const tags: string[] = await tagsResponse.json()
	const allPosts: Post[] = await postsResponse.json()
	const posts = allPosts
		.filter( p => p.category === 'tactic'
			       || p.category === 'exercise')

	const _ = posts.splice(10)
		
	return { tags , posts }
}