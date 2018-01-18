const { expect } = require('chai');

const { getTimeline } = require('../../../repositories/twitter/');

describe('getTimeline', () => {
  it('should pass oauthToken as param', done => {
    getTimeline().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken param.');
      done();
    });
  });

  it('should request timeline user.', done => {
    getTimeline('NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0').then(timeline => {
      expect(timeline).to.be.an('array');
      done();
    });
  });
});
