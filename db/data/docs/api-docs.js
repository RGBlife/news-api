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
  "GET /api/articles/:article_id/comments": {
    description:
      "Retrieves all comments associated to the article_id specified, ascending by created_at",
    queries: [],
    exampleResponse: {
      topics: [
        {
          comment_id: 1,
          votes: 100,
          created_at: "2020-11-03T09:12:00.000Z",
          author: "hey",
          body: "hello",
          article_id: 1,
        },
      ],
    },
    requiredBodyFormat: {},
  },
};
