
import { json } from '@sveltejs/kit';
import { Post } from '$lib/types';
import type { publicDecrypt } from 'crypto'

export async function GET({ fetch }) {

    const response = await fetch('/api/content?all')
	const md: Post[] = await response.json()

    const allTags = md
        .filter( p => p.published === true )
        .reduce<Set<string>>((tags, post) => {
            post.tags
                .filter( tag => tag !== null )
                .forEach( tag => {
                    console.log(tag)
                    tags.add( decodeURI( tag ) );
                } );
            return tags;
        }, new Set());
    
    const uniqueTags = Array.from(allTags);

	return json(uniqueTags);
}
