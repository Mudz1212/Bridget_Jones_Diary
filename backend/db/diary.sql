DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    entry_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    text VARCHAR(255) NOT NULL,
    date_time TIMESTAMP NOT NULL,
    PRIMARY KEY (entry_id)
);

INSERT INTO diary (title, category, text, date_time)
VALUES
    ('Entry 1', 'horror', 'the database might not work!!!!', '2026-08-28 10:17:23')