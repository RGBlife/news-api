\c nc_news_test
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
    a.author,
    a.title,
    a.article_id,
    a.topic,
    a.created_at,
    a.votes,
    a.article_img_url
ORDER BY
    a.created_at DESC;