const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Reviewer = require('../lib/models/Reviewer')

describe('backend routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    });

    const testReviewer = {
        name: 'jeeves',
        company: 'askjeeves'
    };

    const expectedReviewer = {
        id: expect.any(String),
        name: 'jeeves',
        company: 'askjeeves'
    };

    it('should post a reviewer', async () => {
        const res = await request(app)
        .post('/api/v1/reviewers')
        .send(testReviewer);

        expect(res.body).toEqual(expectedReviewer)
    });
    it('should get all reviewers', async () => {
        await Reviewer.insert(testReviewer);
        const res = await request(app)
        .get('/api/v1/reviewers');

        expect(res.body).toEqual([{
            id: expect.any(String),
            name:'Amit Just Amit',
            company: 'Books-R-US'
        },
        {
        id:expect.any(String),
        name: 'jeeves',
        company: 'askjeeves'
        }
        ]);
    });
    it('should get a reviewer by id', async () => {
        const reviewer = await Reviewer.insert(testReviewer);
        const res = await request(app)
        .get(`/api/v1/reviewers/${reviewer.id}`);

        expect(res.body).toEqual(reviewer);
    });
    it('should update a reviewer by id', async ()=> {
        const reviewer = await Reviewer.insert(testReviewer);
        const res = await request(app)
        .patch(`/api/v1/reviewers/${reviewer.id}`)
        .send({ name: 'ronald'});

        const expected = {
            id: reviewer.id,
            name: 'ronald',
            company: 'askjeeves'
        };
        expect(res.body).toEqual(expected);
    });
    it('should delete a reviewer by id', async () => {
        const reviewer = await Reviewer.insert(testReviewer);
        const res = await request(app)
        .delete(`/api/v1/reviewers/${reviewer.id}`);

        expect(await Reviewer.getById(reviewer.id)).toBeNull();
    })

});