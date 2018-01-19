const { expect } = require('chai');
const nock = require('nock');

const { getTimeline } = require('../../../repositories/twitter/');

describe('getTimeline', () => {
  beforeEach(() => {
    nock('https://api.twitter.com/1.1/statuses')
      .get('/user_timeline.json')
      .query(true)
      .reply(200, []);
  });

  it('should pass oauthToken as param', done => {
    getTimeline().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken and oauthTokenSecret param.');
      done();
    });
  });

  it('should request timeline user.', done => {
    getTimeline(
      'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
      'uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY'
    ).then(timeline => {
      expect(timeline).to.be.an('array');
      done();
    });
  });
});
