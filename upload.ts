
import * as schema from './drizzle/schema'
import { drizzle } from 'drizzle-orm/vercel-postgres'
import { createPool } from '@vercel/postgres'

const client = createPool( { connectionString: process.env.POSTGRES_URL } )
export const db = drizzle( client, { schema, logger: true } )

async function main()
{
    // const ids = await db
    //     .select( { id: schema.team.id } )
    //     .from( schema.team )

    console.log( "UPLOAD" )
    // console.dir( ids )
}

main()