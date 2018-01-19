const { expect } = require('chai');
const nock = require('nock');

const { getAccessToken } = require('../../../repositories/twitter/');

describe('getAccessToken', () => {
  beforeEach(() => {
    nock('https://api.twitter.com/oauth/')
      .post('/access_token')
      .reply(200, 'oauth_token=847261432928284673&oauth_token_secret=123&user_id=&screen_name=&x_auth_expires=0');
  });

  it('should pass oauthParam as param', done => {
    getAccessToken().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken and oauthVerifier params.');
      done();
    });
  });

  it('should fetch get access token.', done => {
    getAccessToken(
      'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
      'uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY'
    ).then(accessToken => {
      expect(accessToken).to.be.an('object');
      done();
    });
  });
});
