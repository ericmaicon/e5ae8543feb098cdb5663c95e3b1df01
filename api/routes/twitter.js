const { requestToken } = require('../repositories/twitter/');

module.exports = (app, router) => {
  //GET oauth_request
  router.get('/oauth_request', async function (context) {
    if (!context.request.query.callback_url) {
      context.status = 422;
      context.body = {
        error: 'You need to pass the callback_url param.'
      };
      return;
    }

    const oauthToken = await requestToken(context.request.query.callback_url);
    context.body = {
      data: `http://twitter.com/oauth/authorize?oauth_token=${oauthToken}`
    };
  });
};
