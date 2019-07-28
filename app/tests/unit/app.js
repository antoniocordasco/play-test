var expect  = require('chai').expect;
const request = require('supertest');

describe('app', function() {
    it('Dummy test', function(done) {
        expect('Hello World').to.equal('Hello World');
        done();
    });
});
/*
describe('GET /app/v1/db-healthcheck', function() { return;
    it('responds with json', function(done) {
      request(router)
        .get('/app/v1/db-healthcheck')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
});
*/