const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Review = require('../lib/models/Review');

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

  it('deletes a review with the review id', async () => {
    const testReview = await Review.insert({
      rating: 2,
      review: 'horrible',
      reviewer: 1,
      book: 1,
    });

    const response = await request(app).delete(`/api/v1/reviews/${testReview.id}`);

    expect(response.body).toEqual(testReview);
  });
});
