
export async function load( { data } )
{
    return {
        scorers: data.scorers ,
        totalScorers: await data.totalScorers ,
    }
}
