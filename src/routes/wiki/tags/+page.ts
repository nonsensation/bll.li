import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('/api/posts')
	const posts: Post[] = await response.json()

	const allTags = posts.reduce((tags, post) => {
		post.categories.forEach(tag => {
			tags.add(tag);
		});
		return tags;
	}, new Set());

	const uniqueTags = Array.from(allTags);

	return { uniqueTags }
}