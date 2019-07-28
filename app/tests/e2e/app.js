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

describe('End to end game logic testing', function() {
  const startUrl = '/api/v1/start-game';
  const addUrl = '/api/v1/add-frame';

  it('Test a adding a frame with a typo and getting a 500 error', function(done) {
    request(router.app).post(startUrl).send({description: 'test game', player1: 'test player 1'}).end(function(err, res) {
      const plId = res.body.game.player1Id;

      // typo in the first shot parameter name
      let input = {playerId: plId, ffffffirstShot: '1', secondShot: '3'};
      request(router.app).post(addUrl).send(input).end(function(err, res) {    
  
        expect(res.status).to.be.equal(500);
        done();
      });
    });
  });
});




router.server.close();