const request = require('request');
const queryString = require('query-string');

const { generateOauthHeader, parseToString } = require('./generateOauthHeader');

/**
 * Allows a Consumer application to exchange the OAuth Request Token for an
 * OAuth Access Token.
 *
 * @param  string oauthToken
 * @param  string oauthVerifier
 * @return object
 */
module.exports = (oauthToken, oauthVerifier) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken || !oauthVerifier) {
      reject('You need to pass the oauthToken and oauthVerifier params.');
      return;
    }

    const url = 'https://api.twitter.com/oauth/access_token';
    const method = 'post';
    const formData = {
      oauth_verifier: oauthVerifier
    };
    const authorizationHeader = generateOauthHeader(url, method, '', {
      oauth_token: oauthToken
    }, formData);

    request({
      url,
      method,
      headers: {
        Authorization: parseToString(authorizationHeader),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formData)
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        const bodyParsed = queryString.parse(body);
        resolve(bodyParsed);
      } else {
        reject(body);
      }
    });
  });
};
