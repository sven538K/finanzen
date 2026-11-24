# Finanzen 🐼 – Einrichtung

Web-App für zwei Personen: Ausgaben und Einnahmen in Sekunden eintragen, Fixkosten mit Abbuchungsterminen (auch vierteljährlich/jährlich), „Wie viel ist noch drin?“, Spar-Tipps und Kiko, der rote Panda.

**Wichtig:** Dieses Repo enthält nur den Code. Eure Daten liegen in einem **zweiten, privaten** Repo (`finanzen-daten`). Niemals Daten oder Token hier hochladen.

## 1. App-Repo (öffentlich, nur Code)
1. Auf github.com neues Repo **`finanzen`** anlegen (Public).
2. Alle Dateien aus diesem Ordner hochladen (*Add file → Upload files*).
3. *Settings → Pages → Branch: `main` / root → Save*.
4. Nach 1–2 Minuten läuft die App unter **https://sven538k.github.io/finanzen/**

## 2. Daten-Repo (privat)
1. Neues Repo **`finanzen-daten`** anlegen, **Private** ✔︎, mit README.
2. Optional: `startdaten.json` hochladen und in `data.json` umbenennen (Fixkosten und Schulden sind dann schon drin).

## 3. Token erstellen
GitHub → *Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token*
- Repository access: **Only select repositories → `finanzen-daten`**
- Permissions → Repository → **Contents: Read and write**
- Ablaufdatum: z. B. 1 Jahr (die App zeigt „Token ungültig“, wenn er abläuft)

## 4. Am iPhone
1. In Safari https://sven538k.github.io/finanzen/ öffnen → ⚙︎ → Benutzer `sven538K`, Repo `finanzen-daten`, Token einfügen → **Verbinden & testen**.
2. Teilen → **Zum Home-Bildschirm** → das ist die App.
3. In Safari **https://sven538k.github.io/finanzen/neu.html** öffnen → Teilen → Zum Home-Bildschirm → das ist der Schnell-Knopf **„Ausgabe +“**: antippen, Betrag, Kategorie, fertig.
4. In der App unter ⚙︎ → **Code kopieren** → per AirDrop/Nachricht an die zweite Person. Sie öffnet die App auf ihrem Handy → ⚙︎ → **Code einfügen** → wählt ihren Namen.

Hinweis: Auf dem iPhone haben Home-Bildschirm-Apps und Safari getrennten Speicher. Wenn etwas „nicht verbunden“ zeigt: dort einmal ⚙︎ → Code einfügen.

## 5. Optional: Widget über die Kurzbefehle-App
1. Kurzbefehle → neuer Kurzbefehl „Ausgabe“:
   - *Nach Eingabe fragen* → Typ **Zahl**, Frage „Wie viel?“
   - *Aus Liste auswählen* → Liste: Lebensmittel, Essen & Lieferdienst, Kind, Auto & Tanken, … (genau wie in der App geschrieben)
   - *URL öffnen* → `https://sven538k.github.io/finanzen/neu.html?betrag=[Eingabe]&kat=[Ausgewähltes Objekt]`
2. Home-Bildschirm lange drücken → **+** → Kurzbefehle-Widget → „Ausgabe“ wählen.
3. Antippen → Betrag → Kategorie → gespeichert. (Öffnet Safari kurz, Safari muss einmal verbunden sein – siehe Hinweis oben.)

Für Einnahmen: gleicher Kurzbefehl mit `&typ=ein` und z. B. `kat=Gehalt`.

## Wie gerechnet wird
Noch verfügbar = Einnahmen − monatliche Fixkosten − Rücklage für seltene Kosten (Jahresbetrag ÷ 12 usw.) − einmalige Kosten − Sparziel − Ausgaben bisher.
Geplantes Gehalt zählt, bis ihr die echte Gehalts-Einnahme bucht; dann zählt die echte.

## Sicherheit
- Der Token steckt im „Code“ fürs zweite Gerät → nur privat weitergeben.
- Jede Änderung ist ein Commit im privaten Repo = automatische Historie/Backup.
- Token weg/geklaut? Auf GitHub löschen, neuen erstellen, in beiden Apps neu eintragen.
