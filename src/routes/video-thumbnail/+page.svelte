<style lang="postcss">
    .selected {
        @apply text-prim;
    }

    img {
        @apply aspect-video border-none ;
        width: 100%;
        object-fit: contain;
    }

    .logo {
        /* @apply ; */
        width: 100%;
        object-fit: contain;
    }

    .team {
        @apply items-center flex flex-col gap-2 font-bold text-xl w-full;
    }
</style>

<div class="flex w-full flex-grow *:border *:rounded items-around justify-center *:px-2 *:py-1 py-2 gap-2">
    HOME:
    {#each teams as team, idx}
        <button class="box" on:click={() => (teamHomeIdx = idx)} class:selected={teamHomeIdx == idx}>
            <span>{team.fullName}</span>
        </button>
    {/each}
</div>

<div class="flex w-full flex-grow *:border *:rounded items-around justify-center *:px-2 *:py-1 py-2 gap-2">
    GUEST:
    {#each teams as team, idx}
        <button class="box" on:click={() => (teamGuestIdx = idx)} class:selected={teamGuestIdx == idx}>
            <span>{team.fullName}</span>
        </button>
    {/each}
</div>

<div class="aspect-video w-full border border-prim relative" bind:this={container}>
    {#if showImage}
        <img class=" absolute" bind:this={image} src="" alt="Preview" />
    {/if}

    <div class="shadow-xl relative z-10 left border-r-prim border-r-4 *:text-black flex flex-col justify-around flex-grow items-center h-full w-[33%] bg-white">
        <div class="home team">
            <img class="logo" src={teamHome.logoPath} alt="">
            <span>{teamHome.fullName}</span>
        </div>
        <div class="guest team">
            <img class="logo" src={teamGuest.logoPath} alt="">
            <span>{teamGuest.fullName}</span>
        </div>
    </div>
</div>

<label for="background">Hintergrund-Foto</label>
<input bind:this={input} on:change={onChange} type="file" id="background" name="background" accept="image/*" />

<script lang="ts">
    class Team {
        fullName: string = '';
        displayName: string = '';
        shortName: string = '';
        logoPath: string = '';
        colors: string[] = [];
    }

    let teamHomeIdx = 0;
    let teamGuestIdx = 1;

    let teamHome: Team;
    let teamGuest: Team;

    $: {
        teamHome = teams[teamHomeIdx];
        teamGuest = teams[teamGuestIdx];
    }

    let input : HTMLInputElement;
    let container;
    let image : HTMLImageElement;
    let showImage = false;

    function onChange() {
        if( !input.files)
            return;

        const file = input.files[0];

        if (file) {
            showImage = true;

            const reader = new FileReader();
            reader.addEventListener('load', function () {
                image.setAttribute('src', reader.result as string);
            });
            reader.readAsDataURL(file);

            return;
        }
        showImage = false;
    }

    const teams = [
        // {
        //     fullName: '',
        //     displayName: '',
        //     shortName: '',
        //     logoPath: '',
        //     colors: ['black', 'red'],
        // },
        {
            fullName: 'Black Lions Landsberg',
            displayName: 'Black Lions Landsberg',
            shortName: 'LION',
            logoPath: 'https://saisonmanager.de//api/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBMUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--cda7988ec5ddf306487c2509c75eb483068c6f0c/40-blacklionslandsberg.png',
            colors: ['black', 'red'],
        },
        {
            fullName: 'PSV 90 Dessau II',
            displayName: 'Black Wolves Dessau',
            shortName: 'DES',
            logoPath: 'https://saisonmanager.de//api/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBUZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--75dd78f85cde619ae9bee16845c09cb5411eeb2a/121-psvdessau.png',
            colors: ['black', 'white'],
        },
    ] as Team[];
</script>
