const { expect } = require('chai');
const { disconnect } = require('../../../repositories/twitter/');

describe('disconnect', () => {
  it('should pass access_token as param', done => {
    disconnect().catch(error => {
      expect(error).to.equal('You need to pass the access_token param.');
      done();
    });
  });

  it('should disconnect.', done => {
    disconnect('NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0')
      .then(token => {
        expect(token).to.match(/\w/);
        done();
      });
  });
});
