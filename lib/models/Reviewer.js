const pool = require('../utils/pool');

module.exports = class Reviewer {
  reviewer_id;
  name;
  company;

  constructor(row) {
    this.id = row.reviewer_id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewer (name, company) VALUES ($1, $2) RETURNING *',
      [name, company]
    );
    return new Reviewer(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM reviewer');
    return rows.map((row) => new Reviewer(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM reviewer WHERE reviewer_id=$1',
      [id]
    );
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }
  static async updateById(id, attributes) {
    const reviewer = await pool.query(
      'SELECT * FROM reviewer WHERE reviewer_id=$1',
      [id]
    );
    const existingReviewer = reviewer.rows[0];
    const name = attributes.name ?? existingReviewer.name;
    const company = attributes.company ?? existingReviewer.company;

    const { rows } = await pool.query(
      'UPDATE reviewer SET name=$2, company=$3 WHERE reviewer_id=$1 RETURNING *',
      [id, name, company]
    );

    return new Reviewer(rows[0]);
  }
  static async deleteById(id) {
    //only delete if reviewer has no reviews
    const { rows } = await pool.query(
      'DELETE FROM reviewer WHERE reviewer_id=$1 RETURNING *',
      [id]
    );
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }
};
