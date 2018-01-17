const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const server = require('../../server');

describe('routes: twitter', () => {
  describe('GET /oauth_request', () => {
    it('should receive a response with the Twitter authorisation URL', done => {
      chai.request(server)
        .get('/oauth_request?callback_url=http://localhost')
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          done();
        });
    });
  });
});
