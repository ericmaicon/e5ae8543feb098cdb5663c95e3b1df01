const { expect } = require('chai');
const { generateOauthHeader } = require('../../../repositories/twitter');

describe('generateOauthHeader', () => {
  it('return empty if there is no param', done => {
    const header = generateOauthHeader();
    expect(header).to.be.empty;
    done();
  });

  it('generate the header', done => {
    const oauthHeader = generateOauthHeader(
      'https://api.twitter.com/oauth/request_token',
      'post',
      'http://localhost'
    );
    expect(oauthHeader).to.match(/\w/);
    done();
  });
});
