export type Category = 'post' | 'exercise' | 'tactic' | 'wiki' | 'abc'
export type Layout = '' | 'exercise'

export class Post {
	layout: Layout = ''
	path: string = ''
	title: string = ''
	slug: string = ''
	description?: string = ''
	date: string = ''
	tags: string[] = []
	published: boolean = false
	category: Category = 'post'
}


