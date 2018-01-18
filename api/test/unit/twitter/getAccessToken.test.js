const { expect } = require('chai');
const { getAccessToken } = require('../../../repositories/twitter/');

describe('getAccessToken', () => {
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
    )
      .then(accessToken => {
        expect(accessToken).to.match(/\w/);
        done();
      });
  });
});
