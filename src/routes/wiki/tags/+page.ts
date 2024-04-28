import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('/api/content?all')
	const posts: Post[] = await response.json()

	const allTags = posts.reduce((tags, post) => {
		post.tags.forEach(tag => {
			tags.add(decodeURI(tag));
		});
		return tags;
	}, new Set());

	const uniqueTags = Array.from(allTags);

	return { uniqueTags }
}