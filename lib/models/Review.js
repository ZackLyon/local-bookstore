const pool = require('../utils/pool');
const { getById } = require('./Author');

module.exports = class Review {
  id;
  rating;
  review;
  reviewer;
  book;

  constructor(row) {
    this.id = row.review_id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewer = row.reviewer_id;
    this.book = row.book_id;
  }

  static async insert({ rating, review, reviewer, book }) {
    const { rows } = await pool.query(
      'INSERT INTO review (rating, review, reviewer_id, book_id) VALUES ($1, $2, $3, $4) RETURNING *;',
      [rating, review, reviewer, book]
    );
    return new Review(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT TOP 100 * FROM review ORDER BY rating DESC'
    );
    return rows.map((row) => new Review(row));
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM review WHERE review_id=$1 RETURNING *', [id]
    );
    if(!rows[0]) return null;

    return new Review(rows[0]);
  }
};


// get all reviews by book id and join reviewer table and pull reviewer name and id into results, and map through.
