export async function load( { data } )
{
    return {
        scorers: data.scorers,
        totalScorers: data.totalScorers,
    }
}
