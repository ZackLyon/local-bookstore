const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('reviews backend routes', () => {
  beforeEach(async () => {
    await setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('adds a new review', async () => {
    const response = await request(app).post('/api/v1/reviews/').send({
      rating: 2,
      review: 'horrible',
      reviewer: 1,
      book: 1,
    });
    expect(response.body).toEqual({
      id: expect.any(String),
      rating: '2',
      review: 'horrible',
      reviewer: '1',
      book: '1',
    });
  });
});
