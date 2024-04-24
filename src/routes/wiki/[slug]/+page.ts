import { error } from '@sveltejs/kit'

export async function load({ params }) {
	try {
		const post = await import(`../../../md/posts/${params.slug}.md`)

		return {
			content: post.default,
			meta: post.metadata
		}
	} catch (e) {
		error(404, `Upps, die Seite '${params.slug}' ist leider nicht zu finden..`)
	}
}
