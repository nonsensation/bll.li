import { drizzle } from 'drizzle-orm/vercel-postgres'
import { createPool } from '@vercel/postgres'
import * as schema from './schema'
import { POSTGRES_URL } from '$env/static/private'

const client = createPool( { connectionString: POSTGRES_URL } )
export const db = drizzle( client, { schema, logger: true } )
