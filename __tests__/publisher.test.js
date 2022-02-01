const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('the backend routes', () => {
    beforeEach(() => {
        return setup(pool);
    });
    afterAll(() => {
        pool.end();
    });
     it('should create a publisher', async() => {
         const res = await request(app)
         .post('/api/v1/publishers')
         .send({ name: 'BetweentheLyons', city: 'Portland', state: 'Oregon', country: 'United State of America'  }) 
         
         
         expect(res.body).toEqual({ id: expect.any(String), name: 'BetweentheLyons', city: 'Portland', state: 'Oregon', country: 'United State of America' });
        });



})