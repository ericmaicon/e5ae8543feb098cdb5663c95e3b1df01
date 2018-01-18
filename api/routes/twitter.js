const { requestToken, verifyCredentials } = require('../repositories/twitter/');

module.exports = (app, router) => {
  //GET oauth_request
  router.get('/oauth_request', async function (context) {
    const { callback_url } = context.request.query;

    if (!callback_url) {
      context.status = 422;
      context.body = {
        error: 'You need to pass the callback_url param.'
      };
      return;
    }

    const oauthToken = await requestToken(callback_url);
    context.body = {
      data: `http://twitter.com/oauth/authorize?oauth_token=${oauthToken}`
    };
  });

  //POST /connect
  router.post('/connect', async function (context) {
    const { oauth_token, oauth_verifier } = context.request.body;

    if (!oauth_token || !oauth_verifier) {
      context.status = 422;
      context.body = {
        error: 'You need to pass the oauth_token AND oauth_verifier data.'
      };
      return;
    }

    const credentialData = await verifyCredentials(oauth_token, oauth_verifier);
    context.body = {
      data: credentialData
    };
  });
};
