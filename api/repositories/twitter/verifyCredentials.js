const request = require('request');

const generateOauthHeader = require('./generateOauthHeader');

module.exports = (oauthToken, oauthVerifier) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken || !oauthVerifier) {
      reject('You need to pass the oauthToken and oauthVerifier params.');
      return;
    }

    const url = 'https://api.twitter.com/1.1/account/verify_credentials.json';
    const method = 'get';
    const formData = {
      oauth_verifier: oauthVerifier
    };
    const authorizationHeader = generateOauthHeader(url, method, {
      oauth_token: oauthToken
    }, formData);

    request({
      url,
      method,
      headers: {
        Authorization: authorizationHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formData)
    }, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        reject(body);
      }
    });
  });
};
