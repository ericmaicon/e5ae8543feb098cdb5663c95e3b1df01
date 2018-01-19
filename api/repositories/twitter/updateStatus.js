const request = require('request');

const { generateOauthHeader, parseToString } = require('./generateOauthHeader');

/**
 * create a tweet
 *
 * @param  string oauthToken
 * @param  string oauthTokenSecret
 * @param  string status
 * @return object
 */
module.exports = (oauthToken, oauthTokenSecret, status) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken || !oauthTokenSecret || !status) {
      reject('You need to pass the oauthToken, oauthTokenSecret and status param.');
      return;
    }

    const url = 'https://api.twitter.com/1.1/statuses/update.json';
    const method = 'post';
    const authorizationHeader = generateOauthHeader(url, method, oauthTokenSecret, {
      oauth_token: oauthToken,
      status
    });

    request({
      url,
      method,
      qs: Object.assign(authorizationHeader, {
        status
      }),
      headers: {
        Authorization: parseToString(authorizationHeader),
      },
    }, (error, response, body) => {
      const parsedBody = JSON.parse(body);
      if (!error && response.statusCode == 200) {
        resolve(parsedBody);
      } else {
        reject(parsedBody.errors);
      }
    });
  });
};
