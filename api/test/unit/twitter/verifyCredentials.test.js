const { expect } = require('chai');
const { verifyCredentials } = require('../../../repositories/twitter/');

describe('verifyCredentials', () => {
  it('should pass oauthParam as param', done => {
    verifyCredentials().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken and oauthVerifier params.');
      done();
    });
  });

  it('should fetch verify_credentials.', done => {
    verifyCredentials(
      'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
      'uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY'
    )
      .then(accountSettings => {
        expect(accountSettings.screen_name).to.match(/\w/);
        done();
      });
  });
});
