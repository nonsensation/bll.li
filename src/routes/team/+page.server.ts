import type { PageServerLoad } from "./$types"
import prisma from '$lib/prisma';

export async function load( ev: PageServerLoad )
{
    const posts = await prisma.post.count();

    return {
        posts,
    };
}