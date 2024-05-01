import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const tagsResponse = await fetch('/api/tags')
	const postsResponse = await fetch('/api/content?all')
	const tags: string[] = await tagsResponse.json()
	const posts: Post[] = await postsResponse.json()
	
	return { tags , posts }
}