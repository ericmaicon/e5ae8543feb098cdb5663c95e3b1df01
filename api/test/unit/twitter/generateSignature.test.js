const { expect } = require('chai');
const { generateSignature } = require('../../../repositories/twitter');

describe('generateSignature', () => {
  it('return empty if there is no param', done => {
    const signature = generateSignature();
    expect(signature).to.be.empty;
    done();
  });

  it('generate the signature', done => {
    const params = {
      oauth_version: '1.0',
      oauth_callback: 'http://localhost/sign-in-with-twitter/',
      oauth_consumer_key: 'cChZNFj6T5R0TigYB9yd1w',
      oauth_nonce: 'ea9ec8429b68d6b77cd5600adbbb0456',
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: '1318467427'
    };
    const signature = generateSignature(
      'https://api.twitter.com/oauth/request_token',
      'post',
      params,
      'L8qq9PZyRg6ieKGEKhZolGC0vJWLw8iEJ88DRdyOg'
    );
    expect(signature).to.be.eql('F1Li3tvehgcraF8DMJ7OyxO4w9Y=');
    expect(signature).to.match(/\w/);
    expect(signature).to.have.lengthOf(28);
    done();
  });
});
