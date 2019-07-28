var expect  = require('chai').expect;
const request = require('supertest');

describe('app', function() {
    it('Dummy test', function(done) {
        expect('Hello World').to.equal('Hello World');
        done();
    });
});
