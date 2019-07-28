const expect  = require('chai').expect;
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

  it('adding a frame with a typo generates a 500 error', function(done) {
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

  /*
  This is almost a perfect game, only 1 pin is missed at the 12th shot.
  The input is almost always the same, but it is set each time so that it can be changed to test other scenarios quickly
  */
  it('a adding a full game returns the correct score', function(done) {
    request(router.app).post(startUrl).send({description: 'test game', player1: 'test player 1'}).end(function(err, res) {
      const plId = res.body.game.player1Id;
      const gameId = res.body.game.gameId;

      let input = {playerId: plId, firstShot: '10', secondShot: '0'};
      request(router.app).post(addUrl).send(input).end(function(err, res) {    

        let input = {playerId: plId, firstShot: '10', secondShot: '0'};
        request(router.app).post(addUrl).send(input).end(function(err, res) { 

          let input = {playerId: plId, firstShot: '10', secondShot: '0'};
          request(router.app).post(addUrl).send(input).end(function(err, res) { 

            let input = {playerId: plId, firstShot: '10', secondShot: '0'};
            request(router.app).post(addUrl).send(input).end(function(err, res) {  

              let input = {playerId: plId, firstShot: '10', secondShot: '0'};
              request(router.app).post(addUrl).send(input).end(function(err, res) {   

                let input = {playerId: plId, firstShot: '10', secondShot: '0'};
                request(router.app).post(addUrl).send(input).end(function(err, res) {  

                  let input = {playerId: plId, firstShot: '10', secondShot: '0'};
                  request(router.app).post(addUrl).send(input).end(function(err, res) { 

                    let input = {playerId: plId, firstShot: '10', secondShot: '0'};
                    request(router.app).post(addUrl).send(input).end(function(err, res) {   

                      let input = {playerId: plId, firstShot: '10', secondShot: '0'};
                      request(router.app).post(addUrl).send(input).end(function(err, res) {  

                        let input = {playerId: plId, firstShot: '10', secondShot: '0'};
                        request(router.app).post(addUrl).send(input).end(function(err, res) {  

                          let input = {playerId: plId, firstShot: '10', secondShot: '0'};
                          request(router.app).post(addUrl).send(input).end(function(err, res) {   

                            let input = {playerId: plId, firstShot: '9', secondShot: '0'};
                            request(router.app).post(addUrl).send(input).end(function(err, res) {    

                              request(router.app).get('/api/v1/game/' + gameId).send().end(function(err, res) {    
                          
                                console.log(res.body.game.player1.score);
                                expect(res.body.game.player1.score).to.be.equal(299);
                                done();
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

router.server.close();