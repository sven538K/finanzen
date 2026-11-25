# Finanz-App

Web-App (PWA) zum schnellen Tracken von Ausgaben/Einnahmen zu zweit, gehostet über **GitHub Pages** aus diesem Repo:
https://sven538k.github.io/finanzen/ – Schnell-Eintrag: https://sven538k.github.io/finanzen/neu.html

Der Nutzer ist kein Entwickler. Erkläre locker, per „du“, auf Deutsch. Für alles, was er selbst tun muss: Schritt-für-Schritt-Anleitung.

## WICHTIGSTE REGEL: Dieses Repo ist ÖFFENTLICH
- Niemals echte Namen, Beträge, Schulden, Fixkosten-Namen, Tokens oder Schlüssel in Code, Beispiele, Kommentare oder Commits schreiben.
- Platzhalter immer generisch („z. B. Anna, Ben“, „z. B. Kind“).
- Vor jedem Commit prüfen: `grep -rniIf .private-words --exclude=.private-words --exclude-dir=.git .` und `grep -rn "github_pat_" --exclude-dir=.git .` müssen leer sein. `.private-words` liegt nur lokal (in .gitignore) und enthält Namen/Begriffe, die nie öffentlich werden dürfen. Fehlt die Datei: den Nutzer bitten, sie anzulegen – nicht raten.
- Echte Daten liegen nur im **privaten** Repo `sven538K/finanzen-daten` (`data.json`), das die App über die GitHub-API liest/schreibt. Nicht anfassen ohne ausdrückliche Bitte.

## Aufbau
- `src/app.html` – EINZIGE Quelldatei (HTML + CSS + JS in einer Datei). Platzhalter `%%TITLE%%`, `%%MANIFEST%%`, `%%ICON%%`, `%%QUICK%%`.
- `python3 build.py` – erzeugt `index.html` (App) und `neu.html` (Schnell-Eintrag, `window.QUICK=true`) und erhöht die Cache-Version in `sw.js`. **Nach jeder Änderung an src/app.html ausführen.** index.html/neu.html nie direkt bearbeiten.
- `sw.js` – Service Worker: Network-first-Cache + Push-Benachrichtigungen.
- `manifest*.json`, `icon*.png`, `apple-touch-icon*.png` – App-Icons (Kiko, roter Anime-Panda, eigene Figur).
- `tools/benachrichtigungen.yml` – Referenzkopie der GitHub Action, die im PRIVATEN Repo unter `.github/workflows/` liegt und Web-Push verschickt (Secret `VAPID_PRIVATE`; Public Key steht in app.html als `VAPID_PUB`). Änderungen daran muss der Nutzer im privaten Repo einspielen.

## Datenmodell (data.json im privaten Repo)
`settings` (people, extraMembers, cats [icon,name,budget], savingsGoal, startMonth?), `recurring` (Fixkosten/feste Einnahmen: interval monthly|quarterly|halfyearly|yearly|biennial|once|custom+every, start, end, forWhom, kind in|out), `expenses`, `incomes` (source, forMonth), `debts`, `subs` (Push-Abos je Gerät, who, lang), `carries` (Monatsübertrag-Entscheidungen).
Sync: jedes Objekt hat `id` + `updatedAt`; Merge = neuester gewinnt; Löschen = `deleted:true`. Nicht auf andere Strategie umbauen ohne Rücksprache.

## Fachliche Regeln (so gewünscht)
- Gehalt nur über „+ → Einnahme → Gehalt“ (keine Schätzung). Gehalt ab dem 20. zählt standardmäßig für den Folgemonat. Kiko fragt ab dem letzten Werktag.
- Jährliche/vierteljährliche Kosten: Monatsanteil als „Rücklage“ abziehen, bei Fälligkeit nicht nochmal.
- Monatsübertrag: Minus automatisch abziehen; Plus → Kiko fragt (tilgen / Rücklage / mitnehmen).
- Keine Monate vor dem Startmonat anzeigen.
- Kiko (Maskottchen) reagiert auf „dumme Ausgaben“. Design bunt, locker, nicht wie Excel. Kein Zoom (Doppeltippen!).
- Zwei Sprachen: UI-Texte sind Deutsch im Code; Englisch über `I18N_EXACT` / `I18N_RULES` (DOM-Übersetzung per MutationObserver). **Neue sichtbare Texte immer auch dort ergänzen.**

## Release-Ablauf
1. `src/app.html` ändern → `python3 build.py`
2. Lokal testen: `python3 -m http.server 8000` → http://localhost:8000 (mobile Ansicht ~390px)
3. Personendaten-Check (siehe oben) → commit (deutsch, kurz) → push auf `main`
4. Dem Nutzer sagen: App auf dem iPhone ganz schließen und neu öffnen. Neu zum Home-Bildschirm hinzufügen nur nötig, wenn sich Icons ändern.
