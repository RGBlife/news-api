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

  test("Should return an array of the object article requested by id", async () => {
    const {
      body: { article },
    } = await request(app).get("/api/articles/3");
    const expected = [
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
    ];

    expect(typeof article).toBe("object");
    expect(article).toEqual(expected);
    expect(article).toHaveLength(1);
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
describe("GET /api/articles", () => {
  test("Should return a 200 status", async () => {
    const { status } = await request(app).get("/api/articles");
    expect(status).toBe(200);
  });

  test("Should return an array of articles", async () => {
    const {
      body: { articles },
    } = await request(app).get("/api/articles");
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
    expect(Array.isArray(articles)).toBe(true);
    expect(Array.isArray(articles[0])).toBe(false);
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

// describe.only("POST /api/articles/:article_id/comments", () => {

//   const posted = [
//     {
//       author: "butter_bridge",
//       body: "Amazing!",
//     },
//     {
//       author: "butter_bridge",
//       body: "Wow wow wow!",
//     },
//   ];

//   test("Should return a 201 status", async () => {
//     const response = await request(app).post("/api/articles/9/comments");
//     expect(response.status).toBe(200);
//   });

//   test("Should return an Array which contains comment objects", async () => {
//     const response = await request(app).post("/api/articles/9/comments");
//     const { comments } = response.body;
//     expect(Array.isArray(comments[0])).toBe(false);
//     expect(Array.isArray(comments)).toBe(true);
//   });
//   test("Should return an Array of objects with the correct keys", async () => {
//     const response = await request(app).post("/api/articles/9/comments");
//     const { comments } = response.body;
//     const correctStructure = comments.every((comment) => {
//       return Object.keys(expected).every((key) => {
//         return comment.hasOwnProperty(key);
//       });
//     });

//     const expected = {
//       comment_id: 17,
//       votes: 20,
//       created_at: "2020-03-14 17:02:00",
//       author: "icellusedkars",
//       body: "The owls are not what they seem.",
//       article_id: 9,
//     };

//     expect(correctStructure).toBe(true);
//   });

//   test("Comment objects should have the correct types", async () => {
//     const response = (await request(app).post("/api/articles/9/comments")).post(posted)
//     const { comments } = response.body;
//     comments.forEach((comment) => {
//       expect(typeof comment.comment_id).toBe("number");
//       expect(typeof comment.votes).toBe("number");
//       expect(typeof comment.created_at).toBe("string");
//       expect(typeof comment.author).toBe("string");
//       expect(typeof comment.body).toBe("string");
//       expect(typeof comment.article_id).toBe("number");
//     });
//   });
//   test("Comment objects should have the correct types", async () => {
//     const response = await request(app).post("/api/articles/9/comments");
//     const { comments } = response.body;
//     comments.forEach((comment) => {
//       expect(typeof comment.comment_id).toBe("number");
//       expect(typeof comment.votes).toBe("number");
//       expect(typeof comment.created_at).toBe("string");
//       expect(typeof comment.author).toBe("string");
//       expect(typeof comment.body).toBe("string");
//       expect(typeof comment.article_id).toBe("number");
//     });
//   });

//   test("Should return an array of comments", async () => {
//     const {
//       body: { comments },
//     } = await request(app).post("/api/articles/9/comments");

    

//     const expected = {
//       comment_id: 17,
//       votes: 20,
//       created_at: "2020-03-14 17:02:00",
//       author: "icellusedkars",
//       body: "The owls are not what they seem.",
//       article_id: 9,
//     };

//     const correctStructure = comments.every((comment) => {
//       return Object.keys(expected).every((key) => {
//         return comment.hasOwnProperty(key);
//       });
//     });
//     console.log(data);

//     comments.forEach((comment) => {
//       expect(typeof comment.comment_id).toBe("number");
//       expect(typeof comment.votes).toBe("number");
//       expect(typeof comment.created_at).toBe("string");
//       expect(typeof comment.author).toBe("string");
//       expect(typeof comment.body).toBe("string");
//       expect(typeof comment.article_id).toBe("number");
//     });

//     expect(correctStructure).toBe(true);
//     expect(Array.isArray(comments)).toBe(true);
//     expect(Array.isArray(comments[0])).toBe(false);
//     // expect(comments).toHaveLength(13);
//     // expect(comments).toBeSorted({ key: "created_at", descending: true });
//   });
//   test("Should return a 404 status if path doesn't exist", async () => {
//     const {
//       status,
//       body: { msg },
//     } = await request(app).get("/api/HELLO");
//     expect(status).toBe(404);
//     expect(msg).toBe("Path not found.");
//   });
//   // Tests to do
//   // 1. Check that the author in article id matches the author provided in the body post
//   // 2.
// });
