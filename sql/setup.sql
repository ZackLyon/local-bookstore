-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`


--we CAN put in CASCADE at the end of, for example, author and this will, hypothetically, delete the author from other tables if that specific author is deleted from the database
DROP TABLE IF EXISTS publisher, author, reviewer, book, book_author, review;

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

CREATE TABLE book (
  book_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  released NUMERIC(4,0),
  publisher_id BIGINT NOT NULL,
  FOREIGN KEY (publisher_id) REFERENCES publisher(publisher_id)
);

INSERT INTO book (title, released, publisher_id)
VALUES ('You think you know Karl?', 2010, 1);

CREATE TABLE book_author (
  book_id BIGINT REFERENCES book(book_id),
  author_id BIGINT REFERENCES author(author_id)
);

CREATE TABLE reviewer (
  reviewer_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

INSERT INTO reviewer (name, company)
VALUES ('Amit Just Amit', 'Books-R-US');

CREATE TABLE review (
  review_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rating NUMERIC(1,0) CHECK(rating >=1 AND rating<= 5) NOT NULL,
  review VARCHAR(140) NOT NULL,
  reviewer_id BIGINT NOT NULL,
  FOREIGN KEY (reviewer_id) REFERENCES reviewer(reviewer_id),
  book_id BIGINT NOT NULL,
  FOREIGN KEY (book_id) REFERENCES book(book_id)
);

INSERT INTO review (rating, review, reviewer_id, book_id)
VALUES (5, 'I thought I knew Karl, but now I know better.', 1, 1);
