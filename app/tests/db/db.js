var expect  = require('chai').expect;
const mockery = require('mockery');

// from https://labs.chiedo.com/post/async-mocha-tests/
var mochaAsync = (fn) => {
    return done => {
      fn.call().then(done, err => {
        done(err);
      });
    };
  };

describe('db', function() {
    before(function(){
        mockery.enable({
            warnOnUnregistered: false
        });        
    });

    it('Testing healthcheck DB function', mochaAsync(async function(done) {

        // mocking DB client
        class Client {
            connect() {
                return true;
            }
            query() {
                return {
                    rowCount: 3
                };
            }
        }        
        mockery.registerMock('pg', {
            Client: Client
        });

        // we need to require the DB access function after the mocks have been set
        const dbHealthcheck = require('../../db/db').healthcheck;
        const healthcheckRes = await dbHealthcheck();

        expect(healthcheckRes).to.equal(true);
        return;
    }));


    after(function(){        
        mockery.disable();        
    });
});