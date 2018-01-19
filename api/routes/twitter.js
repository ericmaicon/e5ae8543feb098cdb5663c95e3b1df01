const {
  requestToken,
  getSettings,
  getTimeline,
  getAccessToken,
  updateStatus
} = require('../repositories/twitter/');

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
    let oauth_token = context.headers['oauth_token'];
    let oauth_token_secret = context.headers['oauth_token_secret'];
    let { oauth_verifier } = context.request.body;

    if (!oauth_token_secret && context.request.body.oauth_token) {
      const accessData = await getAccessToken(
        context.request.body.oauth_token,
        oauth_verifier
      );
      oauth_token = accessData.oauth_token;
      oauth_token_secret = accessData.oauth_token_secret;
    }

    if (!oauth_token || !oauth_token_secret) {
      context.status = 400;
      context.body = {
        error: 'You have invalid credentials. Please, get logged in again.'
      };
      return;
    }

    const credentialData = await getSettings(oauth_token, oauth_token_secret);

    context.body = {
      data: credentialData,
      token: {
        oauth_token,
        oauth_token_secret
      }
    };
  });

  //GET /tweets
  router.get('/tweets', async function (context) {
    const oauth_token = context.headers['oauth_token'];
    const oauth_token_secret = context.headers['oauth_token_secret'];

    if (!oauth_token || !oauth_token_secret) {
      context.status = 422;
      context.body = {
        error: 'You need to pass the oauth_token and oauth_token_secret header.'
      };
      return;
    }
    const tweets = await getTimeline(oauth_token, oauth_token_secret);
    context.body = {
      data: tweets
    };
  });

  //POST /disconnect
  router.post('/disconnect', async function (context) {
    const oauth_token = context.headers['oauth_token'];
    const oauth_token_secret = context.headers['oauth_token_secret'];

    if (!oauth_token || !oauth_token_secret) {
      context.status = 422;
      context.body = {
        error: 'You need to pass the oauth_token and oauth_token_secret header.'
      };
      return;
    }

    const credentialData = await getSettings(oauth_token, oauth_token_secret);
    context.body = {
      data: credentialData.id
    };
  });

  //POST /tweet
  router.post('/tweet', async function (context) {
    const oauth_token = context.headers['oauth_token'];
    const oauth_token_secret = context.headers['oauth_token_secret'];
    const { status } = context.request.body;

    if (!oauth_token || !oauth_token_secret) {
      context.status = 422;
      context.body = {
        error: 'You need to pass the oauth_token and oauth_token_secret header.'
      };
      return;
    }

    if (!status) {
      context.status = 422;
      context.body = {
        error: 'You need to pass a status.'
      };
      return;
    }

    const response = await updateStatus(oauth_token, oauth_token_secret, status);
    context.body = {
      data: response
    };
  });
};
