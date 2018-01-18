const chai = require('chai');
chai.use(require('chai-match'));
const expect = chai.expect;

const { generateNonce } = require('../../../repositories/twitter/');

describe('generateNonce', () => {
  it('should generate a 32 bytes of random data, and stripping out all non-word characters', done => {
    const nonce = generateNonce();
    expect(nonce).to.match(/\w/);
    expect(nonce).to.have.lengthOf(32);
    done();
  });
});
