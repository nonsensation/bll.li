---
slug: FFmpeg
title: Videos Konvertieren mit FFMPEG
description: "Videos in 4k mit 60 FPS aufgenommen gehen an die 100Gb. Diese kann man vorher auf etwa 2GB ohne nennenswerte Qualitätsverluste umwandeln. Das ganze geht mit FFMPEG."
date: '2023-05-04'
category: tactic
published: false
tags:
 - 'Video 🎥'
 - 'Computer 💻'
---

Videos in 4k Auflösung mit 60 Bilder pro Sekunde gehen bei ca 2 bis 2.5 Stunden Spieldauer und Aufnahmezeit an die 100GB.

Da das Unmengen an Daten sind, die übertragen, gespeichert, hochgeladen oder auch nur angesehen werden, sollte man diese vorher umwandeln.

Das geht bis auf ca. 2-3GB mit dem [Open Source Tool _FFmpeg_](https://ffmpeg.org/download.html).

Die folgenden Bash-Skripte (für Windows) wandeln dabei die Videodateien in MP4 Videos im x265 Container um, ohne sichtbare Qualitätsverluste und ohne Reduzierung der Framerate.

Zur Referenz: ein 2 Stunden Video, 100GB dauert mit 16 CPU-Cores ca. 4 Stunden.

## Vorbereitung

- [_FFmpeg_](https://ffmpeg.org/download.html) downloaden und _ffmpeg.exe_ in den Video-Ordner extrahieren
- die beiden nachfolgenden Skripte in eine Text-Datei einfügen und zu mit der Endung _*.cmd_ umbenennen


### Video-Datei(en) umwandeln

Dieses Skript erwartet, dass man einen Ordner mit einer oder mehreren Video-Dateien per Dran'n'Drop zieht.
Es wird dann die Konvertierung gestartet und eine neue Datei mit dem ursprünglichen Ordnernamen erzeugt.

Die Ordnerstruktur sollte in etwa so aussehen:
```
📁 Video/
 ├─ ffmpeg.exe
 ├─ Convert.cmd
 ├─ MyVideo.mp4 (wird erzeugt)
 └─📁 MyVideo/
    ├─ Vid-01.mp4
    └─ Vid-02.mp4
```

```bat
@echo off
setlocal enabledelayedexpansion

set "folderPath=%~1"
cd /d "%folderPath%"
echo. > files.txt

for /r %%G in (*) do (
    set "relativePath=%%G"
    set "relativePath=!relativePath:%cd%\=!"
    if not "!relativePath!"=="files.txt" (
        echo file !relativePath! >> files.txt
    )
)

for %%A in ("%folderPath%") do set "folderName=%%~nxA"
echo %folderName%.mp4

endlocal
```


