const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "MindFlip API", // short title.
      description: "Trivia API specification", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "Maina, Stephen", // your name
        email: "m41na@yahoo.com", // your email
        url: "akilisha.org", // your website
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        "description": "development server"
      },
    ],
    tags: [{
      "name": "Index",
      "description": "The landing page and health check endpoints"
    },
    {
      "name": "Account",
      "description": "The Account managing endpoints"
    },
    {
      "name": "Trivia",
      "description": "The Trivia managing endpoints"
    }
    ],
    components: {
      schemas: {
        GameCategory: {
          type: "enumeration",
          properties: {
            general: {
              type: "string",
              description: "Questions that has no predefined category which it belongs to"
            },
            science: {
              type: "string",
              description: "Questions based on the different branches of science"
            },
            geography: {
              type: "string",
              description: "Questions based on the world geography"
            },
            history: {
              type: "string",
              description: "Questions based on historical topics"
            },
            music: {
              type: "string",
              description: "Questions based on music and the music industry"
            },
            television: {
              type: "string",
              description: "Questions based on television shows"
            },
            sports: {
              type: "string",
              description: "Questions based on sports and sporting events"
            },
            food: {
              type: "string",
              description: "Questions based on foods and the food industry"
            },
            travel: {
              type: "string",
              description: "Questions based on world travels and adventures"
            },
            politics: {
              type: "string",
              description: "Questions based on politics"
            },
            movies: {
              type: "string",
              description: "Questions based on movies"
            },
          },
        },
        GameProgression: {
          type: "enumeration",
          properties: {
            auto: {
              type: "string",
              description: "Game questions progress automatically via a timer"
            },
            manual: {
              type: "string",
              description: "Game questions progress automatically user interaction"
            },
          },
        },
        GameStatus: {
          type: "enumeration",
          properties: {
            Created: {
              type: "string",
              description: "The game has been newly created"
            },
            Accepting: {
              type: "string",
              description: "The game is about to start and partipants can join"
            },
            Playing: {
              type: "string",
              description: "The game is currently ongoing and tallying up the scores"
            },
            Completed: {
              type: "string",
              description: "The game has been completed and at this point, it can either be archived or put back in 'Created' status"
            },
            Archived: {
              type: "string",
              description: "The game results are in storage awaiting deletion at some point in the future"
            },
          },
        },
        PlayerType: {
          type: "enumeration",
          properties: {
            guest: {
              type: "string",
              description: "A player with the least amount of privileges - they can only play games, they have no play history and their score is discarded after each game"
            },
            registered: {
              type: "string",
              description: "A player who can create and manage games, and whose play history is kept for a predefined duration before they can be disposed"
            },
            business: {
              type: "string",
              description: "Similar to a registered player, except that they cannot play a game and so they have no play history - they represent a business entity"
            },
          },
        },
        AccountRole: {
          type: "enumeration",
          properties: {
            Basic: {
              type: "string",
              description: "An account the cannot create any resources, except their own account"
            },
            Organizer: {
              type: "string",
              description: "An account that can create and update resources"
            },
            Administrator: {
              type: "string",
              description: "An account that can create, update and delete resources"
            },
          },
        },
        Clock: {
          type: "object",
          description: "Describe the characteristics of how to manage time for an auto-progressing game",
          properties: {
            clock_id: {
              type: "string",
              description: "The user-provided id of the clock definition"
            },
            duration: {
              type: "integer",
              description: "The total amount of time the timer will run (ms)"
            },
            delay: {
              type: "integer",
              description: "The pause between when the timer starts and when the countdown begins (ms)"
            },
            period: {
              type: "integer",
              description: "The amount of time between each successive countdown tick (ms)"
            },
          },
          example: {
            clock_id: "the 3 seconds delay",
            duration: 12000,
            delay: 2000,
            period: 500,
          }
        },
        Playbook: {
          type: "object",
          description: "Describe a type of game and the strategy employed to play the game",
          required: ["title"],
          properties: {
            playbook_id: {
              type: "uuid",
              description: "The autogenerated id of the playbook item"
            },
            title: {
              type: "string",
              description: "The playbook title"
            },
            best_fit: {
              type: "string",
              description: "A description of the circumstances which the style of play is a best fit"
            },
            description: {
              type: "string",
              description: "a brief summary of the the strategy for playing the game"
            },
            date_created: {
              type: "date",
              description: "date when playbook was created"
            },
          },
          example: {
            playbook_id: "48c92f34-086f-11ee-bd58-0242ac110002",
            title: "choice_matcher",
            best_fit: "question having multiple choices only",
            description: "Each matcher is associated with exactly one choice only.",
          }
        },
        Player: {
          type: "object",
          description: "A player represents a user entity who is interacting with the system",
          required: ["screen_name", "email_address"],
          properties: {
            player_id: {
              type: "uuid",
              description: "The autogenerated id of a player record"
            },
            screen_name: {
              type: "string",
              description: "An alias name which a player is known by"
            },
            email_address: {
              type: "string",
              description: "A valid email address used for communication purposes"
            },
            verified_email: {
              type: "boolean",
              description: "indicates whether an email is verified or not"
            },
            verification_code: {
              type: "string",
              description: "a random string value used when validating a player's email"
            },
            player_type: {
              type: "string",
              description: "A categorization of the player which limits what they can do with the system"
            },
            phone_number: {
              type: "string",
              description: "A valid phone number used for verifying changes to the player account details"
            },
            verified_phone: {
              type: "boolean",
              description: "indicates whether a phone number is verified or not"
            },
            date_joined: {
              type: "date",
              description: "date when a player joined the network"
            },
            points: {
              type: "integer",
              description: "total points accumulated from a player's history of playing games"
            },
            city: {
              type: "string",
              description: "city where a player is from"
            },
            state: {
              type: "string",
              description: "state or province or regions of the country where the player is from"
            },
            country: {
              type: "string",
              description: "country where a player is from"
            },
          },
          example: {
            player_id: "713ae55c-0a1d-11ee-8ba2-0242ac110002",
            screen_name: "thirsty_whale",
            email_address: "mainas@outlook.com",
            verified_email: true,
            verification_code: "86d2de29-9ce4-491c-a4f8-c2d6575657db",
            player_type: "registered",
            phone_number: null,
            verified_phone: false,
            date_joined: "2023-06-13",
            points: 120000,
            city: "oklahoma city",
            state: "Oklahoma",
            country: "US"
          }
        },
        Account: {
          type: "object",
          description: "An account is accociated with non-guest players to allow additional access levels",
          required: ["username", "userpass"],
          properties: {
            account_id: {
              type: "uuid",
              description: "The autogenerated id of an account definition"
            },
            username: {
              type: "string",
              description: "A unique name for a player's account"
            },
            userpass: {
              type: "string",
              description: "A hashed string value which only the submitter knows the original value"
            },
            is_active: {
              type: "boolean",
              description: "Tells whether an account is still valid for use in the system"
            },
            account_role: {
              type: "enum",
              description: "Tells about the access level an account has with regards to the system"
            },
            player_fk: {
              type: "string",
              description: "Identified which player is associated with this account"
            },
          },
          example: {
            account_id: "48cf61e2-086f-11ee-bd58-0242ac110002",
            username: "thisrty_whale",
            userpass: "$2a$10$c0r/dq/tpb.m/zAiU8lfWuoXT9pnZqVXsjqhoujjgQmd9FGiZAWuC",
            is_active: true,
            account_role: "Basic",
            player_fk: "48cbb59c-086f-11ee-bd58-0242ac110002",
          }
        },
        Game: {
          type: "object",
          description: "A central feature in the system which is used to associate questions with in the Game engine",
          required: ["title", "organizer"],
          properties: {
            game_id: {
              type: "uuid",
              description: "The autogenerated id of an account definition"
            },
            title: {
              type: "string",
              description: "A short naem used to quickly identify the game"
            },
            description: {
              type: "string",
              description: "A market pitch for promoting the game and the goals it seeks to achieve"
            },
            organizer: {
              type: "boolean",
              description: "The account is of a registered player who is creating this game"
            },
            game_status: {
              type: "enum",
              description: "Tells the stage in a game lifecycle where the game currently is"
            },
          },
          example: {
            account_id: "48cf61e2-086f-11ee-bd58-0242ac110002",
            username: "thisrty_whale",
            userpass: "$2a$10$c0r/dq/tpb.m/zAiU8lfWuoXT9pnZqVXsjqhoujjgQmd9FGiZAWuC",
            is_active: true,
            account_role: "Basic",
            player_fk: "48cbb59c-086f-11ee-bd58-0242ac110002",
          }
        },
      },
      reponses: {
        NotFound: {
          description: "Entity not found"
        },
        IllegalInput: {
          description: "Missing inputs in request"
        }
      },
      securitySchemes: {
        api_key: {
          type: "apiKey",
          name: "api_key",
          in: "header"
        },
      },
    },
    paths: {
      "/": {
        get: {
          description: "The landing page",
          tags: ["Index"],
          responses: {
            200: {
              description: "Details of the newly created player",
              content: {
                "texh/html": {
                  schema: {
                    type: "string"
                  }
                }
              }
            }
          }
        },
      },
      "/health": {
        get: {
          description: "The health check endpoint",
          tags: ["Index"],
          responses: {
            200: {
              description: "Tells whether the server is up and running",
              content: {
                "text/plain": {
                  schema: {
                    type: "string",
                    example: "Server is up and running..."
                  }
                }
              }
            }
          }
        },
      },
      "/account/player": {
        post: {
          description: "Register a new player",
          tags: ["Account"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    "screen_name": "mainas",
                    "email_address": "mainas@gmail.com",
                    "player_type": "guest"
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Details of the newly created player",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Player"
                  }
                }
              }
            }
          }
        },
      },
      "/account/player/{screen_name}": {
        delete: {
          description: "Drop a guest player after the game is over",
          tags: ["Account"],
          parameters: [
            {
              in: "path",
              name: "screen_name",
              schema: {
                type: "string"
              },
              required: true,
              description: "screen name of guest player to drop"
            }
          ],
          responses: {
            200: {
              description: "A player id for the dropped guest player",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "player_id": "4da695ac-0a25-11ee-80f7-0242ac110002"
                    }
                  }
                }
              }
            },
            500: {
              description: "A server error interrupted the operation",
            }
          }
        }
      },
      "/account/verify": {
        get: {
          description: "Verify an email address - typically using a link sent to a player's mailbox",
          tags: ["Account"],
          responses: {
            200: {
              description: "Outcome of verification",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "email_address": "mainas@gmail.com",
                      "verified": true
                    }
                  }
                }
              }
            }
          }
        },
        delete: {
          description: "Regenerate a new verification coded and mark the player email as unverified",
          tags: ["Account"],
          responses: {
            200: {
              description: "Details of reseting verification",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "email_address": "mainas@gmail.com",
                      "verified_email": false,
                      "verification_code": "df7b2020-e306-4ccc-9e67-5b3697b2ef7d"
                    }
                  }
                }
              }
            }
          }
        },
      },
      "/account/register": {
        post: {
          description: "Create an account for an existing registered user",
          tags: ["Account"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    "username": "omolloc",
                    "email_address": "omolloc@gmail.com",
                    "password": "wachana"
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "A success message and the user account token for subsequent requests",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "message": "User successfully created",
                      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF5ZXJfaWQiOiI3MTNhZTU1Yy0wYTFkLTExZWUtOGJhMi0wMjQyYWMxMTAwMDIiLCJ1c2VybmFtZSI6Im9tb2xsb2MiLCJyb2xlIjoiQmFzaWMiLCJpYXQiOjE2ODY2ODU2NjcsImV4cCI6MTY4NjY5NjQ2N30.H98lW7YQX1buCDkXscs2Iaauu4KFRk08sdeoYfvjy5I"
                    }
                  }
                }
              }
            },
            500: {
              description: "A server error interrupted the operation",
            }
          }
        }
      },
      "/account/login": {
        post: {
          description: "Use login credentials to gain access into the system",
          tags: ["Account"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    "username": "omolloc",
                    "password": "cr4z1wQrd"
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "A success message for the login attempt",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "message": "User successfully logged in",
                      "user": true
                    }
                  }
                }
              }
            },
            500: {
              description: "A server error interrupted the operation",
            }
          }
        }
      },
      "/account/reset": {
        put: {
          description: "Reset an account password - happens when the user cannot recall their password",
          tags: ["Account"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    "username": "omolloc",
                    "password": "cr4z13RwQrd"
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "The account whose password was changed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "username": "omolloc",
                      "account_id": "2840e3c8-0a23-11ee-8225-0242ac110002"
                    }
                  }
                }
              }
            },
            500: {
              description: "A server error interrupted the operation",
            }
          }
        }
      },
      "/trivia/listing": {
        get: {
          description: "A list of game available for playing",
          tags: ["Trivia"],
          responses: {
            200: {
              description: "A listing of games with their associated organizer",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    example: [
                      {
                        "game_info": {
                          "game_id": "48d3d7c2-086f-11ee-bd58-0242ac110002",
                          "title": "friendly numbers",
                          "description": null,
                          "game_status": "Created"
                        },
                        "organizer": {
                          "player": "48cbb59c-086f-11ee-bd58-0242ac110002",
                          "account": "48cf61e2-086f-11ee-bd58-0242ac110002",
                          "email_address": "jimmy@email.com",
                          "screen_name": "thirsty whale",
                          "player_type": "registered",
                          "city": null,
                          "state": null,
                          "country": null
                        }
                      }
                    ]
                  }
                }
              }
            }
          }
        },
      },
      "/trivia/title/{title}/organizer/{organizer}": {
        get: {
          description: "The details of a particular game",
          tags: ["Trivia"],
          parameters: [
            {
              in: "path",
              name: "title",
              schema: {
                type: "string"
              },
              required: true,
              description: "the game title"
            },
            {
              in: "path",
              name: "organizer",
              schema: {
                type: "string"
              },
              required: true,
              description: "the game organizer's account id"
            }
          ],
          responses: {
            200: {
              description: "A listing of games with their associated organizer",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      "game_id": "48d3d7c2-086f-11ee-bd58-0242ac110002",
                      "description": null,
                      "game_status": "Created"
                    }
                  }
                }
              }
            }
          }
        },
      },
    }
  },
  apis: ["./routes/*.js"],
};

module.exports = function (app) {
  if (process.env?.NODE_ENV.trim() === 'development') {
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  }
}