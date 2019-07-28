var expect  = require('chai').expect;
const request = require('supertest');
const router = require('../../router');

describe('Test that the API is up', function() {
  it('responds with json', function(done) {
    request(router.app)
    .get('/api/v1/hello')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
});

describe('Test the database healthcheck', function() {
  it('responds with json', function(done) {
    request(router.app)
    .get('/api/v1/db-healthcheck')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
});




describe('Test starting a game', function() {
  it('responds with json', function(done) {
    request(router.app)
    .post('/api/v1/start-game')
    .send({description: 'test game', player1: 'test player'})
    .set('Accept', 'application/json')
    .expect(200, done);
  });
});




router.server.close();