export async function load( { data } )
{
    return {
        pageSize: data.pageSize,
        scorers: data.scorers,
        totalScorers: data.totalScorers,
    }
}
