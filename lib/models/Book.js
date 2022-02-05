const pool = require('../utils/pool');
const Author = require('./Author');

module.exports = class Book {
  id;
  title;
  publisher;
  released;
  authors;
  reviews;

  constructor(row) {
    this.id = row.book_id;
    this.title = row.title;
    this.publisher = { id: row.publisher_id, name: row.name };
    this.released = row.released;
    this.authors = row.authors || [];
    this.reviews = row.review || [];
  }

  static async insert({ title, publisher, released }) {
    const { rows } = await pool.query(
      'INSERT INTO book (title, publisher_id, released) VALUES ($1, $2, $3) RETURNING *;',
      [title, publisher, released]
    );

    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM book;');

    return rows.map((row) => new Book(row));
  }

  async addAuthorById(authorId) {
    const author = await Author.getById(authorId);
    if (!author) return null;

    const { rows } = await pool.query(
      'INSERT INTO book_author(author_id, book_id) VALUES ($1, $2) RETURNING *',
      [authorId, this.id]
    );

    if (!rows[0]) return null;
    this.authors = [...this.authors, { id: author.id, name: author.name }];
    return this;
  }

  static async getById(id) {
    // remove reviews info from book

    const { rows } = await pool.query(
      `
    SELECT 
    title, 
    book.book_id,
    released,
    publisher.publisher_id,
    publisher.name, 
    jsonb_agg(to_jsonb(author) - 'dob' - 'pob') AS authors
    FROM book
    LEFT JOIN publisher
    ON publisher.publisher_id = book.publisher_id
    LEFT JOIN book_author
    ON book_author.book_id = book.book_id
    LEFT JOIN author
    ON author.author_id = book_author.author_id
    WHERE book.book_id = $1
    GROUP BY book.book_id, publisher.publisher_id
    `,
      [id]
    );

    if (!rows[0]) return null;
    return new Book(rows[0]);
  }
};
