const app = require('../app')
const request = require('supertest')
jest.setTimeout(3 * 60 * 1000);

describe('POST /register test', () => {
    it('responds with json', function(done){
        request(app)
            .post('/user/register')
            .send({userName: 'test1', email: 'testemail', password: '1213123'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res){
                if (err) return done(err)
                return done()
            })
    })
})


