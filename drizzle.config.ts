
import { defineConfig } from 'drizzle-kit'

export default defineConfig( {
    // dialect: "postgresql",
    dialect: "postgresql",
    schema: './drizzle/schema.ts',
    out: "./drizzle/migrations",
    dbCredentials: {
        url: process.env.POSTGRES_URL!,
    },
    strict: true,
    verbose: false,
    // schemaFilter: [
    //     "fsm_d",
    //     "fsm_g",
    // ],
} )