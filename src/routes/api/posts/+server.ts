import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getMarkdown(category: 'posts' | 'tactic' | 'exersice' | 'rules') {
	let posts: Post[] = [];
	let paths;

	switch (category) {
		case 'posts':
			paths = import.meta.glob('/src/md/posts/**/*.md', { eager: true });
			break;

		case 'tactic':
			paths = import.meta.glob('/src/md/tactic/**/*.md', { eager: true });
			break;
		case 'exersice':
			paths = import.meta.glob('/src/md/exersice/**/*.md', { eager: true });
			break;
		case 'rules':
			paths = import.meta.glob('/src/md/rules/**/*.md', { eager: true });
			break;
	}

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug, path } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
	const posts = await getMarkdown('posts');
	console.dir(posts);
	return json(posts);
}
