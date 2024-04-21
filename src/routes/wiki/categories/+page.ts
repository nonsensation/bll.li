import type { Post } from '$lib/types'

export async function load({ fetch }) {
	const response = await fetch('/api/posts')
	const posts: Post[] = await response.json()

	const allCategories = posts.reduce((categories, post) => {
		post.categories.forEach(category => {
			categories.add(category);
		});
		return categories;
	}, new Set());

	const uniqueCategories = Array.from(allCategories);

	return { uniqueCategories }
}