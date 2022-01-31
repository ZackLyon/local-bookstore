-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS publisher, author, reviewer;

CREATE TABLE publisher (
  publisher_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT,
  state TEXT,
  country TEXT
);

INSERT INTO publisher (name, city, state, country)
VALUES ('Sarani Inc', 'OKC', 'OK', 'USA');

CREATE TABLE author (
  author_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  dob DATE,
  pob TEXT
);

INSERT INTO author (name, dob, pob)
VALUES ('Karl Beyonce Karlson', '1996-04-22', 'Seattle, WA');

CREATE TABLE reviewer (
  reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

INSERT INTO reviewer (name, company)
VALUES ('Amit Just Amit', 'Books-R-US');





