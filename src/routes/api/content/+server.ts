import { json } from '@sveltejs/kit';
import { Post, type Category } from '$lib/types';

function getMarkdown() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/content/**/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];

		if (file && typeof file === 'object' && 'metadata' in file) {
			let meta = file.metadata as Post;

			if (meta && !meta.slug) meta.slug = path.split('/').at(-1)?.replace('.md', '')!;

			const post = { ...new Post(), ...meta, path };

			posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export function GET({ url }) {
	const md = getMarkdown();

	const all = url.searchParams.has('all')

	if (all)
		return json(md);

	const slug = url.searchParams.get('slug')

	if (slug)
		return json(md.filter( x => x.slug === slug));

	const category = url.searchParams.get('category') as Category

	if (category)
		return json(md.filter( x => x.category === category));

	return json([]);
}
