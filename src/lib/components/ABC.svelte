<style>
    :global(details) {
        cursor: pointer;
        overflow-x: auto;
    }
</style>

{#each uppercaseAlphabet as letter}
    <details id={letter} class="overflow-x-auto">
        <summary>{letter}</summary>
        {#each terms.filter((t) => t.startsWith(letter)) as term}
            <h4 class="" id={encodeURI(term)}>{term}</h4>
            <div class="overflow-x-auto">{term}</div>
        {/each}
    </details>
{/each}

<script lang="ts">
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
