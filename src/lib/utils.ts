type DateStyle = Intl.DateTimeFormatOptions[ 'dateStyle' ]

export function formatDate( date: string, dateStyle: DateStyle = 'medium', locales = 'en' )
{
	const formatter = new Intl.DateTimeFormat( locales, { dateStyle } )
	return formatter.format( new Date( date ) )
}

export function groupBy<T>( array: T[], key: string )
{
	const _groupBy = ( arr: T[], callback: any ) =>
	{
		return arr.reduce( ( acc = {}, ...args ) =>
		{
			const key = callback( ...args )
			acc[ key ] ??= []
			acc[ key ].push( args[ 0 ] )
			return acc
		}, {} )
	}

	const groups = _groupBy( array, ( item: T ) => item[ key ] )
	const groupedArray = Object.keys( groups ).map( groupKey => ( {
		key: groupKey,
		values: groups[ groupKey ],
	} ) )
	return groupedArray
}


export function groupByFn<T>( array: T[], keyFn: any )
{
	const _groupBy = ( arr: T[], callback: any ) =>
	{
		return arr.reduce( ( acc = {}, ...args ) =>
		{
			const key = callback( ...args )
			console.log("KEY: "+key);
			acc[ key ] ??= []
			acc[ key ].push( args[ 0 ] )
			return acc
		}, {} )
	}

	const groups = _groupBy( array, ( item: T ) => keyFn(item) )
	const groupedArray = Object.keys( groups ).map( groupKey => ( {
		key: groupKey,
		values: groups[ groupKey ],
	} ) )

	console.dir(groupedArray)
	return groupedArray
}
