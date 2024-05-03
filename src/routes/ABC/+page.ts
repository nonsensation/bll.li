import type { Post } from '$lib/types'
import { error } from '@sveltejs/kit';

export async function load({ fetch, params }) {

    let posts: Post[]

	try {
		const response = await fetch(`/api/content?category=abc`)

		posts = await response.json()

	} catch (e) {
		error(404, `Konnte nicht alle Begriffe laden! (${e})`);
	}

    let contents : any[] = []

    for (let idx = 0; idx < posts.length; idx++) {
        const post = posts[idx];

        try {
            const content = await import(`./../../content/${post.path}.md`)

            contents.push( content.default )
    
        } catch (e) {
            error(404, `Konnte Begriff '${post.slug}' nicht laden! (${e})`);
        }
    }

    return {
        contents,
        posts,
    };
}
