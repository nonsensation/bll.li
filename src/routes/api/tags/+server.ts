
import { json } from '@sveltejs/kit';
import { Post } from '$lib/types';

export async function GET({ fetch }) {

    const response = await fetch('/api/content?all')
	const md: Post[] = await response.json()

    const allTags = md.reduce((tags, post) => {
        post.tags.forEach(tag => {
            tags.add(decodeURI(tag));
        });
        return tags;
    }, new Set());
    
    const uniqueTags = Array.from(allTags);

	return json(uniqueTags);
}
