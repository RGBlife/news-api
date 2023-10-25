const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const apiInfo = require("../db/data/docs/api-docs");

beforeEach(() => {
  return seed(data);
});
afterAll(() => connection.end());

describe("GET /api/topics", () => {
  test("Should return a 200 status", async () => {
    const { status } = await request(app).get("/api/topics");
    expect(status).toBe(200);
  });
  test("Should return an array of topic objects", async () => {
    const {
      body: { topics },
    } = await request(app).get("/api/topics");
    const expected = {
      slug: "mitch",
      description: "The man, the Mitch, the legend",
    };

    expect(typeof topics).toBe("object");
    expect(topics[0]).toEqual(expected);
    expect(topics).toHaveLength(3);
  });
});

describe("GET /api", () => {
  test("Should return the API structure", async () => {
    const { body } = await request(app).get("/api").expect(200);
    expect(body).toEqual(apiInfo);
  });
  test("The properties of each API endpoint has description, queries, exampleResponse and requiredBodyFormat", () => {
    for (const key in apiInfo) {
      for (const innerKey in apiInfo[key]) {
        expect(typeof apiInfo[key][innerKey].description).toBe("string");
        expect(apiInfo[key][innerKey].description.length).toBeGreaterThan(0);
        expect(Array.isArray(apiInfo[key][innerKey].queries)).toBe(true);
        expect(typeof apiInfo[key][innerKey].exampleResponse).toBe("object");
        expect(typeof apiInfo[key][innerKey].requiredBodyFormat).toBe("object");
      }
    }
  });
});

describe("Error controllers", () => {
  test("Should return a 404 status if path doesn't exist", async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get("/HELLO");
    expect(status).toBe(404);
    expect(msg).toBe("Path not found.");
  });
});

describe("GET /api/articles/:article_id", () => {
  test("Should return a 200 status", async () => {
    const { status } = await request(app).get("/api/articles/3");
    expect(status).toBe(200);
  });

  test("Should return an object article requested by id", async () => {
    const {
      body: { article },
    } = await request(app).get("/api/articles/3");
    const expected = {
      article_id: 3,
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      author: "icellusedkars",
      body: "some gifs",
      created_at: "2020-11-03T09:12:00.000Z",
      votes: 0,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };

    expect(typeof article).toBe("object");
    expect(article).toMatchObject(expected);
  });

  test("Returns a status and error message when given an integar article id that doesn't exist", async () => {
    const response = await request(app).get("/api/articles/9999").expect(404);
    const expected = "article does not exist";

    expect(response.body.msg).toBe(expected);
  });

  test("Returns a status and error message when given an invalid article id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles/JELLY").expect(400);
    const expected = "Bad request";

    expect(msg).toBe(expected);
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("Should return a 200 status", async () => {
    const { status } = await request(app).get("/api/articles/1/comments");
    expect(status).toBe(200);
  });

  test("Should return an array of comments requested by article id", async () => {
    const {
      body: { articleComments },
    } = await request(app).get("/api/articles/1/comments");

    articleComments.forEach((comment) => {
      expect(typeof comment.comment_id).toBe("number");
      expect(typeof comment.votes).toBe("number");
      expect(typeof comment.created_at).toBe("string");
      expect(typeof comment.author).toBe("string");
      expect(typeof comment.body).toBe("string");
      expect(typeof comment.article_id).toBe("number");
    });

    expect(articleComments).toHaveLength(10);
  });

  test("Returns a status and error message when given an integar article id that doesn't exist", async () => {
    const response = await request(app)
      .get("/api/articles/9999/comments")
      .expect(404);
    const expected = "article does not exist";

    expect(response.body.msg).toBe(expected);
  });

  test("Returns a status and error message when given an invalid article id", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/articles/JELLY/comments").expect(400);
    const expected = "Bad request";

    expect(msg).toBe(expected);
  });
  test("Returns a 200 status and empty array when given an a valid article id but it has no comments", async () => {
    const {
      body: { articleComments },
    } = await request(app).get("/api/articles/7/comments").expect(200);
    const expected = [];

    expect(articleComments).toEqual(expected);
  });
});

