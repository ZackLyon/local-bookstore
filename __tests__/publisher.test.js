const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Publisher = require('../lib/services/Publisher');

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

        it('should get all publisers', async() => {
            await Publisher.insert({
                name: 'BetweentheLyons', city: 'Portland', state: 'Oregon', country: 'United State of America'   
            });
        
            const res = await request(app).get('/api/v1/publishers');
            expect(res.body).toEqual([{ id: expect.any(String), name: 'Sarani Inc', city: 'OKC', state: 'OK', country: 'USA'  
            },
            { id: expect.any(String), name: 'BetweentheLyons', city: 'Portland', state: 'Oregon', country: 'United State of America'}]);
          });

          


})