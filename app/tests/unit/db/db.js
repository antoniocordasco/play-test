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
            warnOnUnregistered: false,
            useCleanCache: true
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
        const dbHealthcheck = require('../../../db/db').healthcheck;
        const healthcheckRes = await dbHealthcheck();

        expect(healthcheckRes).to.equal(true);   
        return;
    }));

    it('Testing addFrame', mochaAsync(async function(done) {

        // mocking DB client
        class Client {
            connect() {
                return true;
            }
            query() {
                return { rows: [] };
            }
        }        
        mockery.resetCache();
        mockery.registerMock('pg', {
            Client: Client
        });

        // we need to require the DB access function after the mocks have been set
        const addFrame = require('../../../db/db').addFrame;
        mockery.resetCache();
        var check1 = await addFrame(1, 7, 3);
        expect(check1).to.equal(true);

        var check2 = await addFrame(1, 10, null);
        expect(check2).to.equal(true);

        var check3 = await addFrame(1, 9, 0);
        expect(check3).to.equal(true);

        try {
            var check4 = await addFrame(1, 7, 4); 
        } catch {
            var check4 = false;
        }
        expect(check4).to.equal(false);

        try {
            var check5 = await addFrame(1, 9, null); 
        } catch {
            var check5 = false;
        }
        expect(check5).to.equal(false);

        try {
            var check6 = await addFrame(1, null, null); 
        } catch {
            var check6 = false;
        }
        expect(check6).to.equal(false);

        return;
    }));

    after(function(){   
        mockery.deregisterAll();     
        mockery.disable();        
    });
});