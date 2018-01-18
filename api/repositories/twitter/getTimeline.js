const request = require('request');

const { generateOauthHeader, parseToString } = require('./generateOauthHeader');

module.exports = (oauthToken, oauthTokenSecret, count = 100) => {
  return new Promise((resolve, reject) => {
    if (!oauthToken) {
      reject('You need to pass the oauthToken param.');
      return;
    }

    const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
    const method = 'get';
    const authorizationHeader = generateOauthHeader(url, method, oauthTokenSecret, {
      oauth_token: oauthToken
    });

    request({
      url,
      method,
      qs: Object.assign(authorizationHeader, {
      }),
      headers: {
        Authorization: parseToString(authorizationHeader),
      },
    }, (error, response, body) => {
      console.log(response);
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        const parsedBody = JSON.parse(body);
        reject(parsedBody.errors);
      }
    });
  });
};
