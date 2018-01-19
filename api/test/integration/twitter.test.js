const chai = require('chai');
const nock = require('nock');
const chaiHttp = require('chai-http');
const should = chai.should();
chai.use(chaiHttp);

const server = require('../../server');

describe('routes: twitter', () => {
  after(function () {
    server.close();
  });

  describe('GET /oauth_request', () => {
    it('should have an error message', done => {
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

  describe('POST /connect', () => {
    beforeEach(() => {
      nock('https://api.twitter.com/oauth/')
        .post('/access_token')
        .reply(200, 'oauth_token=847261432928284673&oauth_token_secret=123&user_id=&screen_name=&x_auth_expires=0');

      nock('https://api.twitter.com/1.1/account')
        .get('/verify_credentials.json')
        .query(true)
        .reply(200, () => {
          return JSON.stringify('{name: ""}');
        });
    });

    it('should have an error message', done => {
      chai.request(server)
        .post('/connect')
        .end((error, response) => {
          error.status.should.eql(400);
          response.body.error.should.have.string('You have invalid credentials. Please, get logged in again.');
          done();
        });
    });

    it('should receive a response with all my Twitter profile data', done => {
      chai.request(server)
        .post('/connect')
        .send({
          'oauth_token': 'JCbVKQAAAAAA4EWgAAABYQkl7ic',
          'oauth_verifier': 'YJYMmrMkBKFNxi853Zzeb9SjahSY3SyK'
        })
        .end((error, response) => {
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          response.body.data.should.have.string('name');
          done();
        });
    });
  });

  describe('GET /tweets', () => {
    beforeEach(() => {
      nock('https://api.twitter.com/1.1/statuses')
        .get('/user_timeline.json')
        .query(true)
        .reply(200, []);
    });

    it('should receive a response with a list containing 100 of my most recent tweets', done => {
      chai.request(server)
        .get('/tweets')
        .set('oauth_token', '847261432928284673-1rHwNheApKthM5xShodCUfZ6ItzDqHt')
        .set('oauth_token_secret', '2xMUKPsdq3HzHznKgWrD08IL6wa7K3QhbxIO3x5C1Jmpd')
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          done();
        });
    });
  });

  describe('GET /disconnect', () => {
    beforeEach(() => {
      nock('https://api.twitter.com/1.1/account')
        .get('/verify_credentials.json')
        .query(true)
        .reply(200, () => {
          return JSON.stringify('{name: ""}');
        });
    });

    it('should be disconnected from Twitter and receive a response with my Twitter ID for confirmation', done => {
      chai.request(server)
        .post('/disconnect')
        .set('oauth_token', '847261432928284673-1rHwNheApKthM5xShodCUfZ6ItzDqHt')
        .set('oauth_token_secret', '2xMUKPsdq3HzHznKgWrD08IL6wa7K3QhbxIO3x5C1Jmpd')
        .end((error, response) => {
          should.not.exist(error);
          response.status.should.eql(200);
          response.type.should.eql('application/json');
          done();
        });
    });
  });
});
