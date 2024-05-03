<style>
</style>

<!-- min-w-0 see: https://stackoverflow.com/a/29559974/11341498 -->
<!-- <fieldset class="min-w-0 w-[50%]"> -->
    <!-- <legend>Begriffe</legend> -->

    {#each uppercaseAlphabet as letter}
        <!-- <details id={letter} open class=""> -->
            <!-- <summary>{letter}</summary> -->
            <!-- {#each terms.filter((t) => t.startsWith(letter)) as term} -->
            {#each data.posts.filter((t) => t.slug.startsWith(letter)) as term, idx}
                <h4 class="" id={encodeURI(term.slug)}>{term.slug}</h4>
                <p>{data.posts[idx].description}</p>
                <svelte:component this={data.contents[idx]} />
            {/each}
        <!-- </details> -->
    {/each}
<!-- </fieldset> -->

<script lang="ts">
    export let data;

    const lowercaseStart = 97;
    const uppercaseStart = 65;
    const lowercaseAlphabet = [...Array(26).keys()].map((n) => String.fromCharCode(lowercaseStart + n));
    const uppercaseAlphabet = [...Array(26).keys()].map((n) => String.fromCharCode(uppercaseStart + n));

    const terms = [
        'Abschluss',
        'Auswurf',
        'Abstand',
        'Assist / Vorlage',
        'Ausrüstung',
        'Auslöse',
        'Block',
        'Bully',
        'Ball',
        'Breit machen',
        'Bande',
        'Blockieren',
        'Back-Check',
        'Blatt',
        'Center',
        'Check',
        'Deckung',
        'Drehschuss',
        'Doppeln',
        'Soppelpass',
        'Direkt',
        'Einschießen',
        'Empty Net',
        'Foul',
        'Freischlag',
        'Flügel',
        'Fehler erzwingen',
        'Fore-Check',
        'Fuß / Fußpass',
        'Großfeld',
        'Goalie',
        'Halbhoher Pass',
        'Handgelenksschuss',
        'Hoher Stock',
        'Handspiel',
        'Halten',
        'Jonglieren',
        'Konter',
        'Kampfgericht',
        'Kleinfeld',
        'Langer Pfosten',
        'Linie / Reihe',
        'Lizens',
        'M-System',
        'Match-Strafe',
        'Penalty',
        'Penalty-Schießen',
        'Point',
        'Pfiff',
        'Pressing / Pressen',
        'Querpass',
        'Rückhand',
        'Rückpass',
        'Strafe',
        'Schlenzer / Schlenzschuss',
        'Schutzraum',
        'Spielberichtsbogen',
        'Slot',
        'Schlagschuss',
        'Schiebeschlagschuss',
        'Schiedsrichter',
        'Spielfeld',
        'Stechen',
        'Torwart',
        'Torraum',
        'Überzahl',
        'Unterzahl',
        'Übergeben',
        'Verteidigung',
        'Vorhand',
        'Vorlage',
        'Verlängerung',
        'Wechsel',
        'Zorro',
        'Zeitspiel',
        'Zeit',
        'Zuweisen',
    ];
</script>
