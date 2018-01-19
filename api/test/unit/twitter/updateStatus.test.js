const { expect } = require('chai');
const nock = require('nock');

const { updateStatus } = require('../../../repositories/twitter/');

describe('updateStatus', () => {
  beforeEach(() => {
    nock('https://api.twitter.com/1.1/statuses')
      .post('/update.json')
      .query(true)
      .reply(200, () => {
        return JSON.stringify('{id: ""}');
      });
  });

  it('should pass oauthToken as param', done => {
    updateStatus().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken, oauthTokenSecret and status param.');
      done();
    });
  });

  it('should create tweet.', done => {
    updateStatus(
      'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
      'uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY',
      'message'
    ).then(tweet => {
      expect(tweet).to.have.string('id');
      done();
    });
  });
});
