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
SELECT
    a.*,
    (
        SELECT
            COUNT(*)
        FROM
            comments c
        WHERE
            c.article_id = a.article_id
    ) as comment_count
FROM
    articles a
WHERE
    a.article_id = 3;