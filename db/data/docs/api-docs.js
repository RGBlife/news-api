exports.apiInfo = {
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
      queries: ["None"],
      exampleResponse: {
        apiInfo: ["All the available API endpoints listed"],
      },
      requiredBodyFormat: {},
    },
    "GET /api/topics": {
      description: "serves an array of all topics",
      queries: [],
      exampleResponse: {
        topics: [{ slug: "football", description: "Footie!" }],
      },
      requiredBodyFormat: {},
    },
  };

