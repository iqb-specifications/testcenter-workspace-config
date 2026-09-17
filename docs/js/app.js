
    const schema = {
  "asyncapi": "3.0.0",
  "id": "urn:iqb-specifications:testcenter-workspace-config",
  "defaultContentType": "application/json",
  "info": {
    "title": "testcenter-workspace-config",
    "description": "Specification for assessment content package: Testcenter Workspace Config.",
    "license": {
      "name": "CC0 1.0",
      "url": "https://creativecommons.org/publicdomain/zero/1.0/"
    },
    "version": " - click on schema id to expand",
    "contact": {
      "name": "Home of iqb-specifications (German only)",
      "url": "https://iqb-specifications.github.io/"
    }
  },
  "channels": {
    "iqb_data_structures": {
      "address": "iqb_data_structures",
      "messages": {
        "select_schema": {
          "payload": {
            "$id": "testcenter-workspace-config@0.2",
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Testcenter: Workspace-Config",
            "description": "Specification for central parameters of one Testcenter workspace.",
            "type": "object",
            "properties": {
              "workspaceName": {
                "description": "Language tagged name of the workspace",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "lang": {
                      "description": "ISO-language code",
                      "type": "string",
                      "minLength": 1,
                      "pattern": "^[a-z]{2}$",
                      "default": "de",
                      "x-parser-schema-id": "<anonymous-schema-3>"
                    },
                    "value": {
                      "type": "string",
                      "minLength": 1,
                      "x-parser-schema-id": "<anonymous-schema-4>"
                    }
                  },
                  "required": [
                    "lang",
                    "value"
                  ],
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-2>"
                },
                "minItems": 1,
                "x-parser-schema-id": "<anonymous-schema-1>"
              },
              "workspaceDescription": {
                "description": "Language tagged description of the workspace",
                "type": "array",
                "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                "minItems": 1,
                "x-parser-schema-id": "<anonymous-schema-5>"
              },
              "textReplacementFiles": {
                "description": "List of file names to be used for text replacement (format standard i18n). Booklets and logins can use additional text replacement files as overlay (replacement of specific text). If the file is not found for an requested language, the default text will be used instead.",
                "type": "array",
                "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                "x-parser-schema-id": "<anonymous-schema-6>"
              },
              "bookletConfigs": {
                "description": "List of configuration sets that can be used in that workspace by booklets. If incomplete, the default or system wide configuration will be overwritten only partly.",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "ID to be used in booklets.",
                      "type": "string",
                      "minLength": 1,
                      "x-parser-schema-id": "<anonymous-schema-9>"
                    },
                    "useAsDefault": {
                      "description": "Default for all booklets of the workspace. Any booklet could still reference a different configuration: the default bookletConfig will be effective as far a parameter is not set.",
                      "type": "boolean",
                      "default": false,
                      "x-parser-schema-id": "<anonymous-schema-10>"
                    },
                    "textReplacementFiles": {
                      "description": "List of files to be used for text replacement (format standard i18n). If the file is not found for an requested language, the default text will be used instead.",
                      "type": "array",
                      "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                      "x-parser-schema-id": "<anonymous-schema-11>"
                    },
                    "browser": {
                      "description": "Browser settings",
                      "type": "object",
                      "properties": {
                        "askForFullScreen": {
                          "description": "If true, Testtaker will be prompted to set the browser full screen.",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-13>"
                        },
                        "preventNavigationByBrowser": {
                          "description": "<browserBehaviour> If true, the standard navigation handling (buttons) of the browser will not work.",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-14>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-12>"
                    },
                    "controller": {
                      "description": "Test controller settings",
                      "type": "object",
                      "properties": {
                        "forcePresentationComplete": {
                          "description": "Precondition for leaving a unit: On presentation complete.",
                          "type": "string",
                          "enum": [
                            "ON",
                            "OFF",
                            "ALWAYS"
                          ],
                          "default": "OFF",
                          "x-parser-schema-id": "<anonymous-schema-16>"
                        },
                        "forceResponsesComplete": {
                          "description": "Precondition for leaving a unit: On responses complete.",
                          "type": "string",
                          "enum": [
                            "ON",
                            "OFF",
                            "ALWAYS"
                          ],
                          "default": "OFF",
                          "x-parser-schema-id": "<anonymous-schema-17>"
                        },
                        "lazyLoading": {
                          "description": "<loading_mode> If true, the first unit will be presented after loading the first block. If false, all content files must be loaded to start the booklet.",
                          "type": "boolean",
                          "default": true,
                          "x-parser-schema-id": "<anonymous-schema-18>"
                        },
                        "logPolicy": {
                          "description": "Limit logging to prevent unnecessary traffic.",
                          "type": "string",
                          "enum": [
                            "DISABLED",
                            "LEAN",
                            "RICH",
                            "DEBUG"
                          ],
                          "default": "RICH",
                          "x-parser-schema-id": "<anonymous-schema-19>"
                        },
                        "lockBookletOnTermination": {
                          "description": "If true, the booklet will be locked by termination request to prevent any changes.",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-20>"
                        },
                        "silentMode": {
                          "description": "If true, all messages for the testtaker will be supressed (no diversion).",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-21>"
                        },
                        "bufferTimeSpan": {
                          "description": "Time settings for the controller to wait before sending data to the backend (ms).",
                          "type": "object",
                          "properties": {
                            "unitResponses": {
                              "type": "integer",
                              "default": 5000,
                              "x-parser-schema-id": "<anonymous-schema-23>"
                            },
                            "unitState": {
                              "type": "integer",
                              "default": 6000,
                              "x-parser-schema-id": "<anonymous-schema-24>"
                            },
                            "testState": {
                              "type": "integer",
                              "default": 1000,
                              "x-parser-schema-id": "<anonymous-schema-25>"
                            }
                          },
                          "additionalProperties": false,
                          "x-parser-schema-id": "<anonymous-schema-22>"
                        },
                        "timeLeftWarnings": {
                          "description": "Minutes before block time is over the controller will send a warning message to testtaker.",
                          "type": "array",
                          "items": {
                            "type": "integer",
                            "x-parser-schema-id": "<anonymous-schema-27>"
                          },
                          "default": [
                            1,
                            5
                          ],
                          "x-parser-schema-id": "<anonymous-schema-26>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-15>"
                    },
                    "userInterface": {
                      "description": "Elements on screen: content and behavoir",
                      "type": "object",
                      "properties": {
                        "header": {
                          "description": "<header_hidden/header_content> Sets the content of the top header area.",
                          "type": "string",
                          "enum": [
                            "EMPTY",
                            "OFF",
                            "BOOKLET_LABEL",
                            "BLOCK_LABEL",
                            "UNIT_LABEL"
                          ],
                          "default": "UNIT_LABEL",
                          "x-parser-schema-id": "<anonymous-schema-29>"
                        },
                        "unitNavControl": {
                          "description": "Design of a control with two small navigation arrows and a title",
                          "type": "string",
                          "enum": [
                            "OFF",
                            "WITH_INDEX",
                            "WITH_LABEL"
                          ],
                          "default": "WITH_UNIT_INDEX",
                          "x-parser-schema-id": "<anonymous-schema-30>"
                        },
                        "singleForwardButton": {
                          "description": "Behavoir of the primary navigation button: Forward",
                          "type": "string",
                          "enum": [
                            "OFF",
                            "AUTO",
                            "UNIT",
                            "PAGE"
                          ],
                          "default": "OFF",
                          "x-parser-schema-id": "<anonymous-schema-31>"
                        },
                        "singleBackwardButton": {
                          "description": "Behavoir of the primary navigation button: Backward",
                          "type": "string",
                          "enum": [
                            "OFF",
                            "AUTO",
                            "UNIT",
                            "PAGE"
                          ],
                          "default": "OFF",
                          "x-parser-schema-id": "<anonymous-schema-32>"
                        },
                        "unitPages": {
                          "description": "Elements for the pages of an unit",
                          "type": "object",
                          "properties": {
                            "pageNavControlContent": {
                              "description": "Content/label of a page navigation control",
                              "type": "string",
                              "enum": [
                                "OFF",
                                "WITH_INDEX",
                                "WITH_LABEL",
                                "AS_LIST"
                              ],
                              "default": "WITH_INDEX",
                              "x-parser-schema-id": "<anonymous-schema-34>"
                            },
                            "pageNavControlButtons": {
                              "description": "If true, the page navigation control is set between arrow buttons for navigation.",
                              "type": "boolean",
                              "default": true,
                              "x-parser-schema-id": "<anonymous-schema-35>"
                            },
                            "pagingMode": {
                              "description": "The value will be sent to the player to set its paging behavoir.",
                              "type": "string",
                              "enum": [
                                "SEPARATE",
                                "CONCAT_SCROLL",
                                "CONCAT_SCROLL_SNAP",
                                "BUTTONS"
                              ],
                              "default": "SEPARATE",
                              "x-parser-schema-id": "<anonymous-schema-36>"
                            },
                            "restoreSelectedPageOnReturn": {
                              "description": "If true, the unit page selected before reload will be set as current.",
                              "type": "boolean",
                              "default": false,
                              "x-parser-schema-id": "<anonymous-schema-37>"
                            }
                          },
                          "additionalProperties": false,
                          "x-parser-schema-id": "<anonymous-schema-33>"
                        },
                        "toolBar": {
                          "description": "Elements on toolbar area",
                          "type": "object",
                          "properties": {
                            "fullScreenButton": {
                              "type": "boolean",
                              "default": false,
                              "x-parser-schema-id": "<anonymous-schema-39>"
                            },
                            "reloadButton": {
                              "type": "boolean",
                              "default": false,
                              "x-parser-schema-id": "<anonymous-schema-40>"
                            },
                            "timeLeft": {
                              "type": "boolean",
                              "default": false,
                              "x-parser-schema-id": "<anonymous-schema-41>"
                            },
                            "unitList": {
                              "type": "boolean",
                              "default": false,
                              "x-parser-schema-id": "<anonymous-schema-42>"
                            }
                          },
                          "additionalProperties": false,
                          "x-parser-schema-id": "<anonymous-schema-38>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-28>"
                    }
                  },
                  "required": [
                    "id"
                  ],
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-8>"
                },
                "x-parser-schema-id": "<anonymous-schema-7>"
              },
              "groupMonitorProfiles": {
                "description": "List of property sets that can be used in that workspace by group monitors. If incomplete, the default or system wide profile will be overwritten only partly.",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "ID to be used in logins.",
                      "type": "string",
                      "minLength": 1,
                      "x-parser-schema-id": "<anonymous-schema-45>"
                    },
                    "useAsDefault": {
                      "description": "If true, this profile will be applied to all group monitors without explicit profile reference.",
                      "type": "boolean",
                      "default": false,
                      "x-parser-schema-id": "<anonymous-schema-46>"
                    },
                    "textReplacementFiles": {
                      "description": "List of files to be used for text replacement (format standard i18n). If the file is not found for an requested language, the default text will be used instead.",
                      "type": "array",
                      "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                      "x-parser-schema-id": "<anonymous-schema-47>"
                    },
                    "detailView": {
                      "type": "string",
                      "description": "Number of details in view.",
                      "enum": [
                        "MAX",
                        "MEDIUM",
                        "MIN"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-48>"
                    },
                    "showBookletList": {
                      "description": "Offers the booklets of the group to have a look at the test content.",
                      "type": "string",
                      "enum": [
                        "OFF",
                        "BUTTONS_LIST",
                        "BUTTONS_LIST_COLLAPSED"
                      ],
                      "default": "OFF",
                      "x-parser-schema-id": "<anonymous-schema-49>"
                    },
                    "autoselectNextBlock": {
                      "description": "If true, the next block will be selected after a block operation. If false, the current block remains selected to prevent unintended operations.",
                      "type": "boolean",
                      "default": false,
                      "x-parser-schema-id": "<anonymous-schema-50>"
                    },
                    "columns": {
                      "description": "Show columns in main table",
                      "type": "object",
                      "properties": {
                        "block": {
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-52>"
                        },
                        "unit": {
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-53>"
                        },
                        "group": {
                          "type": "boolean",
                          "default": true,
                          "x-parser-schema-id": "<anonymous-schema-54>"
                        },
                        "booklet": {
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-55>"
                        },
                        "bookletStates": {
                          "description": "This setting shows/hides the column of states a booklet can define. A booklet state contains a parameter 'show in group monitor' to be selected.",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-56>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-51>"
                    },
                    "testFilters": {
                      "description": "These filters shorten the number of rows for better UX.",
                      "type": "object",
                      "properties": {
                        "pending": {
                          "description": "If true, pending tests will be hidden.",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-58>"
                        },
                        "locked": {
                          "description": "If true, locked tests will be hidden.",
                          "type": "boolean",
                          "default": false,
                          "x-parser-schema-id": "<anonymous-schema-59>"
                        },
                        "conditionalFilters": {
                          "description": "Rules operator is 'OR', so if one rule matches, the test will be hidden and the other rules are skipped.",
                          "type": "array",
                          "items": {
                            "description": "If rule expression result is 'true', the test will be hidden.",
                            "type": "object",
                            "properties": {
                              "sourceProperty": {
                                "type": "string",
                                "enum": [
                                  "BOOKLET_LABEL",
                                  "PERSON_LABEL",
                                  "STATE",
                                  "BLOCK_LABEL",
                                  "GROUP_NAME",
                                  "BOOKLET_ID",
                                  "UNIT_ID",
                                  "UNIT_LABEL",
                                  "BLOCK_ID",
                                  "TEST_STATE",
                                  "MODE",
                                  "BOOKLET_SPECIES",
                                  "BOOKLET_STATES"
                                ],
                                "x-parser-schema-id": "<anonymous-schema-62>"
                              },
                              "method": {
                                "type": "string",
                                "enum": [
                                  "EQUALS",
                                  "EQUALS_REGEX",
                                  "CONTAINS",
                                  "EQUALS_NOT",
                                  "EQUALS_REGEX_NOT",
                                  "CONTAINS_NOT"
                                ],
                                "x-parser-schema-id": "<anonymous-schema-63>"
                              },
                              "methodParameter": {
                                "type": "string",
                                "x-parser-schema-id": "<anonymous-schema-64>"
                              }
                            },
                            "additionalProperties": false,
                            "required": [
                              "sourceProperty",
                              "method",
                              "methodParameter"
                            ],
                            "x-parser-schema-id": "<anonymous-schema-61>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-60>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-57>"
                    }
                  },
                  "additionalProperties": false,
                  "required": [
                    "id"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-44>"
                },
                "x-parser-schema-id": "<anonymous-schema-43>"
              },
              "loginDesigns": {
                "description": "List of property sets to be applied to a testtaker after logging in. If incomplete, the default or system wide design will be overwritten only partly.",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "description": "ID to be used in logins.",
                      "type": "string",
                      "minLength": 1,
                      "x-parser-schema-id": "<anonymous-schema-67>"
                    },
                    "useAsDefault": {
                      "description": "Default for all 'RUN'-Logins of the workspace. Any 'RUN'-Login could still reference a different configuration: the default 'RUN'-Login will be effective as far a parameter is not set.",
                      "type": "boolean",
                      "default": false,
                      "x-parser-schema-id": "<anonymous-schema-68>"
                    },
                    "textReplacementFiles": {
                      "description": "List of file names to be used for text replacement (format standard i18n). If the file is not found for an requested language, the default text will be used instead.",
                      "type": "array",
                      "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                      "x-parser-schema-id": "<anonymous-schema-69>"
                    },
                    "styling": {
                      "description": "Every testcenter installation holds sets of design parameters (theming). With this property, you switch to one of these sets.",
                      "type": "string",
                      "enum": [
                        "PRIMARY",
                        "SECONDARY",
                        "ADULT"
                      ],
                      "default": "SECONDARY",
                      "x-parser-schema-id": "<anonymous-schema-70>"
                    },
                    "codeInputMode": {
                      "description": "Depending on the age of the testtaker, a special code input mode might be more suitable.",
                      "type": "string",
                      "enum": [
                        "TEXT_FIELD",
                        "KEYPAD_SYMBOLS",
                        "KEYPAD_SYMBOLS_ALT",
                        "KEYPAD_NUMBERS"
                      ],
                      "default": "TEXT_FIELD",
                      "x-parser-schema-id": "<anonymous-schema-71>"
                    },
                    "codeInputFixLength": {
                      "description": "If greater than 2 (minimum length is 3), the UI responses during code input in an appropriate way.",
                      "type": "integer",
                      "minimum": 0,
                      "default": 0,
                      "x-parser-schema-id": "<anonymous-schema-72>"
                    },
                    "images": {
                      "description": "These image files will replace default or system wide images.",
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "targetSlot": {
                            "description": "Page slot where the image is placed into.",
                            "type": "string",
                            "enum": [
                              "APPLICATION_LOGO",
                              "CODE_INPUT_PROMPT",
                              "CODE_INPUT_COMPANION",
                              "LOGIN_FORM",
                              "STARTER_COMPANION",
                              "STARTER_CARD_DONE",
                              "LOADING_PROGRESS",
                              "CONFIRM_DIALOG"
                            ],
                            "x-parser-schema-id": "<anonymous-schema-75>"
                          },
                          "filename": {
                            "description": "Name of the image file located in the workspace. If not found, the default image will be used instead.",
                            "type": "string",
                            "minLength": 1,
                            "x-parser-schema-id": "<anonymous-schema-76>"
                          }
                        },
                        "additionalProperties": false,
                        "required": [
                          "targetSlot",
                          "filename"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-74>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-73>"
                    }
                  },
                  "additionalProperties": false,
                  "required": [
                    "id"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-66>"
                },
                "x-parser-schema-id": "<anonymous-schema-65>"
              },
              "publicBooklets": {
                "description": "The logins in that list grant free access to one or more booklets. This can be used for demo items or system checks.",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {
                      "description": "Language tagged name of the login",
                      "type": "array",
                      "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                      "minItems": 1,
                      "x-parser-schema-id": "<anonymous-schema-79>"
                    },
                    "description": {
                      "description": "Language tagged description of the login",
                      "type": "array",
                      "items": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
                      "minItems": 1,
                      "x-parser-schema-id": "<anonymous-schema-80>"
                    },
                    "loginName": {
                      "description": "Login to be used. This login must be found in any testtaker file of the workspace.",
                      "type": "string",
                      "minLength": 3,
                      "x-parser-schema-id": "<anonymous-schema-81>"
                    }
                  },
                  "additionalProperties": false,
                  "required": [
                    "name",
                    "loginName"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-78>"
                },
                "x-parser-schema-id": "<anonymous-schema-77>"
              }
            },
            "required": [
              "workspaceName"
            ],
            "additionalProperties": false,
            "$defs": {
              "languageCode": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items.properties.lang",
              "languageTaggedString": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.workspaceName.items",
              "bookletConfig": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.bookletConfigs.items",
              "groupMonitorProfile": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.groupMonitorProfiles.items",
              "loginDesign": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload.properties.loginDesigns.items"
            },
            "x-parser-schema-id": "testcenter-workspace-config@0.2"
          },
          "x-parser-unique-object-id": "select_schema",
          "x-parser-message-name": "select_schema"
        }
      },
      "x-parser-unique-object-id": "iqb_data_structures"
    }
  },
  "components": {
    "schemas": {
      "testcenter-workspace-config": "$ref:$.channels.iqb_data_structures.messages.select_schema.payload"
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":false},"sidebar":{"showOperations":"byDefault"},"showOperations":false};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  