describe("GET /api/articles", () => {
  test("Should return a 200 status", async () => {
    const { status } = await request(app).get("/api/articles");
    expect(status).toBe(200);
  });

  test("Should return an array of articles", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles?limit=20");
    const expected = {
      author: "icellusedkars",
      title: "Eight pug gifs that remind me of mitch",
      article_id: 3,
      topic: "mitch",
      created_at: "2020-11-03T09:12:00.000Z",
      votes: 0,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      comment_count: "2",
    };

    const correctStructure = articles.every((article) => {
      return Object.keys(expected).every((key) => {
        return article.hasOwnProperty(key);
      });
    });

    articles.forEach((article) => {
      expect(typeof article.author).toBe("string");
      expect(typeof article.title).toBe("string");
      expect(typeof article.article_id).toBe("number");
      expect(typeof article.topic).toBe("string");
      expect(typeof article.created_at).toBe("string");
      expect(typeof article.votes).toBe("number");
      expect(typeof article.article_img_url).toBe("string");
      expect(typeof article.comment_count).toBe("string");
    });

    expect(correctStructure).toBe(true);
    expect(articles[0]).toEqual(expected);
    expect(articles).toHaveLength(13);
    expect(articles).toBeSorted({ key: "created_at", descending: true });
  });
  test("Should return a 404 status if path doesn't exist", async () => {
    const {
      status,
      body: { msg },
    } = await request(app).get("/api/HELLO");
    expect(status).toBe(404);
    expect(msg).toBe("Path not found.");
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  const posted = {
    username: "butter_bridge",
    body: "Amazing!",
  };

  test("Should return a 201 status", async () => {
    const response = await request(app)
      .post("/api/articles/9/comments")
      .send(posted);
    expect(response.status).toBe(201);
  });

  test("Insert comment match the object structure", async () => {
    const response = await request(app)
      .post("/api/articles/9/comments")
      .send(posted);
    const { insertedComment } = response.body;

    const expected = {
      comment_id: 19,
      votes: 0,
      author: "butter_bridge",
      body: "Amazing!",
      article_id: 9,
    };

    expect(insertedComment).toMatchObject(expected);
    expect(typeof insertedComment.created_at).toBe("string");
    expect(new Date(insertedComment.created_at).toString()).not.toEqual(
      "Invalid Date"
    );
  });

  test("404: Check that article id exists", async () => {
    const response = await request(app)
      .post("/api/articles/9999/comments")
      .send(posted)
      .expect(404);
    const expected = "article does not exist";
    expect(response.body.msg).toBe(expected);
  });

  test("400: Check that article id is valid", async () => {
    const response = await request(app)
      .post("/api/articles/HELLO/comments")
      .send(posted)
      .expect(400);
    const expected = "Bad request";
    expect(response.body.msg).toBe(expected);
  });

  test("400: Should return 400 if the body is missing from body request", async () => {
    const response = await request(app).post("/api/articles/9/comments").send();

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Request body is missing");
  });
  test("400: Should return 400 if the username is missing from body request", async () => {
    const response = await request(app)
      .post("/api/articles/9/comments")
      .send({ body: "Amazing!" });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("Username is required");
  });
  test("400: Should return 400 if the body text is missing from body request", async () => {
    const response = await request(app)
      .post("/api/articles/9/comments")
      .send({ username: "butter_bridge" });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe("body text is required");
  });
});

describe("GET /api/articles (sorting queries)", () => {
  test("Should sort articles by specified column in ascending order", async () => {
    const response = await request(app)
      .get("/api/articles")
      .query({ sort_by: "author", order: "ASC" });
    const {
      body: { articles },
    } = response;
    expect(articles).toBeSortedBy("author", { ascending: true });
  });
  test("Should sort articles by specified column in descending order by default", async () => {
    const response = await request(app)
      .get("/api/articles")
      .query({ sort_by: "author" });
    const {
      body: { articles },
    } = response;
    expect(articles).toBeSortedBy("author", { descending: true });
  });
  test("Should default to sorting by created_at in descending order if no queries are provided", async () => {
    const response = await request(app).get("/api/articles").expect(200);
    const {
      body: { articles },
    } = response;
    expect(articles).toBeSortedBy("created_at", { descending: true });
  });
  test("400: Return an 400 error for invalid sort_by column", async () => {
    const response = await request(app)
      .get("/api/articles")
      .query({ sort_by: "invalid_column" })
      .expect(400);
    const {
      body: { msg },
    } = response;
    expect(msg).toBe("Invalid sort_by column");
  });
  test("400: Return an 400 error for invalid order query", async () => {
    const response = await request(app)
      .get("/api/articles")
      .query({ order: "invalid_order" })
      .expect(400);
    const {
      body: { msg },
    } = response;
    expect(msg).toBe("Order must be either ASC or DESC");
  });
});
describe("GET /api/articles/:article_id (comment_count)", () => {
  test("Should return object article requested by id with the addition of comment_count", async () => {
    const {
      body: { article },
    } = await request(app).get("/api/articles/3");
    const expected = {
      article_id: 3,
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      author: "icellusedkars",
      body: "some gifs",
      created_at: "2020-11-03T09:12:00.000Z",
      votes: 0,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      comment_count: "2",
    };

    expect(article).toMatchObject(expected);
  });
});
describe("GET /api/articles (topic query)", () => {
  test("Should return articles filtered by topic when topic query is provided", async () => {
    const response = await request(app)
      .get("/api/articles?topic=mitch&limit=20")
      .expect(200);
    const {
      body: { articles },
    } = response;
    const expected = {
      article_id: 3,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      author: "icellusedkars",
      comment_count: "2",
      created_at: "2020-11-03T09:12:00.000Z",
      title: "Eight pug gifs that remind me of mitch",
      topic: "mitch",
      votes: 0,
    };

    expect(articles[0]).toMatchObject(expected);
    expect(articles).toHaveLength(12);
  });

  test("Returns a 200 status and empty array when given an valid topic but it has no article", async () => {
    const response = await request(app)
      .get("/api/articles?topic=paper")
      .expect(200);
    const {
      body: { articles },
    } = response;

    const expected = [];

    expect(articles).toEqual(expected);
  });

  test("404: Should return 404 error for invalid topic", async () => {
    const response = await request(app)
      .get("/api/articles?topic=HELLO")
      .expect(404);
    const {
      body: { msg },
    } = response;
    expect(msg).toBe("Topic does not exist");
  });

  test("Should return all articles if passed an empty topic query ", async () => {
    const response = await request(app)
      .get("/api/articles?topic=&limit=20")
      .expect(200);
    const {
      body: { articles },
    } = response;
    expect(articles).toHaveLength(13);
  });
});

describe("PATCH /api/articles/:article_id", () => {
  const patch = {
    inc_votes: 100,
  };

  test("Patched article should match the object structure and increase votes", async () => {
    const response = await request(app)
      .patch("/api/articles/9")
      .send(patch)
      .expect(200);
    const { patchedArticle } = response.body;

    const expected = {
      article_id: 9,
      title: "They're not exactly dogs, are they?",
      topic: "mitch",
      author: "butter_bridge",
      body: "Well? Think about it.",
      votes: 100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };

    expect(patchedArticle).toMatchObject(expected);
    expect(typeof patchedArticle.created_at).toBe("string");
    expect(new Date(patchedArticle.created_at).toString()).not.toEqual(
      "Invalid Date"
    );
  });
  test("Patched article should decrease if passed a negative number", async () => {
    const response = await request(app)
      .patch("/api/articles/9")
      .send({
        inc_votes: -100,
      })
      .expect(200);
    const { patchedArticle } = response.body;

    const expected = {
      article_id: 9,
      title: "They're not exactly dogs, are they?",
      topic: "mitch",
      author: "butter_bridge",
      body: "Well? Think about it.",
      votes: -100,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };

    expect(patchedArticle).toMatchObject(expected);
  });
  test("Should ignore properties other than inc_votes if provided", async () => {
    const response = await request(app)
      .patch("/api/articles/9")
      .send({
        inc_votes: -999,
        title: "One can think.",
        invalid_property: 200,
        invalid_property1: "title",
      })
      .expect(200);
    const { patchedArticle } = response.body;

    const expected = {
      article_id: 9,
      title: "They're not exactly dogs, are they?",
      topic: "mitch",
      author: "butter_bridge",
      body: "Well? Think about it.",
      votes: -999,
      article_img_url:
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
    };

    expect(patchedArticle).toMatchObject(expected);
    expect(typeof patchedArticle.created_at).toBe("string");
    expect(new Date(patchedArticle.created_at).toString()).not.toEqual(
      "Invalid Date"
    );
  });
  test("400: Return a 400 error for invalid vote input", async () => {
    const response = await request(app)
      .patch("/api/articles/9")
      .send({
        inc_votes: "hey",
      })
      .expect(400);
    const { msg } = response.body;

    const expected = "Bad request";

    expect(msg).toBe(expected);
  });
  test("404: Return a 404 error if article does not exist", async () => {
    const response = await request(app)
      .patch("/api/articles/9999999")
      .send(patch)
      .expect(404);
    const { msg } = response.body;

    const expected = "article does not exist";

    expect(msg).toBe(expected);
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("It should respond with a 204 status for successful deletion and check that the comment no longer exists", async () => {
    const response = await request(app).delete("/api/comments/1").expect(204);

    const recordExists = await connection.query(
      `SELECT * FROM comments WHERE comment_id = 1`
    );
    const totalRecords = await connection.query(`SELECT * FROM comments`);

    expect(response.body).toEqual({});
    expect(recordExists.rows).toEqual([]);
    expect(totalRecords.rows).toHaveLength(17);
  });

  test("404: It should respond with a 404 status if comment does not exist", async () => {
    const response = await request(app)
      .delete("/api/comments/99999")
      .expect(404);

    expect(response.body.msg).toEqual("comment does not exist");
  });

  test("400: It should respond with a 400 status for invalid comment_id", async () => {
    const response = await request(app)
      .delete("/api/comments/not-a-number")
      .expect(400);

    expect(response.body.msg).toEqual("Bad request");
  });
});

describe("GET /api/users", () => {
  test("Should return with an array of users", async () => {
    const response = await request(app).get("/api/users").expect(200);
    const { users } = response.body;
    expect(Array.isArray(users)).toBe(true);
  });

  test("Check that user match the object structure and returns right amount of users", async () => {
    const response = await request(app).get("/api/users").expect(200);
    const { users } = response.body;

    const expected = {
      avatar_url:
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      name: "jonny",
      username: "butter_bridge",
    };

    users.forEach((user) => {
      expect(typeof user.avatar_url).toBe("string");
      expect(typeof user.name).toBe("string");
      expect(typeof user.username).toBe("string");
    });

    expect(users[0]).toMatchObject(expected);
    expect(users).toHaveLength(4);
  });
});

describe("GET /api/users/:username", () => {
  test("Should return object username requested by id", async () => {
    const {
      body: { user },
    } = await request(app).get("/api/users/rogersop").expect(200);
    const expected = {
      username: "rogersop",
      name: "paul",
      avatar_url: "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
    };

    expect(user).toMatchObject(expected);
  });
  test("404: Should return 404 error if username doesn't exist", async () => {
    const {
      body: { msg },
    } = await request(app).get("/api/users/invalid_username").expect(404);
    const expected = "username does not exist.";

    expect(msg).toBe(expected);
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  const patch = {
    inc_votes: 100,
  };

  test("Patched comment should match the object structure and increase votes", async () => {
    const response = await request(app)
      .patch("/api/comments/9")
      .send(patch)
      .expect(200);
    const { updatedComment } = response.body;

    const expected = {
      article_id: 1,
      author: "icellusedkars",
      body: "Superficially charming",
      votes: 100,
    };

    expect(updatedComment).toMatchObject(expected);
  });
  test("Patched comment's votes should decrease if passed a negative number", async () => {
    const response = await request(app)
      .patch("/api/comments/9")
      .send({
        inc_votes: -100,
      })
      .expect(200);
    const { updatedComment } = response.body;

    const expected = {
      article_id: 1,
      author: "icellusedkars",
      body: "Superficially charming",
      votes: -100,
    };

    expect(updatedComment).toMatchObject(expected);
  });
  test("Should ignore properties other than inc_votes if provided", async () => {
    const response = await request(app)
      .patch("/api/comments/9")
      .send({
        inc_votes: -999,
        title: "One can think.",
        invalid_property: 200,
        invalid_property1: "title",
      })
      .expect(200);
    const { updatedComment } = response.body;

    const expected = {
      article_id: 1,
      author: "icellusedkars",
      body: "Superficially charming",
      votes: -999,
    };

    expect(updatedComment).toMatchObject(expected);
  });
  test("400: Return a 400 error for invalid vote input", async () => {
    const response = await request(app)
      .patch("/api/comments/9")
      .send({
        inc_votes: "hey",
      })
      .expect(400);
    const { msg } = response.body;

    const expected = "Bad request";

    expect(msg).toBe(expected);
  });
  test("404: Return a 404 error if article does not exist", async () => {
    const response = await request(app)
      .patch("/api/comments/9999999")
      .send(patch)
      .expect(404);
    const { msg } = response.body;

    const expected = "comment does not exist";

    expect(msg).toBe(expected);
  });
});

describe("POST /api/articles", () => {
  const posted = {
    author: "butter_bridge",
    title: "Testing",
    body: "Amazing!",
    topic: "mitch",
  };

  test("Should return a 201 status", async () => {
    const response = await request(app).post("/api/articles").send(posted);
    expect(response.status).toBe(201);
  });

  test("Insert comment should match the object structure", async () => {
    const response = await request(app).post("/api/articles").send(posted);
    const { insertedArticle } = response.body;

    const expected = {
      article_id: 14,
      title: "Testing",
      topic: "mitch",
      author: "butter_bridge",
      body: "Amazing!",
      votes: 0,
      article_img_url:
        "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80",
      comment_count: "0",
    };

    expect(insertedArticle).toMatchObject(expected);
    expect(typeof insertedArticle.created_at).toBe("string");
    expect(new Date(insertedArticle.created_at).toString()).not.toEqual(
      "Invalid Date"
    );
  });

  test("404: Check that username exists", async () => {
    const response = await request(app)
      .post("/api/articles")
      .send({
        author: "invalid_username",
        title: "Testing",
        body: "Amazing!",
        topic: "mitch",
      })
      .expect(404);
    const expected = "username does not exist.";
    expect(response.body.msg).toBe(expected);
  });

  test("404: Check that topic exists", async () => {
    const response = await request(app)
      .post("/api/articles")
      .send({
        author: "butter_bridge",
        title: "Testing",
        body: "Amazing!",
        topic: "invalid_topic",
      })
      .expect(400);
    const expected = "topic does not exist";
    expect(response.body.msg).toBe(expected);
  });

  test("400: Should return 400 if title or body text is missing from body request", async () => {
    const response = await request(app).post("/api/articles").send({
      author: "butter_bridge",
      topic: "mitch",
    });

    expect(response.status).toBe(400);
    expect(response.body.msg).toBe(
      "Request body format is incorrect, ensure it has author, title, body, topic"
    );
  });
});

describe("GET /api/articles (pagination)", () => {
  test("Should return an array of articles with a total_count of how many articles have been returned", async () => {
    const { body } = await request(app).get("/api/articles?limit=1");
    const expected = {
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
          comment_count: "2",
        },
      ],
      totalCount: 13,
    };

    expect(body).toMatchObject(expected);
  });
});
describe("GET /api/articles/:article_id/comments (pagination)", () => {
  test("Should return an array of comments from the selected article id limited to 2 results per page", async () => {
    const { body } = await request(app).get("/api/articles/1/comments?limit=2");
    const expected = {
      articleComments: expect.arrayContaining([
        expect.objectContaining({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          author: expect.any(String),
          body: expect.any(String),
          article_id: expect.any(Number),
          created_at: expect.any(String),
        }),
      ]),
    };

    expect(body).toEqual(expected);
    expect(body.articleComments.length).toBe(2);
  });
  test("404: Return invalid query if passed limit query as 0", async () => {
    const { body } = await request(app)
      .get("/api/articles/1/comments?limit=0")
      .expect(400);
    const expected = { msg: "Invalid query" };

    expect(body).toEqual(expected);
  });
  test("404: Return invalid query if passed p query as 0", async () => {
    const { body } = await request(app)
      .get("/api/articles/1/comments?p=0")
      .expect(400);
    const expected = { msg: "Invalid query" };

    expect(body).toEqual(expected);
  });
});
