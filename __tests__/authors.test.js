const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

describe('Art backend routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('add an author if we do a post', async () => {
    const res = await request(app).post('/api/v1/authors/').send({
      name: 'Ms. Person',
      dob: '1945-02-14',
      pob: 'Brazil',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Ms. Person',
      dob: '2/14/1945',
      pob: 'Brazil',
    });
  });

  it('gets all authors when I do a get', async () => {
    await Author.insert({
      name: 'Ms. Person',
      dob: '1945-02-14',
      pob: 'Brazil',
    });
    const res = await request(app).get('/api/v1/authors/');

    expect(res.body).toContainEqual({
      id: expect.any(String),
      name: 'Ms. Person',
    });
  });

  it('gets one author with get by ID and lists their books', async () => {
    const res = await request(app).get('/api/v1/authors/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Karl Beyonce Karlson',
      dob: '4/22/1996',
      pob: 'Seattle, WA',
      // books: [{
      //book_id: some id
      //title: book title
      //released: some date}]
    });
  });
});
