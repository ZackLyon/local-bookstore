const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.author_id;
    this.name = row.name;
    row.dob && (this.dob = row.dob.toLocaleString({ year: 'numeric', month: 'numeric', day: 'numeric' }).split(',')[0]);
    this.pob = row.pob;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO author (name, dob, pob) VALUES ($1, $2, $3) RETURNING * ',
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT author_id, name FROM author');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM author WHERE author_id=$1', [id]
    );
    // need to do a left join with book_author and book
    // need to pull book.book_id, book.title, book.released
    if(!rows[0]) return null;
    return new Author(rows[0]);
  }

};
