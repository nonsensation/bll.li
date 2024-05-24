export async function querySql( sqlQuery: string , fetch: any )
{
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: sqlQuery,
	}

	const response = await fetch( '/api/db', options )
	const data = await response.json()

	return data
}
