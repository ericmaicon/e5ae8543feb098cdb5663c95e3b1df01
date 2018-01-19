const request = require('request');

const { generateOauthHeader, parseToString } = require('./generateOauthHeader');

/**
 * get user tweets
 *
 * @param  string oauthToken
 * @param  string oauthTokenSecret
 * @param  string count
 * @return object
 */
module.exports = (oauthToken, oauthTokenSecret, count = 100) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken) {
      reject('You need to pass the oauthToken and oauthTokenSecret param.');
      return;
    }

    const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
    const method = 'get';
    const authorizationHeader = generateOauthHeader(url, method, oauthTokenSecret, {
      oauth_token: oauthToken,
      count
    });

    request({
      url,
      method,
      qs: Object.assign(authorizationHeader, {
        count
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
