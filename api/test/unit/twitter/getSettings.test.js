const { expect } = require('chai');
const nock = require('nock');

const { getSettings } = require('../../../repositories/twitter/');

describe('getSettings', () => {
  beforeEach(() => {
    nock('https://api.twitter.com/1.1/account')
      .get('/verify_credentials.json')
      .query(true)
      .reply(200, () => {
        return JSON.stringify('{name: ""}');
      });
  });

  it('should pass oauthParam as param', done => {
    getSettings().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken and oauthTokenSecret params.');
      done();
    });
  });

  it('should fetch settings.', done => {
    getSettings(
      'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
      'uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY'
    )
      .then(accountSettings => {
        expect(accountSettings).to.have.string('name');
        done();
      });
  });
});
