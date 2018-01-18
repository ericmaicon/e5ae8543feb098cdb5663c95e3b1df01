const request = require('request');

const generateOauthHeader = require('./generateOauthHeader');

module.exports = (oauthToken, limit = 100) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken) {
      reject('You need to pass the oauthToken param.');
      return;
    }

    const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
    const method = 'get';
    const authorizationHeader = generateOauthHeader(url, method, {
      oauth_token: oauthToken
    });

    request({
      url,
      method,
      qs: {
        limit
      },
      headers: {
        Authorization: authorizationHeader,
      },
    }, (error, response, body) => {
      console.log(body);
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        const parsedBody = JSON.parse(body);
        reject(parsedBody.errors);
      }
    });
  });
};
