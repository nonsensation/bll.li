<style lang="postcss">
.filter {
    @apply select-none;

    & label {
        @apply cursor-pointer rounded border bg-sf3 px-2 py-1 text-txt;

        &:has(input:checked) {
            @apply border-prim;
        }
        &:has(:not(input:checked)) {
            @apply border-sf2;
        }
        & input {
            display: none;
        }
    }
}
</style>

<div class=" flex flex-wrap justify-center gap-8 gap-y-2 text-sm filter *:flex *:gap-2">
    <div class="">
        <label
            ><input
                type="checkbox"
                bind:checked="{isFemale}"
            />Damen</label
        >
        <label
            ><input
                type="checkbox"
                bind:checked="{isNotFemale}"
            />Herren</label
        >
    </div>
    <div class="">
        <label
            ><input
                type="checkbox"
                bind:checked="{isJunior}"
            />Jugend</label
        >
        <label
            ><input
                type="checkbox"
                bind:checked="{isNotJunior}"
            />Erwachsen</label
        >
    </div>
    <div class="">
        <label
            ><input
                type="checkbox"
                bind:checked="{fieldSizeKF}"
            />Kleinfeld</label
        >
        <label
            ><input
                type="checkbox"
                bind:checked="{fieldSizeGF}"
            />Großfeld</label
        >
    </div>
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
    if ('female' in league) return league.female as boolean;
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

export let getJuniorFn: (League) => boolean = getJunior;
export let getFemaleFn: (league) => boolean = getFemale;
export let getFieldSizeFn: (league) => SM.FieldSize = getFieldSize;
export let getLeagueFn: any = item => item;

export let filterEvent;

$: isFemale = true;
$: isNotFemale = true;
$: isJunior = true;
$: isNotJunior = true;
$: fieldSizeGF = true;
$: fieldSizeKF = true;

$: filterEvent = item => {
    const league = getLeagueFn(item);
    const isFemaleLeague = getFemaleFn(league);
    const isJuniorLeague = getJuniorFn(league);
    const fieldSize = getFieldSizeFn(league);

    const genderMatch =
        (isFemale && isNotFemale) ||
        (isFemale && isFemaleLeague) ||
        (isNotFemale && !isFemaleLeague);
    const juniorMatch =
        (isJunior && isNotJunior) ||
        (isJunior && isJuniorLeague) ||
        (isNotJunior && !isJuniorLeague);
    const fieldSizeMatch =
        (fieldSizeGF && fieldSizeKF) ||
        (fieldSizeGF && fieldSize === SM.FieldSize.GF) ||
        (fieldSizeKF && fieldSize === SM.FieldSize.KF);

    return genderMatch && juniorMatch && fieldSizeMatch;
};
</script>
