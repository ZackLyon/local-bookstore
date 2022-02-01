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
      dob: '1945-02-14T07:00:00.000Z',
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
});
