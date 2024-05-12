<h3>Verwendung von Youtube-Videos</h3>

<p>
    Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt
    ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
</p>
<p>
    Wir nutzen die YouTube Funktion No-Cookies, d.h. wir haben Erweiterten Datenschutz aktiviert, Videos werden nicht
    über youtube.com, sondern über youtube-nocookie.com aufgerufen.
</p>
<p>
    Diesen stellt YouTube selbst bereit und sichert damit zu, dass YouTube zunächst keine Cookies auf Ihrem Gerät
    speichert. Beim Aufruf der betreffenden Seiten werden allerdings die IP-Adresse sowie die in Ziffer 4 genannten
    weiteren Daten übertragen und so insbesondere mitgeteilt, welche unserer Internetseiten Sie besucht haben. Diese
    Information lässt sich jedoch nicht Ihnen zuordnen, wenn Sie bei dem Seitenaufruf bei YouTube oder einem anderen
    Google-Dienst dauerhaft angemeldet sind.
</p>
<p>
    Sobald Sie die Wiedergabe eines eingebundenen Videos durch Anklicken starten, speichert YouTube durch den
    erweiterten Datenschutzmodus auf Ihrem Gerät nur Cookies, die keine persönlich identifizierbaren Daten enthalten, es
    sei denn Sie sind aktuell bei einem Google-Dienst angemeldet. Diese Cookies lassen sich durch entsprechende
    Browsereinstellungen und -erweiterungen verhindern.
</p>
<p>Google/YouTube: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland</p>
<ul>
    <li>Datenschutzerklärung: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></li>
    <li>
        Opt-Out: <a href="https://adssettings.google.com/authenticated">https://adssettings.google.com/authenticated</a>
    </li>
    <li>
        Privacy Shield: <a href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active"
            >https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active</a
        >.
    </li>
</ul>

<h3>Cookies</h3>

<p>
    Diese Webseite nutzt die Youtube-Einbettungsfunktion zur Anzeige und Wiedergabe von Videos von Youtube. Wir
    verwenden den erweiterten Datenschutzmodus, der nach Anbieterangaben eine Speicherung von Nutzerinformationen erst
    bei Wiedergabe des Videos in Gang setzt. In dem Augenblick, wo die Wiedergabe des eingebetteten Videos gestartet
    wird, setzt der Youtube Cookies ein, um Informationen über das Nutzerverhalten zu sammeln.
</p>
<p>
    Hinweisen von Youtube zufolge dienen diese unter anderem dazu, Videostatistiken zu erfassen, die
    Nutzerfreundlichkeit zu verbessern und missbräuchliche Handlungsweisen zu unterbinden.
</p>
<p>
    Unabhängig von einer Wiedergabe der eingebetteten Videos wird bei jedem Aufruf dieser Webseite eine Verbindung zum
    Google-Netzwerk “DoubleClick” aufgenommen, was ohne unseren Einfluss weitere Datenverarbeitungsvorgänge auslösen
    kann.
</p>
<p>
    Weitere Informationen zum Datenschutz bei YouTube finden Sie in der Datenschutzerklärung des Anbieters unter: <a
        href="https://www.google.de/intl/de/policies/privacy/">https://www.google.de/intl/de/policies/privacy/</a
    >
</p>

<!-- {#await data.groupedLeagues}
    <div class="kk">LADE LEAGUES</div>
{:then groups}
    <div class="flex flex-col gap-2">
        {#each Object.keys(groups) as group}
            <div class="border rounded px-2 bg-prim">{group}</div>
            {#each groups[group] as league}
                {#if league.season === data.currentSeason}
                    <div class="border rounded px-2 text-prim">
                        {league.name} ({league.game_operation}) - {league.season} | {league.id}
                    </div>
                {:else}
                    <div class="border rounded px-2 text-xs text-prim2">
                        {league.name} ({league.game_operation}) - {league.season} | {league.id}
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
{:catch error}
    <div class="err">ERROR: {error}</div>
{/await} -->

<script lang="ts">
    // export let data;
</script>
