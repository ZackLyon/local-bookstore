const pool = require('../utils/pool');

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
};
