import type { PageServerLoad } from "./$types"
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from '$drizzle/schema';
import { db } from '$drizzle/db';



export async function load( ev: PageServerLoad )
{
    return {
        posts: await db.query.Post.findMany() ,
    };
}