const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisher;
  released;

  constructor(row) {
    this.id = row.book_id;
    this.title = row.title;
    this.publisher = row.publisher_id;
    this.released = row.released;
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
};
