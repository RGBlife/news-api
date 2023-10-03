<<<<<<< HEAD
\c nc_news_test 
\l 
\dt
=======
\c nc_news_test
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

SELECT
<<<<<<< HEAD
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
    a.author,
    a.title,
    a.article_id,
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url,
    count(c.comment_id) AS comment_count
FROM
    articles AS a
    JOIN comments AS c ON c.article_id = a.article_id
GROUP BY
    a.author,
    a.title,
    a.article_id,
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url
ORDER BY
    a.created_at DESC;

SELECT
    a.author,
    a.title,
    a.article_id,
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url,
    count(c.comment_id) AS comment_count
FROM
    articles AS a
    LEFT JOIN comments AS c ON c.article_id = a.article_id
GROUP BY
    a.article_id
ORDER BY
    a.created_at DESC;
>>>>>>> main
