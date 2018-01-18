const { expect } = require('chai');
const { getAccountSettings } = require('../../../repositories/twitter/');

describe('getAccountSettings', () => {
  it('should fetch account settings.', done => {
    getAccountSettings().then(accountSettings => {
      expect(accountSettings.screen_name).to.match(/\w/);
      done();
    })
  });
});
