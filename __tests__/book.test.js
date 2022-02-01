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
  };

  const testObjReceive = {
    id: expect.any(String),
    title: 'the last starfighting coder',
    publisher: '1',
    released: '1981',
  };

  it('should make a new book entry in the database', async () => {
    const res = await request(app).post('/api/v1/books/').send(testObjSend);

    expect(res.body).toEqual(testObjReceive);
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
});
