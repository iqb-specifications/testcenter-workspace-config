[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

Testcenter configuration specs

**workspace-config** carries environment parameters to be used by testtakers and booklets.

Read more:

* [All specifications of IQB](https://iqb-specifications.github.io/) (German only)
* [Learn about TBA](https://iqb-berlin.github.io/tba-info/) (German only)


# Erläuterung der Spezifikation


Es darf nur eine Datei mit dieser Spezifikation in einem Workspace des Testcenters liegen. Diese hat den reservierten Namen `workspace-config.json`.

* `workspaceName`, `workspaceDescription`: Ein Name und optional eine Beschreibung unterstützen die UI (sprachdifferenziert). 


## Beispiele

<details>
<summary>Sprachdateien</summary>

```json
{
  "workspaceName": [
    {
      "lang": "de",
      "value": "Prozentrang"
    }
  ],
  "workspaceDescription": [
    {
      "lang": "de",
      "value": "Demo-Skala zur Ableitung eines Prozentranges."
    }
  ],
  "method": "MAP",
  "sources": [
    "base1.fcr"
  ],
  "mappings": [
    {
        "method": "MIN",
        "parameters": [
            "75"
        ],
        "newValue": {
            "value": 80
        }
    },
    {
        "method": "MIN",
        "parameters": [
            "50"
        ],
        "newValue": {
            "value": 70
        }
    },
    {
        "method": "MIN",
        "parameters": [
            "25"
        ],
        "newValue": {
            "value": 50
        }
    }
    ],
    "mappingElse": {
        "value": 0
    }
}
```
