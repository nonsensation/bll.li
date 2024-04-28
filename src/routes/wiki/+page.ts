import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('/api/tags')
	const tags: string[] = await response.json()
	
	return { tags }
}