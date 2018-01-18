const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const server = require('../../server');

describe('routes: twitter', () => {
  describe('GET /oauth_request', () => {
    it('should have a error message', done => {
      chai.request(server)
        .get('/oauth_request')
        .end((error, response) => {
          error.status.should.eql(422);
          response.body.error.should.have.string('You need to pass the callback_url param.');
          done();
        });
    });

    it('should receive a response with the Twitter authorisation URL', done => {
      chai.request(server)
        .get('/oauth_request?callback_url=http://localhost')
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          response.body.data.should.have.string('oauth_token');
          done();
        });
    });
  });
});
