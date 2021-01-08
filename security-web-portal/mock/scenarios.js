// Read the following to find out more:
// Configuring scenarios: https://github.com/americanexpress/parrot/blob/master/SCENARIOS.md

module.exports = {
  "has one ship": [
    {
      request: "/ship_log",
      response: {
        body: [{ id: 0, name: "The Jolly Roger", captain: "Captain Hook" }],
      },
    },
  ],
  "has more ships": [
    {
      request: "/ship_log",
      response: {
        body: [
          { id: 0, name: "The Jolly Roger", captain: "Captain Hook" },
          { id: 1, name: "The Black Pearl", captain: "Jack Sparrow" },
          { id: 2, name: "Flying Dutchman", captain: "Davy Jones" },
          { id: 3, name: "The Wanderer", captain: "Captain Ron" },
        ],
      },
    },
  ],
  "has more ships with any mime type": [
    {
      request: "/ship_log",
      response: {
        contentType: "text/plain",
        body: [
          "# Ship Log",
          "* name: 'The Jolly Roger', captain: 'Captain Hook'",
          "* name: 'The Black Pearl', captain: 'Jack Sparrow'",
        ].join("\n"),
      },
    },
  ],
  "has a server error": [
    {
      request: "/ship_log",
      response: {
        status: 500,
      },
    },
  ],
};
