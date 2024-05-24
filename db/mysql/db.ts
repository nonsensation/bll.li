//
// USE PLANETSCALE ONLY TO GET DRIZZLE TO GENERATE SQL,
// WITHOUT THE NEED FOR AN ACTIVE CONNECTION TO A DATABASE
//
import { drizzle } from 'drizzle-orm/planetscale-serverless'
import { Client } from '@planetscale/database'

export const db = drizzle( new Client( {} ) )
