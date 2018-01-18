const request = require('request');

const generateOauthHeader = require('./generateOauthHeader');

/**
 * Method to request token from Twitter
 *
 * @param string callback callback url requested from twitter
 * @return string token
 */
module.exports = (callback) => {
  return new Promise((resolve, reject) => {
    if (!callback) {
      reject('You need to pass the callback param.');
      return;
    }

    const url = 'https://api.twitter.com/oauth/request_token';
    const method = 'post';
    const authorizationHeader = generateOauthHeader(url, method, {
      oauth_callback: encodeURIComponent(callback)
    });

    request({
      url,
      method,
      headers: {
        Authorization: authorizationHeader
      }
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body.substr(12, 27));
      } else {
        const parsedBody = JSON.parse(body);
        reject(parsedBody.errors);
      }
    });
  });
};
