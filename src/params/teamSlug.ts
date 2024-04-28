/** @type {import('@sveltejs/kit').ParamMatcher} */

import { getTeamBySlug } from '$lib/config/TeamInfo';

export function match(param) {
	const team = getTeamBySlug(param);

	if (!team) {
		return false;
	}

	return true;
}
