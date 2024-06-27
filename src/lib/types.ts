export type Category = 'post' | 'exercise' | 'tactic' | 'wiki' | 'abc'
export type Layout = '' | 'exercise'

export class Post
{
	layout: Layout = '';
	path: string = '';
	title: string = '';
	slug: string = '';
	description?: string = '';
	date: string = '';
	tags: string[] = [];
	published: boolean = false;
	category: Category = 'post';
}

export class Scoreboard
{
	homeScore: number = 0;
	guestScore : number = 0;

	homeName: string = 'Team-Home';
	guestName: string = 'Team-Guest';

	time: Time = new Time();
	period: number = 1;

	// TODO:
	// - penalties
	// - gamestate (pause, live, start-stop)
}

export class Time {
	min: number = 0;
	sec: number = 0;
	ms: number = 0;
}
