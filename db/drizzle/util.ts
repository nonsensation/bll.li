
import { pgEnum } from 'drizzle-orm/pg-core'
import { mysqlEnum } from 'drizzle-orm/mysql-core'

export function convertEnum( enumType: any ): [ string, ...string[] ]
{
    return Object.values( enumType )
        .map( ( value: any ) => `${ value }` ) as [ string, ...string[] ]
}

export function createPgEnum( name: string, enumType: any )
{
    return pgEnum( name, convertEnum( enumType ) )
}

export function createMysqlEnum( name: string, enumType: any )
{
    return mysqlEnum( name, convertEnum( enumType ) )
}

