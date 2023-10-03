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
  "GET /api/articles/:article_id": {
    description: "serves an array of an article",
    queries: [],
    exampleResponse: {
      article: [
        {
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        },
      ],
    },
    requiredBodyFormat: {},
  },
  "GET /api/articles": {
    description:
      "serves an array of articles sorted by created_at descending and addition of comment count with body property removed",
    queries: [],
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
    },
    requiredBodyFormat: {},
  },

  "POST /api/articles/:article_id/comments": {
    description:
      "Inserts a new comment for the specified article and returns the inserted comment.",
    queries: [],
    exampleResponse: {
      comment: [
        {
          comment_id: 17,
          votes: 20,
          created_at: "2020-03-14 17:02:00",
          author: "icellusedkars",
          body: "The owls are not what they seem.",
          article_id: 9,
        },
      ],
    },
    requiredBodyFormat: {
      author: "string",
      body: "string",
    },
  },

};
