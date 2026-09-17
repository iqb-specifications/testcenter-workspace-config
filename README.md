[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

Testcenter configuration specs

**workspace-config** carries environment parameters to be used by testtakers and booklets.

Read more:

* [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
* [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)

For a human readable version of the spec [see here](https://iqb-specifications.github.io/testcenter-workspace-config). For validation purposes (get json schema directly) use this link:

```
    https://w3id.org/iqb/spec/testcenter-workspace-config/<major>.<minor>
```


# Datenstrukturen mit Beispielen

## Funktion der workspace-config

Das Testcenter ignoriert den Inhalt eines Workspaces bis zu dem Zeitpunkt der Anmeldung (Ausnahme `publicBooklets` s. u.). Ein Login-Versuch führt zum Lesen aller möglichen Logins aller Workspaces einer Testcenter-Instanz. Erst nach einem erfolgreichen Login ist der relevante Workspace bekannt und dessen Inhalte werden ausgewertet. Das bedeutet, dass sich Konfigurationen im Workspace stets auf einen **Login** beziehen. Es kann dann außerdem für einen Login noch zwischen verschiedenen **Booklets** differenziert werden.

Um die ggf. zahlreichen Testtaker- und Bookletdateien schlank zu halten und Redundanz zu vermeiden, sind alle Konfigurationen in einer zentralen Datei `workspace-config.json` (reservierter Name) gespeichert. Jede Konfiguration hat eine ID und wird darüber innerhalb der Testtaker- und Bookletdateien dem Login bzw. dem Booklet zugewiesen. Es können auch Default-Konfigurationen festgelegt werden, die dann implizit gelten.

Es handelt sich um folgende Bereiche für Konfigurationen, die nachfolgend beschrieben werden:

* Textersetzungen `textReplacementFiles`: Sämtliche Texte des User Interfaces sind in der Programmierung mit Key hinterlegt und werden zur Laufzeit dynamisch durch einen Text ausgetauscht. Auf Ebene der Installation sind vollständige Ersetzungslisten hinterlegt, und für einen Workspace können diese Ersetzungen überlagert werden. Die Ersetzung folgt dem [Standard i18n](https://www.w3.org/International/i18n-drafts/nav/learn), jedoch nur für die Sprachrichtung "Links-nach-Rechts". Die workspace-config kann jeweils für eine Sprache auf je eine Ersetzungsdatei verweisen, die im Workspace liegen muss.
* Booklet-Konfigurationen `bookletConfigs`: Für ein Booklet können zahlreiche Parameter die Ausführung steuern, z. B. Blättermodus und Details der Toolbar.
* Profile für die Testleitungskonsole `groupMonitorProfiles`: Wenn ein Login zu einer Testleitungskonsole führt, kann diese sehr detailliert parametrisiert werden. Dies ist wichtig, um dieses wichtige Steuerinstrument während der Testdurchführung genau auf die Anforderungen der konkreten Studie abzustimmen. Beispiele: angezeigte Spalten und aktive Zeilenfilter.
* Personenbezogene Einstellungen `loginDesigns`: Das Alter der Testperson spielt für die Gestaltung des User Interfaces eine große Rolle. Über die personenbezogenen Konfigurationen kann man Probleme bei der Bedienung verringern. Beispiele: Bilder für Illustrationen und Avatare, Symbole als Buttons statt klassische Tastatur bei Eingabe eines Codes.

Jede der oben genannten Konfigurationen folgt einem **Overlay-Prinzip**: Alle Parameter haben von Systemseite Voreinstellungen und überlagern sich. Eine Textersetzung beispielsweise kann in einem Booklet festgelegt werden, aber nach Verlassen des Booklets gelten wieder die personen- bzw. workspacebezogenen Ersetzungen. Durch dieses Prinzip können die Konfigurationen auch unvollständig sein, also nur sehr selektiv Texte bzw. Parameter überschreiben.

## Name und Beschreibung des Workspaces

Ein Name und optional eine Beschreibung unterstützen die UI. Dies ist vor allem für die Administrationsoberfläche hilfreich, kann aber bis hin zum Download der Ergebnisse nützlich sein. Hierzu sind die Properties `workspaceName` und `workspaceDescription` zu nutzen.

Die Items des Array für die beiden Properties bestehen aus einem Objekt mit den Parametern `lang` und `value`. Das bedeutet, dass Name und Beschreibung in verschiedenen Sprachen hinterlegt werden können.

## Textersetzungen

Hier handelt es sich ebenfalls um ein Array mit den Items `lang` und `value`. Für jede Sprache ist der Name einer Datei zu hinterlegen, die im Workspace zu finden ist.

Wenn eine derartige Datei auf der obersten Ebene der workspace-config in der Property `textReplacementFiles` deklariert wird, dann wird diese Ersetzungsliste zur neuen Basis aller auf unteren Ebenen deklarierten Textersetzungen. Nach dem Lesen der Datei werden sofort die sprachbezogenen Textersetzungen auf Systemebene überschrieben.

Wenn eine derartige Datei auf einer unteren Ebene als Teil einer Konfiguration aufgeführt ist, dann überlagert diese wiederum die bisherigen Ersetzungen, bis der Gültigkeitsbereich (Login, Booklet) verlassen wurde.

<details>
<summary>Minimalbeispiel</summary>

```json
{
  "workspaceName": [
    {
      "lang": "de",
      "value": "VERA 3 Deutschtest 2027"
    }
  ],
  "workspaceDescription": [
    {
      "lang": "de",
      "value": "Pilotierungstesthefte zum Review durch Fachdidaktik."
    }
  ],
  "textReplacementFiles": [
    {
      "lang": "de",
      "value": "de-global.json"
    },
    {
      "lang": "fr",
      "value": "fr-global.json"
    }
  ]
}
```
</details>


## Booklet-Konfiguration

Die Konfigurationen im Datenblock `bookletConfigs` werden Booklets zugewiesen und werden wirksam, sobald die Testperson ein Booklet durch Auswahl lädt und die erste Unit zur Bearbeitung angezeigt wird.

* `id`: Über diesen Schlüssel wird die Konfiguration innerhalb einer Booklet-Xml referenziert und damit wirksam.
* `useAsDefault`: Wenn dieser Schalter auf `true` gesetzt ist, dann wirken alle Einstellungen auf alle Booklets. In einem Booklets kann durchaus noch eine abweichende Konfiguration referenziert werden. Wenn dort aber Parameter nicht spezifiziert sind, dann gilt wieder die Default-Konfiguration.
* `textReplacementFiles`: Ein Booklet ist stets sprachspezifisch und wird dann die passende Textersetzungsdatei aus dieser Konfiguration laden.

### Parameter für `browser`

* `askForFullScreen`: Eine Seite in einem Browser darf nicht den Vollbildmodus erzwingen. Dies wäre ein Sicherheitsrisiko. Da dieser Modus aber sehr günstig ist, kann man mit diesem Parameter eine Anfrage an die Testperson auslösen.
* `preventNavigationByBrowser`: Mit diesem Schalter kann verhindert werden, dass die Testperson mit den Bordmitteln des Browsers durch den Test navigiert. Dies könnte auch aus Versehen passieren und könnte zu Verwirrung führen. Es ist die Navigation über Tasten, über Buttons im Kopfbereich des Browser und über die Eingabe einer Url unterdrückt.

### Parameter für `controller`

* `forcePresentationComplete`: Die Player sollten an das Testcenter einen Status senden, der die Vollständigkeit der Anzeige ausdrückt. Wenn dieser Schalter auf `true` steht, dann wird die Navigation zur nächsten Unit solange verhindert, bis die Anzeige vollständig ist.
* `forceResponsesComplete`: Die Player sollten an das Testcenter einen Status senden, der die Vollständigkeit der Antworten ausdrückt. Wenn dieser Schalter auf `true` steht, dann wird die Navigation zur nächsten Unit solange verhindert, bis die Antworten vollständig sind.
* `lazyLoading`: Der Ladeprozess eines Bookklets mit allen Units kann sehr lange dauern. Wenn dieser Schalter auf `true` steht (default), dann wird die Bearbeitung schon dann ermöglicht, wenn der erste Block geladen ist. Der Ladeprozess wird dann im Hintergrund fortgesetzt.
* `logPolicy`: Das Senden der Log-Einträge ist vor allem in der Erprobungsphase von Software-Modulen oder auch von Testheften zur Qualitätssicherung wichtig. Im produktiven Einsatz sollte das Logging auf ein Mindestmaß reduziert werden. Die möglichen Werte `DISABLED`, `LEAN`, `RICH` und `DEBUG` stufen recht willkürlich die Log-Menge ab.
* `lockBookletOnTermination`: Einer Testperson kann ein Schalter "Test beenden" angeboten werden. Wenn dieser Schalter auf `true` steht, dann wird mit diesem Schritt nicht nur zu einer anderen Seite navigiert, sondern das Booklet wird gesperrt. Eine Bearbeitung ist dann nicht mehr möglich.
* `silentMode`: Für sehr junge Testpersonen könnten Meldungen des Testcenters über den Teststatus ablenkend sein. Wenn dieser Schalter auf `true` steht, werden Meldungen aller Art unterdrückt.
* `bufferTimeSpan`: In drei separaten Parametern `unitResponses`, `unitState` und `testState` kann man über einen Wert (integer Millisekunden) die Zeit angeben, die vom Anfallen der jeweiigen Information bis zur Speicherung vergehen soll. Je höher der Wert, desto weniger Netzverkehr gibt es, aber es steigt auch das Risiko verlorener Daten.
* `timeLeftWarnings`: In diesem Parameter legt man fest, zu welchen Zeitpunkten eine Warnung an die Testperson gegeben wird, sollte der Ablauf einer Bearbeitungszeit bevorstehen (zeitbegrenzter Block). Es handelt sich jeweils um eine Sekundenangabe. Das Datenformat ist ein Array mit beliebig vielen Angaben. Wenn es leer ist, werden die Warnungen unterdrückt.

### Parameter für `userInterface`

* `header`: Legt fest, was im Kopfbereich der Testcenter-Seite gezeigt wird:
  * `EMPTY`: Leerer Kopfbereich
  * `OFF`: Kopfbereich wird komplett verborgen
  * `BOOKLET_LABEL` (default): Es wird das Label des Booklets gezeigt
  * `BLOCK_LABEL`: Es wird das Label des aktuellen Blockes gezeigt
  * `UNIT_LABEL`: Es wird das Label der aktuellen Unit gezeigt.
* `unitNavControl`: Zur Navigation zwischen Units kann ein Element eingeblendet werden mit Navigationspfeilen und dazwischen als Beschriftung entweder das Short-Label der Unit (`WITH_LABEL`) oder der Zählindex der Unit innerhalb des Booklets (`WITH_INDEX`). Der Wert `OFF` blendet das Element aus.
* `singleForwardButton`, `singleBackwardButton`: Regelt die Anzeige einzelner Navigationsbuttons:
  * `OFF` (default): Button ist nicht angezeigt.
  * `UNIT`: Es wird stets zur nächsten/vorherigen Unit navigiert, egal auf welcher Seite der Unit man sich befindet.
  * `PAGE`: Es wird stets zur nächsten/vorherigen Seite der Unit navigiert. Ist man auf der ersten bzw. letzten Seite, wird keine Aktion ausgelöst.
  * `AUTO`: Wie `PAGE`, aber beim Erreichen der ersten bzw. letzten Seite navigiert man zur nächsten/vorherigen Unit.

#### `unitPages`-Objekt für die Seiten einer Unit

* `pageNavControlContent`, `pageNavControlButtons`: Zur Navigation zwischen Seiten einer Unit kann ein Element eingeblendet werden. Dieses besteht maximal aus einem Mittelelement und Pfeilnavigationsbuttons rechts und links davon. `pageNavControlButtons` schaltet die Pfeilbuttons ein (default: `true`) oder aus, und `pageNavControlContent` kann folgende Werte annehmen:
  * `OFF`: Das Mittelelement fehlt.
  * `WITH_INDEX` (default): Das Mittelelement zeigt den Zählindex der Seite innerhalb der Unit.
  * `WITH_LABEL`: Das Mittelelement zeigt das Label der Seite.
  * `AS_LIST`: Das Mittelelement zeigt für jede Seite der Unit einen Zählindex und hebt optisch die aktuell gewählte Seite hervor. Die Zahlen sind nicht klickbar, können also nicht als Navigation benutzt werden.
* `pagingMode`: Dieser Wert wird an den Player der Unit geschickt und entsprechend interpretiert. Es geht hierbei um die Art und Weise, wie ein Seitenwechsel gestaltet ist. Die möglichen Werte sind [hier dokumentiert](https://verona-interfaces.github.io/player-docs/vopStartCommand.html#pagingmode).
* `restoreSelectedPageOnReturn`: Wenn `true`, dann wird bei einem Neuladen des Tests nicht nur zur zuletzt bearbeiteten Unit gesprungen, sondern es wird auch zur zuletzt gewählten Seite navigiert.

#### `toolBar`-Objekt für Buttons

Die folgenden Parameter regeln, ob ein bestimmtes Element als Teil der Toolbar angezeigt werden soll:

* `fullScreenButton`: Ein Schalter zum schnellen Wechsel in den Vollbildmodus des Browsers.
* `reloadButton`: Ein Schalter für das Neuladen der aktuellen Unit samt Player.
* `timeLeft`: Element zur Anzeige der Restzeit, die in einem zeitbeschränkten Block verbleibt.
* `unitList`: Ein Button, mit dem man die Liste aller Units eines Testheftes aufrufen kann.

## Profile für die Testleitungskonsole

Die Testleitungskonsole ist ein Portal, mit dem man für die Testpersonen einer Gruppe (Zeilen) den Fortschritt der Bearbeitung beobachten (Spalten sind Blöcke/Units) und teilweise steuern kann. In der Testtaker-Xml wird hierzu innerhalb einer Login-Gruppe ein Login angelegt mit dem Modus `MONITOR-GROUP`. Es handelt sich also um eine Login-Konfiguration für einen speziellen Modus und wird sofort nach erfolgreichem Login mit Navigation zur Testleitungskonsole wirksam.

Der Datenblock `groupMonitorProfiles` dient der Konfiguration der Testleitungskonsole.

* `id`: Über diesen Schlüssel wird die Konfiguration innerhalb einer Testtaker-Xml referenziert und damit wirksam.
* `useAsDefault`: Wenn dieser Schalter auf `true` gesetzt ist, dann wirken alle Einstellungen auf alle Logins mit dem Modus 'Testleitungskonsole'. In einem solchen Login kann durchaus noch ein abweichendes Profil referenziert werden. Wenn dort aber Parameter nicht spezifiziert sind, dann gilt wieder die Default-Konfiguration.
* `textReplacementFiles`: Das Login erhält je nach erkannter oder gewählter Sprache passende Textersetzungen.
* `detailView`: Steuert in drei Abstufungen `MAX`, `MEDIUM` und `MIN` die Granularität der Informationen.
* `showBookletList`: Steuert die Anzeige eines Elementes zum Aufruf von Booklets, die in der aktuellen Gruppe verwendet werden.
  * `OFF` (default): Keine Möglichkeit, zu Booklets zu springen.
  * `BUTTONS_LIST`: Alle möglichen Booklets werden als Buttons untereinander angezeigt. Ein Klick auf einen Button löst eine Navigation zum Booklet aus.
  * `BUTTONS_LIST_COLLAPSED`: Wie `BUTTONS_LIST`, aber die Liste ist eingeklappt und damit nicht so ablenkend.
* `autoselectNextBlock`: Nach einer Blockoperation (Navigation) kann der nächste Block automatisch selektiert werden. Die nächste Operation bezieht sich dann auf diesen Block. Da es Fehlbedienungen geben kann (versehentlicher Doppelklick), kann man dieses Verhalten ausschalten (default).

### Parameter für `columns`

Die folgenden Parameter regeln im `columns`-Objekt als `true`/`false`-Schalter, ob eine bestimmte Information als Spalte in der Haupttabelle angezeigt werden soll:

* `block`: Anzeige des Blockes, der gerade bearbeitet wird.
* `unit`: Anzeige der Unit, die gerade bearbeitet wird.
* `group`: Gruppe der Testperson.
* `booklet`: Das bearbeitet Booklet.
* `bookletStates`: Das Booklet erzeugt während der Bearbeitung eigene Variablen-Werte unabhängig von den Units. Dies kann z. B. bei der adaptiven Testung nötig sein, um Verzweigungen zu steuern. Die Deklaration der Variablen erfolgt im Booklet, und hier wird einer Variablen auch ein Attribut gegeben, ob sie in der Testleitungskonsole angezeigt werden soll. Für eine Anzeige muss dann noch dieser Schalter `bookletState` auf `true` gesetzt sein.

### Parameter für `testFilters`

Filter sind Regeln für die Anzeige von Tests bzw. Testpersonen, die die Zeilen in der Testleitungskonsole bilden. Ergibt die Regelanwendung `true`, dann wird diese Zeile nicht angezeigt.

* `pending`: Betrifft Tests mit dem Status 'pending' (noch nicht gestartet).
* `locked`: Betrifft Tests mit dem Status 'locked' (gesperrt).

#### `conditionalFilters`-Objekt für flexible Filter

Die Liste der bedingten Filter wird für jede Zeile ausgewertet. Ergibt einer der definierten Ausdrücke `true`, wird der Test nicht angezeigt und die anderen Filterdefinitionen werden übersprungen. Jede Filterdefinition entält folgende Parameter:

* `sourceProperty`: Ein Wert aus einer festen Liste, der festlegt, woher der Wert kommen soll, der nachfolgend ausgewertet wird. Die möglichen Werte erschließen sich (*weitgehend*) selbst: `BOOKLET_LABEL`, `PERSON_LABEL`, `STATE`, `BLOCK_LABEL`, `GROUP_NAME`, `BOOKLET_ID`, `UNIT_ID`, `UNIT_LABEL`, `BLOCK_ID`, `TEST_STATE`, `MODE`, `BOOKLET_SPECIES`, `BOOKLET_STATES`.
* `method`: Operator zum Vergleich mit einem anderen Wert:
  * `EQUALS`, `EQUALS_REGEX`, `EQUALS_NOT`, `EQUALS_REGEX_NOT`: Die Gleichheit wird überprüft (und ggf. negiert). Es erfolgt ein genauer Vergleich, was durch einen [regulären Ausdruck](https://www.w3schools.com/js/js_regexp.asp) genau gesteuert werden kann. Bei einem regulären Ausdruck kommt die JavaScript-Funktion 'match()' zur Anwendung. Das Funktionsergebnis 'null' wird als `false` und alles andere als `true` interpretiert.
  * `CONTAINS`, `CONTAINS_NOT`: Eine einfache Formulierung dafür, ob der Quellwert einen bestimmten Wert *enthält* (bzw. nicht enthält). Hierbei wird genau verglichen, d. h. auch Groß- und Kleinschreibung ist wichtig. Wer hier gezielter steuern möchte, nehme einen regulären Ausdruck.
* `methodParameter`: Dies ist der Wert, mit dem verglichen werden soll.

## Design-Konfiguration für Test-Logins

Mit dem Datenblock `loginDesigns` werden Konfigurationen für die Durchführung von Tests definiert. Dies betrifft alle Modi eines Logins mit dem Präfix `RUN-`.

* `id`: Über diesen Schlüssel wird die Konfiguration innerhalb einer Login-Xml referenziert und damit wirksam.
* `useAsDefault`: Wenn dieser Schalter auf `true` gesetzt ist, dann wirken alle Einstellungen auf alle 'RUN'-Logins. In einem 'RUN'-Login kann durchaus noch eine abweichende Konfiguration referenziert werden. Wenn dort aber Parameter nicht spezifiziert sind, dann gilt wieder die Default-Konfiguration.
* `textReplacementFiles`:  Das Login erhält je nach erkannter oder gewählter Sprache passende Textersetzungen.
* `styling`: In einer Testcenter-Installation sind drei Varianten des Grunddesigns hinterlegt. Dies betrifft das grundsätzliche Layout, Farben, teilweise die Navigation usw. Hintergrund sind die unterschiedlichen Anforderungen für die Altersgruppen `PRIMARY` (Primarstufe), `SECONDARY` (Sekundarstufe I) und `ADULT` (Erwachsene). Mit der Angabe eines der drei Werte wird die Variante des Designs gewählt.
* `codeInputMode`, `codeInputFixLength`: Bei einem zweistufigen Anmeldeprozess erfolgt nach dem erfolgreichen Login die Eingabe eines personenspezifischen Codes. Da dies mitunter die Testpersonen durchführen, gibt es je nach Zielgruppe unterschiedliche Modi der Eingabe: normal über die Tastatur des Endgerätes (`TEXT_FIELD`) oder über verschiedene Varianten von Buttons (`KEYPAD_SYMBOLS`, `KEYPAD_SYMBOLS_ALT`, `KEYPAD_NUMBERS`). Außerdem kann man die Länge des Codes angeben. Auf diese Weise kann die UI besser Hinweise geben. Mindestwert für die fixe Anzahl Zeichen ist '3'. Wenn der Wert kleiner ist, gibt es keinen UI-Einfluss.

### Parameter für `images`

Das Array `images` enthält eine Liste von Bilddateien, die für das User Interface verwendet werden sollen. Sie ersetzen die Systemeinstellungen auf Ebene der Testcenter-Installation. Jedes Objekt in der Liste hat folgende Parameter:

* `targetSlot`: Das Layout enthält Platzhalter für Bilder, die über einen Key identifiziert werden. Mögliche Werte sind `APPLICATION_LOGO`, `CODE_INPUT_PROMPT`, `CODE_INPUT_COMPANION`, `LOGIN_FORM`, `STARTER_COMPANION`, `STARTER_CARD_DONE`, `LOADING_PROGRESS`, `CONFIRM_DIALOG`.
* `filename`: Name der Bilddatei, die in den Slot gesetzt werden soll. Diese muss im Workspace gespeichert sein.

## Öffentlich erreichbare Booklets

Mit dem Datenblock `publicBooklets` kann eine Liste von Logins übergeben werden, die zu frei zugänglichen Booklets führen. Die Logins werden ganz normal angelegt (ohne Kennwort), günstigerweise mit dem Modus `RUN-DEMO` oder `RUN-SIMULATION`. Eine Deklaration der Logins in der Workspace-Config gibt dem Testcenter die Möglichkeit, einen Sprung zu diesen Booklets auf der Startseite anzubieten. So sind Demo-Aufgaben oder offene System-Checks sofort erreichbar.

Jedes Objekt muss einen `name` und einen `loginName` enthalten. `name` und die optionale `description` können mehrsprachig hinterlegt werden und unterstützen die Sprung-Gestaltung durch das Testcenter.
