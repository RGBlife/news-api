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
      "Retrieves all comments associated to the article_id specified, descending by created_at",
    queries: [],
    exampleResponse: {
      topics: [
        {
          comment_id: 9,
          votes: 0,
          created_at: "2020-01-01T03:08:00.000Z",
          author: "icellusedkars",
          body: "Superficially charming",
          article_id: 1,
        },
      ],
    },
    requiredBodyFormat: {},
  },

  "GET /api/articles/:article_id": {
    description: "Serves an article specified by the article_id",
    queries: [],
    exampleResponse: {
      article: {
        comment_id: 1,
        votes: 100,
        created_at: "2020-11-03T09:12:00.000Z",
        author: "hey",
        body: "hello",
        article_id: 1,
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "2020-11-03T09:12:00.000Z",
        votes: 0,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        comment_count: 5,
      },
    },
    requiredBodyFormat: {},
  },
  "GET /api/articles": {
    description:
      "serves an array of articles sorted by created_at descending by default and includes sorting options, If the topic query is omitted, responds with all articles limited by limit query or 10 by default. Supports pagination through 'limit' and 'p' queries.",
    queries: ["sort_by", "order", "topic", "limit", "p"],
    exampleResponse: {
      articles: [
        {
          author: "icellusedkars",
          title: "Eight pug gifs that remind me of mitch",
          article_id: 3,
          topic: "mitch",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          comment_count: 2,
        },
        {
          author: "icellusedkars",
          title: "A",
          article_id: 6,
          topic: "mitch",
          created_at: "2020-10-18 02:00:00",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          comment_count: 1,
        },
      ],
      total_count: 50,
    },
    requiredBodyFormat: {},
  },
  "POST /api/articles": {
    description:
      "Inserts an article, article_img_url is optional and will default if omitted",
    queries: [],
    exampleResponse: {
      insertedArticle: {
        article_id: 14,
        title: "Testing",
        topic: "mitch",
        author: "butter_bridge",
        body: "Amazing!",
        votes: 0,
        article_img_url:
          "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
        comment_count: "0",
      },
    },
    requiredBodyFormat: {
      author: "string",
      title: "string",
      body: "string",
      topic: "string",
      article_img_url: "optional, string",
    },
  },

  "POST /api/articles/:article_id/comments": {
    description:
      "Inserts a new comment for the specified article and returns the inserted comment.",
    queries: [],
    exampleResponse: {
      insertedComment: {
        comment_id: 17,
        votes: 20,
        created_at: "2020-03-14 17:02:00",
        author: "icellusedkars",
        body: "The owls are not what they seem.",
        article_id: 9,
      },
    },
    requiredBodyFormat: {
      username: "string",
      body: "string",
    },
  },

  "GET /api/users": {
    description: "Returns a list of all users.",
    queries: [],
    exampleResponse: {
      users: [
        {
          username: "exampleUser1",
          name: "Example User1",
          avatar_url: "http://example.com/avatar1.jpg",
        },
        {
          username: "exampleUser2",
          name: "Example User2",
          avatar_url: "http://example.com/avatar2.jpg",
        },
      ],
    },
    requiredBodyFormat: {},
  },
  "DELETE /api/comments/:comment_id": {
    description:
      "Deletes the specified comment by comment_id and responds with a status of 204 and no content.",
    queries: [],
    exampleResponse: {
      status: 204,
    },
    requiredBodyFormat: {},
  },
  "PATCH /api/comments/:comment_id": {
    description:
      "Updates votes by increasing or decreasing the votes to the specified article and returns the updated article.",
    queries: [],
    exampleResponse: {
      updatedComment: {
        article_id: 1,
        author: "icellusedkars",
        body: "Superficially charming",
        votes: 100,
      },
    },
    requiredBodyFormat: {
      inc_votes: "integar",
    },
  },

  "PATCH /api/articles/:article_id": {
    description:
      "Updates votes by increasing or decreasing the votes to the specified article and returns the updated article.",
    queries: [],
    exampleResponse: {
      patchedArticle: {
        comment_id: 17,
        votes: 20,
        created_at: "2020-03-14 17:02:00",
        author: "icellusedkars",
        body: "The owls are not what they seem.",
        article_id: 9,
      },
    },
    requiredBodyFormat: {
      inc_votes: "integar",
    },
  },
  "GET /api/users/:username": {
    description: "Serves an username specified by the article_id",
    queries: [],
    exampleResponse: {
      user: {
        username: "rogersop",
        name: "paul",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
    },
    requiredBodyFormat: {},
  },
  "POST /api/topics": {
    description: "Adds a new topic to the database.",
    queries: [],
    exampleResponse: {
      topic: {
        slug: "new-topic",
        description: "A brief overview of the new topic.",
      },
    },
    requiredBodyFormat: {
      slug: "The unique identifier for the topic.",
      description: "A brief description of the topic.",
    },
    possibleErrors: [
      {
        status: 400,
        error: "Bad Request",
        message: "Topic 'slug' already exists or request body is invalid.",
      },
      {
        status: 500,
        error: "Internal Server Error",
        message: "Unexpected error occurred while adding the topic.",
      },
    ],
  },
};
