const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  reviewerId;
  book;
  reviewer;

  constructor(row) {
    this.id = row.review_id;
    this.rating = row.rating;
    this.review = row.review;
    row.reviewer_id && (this.reviewerId = row.reviewer_id);
    this.reviewer = { id: row.id, name: row.name };
    row.book_id && (this.book = row.book_id);
  }

  static async insert({ rating, review, reviewerId, book }) {
    const { rows } = await pool.query(
      'INSERT INTO review (rating, review, reviewer_id, book_id) VALUES ($1, $2, $3, $4) RETURNING *;',
      [rating, review, reviewerId, book]
    );
    return new Review(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT TOP 100 * FROM review ORDER BY rating DESC'
    );
    return rows.map((row) => new Review(row));
  }

  static async getAllByBookId(id) {
    const { rows } = await pool.query(
      `SELECT 
      review_id,
       rating,
        review, 
        reviewer.name, 
        reviewer.reviewer_id AS id
      FROM review
      LEFT JOIN reviewer
      ON reviewer.reviewer_id = review.reviewer_id
      WHERE review.book_id=$1
      GROUP BY review.review_id, reviewer.reviewer_id`,
      [id]
    );

    if (!rows[0]) return null;
    return rows.map((row) => new Review(row));
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM review WHERE review_id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;

    return new Review(rows[0]);
  }
};

// get all reviews by book id and join reviewer table and pull reviewer name and id into results, and map through.
