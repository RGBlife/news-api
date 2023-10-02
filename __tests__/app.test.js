const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

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


// describe("GET /api/articles/:article_id", () => {
//   test("Should return a 200 status", async () => {
//     const { status } = await request(app).get("/api/articles/3");
//     expect(status).toBe(200);
//   });
//   test("Should return an array of the object article requested by id", async () => {
//     const {
//       body: { articles },
//     } = await request(app).get("/api/articles/3");
//     const expected =   {
//       article_id: 3,
//       title: "Eight pug gifs that remind me of mitch",
//       topic: "mitch",
//       author: "icellusedkars",
//       body: "some gifs",
//       created_at: 1604394720000,
//       article_img_url:
//         "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//     },

//     expect(typeof articles).toBe("object");
//     expect(articles[0]).toEqual(expected);
//     expect(articles).toHaveLength(1);
//   });
//   test("Returns a status and error message when given an integar article id that doesn't exist", async () => {
//     const {
//       body: { articles },
//     } = await request(app).get("/api/articles/9999");
//     const expected =   {
//       article_id: 3,
//       title: "Eight pug gifs that remind me of mitch",
//       topic: "mitch",
//       author: "icellusedkars",
//       body: "some gifs",
//       created_at: 1604394720000,
//       article_img_url:
//         "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//     },

//     expect(typeof articles).toBe("object");
//     expect(articles[0]).toEqual(expected);
//     expect(articles).toHaveLength(1);
//   });
//   test("Returns a status and error message when given an invalid article id", async () => {
//     const {
//       body: { articles },
//     } = await request(app).get("/api/articles/JELLY");
//     const expected =   {
//       article_id: 3,
//       title: "Eight pug gifs that remind me of mitch",
//       topic: "mitch",
//       author: "icellusedkars",
//       body: "some gifs",
//       created_at: 1604394720000,
//       article_img_url:
//         "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
//     },

//     expect(typeof articles).toBe("object");
//     expect(articles[0]).toEqual(expected);
//     expect(articles).toHaveLength(1);
//   });
// });