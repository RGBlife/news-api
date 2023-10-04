\c nc_news_test 
\l 
\dt
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
