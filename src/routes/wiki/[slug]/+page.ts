import type { Post } from '$lib/types'
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {
	try {
		const response = await fetch(`/api/content?slug=${params.slug}`)
		const posts: Post[] = await response.json()
		const post = posts[0]
		const content = await import(`./../../../content/${post.path}.md`);

		return {
			content: content.default,
			meta: content.metadata
		};
	} catch (e) {
		error(404, `Upps, die Seite '${params.slug}' ist leider nicht zu finden..`);
	}
}
