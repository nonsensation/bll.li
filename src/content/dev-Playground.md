---
slug: Playground
title: Playground
description: Playground.
date: '2023-4-14'
category: post
published: false
tags:
	- lol
---

## Playground

```ts
function greet(name: string) {
	console.log(`Hey ${name}! 👋`)
}
```

### Custom Components

<script>
  import {Rating,Counter} from  '$lib/mdsvex/components'
</script>

#### Counter

Import:

```
<script>
  import Counter from './counter.svelte'
</script>
```

Usage:

```
<Counter />
```

Example:

<Counter />

<Rating
	ratings={[
		{ label: 'Schuss', rating: 2 },
		{ label: 'Laufen', rating: 8 },
		{ label: 'Technik', rating: 8 },
		{ label: 'Pass', rating: 5 },
		{ label: 'Angriff', rating: 8 },
		{ label: 'Verteidigung', rating: 7 },
		{ label: 'Goalie', rating: 8 },
		{ label: 'Team', rating: 8 },
	]}
/>



