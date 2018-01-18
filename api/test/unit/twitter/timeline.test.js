const { expect } = require('chai');

const { timeline } = require('../../../repositories/twitter/');

describe('timeline', () => {
  it('should pass oauthToken as param', done => {
    timeline().catch(error => {
      expect(error).to.equal('You need to pass the oauthToken param.');
      done();
    });
  });

  it('should request timeline user.', done => {
    timeline('NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0').then(timeline => {
      expect(timeline).to.be.an('array');
      done();
    });
  });
});
