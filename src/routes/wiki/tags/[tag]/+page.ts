import type { Post } from '$lib/types'

export async function load({ fetch , params }) {

	const response = await fetch('/api/content?all')
	const posts: Post[] = await response.json()

	const allTags = posts.reduce((tags, post) => {
		post.tags.forEach(tag => {
			tags.add(decodeURI(tag));
		});
		return tags;
	}, new Set());

	const uniqueTags = Array.from(allTags);
	const tagPosts = posts.filter( p => p.tags.indexOf( params.tag ) !== -1 );

	return { tagPosts , uniqueTags }
}