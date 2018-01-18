const { expect } = require('chai');

const { requestToken } = require('../../../repositories/twitter/');

describe('requestToken', () => {
  it('should pass callback as param', done => {
    requestToken().catch(error => {
      expect(error).to.equal('You need to pass the callback param.');
      done();
    });
  });

  it('should request token on twitter and return with it.', done => {
    requestToken('http://localhost').then(token => {
      expect(token).to.match(/\w/);
      expect(token).to.have.lengthOf(27);
      done();
    });
  });
});
