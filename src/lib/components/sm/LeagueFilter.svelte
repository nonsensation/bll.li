<style lang="postcss">
input {
    display: none;
}

label {
    @apply flex cursor-pointer items-center justify-center
     bg-sf3 px-2 py-1 text-sm font-bold text-txt2 border-b ;
}
label:has(input:checked) {
    @apply border-b border-prim shadow text-txt;
}

.filter > div {
    /* @apply bg-sf2; */
}
</style>

<div class="flex select-none flex-wrap justify-center gap-8 gap-y-2 text-sm filter *:flex *:gap-2">
    {#if getFemaleFn !== null}
        <div class="">
            <label>
                <input
                    type="checkbox"
                    bind:checked="{isFemale}"
                /><span>Damen</span></label
            >
            <label>
                <input
                    type="checkbox"
                    bind:checked="{isNotFemale}"
                /><span>Herren</span></label
            >
        </div>
    {/if}

    {#if getJuniorFn !== null}
        <div class="">
            <label>
                <input
                    type="checkbox"
                    bind:checked="{isJunior}"
                /><span>Jugend</span></label
            >
            <label>
                <input
                    type="checkbox"
                    bind:checked="{isNotJunior}"
                /><span>Erwachsen</span></label
            >
        </div>
    {/if}

    {#if getFieldSizeFn !== null}
        <div class="">
            <label>
                <input
                    type="checkbox"
                    bind:checked="{fieldSizeKF}"
                /><span>Kleinfeld</span></label
            >
            <label>
                <input
                    type="checkbox"
                    bind:checked="{fieldSizeGF}"
                /><span>Großfeld</span></label
            >
        </div>
    {/if}

    {#if getLeagueTypeFn !== null}
        <div class="">
            <label class="">
                <input
                    type="checkbox"
                    bind:checked="{leagueTypeLeague}"
                /><span>Liga</span>
            </label>
            <label class="">
                <input
                    type="checkbox"
                    bind:checked="{leagueTypeCup}"
                />
                <div class="flex flex-col items-center text-center">
                    <div class="">Pokal</div>
                    <div class="text-xs font-normal leading-none">
                        Relegation/Playoffs/Playdowns
                    </div>
                </div>
            </label>
            <label>
                <input
                    type="checkbox"
                    bind:checked="{leagueTypeChamp}"
                /><span>Meisterschaft</span></label
            >
        </div>
    {/if}
</div>

<script lang="ts">
import { Saisonmanager as SM } from 'floorball-saisonmanager';

const getJunior = league => {
    if ('IsJunior' in league) return league.IsJunior as boolean;
    if ('isJunior' in league) return league.isJunior as boolean;
    if ('name' in league)
        return ['U9', 'U1', 'Jugend', 'Junior'].some(word => league.name?.includes(word));
    return false;
};

const getFemale = league => {
    if ('IsFemale' in league) return league.IsFemale as boolean;
    if ('isFemale' in league) return league.isFemale as boolean;
    if ('female' in league) return (league.female as string) == '1';
    if ('name' in league)
        return ['Damen', 'innen', 'Frauen'].some(word => league.name?.includes(word));
    return false;
};

const getFieldSize = league => {
    if ('FieldSize' in league) return league.FieldSize as SM.FieldSize;
    if ('fieldSize' in league) return league.fieldSize as SM.FieldSize;
    if ('field_size' in league) return league.field_size as SM.FieldSize;
    return SM.FieldSize.GF;
};

const getLeagueType = league => {
    if ('LeagueType' in league) return league.LeagueType as SM.LeagueType;
    if ('leagueType' in league) return league.leagueType as SM.LeagueType;
    if ('league_type' in league) return league.league_type as SM.LeagueType;
    return SM.LeagueType.League;
};

export let getJuniorFn: ((League) => boolean) | null = getJunior;
export let getFemaleFn: ((league) => boolean) | null = getFemale;
export let getFieldSizeFn: ((league) => SM.FieldSize) | null = getFieldSize;
export let getLeagueTypeFn: ((league) => SM.LeagueType) | null = getLeagueType;
export let getLeagueFn: any = item => item;

export let filterEvent;

$: isFemale = true;
$: isNotFemale = true;
$: isJunior = true;
$: isNotJunior = true;
$: fieldSizeGF = true;
$: fieldSizeKF = true;
$: leagueTypeLeague = true;
$: leagueTypeCup = true;
$: leagueTypeChamp = true;

$: filterEvent = item => {
    const league = getLeagueFn(item);

    let result = true;

    if (getFemaleFn !== null) {
        const isFemaleLeague = getFemaleFn(league);
        // console.log("isFemaleLeague: "+isFemaleLeague)
        // console.log("league.female: "+league.female)
        const genderMatch =
            (isFemale && isNotFemale) ||
            (isFemale && isFemaleLeague) ||
            (isNotFemale && !isFemaleLeague);

        result = result && genderMatch;
    }
    if (getJuniorFn !== null) {
        const isJuniorLeague = getJuniorFn(league);
        const juniorMatch =
            (isJunior && isNotJunior) ||
            (isJunior && isJuniorLeague) ||
            (isNotJunior && !isJuniorLeague);

        result = result && juniorMatch;
    }
    if (getFieldSizeFn !== null) {
        const fieldSize = getFieldSizeFn(league);
        const fieldSizeMatch =
            (fieldSizeGF && fieldSizeKF) ||
            (fieldSizeGF && fieldSize === SM.FieldSize.GF) ||
            (fieldSizeKF && fieldSize === SM.FieldSize.KF);

        result = result && fieldSizeMatch;
    }

    if (getLeagueTypeFn !== null) {
        const leagueType = getLeagueTypeFn(league);
        const leagueTypeMatch =
            (leagueTypeLeague && leagueTypeCup && leagueTypeChamp) ||
            (leagueTypeLeague && leagueType === SM.LeagueType.League) ||
            (leagueTypeCup && leagueType === SM.LeagueType.Cup) ||
            (leagueTypeChamp && leagueType === SM.LeagueType.Champ);

        result = result && leagueTypeMatch;
    }

    return result;
};
</script>
