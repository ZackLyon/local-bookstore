const pool = require('../utils/pool');
const Author = require('./Author');

module.exports = class Book {
  id;
  title;
  publisher;
  released;
  author;

  constructor(row) {
    this.id = row.book_id;
    this.title = row.title;
    this.publisher = row.publisher_id;
    this.released = row.released;
    this.author = row.author || [];

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
    const  author = await Author.getById(authorId);
    if (!author) return null;

    const { rows } = await pool.query('INSERT INTO book_author(author_id, book_id) VALUES ($1, $2) RETURNING *',
      [authorId, this.id]);

    if(!rows[0]) return null;
    this.author = [...this.author, { id: author.id, name: author.name }];
    return this;
  }
};
