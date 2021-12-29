
const request = require('supertest')
const app = require('../src/index')

describe('request body fail', () => {
    it('wrong body type', async () => {
        const res = await request(app)
            .post('/records')
            .send({
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('post')
    })

});
