const { expect } = require('chai');
const { getSettings } = require('../../../repositories/twitter/');

describe('getSettings', () => {
  it('should pass oauthParam as param', done => {
    getSettings().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken and oauthVerifier params.');
      done();
    });
  });

  it('should fetch settings.', done => {
    getSettings(
      'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
      'uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY'
    )
      .then(accountSettings => {
        expect(accountSettings.screen_name).to.match(/\w/);
        done();
      });
  });
});
