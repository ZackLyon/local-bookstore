const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books!', () => {
  beforeEach(async () => await setup(pool));

  afterAll(async () => await pool.end());

  const testObjSend = {
    title: 'the last starfighting coder',
    publisher: 1,
    released: 1981,
    authorIds: [1],
  };

  const testObjReceive = {
    id: expect.any(String),
    title: 'the last starfighting coder',
    publisher: { id: '1' },
    released: '1981',
    authors: [{ id: '1', name: 'Karl Beyonce Karlson' }],
  };

  it('should make a new book entry in the database', async () => {
    const res = await request(app).post('/api/v1/books/').send(testObjSend);

    expect(res.body).toEqual({ ...testObjReceive, reviews: [] });
  });

  it('should get all book entries in the database', async () => {
    const res = await request(app).get('/api/v1/books/');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        title: 'You think you know Karl?',
        released: '2010',
        publisher: { id: '1', name: 'Sarani Inc' },
      },
    ]);
  });
  it('should get a book by id', async () => {
    const res = await request(app).get('/api/v1/books/1');

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'You think you know Karl?',
      released: '2010',
      publisher: { id: '1', name: 'Sarani Inc' },
      authors: [{ author_id: 1, name: 'Karl Beyonce Karlson' }], // author id and name
      reviews: [
        {
          id: '1',
          rating: '5',
          review: 'I thought I knew Karl, but now I know better.',
          reviewer: { id: '1', name: 'Amit Just Amit' },
        },
      ],
    });
  });
});
