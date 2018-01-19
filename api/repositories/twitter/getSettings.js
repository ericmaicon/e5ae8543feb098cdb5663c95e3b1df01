const request = require('request');

const { generateOauthHeader, parseToString } = require('./generateOauthHeader');

/**
 * this method get user twitter profile data
 *
 * @param  string oauthToken
 * @param  string oauthTokenSecret
 * @return object the user data
 */
module.exports = (oauthToken, oauthTokenSecret) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken || !oauthTokenSecret) {
      reject('You need to pass the oauthToken and oauthTokenSecret params.');
      return;
    }

    const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
    const method = 'get';
    const authorizationHeader = generateOauthHeader(url, method, oauthTokenSecret, {
      oauth_token: oauthToken
    });

    request({
      url,
      method,
      qs: authorizationHeader,
      headers: {
        Authorization: parseToString(authorizationHeader),
      },
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const parsedBody = JSON.parse(body);
        resolve(parsedBody);
      } else {
        reject(body);
      }
    });
  });
};
