<!-- <div class="games flex flex-col w-full items-center gap-4">
    {#each games.slice(0, 2) as game}
        <GameCard {game} {leagueId} {leagueName} />
    {/each}
</div> -->

<div class="gap4 grid grid-cols-3">

    <div class="grid grid-cols-2">
        <div class="">ID</div>
        <div class="">Strafen</div>
        {#each data.p as p}
            <div class="">{data.pn[p["playerId"]]} ({p["playerId"]})</div>
            <div class="">{p["count"]}</div>
        {/each}
    </div>
    <div class="grid grid-cols-2">
        <div class="">Name</div>
        <div class="">Tore</div>
        {#each data.g as g}
            <!-- <div class="">{g["firstName"]} {g["lastName"]}</div> -->
            <div class="">{data.pn[g["playerId"]]} ({g["playerId"]})</div>
            <div class="">{g["count"]}</div>
        {/each}
    </div>

    <div class="grid grid-cols-2">
        <div class="">ID</div>
        <div class="">Assists</div>
        {#each data.a as a}
            <div class="">{data.pn[a["assistId"]]} ({a["assistId"]})</div>
            <div class="">{a["count"]}</div>
        {/each}
    </div>
<!-- <div class="">
        {#await data.goals}
            Loading goals...
        {:then goals}
            goals: {goals.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.penalties}
            Loading penalties...
        {:then penalties}
            penalties: {penalties.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.referees}
            Loading referees...
        {:then referees}
            referees: {referees.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.leagues}
            Loading leagues...
        {:then leagues}
            leagues: {leagues.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.arenas}
            Loading arenas...
        {:then arenas}
            arenas: {arenas.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.teams}
            Loading teams...
        {:then teams}
            teams: {teams.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.gameOperations}
            Loading gameOperations...
        {:then gameOperations}
            gameOperations: {gameOperations.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.games}
            Loading games...
        {:then games}
            games: {games.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.seasons}
            Loading seasons...
        {:then seasons}
            seasons: {seasons.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.players}
            Loading players...
        {:then players}
            players: {players.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div>
    <div class="">
        {#await data.events}
            Loading events...
        {:then events}
            events: {events.length}
        {:catch error}
            <p>error loading dataDump: {error.message}</p>
        {/await}
    </div> -->
</div>

<script lang="ts">
    export let data;
</script>
