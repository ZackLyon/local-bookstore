const pool = require('../utils/pool');

module.exports = class Publisher {
  id;
  name;
  city;
  state;
  country;

  constructor(row){
    this.id = row.publisher_id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }
  //create
  static async insert({ name, city, state, country }){
    const { rows } = await pool.query('INSERT INTO publisher(name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *', [name, city, state, country] 
    );
    return new Publisher(rows[0])
  } 
  //get all
  static async getAll(){
    const { rows } = await pool.query(
      'SELECT * FROM publisher'
    );
    return rows.map((row) => new Publisher(row));
  }

}