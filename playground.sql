<<<<<<< HEAD
\c nc_news_test 
\l 
\dt
=======
\c nc_news_test
\l
\dt

>>>>>>> main
SELECT
    *
FROM
    topics;

SELECT
    *
FROM
    articles;

SELECT
    *
FROM
    users;

SELECT
    *
FROM
    comments;

<<<<<<< HEAD
SELECT
    c.comment_id,
    c.votes,
    c.created_at,
    c.author,
    c.body,
    c.article_id
FROM
    comments AS c
    LEFT JOIN articles AS a ON a.article_id = c.article_id
WHERE
    c.article_id = 7
GROUP By
    c.comment_id,
    a.article_id
ORDER BY
    c.created_at;

SELECT *
FROM articles
WHERE 9999 = articles.article_id;
=======
INSERT INTO
    comments (body, article_id, author, votes, created_at)
VALUES
    (
        'Amazing',
        '9',
        'icellusedkars',
        0,
        '2020-04-06 13:17:00'
    );

SELECT
    *
FROM
    comments;

-- body| article_id |    author     | votes |     created_at
>>>>>>> main
