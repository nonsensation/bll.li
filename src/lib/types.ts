export type Category = 'post' | 'exercise' | 'tactic' | 'wiki' | 'abc'

export class Post {
	path: string = ''
	title: string = ''
	slug: string = ''
	description: string = ''
	date: string = ''
	tags: string[] = []
	published: boolean = false
	category: Category = 'post'
}


